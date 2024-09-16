import React, { useState, useEffect } from "react";

const ColorPicker = ({ defaultColor, onChange }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor || "rgb(83 89 102)");
  useEffect(() => {
    setSelectedColor(defaultColor); // Update when defaultColor changes
  }, [defaultColor]);

  const handleChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    if (onChange) {
      onChange(newColor); // Call parent's onChange handler
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="color"
          value={selectedColor}
          onChange={handleChange}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        />
        <div
          className={`w-6 h-6 rounded border border-gray-300 bg-slate-50`}
          style={{ backgroundColor: selectedColor }} // Display selected color
        ></div>
        <input
          type="text"
          value={selectedColor}
          onChange={handleChange}
          className="ml-2 w-24 border rounded px-2 py-1 text-center"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
