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
    ]
  },
  cart_banner_style: {
    imageIcon: "",
    heading: "Still in your cart",
    sub_heading:
      "These fashionable items are still waiting for you in your shopping cart.",
    style: {
      font_size: "16px",
      font_family: "Arial, sans-serif",
      text_color: "black",
      background_color: "#f2fcfe",
    },
    text_components: [{
      heading: "Title Heading Component",
      font_size: "16px",
      font_family: "Arial, sans-serif",
      text_color: "black",
    }, {
      heading: "Sub Heading Component",
      font_size: "12px",
      font_family: "Arial, sans-serif",
      text_color: "red",
    }]
  },
  contact_banner_style: {
    heading: "Have a question?",
    email: "qqqe@gmail.com",
    number: "(000) 123-456-789",
  },
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
