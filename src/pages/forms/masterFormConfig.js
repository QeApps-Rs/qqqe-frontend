export const templateFieldCss = {
  bgColor: "rgb(255, 255, 255)",
  borderColor: "rgb(209, 213, 219)",
  focusBorderColor: "rgb(0, 123, 255)",
  placeholderTextColor: "rgb(107 114 128)",
  formHeadingColor: "rgb(0, 0, 0)",
  textColor: "rgb(0, 0, 0)",
  letterSpacing: "1px",
  inputFontSize: "14px",
  templateBgColor: "rgb(0, 0, 0)",
  templateOverlayColor: "rgb(255, 255, 255)",
  fontWeight: "normal",
  fontFamily: "Arial",
  borderRadius: "",
  borderWidth: "2px",
  templateBorderColor: "rgb(255, 255, 255)",
  templatePaddingTop: "4px",
  templatePaddingBottom: "4px",
  templatePaddingLeft: "4px",
  templatePaddingRight: "4px",
  formBorderStyle: "none",
  formType: "full page",
  formWidth: "large",
  templateMinHeight: "500px",
  templateHeadingFontSize: "32px",
  templateOfferFontSize: "24px",
  templateSubheadingFontSize: "16px",
};

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
  { label: "Overlay color:", colorType: "templateOverlayColor" },
];

export const fontFamilyList = [
  { label: "Arial" },
  { label: "Arial Black" },
  { label: "Century Gothic" },
  { label: "Comic Sans MS" },
  { label: "Courier" },
  { label: "Geneva" },
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
      value: "Don’t show to existing Klaviyo profiles",
      label: "Don’t show to existing Klaviyo profiles",
    },
    { value: "Show to all visitors", label: "Show to all visitors" },
    {
      value: "Show to any existing profile",
      label: "Show to any existing profile",
    },
    {
      value: "Show to email subscribers only",
      label: "Show to email subscribers only",
    },
    {
      value: "Show to SMS subscribers only",
      label: "Show to SMS subscribers only",
    },
    {
      value: "Show to specific profiles in a list or segment",
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
  { value: "Immediately", label: "Immediately" },
  { value: "Based on rules", label: "Based on rules" },
  { value: "Only on a custom trigger", label: "Only on a custom trigger" },
];

export const deviceOptions = [
  { value: "Both desktop and mobile", label: "Both desktop and mobile" },
  { value: "Desktop only", label: "Desktop only" },
  { value: "Mobile only", label: "Mobile only" },
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
  {
    title: "Add blocks",
    subtitle: "Coming Soon",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tag: "block",
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
