/* eslint-disable react/prop-types */
import React from "react";
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function CartAbandonmentPopUp({
  productData,
  noOfProducts,
  templateDesign,
  getStyle,
}) {
  const DefaultProductDiv = ({ noOfProducts, defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: noOfProducts }, (_, index) => (
          <div
            key={index}
            className="text-center p-4"
            style={{
              backgroundColor: templateDesign.templateOverlayColor || "#959595",
              borderRadius: templateDesign.borderRadius || "16px",
            }}
          >
            <div className="mb-4">
              <img
                src={defaultProductImg}
                alt={`product- ${index + 1}`}
                className="w-32 h-32 object-contain mx-auto"
              />
            </div>
            <p className="text-base font-medium">{`Product ${index + 1}`}</p>
            <a
              key={index}
              href="#"
              className=" text-white py-2 px-6 rounded-lg inline-block mt-4"
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

  // Apply default margin if not provided
  const combinedMargin = `
    ${templateDesign.templateMarginTop} 
    ${templateDesign.templateMarginRight} 
    ${templateDesign.templateMarginBottom} 
    ${templateDesign.templateMarginLeft}
  `;

  return (
    <div
      id="product-bundle"
      className="flex justify-center items-center w-full h-full bg-white"
      style={{ height: "calc(100vh - 240px)" }}
    >
      <div
        className="w-full shadow-xl "
        style={{
          backgroundColor: templateDesign.templateBgColor || "#c3e7cf",
          borderRadius: templateDesign.borderRadius || "16px",
          padding: combinedPadding,
          margin: combinedMargin,
        }}
      >
        <div className="flex justify-end mb-2">
          <h4
            className="leading-none font-bold"
            style={getStyle(templateDesign, "templateEmail")}
          >
            {templateDesign.templateEmailText}
          </h4>
        </div>
        <div className="text-center mb-6">
          <h5
            style={getStyle(templateDesign, "templateHeading")}
            className="leading-none"
          >
            {templateDesign.heading}
          </h5>
          <h4
            className="leading-none mt-3"
            style={getStyle(templateDesign, "templateSubHeading")}
          >
            {templateDesign.subHeading ||
              "Check out these products we picked just for you!"}
          </h4>
        </div>

        {/* Red dotted border around products */}
        <div
          className=" p-4"
          style={{
            borderStyle: templateDesign.formBorderStyle || "solid",
            borderWidth: templateDesign.borderWidth || "2px",
            borderColor: templateDesign.templateBorderColor || "#E5E7EB",
            borderRadius: templateDesign.borderRadius || "16px",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-auto max-h-[300px]">
            {productData && productData.length > 0 ? (
              productData.map((product, index) => (
                <div
                  key={index}
                  className="text-center p-4"
                  style={{
                    backgroundColor:
                      templateDesign.templateOverlayColor || "#959595",
                    borderRadius: templateDesign.borderRadius || "16px",
                  }}
                >
                  <a href="#" className="mb-4">
                    <img
                      src={product.image}
                      alt={product.variantHandle}
                      className="w-32 h-32 object-contain mx-auto"
                    />
                  </a>
                  <Tooltip
                    title={product.title}
                    position="bottom"
                    trigger="mouseenter"
                  >
                    <p className="text-base font-medium max-w-xs mx-auto truncate text-white mt-4">
                      <a href="#">{product.title}</a>
                    </p>
                  </Tooltip>
                  <p className="text-xl text-white  font-bold mt-2">
                    ${product.price}
                  </p>
                  <a
                    key={index}
                    href="#"
                    className=" text-white py-2 px-6 rounded-lg inline-block mt-4"
                    style={{
                      backgroundColor: templateDesign.templateButtonBgColor,
                    }}
                  >
                    {templateDesign.button}
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

        {/* Shop Now buttons below red border */}
        {/* <div className="flex justify-around mt-6">
          {productData && productData.length > 0
            ? productData.map((_, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-red-500 text-white py-2 px-6 rounded-lg inline-block"
                >
                  Shop Now
                </a>
              ))
            : Array.from({ length: noOfProducts }).map((_, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-red-500 text-white py-2 px-6 rounded-lg inline-block"
                >
                  Shop Now
                </a>
              ))}
        </div> */}
      </div>
    </div>
  );
}

export default CartAbandonmentPopUp;
