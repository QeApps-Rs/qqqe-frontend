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
        >
          <a
            className="w-full text-center block"
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        </button>

        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
          onClick={onDelete}
          aria-label="Delete"
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>

        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-500 hover:text-blue-700 ml-12"
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
