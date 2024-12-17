import React from "react";

const SurveyFormComponent = ({
  templateDesign,
  fieldName,
  inputValue,
  onInputChange,
  isSubmitted,
  onDelete,
  onEdit,
  options,
}) => {
  return (
    <>
    <div className="flex justify-end">
        {" "}
        <button
          type="button"
          className="text-red-500 hover:text-red-700 mr-4 ml-4 mt-0"
        >
          <i className="fa fa-times" aria-hidden="true" onClick={onDelete}></i>
        </button>
        <button type="button" className="text-blue-500 hover:text-blue-700 ">
          <i className="fa fa-pencil" aria-hidden="true" onClick={onEdit}></i>
        </button>
      </div>
      <label className="text-4xl font-semibold  block text-black dark:text-white">
        {fieldName}
      </label>
      

      <div className="flex w-full">
        <div className="w-full mt-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-5">
              {/* <input
              type="checkbox"
              value={option}
              onChange={() => onInputChange(fieldName, option)} 
              checked={inputValue.includes(option)}
              className="mr-2"
              style={{
                backgroundColor: templateDesign.bgColor,
                borderColor: templateDesign.borderColor,
                borderWidth: "1px",
                color: templateDesign.textColor,
                "--placeholder-color": templateDesign.placeholderTextColor,
                letterSpacing: templateDesign.letterSpacing,
                fontSize: templateDesign.inputFontSize,
                fontWeight: templateDesign.fontWeight,
                fontFamily: templateDesign.fontFamily,
              }}
            /> */}
              <button className="w-full border border-[#f31c37] bg-transparent text-[#f31c37] hover:text-white font-bold rounded-lg dark:text-white py-3 px-4 hover:bg-[#f31c37] transition">
                {option}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* {isSubmitted && !inputValue && (
        <span className="text-red-500">This field is required</span>
      )} */}
    </>
  );
};

export default SurveyFormComponent;
