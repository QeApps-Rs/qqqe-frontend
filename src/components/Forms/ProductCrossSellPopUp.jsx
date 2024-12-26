/* eslint-disable react/prop-types */
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function ProductCrossSellPopUp({
  productData,
  noOfProducts,
  templateDesign,
  successImg,
  success,
  getStyle,
}) {
  const DefaultProductDiv = ({ noOfProducts, defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: noOfProducts }, (_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center rounded-lg gap-4 w-full bg-white"
            style={{
              order: templateDesign.imagePosition,
              borderRadius: templateDesign.borderRadius || "16px",
            }}
          >
            <div className="w-full md:w-1/2">
              <a href="#" className="mb-4 block">
                <img
                  src={defaultProductImg}
                  alt={`product- ${index + 1}`}
                  className="w-full h-40 rounded-lg object-fill"
                />
              </a>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-lg font-small mb-2">{`Product ${
                index + 1
              }`}</p>
              <p className="text-xl font-bold mb-4">
                ${Math.floor(Math.random() * 1000)}
              </p>
              <a
                className="block w-full bg-[#2db775] text-white p-2 rounded-lg hover:bg-gray-800 text-center"
                href="#"
                style={{
                  backgroundColor: templateDesign.templateButtonBgColor,
                }}
              >
                {templateDesign.button}
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

  return (
    <div
      id="product-bundle"
      className="flex justify-center items-center w-full bg-white px-4 py-6"
      style={{ minHeight: "calc(100vh - 300px)" }}
    >
      <div
        className="p-6 w-full max-w-5xl rounded-lg"
        style={{
          backgroundColor: templateDesign.templateBgColor,
          borderRadius: templateDesign.borderRadius,
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) -2px -4px 3px",
        }}
      >
        {success ? (
          <div
            className={`${
              templateDesign.containPosition === "center"
                ? "text-center"
                : templateDesign.containPosition === "right"
                ? "text-right"
                : "text-left"
            } flex flex-col justify-center w-full p-4`}
          >
            <div
              className={`${
                templateDesign.containPosition === "center"
                  ? "justify-center"
                  : templateDesign.containPosition === "left"
                  ? "justify-start"
                  : "justify-end"
              } flex w-full`}
            >
              <img
                src={successImg}
                alt="Success"
                className="max-w-[130px] w-12 h-12 rounded-full object-cover"
              />
            </div>
            <h2
              className="text-4xl font-bold mt-4"
              style={getStyle(templateDesign, "successHeading")}
            >
              {templateDesign.successHeading}
            </h2>
            <span
              className="text-xl font-bold mt-4"
              style={getStyle(templateDesign, "successSubHeading")}
            >
              {templateDesign.successSubHeading}
            </span>
            <p
              className="text-lg mt-4"
              style={getStyle(templateDesign, "successDescription")}
            >
              {templateDesign.successDescription}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <h4
                className="text-lg font-semibold leading-none"
                style={getStyle(templateDesign, "templateHeading")}
              >
                {templateDesign.heading}
              </h4>
            </div>

            <div
              className="rounded-lg p-4 "
              style={{
                borderWidth: templateDesign.borderWidth,
                borderColor: templateDesign.templateBorderColor,
                borderStyle: templateDesign.formBorderStyle,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productData && productData.length > 0 ? (
                  productData.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-center rounded-lg p-4 gap-4 w-full bg-white"
                      style={{}}
                    >
                      <div className="w-full md:w-1/2">
                        <a href="#">
                          <img
                            src={product.image}
                            alt={product.variantHandle}
                            className="w-full h-40 rounded-lg object-fill"
                          />
                        </a>
                      </div>
                      <div className="w-full md:w-1/2">
                        <Tooltip
                          title={product.title}
                          position="bottom"
                          trigger="mouseenter"
                        >
                          <p className="text-lg font-small mb-2 max-w-[240px] truncate">
                            <a href="#">{product.title}</a>
                          </p>
                        </Tooltip>
                        <p className="text-xl font-bold mb-4">
                          ${product.price}
                        </p>
                        <a
                          className="block w-max bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 text-center"
                          href="#"
                          style={{
                            backgroundColor:
                              templateDesign.templateButtonBgColor,
                          }}
                        >
                          {templateDesign.button}
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
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCrossSellPopUp;
