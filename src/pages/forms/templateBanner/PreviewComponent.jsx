import SurveyFormComponent from "../SurveyFormComponent";
import TemplateBannerComponent from "../TemplateBannerComponent";

/* eslint-disable react/prop-types */
const PreviewComponent = ({
  isView,
  templateDesign,
  imageSrc,
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
  return (
    <div
      className="flex items-center justify-center py-5 bg-white"
      style={{
      
        minHeight: "calc(100vh - 300px)",
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-4xl    overflow-hidden "
        style={{
          borderRadius: templateDesign.borderRadius,
          minHeight: "500px",
          boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) -2px -4px 3px",
        }}
      >
        <div className={`h-full ${containerClass}`}>
          <img src={imageSrc} alt="Promo" className="w-full h-full" />
        </div>

        <div
          className="p-6 lg:p-8 flex flex-col justify-center h-full"
          style={{
            backgroundColor: templateDesign.templateBgColor,

          }}
        >
          <div>
            {success ? (
              <div
                className={`${
                  templateDesign.containPosition === "center"
                    ? "text-center"
                    : templateDesign.containPosition === "right"
                    ? "text-right"
                    : "text-left"
                } flex flex-col justify-center`}
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
                    className="max-w-[130px] w-28 h-28 rounded-full object-cover"
                  />
                </div>
                <h2
                  className="text-4xl font-bold mt-4"
                  style={getStyle(templateDesign, "successHeading")}
                >
                  {templateDesign.successHeading }
                </h2>
                <span
                  className="text-xl font-bold mt-4"
                  style={getStyle(templateDesign, "successSubHeading")}
                >
                  {templateDesign.successSubHeading }
                </span>
                <p
                  className="text-lg mt-4"
                  style={getStyle(templateDesign, "successDescription")}
                >
                  {templateDesign.successDescription }
                </p>
              </div>
            ) : (
              <>
                <h2
                  className="text-4xl font-bold mb-4"
                  style={getStyle(templateDesign, "templateHeading")}
                >
                  {templateDesign.heading}
                </h2>
                
                <p
                  className="text-lg mb-6"
                  style={getStyle(templateDesign, "templateSubHeading")}
                >
                  {templateDesign.subHeading}
                </p>
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleSubmit}
                >
                  {addedFields.map((field, index) => (
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
                  ))}
                  {addedQuestion.map((field, index) => (
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
                  <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-md text-lg mt-3"
                    style={{
                      backgroundColor: templateDesign.templateButtonBgColor,
                    }}
                  >
                    {templateDesign.button}
                  </button>

                  {/* Display Stars Here */}
                  {templateDesign.formBorderStyle === "review" && (
                    <>{renderStars(reviewCount)}</>
                  )}
                  {templateDesign.formBorderStyle === "rating" && (
                    <>{renderNumbers(ratingCount)}</>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
