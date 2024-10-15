import React from "react";
import defaultProductImg from "../../images/default_product_1.png";
import { Tooltip } from "react-tippy";

function ExitProductRecommenderPopup({
  productData,
  noOfProducts,
  templateDesign,
  templateData,
  getStyle,
}) {
  const DefaultProductDiv = ({ noOfProducts, defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: 1 }, (_, index) => (
          <div
            key={index}
            className="flex items-center text-center rounded-lg relative"
            style={{
              padding: combinedPadding,
              backgroundColor: templateDesign.templateOverlayColor,
            }}
          >
            <div className="block z-10">
              <h1 className="text-6xl font-bold mb-4 relative">
                {templateDesign.heading || "HI, THANKS FOR STOPPING BY!"}
              </h1>
              <h4 className="text-2xl font-bold mb-4 relative">
                {"You just unlocked a free flavour."}
              </h4>
              <p
                className="text-lg mb-6"
                style={getStyle(templateDesign, "templateSubheading")}
              >
                {templateDesign.subheading ||
                  "You can shop with us again in the near future."}
              </p>
              <p className="text-lg font-small mb-2">{`Product ${
                index + 1
              }`}</p>
              <p className="text-xl font-bold mb-4">
                ${Math.floor(Math.random() * 1000)}
              </p>
              <a
                className="block w-full bg-[#ed5a29] text-white py-2 rounded hover:bg-gray-800"
                href="#"
                style={{
                  backgroundColor: "bg-[#ed5a29]",
                }}
              >
                {templateData.button || "Go To Checkout"}
              </a>
            </div>
            <div className="block ">
              <a href="#" className="mb-4">
                <img
                  src={defaultProductImg}
                  alt={`product- ${index + 1}`}
                  className="h-[500px] absolute right-[-40px] bottom-0"
                  style={{ rotate: "330deg" }}
                />
              </a>
            </div>
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
    <div
      id="product-bundle"
      className="flex h-full justify-center items-center w-full bg-white "
    >
      <div
        className="rounded-lg p-6 w-full max-w-4xl shadow-xl border-l border-[#eaedef]"
        style={{
          backgroundColor: templateDesign.templateBgColor,
          border: templateDesign.formBorderStyle,
          borderRadius: templateDesign.borderRadius,
          borderWidth: templateDesign.borderWidth,
          borderColor: templateDesign.templateBorderColor,
          borderStyle: templateDesign.formBorderStyle,
        }}
      >
        <div className="rounded-lg p-4">
          <div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6"
            style={{ margin: combinedMargin }}
          >
            {productData && productData.length > 0 ? (
              productData.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center text-center rounded-lg relative"
                  style={{
                    backgroundColor: templateDesign.templateOverlayColor,
                    padding: combinedPadding,
                  }}
                >
                  <div className="block z-10">
                    <h1 className="text-6xl font-bold mb-4 relative">
                      {templateDesign.heading || "HI, THANKS FOR STOPPING BY!"}
                    </h1>
                    <h4 className="text-2xl font-bold mb-4 relative">
                      {"You just unlocked a free flavour."}
                    </h4>
                    <p
                      className="text-lg mb-6"
                      style={getStyle(templateDesign, "templateSubheading")}
                    >
                      {templateDesign.subheading ||
                        "You can shop with us again in the near future."}
                    </p>
                    <p className="text-lg font-small mb-2">{`Product ${
                      index + 1
                    }`}</p>
                    <p className="text-xl font-bold mb-4">
                      ${product.price}
                    </p>
                    <a
                      className="block w-full bg-[#ed5a29] text-white py-2 rounded hover:bg-gray-800"
                      href="#"
                      style={{
                        backgroundColor: "bg-[#ed5a29]",
                      }}
                    >
                      {templateData.button || "Go To Checkout"}
                    </a>
                  </div>
                  <div className="block ">
                    <a href="#" className="mb-4">
                      <img
                        src={product.image}
                        alt={product.variantHandle}
                        className="h-[500px] absolute right-[-40px] bottom-0"
                        style={{ rotate: "330deg" }}
                      />
                    </a>
                  </div>
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
  );
}

export default ExitProductRecommenderPopup;
