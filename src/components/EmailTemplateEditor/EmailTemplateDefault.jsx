/* eslint-disable react/prop-types */
import React from "react";
import logoSrc from "../../images/qqqe_maintenance.png";
import productImg from "../../images/default_product.png";
import { Link } from "react-router-dom";
const EmailTemplateDefault = ({ navButtons }) => {
  const NavItems = ["Shop", "Sale", "New"];
  const products = [
    {
      id: 1,
      name: "Man's Jacket",
      price: "$210 USD",
      image: productImg,
    },
    {
      id: 2,
      name: "Woman's Dress",
      price: "$120 USD",
      image: productImg,
    },

    // Add more products as needed
  ];

  const topProductsPick = [
    { id: 1, name: "Man's jacket", price: "£90.00", image: productImg },
    { id: 2, name: "Man's jacket", price: "£90.00", image: productImg },
    { id: 3, name: "Man's jacket", price: "£90.00", image: productImg },
  ];

  const ProductRow = ({ product }) => (
    <td>
      <div className="flex flex-wrap">
        <img src={product.image} alt={product.name} />
        <h2 className="block w-full text-[#022b39] text-lg font-bold text-start mt-2">
          {product.name}
        </h2>
        <span className="block text-gray-200 text-md font-normal mt-2">
          {product.price}
        </span>
        <button
          type="button"
          className="bg-[#207a8b] px-5 py-2 rounded-md text-white mt-2"
        >
          Complete your order
        </button>
      </div>
    </td>
  );

  return (
    <div className="bg-[#e1f2f6]">
      <table className="w-full bg-gray-100">
        <tr>
          <td className="py-5 text-center">
            <table className="mx-auto w-[700px] ">
              <thead>
                <tr className="bg-[#e1f2f6] flex justify-between  px-4 py-6">
                  <th className="text-center">
                    <img src={logoSrc} alt="Logo" width={140} height={140} />
                  </th>
                  <th className="text-center">
                    <ul className="flex justify-center space-x-8 ">
                      {navButtons.map((item, index) => (
                        <li key={index} className="inline cursor-pointer">
                          <Link to={item?.navUrl} target="_blank">{item?.navName}</Link>
                        </li>
                      ))}
                    </ul>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white p-6 flex flex-wrap justify-center rounded">
                <tr className="block bg-[#f2fcfe] p-8 rounded-lg border border-[#a4cfd7]  w-full flex justify-center mb-14">
                  <td>
                    <i
                      className="fa fa-shopping-cart text-5xl mb-4"
                      aria-hidden="true"
                    ></i>
                    <h1 className="block text-[#022b39] text-3xl font-bold mb-4">
                      Still in your cart
                    </h1>
                    <span className="block text-graydark text-md">
                      These fashionable items are still waiting for you in your
                      shopping cart.
                    </span>
                  </td>
                </tr>
                <tr className="w-10/12">
                  <tr className="flex">
                    <td className="w-full">
                      <h1 className="block text-[#022b39] text-center text-3xl font-bold mb-4">
                        Here are your items{" "}
                      </h1>
                    </td>
                  </tr>
                  <tr className="w-full block">
                    {products.map((product, index) => (
                      <td
                        key={product.id}
                        className={`flex justify-center h-50 gap-4 ${
                          index === products.length - 1
                            ? "border-b border-[#a4cfd7]"
                            : ""
                        }`}
                      >
                        <div>
                          <img
                            src={product.image}
                            alt={product.name}
                            width={100}
                            height={500}
                            className="h-full"
                          />
                        </div>
                        <div className="text-start">
                          <h2 className="block text-black text-2xl font-bold mb-4">
                            {product.name}
                          </h2>
                          <span>{product.price}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="w-full flex justify-center py-5 border-b border-[#a4cfd7]">
                    <td className="block">
                      <span className="block text-lg text-gray-300">
                        Order subtotal
                      </span>
                      <span className="block text-lg text-gray-300">
                        Estimated Delivery
                      </span>
                      <h2 className="block text-2xl text-black font-bold">
                        TOTAL
                      </h2>
                    </td>
                    <td className="block">
                      <span className="block text-lg text-gray-300">
                        £90.00
                      </span>
                      <span className="block text-lg text-gray-300">-</span>
                      <h2 className="block text-2xl text-black font-bold">
                        £90.00
                      </h2>
                    </td>
                  </tr>
                  <tr className="w-full flex  border-b border-[#a4cfd7] items-center py-4">
                    <td className="block mr-2">
                      <i
                        className="fa fa-shopping-cart text-xl"
                        aria-hidden="true"
                      ></i>
                    </td>
                    <td className="flex ">
                      <span className="block text-lg text-gray-300">
                        Congratulations, you qualified for free delivery!{" "}
                      </span>
                    </td>
                  </tr>
                  <tr className="w-full flex justify-center mt-4">
                    <td className="block">
                      <button
                        type="button"
                        className="bg-[#207a8b] px-5 py-2 rounded-md text-white"
                      >
                        Complete your order
                      </button>
                    </td>
                  </tr>
                </tr>
                <tr className="flex mt-10">
                  <td className="w-full">
                    <h1 className="block text-[#022b39] text-center text-3xl font-bold mb-4">
                      Here are your items{" "}
                    </h1>
                  </td>
                </tr>
                <tr>
                  {topProductsPick.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))}
                </tr>

                <tr className="block bg-[#f2fcfe] p-8 rounded-lg border border-[#a4cfd7]  w-full flex justify-center mt-10">
                  <td>
                    <h1 className="block text-[#022b39] text-4xl font-bold mb-4">
                      Have a question?
                    </h1>
                    <a href="#" className="block">
                      qqqe@gmail.com
                    </a>
                    <a href="#" className="block">
                      (000) 123-456-789
                    </a>
                    <span className="block text-graydark text-md">
                      These fashionable items are still waiting for you in your
                      shopping cart.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default EmailTemplateDefault;
