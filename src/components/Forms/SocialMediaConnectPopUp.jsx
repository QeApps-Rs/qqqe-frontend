/* eslint-disable react/prop-types */

import TemplateBannerComponent from "../../pages/forms/TemplateBannerComponent";

const SocialMediaConnectPopUp = ({
  getStyle,
  templateDesign,
  combinedPadding,
  combinedMargin,
  socialMediaPopupimageSrc,
  formClasses,
  handleSubmit,
  addedFields,
  handleInputChange,
  isSubmitted,
  handleDeleteField,
  handleEdit,
  inputValues,
}) => {
  return (
    <div
    className="flex justify-center items-center w-full bg-white px-4 py-6"
  >
    <div
        className="p-6 w-full max-w-2xl rounded-xl flex justify-center"
        style={{
        background: templateDesign.templateBgColor || "#949494",
        borderRadius: templateDesign.borderRadius || "12px",
        borderWidth: templateDesign.borderWidth,
        borderColor: templateDesign.templateBorderColor,
        border: templateDesign.formBorderStyle,
        borderStyle: templateDesign.formBorderStyle,
        padding: combinedPadding,
        margin: combinedMargin,
        boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) -2px -4px 3px",
      }}
    >
      <div
        className="flex justify-center items-center flex-col w-9/12 "
      >
      
          <div className="flex justify-center mb-4">
            {socialMediaPopupimageSrc ? (
              <img
                src={socialMediaPopupimageSrc}
                alt="Facebook Icon"
                className="w-8 h-8"
              />
            ) : (
              <i
                className="fa fa-facebook-square text-2xl"
                aria-hidden="true"
              ></i>
            )}
          </div>

          <h2
            className="text-center leading-none font-bold mb-2"
            style={getStyle(templateDesign, "templateHeading")}
          >
            {templateDesign.heading}
          </h2>

          <p
            className="text-center text-gray-600 mb-6"
            style={getStyle(templateDesign, "templateSubHeading")}
          >
            {templateDesign.subHeading }
          </p>

          {/* <form className="space-y-4">
            {["email", "text"].map((type, index) => (
              <input
                key={type}
                type={type}
                placeholder={index === 0 ? "Email" : "First Name"}
                className="w-full p-3 rounded-lg outline-none"
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
            ))}
            <button
              className="w-full text-white p-3 mt-3 rounded-lg font-semibold"
              style={{
                backgroundColor:
                  templateDesign.templateButtonBgColor || "#5B21B6",
              }}
            >
              {templateDesign.button}
            </button>
          </form> */}

          <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
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
<div className="w-full flex justify-center">
<button
              type="submit"
              className="bg-black text-white py-3 rounded-full text-lg mt-3 w-[75%]"
              style={{
                backgroundColor: templateDesign.templateButtonBgColor,
              }}
            >
              {templateDesign.button}
            </button>
</div>
           
          </form>
        </div>
      </div>
      </div>
  );
};
export default SocialMediaConnectPopUp;
