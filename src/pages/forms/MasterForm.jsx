import React, { useEffect, useState } from "react";
import DatePicker from "../../components/higherOrderComponent/input/DatePicker";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import Radio from "../../components/higherOrderComponent/Radios/Radio";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";
import popup_img from "../../../src/images/newsletter_left_img.png";
import { useNavigate, useParams } from "react-router-dom";
import sucessImg from "../../../src/images/success_fn.png";
import FormSubmitHandler from "../../components/FormSubmitHandler";

const MasterForm = () => {
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
  const [notShowlocation, setNotShowLocation] = useState(false);
  const [borderStyle, setBorderStyle] = useState("none");
  const [padding, setPadding] = useState({
    top: null,
    bottom: null,
    left: null,
    right: null,
  });
  const [sucess, setSucess] = useState(false);
  const [selectFont, setSelectedFont] = useState("");
  const [fontWight, setFontWeight] = useState("");
  const [isView, setView] = useState("Desktop");
  const [activeTab, setActiveTab] = useState("Desktop");
  const [selectedTiming, setTiming] = useState("");
  const [checkedrules, setRules] = useState({
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
  const radioOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const dropdownData = {
    label: "Select a Subject",
    placeholder: "Select your subject",
    options: [
      { value: "MATHS", label: "MATHS" },
      { value: "CHEMISTRY", label: "CHEMISTRY" },
      { value: "PHYSICS", label: "PHYSICS" },
    ],
  };

  const visitorsDropdown = {
    label: "Visitors",
    placeholder: "Select your visitior",
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

  const formTypeDropdown = {
    label: "Form Type",
    placeholder: "Select form type",
    options: [
      { value: "popup", label: "Popup" },
      { value: "full page", label: "Full page" },
      { value: "flyout", label: "Flyout" },
      { value: "embed", label: "Embed" },
      { value: "banner", label: "Banner" },
    ],
  };

  const widthDropdown = {
    label: "Form width",
    placeholder: "Select form width",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
  };

  const timingOptions = [
    { value: "Immediately", label: "Immediately" },
    { value: "Based on rules", label: "Based on rules" },
    { value: "Only on a custom trigger", label: "Only on a custom trigger" },
  ];

  const deviceOptions = [
    { value: "Both desktop and mobile", label: "Both desktop and mobile" },
    { value: "Desktop only", label: "Desktop only" },
    { value: "Mobile only", label: "Mobile only" },
  ];

  const onborderStyleSelect = (e) => {
    setBorderStyle(e.target.value);
  };

  const handleChange = (e, side) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : 0;
    setPadding((prevPadding) => ({
      ...prevPadding,
      [side]: value,
    }));
  };

  const onFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const onFontWeightChange = (e) => {
    setFontWeight(e.target.value);
  };

  const tabs = [
    { name: "All Devices", icon: "fa-solid fa-desktop" },
    { name: "Desktop", icon: "fa-solid fa-desktop" },
    { name: "Mobile", icon: "fa-solid fa-mobile-alt" },
  ];

  const onTimingChange = (value) => {
    console.log(value, "hlojoloj");
    setTiming(value);
  };
  const [isPublish, setIsPublish] = useState(false);
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

  return (
    <>
      <aside className="w-1/4 bg-white fixed left-[4.7rem] p-4 shadow-lg h-screen overflow-auto top-20">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <p className="font-semibold text-lg">Template Editor</p>
          {/* <span className="text-sm text-gray-500">Created by</span> */}
        </div>

        <ul className="space-y-4">
          {[
            {
              title: "Style",
              // subtitle: "Popup | Image left",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1. To activate your builder kindly go to the List of Builders page and enable the builder by sliding the toggle switch to enable/disable the builder.",
              tag: "style",
            },
            {
              title: "Targeting & behavior",
              // subtitle: "Show immediately | All devices",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
              tag: "target",
            },
            {
              title: "Add blocks",
              subtitle: "Coming Soon",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
              tag: "block",
            },
          ].map((item, index) => (
            <li
              key={index}
              className={`border rounded-lg ${activeIndex === index ? "border-blue-500" : "border-gray-300"
                }`}
            >
              <h3
                className="p-4 flex justify-between items-center cursor-pointer font-semibold text-lg"
                onClick={() => toggleAccordion(index)}
              >
                <span>
                  {/* <i
                    className="fa fa-pencil-square-o mr-2"
                    aria-hidden="true"
                  ></i>{" "} */}
                  {item.title}
                </span>
                <span className="text-sm font-normal">{item.subtitle}</span>
                <svg
                  className={`fill-primary ${item.tag === "block" ? "hidden" : ""
                    } stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white w-6 h-6 transform ${activeIndex === index ? "rotate-180" : "rotate-0"
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
                            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                      Input Components
                                    </h3>
                                  </div> */}
                            <form action="#">
                              <div className="p-3">
                                {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                      <label className="mb-2.5 block text-black dark:text-white">
                                        First name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                      <label className="mb-2.5 block text-black dark:text-white">
                                        Last name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      />
                                    </div>
                                  </div>

                                  <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                      Email{" "}
                                      <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                      type="email"
                                      placeholder="Enter your email address"
                                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                  </div>
                                  <div className="mb-6">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                      Number
                                    </label>
                                    <input
                                      type="number"
                                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                  </div> */}
                                <div className="mb-6">
                                  <label className="mb-2.5 block">
                                    <div className="mb-6">
                                      <DropDown jsonData={formTypeDropdown} />
                                    </div>
                                  </label>
                                </div>
                                <div className="mb-6">
                                  <label className="mb-2.5 block">
                                    <div className="mb-6">
                                      <DropDown jsonData={widthDropdown} />
                                    </div>
                                  </label>
                                </div>
                                <div className="mt-3 flex justify-between flex-row ">
                                  <span>Minimum Height(px):</span>
                                  <input
                                    id="minumum-height"
                                    type="number"
                                    className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                  />
                                </div>
                                <div className="mt-3 fonr font-semibold text-black">
                                  Show On
                                </div>
                                <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-md">
                                  {tabs.map((tab) => (
                                    <button
                                      key={tab.name}
                                      onClick={() => setActiveTab(tab.name)}
                                      className={`flex items-center space-x-1 px-4 py-2 rounded-md ${activeTab === tab.name
                                          ? "bg-white shadow-sm text-gray-900"
                                          : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                      {/* <i className={`${tab.icon} text-sm`}></i> */}
                                      <span>{tab.name}</span>
                                    </button>
                                  ))}
                                </div>
                                {/* <div className="mb-6">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                          Color Picker
                                        </label>
                                        <ColorPicker />
                                      </div>
                                      <div className="mb-6">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                          Radio
                                        </label>
                                        <Radio jsonData={radioOptions} />
                                      </div>
                                      <div className="mb-6">
                                        <DropDown jsonData={dropdownData} />
                                      </div>

                                      <div className="mb-6">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                          Message
                                        </label>
                                        <textarea
                                          rows={6}
                                          placeholder="Type your message"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        ></textarea>
                                      </div>

                                      <DatePicker />

                                      <div className="mb-4.5">
                                        <Checkbox
                                          key={"abc"}
                                          label={"Checkbox"}
                                          checked={checkedItems}
                                          onChange={() =>
                                            setCheckedItems(!checkedItems)
                                          }
                                        />
                                      </div>

                                      <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                          File Upload
                                        </label>
                                        <input
                                          type="file"
                                          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                        />
                                      </div> */}
                                <div className="mb-4.5 mt-3  border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Form Background
                                  </label>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Background color:</span>
                                    <ColorPicker backgroundColor={true} />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row ">
                                    <span>Overlay color:</span>
                                    <ColorPicker overlay={true} />
                                  </div>
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
                                      className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Border style:</span>
                                    <select
                                      onChange={(e) => onborderStyleSelect(e)}
                                      value={borderStyle}
                                      className="w-32 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                      <option value="none">None</option>
                                      <option value="solid">Solid</option>
                                      <option value="dashed">Dashed</option>
                                      <option value="dotted">Dotted</option>
                                    </select>
                                  </div>
                                  {borderStyle != "none" && (
                                    <>
                                      <div className="mt-3 flex justify-between flex-row ">
                                        <span>Border color:</span>
                                        <ColorPicker />
                                      </div>
                                      <div className="mt-3 flex justify-between flex-row ">
                                        <span>Border Thickness:</span>
                                        <input
                                          id="border-thickness"
                                          type="number"
                                          className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                                            value={padding.top}
                                            onChange={(e) =>
                                              handleChange(e, "top")
                                            }
                                            className="w-22 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="px"
                                          />
                                          {/* <span className="ml-1">px</span> */}
                                        </div>
                                      </div>
                                      <div className="flex flex-col">
                                        <label className="mb-1">Bottom</label>
                                        <div className="flex items-center">
                                          <input
                                            type="number"
                                            value={padding.bottom}
                                            onChange={(e) =>
                                              handleChange(e, "bottom")
                                            }
                                            className="w-22 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="px"
                                          />
                                          {/* <span className="ml-1">px</span> */}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-4 mt-4 justify-end">
                                      <div className="flex flex-col">
                                        <label className="mb-1">Left</label>
                                        <div className="flex items-center">
                                          <input
                                            type="number"
                                            value={padding.left}
                                            onChange={(e) =>
                                              handleChange(e, "left")
                                            }
                                            className="w-22 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="px"
                                          />
                                          {/* <span className="ml-1">px</span> */}
                                        </div>
                                      </div>
                                      <div className="flex flex-col">
                                        <label className="mb-1">Right</label>
                                        <div className="flex items-center">
                                          <input
                                            type="number"
                                            value={padding.right}
                                            onChange={(e) =>
                                              handleChange(e, "right")
                                            }
                                            className="w-22 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="px"
                                          />
                                          {/* <span className="ml-1">px</span> */}
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
                                      onChange={(e) => onFontChange(e)}
                                      value={selectFont}
                                      className="w-38 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                      <option value="arial">Arial</option>
                                      <option value="arial-black">
                                        Arial Black
                                      </option>
                                      <option value="century-gothic">
                                        Century Gothic
                                      </option>
                                      <option value="comic-sans-ms">
                                        Comic Sans MS
                                      </option>
                                      <option value="courier">Courier</option>
                                      <option value="georgia">Georgia</option>
                                      <option value="genva">Geneva</option>
                                    </select>
                                    <input
                                      id="border-thickness"
                                      type="number"
                                      className=" w-24 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      placeholder="px"
                                    />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Font weight:</span>
                                    <select
                                      onChange={(e) => onFontWeightChange(e)}
                                      value={fontWight}
                                      className="w-36 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    >
                                      <option value="bold">Bold</option>
                                      <option value="normal">Normal</option>
                                    </select>
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Letter Spacing(px):</span>
                                    <input
                                      id="letter-spacing"
                                      type="number"
                                      className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      placeholder="px"
                                    />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row ">
                                    <span>Label Color:</span>
                                    <ColorPicker label={true} />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row ">
                                    <span>Text Color:</span>
                                    <ColorPicker textColor={true} />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row ">
                                    <span>Placeholder:</span>
                                    <ColorPicker placeholderColor={true} />
                                  </div>
                                </div>
                                <div className="mb-4.5 border-b border-black pb-4">
                                  <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                    Input Field Styles
                                  </label>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Background color:</span>
                                    <ColorPicker inputBgColor={true} />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Border color:</span>
                                    <ColorPicker />
                                  </div>
                                  <div className="mt-3 flex justify-between flex-row items-center">
                                    <span>Focus Border color:</span>
                                    <ColorPicker focusColor={true} />
                                  </div>
                                  {/* <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Corner Radius(px):
                                          </span>
                                          <input
                                            id="letter-spacing"
                                            type="number"
                                            className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="px"
                                          />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Input Field Height(px):
                                          </span>
                                          <input
                                            id="letter-spacing"
                                            type="number"
                                            className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="px"
                                          />
                                        </div> */}
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
                          {/* <h2 className="font-semibold mb-8">Display</h2> */}

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
                                      checkedrules?.settings?.existing_page
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
                                              !checkedrules?.settings
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
                                      checkedrules?.settings?.after_delay_time
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
                                              !checkedrules?.settings
                                                ?.after_delay_time.is_selected,
                                            key: "seconds",
                                            value: "",
                                          },
                                        },
                                      }))
                                    }
                                  />
                                  {checkedrules?.settings?.after_delay_time
                                    .is_selected && (
                                      <div className="ml-9">
                                        <div>Show again after</div>
                                        <input
                                          type="number"
                                          value={
                                            checkedrules?.settings
                                              ?.after_delay_time?.value
                                              ? checkedrules?.settings
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
                                                    checkedrules?.settings
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
                                      checkedrules?.settings
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
                                              !checkedrules?.settings
                                                ?.after_scroll_distance
                                                .is_selected,
                                          },
                                        },
                                      }))
                                    }
                                  />
                                  {checkedrules?.settings?.after_scroll_distance
                                    .is_selected && (
                                      <div className="ml-9">
                                        <div>Scroll distance</div>
                                        <input
                                          type="number"
                                          value={
                                            checkedrules?.settings
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
                                                    checkedrules?.settings
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
                                      checkedrules?.settings?.after_pages_visit
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
                                              !checkedrules?.settings
                                                ?.after_pages_visit.is_selected,
                                          },
                                        },
                                      }))
                                    }
                                  />
                                  {checkedrules?.settings?.after_pages_visit
                                    .is_selected && (
                                      <div className="ml-9">
                                        <div>After</div>
                                        <input
                                          type="number"
                                          value={
                                            checkedrules?.settings
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
                                                    checkedrules?.settings
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
                              onChange={() => { }}
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
                            {/* <div className="flex items-center mt-3">
                                <div className="text-black">Use * as a wild card</div>
                              </div> */}
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
                                checked={notShowlocation}
                                onChange={() =>
                                  setNotShowLocation(!notShowlocation)
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
            </li>
          ))}
        </ul>
      </aside>

      <div className="w-3/4 float-right p-0 h-[83.90vh]">
        <div className="flex justify-between p-4 pl-10 pr-10 border-l border-[#eaedef] items-center flex-wrap w-full bg-white shadow-[6px_0px_7px_#ccc]">
          <div className="w-[70%] flex justify-center">
            <div
              className={`border border-[#323359] ${!sucess ? "bg-[#d0d5d9]" : "bg-white"
                }  inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
              onClick={() => setSucess(false)}
            >
              Teaser
            </div>
            <div
              className={`border border-[#323359] ${sucess ? "bg-[#d0d5d9]" : "bg-white"
                } inline-block p-2 px-3 mr-5 text-black text-sm font-semibold rounded relative cursor-pointer`}
              onClick={() => setSucess(true)}
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
              className={`rounded-l-md  ${isView === "Desktop" ? "bg-[#d0d5d9]" : ""
                }  p-1.5 px-2.5 text-base border border-[#ccc] -ml-px text-black leading-[22px]`}
              href="#"
              onClick={() => setView("Desktop")}
            >
              <i className="fa fa-desktop" aria-hidden="true"></i>
            </a>
            <a
              className={`rounded-r-md text-lg border border-[#ccc] -ml-px text-black leading-[22px]  ${isView === "Mobile" ? "bg-[#eaedef]" : ""
                } p-1.5 px-2.5`}
              href="#"
              onClick={() => setView("Mobile")}
            >
              <i className="fa fa-mobile" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {isView === "Desktop" ? (
          <div className="bg-black/75 h-full p-2 flex items-center justify-center">
            <div className="bg-white max-w-4xl rounded-md shadow-lg overflow-hidden flex">
              <div className="w-2/5">
                <img
                  src={popup_img}
                  alt="Promo"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="w-3/5 p-8 flex flex-col justify-center">
                {sucess ? (
                  <div className="flex justify-center flex-col">
                    <div className="text-center">
                      <img
                        src={sucessImg}
                        alt="no image"
                        className="inline-block max-w-[130px]"
                      />
                    </div>
                    <div className="text-lg mb-6 mt-10 text-center">
                      Thanks for sharing. Please check your email for confirmation message
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-4xl font-bold mb-4">
                      Limited Time
                      <br />
                      10% off
                    </h2>
                    <p className="text-lg mb-6">
                      Save on your first order and get email only offers when
                      you join.
                    </p>
                    <form className="flex flex-col space-y-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-3 rounded-md"
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
        ) : (
          isView === "Mobile" && (
            <div
              className="bg-black/75 h-full p-2 flex items-center justify-center min-h-[785px] bg-no-repeat bg-top bg-center"
              style={{
                backgroundImage:
                  "url('https://apps.qeapps.com/ecom_apps_n/production/qqqe-frontend/src/images/mobile_bg.png')",
              }}
            >
              <div className="max-h-[586px] overflow-auto p-[30px_2px_10px_0px] items-center">
                <div className="bg-white w-[356px] rounded-md shadow-lg overflow-hidden flex flex-wrap">
                  <div className="w-full">
                    <img
                      src={popup_img}
                      alt="Promo"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="w-full p-8 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4">
                      Limited Time
                      <br />
                      10% off
                    </h2>
                    <p className="text-lg mb-6">
                      Save on your first order and get email only offers when
                      you join.
                    </p>
                    <form className="flex flex-col space-y-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-3 rounded-md"
                      />
                      <button className="bg-black text-white py-3 rounded-md text-lg">
                        Continue
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="clear-both"></div>
    </>
  );
};

export default MasterForm;
