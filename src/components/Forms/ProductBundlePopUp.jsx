import React from "react";
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function ProductBundlePopUp({
  productData,
  noOfProducts,
  templateDesign,
  templateData,
  getStyle,
}) {
  const DefaultProductDiv = ({ noOfProducts, defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: noOfProducts }, (_, index) => (
          <div
            key={index}
            className="border rounded-lg "
            style={{ padding: combinedPadding  , backgroundColor:templateDesign.templateOverlayColor}}
          >
            <div className="mb-4">
              <a href="#">
                <img
                  src={defaultProductImg}
                  alt={`product- ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
            <div className="text-center mb-2">
              <p className="text-lg font-semibold">
                <a href="#">{`Product ${index + 1}`}</a>
              </p>
            </div>
            <div className="text-center text-xl font-bold mb-4">
              ${Math.floor(Math.random() * 1000)}
            </div>
            <a
              className="block w-full text-center bg-black text-white py-2 rounded hover:bg-gray-800"
              href="#"
              style={{
                backgroundColor: templateDesign.templateButtonBgColor,
              }}
            >
              {templateData.button || "Continue"}
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
        id="product-bundle"
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
              {templateData.heading || "Welcome back!"}
            </h5>
            <h4
              className="text-lg font-semibold"
              style={getStyle(templateDesign, "templateOffer")}
            >
              {templateData.offerAmount || "Pick up where you left off"}
            </h4>
            <p
              className="text-lg mt-4"
              style={getStyle(templateDesign, "templateSubheading")}
            >
              {templateData.subHeading ||
                "Save on your first order and get email-only offers when you join."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[360px] overflow-auto" style={{margin:combinedMargin}}>
            {productData && productData.length > 0 ? (
              productData.map((product, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 "
                  style={{
                    backgroundColor: templateDesign.templateOverlayColor,
                  }}
                >
                  <div className="mb-4">
                    <a href="#">
                      <img
                        src={product.image}
                        alt={product.variantHandle}
                        className="w-32 h-32 mx-auto rounded-lg"
                      />
                    </a>
                  </div>
                  <div className="text-center mb-2 ">
                    <Tooltip
                      title={product.title}
                      position="bottom"
                      trigger="mouseenter"
                    >
                      <p className="text-lg font-semibold max-w-[350px] truncate">
                        <a href="#">{product.title}</a>
                      </p>
                    </Tooltip>
                  </div>

                  <div className="text-center text-xl font-bold mb-4">
                    ${product.price}
                  </div>
                  <a
                    className="block w-full text-center bg-black text-white py-2 rounded hover:bg-gray-800"
                    href="#"
                  >
                    Shop now
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
    </>
  );
}

export default ProductBundlePopUp;
