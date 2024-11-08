/* eslint-disable react/prop-types */
import { useEffect } from "react";
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function ProductUpSellPopUp({
  productData,
  noOfProducts,
  templateDesign,
  templateData,
  getStyle,
  setTemplateDesign,
}) {
  useEffect(() => {
    setTemplateDesign({
      ...templateDesign,
      templateBgColor: "#f13956",
      templateHeadingColor: "#ffffff",
      templateOfferColor: "#ffffff",
    });
  }, []);
  const DefaultProductDiv = ({ noOfProducts, defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: noOfProducts }, (_, index) => (
          <div
            key={index}
            className="rounded-lg "
            style={{
              padding: combinedPadding,
              backgroundColor: "transparent",
            }}
          >
            <div
              className="mb-4 h-40 flex rounded-lg items-center justify-center"
              style={{
                background: templateDesign.templateOverlayColor || "#FFFFFF",
              }}
            >
              <a href="#">
                <img
                  src={defaultProductImg}
                  alt={`product- ${index + 1}`}
                  className="h-32 "
                />
              </a>
            </div>
            <div className="text-center text-white mb-2">
              <p className="text-lg font-semibold">
                <a href="#">{`Product ${index + 1}`}</a>
              </p>
            </div>
            <div className="text-center text-white text-xl font-bold mb-4">
              ${Math.floor(Math.random() * 1000)}
            </div>
            <a
              className="block w-full text-center text-white py-2 rounded"
              href="#"
              style={{
                backgroundColor: templateDesign.templateButtonBgColor,
              }}
            >
              {templateDesign.button}
            </a>
          </div>
        ))}
      </>
    );
  };
  const combinedPadding = `
  ${templateDesign.templatePaddingTop} 
  ${templateDesign.templatePaddingRight} 
  ${templateDesign.templatePaddingBottom} 
  ${templateDesign.templatePaddingLeft}
`;
  const combinedMargin = `
  ${templateDesign.templateMarginTop} 
  ${templateDesign.templateMarginRight} 
  ${templateDesign.templateMarginBottom} 
  ${templateDesign.templateMarginLeft}
`;

  return (
    <>
      <div
        id="product-upSell-popup"
        className="justify-center items-center flex  border-l border-[#eaedef] w-full bg-white shadow-[6px_0px_7px_#ccc]"
        style={{ height: "calc(100vh - 240px)" }}
      >
        <div
          className=" w-full max-w-3xl relative  shadow-[7px_-7px_57px_#ccc]"
          style={{
            backgroundColor: templateDesign.templateBgColor || "#f43f5b",
            padding: combinedPadding,
            margin: combinedMargin,
            borderRadius: templateDesign.borderRadius || "12px",
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
          <div className="text-center mb-4">
            <h5
              style={getStyle(templateDesign, "templateHeading")}
              className="leading-none"
            >
              {templateDesign.heading}
            </h5>
            <h4
              className="leading-none mt-4"
              style={getStyle(templateDesign, "templateSubHeading")}
            >
              {templateDesign.subHeading || "HOTTEST PICKS YOU'LL LOVE"}
            </h4>
          </div>

          <div
            className="border-2 border-white border-dotted"
            style={{
              borderWidth: templateDesign.borderWidth,
              borderColor: templateDesign.templateBorderColor,
              border: templateDesign.formBorderStyle,
              borderStyle: templateDesign.formBorderStyle,
              borderRadius: templateDesign.borderRadius || "12px",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[360px] overflow-auto">
              {productData && productData.length > 0 ? (
                productData.map((product, index) => (
                  <div key={index} className="rounded-lg p-4 ">
                    <div
                      className="mb-4 h-40 flex  rounded-lg items-center justify-center"
                      style={{
                        background:
                          templateDesign.templateOverlayColor || "#FFFFFF",
                      }}
                    >
                      <a href="#">
                        <img
                          src={product.image}
                          alt={product.variantHandle}
                          className="h-32 "
                        />
                      </a>
                    </div>
                    <div className="text-center mb-2 text-white ">
                      <Tooltip
                        title={product.title}
                        position="bottom"
                        trigger="mouseenter"
                      >
                        <p className="text-lg font-semibold text-white max-w-[350px] truncate">
                          <a href="#">{product.title}</a>
                        </p>
                      </Tooltip>
                    </div>

                    <div className="text-center text-white text-xl font-bold mb-4">
                      ${product.price}
                    </div>
                    <a
                      className="block w-full text-center  text-white py-2 rounded hover:bg-gray-800"
                      href="#"
                      style={{
                        backgroundColor: templateDesign.templateButtonBgColor,
                      }}
                    >
                      {templateDesign.button || "See Details"}
                    </a>
                  </div>
                ))
              ) : (
                <DefaultProductDiv
                  noOfProducts={noOfProducts}
                  defaultProductImg={defaultProductImg}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductUpSellPopUp;
