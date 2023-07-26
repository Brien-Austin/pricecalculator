import React, { useState } from "react";

const ToggleButtonDiv = ({ onSelectionChange }) => {
  const [selectedOption, setSelectedOption] = useState("Domestic");

  const handleSelectionChange = (option) => {
    setSelectedOption(option);
    onSelectionChange(option); // Call the parent component's function with the selected option
  };

  return (
    <div>
      <button
        onClick={() => handleSelectionChange("Domestic")}
        className={selectedOption === "Domestic" ? "active" : ""}
      >
        Domestic
      </button>
      <button
        onClick={() => handleSelectionChange("International")}
        className={selectedOption === "International" ? "active" : ""}
      >
        International
      </button>
    </div>
  );
};

export default ToggleButtonDiv;
