/* eslint-disable react/prop-types */
import { useEffect } from "react";
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function ProductUpSellPopUp({
  productData,
  noOfProducts,
  templateDesign,
  successImg,
  success,
  getStyle,
}) {
  // useEffect(() => {
  //   setTemplateDesign({
  //     ...templateDesign,
  //     templateBgColor: "#f13956",
  //     templateHeadingColor: "#ffffff",
  //     templateOfferColor: "#ffffff",
  //   });
  // }, []);
  const DefaultProductDiv = ({ noOfProducts, defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: noOfProducts }, (_, index) => (
          <div
            key={index}
            className="rounded-lg "
            style={{
              backgroundColor: "transparent",
            }}
          >
            <div className="mb-4 h-40 flex rounded-lg items-center justify-center bg-white">
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
              className="block w-full text-center border border-white text-white py-2 rounded"
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

  return (
    <>
      <div
        id="product-upSell-popup"
        className="justify-center items-center flex  w-full bg-white shadow-[6px_0px_7px_#ccc] px-4 py-6"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        {success ? (
          <div
            className="p-6 w-full max-w-3xl rounded-xl"
            style={{
              backgroundColor: templateDesign.templateBgColor,
              borderRadius: templateDesign.borderRadius,
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) -2px -4px 3px",
            }}
          >
            <div
              className={`${
                templateDesign.containPosition === "center"
                  ? "text-center"
                  : templateDesign.containPosition === "right"
                  ? "text-right"
                  : "text-left"
              } flex flex-col justify-center m-auto w-10/12`}
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
                className="font-bold mt-2"
                style={getStyle(templateDesign, "successHeading")}
              >
                {templateDesign.successHeading}
              </h2>
              <p
                className="font-normal mt-2"
                style={getStyle(templateDesign, "successDescription")}
              >
                {templateDesign.successDescription}
              </p>
              <span
                className="font-bold mt-2 cursor-pointer "
                style={getStyle(templateDesign, "successSubHeading")}
              >
                {templateDesign.successSubHeading}
              </span>
            </div>
          </div>
        ) : (
          <div
            className=" w-full max-w-3xl relative  shadow-[7px_-7px_57px_#ccc] px-4 py-6"
            style={{
              backgroundColor: templateDesign.templateBgColor,
              borderRadius: templateDesign.borderRadius,
            }}
          >
            <div className="text-center mb-4">
              <h5
                style={getStyle(templateDesign, "templateHeading")}
                className="leading-none"
              >
                {templateDesign.heading}
              </h5>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              style={{
                borderWidth: templateDesign.borderWidth,
                border: templateDesign.formBorderStyle,
                borderStyle: templateDesign.formBorderStyle,
                borderColor: templateDesign.templateBorderColor,
                borderRadius: templateDesign.borderRadius,
              }}
            >
              {productData && productData.length > 0 ? (
                productData.map((product, index) => (
                  <div key={index} className="rounded-lg p-4 ">
                    <div className="mb-4 h-40 flex  rounded-lg items-center justify-center bg-white">
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
                      className="block w-full text-center  text-white border border-white py-2 rounded hover:bg-gray-800"
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
        )}
      </div>
    </>
  );
}

export default ProductUpSellPopUp;
