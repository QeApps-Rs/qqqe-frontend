/* eslint-disable react/prop-types */

import TemplateBannerComponent from "../../pages/forms/TemplateBannerComponent";

const WorldWideWelcomePopUp = ({
  templateDesign,
  getStyle,
  combinedPadding,
  combinedMargin,
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
      className="relative flex justify-center shadow-lg w-3/5"
      style={{
        backgroundColor: templateDesign.templateBgColor,
        borderRadius: templateDesign.borderRadius,
        borderWidth: templateDesign.borderWidth,
        borderColor: templateDesign.templateBorderColor,
        border: templateDesign.formBorderStyle,
        borderStyle: templateDesign.formBorderStyle,
      }}
    >
      <div className="w-1/2 flex justify-center h-full items-center py-10 px-4 flex-col">
        {" "}
        <div className="text-center mb-8">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <div className="text-lg italic text-gray-900"          style={getStyle(templateDesign, "templateHeading")}>

              {templateDesign.heading}
            </div>

            <div>
              <div
                className="w-8 h-[23px] absolute bottom-[-23px] left-3 m-0"
                style={{
                  background:
                    "url(https://apps.qeapps.com/ecom_apps_n/production/qqqe-frontend/src/images/arrow_qts.png) left top no-repeat",
                }}
              ></div>
            </div>
          </div>
        </div>
        <h3
          className="text-center text-gray-900 font-bold mb-4"
          style={getStyle(templateDesign, "templateSubHeading")}
        >
          {templateDesign.subHeading}
        </h3>
        <h2
          className="text-center  font-bold mb-4"
          style={getStyle(templateDesign, "templateOffer")}
        >
          {templateDesign.offerAmount }
        </h2>
        {/* <form className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border rounded-lg outline-none "
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
                className="w-full text-white p-3 mt-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: templateDesign.templateButtonBgColor,
                }}
              >
                {templateDesign.button}
              </button>
            </form> */}
        <form
          className="flex flex-col space-y-4 w-full"
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

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-md text-lg mt-3"
            style={{
              backgroundColor: templateDesign.templateButtonBgColor,
            }}
          >
            {templateDesign.button}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorldWideWelcomePopUp;
