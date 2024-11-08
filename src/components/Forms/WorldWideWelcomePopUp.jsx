/* eslint-disable react/prop-types */

const WorldWideWelcomePopUp = ({
  templateDesign,
  getStyle,
  combinedPadding,
  combinedMargin,
  formClasses,
}) => {
  return (
    <div
      className={` relative justify-start shadow-lg w-1/3 ${formClasses()}`}
      style={{
        backgroundColor: templateDesign.templateBgColor || "#1fbdcb",
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
      <div className="w-full block justify-center items-center h-full">
        <div className="flex justify-end mb-2">
          <h4
            className="leading-none font-bold"
            style={getStyle(templateDesign, "templateEmail")}
          >
            {templateDesign.templateEmailText || "qqqe@gamil.com"}
          </h4>
        </div>
        <div className="w-full flex justify-center h-full items-center">
          {" "}
          <div className="w-1/2">
            <div className="text-center mb-8">
              <div className="relative bg-white p-4 rounded-lg shadow-lg">
                <div className="text-lg italic text-gray-900">
                  {templateDesign.heading ||
                    "Excellent customer service and a great product! 5 stars!"}
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
              {templateDesign.subHeading || "We are shipping to Denmark"}
            </h3>
            <h2
              className="text-center  font-bold mb-4"
              style={getStyle(templateDesign, "templateOffer")}
            >
              {templateDesign.offerAmount || "Join us and get 10% OFF"}
            </h2>
            <form className="space-y-4">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldWideWelcomePopUp;
