/* eslint-disable react/prop-types */
import defaultProductImg from "../../images/default_product.png";
import { Tooltip } from "react-tippy";

function CartAbandonmentPopUp({
  productData,
  noOfProducts = 4,
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
                className="object-fill mx-auto rounded-lg"
                style={{ width: "180px", height: "180px" }}
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

  return (
    <div
      id="product-bundle"
      className="flex justify-center items-center w-full bg-white px-4 py-6"
      style={{ minHeight: "calc(100vh - 300px)" }}
    >
      <div
        className="p-6 w-full max-w-5xl rounded-xl"
        style={{
          backgroundColor: templateDesign.templateBgColor,
          borderRadius: templateDesign.borderRadius,
          padding: combinedPadding,
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) -2px -4px 3px",
        }}
      >
        <div className="text-center mb-6">
          <h5
            style={getStyle(templateDesign, "templateHeading")}
            className="leading-none"
          >
            {templateDesign.heading}
          </h5>
        </div>

        {/* Red dotted border around products */}
        <div
          className=" p-4"
          style={{
            borderStyle: templateDesign.formBorderStyle,
            borderWidth: templateDesign.borderWidth,
            borderColor: templateDesign.templateBorderColor,
            borderRadius: templateDesign.borderRadius,
          }}
        >
          {productData && productData.length > 0 ? (
            <div
              className={`grid grid-cols-1 gap-6 overflow-auto max-h-[350px] ${
                productData && productData.length <= 3
                  ? "sm:grid-cols-3"
                  : "sm:grid-cols-4"
              }`}
            >
              {productData.map((product, index) => (
                <div
                  key={index}
                  className="text-center p-4"
                  style={{
                    backgroundColor: templateDesign.templateOverlayColor,
                    borderRadius: templateDesign.borderRadius,
                  }}
                >
                  <a href="#" className="mb-4 lg">
                    <img
                      src={product.image}
                      alt={product.variantHandle}
                      className="object-fill mx-auto rounded-xl"
                      style={{ width: "180px", height: "180px" }}
                    />
                  </a>

                  <Tooltip
                    title={product.title}
                    position="bottom"
                    trigger="mouseenter"
                  >
                    <p className="text-base font-medium max-w-xs mx-auto truncate text-black mt-4">
                      <a href="#">{product.title}</a>
                    </p>
                  </Tooltip>
                  <p className="text-xl text-black  font-bold mt-2">
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
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 overflow-auto max-h-[350px] sm:grid-cols-4">
              <DefaultProductDiv
                noOfProducts={noOfProducts}
                defaultProductImg={defaultProductImg}
              />
            </div>
          )}
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
