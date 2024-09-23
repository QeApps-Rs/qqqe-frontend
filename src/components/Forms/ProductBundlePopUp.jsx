import React from "react";
import successImg from "../../../src/images/success_fn.png";
import defaultProductImg from "../../images/default_product.png";
function ProductBundlePopUp({ productData, noOfProducts }) {
  const DefaultProductDiv = ({ noOfProducts, defaultProductImg }) => {
    return (
      <>
        {Array.from({ length: noOfProducts }, (_, index) => (
          <div key={index} className="border rounded-lg p-4">
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
            >
              Shop now
            </a>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div
        id="product-bundle"
        className="w-full h-full flex justify-center items-center flex  border-l border-[#eaedef] w-full bg-white shadow-[6px_0px_7px_#ccc]"
      >
        <div className="bg-white rounded-lg  p-6 w-full max-w-3xl relative  shadow-[7px_-7px_57px_#ccc]">
          <div className="text-center mb-4">
            <h5>Welcome back!</h5>
            <h4 className="text-lg font-semibold">
              Pick up where you left off
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productData && productData.length > 0 ? (
              productData.map((product, index) => (
                <div key={index} className="border rounded-lg p-4 ">
                  <div className="mb-4">
                    <a href="#">
                      <img
                        src={product.image}
                        alt={product.variantHandle}
                        className="w-32 h-32 mx-auto rounded-lg"
                      />
                    </a>
                  </div>
                  <div className="text-center mb-2">
                    <p className="text-lg font-semibold">
                      <a href="#">{product.title}</a>
                    </p>
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
