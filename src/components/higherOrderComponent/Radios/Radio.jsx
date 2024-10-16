/* eslint-disable react/prop-types */
import { useState } from "react";

const Radio = ({ jsonData, onChange, defaultValue = "" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <>
      {jsonData.map((item) => (
        <label
          key={item.value}
          className="flex cursor-pointer select-none items-center mt-2"
        >
          <div className="relative">
            <input
              type="radio"
              name="options"
              value={item.value}
              checked={selectedValue === item.value}
              onChange={handleChange}
              className="sr-only"
            />
            <div
              className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                selectedValue === item.value && "border-primary"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                  selectedValue === item.value && "!bg-primary"
                }`}
              ></span>
            </div>
          </div>
          {item.label}
        </label>
      ))}
    </>
  );
};

export default Radio;
