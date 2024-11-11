/* eslint-disable react/prop-types */
import logoSrc from "../../images/qqqe_maintenance.png";
import productImg from "../../images/default_product.png";
import paymentIcon from "../../images/payment-icon.png";

const EmailTemplateDefault = () => {
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
      <table className="mx-auto w-[700px] ">
        <thead>
          <tr className="bg-[#e1f2f6] flex justify-between  px-4 py-6">
            <th className="text-center">
              <img src={logoSrc} alt="Logo" width={140} height={140} />
            </th>
            <th className="text-center">
              <ul className="flex justify-center space-x-8 ">
                {NavItems.map((item, index) => (
                  <li key={index} className="inline cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white p-6 flex flex-wrap justify-center rounded">
          <tr className="block bg-[#f2fcfe] p-8 rounded-lg border border-[#a4cfd7]  w-full  mb-14 text-center">
            <i
              className="fa fa-shopping-cart text-5xl mb-4 block w-full"
              aria-hidden="true"
            ></i>
            <h1 className="block text-[#022b39] text-3xl font-bold mb-4">
              Still in your cart
            </h1>
            <span className="block text-[#022b39] text-md">
              These fashionable items are still waiting for you in your shopping
              cart.
            </span>
          </tr>
          <tr className="w-10/12">
            <td className="flex">
              <h1 className="w-full block text-[#022b39] text-center text-3xl font-bold mb-4">
                Here are your items{" "}
              </h1>
            </td>
            <div className="w-full block">
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`flex justify-center h-50 gap-4 ${
                    index === products.length - 1
                      ? "border-b border-[#a4cfd7]"
                      : ""
                  }`}
                >
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={500}
                      className="h-full"
                    />
                  </td>
                  <td className="text-start">
                    <h2 className="block text-black text-2xl font-bold mb-4">
                      {product.name}
                    </h2>
                    <span>{product.price}</span>
                  </td>
                </tr>
              ))}
            </div>
            <tr className="w-full flex justify-center py-5 border-b border-[#a4cfd7]">
              <td className="block">
                <span className="block text-lg text-gray-300">
                  Order subtotal
                </span>
                <span className="block text-lg text-gray-300">
                  Estimated Delivery
                </span>
                <h2 className="block text-2xl text-black font-bold">TOTAL</h2>
              </td>
              <td className="block">
                <span className="block text-lg text-gray-300">£90.00</span>
                <span className="block text-lg text-gray-300">-</span>
                <h2 className="block text-2xl text-black font-bold">£90.00</h2>
              </td>
            </tr>
            <tr className="w-full flex  border-b border-[#a4cfd7] items-center py-4">
              <td className="flex items-center">
                <i
                  className="fa fa-shopping-cart text-xl mr-2"
                  aria-hidden="true"
                ></i>
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
            <h1 className="w-full block text-[#022b39] text-center text-3xl font-bold mb-4">
              Here are your items{" "}
            </h1>
          </tr>
          <tr>
            {topProductsPick.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tr>
          <tr className="bg-[#f2fcfe] p-8 rounded-lg border border-[#a4cfd7] w-full my-10 flex justify-center text-center">
            <td>
              <h1 className="text-[#022b39] text-4xl font-bold mb-4">
                Have a question?
              </h1>
              <a
                href="mailto:qqqe@gmail.com"
                className="block mt-4 underline text-[#022b3a]"
              >
                qqqe@gmail.com
              </a>
              <a
                href="tel:+000123456789"
                className="block mt-4 underline text-[#022b3a]"
              >
                (000) 123-456-789
              </a>
              <p className="text-md mt-4 text-[#022b3a]">
                Need to return or exchange?
                <a href="#" className="underline">
                  View our policy
                </a>
              </p>
            </td>
          </tr>
          <tr className="w-full flex flex-wrap md:flex-nowrap">
            {[
              { label: "SECURE PAYMENTS", icon: paymentIcon },
              { label: "EASY RETURNS", icon: paymentIcon },
              { label: "FREE SHIPPING", icon: paymentIcon },
              { label: "CUSTOMER SERVICE", icon: paymentIcon },
            ].map((item, index) => (
              <td
                key={index}
                className="w-full md:w-1/4 p-4 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={`${item.label.toLowerCase()}-icon`}
                  />
                </div>
                <span className="w-min mt-2 uppercase text-lg text-[#022b3a] text-center">
                  {item.label}
                </span>
              </td>
            ))}
          </tr>
        </tbody>

        <tfoot className="block w-full  my-10">
          <tr className="justify-center flex">
            <td colSpan="2" className="text-center">
              <div className="flex justify-center space-x-6 mb-4">
                {["facebook", "twitter", "instagram", "youtube-play"].map(
                  (icon, index) => (
                    <i
                      key={index}
                      className={`fa fa-${icon} text-3xl cursor-pointer`}
                      aria-hidden="true"
                    ></i>
                  )
                )}
              </div>
              <p className="text-[#022b3a] mt-4">
                This email was sent to{" "}
                <a href="#" className="underline">
                  hello@blazetate.com
                </a>
              </p>
              <p className="text-[#022b3a] mt-4">
                <a href="#" className="underline">
                  Unsubscribe
                </a>{" "}
              </p>
              <p className="text-[#022b3a] mt-4 ">
                <a href="#" className="underline">
                  {" "}
                  Privacy Policy
                </a>{" "}
                and
                <a href="#" className="underline">
                  {" "}
                  Terms of Service
                </a>
              </p>
              <p className="text-[#022b3a] mt-4">
                2585 Red Lane, Skamokawa, Louisiana, 70228-6566
              </p>
              <p className="text-[#022b3a] mt-4">© 2023 Topshop</p>
              <p className="text-[#022b3a] mt-4">
                <a href="#" className="underline">
                  View Online
                </a>
              </p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmailTemplateDefault;
