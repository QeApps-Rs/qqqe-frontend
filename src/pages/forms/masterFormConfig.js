export const templateFieldCss = {
  bgColor: "rgb(255, 255, 255)", // styles.form_type.input_fields_style.background_color
  borderColor: "rgb(209, 213, 219)", // styles.form_type.input_fields_style.border_color 
  focusBorderColor: "rgb(0, 123, 255)",  // styles.form_type.input_fields_style.focus_border_color 
  placeholderTextColor: "rgb(107 114 128)", // styles.form_type.input_fields_style.placeholder_color
  formHeadingColor: "rgb(0, 0, 0)", // styles.form_type.input_fields_style.label_color
  textColor: "rgb(0, 0, 0)", // styles.form_type.input_fields_style.text_color
  letterSpacing: "1px", // styles.form_type.input_fields_style.letter_spacing
  inputFontSize: "14px",  // styles.form_type.input_fields_style.font_size
  templateBgColor: "rgb(255,255,255)",// styles.form_type.background_color
  templateOverlayColor: "rgb(255, 255, 255)",// styles.form_type.overlay_color
  fontWeight: "normal", // styles.form_type.input_fields_style.font_weight
  fontFamily: "Arial",// styles.form_type.input_fields_style.font_family
  borderRadius: "",// styles.form_type.corner_radius
  borderWidth: "2px",// styles.form_type.border_width
  templateBorderColor: "rgb(255, 255, 255)", // styles.form_type.template_border_color
  templatePaddingTop: "8px", // styles.form_type.padding_top
  templatePaddingBottom: "8px",// styles.form_type.padding_bottom
  templatePaddingLeft: "8px",// styles.form_type.padding_left
  templatePaddingRight: "8px",// styles.form_type.padding_right
  templateMarginTop: "8px",// styles.form_type.margin_top
  templateMarginBottom: "8px",// styles.form_type.margin_bottom
  templateMarginLeft: "8px",// styles.form_type.margin_left
  templateMarginRight: "8px",// styles.form_type.margin_right
  formBorderStyle: "none",// styles.form_type.border_style
  formType: "full page",// styles.form_type.type
  formWidth: "large",// styles.form_type.width
  templateMinHeight: "500px",// styles.form_type.min_height
  templateHeadingFontSize: "32px",// styles.form_parameters.title.font_size
  templateOfferFontSize: "24px",// styles.form_parameters.offer_title.template_offer_font_size
  templateSubHeadingFontSize: "16px",// styles.form_parameters.sub_title.font_size
  templateHeadingFontFamily: "Arial",// styles.form_parameters.title.template_heading_font_family
  templateOfferFontFamily: "Arial",// styles.form_parameters.offer_title.template_offer_font_family
  templateSubHeadingFontFamily: "Arial",// styles.form_parameters.sub_title.template_sub_heading_font_family
  templateHeadingColor: "rgb(0, 0, 0)",// styles.form_parameters.title.color
  templateSubHeadingColor: "rgb(0, 0, 0)",// styles.form_parameters.sub_title.color
  templateOfferColor: "rgb(0, 0, 0)",// styles.form_parameters.offer_title.template_offer_color
  templateButtonBgColor: "rgb(0, 0, 0)",// styles.form_parameters.button.background_color
  templateProductOverlayColor: "rgb(0, 0, 0)",
  imagePosition: "0",// styles.form_parameters.side_image.side
  successHeadingFontSize: "32px",
  successDescriptionFontSize: "24px",
  successSubHeadingFontSize: "16px",
  successHeadingFontFamily: "Arial",
  successDescriptionFontFamily: "Arial",
  successSubHeadingFontFamily: "Arial",
  successHeadingColor: "rgb(0, 0, 0)",
  successSubHeadingColor: "rgb(0, 0, 0)",
  successDescriptionColor: "rgb(0, 0, 0)",
  containPosition: "center",
  reviewType: "none",
  reviewCount: '5',
  reviewMinCount: "5",
  reviewMaxCount: "10",
  ratingCount: "5",
  ratingMinCount: "1",
  ratingMaxCount: "15",
  heading: "Default Heading",// styles.form_parameters.title.text
  button: "Continue",// styles.form_parameters.button.text
  offerAmount: "10% Off",// styles.form_parameters.offer_title.template_offer_amount
  subHeading: "Save on your first order and get email-only offers when you join.",// styles.form_parameters.sub_title.text
  image: "",// styles.form_parameters.image.link
  successImage: "",
  successHeading: "Thanks for sharing. Please check your email for confirmation message",
  successSubHeading: "Thanks for sharing. Please check your email for confirmation message",
  successDescription: "Thanks for sharing. Please check your email for confirmation message",
};

export const targetAndBehaviourDefaultState = {
  display: {
    timing: {
      type: "immediately",
      settings: {
        existing_page: {
          is_selected: false,
        },
        after_delay_time: {
          is_selected: false,
          key: "seconds",
          value: 0,
        },
        after_scroll_distance: {
          is_selected: false,
          key: "percentage",
          value: 0,
        },
        after_pages_visit: {
          is_selected: false,
          key: "pages",
          value: 0,
        },
      },
    },
    frequency: {
      after_show_days: "1",
      validation: false,
    },
    devices: {
      display_on: "desktop",
      click_outside_close: {
        on_desktop: true,
        on_mobile: false,
      },
    },
  },
  targeting: {
    visitors: "all",
    locations: {
      show_visitors_certain_locations: {
        is_selected: false,
        location: "",
      },
      not_show_visitors_certain_locations: {
        is_selected: false,
        location: "",
      },
    },
  },
}

export const inputColorFields = [
  { label: "Background Color", colorType: "bgColor" },
  { label: "Border Color", colorType: "borderColor" },
  { label: "Focus Border Color", colorType: "focusBorderColor" },
];

export const inputTextColorFields = [
  { label: "Label Color", colorType: "formHeadingColor" },
  { label: "Text Color", colorType: "textColor" },
  { label: "Placeholder Color", colorType: "placeholderTextColor" },
];

export const templateBgField = [
  { label: "Background color", colorType: "templateBgColor" },
  { label: "Overlay color", colorType: "templateOverlayColor" },
];

export const fontFamilyList = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Arial Black", value: "'Arial Black', sans-serif" },
  { label: "Courier", value: "'Courier', monospace" },
  { label: "Geneva", value: "Geneva, sans-serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Franklin Gothic", value: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "Brush Script MT", value: "'Brush Script MT', cursive" }
];



export const borderStyles = [
  { value: "none", label: "None" },
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
];

export const visitorsDropdown = {
  label: "Visitors",
  placeholder: "Select your visitor",
  options: [
    {
      value: "all",
      label: "All",
    },
    {
      value: "don_t_show_to_existing_klaviyo_profiles",
      label: "Don’t show to existing Klaviyo profiles",
    },
    {
      value: "show_to_all_visitors",
      label: "Show to all visitors"
    },
    {
      value: "show_to_any_existing_profile",
      label: "Show to any existing profile",
    },
    {
      value: "show_to_email_subscribers_only",
      label: "Show to email subscribers only",
    },
    {
      value: "show_to_sms_subscribers_only",
      label: "Show to SMS subscribers only",
    },
    {
      value: "show_to_specific_profiles_in_a_list_or_segment",
      label: "Show to specific profiles in a list or segment",
    },
  ],
};

export const formTypeDropdown = {
  label: "Form Type",
  placeholder: "Select form type",
  options: [
    { value: "full page", label: "Full page" },
    { value: "embed", label: "Embed" },
  ],
};

export const discountForDropdown = {
  label: "",
  placeholder: "Select discount for",
  options: [
    { value: "dis_for_order", label: "Order" },
    { value: "dis_for_product", label: "Product" },
  ],
};

export const discountTypeDropdown = {
  label: "",
  placeholder: "Select discount type",
  options: [
    { value: "dis_type_amt", label: "Fixed Amount" },
    { value: "dis_type_per", label: "% Discount" },
  ],
};

export const widthDropdown = {
  label: "Form width",
  placeholder: "Select form width",
  options: [
    { value: "small", label: "Small" },
    // { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ],
};

export const timingOptions = [
  { value: "immediately", label: "Immediately" },
  { value: "on_rules", label: "Based on rules" },
  { value: "only_on_a_custom_trigger", label: "Only on a custom trigger" },
];

export const deviceOptions = [
  { value: "both_desktop_and_mobile", label: "Both desktop and mobile" },
  { value: "desktop", label: "Desktop only" },
  { value: "mobile", label: "Mobile only" },
];

export const tabs = [
  { name: "All Devices", icon: "fa-solid fa-desktop" },
  { name: "Desktop", icon: "fa-solid fa-desktop" },
  { name: "Mobile", icon: "fa-solid fa-mobile-alt" },
];

export const templateEditorCollapseOptions = [
  {
    title: "Style",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "style",
  },
  {
    title: "Input Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "inputController",
  },
  {
    title: "Success Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "successController",
  },
  {
    title: "Targeting & behavior",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "target",
  },
  {
    title: "Bundles",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "bundle",
  },
  {
    title: "Survey Controller",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "surveyController",
  },
  {
    title: "Custom CSS",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "custom_style",
  },
  {
    title: "Custom JS",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "custom_js",
  },
];

export const defaultBoxClassName =
  "w-32 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary";

export const fieldNameDropdownData = {
  label: "Field Name",
  name: "fieldName",
  id: "fieldNameDropdown",
  options: [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "number", label: "Number" },
  ],
  placeholder: "Select Field Name",
};

export const fieldValidationDropdownData = {
  label: "Field Validation",
  name: "fieldValidation",
  id: "fieldValidationDropdown",
  options: [
    { value: "required", label: "Required" },
    { value: "notRequired", label: "Not-Required" },
  ],
  placeholder: "Select Field Validation",
};

export const imagePositionDropdownData = {
  label: "Image Position",
  name: "imagePosition",
  id: "imagePositionDropdown",
  options: [
    { value: "0", label: "Left" },
    { value: "1", label: "Right" },
  ],
  placeholder: "Select Image Position",
};
export const successContainPositionDropdownData = {
  label: "Contain Position",
  name: "containPosition",
  id: "containPositionDropdown",
  options: [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ],
  placeholder: "Select Contain Position",
};
export const fieldTypeDropdownData = {
  label: "Field Type",
  name: "fieldType",
  id: "fieldTypeDropdown",
  options: [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "number", label: "Number" },
  ],
  placeholder: "Select Field Type",
};


export const surveyTypeStyles = [
  { value: "none", label: "None" },
  { value: "review", label: "Review" },
  { value: "rating", label: "Rating" },
  { value: "survey", label: "Survey" },
  { value: "button", label: "Button" },
];

export const surveyReviewCount = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
];

export const surveyControllerDefaults = {
  survey_type: "none",
  rating: "5",
  review: "10",
  new_button: [
    {
      buttonText: "Google",
      buttonLink: "https://www.google.com",
    },
    {
      buttonText: "Facebook",
      buttonLink: "https://www.facebook.com",
    },
    {
      buttonText: "Twitter",
      buttonLink: "https://twitter.com",
    },
  ],
  survey: [],
  quiz: [
    {
      question: "",
      answers: [],
    },
  ],
}