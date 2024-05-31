# Food Truck Finder - Ariel

## Overview

Food Truck Finder is a web application designed to help users discover food trucks in San Francisco. Leveraging open data provided by the city, users can explore various food trucks based on their names, offered food items, and locations. The application provides an interactive map interface to visualize the locations of the filtered food trucks.

## Features

- **Filtering**: Users can filter food trucks by name, food items, and location (address/city).
- **Map View**: Filtered food trucks are displayed on an interactive map for easy visualization.
- **Custom Icons**: The application utilizes custom icons to represent food trucks on the map.
- **Responsive Design**: Food Truck Finder is designed to be responsive and accessible across different devices.

## Technologies Used

- **React.js**: Frontend framework used for building the user interface.
- **Leaflet**: Library employed for integrating interactive maps into the application.
- **PapaParse**: Library utilized for parsing CSV data containing food truck information.
- **CSS**: Styling language utilized to enhance the user interface and experience.

## Installation

1. Clone the repository:

### git clone [<repository-url>](https://github.com/arield13/food-truck-finder.git)


2. Navigate to the project directory:

### cd food-truck-finder


3. Install dependencies:

### npm install


4. Start the development server:


### `npm start`


5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the application.

## Usage

1. Enter search criteria in the provided filters (name, food, address/city) to filter food trucks accordingly.
2. Filtered food trucks will be displayed on the map.
3. Click on a food truck marker on the map to view detailed information such as food items and address.

## Responsive Styling

The filter section in the application is responsive and adjusts its layout for smaller screens or mobile devices. The filter inputs span the entire width of the container and have consistent padding and spacing to ensure a user-friendly experience on various screen sizes.

To achieve responsive styling for the filter section, inline styles are applied to each input element within the React component. These styles define the width, margin, and padding of the filter inputs, ensuring they adapt to different screen sizes.

```markdown

Feel free to customize the README further to include any additional information or details specific to your project.

