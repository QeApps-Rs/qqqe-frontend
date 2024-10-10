import React from "react";
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function CartAbandonmentPopUp({
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
            className="text-center p-4"
            style={{
              backgroundColor: templateDesign.templateOverlayColor,
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
      className="flex justify-center items-center w-full h-full bg-white"
    >
      <div
        className="rounded-lg p-6 w-full max-w-6xl shadow-xl border border-gray-200"
        style={{
          backgroundColor: templateDesign.templateBgColor,
          borderRadius: templateDesign.borderRadius,
        }}
      >
        <div className="text-center mb-6">
          <h5 style={getStyle(templateDesign, "templateHeading")}>
            {templateDesign.heading || "Recommended for You!"}
          </h5>
          <h4
            className="text-lg font-semibold"
            style={getStyle(templateDesign, "templateOffer")}
          >
            {templateData.offerAmount ||
              "Check out these products we picked just for you!"}
          </h4>
        </div>

        {/* Red dotted border around products */}
        <div className="border-2 border-red-500 border-dotted rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {productData && productData.length > 0 ? (
              productData.map((product, index) => (
                <div
                  key={index}
                  className="text-center p-4"
                  style={{
                    backgroundColor: templateDesign.templateOverlayColor,
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
                    <p className="text-base font-medium max-w-xs mx-auto truncate">
                      <a href="#">{product.title}</a>
                    </p>
                  </Tooltip>
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
        <div className="flex justify-around mt-6">
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
        </div>
      </div>
    </div>
  );
}

export default CartAbandonmentPopUp;
