/* eslint-disable react/prop-types */
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function ProductBundlePopUp({
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
            style={{
              backgroundColor: templateDesign.templateOverlayColor || "#ffffff",
              borderStyle: templateDesign.formBorderStyle ,
              borderWidth: templateDesign.borderWidth ,
              borderColor: templateDesign.templateBorderColor,
              padding: combinedPadding,
            }}
          >
            <div className="mb-4">
              <a href="#">
                <img
                  src={defaultProductImg}
                  alt={`product- ${index + 1}`}
                  className="w-32 h-32 mx-auto rounded-lg"
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
              {templateDesign.button || "Continue"}
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
        id="product-bundle"
        className="justify-center items-center flex w-full"
        style={{ height: "calc(100vh - 240px)" }}
      >
        <div
          className="p-6 w-full relative  shadow-[7px_-7px_57px_#ccc]"
          style={{
            backgroundColor: templateDesign.templateBgColor || "#9f9e9e",
            borderRadius: templateDesign.borderRadius || "14px",
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
          <div className="text-center mb-4">
            <h5
              style={getStyle(templateDesign, "templateHeading")}
              className="leading-none"
            >
              {templateDesign.heading}
            </h5>
            <h4
              className="leading-none mt-4"
              style={getStyle(templateDesign, "templateOffer")}
            >
              {templateDesign.offerAmount || "Pick up where you left off"}
            </h4>
            <p
              className="mt-4 leading-none"
              style={getStyle(templateDesign, "templateSubHeading")}
            >
              {templateDesign.subHeading ||
                "Save on your first order and get email-only offers when you join."}
            </p>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${
              productData && productData.length > 0
                ? ""
                : "max-h-[360px]  overflow-auto"
            }`}
          >
            {productData && productData.length > 0 ? (
              productData.map((product, index) => (
                <div
                  key={index}
                  className="p-4 "
                  style={{
                    borderStyle: templateDesign.formBorderStyle,
                    backgroundColor:
                      templateDesign.templateOverlayColor || "#ffffff",
                    borderWidth: templateDesign.borderWidth,
                    borderColor: templateDesign.templateBorderColor,
                    border: templateDesign.formBorderStyle,
                    borderRadius: templateDesign.borderRadius || "14px",
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
    </>
  );
}

export default ProductBundlePopUp;
