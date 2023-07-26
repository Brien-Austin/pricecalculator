import React, { useState, useEffect } from "react";
import ToggleLocation from "../components/ToggleLocation";
import { Link } from "react-router-dom";

const DestinationsList = () => {
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [packageThemes, setPackageThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null); // State variable to store the selected theme

  useEffect(() => {
    fetch("/api/theme") // Replace with the actual API endpoint URL
      .then((response) => response.json())
      .then((data) => setPackageThemes(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("/api/destinations")
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
        setFilteredDestinations(data); // Initially, set filtered destinations to all destinations
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSelectionChange = (option) => {
    setSelectedOption(option);

    // Filter destinations based on the selected option
    if (option === "Domestic") {
      setFilteredDestinations(destinations.filter((destination) => destination.location === "Domestic"));
    } else if (option === "International") {
      setFilteredDestinations(destinations.filter((destination) => destination.location === "International"));
    }
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme); // Update the selectedTheme state when a theme is clicked
  };

  return (
    <div>
      <ToggleLocation onSelectionChange={handleSelectionChange} />
      <p>You selected: {selectedOption}</p>
      <h2>List of Destinations</h2>
      <ul>
        {filteredDestinations.map((destination) => (
          <li
            key={destination._id}
            onClick={() => handleDestinationClick(destination.place)}
            style={{ cursor: "pointer" }}
          >
            {destination.place}
          </li>
        ))}
      </ul>
      <p>Selected Destination: {selectedDestination}</p>
      <div>
        <h2>Package Themes</h2>
        <ul>
          {packageThemes.map((theme, index) => (
            <li style={{cursor:'pointer'}} key={index} onClick={() => handleThemeClick(theme)}>
              {theme}
            </li>
          ))}
        </ul>
      </div>
      <p>Selected theme: {selectedTheme}</p> {/* Display the selected theme text */}
    <button>Next</button>
    </div>
  );
};

export default DestinationsList;
