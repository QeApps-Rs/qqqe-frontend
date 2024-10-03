import React, { useState } from "react";
import SwitcherThree from "../../Switchers/SwitcherThree";
import productImg from "../../../images/product.png";
import { Link } from "react-router-dom";
import { defaultBoxClassName } from "../../../pages/forms/masterFormConfig";
import SalesLineGraph from "../Graphs/SalesLineGraph";
import SalesPieGraph from "../Graphs/SalesPieGraph";
import SalesBarGraph from "../Graphs/SaleBarChart";
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
  const renderCampaignBox = (title, value, rate, item1) => (
    <div
      className="campaigns-boxs p-4 bg-white rounded-lg shadow-md"
      key={item1}
    >
      <span className="box-title block text-indigo-600 font-semibold text-lg mb-2">
        {title}
      </span>
      <div className="flex items-end">
        <h2 className="text-3xl font-bold text-gray-800 mr-2">{value}</h2>
        <span className="text-green-500 font-semibold">{rate}</span>
      </div>
    </div>
  );
  const data = [
    {
      id: 1,
      title: "Frequency",
      description: "When a visitor is about to leave your site",
      icon: "fa-desktop",
      moreProduct: "and",
    },
    {
      id: 2,
      title: "Frequency",
      description: "When a visitor is about to leave your site",
      icon: "fa-desktop",
      moreProduct: "and",
    },
    {
      id: 3,
      title: "Frequency",
      description: "When a visitor is about to leave your site",
      icon: "fa-desktop",
      moreProduct: "and",
    },
  ];
  const salesBarData = [10, 41, 35, 51, 49, 62, 69, 91, 148]; // Example sales data
  const barCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  const baryAxisTitle = "Sales Amount";

  const salesLineData = [10, 41, 35, 51, 49, 62, 69, 91, 148]; // Example sales data
  const lineCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  const lineyAxisTitle = "Sales Amount";

  const seriesData = [44, 55, 13, 43, 22]; // Example series data
  const labels = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ]; // Example labels
  const chartTitle = "Sales by Product Category";
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
            (header, index1) => (
              <div className="col-span-2" key={index1}>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl text-customGray uppercase	">
            When will the popup show up
          </h2>
        </div>
        <div className="flex relative justify-between items-center  border-l-2 border-customGray  pl-6 ">
          <div className="flex items-center">
            <img
              src={productImg}
              alt="product"
              className="w-30 max-h-30 mr-4"
            />
            <div>
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
          <div className="absolute left-[13px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
        </div>
        <div className="flex relative justify-between items-center  border-l-2 border-customGray  pl-6 ">
          <div className="flex items-center">
            <img
              src={productImg}
              alt="product"
              className="w-30 max-h-30 mr-4"
            />
            <div>
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
          <div className="absolute left-[13px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default mt-4 p-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-customGray uppercase	">
            Who should see the popup
          </h2>
        </div>
        <div className="flex ">
          {/* Left Side Tree Border */}
          <div className="border-l-[1.5px] border-customGray pl-10 mt-3  w-full">
            {data.map((item, index) => (
              <>
                <div
                  key={item.id}
                  className="flex items-center border-b-[1.5px] border-customGray mb-4 pb-3 relative"
                >
                  <div className="w-10 h-10 bg-orange-200 rounded-md flex items-center justify-center mr-3">
                    <i
                      className={`fa ${item.icon} text-red-500 text-2xl`}
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="block">
                    <h3 className="text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <span className="text-customGray">{item.description}</span>
                  </div>
                  {index !== data.length - 1 && (
                    <span className="bg-blue-400 p-1 uppercase rounded-sm text-sm text-white font-bold absolute left-[-60px] top-[50px]">
                      {item.moreProduct}
                    </span>
                  )}
                  {index === data.length - 1 && (
                    <div className="absolute left-[-25px] top-[50px] w-8 h-1 bg-customGray rounded-full transform -translate-x-1/2"></div>
                  )}
                </div>
              </>
            ))}
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
      <div className="grid gap-4 mt-4">
        <SalesLineGraph
          salesLineData={salesLineData}
          lineCategories={lineCategories}
          lineyAxisTitle={lineyAxisTitle}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SalesPieGraph
            seriesData={seriesData}
            labels={labels}
            chartTitle={chartTitle}
          />
          <SalesBarGraph
            salesBarData={salesBarData}
            barCategories={barCategories}
            baryAxisTitle={baryAxisTitle}
          />{" "}
          <SalesPieGraph
            seriesData={seriesData}
            labels={labels}
            chartTitle={chartTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignsDetailsPage;
