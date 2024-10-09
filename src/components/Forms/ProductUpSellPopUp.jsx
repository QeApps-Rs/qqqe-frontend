import React, { useEffect } from "react";
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function ProductUpSellPopUp({
  productData,
  noOfProducts,
  templateDesign,
  templateData,
  getStyle,
}) {
  useEffect(() => {
    templateDesign["templateBgColor"] = "#f13956";
    templateDesign["templateHeadingColor"] = "#ffffff";
    templateDesign["templateOfferColor"] = "#ffffff";
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
            <div className="mb-4 bg-white">
              <a href="#">
                <img
                  src={defaultProductImg}
                  alt={`product- ${index + 1}`}
                  className="w-full h-auto rounded-lg"
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
              className="block w-full text-center border text-white py-2 rounded hover:bg-gray-800"
              href="#"
              style={{
                backgroundColor: "transparent",
              }}
            >
              {templateData.button || "See Details"}
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
        className="h-full justify-center items-center flex  border-l border-[#eaedef] w-full bg-white shadow-[6px_0px_7px_#ccc]"
      >
        <div
          className=" rounded-lg  p-6 w-full max-w-3xl relative  shadow-[7px_-7px_57px_#ccc]"
          style={{
            backgroundColor: templateDesign.templateBgColor,
            border: templateDesign.formBorderStyle,
            borderRadius: templateDesign.borderRadius,
            borderWidth: templateDesign.borderWidth,
            borderColor: templateDesign.templateBorderColor,
            borderStyle: templateDesign.formBorderStyle,
          }}
        >
          <div className="text-center mb-4">
            <h5 style={getStyle(templateDesign, "templateHeading")}>
              {templateData.heading || "TRANSPARENT"}
            </h5>
            <h4
              className="text-lg font-semibold"
              style={getStyle(templateDesign, "templateOffer")}
            >
              {templateData.offerAmount || "HOTTEST PICKS YOU'LL LOVE"}
            </h4>
          </div>

          <div className="border-2 border-white border-dotted">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[360px] overflow-auto"
              style={{ margin: combinedMargin }}
            >
              {productData && productData.length > 0 ? (
                productData.map((product, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-4 "
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="mb-4 bg-white">
                      <a href="#">
                        <img
                          src={product.image}
                          alt={product.variantHandle}
                          className="w-32 h-32 mx-auto rounded-lg"
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
                      className="block w-full text-center border text-white py-2 rounded hover:bg-gray-800"
                      href="#"
                      style={{
                        backgroundColor: "transparent",
                      }}
                          >
                    {templateData.button || "See Details"}
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
