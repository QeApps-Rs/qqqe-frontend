import SurveyFormComponent from "../SurveyFormComponent";
import TemplateBannerComponent from "../TemplateBannerComponent";

/* eslint-disable react/prop-types */
const PreviewComponent = ({
  isView,
  templateDesign,
  combinedMargin,
  combinedPadding,
  imageSrc,
  containerClass,
  formClasses,
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
}) => {
  return (
    <div
      className="flex items-center justify-center bg-white"
      style={{
        backgroundColor: templateDesign.templateBgColor || "#000000",
        backgroundImage:
          isView !== "Desktop"
            ? "url('https://apps.qeapps.com/ecom_apps_n/production/qqqe-frontend/src/images/mobile_bg.png')"
            : "",

        height: "calc(100vh - 240px)",
      }}
    >
      <div
        className={formClasses()}
        style={{
          borderRadius: templateDesign.borderRadius || "16px",
          padding: combinedPadding,
          margin: combinedMargin,
        }}
      >
        <div className={containerClass}>
          <img
            src={imageSrc}
            alt="Promo"
            className={`w-full ${formClasses()}`}
          />
        </div>

        <div
          className={`p-8 flex flex-col justify-center h-full ${
            isView === "Desktop" ? "xl:col-span-7" : "sm:col-span-12"
          } `}
          style={{
            backgroundColor: templateDesign.templateOverlayColor || "#FFFFFF",
          }}
        >
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
                  className="max-w-[130px] w-27 h-27 rounded-full object-cover"
                />
              </div>
              <h2
                className="text-4xl font-bold mt-4"
                style={getStyle(templateDesign, "successHeading")}
              >
                {templateDesign.successHeading ||
                  "Thanks for sharing. Please check your email for confirmation message"}
              </h2>
              <span
                className="text-xl font-bold mt-4"
                style={getStyle(templateDesign, "successSubHeading")}
              >
                {templateDesign.successSubHeading ||
                  "Thanks for sharing. Please check your email for confirmation message"}
              </span>
              <p
                className="text-lg mt-4"
                style={getStyle(templateDesign, "successDescription")}
              >
                {templateDesign.successDescription ||
                  "Thanks for sharing. Please check your email for confirmation message"}
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-4xl font-bold mb-4"
                style={getStyle(templateDesign, "templateHeading")}
              >
                {templateDesign.heading }
              </h2>
              <h2
                className="text-4xl font-bold mb-4"
                style={getStyle(templateDesign, "templateOffer")}
              >
                {templateDesign.offerAmount || "10% OFF"}
              </h2>
              <p
                className="text-lg mb-6"
                style={getStyle(templateDesign, "templateSubHeading")}
              >
                {templateDesign.subHeading ||
                  "save on your first order and get email only offers when you join"}
              </p>
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
  );
};

export default PreviewComponent;
