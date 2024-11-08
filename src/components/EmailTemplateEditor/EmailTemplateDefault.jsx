import React from "react";
import logoSrc from "../../images/qqqe_maintenance.png";
const EmailTemplateDefault = () => {
  const NavItems = ["Shop", "Sale", "New"];

  return (
    <div className="bg-gray-100">
      <table className="w-full bg-gray-100">
        <tr>
          <td className="py-5 text-center">
            <table className="mx-auto w-[630px] ">
              <thead>
                <tr className="bg-[#e1f2f6] flex justify-between  px-4 py-6">
                  <td className="text-center">
                    <img src={logoSrc} alt="Logo" width={140} height={140} />
                  </td>
                  <td className="text-center">
                    <ul className="flex justify-center space-x-8">
                      {NavItems.map((item, index) => (
                        <li key={index} className="inline">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white ">
                <tr className="block">
                  <td>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <h1 className="block text-black text-3xl font-bold">
                      Still in your cart
                    </h1>
                    <span className="block text-graydark text-lg">
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
