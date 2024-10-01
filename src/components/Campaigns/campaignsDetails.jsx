import React, { useState } from "react";
import SwitcherThree from "../Switchers/SwitcherThree";
import productImg from "../../images/product.png";
import { Link } from "react-router-dom";
import { defaultBoxClassName } from "../../pages/forms/masterFormConfig";
const CampaignsDetailsPage = () => {
  const [switchStates, setSwitchStates] = useState({ openInNewTab: true });
  const [activeTab, setActiveTab] = useState("medium");

  const handleToggle = (key) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const productData = [
    { conversions_rate: "0%", conversions: 0, impressions: 0 },
    { conversions_rate: "0%", conversions: 0, impressions: 0 },
  ];

  const renderTab = (tab, label, activeColor) => (
    <div
      onClick={() => setActiveTab(tab)}
      className={`flex items-center cursor-pointer px-4 py-2 transition-colors duration-200 ${
        activeTab === tab ? activeColor : "bg-gray-200 text-gray-700"
      }`}
    >
      {label}
    </div>
  );
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onTemplateChange(selectedValue);
  };
  const renderCampaignBox = (title, value, rate) => (
    <div className="campaigns-boxs p-4 bg-white rounded-lg shadow-md">
      <span className="box-title block text-indigo-600 font-semibold text-lg mb-2">
        {title}
      </span>
      <div className="flex items-end">
        <h2 className="text-3xl font-bold text-gray-800 mr-2">{value}</h2>
        <span className="text-green-500 font-semibold">{rate}</span>
      </div>
    </div>
  );
  return (
    <div className="mb-25">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Campaign #1</h1>

      {/* Status and Schedule Section */}
      <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
        <h2 className="font-semibold text-xl text-customGray">
          Status and Schedule
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <SwitcherThree
              label="Open in new tab"
              enabled={switchStates.openInNewTab}
              onToggle={() => handleToggle("openInNewTab")}
            />
            <div className="flex items-center cursor-pointer">
              <span className="block mr-2">Schedule</span>
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </div>
          </div>

          {/* Priority Tabs */}
          <div className="flex items-center">
            <label>Priority</label>
            <div className="flex border-stroke rounded-sm border mx-2">
              {renderTab("low", "Low", "bg-blue-500 text-white")}
              {renderTab("medium", "Medium", "bg-blue-500 text-white")}
              {renderTab("high", "High", "bg-red-500 text-white")}
            </div>
            <i
              className="fa fa-info-circle cursor-pointer"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>

      {/* A/B Test Center Section */}
      <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-customGray">
            A/B Test Center
          </h2>
          <div className="flex ">
            <div className="flex items-center">
              <span>Conversion</span>
              <select
                onChange={handleChange}
                className={`${defaultBoxClassName} h-12 mx-4 w-full`}
                defaultValue="Campaign Conversion"
              >
                <option value="Campaign Conversion">Campaign Conversion</option>
                <option value="Roboto">Roboto</option>
              </select>
              <i
                className="fa fa-info-circle cursor-pointer"
                aria-hidden="true"
              ></i>
            </div>
            <div className="flex items-center">
              <select
                onChange={handleChange}
                className={`${defaultBoxClassName} h-12 mx-4 w-full`}
                defaultValue="Campaign Conversion"
              >
                <option value="Campaign Conversion">Campaign Conversion</option>
                <option value="Roboto">Roboto</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          {["Variants", "Impressions", "Conversions", "Conversions rate"].map(
            (header, index) => (
              <div className="col-span-2" key={index}>
                <p className="text-black font-bold">{header}</p>
              </div>
            )
          )}
        </div>
        {productData.map((product, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-2 flex items-center">
              <img src={productImg} alt="product" className="w-30 max-h-30" />
              <div className="ml-2 text-graydark">
                <Link to="/campaigns-details">
                  <span className="text-blue-600">Variant #{index + 1}</span>
                </Link>
              </div>
            </div>
            {["impressions", "conversions", "conversions_rate"].map(
              (field, idx) => (
                <div className="col-span-2 flex items-center" key={idx}>
                  <p className="text-sm text-graydark">{product[field]}</p>
                </div>
              )
            )}
          </div>
        ))}
        <div className="flex items-center cursor-pointer text-blue-600">
          <i className="fa fa-plus-circle mr-2 text-2xl" aria-hidden="true"></i>
          <span className="font-black">Add A/B test experience</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-lg font-bold text-gray-800">Campaigns</h1>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2">
            Edit Setting{" "}
          </button>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-customGray uppercase	">
            When will the popup show up
          </h2>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center mt-4">
            <img src={productImg} alt="product" className="w-30 max-h-30" />
            <div className="block">
              <h3 className="text-lg font-bold text-black">On exit-intent</h3>
              <span className="text-customGray">
                When a visitor is about to leave your site
              </span>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <i
              className="fa fa-desktop mr-3 text-red-500 text-2xl"
              aria-hidden="true"
            ></i>
            <i
              className="fa fa-mobile text-red-500 text-4xl"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-customGray uppercase	">
            Who should see the popup
          </h2>
        </div>
        <div className="pl-6 mt-3">
          <div className="flex items-center border-b-1 border-customGray mb-4">
            <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
              <i
                className="fa fa-desktop text-red-500 text-2xl"
                aria-hidden="true"
              ></i>
            </div>
            <div className="block">
              <h3 className="text-lg font-bold text-black">Frequency</h3>
              <span className="text-customGray">
                When a visitor is about to leave your site
              </span>
            </div>
          </div>
          <div className="flex items-center border-b-1 border-customGray mb-4">
            <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
              <i
                className="fa fa-desktop text-red-500 text-2xl"
                aria-hidden="true"
              ></i>
            </div>
            <div className="block">
              <h3 className="text-lg font-bold text-black">Frequency</h3>
              <span className="text-customGray">
                When a visitor is about to leave your site
              </span>
            </div>
          </div>
          <div className="flex items-center border-b-1 border-customGray mb-4">
            <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
              <i
                className="fa fa-desktop text-red-500 text-2xl"
                aria-hidden="true"
              ></i>
            </div>
            <div className="block">
              <h3 className="text-lg font-bold text-black">Frequency</h3>
              <span className="text-customGray">
                When a visitor is about to leave your site
              </span>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 my-4">
        Campaigns Statistics
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {renderCampaignBox("Impressions", 0, "0%")}
        {renderCampaignBox("Clicks", "0%", "0%")}
        {renderCampaignBox("Conversions", 0, "0%")}
      </div>
    </div>
  );
};

export default CampaignsDetailsPage;
