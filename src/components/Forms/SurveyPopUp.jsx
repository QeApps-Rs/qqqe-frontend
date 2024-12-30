import { useState } from "react";
import SurveyFormComponent from "../../pages/forms/SurveyFormComponent";
import TemplateBannerComponent from "../../pages/forms/TemplateBannerComponent";

/* eslint-disable react/prop-types */
const SurveyPopUp = ({
  templateDesign,
  surveyBannerImgSrc,
  success,
  successImg,
  getStyle,
  handleDeleteField,
  handleInputChange,
  inputValues,
  handleEdit,
  isSubmitted,
  addedFields,
  handleSubmit,
  addedQuestion,
  handleSurveyInputChange,
  inputSurveyValues,
  handleSurveyDeleteField,
  handleSurveyEdit,
  renderStars,
  renderNumbers,
  reviewCount,
  ratingCount,
  containerClass,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 1;

  // Calculate total pages
  const totalPages = Math.ceil(addedQuestion.length / questionsPerPage);
  const currentQuestions = addedQuestion.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div
      className="flex items-center justify-center py-5 bg-white"
      style={{
        minHeight: "calc(100vh - 300px)",
      }}
    >
      {success ? (
         <div
         className="p-6 w-full max-w-3xl rounded-xl"
         style={{
           backgroundColor: templateDesign.templateBgColor,
           borderRadius: templateDesign.borderRadius,
           boxShadow:
             "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) -2px -4px 3px",
         }}
       >
         <div
           className={`${
             templateDesign.containPosition === "center"
               ? "text-center"
               : templateDesign.containPosition === "right"
               ? "text-right"
               : "text-left"
           } flex flex-col justify-center m-auto w-10/12`}
         >
           <div
             className={`${
               templateDesign.containPosition === "center"
                 ? "justify-center"
                 : templateDesign.containPosition === "left"
                 ? "justify-start"
                 : "justify-end"
             } flex w-full`}
           >
             <img
               src={successImg}
               alt="Success"
               className="max-w-[130px] w-12 h-12 rounded-full object-cover"
             />
           </div>
           <h2
             className="font-bold mt-2"
             style={getStyle(templateDesign, "successHeading")}
           >
             {templateDesign.successHeading}
           </h2>
           <p
             className="font-normal mt-2"
             style={getStyle(templateDesign, "successDescription")}
           >
             {templateDesign.successDescription}
           </p>
           <span
             className="font-bold mt-2 cursor-pointer "
             style={getStyle(templateDesign, "successSubHeading")}
           >
             {templateDesign.successSubHeading}
           </span>
         </div>
       </div>
      ) : (
        <div
          className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-4xl  shadow-lg  overflow-hidden "
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) -2px -4px 3px",
            borderRadius: templateDesign.borderRadius,
            minHeight: "500px",
          }}
        >
          <div className={`h-full ${containerClass}`}>
            <img
              src={surveyBannerImgSrc}
              alt="Promo"
              className="w-full h-full"
            />
          </div>

          <div
            className="p-6 lg:p-8 flex flex-col justify-center h-full"
            style={{
              backgroundColor: templateDesign.templateBgColor,
            }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={getStyle(templateDesign, "templateHeading")}
            >
              {templateDesign.heading}
            </h2>

            {/* <p
                  className="text-lg mb-6"
                  style={getStyle(templateDesign, "templateSubHeading")}
                >
                  {templateDesign.subHeading}
                </p> */}
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              {/* {addedFields.map((field, index) => (
                    <TemplateBannerComponent
                      key={index}
                      {...field}
                      templateDesign={templateDesign}
                      inputValue={inputValues[field.fieldName] || ""}
                      onInputChange={handleInputChange}
                      isSubmitted={isSubmitted}
                      onDelete={() => handleDeleteField(field.fieldName)}
                      onEdit={() => handleEdit(field, index)}
                    />
                  ))} */}
              {currentQuestions.map((field, index) => (
                <SurveyFormComponent
                  key={index}
                  templateDesign={templateDesign}
                  options={field.options}
                  fieldName={field.fieldName}
                  inputValue={inputSurveyValues[field.fieldName] || ""}
                  onInputChange={handleSurveyInputChange}
                  isSubmitted={isSubmitted}
                  onDelete={() =>
                    handleSurveyDeleteField(field.fieldName, index)
                  }
                  onEdit={() => handleSurveyEdit(field, index)}
                />
              ))}
              {addedQuestion.length > 1 && (
                <div className="pagination-controls flex justify-center items-center space-x-4 mt-6">
                  {/* Previous Button */}
                  <button
                    className={`px-4 py-2 rounded-md shadow-sm font-medium transition-colors duration-200 ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#f31c37] text-white hover:[#ff0440]"
                    }`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {/* Page Indicator */}
                  <span className="text-sm font-semibold text-gray-700">
                    Page <span className="text-[#f31c37]">{currentPage}</span>{" "}
                    of <span className="text-[#f31c37]">{totalPages}</span>
                  </span>

                  {/* Next Button */}
                  <button
                    className={`px-4 py-2 rounded-md shadow-sm font-medium transition-colors duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#f31c37] text-white hover:[#ff0440]"
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
              {/* <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-md text-lg mt-3"
                    style={{
                      backgroundColor: templateDesign.templateButtonBgColor,
                    }}
                  >
                    {templateDesign.button}
                  </button> */}
              {/* {templateDesign.formBorderStyle === "review" && (
                    <>{renderStars(reviewCount)}</>
                  )}
                  {templateDesign.formBorderStyle === "rating" && (
                    <>{renderNumbers(ratingCount)}</>
                  )} */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyPopUp;
