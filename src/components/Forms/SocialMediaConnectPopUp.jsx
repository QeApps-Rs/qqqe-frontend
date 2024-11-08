/* eslint-disable react/prop-types */

const SocialMediaConnectPopUp = ({
  getStyle,
  templateDesign,
  combinedPadding,
  combinedMargin,
  socialMediaPopupimageSrc,
  formClasses,
}) => {
  return (
    <div
      className={`relative p-8 shadow-lg ${formClasses()}`}
      style={{
        background: templateDesign.templateBgColor || "#949494",
        borderRadius: templateDesign.borderRadius || "12px",
        borderWidth: templateDesign.borderWidth,
        borderColor: templateDesign.templateBorderColor,
        border: templateDesign.formBorderStyle,
        borderStyle: templateDesign.formBorderStyle,
        padding: combinedPadding,
        margin: combinedMargin,
        display: "block",
      }}
    >
      <div className="flex justify-end mb-2">
        <h4
          className="leading-none font-bold"
          style={getStyle(templateDesign, "templateEmail")}
        >
          {templateDesign.templateEmailText || "qqqe@gamil.com"}
        </h4>
      </div>
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "calc(100% - 40px)" }}
      >
        <div className="w-1/2">
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
            {templateDesign.subHeading ||
              "We are sure we can pump up your next Facebook story with a cool new blender! Get your secret discount now!"}
          </p>

          <form className="space-y-4">
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
          </form>
        </div>
      </div>
    </div>
  );
};
export default SocialMediaConnectPopUp;
