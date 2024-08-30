import React, { useState } from "react";
import DatePicker from "../../components/higherOrderComponent/input/DatePicker";
import Checkbox from "../../components/higherOrderComponent/Checkboxes/Checkbox";
import Radio from "../../components/higherOrderComponent/Radios/Radio";
import ColorPicker from "../../components/higherOrderComponent/ColorPicker/ColorPicker";
import DropDown from "../../components/higherOrderComponent/Dropdown/Dropdown";

const MasterForm = () => {

  const [checkedItems, setCheckedItems] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [frequency, setFrequency] = useState(5);
  const [checkDesktop, setDesktop] = useState(false);
  const [checkMobile, setMobile] = useState(false);
  const [showUrl, setURL] = useState(false)
  const [notShowUrl, setNotShow] = useState(false)
  const [showLocation, setLocation] = useState(false)
  const [notShowlocation, setNotShowLocation] = useState(false);
  const [borderStyle, setBorderStyle] = useState("solid");
  const [padding, setPadding] = useState({
    top: null,
    bottom: null,
    left: null,
    right: null,
  });
  const [selectFont, setSelectedFont] = useState('')
  const [fontWight, setFontWeight] = useState('')


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
      { value: "Don’t show to existing Klaviyo profiles", label: "Don’t show to existing Klaviyo profiles" },
      { value: "Show to all visitors", label: "Show to all visitors" },
      { value: "Show to any existing profile", label: "Show to any existing profile" },
      { value: "Show to email subscribers only", label: "Show to email subscribers only" },
      { value: "Show to SMS subscribers only", label: "Show to SMS subscribers only" },
      { value: "Show to specific profiles in a list or segment", label: "Show to specific profiles in a list or segment" },
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
    setBorderStyle(e.target.value)
  }

  const handleChange = (e, side) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : 0;
    setPadding((prevPadding) => ({
      ...prevPadding,
      [side]: value,
    }));
  };

  const onFontChange = (e) => {
    setSelectedFont(e.target.value)
  }

  const onFontWeightChange = (e) => {
    setFontWeight(e.target.value)
  }

  return (
    <>
      {/* 
      
     START INPUT FIELDS WITH BASIC FORM
      
      <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-4">
          <div className="xl:p-7.5 flex flex-col gap-2 p-4 sm:flex-row sm:justify-between md:p-6">
            <div className="w-full flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Input Components
                  </h3>
                </div>
                <form action="#">
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
                        Email <span className="text-meta-1">*</span>
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
                    </div>
                    <div className="mb-6">
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
                        onChange={() => setCheckedItems(!checkedItems)}
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
                    </div>
                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-8 border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2"></div>
      </div> 
      
      END INPUT FIELDS WITH BASIC FORM
      */}

      {/* 
      <div class="aside_left w-1/4 bg-white fixed left-0 p-5 shadow-lg h-full overflow-auto">
        <div class="top_overview flex justify-between items-center border-b pb-3 mb-5">
          <div class="left_over_view_text">
            <p class="font-semibold text-lg">Overview</p>
          </div>
          <div class="right_template_name">
            <span class="text-sm text-indigo-600">Created by / Kadam</span>
          </div>
        </div>

        <div class="accordian_bg_left_main px-4">
          <ul class="accordion list-none p-0">
            <li class="accordion-item border border-gray-300 rounded-md mb-4 is-active">
              <h3 class="accordion-thumb p-4 pl-12 cursor-pointer font-semibold text-xl relative">
                <i class="fa fa-pencil-square-o absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-gray-800"></i>
                Style
                <span class="sabtitle_accordian block text-sm font-normal">
                  Popup | Image left
                </span>
              </h3>
              <div class="accordion-panel p-4 text-gray-700 border-t border-gray-300 hidden">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
                <br />
                To activate your builder kindly go to the List of Builders page
                and enable the builder by sliding the toggle switch to
                enable/disable the builder.
              </div>
            </li>
            <li class="accordion-item border border-gray-300 rounded-md mb-4">
              <h3 class="accordion-thumb p-4 pl-12 cursor-pointer font-semibold text-xl relative">
                <i class="fa fa-magic absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-gray-800"></i>
                Targeting & behavior
                <span class="sabtitle_accordian block text-sm font-normal">
                  Show immediately | All devices
                </span>
              </h3>
              <div class="accordion-panel p-4 text-gray-700 border-t border-gray-300 hidden">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </li>
            <li class="accordion-item border border-gray-300 rounded-md mb-4">
              <h3 class="accordion-thumb p-4 pl-12 cursor-pointer font-semibold text-xl relative">
                <i class="fa fa-th absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-gray-800"></i>
                Add blocks
                <span class="sabtitle_accordian block text-sm font-normal">
                  Add new block
                </span>
              </h3>
              <div class="accordion-panel p-4 text-gray-700 border-t border-gray-300 hidden">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="right_preview_bg w-3/4 float-right p-0 h-screen">
        <div class="top_header_bg bg-white shadow-lg flex fixed w-3/4 p-4 justify-between items-center flex-wrap border-l border-gray-300 gap-2">
          <div class="breadcrubh_bg flex space-x-4">
            <a
              class="btn_link border border-gray-300 px-4 py-2 text-black font-semibold rounded-md relative bg-white active_btns"
              href="#"
            >
              Teaser
            </a>
            <a
              class="btn_link border border-gray-300 px-4 py-2 text-black font-semibold rounded-md relative bg-white"
              href="#"
            >
              Success
            </a>
          </div>

          <div class="tab_mobile_desktop_bg flex">
            <a
              class="tbbtn bg-gray-200 p-2 text-lg border border-gray-300 rounded-l-md active_tab"
              href="#"
            >
              <i class="fa fa-desktop" aria-hidden="true"></i>
            </a>
            <a
              class="tbbtn bg-gray-200 p-2 text-lg border border-gray-300 rounded-r-md"
              href="#"
            >
              <i class="fa fa-mobile" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div class="right_bg_body p-4 pt-20 h-full">
          <div class="right_bg_body_inner bg-black bg-opacity-40 h-full flex items-center justify-center">
            <div class="newsletter_bg bg-white w-2/3 rounded-md flex justify-between items-center p-4">
              <div class="img_bg w-1/2">
                <img
                  src="images/newsletter_left_img.png"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="content_newsletter_bg_main w-1/2 text-center p-4">
                <h2 class="offer_title m-0 text-3xl font-bold">
                  Limited Time 10% off
                </h2>
                <p class="paragraph_text font-medium text-lg text-black mt-3">
                  Save on your first order and get email only offers when you
                  join.
                </p>

                <form class="from_bg">
                  <div class="formgroup mt-3">
                    <input
                      class="input_fld border border-gray-300 h-12 rounded-md w-full px-3 text-lg text-black"
                      type="text"
                      placeholder="Email"
                      required=""
                    />
                  </div>
                  <div class="formgroup mt-3">
                    <button
                      class="continue_btn_form bg-black text-white font-semibold rounded-md w-full py-3 text-lg"
                      type="submit"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="right_bg_body_inner bg-black bg-opacity-40 h-full hidden items-center justify-center">
            <div class="mobile_scrolling max-h-[36.625rem] overflow-auto py-7 flex items-center">
              <div class="newsletter_bg w-[22.25rem]">
                <div class="img_bg">
                  <img
                    src="images/newsletter_left_img.png"
                    class="min-h-[18.125rem] w-full object-cover"
                  />
                </div>
                <div class="content_newsletter_bg_main text-center p-4">
                  <h2 class="offer_title text-xl font-bold">
                    Limited Time 10% off
                  </h2>
                  <p class="paragraph_text font-medium text-sm text-black mt-1">
                    Save on your first order and get email only offers when you
                    join.
                  </p>

                  <form class="from_bg">
                    <div class="formgroup mt-2">
                      <input
                        class="input_fld border border-gray-300 h-10 rounded-md w-full px-3 text-base text-black"
                        type="text"
                        placeholder="Email"
                        required=""
                      />
                    </div>
                    <div class="formgroup mt-2">
                      <button
                        class="continue_btn_form bg-black text-white font-semibold rounded-md w-full py-3 text-base"
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div>
        <div class="aside_left">
          <div class="top_overview">
            <div class="left_over_view_text">
              <p>Overview</p>
            </div>
            <div class="right_template_name">
              <span>Created by / Kadam</span>
            </div>
          </div>

          <div class="accordian_bg_left_main">
            <ul class="accordion">
              <li class="accordion-item is-active">
                <h3 class="accordion-thumb">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Style
                  <span class="sabtitle_accordian">Popup | Image left</span>
                </h3>
                <div class="accordion-panel">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                  <br />
                  To activate your builder kindly go to the List of Builders
                  page and enable the builder by sliding the toggle switch to
                  enable/disable the builder.
                </div>
              </li>
              <li class="accordion-item">
                <h3 class="accordion-thumb">
                  <i class="fa fa-magic" aria-hidden="true"></i> Targeting &
                  behavior
                  <span class="sabtitle_accordian">
                    Show immediately | All devices
                  </span>
                </h3>
                <div class="accordion-panel">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </li>
              <li class="accordion-item">
                <h3 class="accordion-thumb">
                  <i class="fa fa-th" aria-hidden="true"></i> Add blocks
                  <span class="sabtitle_accordian">Add new block</span>
                </h3>
                <div class="accordion-panel">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                  <br />
                  <br />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="right_preview_bg">
          <div class="top_header_bg">
            <div class="breadcrubh_bg">
              <a class="btn_link active_btns" href="#">
                Teaser
              </a>
              <a class="btn_link" href="#">
                Success
              </a>
            </div>

            <div class="tab_mobile_desktop_bg">
              <a class="tbbtn active_tab" href="#">
                <i class="fa fa-desktop" aria-hidden="true"></i>
              </a>
              <a class="tbbtn" href="#">
                <i class="fa fa-mobile" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="right_bg_body">
            <div class="right_bg_body_inner desktop_view_only">
              <div class="newsletter_bg">
                <div class="img_bg">
                  <img src="images/newsletter_left_img.png" />
                </div>
                <div class="content_newsletter_bg_main">
                  <h2 class="offer_title">Limited Time 10% off</h2>
                  <p class="paragraph_text">
                    Save on your first order and get email only offers when you
                    join.
                  </p>

                  <form class="from_bg">
                    <div class="formgroup">
                      <input
                        class="input_fld"
                        type="text"
                        placeholder="Email"
                        required=""
                      />
                    </div>
                    <div class="formgroup">
                      <button class="continue_btn_form" type="submit">
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="right_bg_body_inner mobile_view_only">
              <div class="mobile_scrolling">
                <div class="newsletter_bg">
                  <div class="img_bg">
                    <img src="images/newsletter_left_img.png" />
                  </div>
                  <div class="content_newsletter_bg_main">
                    <h2 class="offer_title">Limited Time 10% off</h2>
                    <p class="paragraph_text">
                      Save on your first order and get email only offers when
                      you join.
                    </p>

                    <form class="from_bg">
                      <div class="formgroup">
                        <input
                          class="input_fld"
                          type="text"
                          placeholder="Email"
                          required=""
                        />
                      </div>
                      <div class="formgroup">
                        <button class="continue_btn_form" type="submit">
                          Continue
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <div className="flex">
          <aside className="w-1/4 bg-white fixed left-[4.7rem] p-4 shadow-lg h-screen overflow-auto top-20">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <p className="font-semibold text-lg">Overview</p>
              <span className="text-sm text-gray-500">Created by / Kadam</span>
            </div>

            <ul className="space-y-4">
              {[
                {
                  title: "Style",
                  // subtitle: "Popup | Image left",
                  content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1. To activate your builder kindly go to the List of Builders page and enable the builder by sliding the toggle switch to enable/disable the builder.",
                  tag: 'style'
                },
                {
                  title: "Targeting & behavior",
                  // subtitle: "Show immediately | All devices",
                  content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                  tag: 'target'
                },
                {
                  title: "Add blocks",
                  subtitle: "coming soon",
                  content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                  tag: 'block'
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className={`border rounded-lg ${activeIndex === index
                    ? "border-blue-500"
                    : "border-gray-300"
                    }`}
                >
                  <h3
                    className="p-4 flex justify-between items-center cursor-pointer font-semibold text-lg"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>
                      <i
                        className="fa fa-pencil-square-o mr-2"
                        aria-hidden="true"
                      ></i>{" "}
                      {item.title}
                    </span>
                    <span className="text-sm font-normal">{item.subtitle}</span>
                    <svg
                      className={`fill-primary ${item.tag === 'block' ? 'hidden' : ''} stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white w-6 h-6 transform ${activeIndex === index ? "rotate-180" : "rotate-0"}`}
                      viewBox="0 0 18 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.28882 8.43257L8.28874 8.43265L8.29692 8.43985C8.62771 8.73124 9.02659 8.86001 9.41667 8.86001C9.83287 8.86001 10.2257 8.69083 10.5364 8.41713L10.5365 8.41721L10.5438 8.41052L16.765 2.70784L16.771 2.70231L16.7769 2.69659C17.1001 2.38028 17.2005 1.80579 16.8001 1.41393C16.4822 1.1028 15.9186 1.00854 15.5268 1.38489L9.41667 7.00806L3.3019 1.38063L3.29346 1.37286L3.28467 1.36548C2.93287 1.07036 2.38665 1.06804 2.03324 1.41393L2.0195 1.42738L2.00683 1.44184C1.69882 1.79355 1.69773 2.34549 2.05646 2.69659L2.06195 2.70196L2.0676 2.70717L8.28882 8.43257Z" />
                    </svg>
                  </h3>
                  {(activeIndex === index && item.tag === "style") &&
                    (
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
                                      </div> */}

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
                                      {/* <div className="mb-6">
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
                                      <div className="mb-4.5 border-b border-black pb-4">
                                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                          Form Background
                                        </label>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Background color:
                                          </span>
                                          <ColorPicker />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row ">
                                          <span>
                                            Overlay color:
                                          </span>
                                          <ColorPicker />
                                        </div>
                                      </div>
                                      <div className="mb-4.5 border-b border-black pb-4">
                                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                          Form Styles
                                        </label>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Corner Radius(px):
                                          </span>
                                          <input
                                            id="border-radius"
                                            type="number"
                                            className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                          />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Border style:
                                          </span>
                                          <select onChange={(e) => onborderStyleSelect(e)} value={borderStyle} className="w-32 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                            <option value="none">None</option>
                                            <option value="solid">Solid</option>
                                            <option value="dashed">Dashed</option>
                                            <option value="dotted">Dotted</option>
                                          </select>
                                        </div>
                                        {borderStyle != 'none' &&
                                          <>
                                            <div className="mt-3 flex justify-between flex-row ">
                                              <span>
                                                Border color:
                                              </span>
                                              <ColorPicker />
                                            </div>
                                            <div className="mt-3 flex justify-between flex-row ">
                                              <span>
                                                Border Thickness:
                                              </span>
                                              <input
                                                id="border-thickness"
                                                type="number"
                                                className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                            </div>
                                          </>}
                                        <div className="flex flex-col">
                                          <label className="mb-2">Padding(px):</label>
                                          <div className="flex gap-4 justify-end">
                                            <div className="flex flex-col">
                                              <label className="mb-1">Top</label>
                                              <div className="flex items-center">
                                                <input
                                                  type="number"
                                                  value={padding.top}
                                                  onChange={(e) => handleChange(e, 'top')}
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
                                                  onChange={(e) => handleChange(e, 'bottom')}
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
                                                  onChange={(e) => handleChange(e, 'left')}
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
                                                  onChange={(e) => handleChange(e, 'right')}
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
                                          <span>
                                            Font:
                                          </span>
                                          <select onChange={(e) => onFontChange(e)} value={selectFont} className="w-38 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                            <option value="arial">Arial</option>
                                            <option value="arial-black">Arial Black</option>
                                            <option value="century-gothic">Century Gothic</option>
                                            <option value="comic-sans-ms">Comic Sans MS</option>
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
                                          <span>
                                            Font weight:
                                          </span>
                                          <select onChange={(e) => onFontWeightChange(e)} value={fontWight} className="w-36 h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                            <option value="bold">Bold</option>
                                            <option value="normal">Normal</option>
                                          </select>
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Letter Spacing(px):
                                          </span>
                                          <input
                                            id="letter-spacing"
                                            type="number"
                                            className=" w-32 h-10 rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="px"
                                          />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row ">
                                          <span>
                                            Label Color:
                                          </span>
                                          <ColorPicker />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row ">
                                          <span>
                                            Text Color:
                                          </span>
                                          <ColorPicker />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row ">
                                          <span>
                                            Placeholder:
                                          </span>
                                          <ColorPicker />
                                        </div>
                                      </div>
                                      <div className="mb-4.5 border-b border-black pb-4">
                                        <label className="mb-2.5 block text-black dark:text-white font-semibold">
                                          Input Field Styles
                                        </label>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Background color:
                                          </span>
                                          <ColorPicker />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Border color:
                                          </span>
                                          <ColorPicker />
                                        </div>
                                        <div className="mt-3 flex justify-between flex-row items-center">
                                          <span>
                                            Focus Border color:
                                          </span>
                                          <ColorPicker />
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
                                        Send Message
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
                  {(activeIndex === index && item.tag === "target") &&
                    (
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
                                  <Radio jsonData={timingOptions} />
                                </div>

                                <div className="mb-4 border-b border-black">
                                  <h3 className="text-lg font-semibold">Frequency</h3>
                                  <div className="flex items-center mt-3">
                                    <div className="text-black">After a visitor closes this form, show again after </div>
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
                                      label='Don’t show again if form was submitted or if go to URL button was clicked'
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
                                  <Radio jsonData={deviceOptions} />
                                </div>
                                <div className="mb-4 border-b border-black">
                                  <div className="text-lg font-semibold">Click outside form to close</div>
                                  <span className="text-sm font-medium">Select all that apply.</span>
                                  <div className="mb-4.5 mt-6">
                                    <Checkbox
                                      key={2}
                                      label='On desktop'
                                      checked={checkDesktop}
                                      onChange={() =>
                                        setDesktop(!checkDesktop)
                                      }
                                    />
                                  </div>
                                  <div className="mb-4.5">
                                    <Checkbox
                                      key={3}
                                      label='On mobile'
                                      checked={checkMobile}
                                      onChange={() =>
                                        setMobile(!checkMobile)
                                      }
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
                                  <div className="flex items-center mt-3">
                                    <div className="text-black">Use * as a wild card</div>
                                  </div>
                                  <div className="mb-4.5 mt-6">
                                    <Checkbox
                                      key={2}
                                      label='Only show on certain URLs'
                                      checked={showUrl}
                                      onChange={() =>
                                        setURL(!showUrl)
                                      }
                                    />
                                  </div>
                                  <div className="mb-4.5">
                                    <Checkbox
                                      key={3}
                                      label='Don’t show on certain URLs'
                                      checked={notShowUrl}
                                      onChange={() =>
                                        setNotShow(!notShowUrl)
                                      }
                                    />
                                  </div>

                                </div>

                                <div className="mb-4 border-b border-black">
                                  <h3 className="text-lg font-semibold">Location</h3>
                                  <div className="flex items-center mt-3">
                                    <div className="text-black font-medium">Based on visitors IP address</div>
                                  </div>
                                  <div className="mb-4.5 mt-6">
                                    <Checkbox
                                      key={2}
                                      label='Show to visitors in certain locations'
                                      checked={showLocation}
                                      onChange={() =>
                                        setLocation(!showLocation)
                                      }
                                    />
                                  </div>
                                  <div className="mb-4.5">
                                    <Checkbox
                                      key={3}
                                      label='Don’t show to visitors in certain locations'
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

          <div className="w-3/4 ml-auto bg-gray-200 h-screen p-4">
            <div className="bg-white p-4 shadow flex justify-between items-center">
              <div>
                <a className="btn_link active_btns mr-4" href="#">
                  Teaser
                </a>
                <a className="btn_link" href="#">
                  Success
                </a>
              </div>
              <div>
                <a className="tbbtn active_tab mr-2" href="#">
                  <i className="fa fa-desktop" aria-hidden="true"></i>
                </a>
                <a className="tbbtn" href="#">
                  <i className="fa fa-mobile" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <div className="right_bg_body_inner desktop_view_only p-4 bg-white mt-4 shadow">
              <div className="newsletter_bg flex">
                <div className="img_bg w-1/2">
                  <img src="images/newsletter_left_img.png" alt="Newsletter" />
                </div>
                <div className="content_newsletter_bg_main w-1/2 p-4 text-center">
                  <h2 className="offer_title text-4xl font-bold">
                    Limited Time 10% off
                  </h2>
                  <p className="paragraph_text mt-4 text-lg">
                    Save on your first order and get email only offers when you
                    join.
                  </p>

                  <form className="from_bg mt-4">
                    <div className="formgroup mb-4">
                      <input
                        className="input_fld p-2 border border-gray-300 rounded w-full"
                        type="text"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="formgroup">
                      <button
                        className="continue_btn_form p-2 bg-gray-800 text-white rounded w-full"
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="right_bg_body_inner mobile_view_only p-4 bg-white mt-4 shadow hidden">
              <div className="mobile_scrolling overflow-auto p-4">
                <div className="newsletter_bg">
                  <div className="img_bg">
                    <img
                      src="images/newsletter_left_img.png"
                      alt="Newsletter"
                    />
                  </div>
                  <div className="content_newsletter_bg_main text-center p-4">
                    <h2 className="offer_title text-2xl font-bold">
                      Limited Time 10% off
                    </h2>
                    <p className="paragraph_text mt-4 text-sm">
                      Save on your first order and get email only offers when
                      you join.
                    </p>

                    <form className="from_bg mt-4">
                      <div className="formgroup mb-4">
                        <input
                          className="input_fld p-2 border border-gray-300 rounded w-full"
                          type="text"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="formgroup">
                        <button
                          className="continue_btn_form p-2 bg-gray-800 text-white rounded w-full"
                          type="submit"
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterForm;
