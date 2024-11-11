/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "../FormSubmitHandler";
import {
  templateFieldCss,
  templateEditorCollapseOptions,
  surveyControllerDefaults,
  targetAndBehaviorDefaultState as targetAndBehaviorDefaultState,
} from "../../pages/forms/masterFormConfig";
import ProductBundleTab from "../Forms/ProductBundleTab";
import StyleComponent from "../../pages/forms/StyleComponent";
import InputControllerComponent from "../../pages/forms/InputControllerComponent";
import { Toaster } from "react-hot-toast";
import SurveyControllerComponent from "../../pages/forms/SurveyControllerComponent";
import SuccessControllerComponent from "../../pages/forms/SuccessControllerComponent";
import Loader from "../../common/Loader";
import { BackIcon } from "../custIcon/svgIcon";
import TargetingAndBehaviorControlComponent from "../../pages/forms/TargetingAndBehaviorControlComponent";
import TemplateHeader from "../Forms/TemplateHeader";
import EmailTemplateDefault from "./EmailTemplateDefault";
import EmailTemplateControllerComponent from "./EmailTemplateControllerComponent";

const EmailTemplateEditorComponent = () => {
  //  shiv code start
  const [loading, setLoading] = useState(false);
  const [customCssState, setCustomCssState] = useState("");
  const [customJsState, setCustomJsState] = useState("");
  const [templateDesign, setTemplateDesign] = useState(templateFieldCss);
  const [surveyController, setSurveyController] = useState(
    surveyControllerDefaults
  );
  const [success, setSuccess] = useState(false);

  const handleTemplateChange = (colorType) => (templateDesign) => {
    setTemplateDesign((prev) => ({ ...prev, [colorType]: templateDesign }));
  };
  const [templateHeaderState, setTemplateHeaderState] = useState({
    teaser: true,
    success: true,
    publish: true,
    desktop: true,
    mobile: true,
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
  // TARGETING AND BEHAVIOR START
  const [targetingAndBehavior, setTargetingAndBehavior] = useState(
    targetAndBehaviorDefaultState
  );
  const [navButtons, setNavButtons] = useState([
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
  ]);
  const [advanceSetting, setAdvanceSetting] = useState(false);

  const advanceSettingHandleChange = () => {
    setAdvanceSetting(!advanceSetting);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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

  const [productDiscountForDetails, setProductDiscountForDetails] =
    useState("");
  const [productDiscountTypeDetails, setProductDiscountTypeDetails] =
    useState("");
  const [productDiscountAmountDetails, setProductDiscountAmountDetails] =
    useState(0);
    const userName = "John Doe";
    const message = "Thank you for subscribing to our newsletter! We’re excited to have you with us.";
  return (
    <>
      {loading && <Loader />}
      <aside className="w-1/4  fixed left-[4.7rem] px-6 pt-6 pb-20 shadow-2xl h-full overflow-auto top-0 bg-white">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <p className="font-semibold text-lg">Template Editor</p>
        </div>
        <ul className="space-y-4">
          {templateEditorCollapseOptions.map((item, index) => (
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
                />
              )}
              {activeIndex === index && item.tag === "inputController" && (
                <>
                  <Toaster />
                  <InputControllerComponent
                    templateDesign={templateDesign}
                    onTemplateChange={handleTemplateChange}
                    setTemplateDesign={setTemplateDesign}
                  />
                </>
              )}
              {activeIndex === index && item.tag === "successController" && (
                <>
                  <Toaster />
                  <SuccessControllerComponent
                    templateDesign={templateDesign}
                    onTemplateChange={handleTemplateChange}
                    setTemplateDesign={setTemplateDesign}
                  />
                </>
              )}

              {activeIndex === index && item.tag === "target" && (
                <TargetingAndBehaviorControlComponent
                  targetingAndBehavior={targetingAndBehavior}
                  setTargetingAndBehavior={setTargetingAndBehavior}
                />
              )}

              {activeIndex === index &&
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
                    setProductDiscountForDetails={setProductDiscountForDetails}
                    productDiscountForDetails={productDiscountForDetails}
                    setProductDiscountTypeDetails={
                      setProductDiscountTypeDetails
                    }
                    productDiscountTypeDetails={productDiscountTypeDetails}
                    setProductDiscountAmountDetails={
                      setProductDiscountAmountDetails
                    }
                    productDiscountAmountDetails={productDiscountAmountDetails}
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

              {activeIndex === index && item.tag === "surveyController" && (
                <SurveyControllerComponent
                  templateDesign={templateDesign}
                  onTemplateChange={handleTemplateChange}
                  setSurveyController={setSurveyController}
                  surveyController={surveyController}
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
                                      value={customCssState}
                                      onChange={(e) =>
                                        setCustomCssState(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
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
                                      value={customJsState}
                                      onChange={(e) =>
                                        setCustomJsState(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
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
              {activeIndex === index && item.tag === "email_template" && (
                <EmailTemplateControllerComponent navButtons={navButtons} setNavButtons={setNavButtons} />
              )}
            </li>
          ))}
        
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
        />
              <EmailTemplateDefault navButtons={navButtons} />
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

export default EmailTemplateEditorComponent;
