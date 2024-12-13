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
  const defaultDayCount = [0, 0, 0, 0, 0, 0, 0];
  const defaultMonthCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const defaultDayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const defaultMonthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [impressionCount, setImpressionCount] = useState(0);
  const [conversionCount, setConversionCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const [weeklyImpressionCount, setWeeklyImpressionCount] = useState([
    ...defaultDayCount,
  ]);
  const [monthlyImpressionCount, setMonthlyImpressionCount] = useState([
    ...defaultMonthCount,
  ]);

  const [weeklyViewCount, setWeeklyViewCount] = useState([...defaultDayCount]);
  const [monthlyViewCount, setMonthlyViewCount] = useState([
    ...defaultMonthCount,
  ]);
  const [toggleState, setToggleState] = useState({});

  const handleToggle = (productId) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [productId]: !prevStates[productId],
    }));
  };

  const renderCampaignBox = (title, value, rate = null) => (
    <div className="campaigns-boxs p-4 bg-white rounded-lg shadow-md">
      <span className="box-title block text-indigo-600 font-semibold text-lg mb-2">
        {title}
      </span>
      <div className="flex items-end">
        <h2 className="text-3xl font-bold text-gray-800 mr-2">{value}</h2>
        {rate && <span className="text-green-500 font-semibold">{rate}</span>}
      </div>
    </div>
  );
  const fetchSuggestionData = async () => {
    try {
      setLoading(true);
      let countWeekImpression = [...defaultDayCount];
      let countMonthImpression = [...defaultMonthCount];

      let countWeekView = [...defaultDayCount];
      let countMonthView = [...defaultMonthCount];

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
              item?.weeklyImpressionValues?.map((iValue, iKey) => {
                countWeekImpression[iKey] += iValue;
              });
              setWeeklyImpressionCount(countWeekImpression);

              item?.monthlyImpressionValues?.map((iValue, iKey) => {
                countMonthImpression[iKey] += iValue;
              });
              setMonthlyImpressionCount(countMonthImpression);

              item?.weeklyViewValues?.map((iValue, iKey) => {
                countWeekView[iKey] += iValue;
              });
              setWeeklyViewCount(countWeekView);

              item?.monthlyViewValues?.map((iValue, iKey) => {
                countMonthView[iKey] += iValue;
              });
              setMonthlyViewCount(countMonthView);

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
                const num = parseFloat(item?.campaignResult?.conversions_rate);
                comCount = parseFloat(comCount) + num;
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

  useEffect(() => {
    fetchSuggestionData();
  }, []);

  const changeAppliedStatus = async (problemId, statementId, currentStatus) => {
    try {
      const result = await FormSubmitHandler({
        method: "post",
        url: `suggestion/service-status`,
        data: {
          pid: problemId,
          sid: statementId,
        },
      });
      if (result.success) {
        setToggleState((prevState) => ({
          ...prevState,
          [`${problemId}-${statementId}`]: !currentStatus, // Toggle the current state
        }));
      }
    } catch (error) {
      console.error("Error in toggling status: ", error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mb-25">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Campaigns</h1>
        <div className="grid grid-cols-4 gap-4">
          {renderCampaignBox("Impressions", impressionCount)}
          {renderCampaignBox("Clicks", clickCount)}
          {renderCampaignBox("Conversions Rate", conversionCount)}
          {renderCampaignBox("Views", viewCount)}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <SalesLineGraph
            salesLineData={weeklyImpressionCount}
            lineCategories={[...defaultDayName]}
            lineyAxisTitle="Impression counts"
            title="Weekly impression charts"
            tooltipTitle="Impression"
          />
          <SalesBarGraph
            salesBarData={monthlyImpressionCount}
            barCategories={[...defaultMonthName]}
            baryAxisTitle="Impression counts"
            title="Monthly impression charts"
            tooltipTitle="Impression"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <SalesLineGraph
            salesLineData={weeklyViewCount}
            lineCategories={[...defaultDayName]}
            lineyAxisTitle="View counts"
            title="Weekly view charts"
            tooltipTitle="View"
          />
          <SalesBarGraph
            salesBarData={monthlyViewCount}
            barCategories={[...defaultMonthName]}
            baryAxisTitle="View counts"
            title="Monthly view charts"
            tooltipTitle="View"
          />
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

          {productData?.map((product) => {
            const currentStatus =
              toggleState[`${product?.pid}-${product?.sid}`] ??
              product?.service_status;

            return (
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
                    enabled={currentStatus}
                    isLabel={false}
                    label={`${product?.pid}-${product?.sid}`}
                    cursorStyle="default"
                    onToggle={() =>
                      changeAppliedStatus(
                        product?.pid,
                        product?.sid,
                        currentStatus
                      )
                    }
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
                    {product?.title
                      ?.replace(/-/g, " ")
                      .replace(
                        /\w\S*/g,
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )}
                  </h1>
                </div>
                {[
                  "impressions",
                  "conversions",
                  "conversions_rate",
                  // "date_created",
                ].map((key, index) => (
                  <div className="col-span-1 flex items-center" key={index}>
                    <p className="text-md font-bold">
                      {key == "conversions_rate"
                        ? product.campaignResult[key] + "%"
                        : product.campaignResult[key]}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <Support />
      </div>
    </>
  );
};

export default Campaigns;
