/* eslint-disable react/prop-types */
import logoSrc from "../../images/qqqe_maintenance.png";
import productImg from "../../images/default_product.png";
import paymentIcon from "../../images/payment-icon.png";

import { Link } from "react-router-dom";
const EmailTemplateDefault = ({ emailTemplateJSON }) => {
  const socialMediaPlatforms = [
    { label: "Facebook", icon: "facebook", key: "facebook" },
    { label: "Twitter", icon: "twitter", key: "twitter" },
    { label: "Instagram", icon: "instagram", key: "insta" },
    { label: "YouTube", icon: "youtube-play", key: "youtube" },
  ];
  const ProductRow = ({ product, isLast }) => (
    <tr className="w-full justify-center flex flex-wrap mb-4">
      <td
        className="flex h-40 w-1/2"
        data-product-handle={product.variantHandle}
      >
        <img
          src={product.image}
          alt={product.title}
          className="mr-4"
          style={{ maxHeight: "120px", maxWidth: "150px" }}
        />
        <div className="block">
          <h2 className="block w-full text-[#022b39] text-lg font-medium text-start mt-2 leading-tight">
            {product.title}
          </h2>
          <span className="block text-gray-200 text-xl  mt-2 font-semibold">
            {product.price}
          </span>
        </div>
      </td>
    </tr>
  );
  const socialMediaLinks = socialMediaPlatforms.map(({ icon, key }) => {
    const url = emailTemplateJSON.footer_banner_style.social_media_icon[key];

    // Format the URL to be absolute if it's not
    const validUrl = url && !/^https?:\/\//i.test(url) ? `https://${url}` : url;

    return { icon, key, url: validUrl };
  });
  const combinedPadding = `
    ${emailTemplateJSON.header_banner_style.padding_top} 
    ${emailTemplateJSON.header_banner_style.padding_bottom} 
    ${emailTemplateJSON.header_banner_style.padding_left} 
    ${emailTemplateJSON.header_banner_style.padding_right}
  `;
  const combinedMargin = `
    ${emailTemplateJSON.header_banner_style.margin_top} 
    ${emailTemplateJSON.header_banner_style.margin_right} 
    ${emailTemplateJSON.header_banner_style.margin_bottom} 
    ${emailTemplateJSON.header_banner_style.margin_left}
  `;

  const combinedGlobalPadding = `
    ${emailTemplateJSON.global_style.padding_top} 
    ${emailTemplateJSON.global_style.padding_right}
    ${emailTemplateJSON.global_style.padding_bottom} 

    ${emailTemplateJSON.global_style.padding_left} 

  `;
  const combinedGlobalMargin = `
    ${emailTemplateJSON.global_style.margin_top} 
    ${emailTemplateJSON.global_style.margin_right}
    ${emailTemplateJSON.global_style.margin_bottom} 
    ${emailTemplateJSON.global_style.margin_left} 


  `;
  return (
    <div
      style={{
        backgroundColor: emailTemplateJSON.global_style.background_color,
      }}
    >
      <table
        className="w-6/12 grid"
        style={{
          fontFamily: emailTemplateJSON.global_style.font_family,
          padding: combinedGlobalPadding,
          margin: combinedGlobalMargin,
        }}
      >
        <thead>
          <tr
            className="flex justify-between px-4 py-6 items-center"
            style={{
              borderRadius: emailTemplateJSON.header_banner_style.border_radius,
              backgroundColor:
                emailTemplateJSON.header_banner_style.background_color,
              borderStyle: emailTemplateJSON.header_banner_style.border_style,
              borderWidth: emailTemplateJSON.header_banner_style.border_width,
              borderColor: emailTemplateJSON.header_banner_style.border_color,
              padding: combinedPadding,
              margin: combinedMargin,
            }}
          >
            <th className="flex items-center ">
              <img
                src={
                  emailTemplateJSON?.header_banner_style?.imageIcon
                    ? emailTemplateJSON?.header_banner_style?.imageIcon
                    : logoSrc
                }
                alt="Logo"
                style={{ maxHeight: "50px", maxWidth: "100px" }}
              />
            </th>
            <th className="text-center">
              <ul className="flex justify-center space-x-8">
                {emailTemplateJSON?.header_banner_style?.nav_links.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="inline cursor-pointer "
                      style={{
                        color:
                          emailTemplateJSON.header_banner_style
                            .nav_bar_text_color,
                        fontSize:
                          emailTemplateJSON.header_banner_style
                            .nav_bar_font_size,
                        fontFamily:
                          emailTemplateJSON.header_banner_style
                            .nav_bar_font_family,
                      }}
                    >
                      <Link
                        to={item?.navUrl}
                        target="_blank"
                        className="hover:text-primary"
                      >
                        {item?.navName}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white p-6 flex flex-wrap justify-center">
          <tr
            className="flex p-8 rounded-lg  w-full mb-14 text-center justify-center"
            style={{
              backgroundColor:
                emailTemplateJSON.cart_banner_style.background_color,
            }}
          >
            <td>
              {emailTemplateJSON?.cart_banner_style?.imageIcon ? (
                <div className="w-full flex justify-center">
                  <img
                    src={emailTemplateJSON.cart_banner_style.imageIcon}
                    alt="Uploaded preview"
                    className="w-24 h-24 mb-4" // Adjust styles as needed
                  />
                </div>
              ) : (
                <i
                  className="fa fa-shopping-cart text-5xl mb-4 block"
                  aria-hidden="true"
                ></i>
              )}
              {emailTemplateJSON?.cart_banner_style?.text_components.map(
                (component, index) => (
                  <p
                    key={index}
                    className="flex text-[#022b39] text-md"
                    style={{
                      fontSize: component?.font_size,
                      fontFamily: component?.font_family,
                      color: component?.text_color,
                      justifyContent: component?.text_position,
                      textAlign: component?.text_position,
                    }}
                  >
                    {component?.heading}
                  </p>
                )
              )}
            </td>
          </tr>

          {emailTemplateJSON?.email_template_products?.length > 0 && (
            <>
              <tr>
                <td colSpan="2">
                  <h1 className="w-full block text-[#022b39] text-center text-3xl font-bold mb-4">
                    Here are your items
                  </h1>
                </td>
              </tr>

              {emailTemplateJSON?.email_template_products?.map(
                (product, index) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    isLast={
                      index ===
                      emailTemplateJSON?.email_template_products?.length - 1
                    }
                  />
                )
              )}
            </>
          )}

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

          <tr className="w-full flex justify-center pt-4 ">
            <td className="block">
              <button
                type="button"
                className="px-5 py-2 rounded-md "
                style={{
                  backgroundColor:
                    emailTemplateJSON?.cart_banner_style?.btn_background_color,
                  color: emailTemplateJSON?.cart_banner_style?.btn_text_color,
                }}
              >
                {emailTemplateJSON?.cart_banner_style?.btn_name}
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

          <tr
            className="p-8 rounded-lg w-full my-10 flex justify-center text-center"
            style={{
              backgroundColor:
                emailTemplateJSON?.contact_banner_style?.background_color,
              borderRadius:
                emailTemplateJSON?.contact_banner_style?.border_radius,
            }}
          >
            <td>
              {emailTemplateJSON?.contact_banner_style?.text_components.map(
                (component, index) => (
                  <p
                    key={index}
                    className="flex text-[#022b39] text-md mb-2 justify-center text-center leading-tight"
                    style={{
                      fontSize: component?.font_size,
                      fontFamily: component?.font_family,
                      color: component?.text_color,
                      // justifyContent: component?.text_position,
                      // textAlign: component?.text_position,
                    }}
                  >
                    {component?.heading}
                  </p>
                )
              )}
            </td>
            {/* <p className="text-md mt-4 text-[#022b3a]">
                Need to return or exchange?
                <a href="#" className="underline">
                  View our policy
                </a>
              </p> */}
          </tr>

          <tr className="w-full flex flex-wrap">
            {emailTemplateJSON?.badge_section_style?.badge_icon?.map(
              (item, index) => (
                <td
                  key={index}
                  className="w-full md:w-1/4 p-4 flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center">
                    <img
                      src={
                        item.badgeImage == "" ? paymentIcon : item.badgeImage
                      }
                      alt={`${item.badgeName.toLowerCase()}-icon`}
                    />
                  </div>
                  <span
                    className="w-min mt-2 uppercase text-center font-medium"
                    style={{
                      fontSize: emailTemplateJSON.badge_section_style.font_size,
                      fontFamily:
                        emailTemplateJSON.badge_section_style.font_family,
                      color: emailTemplateJSON.badge_section_style.color,
                    }}
                  >
                    {item.badgeName}
                  </span>
                </td>
              )
            )}
          </tr>
        </tbody>

        <tfoot
          className="block w-full py-10"
          style={{
            backgroundColor:
              emailTemplateJSON?.footer_banner_style?.background_color,
          }}
        >
          <tr className="justify-center flex">
            <td colSpan="2" className="text-center">
              <div className="flex justify-center space-x-6 mb-4">
                {socialMediaLinks.map(({ icon, key, url }) =>
                  url ? (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className={`fa fa-${icon} text-3xl cursor-pointer`}
                        aria-hidden="true"
                      ></i>
                    </a>
                  ) : null
                )}
              </div>
              {emailTemplateJSON?.footer_banner_style?.text_components.map(
                (component, index) => (
                  <p
                    key={index}
                    className="flex text-[#022b39] text-md mb-2 justify-center text-center leading-tight"
                    style={{
                      fontSize: component?.font_size,
                      fontFamily: component?.font_family,
                      color: component?.text_color,
                      justifyContent: component?.text_position,
                      textAlign: component?.text_position,
                    }}
                  >
                    {component?.heading}
                  </p>
                )
              )}
              {/* <p className="text-[#022b3a] mt-4">
              This email was sent to{" "}
              <a
                href={`mailto:${emailTemplateJSON?.footer_banner_style?.email}`}
                className="underline"
              >
                {emailTemplateJSON?.footer_banner_style?.email}
              </a>
            </p>
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
            <p className="text-[#022b3a] mt-4 ">
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
