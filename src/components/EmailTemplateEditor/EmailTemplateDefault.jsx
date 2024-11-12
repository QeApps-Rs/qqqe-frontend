/* eslint-disable react/prop-types */
import logoSrc from "../../images/qqqe_maintenance.png";
import productImg from "../../images/default_product.png";
import paymentIcon from "../../images/payment-icon.png";

import { Link } from "react-router-dom";
const EmailTemplateDefault = ({
  navButtons,
  uploadedIcon,
  emailTemplateJSON,
}) => {
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

  const ProductRow = ({ product, isLast }) => (
    <tr
      className={`w-full justify-center flex flex-wrap  ${
        isLast ? "border-b border-[#a4cfd7]" : ""
      }`}
    >
      <td className="flex h-40 w-1/2">
        <img src={product.image} alt={product.name} />
        <div className="block">
          <h2 className="block w-full text-[#022b39] text-lg font-bold text-start mt-2">
            {product.name}
          </h2>
          <span className="block text-gray-200 text-md font-normal mt-2">
            {product.price}
          </span>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-[#e1f2f6]">
      <table className="mx-auto w-[700px]">
        <thead>
          <tr className="bg-[#e1f2f6] flex justify-between px-4 py-6 items-center">
            <th className="flex items-center ">
              <img
                src={uploadedIcon?.image ? uploadedIcon?.image : logoSrc}
                alt="Logo"
                style={{ maxHeight: "100px", width: "100px" }}
              />
            </th>
            <th className="text-center">
              <ul className="flex justify-center space-x-8">
                {navButtons.map((item, index) => (
                  <li key={index} className="inline cursor-pointer">
                    <Link to={item?.navUrl} target="_blank">
                      {item?.navName}
                    </Link>
                  </li>
                ))}
              </ul>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white p-6 flex flex-wrap justify-center rounded">
          <tr className="flex bg-[#f2fcfe] p-8 rounded-lg border border-[#a4cfd7] w-full mb-14 text-center justify-center">
            <td>
              {emailTemplateJSON?.cart_banner_style?.imageIcon ? (
                <img
                  src={emailTemplateJSON.cart_banner_style.imageIcon}
                  alt="Uploaded preview"
                  className="w-24 h-24 mb-4 rounded-lg border border-gray-300" // Adjust styles as needed
                />
              ) : (
                <i
                  className="fa fa-shopping-cart text-5xl mb-4 block"
                  aria-hidden="true"
                ></i>
              )}
              <h1 className="block text-[#022b39] text-3xl font-bold mb-4">
                {emailTemplateJSON?.cart_banner_style?.heading}
              </h1>
              <span className="block text-[#022b39] text-md">
                {emailTemplateJSON?.cart_banner_style?.sub_heading}
              </span>
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <h1 className="w-full block text-[#022b39] text-center text-3xl font-bold mb-4">
                Here are your items
              </h1>
            </td>
          </tr>

          {products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              isLast={index === products.length - 1}
            />
          ))}

          {/* <tr className="w-full flex justify-center py-5 border-b border-[#a4cfd7]">
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
          </tr> */}

          <tr className="w-full flex border-b border-[#a4cfd7] items-center py-4">
            <td className="flex items-center">
              <i
                className="fa fa-shopping-cart text-xl mr-2"
                aria-hidden="true"
              ></i>
              <span className="block text-lg text-gray-300">
                Congratulations, you qualified for free delivery!
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

          {/* <tr className="flex mt-10">
            <td colSpan="2">
              <h1 className="w-full block text-[#022b39] text-center text-3xl font-bold mb-4">
                Here are your items
              </h1>
            </td>
          </tr> */}

          {/* {topProductsPick.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))} */}

          <tr className="bg-[#f2fcfe] p-8 rounded-lg border border-[#a4cfd7] w-full my-10 flex justify-center text-center">
            <td>
              <h1 className="text-[#022b39] text-4xl font-bold mb-4">
                {emailTemplateJSON?.contact_banner_style?.heading}
              </h1>
              <a
                href={`mailto:${emailTemplateJSON?.contact_banner_style?.email}`}
                className="block mt-4 underline text-[#022b3a]"
              >
                {emailTemplateJSON?.contact_banner_style?.email}
              </a>
              <a
                href={`tel:${emailTemplateJSON?.contact_banner_style?.number}`}
                className="block mt-4 underline text-[#022b3a]"
              >
                {emailTemplateJSON?.contact_banner_style?.number}
              </a>
              {/* <p className="text-md mt-4 text-[#022b3a]">
                Need to return or exchange?
                <a href="#" className="underline">
                  View our policy
                </a>
              </p> */}
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

        <tfoot className="block w-full my-10">
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
                <a
                  href={`mailto:${emailTemplateJSON?.footer_banner_style?.email}`}
                  className="underline"
                >
                  {emailTemplateJSON?.footer_banner_style?.email}
                </a>
              </p>
              {/* <p className="text-[#022b3a] mt-4">
                <a href="#" className="underline">
                  Unsubscribe
                </a>
              </p> */}
              <p className="text-[#022b3a] mt-4">
                <a href="#" className="underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  {" "}
                  Terms of Service
                </a>
              </p>
              <p className="text-[#022b3a] mt-4 ">
                {emailTemplateJSON?.footer_banner_style?.address}
              </p>
              <p className="text-[#022b3a] mt-4">
                {`© ${new Date().getFullYear()} ${
                  emailTemplateJSON?.footer_banner_style?.company_name
                }`}
              </p>{" "}
              {/* <p className="text-[#022b3a] mt-4 ">
                <a href="#" className="underline">
                  View online
                </a>
              </p> */}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmailTemplateDefault;
