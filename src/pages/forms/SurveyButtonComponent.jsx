import React from "react";

const SurveyButtonComponent = ({
  templateDesign,
  buttonText,
  inputValue,
  onInputChange,
  isSubmitted,
  onDelete,
  onEdit,
  buttonLink,
}) => {
  return (
    <>
      <div className="relative group w-full">
        <button
          type="button"
          className="bg-white text-gray-800 py-2 px-4 rounded shadow w-full transition duration-300 group-hover:blur-sm"
          onClick={() => window.open(buttonLink, "_blank")}
        >
          {buttonText}
        </button>

        {/* Delete button */}
        <button
          type="button"
          className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
          onClick={onDelete}
          aria-label="Delete"
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>

        {/* Edit button */}
        <button
          type="button"
          className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-500 hover:text-blue-700"
          onClick={onEdit}
          aria-label="Edit"
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
      </div>

      {isSubmitted && !inputValue && (
        <span className="text-red-500 text-sm mt-2">
          This field is required
        </span>
      )}
    </>
  );
};

export default SurveyButtonComponent;
