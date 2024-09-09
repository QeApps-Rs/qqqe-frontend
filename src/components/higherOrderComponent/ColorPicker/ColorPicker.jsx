import React, { useState } from "react";

const ColorPicker = (props) => {
  const [selectedColor, setSelectedColor] = useState("rgb(83 89 102)");

  const { backgroundColor, overlay, label,textColor,placeholderColor,inputBgColor,focusColor } = props
  const handleChange = (event) => {
    setSelectedColor(event.target.value);
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
          className={`w-6 h-6 rounded border border-gray-300 ${backgroundColor ? 'bg-white' : overlay ?  'bg-slate-400' : label ? 'bg-black' : textColor ?  'bg-white' : placeholderColor ? 'bg-slate-400' : inputBgColor ? ' bg-black'  : focusColor ? 'bg-slate-400'   : 'bg-slate-50'}`}
          // style={{ backgroundColor: selectedColor }}
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
