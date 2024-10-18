/* eslint-disable react/prop-types */
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function ProductCrossSellPopUp({
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
            className="flex items-center text-center rounded-lg"
            style={{
              padding: combinedPadding,
              backgroundColor: templateDesign.templateOverlayColor,
              order: templateDesign.imagePosition,
            }}
          >
            <div className="block">
              <a href="#" className="mb-4">
                <img
                  src={defaultProductImg}
                  alt={`product- ${index + 1}`}
                  className="w-32 h-32 rounded-lg mr-2"
                />
              </a>
            </div>
            <div className="block">
              <p className="text-lg font-small mb-2">{`Product ${
                index + 1
              }`}</p>
              <p className="text-xl font-bold mb-4">
                ${Math.floor(Math.random() * 1000)}
              </p>
              <a
                className="block w-full bg-[#2db775] text-white p-2 rounded hover:bg-gray-800"
                href="#"
                style={{
                  backgroundColor: "bg-[#2db775]",
                }}
              >
                {templateData.button || "Shop Now"}
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
      className="flex justify-center items-center w-full h-[calc(100vh-300px)]"
    >
      <div
        className="rounded-lg p-6 w-full max-w-4xl shadow-xl  border-l border-[#eaedef]"
        style={{
          backgroundColor: templateDesign.templateBgColor,
          borderRadius: templateDesign.borderRadius,
        }}
      >
        <div className="text-center mb-4">
          <h4
            className="text-lg font-semibold leading-none"
            style={getStyle(templateDesign, "templateHeading")}
          >
            {templateDesign.heading}
          </h4>
        </div>

        {/* Red dotted border around products */}

        <div
          className="border-2 border-red-500 border-dotted rounded-lg p-4"
          style={{
            borderWidth: templateDesign.borderWidth,
            borderColor: templateDesign.templateBorderColor,
            borderStyle: templateDesign.formBorderStyle,
          }}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[320px] overflow-y-auto"
            style={{ margin: combinedMargin }}
          >
            {productData && productData.length > 0 ? (
              productData.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center rounded-lg p-4 "
                  style={{
                    backgroundColor: templateDesign.templateOverlayColor,
                  }}
                >
                  <a href="#" className="mb-4">
                    <img
                      src={product.image}
                      alt={product.variantHandle}
                      className="w-32 h-32 rounded-lg"
                    />
                  </a>
                  <Tooltip
                    title={product.title}
                    position="bottom"
                    trigger="mouseenter"
                  >
                    <p className="text-lg font-small mb-2 max-w-[240px] truncate">
                      <a href="#">{product.title}</a>
                    </p>
                  </Tooltip>
                  <p className="text-xl font-bold mb-4">${product.price}</p>
                  <a
                    className="block w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                    href="#"
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
      </div>
    </div>
  );
}

export default ProductCrossSellPopUp;
