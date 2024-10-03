/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import Radio from "../../components/higherOrderComponent/Radios/Radio";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import popup_img from "../../../src/images/newsletter_left_img.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import successImg from "../../../src/images/success_fn.png";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import {
  templateFieldCss,
  visitorsDropdown,
  timingOptions,
  deviceOptions,
  templateEditorCollapseOptions,
} from "./masterFormConfig";
import ProductBundleTab from "../../components/Forms/ProductBundleTab";
import ProductBundlePopUp from "../../components/Forms/ProductBundlePopUp";
import StyleComponent from "./StyleComponent";
import InputControllerComponent from "./InputControllerComponent";
import TemplateBannerComponent from "./TemplateBannerComponent";
import { Toaster } from "react-hot-toast";
import SurveyControllerComponent from "./SurveyControllerComponent";
import SurveyFormComponent from "./SurveyFormComponent";
import SuccessControllerComponent from "./SuccessControllerComponent";

import purchaseSatisfactionSurveyDefaultImage from "../../../src/images/templates/purchase-satisfaction-survey-default.jpg";
import Loader from "../../common/Loader";
import { BackIcon } from "../../components/custIcon/svgIcon";

const MasterForm = () => {
  //  shiv code start
  const [loading, setLoading] = useState(false);
  const [templateDesign, setTemplateDesign] = useState(templateFieldCss);
  console.log(["templateDesign", templateDesign]);

  const [templateData, setTemplateData] = useState({
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

  const handleTemplateChange = (colorType) => (templateDesign) => {
    setTemplateDesign((prev) => ({ ...prev, [colorType]: templateDesign }));
  };

  const combinedPadding = `
    ${templateDesign.templatePaddingTop} 
    ${templateDesign.templatePaddingRight} 
    ${templateDesign.templatePaddingBottom} 
    ${templateDesign.templatePaddingLeft}
  `;
  const combinedMargin = `
    ${templateDesign.templateMarginTop} 
    ${templateDesign.templateMarginRight} 
    ${templateDesign.templateMarginBottom} 
    ${templateDesign.templateMarginLeft}
  `;
  const [inputValues, setInputValues] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputSurveyValues, setInputSurveyValues] = useState({});
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

  // Modify the handleDeleteField function
  const handleDeleteField = (fieldName) => {
    setAddedFields((prevFields) =>
      prevFields.filter((field) => field.fieldName !== fieldName)
    );
  };

  // Modify the handleEdit function
  const handleEdit = (field, index) => {
    setInputControllerEditState({
      index,
      fieldType: field.fieldType,
      fieldValidation: field.fieldValidation,
      fieldName: field.fieldName,
      placeholderText: field.placeholderText,
    });
  };

  const handleSurveyDeleteField = (fieldName) => {
    setAddedQuestion((prevFields) =>
      prevFields.filter((field) => field.fieldName !== fieldName)
    );
  };

  const handleSurveyEdit = (field, index) => {
    setSurveyControllerEditState({
      index,
      fieldName: field.fieldName,
      options: field.options,
    });
  };

  const formClasses = () => {
    const { formWidth, formType } = templateDesign;
    let classes = "h-auto ";

    // Handle form width
    classes += formWidth === "small" ? "w-10/12 " : "w-full ";

    // Handle full page or large form width
    if (formType === "full page" || formWidth === "large") {
      classes += "h-full transition-all duration-300 ";
    }

    // Handle view types
    if (isView === "Desktop") {
      classes += "grid grid-cols-12 items-center shadow-lg  max-w-0";
    } else {
      classes += "max-h-[586px] overflow-y-auto ";
    }

    // Handle specific mobile conditions
    if (
      isView === "Mobile" &&
      formType === "full page" &&
      formWidth === "small"
    ) {
      classes += "overflow-y-auto w-min ";
    }

    if (isView === "Mobile" && formType === "embed" && formWidth === "small") {
      classes += "w-min ";
    }
    if (
      isView === "Mobile" &&
      formType === "full page" &&
      formWidth === "large"
    );
    {
      classes += "max-w-[375px] ";
    }

    return classes.trim();
  };
  const imageSrc = !success
    ? templateData.image || popup_img
    : templateData.successImage || popup_img;

  const getStyle = (design, type) => ({
    fontSize: design[`${type}FontSize`],
    fontFamily: design[`${type}FontFamily`],
    color: design[`${type}Color`],
  });

  const [advanceSetting, setAdvanceSetting] = useState(false);

  const advanceSettingHandleChange = () => {
    setAdvanceSetting(!advanceSetting);
  };

  //  shiv code end

  const [suggestionTemplateStatus, setSuggestionTemplateStatus] = useState({
    isProductBundle: false,
    isPurchaseSatisfactionSurvey: false,
    isFeedbackSurvey: false,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedItems, setCheckedItems] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [frequency, setFrequency] = useState(5);
  const [checkDesktop, setDesktop] = useState(false);
  const [checkMobile, setMobile] = useState(false);
  const [showUrl, setURL] = useState(false);
  const [notShowUrl, setNotShow] = useState(false);
  const [showLocation, setLocation] = useState(false);
  const [notShowLocation, setNotShowLocation] = useState(false);
  const [isView, setView] = useState("Desktop");
  const [selectedTiming, setTiming] = useState("");
  const [productList, setProductList] = useState([]);
  const [productListState, setProductListState] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionListState, setCollectionListState] = useState(false);
  const [productListForPopUp, setProductListForPopUp] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [checkedRules, setRules] = useState({
    type: "",
    settings: {
      existing_page: {
        is_selected: "",
      },
      after_delay_time: {
        is_selected: false,
        key: "seconds",
        value: "",
      },
      after_scroll_distance: {
        is_selected: false,
        key: "percentage",
        value: "",
      },
      after_pages_visit: {
        is_selected: false,
        key: "pages",
        value: "",
      },
    },
  });
  const [noOfProducts, setNoOfProducts] = useState(3);
  const location = useLocation();
  const { keywords, subTemplateId } = location.state || {}; // Safely access state

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
          if (responseKeywords?.includes("Product Bundle")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isProductBundle: true,
            });
          } else if (
            responseKeywords?.includes("Purchase Satisfaction Survey")
          ) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isPurchaseSatisfactionSurvey: true,
            });
          } else if (responseKeywords?.includes("Feedback Survey")) {
            setSuggestionTemplateStatus({
              ...suggestionTemplateStatus,
              isFeedbackSurvey: true,
            });
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

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const onTimingChange = (value) => {
    setTiming(value);
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
        json_response: {
          abc: "abc",
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
  ${templateDesign.formType === "full page" ? "h-full" : ""}
  ${
    isView === "Desktop"
      ? "xl:col-span-5"
      : "sm:col-span-12 bg-white shadow-lg flex flex-wrap"
  }
  ${templateDesign.imagePosition === "0" ? "-order-none" : "order-1"}
  ${
    templateDesign.formType === "embed" && templateDesign.formWidth === "large"
      ? "max-h-[518px] overflow-hidden"
      : "h-full"
  }
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

  const reviewCount = parseInt(templateDesign.reviewCount, 10) || 5;
  const ratingCount = parseInt(templateDesign.ratingCount, 10) || 5;

  return (
    <>
      {loading && <Loader />}
      <aside className="w-1/4  fixed left-[4.7rem] p-4 shadow-lg h-screen overflow-auto top-20">
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
              if (suggestionTemplateStatus?.isProductBundle) {
                return (
                  // item.tag !== "inputController" &&
                  item.tag !== "surveyController" &&
                  item.tag !== "successController"
                );
              }
              return item.tag !== "bundle";
            })
            .map((item, index) => (
              <li
                key={index}
                className={`border rounded-lg ${
                  activeIndex === index ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <h3
                  className="p-4 flex justify-between items-center cursor-pointer font-semibold text-lg"
                  onClick={() => toggleAccordion(index)}
                >
                  <span> {item.title} </span>
                  <span className="text-sm font-normal">{item.subtitle}</span>
                  <svg
                    className={`fill-primary ${
                      item.tag === "block" ? "hidden" : ""
                    } stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white w-6 h-6 transform ${
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
                  />
                )}
                {activeIndex === index && item.tag === "inputController" && (
                  <>
                    <Toaster />
                    <InputControllerComponent
                      setAddedFields={setAddedFields}
                      templateData={templateData}
                      setTemplateData={setTemplateData}
                      templateDesign={templateDesign}
                      onTemplateChange={handleTemplateChange}
                      inputControllerEditState={inputControllerEditState}
                      isProductBundle={
                        suggestionTemplateStatus?.isProductBundle
                      }
                    />
                  </>
                )}
                {activeIndex === index && item.tag === "successController" && (
                  <>
                    <Toaster />
                    <SuccessControllerComponent
                      setAddedFields={setAddedFields}
                      templateData={templateData}
                      setTemplateData={setTemplateData}
                      templateDesign={templateDesign}
                      onTemplateChange={handleTemplateChange}
                      inputControllerEditState={inputControllerEditState}
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
                  <div className="col-span-12 xl:col-span-12">
                    <div className="p-4 border-t">
                      <div className=" bg-white">
                        <div className="mb-4 border-b border-black border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg">
                          <div className="mb-8 p-3">
                            <div className="mb-4 border-b border-black pb-5">
                              <label className="mb-2.5 block text-lg font-semibold">
                                Timing
                              </label>
                              <Radio
                                jsonData={timingOptions}
                                onChange={onTimingChange}
                              />
                              {selectedTiming == "Based on rules" && (
                                <div className="mb-4 mt-3">
                                  <div className="text-sm font-semibold">
                                    Select the rules
                                  </div>
                                  <div className="mb-4.5 mt-3">
                                    <Checkbox
                                      key={1}
                                      label="When visitor is exiting the page"
                                      checked={
                                        checkedRules?.settings?.existing_page
                                          ?.is_selected
                                      }
                                      onChange={() =>
                                        setRules((prevState) => ({
                                          ...prevState,
                                          settings: {
                                            ...prevState.settings,
                                            existing_page: {
                                              ...prevState.settings
                                                .existing_page.is_selected,
                                              is_selected:
                                                !checkedRules?.settings
                                                  ?.existing_page?.is_selected,
                                            },
                                          },
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-4.5">
                                    <Checkbox
                                      key={2}
                                      label="After time delay"
                                      checked={
                                        checkedRules?.settings?.after_delay_time
                                          .is_selected
                                      }
                                      onChange={() =>
                                        setRules((prevState) => ({
                                          ...prevState,
                                          settings: {
                                            ...prevState.settings,
                                            after_delay_time: {
                                              ...prevState.settings
                                                .after_delay_time.is_selected,
                                              is_selected:
                                                !checkedRules?.settings
                                                  ?.after_delay_time
                                                  .is_selected,
                                              key: "seconds",
                                              value: "",
                                            },
                                          },
                                        }))
                                      }
                                    />
                                    {checkedRules?.settings?.after_delay_time
                                      .is_selected && (
                                      <div className="ml-9">
                                        <div>Show again after</div>
                                        <input
                                          type="number"
                                          value={
                                            checkedRules?.settings
                                              ?.after_delay_time?.value
                                              ? checkedRules?.settings
                                                  ?.after_delay_time?.value
                                              : 0
                                          }
                                          onChange={(event) =>
                                            setRules((prevState) => ({
                                              ...prevState,
                                              settings: {
                                                ...prevState.settings,
                                                after_delay_time: {
                                                  ...prevState.settings
                                                    .after_delay_time.value,
                                                  is_selected:
                                                    checkedRules?.settings
                                                      ?.after_delay_time
                                                      .is_selected,
                                                  key: "seconds",
                                                  value: event.target.value,
                                                },
                                              },
                                            }))
                                          }
                                          className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                                          placeholder="seconds"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <div className="mb-4.5">
                                    <Checkbox
                                      key={3}
                                      label="After visitor has scrolled a certain amount"
                                      checked={
                                        checkedRules?.settings
                                          ?.after_scroll_distance.is_selected
                                      }
                                      onChange={() =>
                                        setRules((prevState) => ({
                                          ...prevState,
                                          settings: {
                                            ...prevState.settings,
                                            after_scroll_distance: {
                                              ...prevState.settings
                                                .after_scroll_distance,
                                              is_selected:
                                                !checkedRules?.settings
                                                  ?.after_scroll_distance
                                                  .is_selected,
                                            },
                                          },
                                        }))
                                      }
                                    />
                                    {checkedRules?.settings
                                      ?.after_scroll_distance.is_selected && (
                                      <div className="ml-9">
                                        <div>Scroll distance</div>
                                        <input
                                          type="number"
                                          value={
                                            checkedRules?.settings
                                              ?.after_scroll_distance?.value
                                          }
                                          onChange={(event) =>
                                            setRules((prevState) => ({
                                              ...prevState,
                                              settings: {
                                                ...prevState.settings,
                                                after_scroll_distance: {
                                                  ...prevState.settings
                                                    .after_scroll_distance,
                                                  is_selected:
                                                    checkedRules?.settings
                                                      ?.after_scroll_distance
                                                      .is_selected,
                                                  key: "seconds",
                                                  value: event.target.value,
                                                },
                                              },
                                            }))
                                          }
                                          className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                                          placeholder="%"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <div className="mb-4.5">
                                    <Checkbox
                                      key={4}
                                      label="After visitor sees a certain number of pages"
                                      checked={
                                        checkedRules?.settings
                                          ?.after_pages_visit.is_selected
                                      }
                                      onChange={() =>
                                        setRules((prevState) => ({
                                          ...prevState,
                                          settings: {
                                            ...prevState.settings,
                                            after_pages_visit: {
                                              ...prevState.settings
                                                .after_pages_visit,
                                              is_selected:
                                                !checkedRules?.settings
                                                  ?.after_pages_visit
                                                  .is_selected,
                                            },
                                          },
                                        }))
                                      }
                                    />
                                    {checkedRules?.settings?.after_pages_visit
                                      .is_selected && (
                                      <div className="ml-9">
                                        <div>After</div>
                                        <input
                                          type="number"
                                          value={
                                            checkedRules?.settings
                                              ?.after_pages_visit?.value
                                          }
                                          onChange={(event) =>
                                            setRules((prevState) => ({
                                              ...prevState,
                                              settings: {
                                                ...prevState.settings,
                                                after_pages_visit: {
                                                  ...prevState.settings
                                                    .after_pages_visit,
                                                  is_selected:
                                                    checkedRules?.settings
                                                      ?.after_pages_visit
                                                      .is_selected,
                                                  key: "pages",
                                                  value: event.target.value,
                                                },
                                              },
                                            }))
                                          }
                                          className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                                          placeholder="pages"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="mb-4 border-b border-black">
                              <h3 className="text-lg font-semibold">
                                Frequency
                              </h3>
                              <div className="flex items-center mt-3">
                                <div className="text-black">
                                  After a visitor closes this form, show again
                                  after{" "}
                                </div>
                              </div>
                              <input
                                type="number"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                className="mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                                placeholder="5 days"
                              />
                              <span className="ml-2">days</span>
                              <div className="mb-4.5 mt-6">
                                <Checkbox
                                  key={"abc"}
                                  label="Don’t show again if form was submitted or if go to URL button was clicked"
                                  checked={checkedItems}
                                  onChange={() =>
                                    setCheckedItems(!checkedItems)
                                  }
                                />
                              </div>
                            </div>

                            <div className="mb-4 border-b border-black pb-5">
                              <label className="mb-2.5 block text-lg font-semibold">
                                Devices
                              </label>
                              <Radio
                                jsonData={deviceOptions}
                                onChange={() => {}}
                              />
                            </div>
                            <div className="mb-4 border-b border-black">
                              <div className="text-lg font-semibold">
                                Click outside form to close
                              </div>
                              <span className="text-sm font-medium">
                                Select all that apply.
                              </span>
                              <div className="mb-4.5 mt-6">
                                <Checkbox
                                  key={2}
                                  label="On desktop"
                                  checked={checkDesktop}
                                  onChange={() => setDesktop(!checkDesktop)}
                                />
                              </div>
                              <div className="mb-4.5">
                                <Checkbox
                                  key={3}
                                  label="On mobile"
                                  checked={checkMobile}
                                  onChange={() => setMobile(!checkMobile)}
                                />
                              </div>
                            </div>

                            <div className="mb-4 border-b border-black">
                              <label className="mb-2.5 block text-lg ">
                                <div className="mb-6">
                                  <DropDown jsonData={visitorsDropdown} />
                                </div>
                              </label>
                            </div>

                            <div className="mb-4 border-b border-black">
                              <h3 className="text-lg font-semibold">URLS</h3>
                              <div className="mb-4.5 mt-6">
                                <Checkbox
                                  key={2}
                                  label="Only show on certain URLs"
                                  checked={showUrl}
                                  onChange={() => setURL(!showUrl)}
                                />
                              </div>
                              <div className="mb-4.5">
                                <Checkbox
                                  key={3}
                                  label="Don’t show on certain URLs"
                                  checked={notShowUrl}
                                  onChange={() => setNotShow(!notShowUrl)}
                                />
                              </div>
                            </div>

                            <div className="mb-4 border-b border-black">
                              <h3 className="text-lg font-semibold">
                                Location
                              </h3>
                              <div className="flex items-center mt-3">
                                <div className="text-black font-medium">
                                  Based on visitors IP address
                                </div>
                              </div>
                              <div className="mb-4.5 mt-6">
                                <Checkbox
                                  key={2}
                                  label="Show to visitors in certain locations"
                                  checked={showLocation}
                                  onChange={() => setLocation(!showLocation)}
                                />
                              </div>
                              <div className="mb-4.5">
                                <Checkbox
                                  key={3}
                                  label="Don’t show to visitors in certain locations"
                                  checked={notShowLocation}
                                  onChange={() =>
                                    setNotShowLocation(!notShowLocation)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {suggestionTemplateStatus?.isProductBundle &&
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
                      setNoOfProducts={setNoOfProducts}
                      noOfProducts={noOfProducts}
                      productListForPopUp={productListForPopUp}
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
                    />
                  )}
                {activeIndex === index && item.tag === "custom_style" && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                      <div className="col-span-12 xl:col-span-12">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                          <div className="w-full flex flex-col gap-9">
                            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                              <form action="#">
                                <div className="p-3">
                                  <div className="mb-6">
                                    <label className="mb-2.5 font font-medium text-black dark:text-white block">
                                      Custom CSS
                                    </label>
                                    <div className="mb-6">
                                      <textarea
                                        className="w-full mt-2 w-25 border border-gray-300 rounded p-1 h-40"
                                        id="custom-css"
                                        name="custom-css"
                                      />
                                    </div>
                                  </div>
                                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Save
                                  </button>
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
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                      <div className="col-span-12 xl:col-span-12">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                          <div className="w-full flex flex-col gap-9">
                            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                              <form action="#">
                                <div className="p-3">
                                  <div className="mb-6">
                                    <label className="mb-2.5 font font-medium text-black dark:text-white block">
                                      Custom JS
                                    </label>
                                    <div className="mb-6">
                                      <textarea
                                        id="custom-js"
                                        name="custom-js"
                                        className="w-full mt-2 w-25 border border-gray-300 rounded p-1 h-40"
                                      />
                                    </div>
                                  </div>
                                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Save
                                  </button>
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
            className="bg-blue-500 w-full p-2 rounded-md"
          >
            {advanceSetting
              ? "Hide Advanced Settings"
              : "Show Advanced Settings"}
          </button>
        </ul>
      </aside>
      <div className="flex justify-end mb-4">
        <span
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md mr-4"
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

      {suggestionTemplateStatus.isProductBundle ? (
        <>
          <div className="w-3/4 float-right p-0 h-[83.90vh]">
            <div className="mb-4 flex justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
              <div className="w-[70%] flex justify-center">
                <div
                  className={`border border-[#323359] ${
                    !success ? "bg-[#d0d5d9]" : "bg-white"
                  }  inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
                  onClick={() => setSuccess(false)}
                >
                  Teaser
                </div>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  onClick={() => onPublish()}
                  className="inline-block p-2 px-3 mr-5 text-white text-sm font-semibold rounded relative bg-black"
                >
                  Publish
                </button>
              </div>
            </div>
            <ProductBundlePopUp
              productData={productListForPopUp}
              noOfProducts={noOfProducts}
              templateDesign={templateDesign}
              templateData={templateData}
              getStyle={getStyle}
            />
          </div>
        </>
      ) : suggestionTemplateStatus.isPurchaseSatisfactionSurvey ? (
        <>
          <div className="w-3/4 float-right p-0 h-[83.90vh]">
            <div className="flex mb-4 justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
              <div className="w-[70%] flex justify-center">
                <div
                  className={`border border-[#323359] ${
                    !success ? "bg-[#d0d5d9]" : "bg-white"
                  }  inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
                  onClick={() => setSuccess(false)}
                >
                  Teaser
                </div>
                <div
                  className={`border border-[#323359] ${
                    success ? "bg-[#d0d5d9]" : "bg-white"
                  } inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
                  onClick={() => setSuccess(true)}
                >
                  Success
                </div>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  onClick={() => onPublish()}
                  className="inline-block p-2 px-3 mr-5 text-white text-sm font-semibold rounded relative bg-black"
                >
                  Publish
                </button>
                <a
                  className={`rounded-l-md  ${
                    isView === "Desktop" ? "bg-[#d0d5d9]" : ""
                  }  p-1.5 px-2.5 text-base border border-[#ccc] -ml-px text-black leading-[22px]`}
                  href="#"
                  onClick={() => setView("Desktop")}
                >
                  <i className="fa fa-desktop" aria-hidden="true"></i>
                </a>
                <a
                  className={`rounded-r-md text-lg border border-[#ccc] -ml-px text-black leading-[22px]  ${
                    isView === "Mobile" ? "bg-[#eaedef]" : ""
                  } p-1.5 px-2.5`}
                  href="#"
                  onClick={() => setView("Mobile")}
                >
                  <i className="fa fa-mobile" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <div
              className={`h-full flex items-center justify-center border-8 border-indigo-600 ${
                isView !== "Desktop"
                  ? "min-h-[785px] bg-no-repeat bg-top bg-center"
                  : "gap-8 overflow-auto"
              }`}
            >
              <div className={formClasses()}>
                <div
                  className={`p-8 flex flex-col justify-center xl:col-span-6`}
                >
                  <h1
                    className="text-8xl font-bold mb-4 relative"
                    style={{ width: "150%" }}
                  >
                    {templateData.heading || "HI, THANKS FOR STOPPING BY!"}
                  </h1>
                  <p
                    className="text-lg mb-6"
                    style={getStyle(templateDesign, "templateSubheading")}
                  >
                    {templateData.subHeading ||
                      "How would you rate your overall experience with us?"}
                  </p>
                  <hr class="w-48 h-1 my-4 bg-[#d0d5d9] border-0 rounded md:my-10 dark:bg-gray-700"></hr>
                  <form
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit}
                  >
                    {/* Display Stars Here */}
                    {templateDesign.formBorderStyle === "review" && (
                      <>{renderStars(reviewCount)}</>
                    )}
                    {templateDesign.formBorderStyle === "rating" && (
                      <>{renderNumbers(ratingCount)}</>
                    )}
                  </form>
                </div>
                <div
                  className={`p-8 flex flex-col justify-center xl:col-span-6`}
                >
                  <img
                    src={purchaseSatisfactionSurveyDefaultImage}
                    alt="Promo"
                    className="h-full w-full object-fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : suggestionTemplateStatus.isFeedbackSurvey ? (
        <>
          <div className="w-3/4 float-right p-0 h-[83.90vh]">
            <div className="mb-4 flex justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
              <div className="w-[70%] flex justify-center">
                <div
                  className={`border border-[#323359] ${
                    !success ? "bg-[#d0d5d9]" : "bg-white"
                  }  inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
                  onClick={() => setSuccess(false)}
                >
                  Teaser
                </div>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  onClick={() => onPublish()}
                  className="inline-block p-2 px-3 mr-5 text-white text-sm font-semibold rounded relative bg-black"
                >
                  Publish
                </button>
              </div>
            </div>
            <div className="h-full items-center justify-center flex">
              <div className="relative rounded-lg w-full shadow-[7px_-7px_57px_#ccc] flex items-center bg-white">
                <div className="w-[16%] bg-[#fcf1e9] flex justify-center py-[30px] rounded-l-none rounded-r-[90px]">
                  <img
                    src={purchaseSatisfactionSurveyDefaultImage}
                    alt="Round Image"
                    className="w-[55%] object-cover"
                  />
                </div>

                <div className="w-[70%] pl-6 z-10">
                  <div className="mb-4 text-center">
                    <span className="text-lg font-semibold">
                      How satisfied were you with your purchase?
                    </span>
                  </div>

                  <div className="flex flex-col items-center space-y-4">
                    {/* Text is already centered within the div */}
                    <form
                      className="w-full flex flex-col items-center space-y-4"
                      onSubmit={handleSubmit}
                    >
                      {/* Display Stars or Numbers here */}
                      {templateDesign.formBorderStyle === "review" && (
                        <>{renderStars(reviewCount)}</>
                      )}
                      {templateDesign.formBorderStyle === "rating" && (
                        <>{renderNumbers(ratingCount, 5, "border-[#f1e7df]")}</>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-3/4 float-right p-0 h-[83.90vh]">
            <div className="flex mb-4 justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
              <div className="w-[70%] flex justify-center">
                <div
                  className={`border border-[#323359] ${
                    !success ? "bg-[#d0d5d9]" : "bg-white"
                  }  inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
                  onClick={() => setSuccess(false)}
                >
                  Teaser
                </div>
                <div
                  className={`border border-[#323359] ${
                    success ? "bg-[#d0d5d9]" : "bg-white"
                  } inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
                  onClick={() => setSuccess(true)}
                >
                  Success
                </div>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  onClick={() => onPublish()}
                  className="inline-block p-2 px-3 mr-5 text-white text-sm font-semibold rounded relative bg-black"
                >
                  Publish
                </button>
                <a
                  className={`rounded-l-md  ${
                    isView === "Desktop" ? "bg-[#d0d5d9]" : ""
                  }  p-1.5 px-2.5 text-base border border-[#ccc] -ml-px text-black leading-[22px]`}
                  href="#"
                  onClick={() => setView("Desktop")}
                >
                  <i className="fa fa-desktop" aria-hidden="true"></i>
                </a>
                <a
                  className={`rounded-r-md text-lg border border-[#ccc] -ml-px text-black leading-[22px]  ${
                    isView === "Mobile" ? "bg-[#eaedef]" : ""
                  } p-1.5 px-2.5`}
                  href="#"
                  onClick={() => setView("Mobile")}
                >
                  <i className="fa fa-mobile" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <div
              className={`h-full flex items-center justify-center ${
                isView !== "Desktop"
                  ? "min-h-[785px] bg-no-repeat bg-top bg-center"
                  : "gap-8 overflow-auto"
              }`}
              style={{
                backgroundColor: templateDesign.templateBgColor,
                margin: combinedMargin,
                backgroundImage:
                  isView !== "Desktop"
                    ? "url('https://apps.qeapps.com/ecom_apps_n/production/qqqe-frontend/src/images/mobile_bg.png')"
                    : "",
              }}
            >
              <div
                className={formClasses()}
                style={{
                  borderRadius: templateDesign.borderRadius,
                  borderWidth: templateDesign.borderWidth,
                  borderColor: templateDesign.templateBorderColor,
                  padding: combinedPadding,
                  borderStyle: templateDesign.formBorderStyle,
                  minHeight: templateDesign.templateMinHeight,
                }}
              >
                <div className={containerClass}>
                  <img
                    src={imageSrc}
                    alt="Promo"
                    className="h-full w-full object-fill"
                  />
                </div>

                <div
                  className={`p-8 flex flex-col justify-center ${
                    isView === "Desktop" ? "xl:col-span-7" : "sm:col-span-12"
                  } ${
                    templateDesign.formType === "embed" &&
                    templateDesign.formWidth === "large"
                      ? "min-h-[518px]"
                      : "h-full"
                  }`}
                  style={{
                    backgroundColor: templateDesign.templateOverlayColor,
                  }}
                >
                  {success ? (
                    <div
                      className={`${
                        templateDesign.containPosition === "center"
                          ? "text-center"
                          : templateDesign.containPosition === "right"
                          ? "text-left"
                          : "text-right"
                      } flex flex-col justify-center`}
                    >
                      <div
                        className={`${
                          templateDesign.containPosition === "center"
                            ? "justify-center"
                            : templateDesign.containPosition === "left"
                            ? "justify-end"
                            : "justify-right"
                        } flex w-full`}
                      >
                        <img
                          src={successImg}
                          alt="Success"
                          className="max-w-[130px] w-27 h-27 rounded-full object-cover"
                        />
                      </div>
                      <h2
                        className="text-4xl font-bold mt-4"
                        style={getStyle(templateDesign, "successHeading")}
                      >
                        {templateData.successHeading ||
                          "Thanks for sharing. Please check your email for confirmation message"}
                      </h2>
                      <span
                        className="text-xl font-bold mt-4"
                        style={getStyle(templateDesign, "successSubHeading")}
                      >
                        {templateData.successSubHeading ||
                          "Thanks for sharing. Please check your email for confirmation message"}
                      </span>
                      <p
                        className="text-lg mt-4"
                        style={getStyle(templateDesign, "successDescription")}
                      >
                        {templateData.successDescription ||
                          "Thanks for sharing. Please check your email for confirmation message"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2
                        className="text-4xl font-bold mb-4"
                        style={getStyle(templateDesign, "templateHeading")}
                      >
                        {templateData.heading || "Default Heading"}
                      </h2>
                      <h2
                        className="text-4xl font-bold mb-4"
                        style={getStyle(templateDesign, "templateOffer")}
                      >
                        {templateData.offerAmount || "10% Off"}
                      </h2>
                      <p
                        className="text-lg mb-6"
                        style={getStyle(templateDesign, "templateSubheading")}
                      >
                        {templateData.subHeading ||
                          "Save on your first order and get email-only offers when you join."}
                      </p>
                      <form
                        className="flex flex-col space-y-4"
                        onSubmit={handleSubmit}
                      >
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
                        {addedQuestion.map((field, index) => (
                          <SurveyFormComponent
                            key={index}
                            templateDesign={templateDesign}
                            options={field.options}
                            fieldName={field.fieldName}
                            inputValue={
                              inputSurveyValues[field.fieldName] || ""
                            }
                            onInputChange={handleSurveyInputChange}
                            isSubmitted={isSubmitted}
                            onDelete={() =>
                              handleSurveyDeleteField(field.fieldName)
                            }
                            onEdit={() => handleSurveyEdit(field, index)}
                          />
                        ))}
                        <button
                          type="submit"
                          className="bg-black text-white py-3 rounded-md text-lg mt-3"
                          style={{
                            backgroundColor:
                              templateDesign.templateButtonBgColor,
                          }}
                        >
                          {templateData.button || "Continue"}
                        </button>

                        {/* Display Stars Here */}
                        {templateDesign.formBorderStyle === "review" && (
                          <>{renderStars(reviewCount)}</>
                        )}
                        {templateDesign.formBorderStyle === "rating" && (
                          <>{renderNumbers(ratingCount)}</>
                        )}
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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
