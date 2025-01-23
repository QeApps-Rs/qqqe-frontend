/* eslint-disable react/prop-types */
import logoSrc from "../../images/qqqe_maintenance.png";
import paymentIcon from "../../images/payment-icon.png";

const EmailTemplateDefault = ({ emailTemplateJSON }) => {
  const socialMediaPlatforms = [
    { label: "Facebook", icon: "facebook", key: "facebook" },
    { label: "Twitter", icon: "twitter", key: "twitter" },
    { label: "Instagram", icon: "instagram", key: "insta" },
    { label: "YouTube", icon: "youtube-play", key: "youtube" },
  ];

  const ProductRow = ({ product }) => (
    <td
      className="flex w-4/12 flex-wrap justify-center mb-4 "
      data-product-handle={product.variantHandle}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ maxHeight: "120px", width: "120px" }}
      />
      <div className="block">
        <h2
          title={product.title}
          className="block text-[#022b39] text-lg font-medium text-start leading-tight mt-4"
        >
          {product.title}
        </h2>
        <span className="block text-gray-200 text-xl  mt-2 font-semibold">
          {product.price}
        </span>
      </div>
    </td>
  );

  const socialMediaLinks = socialMediaPlatforms.map(({ icon, key }) => {
    const url = emailTemplateJSON.footer_banner_style.social_media_icon[key];
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
        fontFamily: emailTemplateJSON.global_style.font_family,
      }}
    >
      <table
        width="600"
        style={{
          padding: combinedGlobalPadding,
          margin: combinedGlobalMargin,
          borderCollapse: "collapse",
          fontFamily: emailTemplateJSON.global_style.font_family,
          display: "grid",
        }}
      >
        <thead>
          <tr
            style={{
              borderRadius: emailTemplateJSON.header_banner_style.border_radius,
              backgroundColor:
                emailTemplateJSON.header_banner_style.background_color ||
                "#e1f2f6",
              borderStyle: emailTemplateJSON.header_banner_style.border_style,
              borderWidth: emailTemplateJSON.header_banner_style.border_width,
              borderColor: emailTemplateJSON.header_banner_style.border_color,
              padding: combinedPadding,
              margin: combinedMargin,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <th style={{ textAlign: "left" }}>
              <img
                src={
                  emailTemplateJSON?.header_banner_style?.imageIcon
                    ? emailTemplateJSON?.header_banner_style?.imageIcon
                    : logoSrc
                }
                alt="Logo"
                style={{
                  maxHeight: "50px",
                  maxWidth: "100px",
                }}
              />
            </th>
            <th style={{ textAlign: "center" }}>
              <ul
                style={{
                  listStyleType: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                }}
              >
                {emailTemplateJSON?.header_banner_style?.nav_links.map(
                  (item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "inline-block",
                        marginRight: "15px",
                        cursor: "pointer",
                        color:
                          emailTemplateJSON.header_banner_style
                            .nav_bar_text_color || "#000000",
                        fontSize:
                          emailTemplateJSON.header_banner_style
                            .nav_bar_font_size,
                        fontFamily:
                          emailTemplateJSON.header_banner_style
                            .nav_bar_font_family,
                      }}
                    >
                      <a
                        href={item?.navUrl}
                        target="_blank"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        {item?.navName}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </th>
          </tr>
        </thead>

        <tbody
          style={{
            backgroundColor: "white",
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <tr
            style={{
              backgroundColor:
                emailTemplateJSON.cart_banner_style.background_color,
              padding: "30px",
              borderRadius: "10px",
              width: "100%",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <td>
              {emailTemplateJSON?.cart_banner_style?.imageIcon ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={emailTemplateJSON.cart_banner_style.imageIcon}
                    alt="Uploaded preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              ) : (
                <i
                  className="fa fa-shopping-cart text-5xl mb-4 block"
                  aria-hidden="true"
                  style={{
                    fontSize: "50px",
                    marginBottom: "10px",
                  }}
                ></i>
              )}
              {emailTemplateJSON?.cart_banner_style?.text_components.map(
                (component, index) => (
                  <p
                    key={index}
                    style={{
                      fontSize: component?.font_size,
                      fontFamily: component?.font_family,
                      color: component?.text_color || "#000000",
                      textAlign: component?.text_position,
                      margin: "0",
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
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      color: "#022b39",
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Here are your items
                  </h1>
                </td>
              </tr>
              <tr
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
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
              </tr>
            </>
          )}

          <tr
            style={{
              width: "100%",
              paddingTop: "15px",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <td>
              <button
                type="button"
                style={{
                  backgroundColor:
                    emailTemplateJSON?.cart_banner_style?.btn_background_color,
                  color: emailTemplateJSON?.cart_banner_style?.btn_text_color,
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {emailTemplateJSON?.cart_banner_style?.btn_name}
              </button>
            </td>
          </tr>

          <tr
            style={{
              backgroundColor:
                emailTemplateJSON?.contact_banner_style?.background_color,
              borderRadius:
                emailTemplateJSON?.contact_banner_style?.border_radius,
              padding: "20px",
              margin: "20px 0",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <td>
              {emailTemplateJSON?.contact_banner_style?.text_components.map(
                (component, index) => (
                  <p
                    key={index}
                    style={{
                      fontSize: component?.font_size,
                      fontFamily: component?.font_family,
                      color: component?.text_color,
                      textAlign: component?.text_position,
                      marginBottom: "10px",
                    }}
                  >
                    {component?.heading}
                  </p>
                )
              )}
            </td>
          </tr>

          <tr style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {emailTemplateJSON?.badge_section_style?.badge_icon?.map(
              (item, index) => (
                <td
                  key={index}
                  style={{
                    width: "25%",
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={
                        item.badgeImage === "" ? paymentIcon : item.badgeImage
                      }
                      alt={`${item.badgeName.toLowerCase()}-icon`}
                      style={{ width: "60px", height: "60px" }}
                    />
                  </div>
                  <span
                    style={{
                      marginTop: "10px",
                      fontSize: emailTemplateJSON.badge_section_style.font_size,
                      fontFamily:
                        emailTemplateJSON.badge_section_style.font_family,
                      color: emailTemplateJSON.badge_section_style.color,
                      textTransform: "uppercase",
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
          style={{
            backgroundColor:
              emailTemplateJSON?.footer_banner_style?.background_color ,
            padding: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <tr>
            <td colSpan="2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {socialMediaLinks.map(({ icon, key, url }) =>
                  url ? (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ margin: "0 10px" }}
                    >
                      <i
                        className={`fa fa-${icon} text-3xl cursor-pointer`}
                        style={{ fontSize: "24px" }}
                      ></i>
                    </a>
                  ) : null
                )}
              </div>
              {emailTemplateJSON?.footer_banner_style?.text_components.map(
                (component, index) => (
                  <p
                    key={index}
                    style={{
                      fontSize: component?.font_size,
                      fontFamily: component?.font_family,
                      color: component?.text_color || "#022b3a",
                      textAlign: component?.text_position,
                      marginBottom: "10px",
                    }}
                  >
                    {component?.heading}
                  </p>
                )
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmailTemplateDefault;
