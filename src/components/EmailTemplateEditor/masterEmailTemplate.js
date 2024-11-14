export const emailTemplateEditorDefaults = {
  type: "emailTemplate",
  handle_type: "email_marketing",
  global_style: {
    background_color: "#000000",
    font_family:"Arial, sans-serif",
    border_radius:"16px",
    padding_top: "16px",
    padding_bottom: "16px",
    padding_left: "16px",
    padding_right: "16px",
    margin_top: "auto",
    margin_bottom: "auto",
    margin_left:"auto",
    margin_right: "auto",
  },
  header_banner_style: {
    imageIcon: "",
    nav_links: [
      {
        navName: "Shop",
        navUrl: "#",
      },
      {
        navName: "Sale",
        navUrl: "#",
      },
      {
        navName: "New",
        navUrl: "#",
      },
    ],
    background_color: "#e1f2f6",
    nav_bar_text_color: "#000000",
    nav_bar_font_size: "14px",
    nav_bar_font_family: "Arial, sans-serif",
    border_radius: "",
    border_style: "none",
    border_width: "",
    border_color: "",
    padding_top: "16px",
    padding_bottom: "16px",
    padding_left: "16px",
    padding_right: "16px",
    margin_top: "0px",
    margin_bottom: "0px",
    margin_left: "0px",
    margin_right: "0px",
  },
  cart_banner_style: {
    imageIcon: "",
    background_color: "#e1f2f6",
    btn_background_color: "#207a8b",
    btn_text_color:"#ffffff",
    btn_name:"Complete your order",
    text_components: [
      {
        heading: "Still in your cart",
        font_size: "24px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
      {
        heading:
          "These fashionable items are still waiting for you in your shopping cart.",
        font_size: "16px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
    ],
  },
  contact_banner_style: {
    background_color: "#e1f2f6",
    border_radius: "16px",
    text_components: [
      {
        heading: "Have a question",
        font_size: "24px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
      {
        heading: "qqqe@gmail.com",
        font_size: "16px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
      {
        heading: "(000) 123-456-789",
        font_size: "16px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
    ],
  },
  badge_section_style: {
    font_size: "16px",
    font_family: "Arial, sans-serif",
    color: "#022b3a",
    badge_icon: [
      {
        badgeImage: "",
        badgeName: "SECURE PAYMENTS",
      },
      {
        badgeImage: "",
        badgeName: "EASY RETURNS",
      },
      {
        badgeImage: "",
        badgeName: "FREE SHIPPING",
      },
      {
        badgeImage: "",
        badgeName: "CUSTOMER SERVICES",
      },
    ],
  },
  footer_banner_style: {
    background_color:"#e1f2f6",
    social_media_icon: {
      facebook_url: "www.facebook.com",
      twitter_url: "https://x.com/?lang=en",
      insta_url: "https://www.instagram.com",
      youtube_url: "https://www.youtube.com",
    },
    text_components: [
      {
        heading: "This email was sent to hello@blazetate.com",
        font_size: "24px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
      {
        heading: "2585 Red Lane, Skamokawa, Louisiana, 70228-6566",
        font_size: "16px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
      {
        heading: "Privacy Policy and Terms of Service",
        font_size: "16px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },

      {
        heading: "©2024 QQQE",
        font_size: "16px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
        text_position: "center",
      },
    ],
  },
  email_template_products: [],
};

export const emailTemplateEditorCollapseOptions = [
  {
    title: "Global Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "global_style_controller",
  },
  {
    title: "Header Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "header_style_controller",
  },
  {
    title: "Cart Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "cart_style_controller",
  },
  {
    title: "Contact Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "contact_style_controller",
  },
  {
    title: "Badge Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "badge_style_controller",
  },
  {
    title: "Footer Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "footer_style_controller",
  },
];
