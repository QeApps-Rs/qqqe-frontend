import React, { useState, useEffect } from "react";
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

const MasterForm = () => {
  //  shiv code start

  const [templateDesign, setTemplateDesign] = useState(templateFieldCss);
  const [templateHeading, setTemplateHeading] = useState("");
  const [templateOfferAmount, setTemplateOfferAmount] = useState("");
  const [templateSubHeading, setTemplateSubHeading] = useState("");
  const [templateImage, setTemplateImage] = useState("");
  const [inputControllerEditState, setInputControllerEditState] = useState({
    index: null,
    fieldType: "",
    fieldValidation: "",
    fieldName: "",
    placeholderText: "",
  });
  const [addedFields, setAddedFields] = useState([]);

  const handleTemplateChange = (colorType) => (templateDesign) => {
    setTemplateDesign((prev) => ({ ...prev, [colorType]: templateDesign }));
  };

  const combinedPadding = `
    ${templateDesign.templatePaddingTop} 
    ${templateDesign.templatePaddingRight} 
    ${templateDesign.templatePaddingBottom} 
    ${templateDesign.templatePaddingLeft}
  `;

  const [inputValues, setInputValues] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setInputValues((prev) => ({ ...prev, [fieldName]: value }));
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
    } else {
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

  const formClasses = () => {
    const { formWidth, formType } = templateDesign;
    let classes = "h-auto ";

    if (formWidth === "small") {
      classes += "w-10/12 ";
    }

    if (formType === "full page" || formWidth === "large") {
      classes += "max-w-full h-full transition-all duration-300 ";
    } else {
      classes += "w-1/2 ";
    }

    if (isView === "Desktop") {
      classes += "grid grid-cols-12 items-center bg-white shadow-lg ";
    } else {
      classes += "max-h-[586px] overflow-y-auto w-[375px] ";
    }

    if (
      isView === "Mobile" &&
      formType === "full page" &&
      formWidth === "small"
    ) {
      classes += "overflow-y-auto w-min ";
    }

    if (isView === "Mobile" && formType === "embed" && formWidth === "small") {
      classes += "overflow-y-auto w-min ";
    }

    return classes.trim();
  };

  //  shiv code end

  const [isProductBundle, setProductBundle] = useState(false);
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
  const [success, setSuccess] = useState(false);
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
        const response = await FormSubmitHandler({
          method: "get",
          url: `sub/template/${subTemplateId}`,
        });

        if (response.success) {
          const responseKeywords = response?.data?.keywords.split(",");
          if (responseKeywords?.includes("Product Bundle")) {
            setProductBundle(true);
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
    const pid = id.split("s")[0];
    const sid = id.split("s")[1];
    const response = await FormSubmitHandler({
      method: "get",
      url: `suggestion/${sid}/publish`,
    });
    if (response.success) {
      navigate(`/suggestion/list/${pid}`);
    }
  };

  const getProductList = async () => {
    const response = await FormSubmitHandler({
      method: "get",
      url: `product/get`,
    });
    if (response.success) {
      setProductList(response.data);
      setProductListState(true);
    }
  };

  const getCollectionList = async () => {
    const response = await FormSubmitHandler({
      method: "get",
      url: `collection/get`,
    });
    if (response.success) {
      setCollectionList(response.data);
      setCollectionListState(true);
    }
  };

  useEffect(() => {
    getProductList();
    getCollectionList();
  }, []);

  return (
    <>
      <aside className="w-1/4  fixed left-[4.7rem] p-4 shadow-lg h-screen overflow-auto top-20">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <p className="font-semibold text-lg">Template Editor</p>
        </div>
        <ul className="space-y-4">
          {templateEditorCollapseOptions
            .filter((item) => (isProductBundle ? true : item.tag !== "bundle"))
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
                {activeIndex === index && item.tag === "inputController" && (
                  <>
                    <Toaster />
                    <InputControllerComponent
                      setAddedFields={setAddedFields}
                      templateHeading={templateHeading}
                      setTemplateHeading={setTemplateHeading}
                      templateOfferAmount={templateOfferAmount}
                      setTemplateOfferAmount={setTemplateOfferAmount}
                      templateSubHeading={templateSubHeading}
                      setTemplateSubHeading={setTemplateSubHeading}
                      templateImage={templateImage}
                      setTemplateImage={setTemplateImage}
                      templateDesign={templateDesign}
                      onTemplateChange={handleTemplateChange}
                      inputControllerEditState={inputControllerEditState}
                    />
                  </>
                )}
                {activeIndex === index && item.tag === "style" && (
                  <StyleComponent
                    templateDesign={templateDesign}
                    onTemplateChange={handleTemplateChange}
                  />
                )}
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

                {isProductBundle &&
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
                                        className="w-full mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                                        id="custom-css"
                                        name="custom-css"
                                        placeholder="Enter your code"
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
                                        className="w-full mt-2 w-25 border border-gray-300 rounded p-1 text-center"
                                        placeholder="Enter your code"
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
        </ul>
      </aside>

      {isProductBundle ? (
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
            />
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
                  : "gap-8"
              }`}
            
              style={{
                backgroundColor: templateDesign.templateBgColor,
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
                <div
                  className={`${
                    templateDesign.formType === "full page" ? "h-full" : ""
                  } ${
                    isView === "Desktop"
                      ? "xl:col-span-5"
                      : "sm:col-span-12 bg-white shadow-lg flex flex-wrap"
                  }`}
                >
                  <img
                    src={templateImage ? templateImage : popup_img}
                    alt="Promo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div
                  className={`${
                    isView === "Desktop" ? "xl:col-span-7" : "sm:col-span-12"
                  } p-8 flex flex-col justify-center h-full `}
                  style={{
                    backgroundColor: templateDesign.templateOverlayColor,
                  }}
                >
                  {success ? (
                    <div className="flex flex-col justify-center text-center items-center">
                      <img
                        src={successImg}
                        alt="Success"
                        className="inline-block max-w-[130px]"
                      />
                      <p className="text-lg mt-10">
                        Thanks for sharing. Please check your email for
                        confirmation message.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2
                        className="text-4xl font-bold mb-4"
                        style={{
                          fontSize: templateDesign.templateHeadingFontSize,
                        }}
                      >
                        {templateHeading ? templateHeading : "Default Heading"}
                      </h2>
                      <h2
                        className="text-4xl font-bold mb-4"
                        style={{
                          fontSize: templateDesign.templateOfferFontSize,
                        }}
                      >
                        {" "}
                        {templateOfferAmount ? templateOfferAmount : "10% Off"}
                      </h2>
                      <p
                        className="text-lg mb-6"
                        style={{
                          fontSize: templateDesign.templateSubheadingFontSize,
                        }}
                      >
                        {templateSubHeading
                          ? templateSubHeading
                          : "Save on your first order and get email-only offers when you join."}
                      </p>
                      <form
                        className="flex flex-col space-y-4"
                        onSubmit={handleSubmit}
                      >
                        {addedFields.map((field, index) => (
                          <TemplateBannerComponent
                            key={index}
                            templateDesign={templateDesign}
                            fieldType={field.fieldType}
                            fieldValidation={field.fieldValidation}
                            placeholderText={field.placeholderText}
                            fieldName={field.fieldName}
                            inputValue={inputValues[field.fieldName] || ""}
                            onInputChange={handleInputChange}
                            isSubmitted={isSubmitted}
                            onDelete={() => handleDeleteField(field.fieldName)}
                            onEdit={() => handleEdit(field, index)}
                          />
                        ))}
                        <button
                          type="submit"
                          className="bg-black text-white py-3 rounded-md text-lg mt-3"
                        >
                          Continue
                        </button>
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
