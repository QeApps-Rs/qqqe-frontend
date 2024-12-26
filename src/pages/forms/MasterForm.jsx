/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import popup_img from "../../../src/images/newsletter_left_img.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import successImg from "../../../src/images/success_fn.png";
import surveyPopupBannerImg from "../../images/surveypopup-dummy-banner-img.jpg";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import {
  templateFieldCss,
  templateEditorCollapseOptions,
  surveyControllerDefaults,
  targetAndBehaviorDefaultState as targetAndBehaviorDefaultState,
} from "./masterFormConfig";
import ProductBundleTab from "../../components/Forms/ProductBundleTab";
import ProductBundlePopUp from "../../components/Forms/ProductBundlePopUp";
import StyleComponent from "./StyleComponent";
import InputControllerComponent from "./InputControllerComponent";
import { Toaster } from "react-hot-toast";
import SurveyControllerComponent from "./SurveyControllerComponent";
import SuccessControllerComponent from "./SuccessControllerComponent";

import purchaseSatisfactionSurveyDefaultImage from "../../../src/images/templates/purchase-satisfaction-survey-default.jpg";
import Loader from "../../common/Loader";
import { BackIcon } from "../../components/custIcon/svgIcon";
import SurveyButtonComponent from "./SurveyButtonComponent";
import ProductUpSellPopUp from "../../components/Forms/ProductUpSellPopUp";
import ProductCrossSellPopUp from "../../components/Forms/ProductCrossSellPopUp";
import PreviewComponent from "./templateBanner/PreviewComponent";
import CartAbandonmentPopUp from "../../components/Forms/CartAbandonmentPopUp";
import TargetingAndBehaviorControlComponent from "./TargetingAndBehaviorControlComponent";
import ExitProductRecommenderPopup from "../../components/Forms/ExitProductRecommenderPopup";
import TemplateHeader from "../../components/Forms/TemplateHeader";
import SocialMediaConnectPopUp from "../../components/Forms/SocialMediaConnectPopUp";
import WorldWideWelcomePopUp from "../../components/Forms/WorldWideWelcomePopUp";
import TemplateBannerComponent from "./TemplateBannerComponent";
import SurveyPopUp from "../../components/Forms/SurveyPopUp";
import socialMediaPopupImg from "../../images/facebook_logo.png";

const MasterForm = () => {
  //  shiv code start
  const [loading, setLoading] = useState(false);
  const [handleType, setHandleType] = useState("");
  const [customCssState, setCustomCssState] = useState("");
  const [customJsState, setCustomJsState] = useState("");
  const [templateDesign, setTemplateDesign] = useState(templateFieldCss);
  const [surveyController, setSurveyController] = useState(
    surveyControllerDefaults
  );
  const templateData = useState({
    heading: "",
    button: "",
    offerAmount: "",
    subHeading: "",
    image: "",
    successImage: "",
    successHeading: "",
    successSubHeading: "",
    successDescription: "",
  });
  const [inputControllerEditState, setInputControllerEditState] = useState({
    index: null,
    fieldType: "",
    fieldValidation: "",
    fieldName: "",
    placeholderText: "",
  });
  const [surveyControllerEditState, setSurveyControllerEditState] = useState({
    index: null,
    fieldName: "",
    options: "",
  });
  const [addedFields, setAddedFields] = useState([]);
  const [addedQuestion, setAddedQuestion] = useState([]);
  const [success, setSuccess] = useState(false);
  const [addedButton, setAddedButton] = useState(
    surveyControllerDefaults?.new_button
  );
  const [inputBtnSurveyValues, setInputBtnSurveyValues] = useState({});

  const handleBtnInputChange = (buttonText, value) => {
    setInputBtnSurveyValues((prev) => ({ ...prev, [buttonText]: value }));
  };
  const handleTemplateChange = (colorType) => (templateDesign) => {
    setTemplateDesign((prev) => ({ ...prev, [colorType]: templateDesign }));
  };

  // const combinedPadding = `
  //   ${templateDesign.templatePaddingTop}
  //   ${templateDesign.templatePaddingRight}
  //   ${templateDesign.templatePaddingBottom}
  //   ${templateDesign.templatePaddingLeft}
  // `;
  // const combinedMargin = `
  //   ${templateDesign.templateMarginTop}
  //   ${templateDesign.templateMarginRight}
  //   ${templateDesign.templateMarginBottom}
  //   ${templateDesign.templateMarginLeft}
  // `;
  const [inputValues, setInputValues] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputSurveyValues, setInputSurveyValues] = useState({});
  const [templateHeaderState, setTemplateHeaderState] = useState({
    teaser: true,
    success: true,
    publish: true,
    desktop: true,
    mobile: true,
  });

  const [suggestionTemplateStatus, setSuggestionTemplateStatus] = useState({
    isPreviewPopup: false,
    isProductBundle: false,
    isPurchaseSatisfactionSurvey: false,
    isFeedbackSurvey: false,
    isAttributionSurvey: false,
    isUpSellPopup: false,
    isCrossSellPopup: false,
    isSurveyPopup: false,
    isAbandonmentPopup: false,
    isExitProductRecommenderPopup: false,
    isSocialMediaConnectPopup: false,
    isWorldWideWelcomePopup: false,
  });

  const [switchStates, setSwitchStates] = useState({
    openInNewTab: false,
    image: false,
    name: false,
    sku: false,
    price: false,
    variantSwatch: false,
    atcButton: false,
  });

  const [targetedProducts, setTargetedProducts] = useState([]);
  const [targetedCollections, setTargetedCollections] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isView, setView] = useState("Desktop");
  const [productList, setProductList] = useState([]);
  const [productListState, setProductListState] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionListState, setCollectionListState] = useState(false);
  const [collectionListForPopUp, setCollectionListForPopUp] = useState([]);
  const [productListForPopUp, setProductListForPopUp] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [noOfProducts, setNoOfProducts] = useState(3);
  const [targetedProductsForPopUp, setTargetedProductsForPopUp] = useState([]);
  const [targetedCollectionsForPopUp, setTargetedCollectionsForPopUp] =
    useState([]);
  const [selectedCollections, setSelectedCollections] = useState({});
  const location = useLocation();
  const { keywords, subTemplateId } = location.state || {}; // Safely access state
  // TARGETING AND BEHAVIOR START
  const [targetingAndBehavior, setTargetingAndBehavior] = useState(
    targetAndBehaviorDefaultState
  );
  // TARGETING AND BEHAVIOR END

  const handleInputChange = (fieldName, value) => {
    setInputValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSurveyInputChange = (fieldName, value) => {
    setInputSurveyValues((prev) => {
      const currentValues = prev[fieldName] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [fieldName]: currentValues.filter((v) => v !== value),
        };
      } else {
        return { ...prev, [fieldName]: [...currentValues, value] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const allRequiredFilled = addedFields.every(
      (field) =>
        field.fieldValidation !== "required" || inputValues[field.fieldName]
    );

    if (allRequiredFilled) {
      console.log("Form submitted successfully", inputValues);
    }
  };

  const handleDeleteField = (fieldName) => {
    setAddedFields((prevFields) =>
      prevFields.filter((field) => field.fieldName !== fieldName)
    );
  };

  const handleEdit = (field, index) => {
    setInputControllerEditState({
      index,
      fieldType: field.fieldType,
      fieldValidation: field.fieldValidation,
      fieldName: field.fieldName,
      placeholderText: field.placeholderText,
    });
  };

  const handleSurveyDeleteField = (fieldName, index) => {
    setAddedQuestion((prevFields) =>
      prevFields.filter((field) => field.fieldName !== fieldName)
    );
    setSurveyController((prevState) => {
      const updatedSurvey = [...prevState.survey];
      updatedSurvey.splice(index, 1);
      return {
        ...prevState,
        survey: updatedSurvey,
      };
    });
  };

  const handleSurveyEdit = (field, index) => {
    setSurveyControllerEditState({
      index,
      fieldName: field.fieldName,
      options: field.options,
    });
  };

  const handleSurveyBtnDeleteField = (buttonText, index) => {
    setAddedButton((prevFields) =>
      prevFields.filter((field) => field.buttonText !== buttonText)
    );
    setSurveyController((prevState) => {
      const updatedButtons = [...prevState.new_button];
      updatedButtons.splice(index, 1); // Remove the button at the specified index
      return {
        ...prevState,
        new_button: updatedButtons,
      };
    });
  };

  const handleAddButton = (buttonText, buttonLink, isEditMode, editIndex) => {
    setAddedButton((prevButtons) => {
      if (isEditMode && editIndex !== null) {
        const updatedButtons = [...prevButtons];
        updatedButtons[editIndex] = { buttonText, buttonLink };
        return updatedButtons;
      } else {
        return [...prevButtons, { buttonText, buttonLink }];
      }
    });
  };
  const handleSurveyBtnEdit = (field, index) => {
    setSurveyControllerEditState({
      index,
      buttonText: field.buttonText,
      buttonLink: field.buttonLink,
    });
  };

  const formClasses = () => {
    const { formWidth, formType } = templateDesign;
    let classes = "  ";
    // let classes = "max-h-[calc(100vh-500px)]  ";

    if (formType === "embed") {
      classes += formWidth === "large" ? "w-full flex" : "w-10/12 flex";
    }

    return classes.trim();
  };

  const feedbackSurveyClasses = () => {
    const { formWidth, formType } = templateDesign;
    let classes = "";

    if (formType === "full page") {
      classes =
        formWidth === "large"
          ? "w-full flex h-[calc(100vh-300px)]"
          : "w-10/12 flex h-[calc(100vh-300px)]";
    } else if (formType === "embed") {
      classes = formWidth === "large" ? "w-full flex" : " w-10/12 flex";
    } else {
      classes = "overflow-y-auto h-[500px] w-[380px]";
    }

    return classes.trim();
  };
  const imagePositionContainer = `${
    templateDesign.imagePosition === "0"
      ? "-order-none rounded-r-[90px]"
      : "order-1 rounded-l-[90px]"
  }`;

  const imageSrc = !success
    ? templateDesign.image || popup_img
    : templateDesign.successImage || popup_img;

  const surveyBannerImgSrc = templateDesign.image || surveyPopupBannerImg;
  const socialMediaPopupimageSrc = templateDesign.image || socialMediaPopupImg;

  const surveyImageSrc =
    templateDesign.image || purchaseSatisfactionSurveyDefaultImage;
  // const getStyle = (design, type) => ({
  //   fontSize: design[`${type}FontSize`] || "24px", // Fallback to 50px if not defined
  //   fontFamily: design[`${type}FontFamily`] || "Arial, sans-serif", // Optional fallback for fontFamily
  //   color: design[`${type}Color`] || "#000", // Optional fallback for color
  // });
  const getStyle = (design, type) => {
    const styles = {
      fontSize: design[`${type}FontSize`] || "24px", // Fallback to 24px if not defined
      fontFamily: design[`${type}FontFamily`] || "Arial, sans-serif", // Optional fallback for fontFamily
      color: design[`${type}Color`] || "#000", // Optional fallback for color
    };
    if (type == "templateEmail") {
      // console.log("Generated styles for type:", type, design, styles);
    }
    return styles;
  };

  const [advanceSetting, setAdvanceSetting] = useState(false);

  const advanceSettingHandleChange = () => {
    setAdvanceSetting(!advanceSetting);
  };

  useEffect(() => {
    const fetchSubTemplateData = async () => {
      try {
        setLoading(true);
        const response = await FormSubmitHandler({
          method: "get",
          url: `sub/template/${subTemplateId}`,
        });

        if (response.success) {
          const responseKeywords = response?.data?.keywords.split(",");
          console.log(["responseKeywords", responseKeywords]);

          if (responseKeywords?.includes("Bundle")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isProductBundle: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (
            responseKeywords?.includes("Purchase Satisfaction Survey")
          ) {
            purchaseSatisfactionSurveyDefaultImage;
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isPurchaseSatisfactionSurvey: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (responseKeywords?.includes("Feedback Survey")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isFeedbackSurvey: true,
            });

            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          }
          //   else if (responseKeywords?.includes("Survey Popup")) {
          //     setSuggestionTemplateStatus({
          //       ...suggestionTemplateStatus,
          //       isAttributionSurvey: true,
          //     });
          //     setTemplateHeaderState({
          //       ...templateHeaderState,
          //       success: true,
          //       desktop: false,
          //       mobile: false,
          //     });

          // }
          else if (responseKeywords?.includes("Survey Popup")) {
            console.log(["check1"]);
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isSurveyPopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (responseKeywords?.includes("Up-selling")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isUpSellPopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (responseKeywords?.includes("Cross-Selling Popup")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isCrossSellPopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (responseKeywords?.includes("Cart Abandonment Offer")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isAbandonmentPopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (responseKeywords?.includes("Exit Product Recommender")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isExitProductRecommenderPopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (responseKeywords?.includes("Social Media Connect")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isSocialMediaConnectPopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else if (responseKeywords?.includes("World-Wide Welcome")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isWorldWideWelcomePopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          } else {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isPreviewPopup: true,
            });
            setTemplateHeaderState({
              ...templateHeaderState,
              success: true,
              desktop: false,
              mobile: false,
            });
          }

          // let jsonObject = {};
          let jsonObject = response?.data?.params;
          const sid = id.split("s")[1];
          setHandleType(response?.data?.masterTemplate?.template_handle);
          const customerTemplate = await FormSubmitHandler({
            method: "get",
            url: `customer/template/${sid}?handle_type=${response?.data?.masterTemplate?.template_handle}&subTemplateId=${subTemplateId}`,
          });
          if (customerTemplate.success && customerTemplate.data) {
            jsonObject = customerTemplate?.data?.json_response;
          }
          if (jsonObject) {
            const resData = await revertStyleStateController(
              jsonObject?.styles
            );

            const successData = await revertSuccessStateController(
              jsonObject?.success_controller
            );
            setTemplateDesign({
              ...resData,
              ...successData,
            });
            const addedFieldsData = await reverseInputLineItems(
              jsonObject?.inputs_controller?.input_line_items
            );
            if (addedFieldsData.length > 0) {
              setAddedFields(addedFieldsData);
            }
            setTargetingAndBehavior(jsonObject?.target_behaviors);
            setCustomCssState(jsonObject?.custom_css);
            setSurveyController(jsonObject?.survey_controller);
            setCustomJsState(jsonObject?.custom_js);
            setAddedButton(jsonObject?.survey_controller?.new_button);
            setProductListForPopUp(jsonObject?.items?.selected_products);
            const selectedProductIds =
              jsonObject?.items?.selected_products.reduce((acc, product) => {
                acc[product.id] = true;
                return acc;
              }, {});
            setSelectedProducts(selectedProductIds);
            const targetedProductIds =
              jsonObject?.items?.targeted_products.reduce((acc, product) => {
                acc[product.id] = true;
                return acc;
              }, {});
            setTargetedProducts(targetedProductIds);
            setCollectionListForPopUp(jsonObject?.items?.selected_collections);
            const selectedCollectionIds =
              jsonObject?.items?.selected_collections.reduce(
                (acc, collection) => {
                  acc[collection.id] = true;
                  return acc;
                },
                {}
              );
            setSelectedCollections(selectedCollectionIds);
            setTargetedCollectionsForPopUp(
              jsonObject?.items?.targeted_collections
            );
            const targetedCollectionIds =
              jsonObject?.items?.targeted_collections.reduce(
                (acc, collection) => {
                  acc[collection.id] = true;
                  return acc;
                },
                {}
              );
            setTargetedCollections(targetedCollectionIds);
            setProductDiscountForDetails(
              jsonObject?.items?.discount_details?.discount_for
            );
            setProductDiscountTypeDetails(
              jsonObject?.items?.discount_details?.discount_type
            );
            setProductDiscountAmountDetails(
              jsonObject?.items?.discount_details?.discount_amount
            );
            setSwitchStates(jsonObject?.items?.bundle_attribute);
            const updatedSurveyState =
              jsonObject?.survey_controller?.survey?.map((sitem) => {
                return {
                  fieldName: sitem.question,
                  options: sitem.answers,
                };
              });
            console.log("updatedSurveyState", updatedSurveyState);
            setAddedQuestion(updatedSurveyState || []);
          }
        }
      } catch (error) {
        console.error("Error fetching sub-template:", error);
      }
    };

    // Only run the async function if subTemplateId is available
    if (subTemplateId) {
      fetchSubTemplateData();
    }
  }, [keywords, subTemplateId]);

  const revertStyleStateController = (styles) => {
    console.log(["borderColor", styles.form_type.template_border_color]);

    return {
      bgColor: styles.form_type.input_fields_style.background_color,
      borderColor: styles.form_type.input_fields_style.border_color,
      focusBorderColor: styles.form_type.input_fields_style.focus_border_color,
      placeholderTextColor:
        styles.form_type.input_fields_style.placeholder_color,
      formHeadingColor: styles.form_type.input_fields_style.label_color,
      textColor: styles.form_type.input_fields_style.text_color,
      letterSpacing: styles.form_type.input_fields_style.letter_spacing,
      inputFontSize: styles.form_type.input_fields_style.input_font_size,
      templateBgColor: styles.form_type.background_color,
      templateOverlayColor: styles.form_type.overlay_color,
      fontWeight: styles.form_type.input_fields_style.font_weight,
      fontFamily: styles.form_type.input_fields_style.font_family,
      borderRadius: styles.form_type.corner_radius,
      borderWidth: styles.form_type.border_width,
      templateBorderColor: styles.form_type.template_border_color,
      templatePaddingTop: styles.form_type.padding.top,
      templatePaddingBottom: styles.form_type.padding.bottom,
      templatePaddingLeft: styles.form_type.padding.left,
      templatePaddingRight: styles.form_type.padding.right,
      templateMarginTop: styles.form_type.margin.top,
      templateMarginBottom: styles.form_type.margin.bottom,
      templateMarginLeft: styles.form_type.margin.left,
      templateMarginRight: styles.form_type.margin.right,
      formBorderStyle: styles.form_type.border_style,
      formType: styles.form_type.type,
      formWidth: styles.form_type.width,
      templateMinHeight: styles.form_type.min_height,
      templateHeadingFontSize: styles.form_parameters.title.font_size,
      templateOfferFontSize:
        styles.form_parameters.offer_title.template_offer_font_size,
      templateSubHeadingFontSize: styles.form_parameters.sub_title.font_size,
      templateHeadingFontFamily:
        styles.form_parameters.title.template_heading_font_family,
      templateOfferFontFamily:
        styles.form_parameters.offer_title.template_offer_font_family,
      templateSubHeadingFontFamily:
        styles.form_parameters.sub_title.template_sub_heading_font_family,
      templateHeadingColor: styles.form_parameters.title.color,
      templateSubHeadingColor: styles.form_parameters.sub_title.color,
      templateOfferColor:
        styles.form_parameters.offer_title.template_offer_color,
      templateButtonBgColor: styles.form_parameters.button.background_color,
      templateProductOverlayColor: "#000000",
      imagePosition: styles.side_image.side,
      successHeadingFontSize: "32px",
      successDescriptionFontSize: "24px",
      successSubHeadingFontSize: "16px",
      successHeadingFontFamily: "Arial",
      successDescriptionFontFamily: "Arial",
      successSubHeadingFontFamily: "Arial",
      successHeadingColor: "#000000",
      successSubHeadingColor: "#000000",
      successDescriptionColor: "#000000",
      containPosition: "center",
      reviewType: "none",
      reviewCount: "5",
      reviewMinCount: "5",
      reviewMaxCount: "10",
      ratingCount: "5",
      ratingMinCount: "1",
      ratingMaxCount: "15",
      heading: styles.form_parameters.title.text,
      button: styles.form_parameters.button.text,
      offerAmount: styles.form_parameters.offer_title.template_offer_amount,
      subHeading: styles.form_parameters.sub_title.text,
      image: styles.form_parameters.image.link,
      successImage: "",
      successHeading:
        "Thanks for sharing. Please check your email for confirmation message",
      successSubHeading:
        "Thanks for sharing. Please check your email for confirmation message",
      successDescription:
        "Thanks for sharing. Please check your email for confirmation message",
      templateEmailText: styles.form_parameters.email_title.text,
      templateEmailFontSize: styles.form_parameters.email_title.font_size,
      templateEmailFontFamily: styles.form_parameters.email_title.font_family,
      templateEmailColor: styles.form_parameters.email_title.color,
    };
  };

  const revertSuccessStateController = (state) => {
    return {
      containPosition: state.position,
      successHeading: state.heading,
      successHeadingColor: state.heading_color,
      successHeadingFontSize: state.heading_font_size,
      successHeadingFontFamily: state.heading_font_family,
      successSubHeading: state.sub_heading,
      successSubHeadingColor: state.sub_heading_color,
      successSubHeadingFontSize: state.sub_heading_font_size,
      successSubHeadingFontFamily: state.sub_heading_font_family,
      successDescription: state.description,
      successDescriptionColor: state.description_color,
      successDescriptionFontSize: state.description_font_size,
      successDescriptionFontFamily: state.description_font_family,
      successImage: state.image,
    };
  };
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const onPublish = async () => {
    setLoading(true);
    const pid = id.split("s")[0];
    const sid = id.split("s")[1];
    await FormSubmitHandler({
      method: "post",
      url: `suggestion/publish`,
      data: {
        pid: pid,
        sid: sid,
        sub_template_id: subTemplateId,
        json_response: {
          styles: await convertStateToNestedObject(templateDesign),
          inputs_controller: await convertInputControllerStateToNestedObject(
            templateDesign
          ),
          target_behaviors: targetingAndBehavior,
          success_controller: await convertSuccessControllerStateToNestedObject(
            templateDesign
          ),
          items: await convertItemStateToNestedObject(templateDesign),
          survey_controller: surveyController,
          custom_js: customJsState,
          custom_css: customCssState,
        },
      },
    })
      .then((response) => {
        if (response.success) {
          navigate(`/suggestion/list/${pid}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getProductList = async () => {
    await FormSubmitHandler({
      method: "get",
      url: `product/get`,
    })
      .then((response) => {
        if (response.success) {
          setProductList(response.data);
          setProductListState(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCollectionList = async () => {
    setLoading(true);
    await FormSubmitHandler({
      method: "get",
      url: `collection/get`,
    })
      .then((response) => {
        if (response.success) {
          setCollectionList(response.data);
          setCollectionListState(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductList();
    getCollectionList();
  }, []);

  const containerClass = `
  ${templateDesign.imagePosition === "0" ? "-order-none" : "order-1"}
`;

  const renderStars = (reviewCount) => {
    const validCount =
      reviewCount === 5 || reviewCount === 10 ? reviewCount : 5;
    return (
      <div className="flex mt-2">
        {Array.from({ length: validCount }, (_, index) => (
          <span key={index} className="text-gray-800 text-2xl">
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderNumbers = (
    count,
    defaultCount = 5,
    borderColor = "border-grey-400"
  ) => {
    console.log(["defaultCount", defaultCount]);
    const minCount = templateDesign.ratingMinCount || 1;
    const maxCount = templateDesign.ratingMaxCount || 15;
    const validCount = Math.min(Math.max(count, minCount), maxCount);
    return (
      <div className="flex mt-2">
        {Array.from({ length: validCount }, (_, index) => {
          const number = index + 1;

          return (
            <div
              key={number}
              className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-black border ${borderColor} transition duration-300 cursor-pointer mr-1`}
            >
              {number}
            </div>
          );
        })}
      </div>
    );
  };

  const reviewCount =
    parseInt(surveyController.review, 10) ??
    parseInt(templateDesign.reviewCount, 10);
  const ratingCount =
    parseInt(surveyController.rating, 10) ??
    parseInt(templateDesign.ratingCount, 10);

  const otherProps = {
    isView,
    templateDesign,
    imageSrc,
    formClasses,
    containerClass,
    success,
    successImg,
    getStyle,
    handleDeleteField,
    handleInputChange,
    inputValues,
    handleEdit,
    isSubmitted,
    addedFields,
    handleSubmit,
    addedQuestion,
    handleSurveyInputChange,
    inputSurveyValues,
    handleSurveyDeleteField,
    handleSurveyEdit,
    renderStars,
    renderNumbers,
    reviewCount,
    ratingCount,
  };
  const surveyProps = {
    isView,
    templateDesign,
    surveyBannerImgSrc,
    formClasses,
    containerClass,
    success,
    successImg,
    getStyle,
    handleDeleteField,
    handleInputChange,
    inputValues,
    handleEdit,
    isSubmitted,
    addedFields,
    handleSubmit,
    addedQuestion,
    handleSurveyInputChange,
    inputSurveyValues,
    handleSurveyDeleteField,
    handleSurveyEdit,
    renderStars,
    renderNumbers,
    reviewCount,
    ratingCount,
  };
  console.log("addedQuestion", addedQuestion);
  const worldWideWelcomeProps = {
    templateDesign,
    getStyle,
    formClasses,
    handleSubmit,
    addedFields,
    handleInputChange,
    isSubmitted,
    handleDeleteField,
    handleEdit,
    inputValues,
    success,
    successImg,
  };

  const socialMediaConnectProps = {
    templateDesign,
    getStyle,
    socialMediaPopupimageSrc,
    formClasses,
    handleSubmit,
    addedFields,
    handleInputChange,
    isSubmitted,
    handleDeleteField,
    handleEdit,
    inputValues,
    success,
    successImg,
  };

  const convertStateToNestedObject = (state) => {
    return {
      form_type: {
        type: state.formType,
        width: state.formWidth,
        min_height: state.templateMinHeight,
        show_on: "both",
        background_color: state.templateBgColor,
        overlay_color: state.templateOverlayColor,
        corner_radius: state.borderRadius,
        border_style: state.formBorderStyle,
        border_width: state.borderWidth,
        template_border_color: state.templateBorderColor,
        padding: {
          top: state.templatePaddingTop,
          bottom: state.templatePaddingBottom,
          left: state.templatePaddingLeft,
          right: state.templatePaddingRight,
        },
        margin: {
          top: state.templateMarginTop,
          bottom: state.templateMarginBottom,
          left: state.templateMarginLeft,
          right: state.templateMarginRight,
        },
        input_fields_style: {
          font_family: state.fontFamily,
          font_weight: state.fontWeight,
          letter_spacing: state.letterSpacing,
          label_color: state.formHeadingColor,
          text_color: state.textColor,
          placeholder_color: state.placeholderTextColor,
          background_color: state.bgColor,
          border_color: state.borderColor,
          focus_border_color: state.focusBorderColor,
          input_font_size: "14px",
        },
      },
      side_image: {
        side: state.imagePosition,
        show_on: "both", // You can adjust this if needed
      },
      form_parameters: {
        title: {
          text: state.heading,
          template_heading_font_family: state.templateHeadingFontFamily,
          color: state.templateHeadingColor,
          font_size: state.templateHeadingFontSize,
          section_background_color: "#ffffff",
          section_padding: {
            top: "15px",
            bottom: "15px",
            left: "15px",
            right: "15px",
          },
        },
        sub_title: {
          text: state.subHeading,
          template_sub_heading_font_family: state.templateSubHeadingFontFamily,
          color: state.templateSubHeadingColor,
          font_size: state.templateSubHeadingFontSize,
          section_background_color: "#ffffff",
          section_padding: {
            top: "15px",
            bottom: "15px",
            left: "15px",
            right: "15px",
          },
        },
        input: {
          placeholder: "Email",
          required: true,
          required_text: "This field is required",
          section_background_color: "#ffffff",
          section_padding: {
            top: "15px",
            bottom: "15px",
            left: "15px",
            right: "15px",
          },
        },
        button: {
          text: state.button,
          font_weight: "bold",
          letter_spacing: "2px", // Example, adjust if dynamic
          color: "#000000", // Adjust if dynamic
          background_color: state.templateButtonBgColor,
          corner_radius: "5px", // Example, adjust if dynamic
          border_style: "none",
          font_size: "12px", // Example, adjust if dynamic
          section_background_color: "#ffffff",
          section_padding: {
            top: "15px",
            bottom: "15px",
            left: "15px",
            right: "15px",
          },
        },
        close_button: {
          color: "#000000",
          background_color: "#ffffff",
          border_color: "#000000",
          section_margin: {
            top_bottom: "15px",
            left_right: "15px",
          },
        },
        image: {
          link: state.image,
          alt_text: "banner image",
          image_position: state.containPosition,
          section_background_color: "#ffffff",
        },
        offer_title: {
          template_offer_amount: state.offerAmount,
          template_offer_font_size: state.templateOfferFontSize,
          template_offer_font_family: state.templateOfferFontFamily,
          template_offer_color: state.templateOfferColor,
        },
        email_title: {
          text: state.templateEmailText,
          color: state.templateEmailColor,
          font_size: state.templateEmailFontSize,
          font_family: state.templateEmailFontFamily,
        },
      },
    };
  };

  const convertInputControllerStateToNestedObject = async (state) => {
    return {
      image: {
        src: state.image,
        alt: "",
        side: state.imagePosition,
      },
      heading: {
        heading: state.heading,
        heading_font_size: state.templateHeadingFontSize,
        sub_heading: state.subHeading,
        sub_heading_font_size: state.templateSubHeadingFontSize,
        description: state.offerAmount,
        description_font_size: state.templateOfferFontSize,
      },
      input_line_items: await inputLineItems(),
    };
  };

  const convertSuccessControllerStateToNestedObject = async (state) => {
    return {
      position: state.containPosition,
      heading: state.successHeading,
      heading_color: state.successHeadingColor,
      heading_font_size: state.successHeadingFontSize,
      heading_font_family: state.successHeadingFontFamily,
      sub_heading: state.successSubHeading,
      sub_heading_color: state.successSubHeadingColor,
      sub_heading_font_size: state.successSubHeadingFontSize,
      sub_heading_font_family: state.successSubHeadingFontFamily,
      description: state.successDescription,
      description_color: state.successDescriptionColor,
      description_font_size: state.successDescriptionFontSize,
      description_font_family: state.successDescriptionFontFamily,
      image: state.successImage,
    };
  };

  const inputLineItems = () => {
    return addedFields.map((addedField) => {
      return {
        fieldName: addedField.fieldName,
        placeholderText: addedField.placeholderText,
        fieldValidation: addedField.fieldValidation,
        fieldType: addedField.fieldType,
      };
    });
  };

  const reverseInputLineItems = (addedFieldsRecords) => {
    return addedFieldsRecords.map((addedFieldsRecord) => {
      return {
        fieldName: addedFieldsRecord.fieldName,
        placeholderText: addedFieldsRecord.placeholderText,
        fieldValidation: addedFieldsRecord.fieldValidation,
        fieldType: addedFieldsRecord.fieldType,
      };
    });
  };

  const [productDiscountForDetails, setProductDiscountForDetails] =
    useState("");
  const [productDiscountTypeDetails, setProductDiscountTypeDetails] =
    useState("");
  const [productDiscountAmountDetails, setProductDiscountAmountDetails] =
    useState(0);

  const convertItemStateToNestedObject = () => {
    return {
      selected_products: productListForPopUp,
      selected_collections: collectionListForPopUp,
      targeted_products: targetedProductsForPopUp,
      targeted_collections: targetedCollectionsForPopUp,
      discount_details: {
        discount_for: productDiscountForDetails,
        discount_type: productDiscountTypeDetails,
        discount_amount: productDiscountAmountDetails,
      },
      bundle_attribute: switchStates,
    };
  };
  return (
    <>
      {loading && <Loader />}
      <aside className="w-1/4  fixed left-[4.7rem] px-6 pt-6 pb-20 shadow-2xl h-full overflow-auto top-0 bg-white">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <p className="font-semibold text-lg">Template Editor</p>
        </div>
        <ul className="space-y-4">
          {templateEditorCollapseOptions
            .filter((item) => {
              if (!advanceSetting) {
                const excludedTags = [
                  "surveyController",
                  "successController",
                  "inputController",
                  "target",
                  "bundle",
                  "custom_style",
                  "custom_js",
                ];

                return item.tag === "style" && !excludedTags.includes(item.tag);
              }
              if (
                suggestionTemplateStatus?.isProductBundle ||
                suggestionTemplateStatus?.isUpSellPopup ||
                suggestionTemplateStatus?.isCrossSellPopup ||
                suggestionTemplateStatus?.isAbandonmentPopup ||
                suggestionTemplateStatus?.isExitProductRecommenderPopup
              ) {
                return (
                  // item.tag !== "inputController" &&
                  item.tag !== "surveyController"
                );
              }
              if (
                suggestionTemplateStatus?.isWorldWideWelcomePopup ||
                suggestionTemplateStatus?.isSocialMediaConnectPopup
              ) {
                return item.tag !== "surveyController" && item.tag !== "bundle";
              }
              if (suggestionTemplateStatus?.isPreviewPopup) {
                return item.tag !== "surveyController" && item.tag !== "bundle";
              }

              return item.tag !== "bundle";
            })
            .map((item, index) => (
              <li key={index} className="rounded-lg bg-custom_gradient">
                <h3
                  className="p-4 flex justify-between items-center cursor-pointer font-semibold text-lg text-white"
                  onClick={() => toggleAccordion(index)}
                >
                  <span> {item.title} </span>
                  <span className="text-sm font-normal">{item.subtitle}</span>
                  <svg
                    className={`fill-white ${
                      item.tag === "block" ? "hidden" : ""
                    } stroke-white duration-200 ease-in-out  w-6 h-6 transform ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 18 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.28882 8.43257L8.28874 8.43265L8.29692 8.43985C8.62771 8.73124 9.02659 8.86001 9.41667 8.86001C9.83287 8.86001 10.2257 8.69083 10.5364 8.41713L10.5365 8.41721L10.5438 8.41052L16.765 2.70784L16.771 2.70231L16.7769 2.69659C17.1001 2.38028 17.2005 1.80579 16.8001 1.41393C16.4822 1.1028 15.9186 1.00854 15.5268 1.38489L9.41667 7.00806L3.3019 1.38063L3.29346 1.37286L3.28467 1.36548C2.93287 1.07036 2.38665 1.06804 2.03324 1.41393L2.0195 1.42738L2.00683 1.44184C1.69882 1.79355 1.69773 2.34549 2.05646 2.69659L2.06195 2.70196L2.0676 2.70717L8.28882 8.43257Z" />
                  </svg>
                </h3>
                {activeIndex === index && item.tag === "style" && (
                  <StyleComponent
                    templateDesign={templateDesign}
                    onTemplateChange={handleTemplateChange}
                    isProductBundle={suggestionTemplateStatus?.isProductBundle}
                    isCrossSellPopup={
                      suggestionTemplateStatus?.isCrossSellPopup
                    }
                    isPurchaseSatisfactionSurvey={
                      suggestionTemplateStatus?.isPurchaseSatisfactionSurvey
                    }
                    isFeedbackSurvey={
                      suggestionTemplateStatus?.isFeedbackSurvey
                    }
                    isAttributionSurvey={
                      suggestionTemplateStatus?.isAttributionSurvey
                    }
                    isAbandonmentPopup={
                      suggestionTemplateStatus?.isAbandonmentPopup
                    }
                    isPreviewPopup={suggestionTemplateStatus?.isPreviewPopup}
                    isUpSellPopup={suggestionTemplateStatus?.isUpSellPopup}
                    isSocialMediaConnectPopup={
                      suggestionTemplateStatus?.isSocialMediaConnectPopup
                    }
                    isExitProductRecommenderPopup={
                      suggestionTemplateStatus?.isExitProductRecommenderPopup
                    }
                    isWorldWideWelcomePopup={
                      suggestionTemplateStatus?.isWorldWideWelcomePopup
                    }
                    isSurveyPopup={suggestionTemplateStatus?.isSurveyPopup}
                  />
                )}
                {activeIndex === index && item.tag === "inputController" && (
                  <>
                    <Toaster />
                    <InputControllerComponent
                      setAddedFields={setAddedFields}
                      templateDesign={templateDesign}
                      onTemplateChange={handleTemplateChange}
                      inputControllerEditState={inputControllerEditState}
                      isProductBundle={
                        suggestionTemplateStatus?.isProductBundle
                      }
                      setTemplateDesign={setTemplateDesign}
                      isCrossSellPopup={
                        suggestionTemplateStatus?.isCrossSellPopup
                      }
                      isPurchaseSatisfactionSurvey={
                        suggestionTemplateStatus?.isPurchaseSatisfactionSurvey
                      }
                      isFeedbackSurvey={
                        suggestionTemplateStatus?.isFeedbackSurvey
                      }
                      isAttributionSurvey={
                        suggestionTemplateStatus?.isAttributionSurvey
                      }
                      isAbandonmentPopup={
                        suggestionTemplateStatus?.isAbandonmentPopup
                      }
                      isUpSellPopup={suggestionTemplateStatus?.isUpSellPopup}
                      isSocialMediaConnectPopup={
                        suggestionTemplateStatus?.isSocialMediaConnectPopup
                      }
                      isExitProductRecommenderPopup={
                        suggestionTemplateStatus?.isExitProductRecommenderPopup
                      }
                      isWorldWideWelcomePopup={
                        suggestionTemplateStatus?.isWorldWideWelcomePopup
                      }
                      isPreviewPopup={suggestionTemplateStatus?.isPreviewPopup}
                      isSurveyPopup={suggestionTemplateStatus?.isSurveyPopup}
                    />
                  </>
                )}
                {activeIndex === index && item.tag === "successController" && (
                  <>
                    <Toaster />
                    <SuccessControllerComponent
                      setAddedFields={setAddedFields}
                      templateDesign={templateDesign}
                      onTemplateChange={handleTemplateChange}
                      inputControllerEditState={inputControllerEditState}
                      setTemplateDesign={setTemplateDesign}
                    />
                  </>
                )}
                {/* {activeIndex === index && item.tag === "style" && (
                  <StyleComponent
                    templateDesign={templateDesign}
                    onTemplateChange={handleTemplateChange}
                    isProductBundle={suggestionTemplateStatus?.isProductBundle}
                  />
                )} */}
                {activeIndex === index && item.tag === "target" && (
                  <TargetingAndBehaviorControlComponent
                    targetingAndBehavior={targetingAndBehavior}
                    setTargetingAndBehavior={setTargetingAndBehavior}
                  />
                )}

                {(suggestionTemplateStatus?.isProductBundle ||
                  suggestionTemplateStatus?.isUpSellPopup ||
                  suggestionTemplateStatus?.isAbandonmentPopup ||
                  suggestionTemplateStatus?.isCrossSellPopup ||
                  suggestionTemplateStatus?.isExitProductRecommenderPopup) &&
                  activeIndex === index &&
                  item.tag === "bundle" &&
                  productListState && (
                    <ProductBundleTab
                      productListState={productListState}
                      productList={productList}
                      collectionListState={collectionListState}
                      collectionList={collectionList}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                      setProductListForPopUp={setProductListForPopUp}
                      setCollectionListForPopUp={setCollectionListForPopUp}
                      targetedProductsForPopUp={targetedProductsForPopUp}
                      setTargetedProductsForPopUp={setTargetedProductsForPopUp}
                      targetedCollectionsForPopUp={targetedCollectionsForPopUp}
                      setTargetedCollectionsForPopUp={
                        setTargetedCollectionsForPopUp
                      }
                      setNoOfProducts={setNoOfProducts}
                      noOfProducts={noOfProducts}
                      productListForPopUp={productListForPopUp}
                      collectionListForPopUp={collectionListForPopUp}
                      setProductDiscountForDetails={
                        setProductDiscountForDetails
                      }
                      productDiscountForDetails={productDiscountForDetails}
                      setProductDiscountTypeDetails={
                        setProductDiscountTypeDetails
                      }
                      productDiscountTypeDetails={productDiscountTypeDetails}
                      setProductDiscountAmountDetails={
                        setProductDiscountAmountDetails
                      }
                      productDiscountAmountDetails={
                        productDiscountAmountDetails
                      }
                      switchStates={switchStates}
                      setSwitchStates={setSwitchStates}
                      targetedProducts={targetedProducts}
                      setTargetedProducts={setTargetedProducts}
                      targetedCollections={targetedCollections}
                      setTargetedCollections={setTargetedCollections}
                      selectedCollections={selectedCollections}
                      setSelectedCollections={setSelectedCollections}
                    />
                  )}

                {!suggestionTemplateStatus?.isProductBundle &&
                  activeIndex === index &&
                  item.tag === "surveyController" && (
                    <SurveyControllerComponent
                      templateDesign={templateDesign}
                      onTemplateChange={handleTemplateChange}
                      setAddedQuestion={setAddedQuestion}
                      surveyControllerEditState={surveyControllerEditState}
                      onAddButton={handleAddButton}
                      setSurveyController={setSurveyController}
                      surveyController={surveyController}
                    />
                  )}
                {activeIndex === index && item.tag === "custom_style" && (
                  <div className="p-4 border-t border-white">
                    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                      <div className="col-span-12 xl:col-span-12">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                          <div className="w-full flex flex-col gap-9">
                            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                              <form action="#">
                                <div className="p-3">
                                  <textarea
                                    className="w-full mt-2 w-25 border border-gray-300 rounded p-1 h-40"
                                    id="custom-css"
                                    name="custom-css"
                                    value={customCssState}
                                    onChange={(e) =>
                                      setCustomCssState(e.target.value)
                                    }
                                  />
                                  {/* <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Save
                                  </button> */}
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeIndex === index && item.tag === "custom_js" && (
                  <div className="p-4 border-t border-white">
                    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                      <div className="col-span-12 xl:col-span-12">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                          <div className="w-full flex flex-col gap-9">
                            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                              <form action="#">
                                <div className="p-3">
                                  <textarea
                                    id="custom-js"
                                    name="custom-js"
                                    className="w-full mt-2 w-25 border border-gray-300 rounded p-1 h-40"
                                    value={customJsState}
                                    onChange={(e) =>
                                      setCustomJsState(e.target.value)
                                    }
                                  />
                                  {/* <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Save
                                  </button> */}
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          <button
            onClick={advanceSettingHandleChange}
            className="rounded-lg text-white w-full p-4 font-semibold text-lg bg-custom_gradient"
          >
            <i className="fa fa-cog mr-2" aria-hidden="true"></i>
            {advanceSetting
              ? "Hide Advanced Settings"
              : "Show Advanced Settings"}
          </button>
        </ul>
      </aside>
      <div className="flex justify-end mb-4">
        <span
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md mr-4 hover:bg-black hover:text-white transition-colors duration-300"
        >
          <BackIcon /> Back
        </span>
        <span
          onClick={() => navigate(-3)}
          className="flex items-center gap-x-1 cursor-pointer bg-black border border-gray-300 pt-1.5 pb-1.5 px-3 text-[15px] rounded-md text-white"
        >
          Discard
        </span>
      </div>

      <div className="w-3/4 float-right p-0">
        <TemplateHeader
          isView={isView}
          setView={setView}
          success={success}
          setSuccess={setSuccess}
          templateHeaderState={templateHeaderState}
          onPublish={onPublish}
        />
        {suggestionTemplateStatus.isProductBundle && (
          <ProductBundlePopUp
            productData={productListForPopUp}
            noOfProducts={noOfProducts}
            templateDesign={templateDesign}
            getStyle={getStyle}
            successImg={successImg}
            success={success}
          />
        )}
        {suggestionTemplateStatus.isFeedbackSurvey && (
          <div
            className="flex items-center justify-center py-5 bg-white"
            style={{
              minHeight: "calc(100vh - 300px)",
            }}
          >
            <div
              className="grid grid-cols-1 xl:grid-cols-12 gap-4 w-full lg:w-7/12 "
              style={{
                backgroundColor: templateDesign.templateBgColor,
                borderRadius: templateDesign.borderRadius,
                borderWidth: templateDesign.borderWidth,
                borderColor: templateDesign.templateBorderColor,
                borderStyle: templateDesign.formBorderStyle,
                minHeight: "500px",
              }}
            >
              <div
                className={`flex flex-col justify-center xl:col-span-6 ${containerClass} h-full `}
              >
                <img
                  src={surveyImageSrc}
                  alt="Promo"
                  className={`w-full h-64 sm:h-96 md:h-full  object-cover`}
                />
              </div>
              {success ? (
                <div
                  className={`${
                    templateDesign.containPosition === "center"
                      ? "text-center"
                      : templateDesign.containPosition === "right"
                      ? "text-right"
                      : "text-left"
                  } flex flex-col justify-center w-full xl:col-span-6 p-4`}
                >
                  <div
                    className={`${
                      templateDesign.containPosition === "center"
                        ? "justify-center"
                        : templateDesign.containPosition === "left"
                        ? "justify-start"
                        : "justify-end"
                    } flex w-full`}
                  >
                    <img
                      src={successImg}
                      alt="Success"
                      className="max-w-[130px] w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                  <h2
                    className="text-4xl font-bold mt-4"
                    style={getStyle(templateDesign, "successHeading")}
                  >
                    {templateDesign.successHeading}
                  </h2>
                  <span
                    className="text-xl font-bold mt-4"
                    style={getStyle(templateDesign, "successSubHeading")}
                  >
                    {templateDesign.successSubHeading}
                  </span>
                  <p
                    className="text-lg mt-4"
                    style={getStyle(templateDesign, "successDescription")}
                  >
                    {templateDesign.successDescription}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-start xl:col-span-6 p-4">
                  <div className="flex justify-end mb-2">
                    <h4
                      className="leading-none font-bold"
                      style={getStyle(templateDesign, "templateEmail")}
                    >
                      {templateDesign.templateEmailText}
                    </h4>
                  </div>
                  <div className="m-auto">
                    <h1
                      className="text-8xl font-bold mb-4 relative leading-none "
                      style={getStyle(templateDesign, "templateHeading")}
                    >
                      {templateDesign.heading}
                    </h1>
                    <p
                      className="text-lg mb-2 mt-1leading-none"
                      style={getStyle(templateDesign, "templateSubHeading")}
                    >
                      {templateDesign.subHeading}
                    </p>
                    <form
                      className="flex flex-col space-y-4"
                      onSubmit={handleSubmit}
                    >
                      {/* Display Stars Here */}
                      {surveyController.survey_type === "review" && (
                        <>{renderStars(reviewCount)}</>
                      )}
                      {surveyController.survey_type === "rating" && (
                        <>{renderNumbers(ratingCount)}</>
                      )}
                    </form>
                    {addedFields.map((field, index) => (
                      <TemplateBannerComponent
                        key={index}
                        {...field}
                        templateDesign={templateDesign}
                        inputValue={inputValues[field.fieldName] || ""}
                        onInputChange={handleInputChange}
                        isSubmitted={isSubmitted}
                        onDelete={() => handleDeleteField(field.fieldName)}
                        onEdit={() => handleEdit(field, index)}
                      />
                    ))}
                    <button
                      type="button"
                      style={{
                        backgroundColor: templateDesign.templateButtonBgColor,
                      }}
                      className="  text-white py-2 px-4 mt-3 rounded shadow w-full hover:bg-blue-900"
                    >
                      {templateDesign.button}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {suggestionTemplateStatus.isPurchaseSatisfactionSurvey && (
          <div
            className="flex items-center justify-center bg-white"
            style={{ minHeight: "calc(100vh - 300px)" }}
          >
            <div
              className={`relative shadow-[7px_-7px_57px_#ccc] flex items-center justify-between ${feedbackSurveyClasses()}`}
              style={{
                backgroundColor: templateDesign.templateBgColor,
                borderRadius: templateDesign.borderRadius,
                borderWidth: templateDesign.borderWidth,
                borderColor: templateDesign.templateBorderColor,
                borderStyle: templateDesign.formBorderStyle,
              }}
            >
              <div
                className={`max-w-[130px] min-h-[130px] overflow-hidden flex items-stretch ${imagePositionContainer}`}
              >
                <img
                  src={surveyImageSrc}
                  alt="Round Image"
                  className="w-full h-auto object-cover flex-grow"
                />
              </div>

              {success ? (
                <div
                  className={`${
                    templateDesign.containPosition === "center"
                      ? "text-center"
                      : templateDesign.containPosition === "right"
                      ? "text-right"
                      : "text-left"
                  } flex flex-col justify-center w-full p-4`}
                >
                  <div
                    className={`${
                      templateDesign.containPosition === "center"
                        ? "justify-center"
                        : templateDesign.containPosition === "left"
                        ? "justify-start"
                        : "justify-end"
                    } flex w-full`}
                  >
                    <img
                      src={successImg}
                      alt="Success"
                      className="max-w-[130px] w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <h2
                    className="text-4xl font-bold mt-4"
                    style={getStyle(templateDesign, "successHeading")}
                  >
                    {templateDesign.successHeading}
                  </h2>
                  <span
                    className="text-xl font-bold mt-4"
                    style={getStyle(templateDesign, "successSubHeading")}
                  >
                    {templateDesign.successSubHeading}
                  </span>
                  <p
                    className="text-lg mt-4"
                    style={getStyle(templateDesign, "successDescription")}
                  >
                    {templateDesign.successDescription}
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center w-full p-4">
                  <div className="mb-4">
                    <span
                      className="inline-block font-semibold leading-normal"
                      style={getStyle(templateDesign, "templateHeading")}
                    >
                      {templateDesign.heading}
                    </span>
                  </div>

                  {/* Text is already centered within the div */}
                  <form
                    className="w-full flex flex-col items-center space-y-4"
                    onSubmit={handleSubmit}
                  >
                    {(templateDesign.reviewType === "review" ||
                      surveyController.survey_type === "review") && (
                      <>{renderStars(reviewCount)}</>
                    )}
                    {(templateDesign.reviewType === "rating" ||
                      surveyController.survey_type === "rating") && (
                      <>{renderNumbers(ratingCount, 5, "border-[#f1e7df]")}</>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
        {/* {suggestionTemplateStatus.isAttributionSurvey && (
          <div
            className="flex items-center justify-center bg-white"
            style={{ height: "calc(100vh - 250px)" }}
          >
            <div
              className={`flex flex-col items-center justify-start shadow-lg ${feedbackSurveyClasses()}`}
              style={{
                backgroundColor: templateDesign.templateBgColor || "#954de3",
                borderRadius: templateDesign.borderRadius || "16px",
                borderWidth: templateDesign.borderWidth,
                borderColor: templateDesign.templateBorderColor,
                borderStyle: templateDesign.formBorderStyle,
                minHeight: 200,
              }}
            >
              <button className="absolute top-4 right-4 text-white text-lg font-semibold">
                &times;
              </button>
              <div className="flex justify-end mb-2 w-full">
                <h4
                  className="leading-none font-bold"
                  style={getStyle(templateDesign, "templateEmail")}
                >
                  {templateDesign.templateEmailText}
                </h4>
              </div>
              <div className="w-1/2 m-auto ">
                <h2
                  className="block text-center  font-bold mb-2"
                  style={getStyle(templateDesign, "templateHeading")}
                >
                  {templateDesign.heading}
                </h2>

                <p
                  className="block text-center  mb-6"
                  style={getStyle(templateDesign, "templateSubHeading")}
                >
                  {templateDesign.subHeading ||
                    "Before you go we would like to hear your feedback"}
                </p>
                
              <h1 className="text-2xl text-white font-bold text-center mb-6">
                {surveyControllerEditState.fieldName}
              </h1>
                <div className="grid grid-cols-12 gap-4">
                  {addedButton.map((field, index) => (
                    <div className="col-span-4">
                      <SurveyButtonComponent
                        key={index}
                        templateDesign={templateDesign}
                        buttonLink={field.buttonLink}
                        buttonText={field.buttonText}
                        inputValue={
                          inputBtnSurveyValues[field.buttonText] || ""
                        }
                        onInputChange={handleBtnInputChange}
                        isSubmitted={isSubmitted}
                        onDelete={() =>
                          handleSurveyBtnDeleteField(field.buttonText, index)
                        }
                        onEdit={() => handleSurveyBtnEdit(field, index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )} */}

        {suggestionTemplateStatus.isUpSellPopup && (
          <ProductUpSellPopUp
            productData={productListForPopUp}
            noOfProducts={noOfProducts}
            templateDesign={templateDesign}
            templateData={templateData}
            getStyle={getStyle}
            success={success}
            successImg={successImg}
          />
        )}
        {suggestionTemplateStatus.isCrossSellPopup && (
          <ProductCrossSellPopUp
            productData={productListForPopUp}
            noOfProducts={noOfProducts}
            templateDesign={templateDesign}
            templateData={templateData}
            getStyle={getStyle}
            success={success}
            successImg={successImg}
          />
        )}
        {suggestionTemplateStatus.isAbandonmentPopup && (
          <CartAbandonmentPopUp
            productData={productListForPopUp}
            templateDesign={templateDesign}
            templateData={templateData}
            getStyle={getStyle}
            success={success}
            successImg={successImg}
          />
        )}
        {suggestionTemplateStatus.isExitProductRecommenderPopup && (
          <ExitProductRecommenderPopup
            productData={productListForPopUp}
            noOfProducts={noOfProducts}
            templateDesign={templateDesign}
            templateData={templateData}
            getStyle={getStyle}
            success={success}
            successImg={successImg}
          />
        )}
        {suggestionTemplateStatus.isSocialMediaConnectPopup && (
          <>
            <div
              className="w-full flex justify-center items-center bg-white"
              style={{ minHeight: "calc(100vh - 300px)" }}
            >
              <SocialMediaConnectPopUp
                templateDesign={templateDesign}
                getStyle={getStyle}
                socialMediaPopupimageSrc={socialMediaPopupimageSrc}
                formClasses={formClasses}
                {...socialMediaConnectProps}
              />
            </div>
          </>
        )}
        {suggestionTemplateStatus.isWorldWideWelcomePopup && (
          <>
            <div
              className="w-full flex justify-center items-center bg-white"
              style={{ minHeight: "calc(100vh - 300px)" }}
            >
              {/* <WorldWideWelcomePopUp
                worldWideWelcomeTitle="Join us and get 10% OFF"
                worldWideWelcomeReview="Excellent customer service and a great product! 5 stars!"
                worldWideWelcomeShippingText=""
                worldWideWelcomeBtnText="Get 10% OFF"
                worldWideWelcomeBtnLink={"#"}
                worldWideWelcomeReviewerName="Anne Roberts"
                worldWideWelcomeReviewerPosition="Christopher Cloos customer"
              /> */}
              <WorldWideWelcomePopUp {...worldWideWelcomeProps} />
            </div>
          </>
        )}
        {suggestionTemplateStatus.isSurveyPopup && (
          <SurveyPopUp {...surveyProps} />
        )}
        {suggestionTemplateStatus.isPreviewPopup && (
          <PreviewComponent {...otherProps} />
        )}
      </div>

      <div className="clear-both"></div>
      <style jsx="true">{`
        input::placeholder {
          color: var(--placeholder-color); /* Dynamic placeholder color */
        }
      `}</style>
    </>
  );
};

export default MasterForm;
