import { useState, useEffect } from "react";
import SalesLineGraph from "./Graphs/SalesLineGraph";
import SalesPieGraph from "./Graphs/SalesPieGraph";
import SalesBarGraph from "./Graphs/SaleBarChart";
import SwitcherThree from "../Switchers/SwitcherThree";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import FormSubmitHandler from "../FormSubmitHandler";
import NeedHelpPage from "../NeedHelp";
import toast from "react-hot-toast";
import Support from "../Support/Support";
import noImage from "../../images/no-image.png";
const Campaigns = () => {
  // const handleToggle = (productId) => {
  //   setSwitchStates((prevStates) => ({
  //     ...prevStates,
  //     [productId]: !prevStates[productId],
  //   }));
  // };

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

  const salesBarData = [10, 41, 35, 51, 49, 62, 69, 91, 148];
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

  const salesLineData = [10, 41, 35, 51, 49, 62, 69, 91, 148];
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

  const seriesData = [44, 55, 13, 43, 22];
  const labels = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ];
  const chartTitle = "Sales by Product Category";
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [impressionCount, setImpressionCount] = useState(0);
  const [conversionCount, setConversionCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchSuggestionData = async () => {
      try {
        setLoading(true);
        await FormSubmitHandler({
          method: "get",
          url: "applied/suggestion/list",
        })
          .then((res) => {
            if (res.data) {
              setProductData(res.data);
              let impCount = 0;
              let comCount = 0;
              let clickCount = 0;
              let viewCount = 0;
              res.data?.map((item) => {
                console.log(
                  "item",
                  item?.campaignResult,
                  item?.campaignResult?.impressions
                );
                if (
                  item?.campaignResult?.impressions &&
                  item?.campaignResult?.impressions != "-"
                ) {
                  impCount = impCount + item?.campaignResult?.impressions;
                }
                if (
                  item?.campaignResult?.conversions &&
                  item?.campaignResult?.conversions != "-"
                ) {
                  comCount = comCount + item?.campaignResult?.conversions;
                }
                if (
                  item?.campaignResult?.clicks &&
                  item?.campaignResult?.clicks != "-"
                ) {
                  clickCount = clickCount + item?.campaignResult?.clicks;
                }
                if (
                  item?.campaignResult?.views &&
                  item?.campaignResult?.views != "-"
                ) {
                  viewCount = viewCount + item?.campaignResult?.views;
                }
              });
              setImpressionCount(impCount);
              setConversionCount(comCount);
              setClickCount(clickCount);
              setViewCount(viewCount);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchSuggestionData();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="mb-25">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Campaigns</h1>
        <div className="grid grid-cols-4 gap-4">
          {renderCampaignBox("Impressions", impressionCount, "0%")}
          {renderCampaignBox("Clicks", clickCount, "0%")}
          {renderCampaignBox("Conversions", conversionCount, "0%")}
          {renderCampaignBox("Views", viewCount, "0%")}
        </div>

        <div className="grid gap-4 mt-4">
          <SalesLineGraph
            salesLineData={salesLineData}
            lineCategories={lineCategories}
            lineyAxisTitle={lineyAxisTitle}
          />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <SalesPieGraph
              seriesData={seriesData}
              labels={labels}
              chartTitle={chartTitle}
            />
            <SalesBarGraph
              salesBarData={salesBarData}
              barCategories={barCategories}
              baryAxisTitle={baryAxisTitle}
            />
            <SalesPieGraph
              seriesData={seriesData}
              labels={labels}
              chartTitle={chartTitle}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h1 className="text-lg font-bold text-gray-800">Campaigns</h1>
          <div className="flex items-center">
            <Link to="/app-dashboard">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2">
                New Campaigns
              </button>
            </Link>
          </div>
        </div>
        <div className="rounded-lg  bg-white shadow-default mt-4 ">
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5 ">
            {[
              "Latest",
              "Status",
              "Devices",
              "Template Handle",
              "Impressions",
              "Conversions",
              "Conversions rate",
              "Applied Date",
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

          {productData.length == 0 && (
            <div className="w-full text-center my-4">
              <p className="text-gray-400 font-bold text-lg">Not Found</p>
            </div>
          )}

          {productData?.map((product) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5 gap-4"
              key={product.id}
            >
              <div className="col-span-2 flex items-center">
                <img
                  src={product.image_path ? product.image_path : noImage}
                  alt="product"
                  className="min-w-30 h-30"
                />
                <div className="block ml-2 text-graydark">
                  <Link
                    to={`/campaigns-details/${product.id}?type=${product.type}`}
                  >
                    <span className="block text-blue-600">
                      {product.problem_statement}
                    </span>
                  </Link>
                  <span> {product.suggestion.description}</span>
                </div>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <SwitcherThree
                  enabled={product?.service_status}
                  cursorStyle="default"
                />
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
              <div className="col-span-1 flex items-center">
                <h1 data-template-handle={product?.template_handle}>
                  {product?.title}
                </h1>
              </div>
              {[
                "impressions",
                "conversions",
                "conversions_rate",
                // "date_created",
              ].map((key, index) => (
                <div className="col-span-1 flex items-center" key={index}>
                  <p className="text-sm text-graydark">
                    {product.campaignResult[key]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Support />
      </div>
    </>
  );
};

export default Campaigns;
