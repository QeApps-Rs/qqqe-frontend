export const emailTemplateEditorDefaults = {
  type: "emailTemplate",
  handle_type: "email_marketing",
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
    templateMarginTop: "0px",
    templateMarginBottom: "0px",
    templateMarginLeft: "0px",
    templateMarginRight: "0px",
  },
  cart_banner_style: {
    imageIcon: "",
    text_components: [
      {
        heading: "Still in your cart",
        font_size: "24px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
      },
      {
        heading:
          "These fashionable items are still waiting for you in your shopping cart.",
        font_size: "16px",
        font_family: "Arial, sans-serif",
        text_color: "#022b3a",
      },
    ],
    background_color: "#e1f2f6",
  },
  contact_banner_style: {
    heading: "Have a question?",
    email: "qqqe@gmail.com",
    number: "(000) 123-456-789",
  },
  badge_section_style: [
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
  footer_banner_style: {
    social_media_icon: {
      facebook_url: "www.facebook.com",
      twitter_url: "https://x.com/?lang=en",
      insta_url: "https://www.instagram.com",
      youtube_url: "https://www.youtube.com",
    },
    email: "hello@blazetate.com",
    address: "2585 Red Lane, Skamokawa, Louisiana, 70228-6566",
    company_name: "QQQE",
  },
  email_template_products: [],
};

export const emailTemplateEditorCollapseOptions = [
  {
    title: "Header Style Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "header_style_controller",
  },
  {
    title: "Cart Style Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "cart_style_controller",
  },
  {
    title: "Contact Style Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "contact_style_controller",
  },
  {
    title: "Badge Style Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "badge_style_controller",
  },
  {
    title: "Footer Style Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "footer_style_controller",
  },
];
