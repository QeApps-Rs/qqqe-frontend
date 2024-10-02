import React, { useState } from "react";
import SalesLineGraph from "./Graphs/SalesLineGraph";
import SalesPieGraph from "./Graphs/SalesPieGraph";
import SalesBarGraph from "./Graphs/SaleBarChart";
import SwitcherThree from "../Switchers/SwitcherThree";
import productImg from "../../images/product.png";
import { Link } from "react-router-dom";

const Campaigns = () => {
  const productData = [
    {
      conversions_rate: "0%",
      conversions: 0,
      impressions: 0,
      date_created: "sep 16, 2024",
    },
    {
      conversions_rate: "0%",
      conversions: 0,
      impressions: 0,
      date_created: "sep 16, 2024",
    },
  ];

  const [switchStates, setSwitchStates] = useState({ openInNewTab: true });

  const handleToggle = (key) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
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
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Campaigns</h1>
      <div className="grid grid-cols-3 gap-4">
        {renderCampaignBox("Impressions", 0, "0%")}
        {renderCampaignBox("Clicks", "0.00%", "0%")}
        {renderCampaignBox("Conversions", 0, "0%")}
      </div>

      <div className="grid gap-4 mt-4">
        <SalesLineGraph />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SalesPieGraph />
          <SalesBarGraph />
          <SalesPieGraph />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h1 className="text-lg font-bold text-gray-800">Campaigns</h1>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2">
            New Campaigns
          </button>
          <button className="text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white">
            All Campaigns
          </button>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default mt-4">
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          {[
            "Latest",
            "Status",
            "Devices",
            "Impressions",
            "Conversions",
            "Conversions rate",
            "Date Created",
          ].map((header, index) => (
            <div
              className={`${
                header === "Latest" ? "col-span-2" : "col-span-1"
              } flex items-center`}
              key={index}
            >
              <p
                className={`text-black font-bold ${
                  header === "Latest" ? "col-span-2" : ""
                }`}
              >
                {header}
              </p>
            </div>
          ))}
        </div>

        {productData.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 flex items-center">
              <img src={productImg} alt="product" className="w-30 max-h-30" />
              <div className="block ml-2 text-graydark">
                <Link to={"/campaigns-details"}>
                  <span className="block text-blue-600">
                    Campaign #{key + 1}
                  </span>
                </Link>
                <span>www.com</span>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <SwitcherThree
                label="Open in new tab"
                enabled={switchStates.openInNewTab}
                onToggle={() => handleToggle("openInNewTab")}
              />
              <i
                className="fa fa-exclamation-triangle text-red-500 text-2x"
                aria-hidden="true"
              ></i>
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
            {[
              "impressions",
              "conversions",
              "conversions_rate",
              "date_created",
            ].map((key, index) => (
              <div className="col-span-1 flex items-center" key={index}>
                <p className="text-sm text-graydark">{product[key]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <h3 className="text-xl font-bold text-gray-800 my-4">Need Help?</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <img src={productImg} alt="product" className="w-20 max-h-20" />
          <div className="block">
            <div className="block">
              <h2 className="text-lg font-bold text-graydark">
                Website Personalization Course
              </h2>
              <p className="block text-sm text-customGray">
                Learn how to increase conversion rates with a proven website
                personalization strategy
              </p>
            </div>
            <a href="#" className="inline-block text-blue-600">
              Watch course <i className="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <img src={productImg} alt="product" className="w-20 max-h-20" />
          <div className="block">
            <div className="block">
              <h2 className="text-lg font-bold text-graydark">
                Website Personalization Course
              </h2>
              <p className="block text-sm text-customGray">
                Learn how to increase conversion rates with a proven website
                personalization strategy
              </p>
            </div>
            <a href="#" className="inline-block text-blue-600">
              Watch course <i className="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <img src={productImg} alt="product" className="w-20 max-h-20" />
          <div className="block">
            <div className="block">
              <h2 className="text-lg font-bold text-graydark">
                Website Personalization Course
              </h2>
              <p className="block text-sm text-customGray">
                Learn how to increase conversion rates with a proven website
                personalization strategy
              </p>
            </div>
            <a href="#" className="inline-block text-blue-600">
              Watch course <i className="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
