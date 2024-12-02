/* eslint-disable react/prop-types */
import logoSrc from "../../images/favicon.png";
import paymentIcon from "../../images/payment-icon.png";
import emailTemplateBannerImg from "../../images/email-template-dummy_img.png";
const EmailAbandonmentCartTemplate = ({ emailTemplateJSON }) => {
  const socialMediaPlatforms = [
    { label: "Facebook", icon: "facebook", key: "facebook" },
    { label: "Twitter", icon: "twitter", key: "twitter" },
    { label: "Instagram", icon: "instagram", key: "insta" },
    { label: "YouTube", icon: "youtube-play", key: "youtube" },
  ];

  const ProductRow = ({ product }) => (
    
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
      data-product-handle={product.variantHandle}
    >
      <div style={{ display: "flex", width: "75%" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            height: "120px",
            width: "120px",
            borderRadius: "100%",
            marginRight: "24px",
          }}
        />
        <h2 className="block text-[#022b39] text-lg font-semibold text-start leading-tight ">
          {product.title}
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "end", width: "25%" }}>
        <span className="block text-gray-200 text-lg font-medium">
          {product.price}
        </span>
      </div>
    </div>
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
                "#311552",
              borderStyle: emailTemplateJSON.header_banner_style.border_style,
              borderWidth: emailTemplateJSON.header_banner_style.border_width,
              borderColor: emailTemplateJSON.header_banner_style.border_color,
              padding: combinedPadding,
              margin: combinedMargin,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "90px",
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
          </tr>
        </thead>

        <tbody>
          <tr
            style={{
              backgroundColor:
                emailTemplateJSON.cart_banner_style.background_color ||
                "#fad1a5",
              Width: "100%",
              display: "block",
            }}
          >
            <td
              style={{
                padding: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "75%" }}>
                {emailTemplateJSON?.cart_banner_style?.text_components.map(
                  (component, index) => (
                    <div key={index}>
                      <p
                        key={index}
                        style={{
                          fontSize: component?.font_size,
                          fontFamily: component?.font_family,
                          color: component?.text_color || "#000000",
                          textAlign: component?.text_position,
                          margin: "0",
                          paddingBottom: "10px",
                        }}
                      >
                        {component?.heading}
                      </p>
                    </div>
                  )
                )}
              </div>
            </td>
            <td
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  emailTemplateJSON.cart_banner_style.imageIcon
                    ? emailTemplateJSON.cart_banner_style.imageIcon
                    : emailTemplateBannerImg
                }
                alt="Uploaded preview"
                style={{ minHeight: "500px", width: "100%" }}
              />
            </td>
          </tr>

          {emailTemplateJSON?.email_template_products?.length > 0 && (
            <tr>
              <td
                colSpan="2" // Ensure proper cell spanning
                style={{
                  backgroundColor:
                    emailTemplateJSON?.cart_banner_style
                      ?.product_background_color || "#fff",
                  padding: "20px",
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    3 Items
                  </h2>

                  <button
                    type="button"
                    style={{
                      backgroundColor:
                        emailTemplateJSON?.cart_banner_style
                          ?.btn_background_color,
                      color:
                        emailTemplateJSON?.cart_banner_style?.btn_text_color,
                      padding: "10px 20px",
                      borderRadius: "5px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    {emailTemplateJSON?.cart_banner_style?.btn_name}
                  </button>
                </div>

                <div
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
                </div>
              </td>
            </tr>
          )}
          <tr
            style={{
              background:
                emailTemplateJSON.badge_section_style.background_color ||
                "#fff",
              padding: "20px",
              display: "grid",
            }}
          >
            <td style={{ width: "100%" }}>
              {emailTemplateJSON?.badge_section_style?.text_components.map(
                (component, index) => (
                  <div key={index}>
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
                  </div>
                )
              )}
            </td>
            <td>
              <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                {emailTemplateJSON?.badge_section_style?.badge_icon?.map(
                  (item, index) => (
                    <div
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
                            item.badgeImage === ""
                              ? paymentIcon
                              : item.badgeImage
                          }
                          alt={`${item.badgeName.toLowerCase()}-icon`}
                          style={{ width: "60px", height: "60px" }}
                        />
                      </div>
                      <span
                        style={{
                          marginTop: "10px",
                          fontSize:
                            emailTemplateJSON.badge_section_style.font_size,
                          fontFamily:
                            emailTemplateJSON.badge_section_style.font_family,
                          color: emailTemplateJSON.badge_section_style.color,
                          textTransform: "uppercase",
                        }}
                      >
                        {item.badgeName}
                      </span>
                    </div>
                  )
                )}
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot
          style={{
            backgroundColor:
              emailTemplateJSON?.footer_banner_style?.background_color ||
              "#311552",

            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {emailTemplateJSON?.header_banner_style?.nav_links.length > 0 && (
            <tr
              style={{
                textAlign: "center",
                borderBottom: "1px solid #f0cfba",
                width: "100%",
                padding: "20px",
              }}
            >
              <td style={{ display: "block" }}>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  {emailTemplateJSON?.header_banner_style?.nav_links.map(
                    (item, index) => (
                      <li
                        key={index}
                        style={{
                          display: "inline-block",
                          cursor: "pointer",
                          color:
                            emailTemplateJSON.header_banner_style
                              .nav_bar_text_color || "#f0cfba",
                          fontSize:
                            emailTemplateJSON.header_banner_style
                              .nav_bar_font_size,
                          fontFamily:
                            emailTemplateJSON.header_banner_style
                              .nav_bar_font_family,
                          width: "25%",
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
              </td>
            </tr>
          )}
          <tr style={{ width: "75%", padding: "20px" , display:"grid"}}>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={
                  emailTemplateJSON?.footer_banner_style?.imageIcon
                    ? emailTemplateJSON?.footer_banner_style?.imageIcon
                    : logoSrc
                }
                alt="Logo"
                style={{
                  maxHeight: "50px",
                  maxWidth: "100px",
                }}
              />
            </td>
            {socialMediaLinks.map(({ icon, key, url }) =>
              url ? (
                <td
                key={key}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "0 10px" }}
                  >
                    <i
                      className={`fa fa-${icon} text-3xl cursor-pointer`}
                      style={{ fontSize: "24px", color: "#FFFFFF" }}
                    ></i>
                  </a>
                </td>
              ) : null
            )}
            {emailTemplateJSON.footer_banner_style.text_components.map(
              (component, index) => (
                <td key={index}>
                  <p
                    style={{
                      fontSize: component?.font_size,
                      fontFamily: component?.font_family,
                      color: component?.text_color || "#FFFFFF",
                      textAlign: component?.text_position,
                      marginBottom: "10px",
                    }}
                  >
                    {component?.heading}
                  </p>
                </td>
              )
            )}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmailAbandonmentCartTemplate;
