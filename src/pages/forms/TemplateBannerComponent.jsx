import React from "react";

const TemplateBannerComponent = ({
  templateDesign,
  fieldType,
  fieldValidation,
  fieldName,
  inputValue,
  onInputChange,
  isSubmitted,
  onDelete,
  onEdit,
  placeholderText,
}) => {
  return (
    <>
      <label className="block text-black dark:text-white">{fieldName}</label>
      <div className="flex w-full">
        <input
          type={fieldType}
          placeholder={placeholderText}
          value={inputValue}
          onChange={(e) => onInputChange(fieldName, e.target.value)}
          className="p-3 rounded-md focus:outline-none w-10/12"
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
          onFocus={(e) =>
            (e.target.style.borderColor = templateDesign.focusBorderColor)
          }
          onBlur={(e) =>
            (e.target.style.borderColor = templateDesign.borderColor)
          }
        />
        <button
          type="button"
          className="text-red-500 hover:text-red-700 mr-4 ml-4"
        >
          <i className="fa fa-times" aria-hidden="true" onClick={onDelete}></i>
        </button>
        <button type="button" className="text-blue-500 hover:text-blue-700 ">
          <i className="fa fa-pencil" aria-hidden="true" onClick={onEdit}></i>
        </button>
      </div>
      {isSubmitted && fieldValidation === "required" && !inputValue && (
        <span className="text-red-500">This field is required</span>
      )}
    </>
  );
};

export default TemplateBannerComponent;
