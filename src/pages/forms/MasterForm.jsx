import React, { useState, useEffect } from "react";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import Radio from "../../components/higherOrderComponent/Radios/Radio";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import popup_img from "../../../src/images/newsletter_left_img.png";
import { useNavigate, useParams } from "react-router-dom";
import successImg from "../../../src/images/success_fn.png";
import FormSubmitHandler from "../../components/FormSubmitHandler";
import ArrowMasterFormSvg from "../../images/svg-icons/ArrowMasterFormSvg";
import toast from 'react-hot-toast';
import Loader from "../../common/Loader";
import SwitcherThree from "../../components/Switchers/SwitcherThree";
import {
  templateFieldCss,
  inputColorFields,
  inputTextColorFields,
  templateBgField,
  fontFamilyList,
  borderStyles,
  visitorsDropdown,
  formTypeDropdown,
  widthDropdown,
  timingOptions,
  deviceOptions,
  tabs,
  templateEditorCollapseOptions,
  defaultBoxClassName,
} from "./masterFormConfig";

const MasterForm = () => {
	console.log(['test']);

	const [loading, setLoading] = useState(false);
	const templateFieldCss = {
		bgColor: 'rgb(255, 255, 255)',
		borderColor: 'rgb(209, 213, 219)',
		focusBorderColor: 'rgb(0, 123, 255)',
		placeholderTextColor: 'rgb(107 114 128)',
		formHeadingColor: 'rgb(0, 0, 0)',
		textColor: 'rgb(0, 0, 0)',
		letterSpacing: '1px',
		inputFontSize: '14px',
		templateBgColor: 'rgb(0, 0, 0)',
		templateOverlayColor: 'rgb(255, 255, 255)',
		fontWeight: 'normal',
		fontFamily: 'Arial',
		borderRadius: '',
		borderWidth: '2px',
		templateBorderColor: 'rgb(255, 255, 255)',
		templatePaddingTop: '4px',
		templatePaddingBottom: '4px',
		templatePaddingLeft: '4px',
		templatePaddingRight: '4px',
		formBorderStyle: "none",
		formType: "full page",
		formWidth: "large",
		templateMinHeight: "500px"
	};

	const [templateDesign, setTemplateDesign] = useState(templateFieldCss);
	const [templateContent, setTemplateContent] = useState(null);

	useEffect(() => {
		console.log(['check 1']);

		const getSubTemplate = async () => {
			setLoading(true);
			await FormSubmitHandler({
				method: "get",
				url: "sub/template/1",
			}).then(res => {
				const data = res.data;
				console.log(['data', data.body_html]);
				setTemplateContent(data.body_html);
				toast.success(res.message);
			}).catch(err => {
				toast.error(err.message);
			}).finally(() => {
				setLoading(false);
			});
		}
		getSubTemplate();
	}, []);

	const handleTemplateChange = (colorType) => (templateDesign) => {
		setTemplateDesign((prev) => ({ ...prev, [colorType]: templateDesign }));
	};

	const combinedPadding = `
    ${templateDesign.templatePaddingTop} 
    ${templateDesign.templatePaddingRight} 
    ${templateDesign.templatePaddingBottom} 
    ${templateDesign.templatePaddingLeft}
  `;

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
  const [activeTab, setActiveTab] = useState("Desktop");
  const [selectedTiming, setTiming] = useState("");
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

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		// if (tab === "Mobile") {
		//   setView("Mobile");
		// } else {
		//   setView("Desktop");
		// }
	};

  const onTimingChange = (value) => {
    setTiming(value);
  };

	const onPublish = async () => {
		const pid = id.split('s')[0];
		const sid = id.split('s')[1];
		const response = await FormSubmitHandler({
			method: "get",
			url: `suggestion/${sid}/publish`,
		});
		if (response.success) {
			navigate(`/suggestion/list/${pid}`);
		}
	};

  const [productList, setProductList] = useState([]);
  const [productListState, setProductListState] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionListState, setCollectionListState] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectedCollections, setSelectedCollections] = useState({});
  const [targetedProducts, setTargetedProducts] = useState([]);
  const [noOfProducts, setNoOfProducts] = useState(2);

  const onNoOfProductsSelect = (e) => {
    setNoOfProducts(e.target.value);
  };

  const getProductList = async () => {
    const response = await FormSubmitHandler({
      method: "get",
      url: `product/list`,
    });
    if (response.success) {
      setProductList(response.data);
      setProductListState(true);
    }
  };

  const getCollectionList = async () => {
    const response = await FormSubmitHandler({
      method: "get",
      url: `collection/list`,
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

  const handleProductCheckboxChange = (id) => {
    setSelectedProducts((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const handleTargetedProductCheckboxChange = (id) => {
    setTargetedProducts((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const handleCollectionCheckboxChange = (id) => {
    setSelectedCollections((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const ProductListComponent = ({
    productList,
    selectedProducts,
    handleProductCheckboxChange,
  }) => {
    return (
      <>
        {productList && productList.data && productList.data.length > 0 ? (
          productList.data.map((product) =>
            product.product_json.variants && product.product_json.variants.length > 0 ? (
              product.product_json.variants.map((item) => (
                <div
                  key={item.id}
                  className="product-item flex items-center space-x-2"
                >
                  <Checkbox
                    id={item.id}
                    label={
                      item.title !== "Default Title"
                        ? product.product_json.title + " - " + item.title
                        : product.product_json.title
                    }
                    checked={selectedProducts[item.id] || false}
                    onChange={() => handleProductCheckboxChange(item.id)}
                  />
                  <span className="text-gray-500">{item.price}</span>
                </div>
              ))
            ) : null // Skip products without variants
          )
        ) : (
          <span>No products found</span>
        )}
      </>
    );
  };
  

  const TargetedProductListComponent = ({
    productList,
    targetedProducts,
    handleTargetedProductCheckboxChange,
  }) => {
    return (
      <>
        {productList && productList.data && productList.data.length > 0 ? (
          productList.data.map(
            (product) =>
              // Check if the product has variants before mapping
              product.product_json.variants &&
              product.product_json.variants.length > 0
                ? product.product_json.variants.map((item, index) => (
                    <div
                      key={index}
                      className="product-item flex items-center space-x-2"
                    >
                      <Checkbox
                        id={index}
                        label={
                          item.title !== "Default Title"
                            ? product.product_json.title + " - " + item.title
                            : product.product_json.title
                        }
                        checked={targetedProducts[item.id] || false}
                        onChange={() =>
                          handleTargetedProductCheckboxChange(item.id)
                        }
                      />
                      <span className="text-gray-500">{item.price}</span>
                    </div>
                  ))
                : null // Skip products without variants
          )
        ) : (
          <span>No products found</span>
        )}
      </>
    );
  };

  const CollectionListComponent = ({
    collectionList,
    selectedCollections,
    handleCollectionCheckboxChange,
  }) => {
    const hasValidCollection =
      Array.isArray(collectionList?.data) &&
      collectionList.data.length > 0 &&
      collectionList.data.some(
        (collection) => collection.collection_json?.title
      );

    return (
      <>
        {hasValidCollection ? (
          collectionList.data.map((collection) =>
            collection.collection_json?.title ? (
              <div
                key={collection.id}
                className="collection-item flex items-center space-x-2"
              >
                <Checkbox
                  id={collection.id}
                  label={collection.collection_json.title}
                  checked={selectedCollections[collection.id] || false}
                  onChange={() => handleCollectionCheckboxChange(collection.id)}
                />
              </div>
            ) : null
          )
        ) : (
          <span>No Collection found</span>
        )}
      </>
    );
  };

  const [switchStates, setSwitchStates] = useState({
    openInNewTab: false,
    image: false,
    name: false,
    sku: false,
    price: false,
    variantSwatch: false,
    atcButton: false,
  });

  const handleToggle = (key) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  return (
    <>
      <aside className="w-1/4  fixed left-[4.7rem] p-4 shadow-lg h-screen overflow-auto top-20">
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
                <div className="p-4 border-t">
                  <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                    <div className="col-span-12 xl:col-span-12">
                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                        <div className="w-full flex flex-col gap-9">
                          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <form action="#">
                              <div className="p-3">
                                <div className="mb-6">
                                  <label className="mb-2.5 block">
                                    <div className="mb-6">
                                      <DropDown
                                        jsonData={{
                                          ...formTypeDropdown,
                                          onChange:
                                            handleTemplateChange("formType"),
                                          defaultValue: templateDesign.formType,
                                        }}
                                      />
                                    </div>
                                  </label>
                                </div>
                                <div className="mb-6">
                                  <label className="mb-2.5 block">
                                    <div className="mb-6">
                                      <DropDown
                                        jsonData={{
                                          ...widthDropdown,
                                          onChange:
                                            handleTemplateChange("formWidth"),
                                          defaultValue:
                                            templateDesign.formWidth,
                                        }}
                                      />
                                    </div>
                                  </label>
                                </div>
                                <div className="mt-3 flex justify-between flex-row ">
                                  <span>Minimum Height(px):</span>
                                  <input
                                    id="minimum-height"
                                    type="number"
                                    value={
                                      templateDesign.templateMinHeight.replace(
                                        "px",
                                        ""
                                      ) || ""
                                    }
                                    onChange={(e) =>
                                      handleTemplateChange("templateMinHeight")(
                                        e.target.value + "px"
                                      )
                                    }
                                    className={`${defaultBoxClassName} h-10`}
                                  />
                                </div>
                                <div className="mt-3 font font-semibold text-black">
                                  Show On
                                </div>
                                <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-md">
                                  {tabs.map((tab) => (
                                    <button
                                      key={tab.name}
                                      onClick={() => handleTabClick(tab.name)}
                                      className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                                        activeTab === tab.name
                                          ? "bg-white shadow-sm text-gray-900"
                                          : "text-gray-500 hover:text-gray-700"
                                      }`}
                                    >
                                      <span>{tab.name}</span>
                                    </button>
                                  ))}
                                </div>
                                <div className="mb-4.5 mt-3  border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Form Background
                                  </label>
                                  {templateBgField.map(
                                    ({ label, colorType }) => (
                                      <div
                                        className="mt-3 flex justify-between flex-row items-center"
                                        key={colorType}
                                      >
                                        <span>{label}:</span>
                                        <ColorPicker
                                          defaultColor={
                                            templateDesign[colorType]
                                          }
                                          onChange={handleTemplateChange(
                                            colorType
                                          )}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Form Styles
                                  </label>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Corner Radius(px):</span>
                                    <input
                                      id="border-radius"
                                      type="number"
                                      placeholder="px"
                                      value={
                                        templateDesign.borderRadius.replace(
                                          "px",
                                          ""
                                        ) || ""
                                      }
                                      onChange={(e) =>
                                        handleTemplateChange("borderRadius")(
                                          e.target.value + "px"
                                        )
                                      }
                                      className={`${defaultBoxClassName} h-10`}
                                    />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Border style:</span>
                                    <select
                                      onChange={(e) =>
                                        handleTemplateChange("formBorderStyle")(
                                          e.target.value
                                        )
                                      }
                                      value={templateDesign.formBorderStyle}
                                      className={`${defaultBoxClassName} h-12`}
                                    >
                                      {borderStyles.map((style) => (
                                        <option
                                          key={style.value}
                                          value={style.value}
                                        >
                                          {style.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  {templateDesign.formBorderStyle != "none" && (
                                    <>
                                      <div className="mt-3 flex justify-between flex-row ">
                                        <span>Border color:</span>
                                        <ColorPicker
                                          defaultColor={
                                            templateDesign.templateBorderColor
                                          }
                                          onChange={(color) =>
                                            handleTemplateChange(
                                              "templateBorderColor"
                                            )(color)
                                          }
                                        />
                                      </div>
                                      <div className="mt-3 flex justify-between flex-row ">
                                        <span>Border Thickness:</span>
                                        <input
                                          id="border-thickness"
                                          type="number"
                                          placeholder="px"
                                          className={`${defaultBoxClassName} h-10`}
                                          value={
                                            templateDesign.borderWidth.replace(
                                              "px",
                                              ""
                                            ) || ""
                                          }
                                          onChange={(e) =>
                                            handleTemplateChange("borderWidth")(
                                              e.target.value + "px"
                                            )
                                          }
                                        />
                                      </div>
                                    </>
                                  )}
                                  <div className="flex flex-col">
                                    <label className="mb-2">Padding(px):</label>
                                    <div className="flex gap-4 justify-end">
                                      <div className="flex flex-col">
                                        <label className="mb-1">Top</label>
                                        <div className="flex items-center">
                                          <input
                                            type="number"
                                            className={`${defaultBoxClassName} h-10`}
                                            placeholder="px"
                                            value={
                                              templateDesign.templatePaddingTop.replace(
                                                "px",
                                                ""
                                              ) || ""
                                            }
                                            onChange={(e) =>
                                              handleTemplateChange(
                                                "templatePaddingTop"
                                              )(e.target.value + "px")
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col">
                                        <label className="mb-1">Bottom</label>
                                        <div className="flex items-center">
                                          <input
                                            type="number"
                                            className={`${defaultBoxClassName} h-10`}
                                            placeholder="px"
                                            value={
                                              templateDesign.templatePaddingBottom.replace(
                                                "px",
                                                ""
                                              ) || ""
                                            }
                                            onChange={(e) =>
                                              handleTemplateChange(
                                                "templatePaddingBottom"
                                              )(e.target.value + "px")
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-4 mt-4 justify-end">
                                      <div className="flex flex-col">
                                        <label className="mb-1">Left</label>
                                        <div className="flex items-center">
                                          <input
                                            type="number"
                                            className={`${defaultBoxClassName} h-10`}
                                            placeholder="px"
                                            value={
                                              templateDesign.templatePaddingLeft.replace(
                                                "px",
                                                ""
                                              ) || ""
                                            }
                                            onChange={(e) =>
                                              handleTemplateChange(
                                                "templatePaddingLeft"
                                              )(e.target.value + "px")
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col">
                                        <label className="mb-1">Right</label>
                                        <div className="flex items-center">
                                          <input
                                            type="number"
                                            className={`${defaultBoxClassName} h-10`}
                                            placeholder="px"
                                            value={
                                              templateDesign.templatePaddingRight.replace(
                                                "px",
                                                ""
                                              ) || ""
                                            }
                                            onChange={(e) =>
                                              handleTemplateChange(
                                                "templatePaddingRight"
                                              )(e.target.value + "px")
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Input Field Text Styles
                                  </label>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Font:</span>
                                    <select
                                      onChange={(e) =>
                                        handleTemplateChange("fontFamily")(
                                          e.target.value
                                        )
                                      }
                                      value={templateDesign.fontFamily}
                                      className={`${defaultBoxClassName} h-12`}
                                    >
                                      {fontFamilyList.map((item) => (
                                        <option
                                          key={item.label}
                                          value={item.label}
                                        >
                                          {item.label}
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      id="border-thickness"
                                      type="number"
                                      className={`${defaultBoxClassName} h-10`}
                                      placeholder="px"
                                      value={
                                        templateDesign.inputFontSize.replace(
                                          "px",
                                          ""
                                        ) || ""
                                      }
                                      onChange={(e) =>
                                        handleTemplateChange("inputFontSize")(
                                          e.target.value + "px"
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Font weight:</span>
                                    <select
                                      onChange={(e) =>
                                        handleTemplateChange("fontWeight")(
                                          e.target.value
                                        )
                                      }
                                      value={templateDesign.fontWeight}
                                      className={`${defaultBoxClassName} h-12`}
                                    >
                                      <option value="700">Bold</option>
                                      <option value="400">Normal</option>
                                      <option value="800">Extra Bold</option>
                                    </select>
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Letter Spacing(px):</span>
                                    <input
                                      id="letter-spacing"
                                      type="number"
                                      className={`${defaultBoxClassName} h-10`}
                                      placeholder="px"
                                      value={
                                        templateDesign.letterSpacing.replace(
                                          "px",
                                          ""
                                        ) || ""
                                      }
                                      onChange={(e) =>
                                        handleTemplateChange("letterSpacing")(
                                          e.target.value + "px"
                                        )
                                      }
                                    />
                                  </div>
                                  {inputTextColorFields.map(
                                    ({ label, colorType }) => (
                                      <div
                                        className="mt-3 flex justify-between items-center"
                                        key={colorType}
                                      >
                                        <span>{label}:</span>
                                        <ColorPicker
                                          defaultColor={
                                            templateDesign[colorType]
                                          }
                                          onChange={handleTemplateChange(
                                            colorType
                                          )}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Input Field Styles
                                  </label>
                                  {inputColorFields.map(
                                    ({ label, colorType }) => (
                                      <div
                                        className="mt-3 flex justify-between items-center"
                                        key={colorType}
                                      >
                                        <span>{label}:</span>
                                        <ColorPicker
                                          defaultColor={
                                            templateDesign[colorType]
                                          }
                                          onChange={handleTemplateChange(
                                            colorType
                                          )}
                                        />
                                      </div>
                                    )
                                  )}
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
                                            ...prevState.settings.existing_page
                                              .is_selected,
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
                                                ?.after_delay_time.is_selected,
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
                                  {checkedRules?.settings?.after_scroll_distance
                                    .is_selected && (
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
                                      checkedRules?.settings?.after_pages_visit
                                        .is_selected
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
                                                ?.after_pages_visit.is_selected,
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
                            <h3 className="text-lg font-semibold">Frequency</h3>
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
                                onChange={() => setCheckedItems(!checkedItems)}
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
                            <h3 className="text-lg font-semibold">Location</h3>
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

              {activeIndex === index && item.tag === "bundle" && (
                <div className="p-4 border-t">
                  <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                    <div className="col-span-12 xl:col-span-12">
                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                        <div className="w-full flex flex-col gap-9">
                          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <form action="#">
                              <div className="p-3">
                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Bundle Details
                                  </label>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Title:</span>
                                    <input
                                      id="bundle-title"
                                      type="text"
                                      className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Description:</span>
                                    <textarea
                                      id="bundle-description"
                                      type="text"
                                      className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                  </div>
                                </div>

                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Select Product
                                  </label>
                                  {productListState && (
                                    <ProductListComponent
                                      productList={productList}
                                      selectedProducts={selectedProducts}
                                      handleProductCheckboxChange={
                                        handleProductCheckboxChange
                                      }
                                    />
                                  )}
                                </div>
                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Targeted Product
                                  </label>
                                  {productListState && (
                                    <TargetedProductListComponent
                                      productList={productList}
                                      targetedProducts={targetedProducts}
                                      handleTargetedProductCheckboxChange={
                                        handleTargetedProductCheckboxChange
                                      }
                                    />
                                  )}
                                </div>
                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Targeted Collection
                                  </label>
                                  {collectionListState && (
                                    <CollectionListComponent
                                      collectionList={collectionList}
                                      selectedCollections={selectedCollections}
                                      handleCollectionCheckboxChange={
                                        handleCollectionCheckboxChange
                                      }
                                    />
                                  )}
                                </div>
                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Bundle Settings
                                  </label>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>No Of Products:</span>
                                    <select
                                      onChange={(e) => onNoOfProductsSelect(e)}
                                      value={noOfProducts}
                                      className="w-32 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </div>
                                </div>
                                <SwitcherThree
                                  label="Open in new tab"
                                  enabled={switchStates.openInNewTab}
                                  onToggle={() => handleToggle("openInNewTab")}
                                />
                                <SwitcherThree
                                  label="Image"
                                  enabled={switchStates.image}
                                  onToggle={() => handleToggle("image")}
                                />
                                <SwitcherThree
                                  label="Name"
                                  enabled={switchStates.name}
                                  onToggle={() => handleToggle("name")}
                                />
                                <SwitcherThree
                                  label="Sku"
                                  enabled={switchStates.sku}
                                  onToggle={() => handleToggle("sku")}
                                />
                                <SwitcherThree
                                  label="Price"
                                  enabled={switchStates.price}
                                  onToggle={() => handleToggle("price")}
                                />
                                <SwitcherThree
                                  label="Variant Swatch"
                                  enabled={switchStates.variantSwatch}
                                  onToggle={() => handleToggle("variantSwatch")}
                                />
                                <SwitcherThree
                                  label="ATC Button"
                                  enabled={switchStates.atcButton}
                                  onToggle={() => handleToggle("atcButton")}
                                />
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

      <div className="w-3/4 float-right p-0 h-[83.90vh]">
        <div className="flex justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
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
            className={`${
              templateDesign.formWidth === "large" ||
              templateDesign.formType === "embed"
                ? "h-auto"
                : ""
            }
      ${templateDesign.formWidth === "small" ? "w-10/12 h-auto" : ""}
      ${
        templateDesign.formType === "full page" ||
        templateDesign.formWidth === "large"
          ? "max-w-full h-full transition-all duration-300"
          : "w-1/2"
      }
      ${
        isView === "Desktop"
          ? "grid grid-cols-12 items-center bg-white shadow-lg"
          : "max-h-[586px] overflow-y-auto w-[375px]"
      }
      ${
        isView === "Mobile" &&
        templateDesign.formType === "full page" &&
        templateDesign.formWidth === "small"
          ? "overflow-y-auto w-min"
          : ""
      }
      ${
        isView === "Mobile" &&
        templateDesign.formType === "embed" &&
        templateDesign.formWidth === "small"
          ? "overflow-y-auto w-min"
          : ""
      }`}
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
                src={popup_img}
                alt="Promo"
                className="h-full w-full object-cover"
              />
            </div>

            <div
              className={`${
                isView === "Desktop" ? "xl:col-span-7" : "sm:col-span-12"
              } p-8 flex flex-col justify-center h-full `}
              style={{ backgroundColor: templateDesign.templateOverlayColor }}
            >
              {success ? (
                <div className="flex flex-col justify-center text-center items-center">
                  <img
                    src={successImg}
                    alt="Success"
                    className="inline-block max-w-[130px]"
                  />
                  <p className="text-lg mt-10">
                    Thanks for sharing. Please check your email for confirmation
                    message.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl font-bold mb-4">
                    Limited Time
                    <br />
                    10% off
                  </h2>
                  <p className="text-lg mb-6">
                    Save on your first order and get email-only offers when you
                    join.
                  </p>
                  <form className="flex flex-col space-y-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="p-3 rounded-md focus:outline-none"
                      style={{
                        backgroundColor: templateDesign.bgColor,
                        borderColor: templateDesign.borderColor,
                        borderWidth: "1px",
                        "--placeholder-color":
                          templateDesign.placeholderTextColor,
                        color: templateDesign.textColor,
                        letterSpacing: templateDesign.letterSpacing,
                        fontSize: templateDesign.inputFontSize,
                        fontWeight: templateDesign.fontWeight,
                        fontFamily: templateDesign.fontFamily,
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor =
                          templateDesign.focusBorderColor)
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          templateDesign.borderColor)
                      }
                    />
                    <button className="bg-black text-white py-3 rounded-md text-lg">
                      Continue
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
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