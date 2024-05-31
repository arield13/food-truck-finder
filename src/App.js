import L from 'leaflet';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import placeIcon from './logistic.png';
import truckIcon from './truck-icon.png';
import './App.css';

function App() {
  const [foodTrucks, setFoodTrucks] = useState([]); // State for storing food truck data
  const [placeFilter, setNameFilter] = useState(''); // State for place filter
  const [foodFilter, setFoodFilter] = useState(''); // State for food filter
  const [addressFilter, setAddressFilter] = useState(''); // State for address/city filter

  useEffect(() => {
    // Fetch food truck data from CSV file
    async function fetchData() {
      const response = await fetch('/Mobile_Food_Facility_Permit.csv'); // Fetch CSV file
      const reader = response.body.getReader(); // Get reader object
      const result = await reader.read(); // Read file
      const decoder = new TextDecoder('utf-8'); // Create text decoder
      const csv = decoder.decode(result.value); // Decode CSV data
      const { data } = Papa.parse(csv, { header: true }); // Parse CSV data using PapaParse

      // Filter out records with invalid coordinates
      const filteredData = data.filter(truck => {
        const latitude = parseFloat(truck.Latitude);
        const longitude = parseFloat(truck.Longitude);
        return !isNaN(latitude) && !isNaN(longitude) && isFinite(latitude) && isFinite(longitude);
      });

      setFoodTrucks(filteredData); // Set food truck data
    }
    fetchData(); // Call fetchData function
  }, []); // Run effect only once on component mount

  // Define custom icon for truck markers
  const truckMarkerIcon = new L.Icon({
    iconUrl: truckIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  // Filter food trucks based on name, food, and address/city
  const filteredTrucks = foodTrucks.filter(truck => {
    const nameMatch = truck.Applicant.toLowerCase().includes(placeFilter.toLowerCase()); // Check if truck name matches filter
    const foodMatch = truck.FoodItems.toLowerCase().includes(foodFilter.toLowerCase()); // Check if food items match filter
    const addressMatch = truck.Address.toLowerCase().includes(addressFilter.toLowerCase()); // Check if address/city matches filter
    return nameMatch && foodMatch && addressMatch; // Return true if all conditions are met
  });

  return (
    <div className="app-container">
      <div className="filters">
        <h2 className="app-title">Food Truck Finder</h2> 
        <h3>Filters:</h3> 
        <input
          type="text"
          placeholder="Filter by address/city"
          value={addressFilter}
          onChange={e => setAddressFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filter by place"
          value={placeFilter}
          onChange={e => setNameFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filter by food"
          value={foodFilter}
          onChange={e => setFoodFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="map">
        <MapContainer center={[37.7749, -122.4194]} zoom={13} className="map-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredTrucks.map((truck, index) => {
            const latitude = parseFloat(truck.Latitude);
            const longitude = parseFloat(truck.Longitude);
            if (isNaN(latitude) || isNaN(longitude) || !isFinite(latitude) || !isFinite(longitude)) {
              console.warn(`Invalid coordinates for truck: ${truck.Applicant}`);
              return null;
            }
            return (
              <Marker key={index} position={[latitude, longitude]} icon={truckMarkerIcon}>
                <Popup>
                  <div>
                    <h2 className='place-title'><img src={placeIcon} width={30} alt="Truck Icon" style={{ marginRight: '5px' }} /> {truck.Applicant}</h2>
                    <p className="food-list-title"><b>Food Items:</b></p>
                    <ul className="food-list">
                      {truck.FoodItems.split(':').map((item, i) => (
                        <li key={i}>
                          - {item.trim()}
                        </li>
                      ))}
                    </ul>
                    <p><b>Address:</b> {truck.Address} </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
