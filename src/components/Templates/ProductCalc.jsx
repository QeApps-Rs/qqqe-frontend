import React from "react";
import userSix from "../../images/user/user-06.png";
const products = [
  {
    imageUrl: userSix,
    name: "Men's sports T-shirt, Black, L",
    tags: ["Buy 1"],
    price: 20,
  },
  {
    imageUrl: userSix,
    name: "Men's sports T-shirt, Black, L",
    tags: ["Buy 2", "Free"],
    price: 10,
  },
];
const ProductCalc = () => {
  const total = products.reduce((acc, product) => acc + product.price, 0);
  return (
    <>
      <div className="p-6.5">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Product
        </h3>
        <div className="border-t border-b border-stroke py-4">
          {products.map((product, index) => (
            <div key={index}>
              {product.tags.map((tag, index) => (
                <button
                  key={index}
                  className="inline-flex rounded-full border border-gray-300 py-1 px-3 text-sm font-medium text-gray-400 bg-gray-200 mr-1"
                >
                  {tag}
                </button>
              ))}
              <div className="flex items-center justify-between mb-6 mt-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt="User"
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <div>
                    <span className="block text-black dark:text-white">
                      {product.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-white">
                    ${product.price}
                  </span>
                  <button className="ml-3 text-gray-400 hover:text-gray-600">
                    <i className="fas fa-pen"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-lg font-medium text-gray-700 dark:text-white">
              Total
            </span>
            <span className="text-lg font-medium text-gray-700 dark:text-white">
              ${total}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCalc;
