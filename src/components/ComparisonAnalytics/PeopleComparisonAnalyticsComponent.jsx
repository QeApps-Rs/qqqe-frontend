/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import Loader from "../../common/Loader";
import ColumnChart from "../Charts/ColumnChart";
import OneTimeMultiTimeCustomer from "../Charts/OnetimeMultiTimeCustomer";
import FormSubmitHandler from "../FormSubmitHandler";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import NeedHelpPage from "../NeedHelp";
import PieChart from "../Charts/PieChart";
import MobileUsersChart from "../Charts/MobileUserChart";
import DesktopUsersChart from "../Charts/DesktopUserChart";
import PyramidBarChart from "../Charts/PyramidBarChart";
import GradientLineChart from "../Charts/GradientLineChart";
import LineMultiSeriesChart from "../Charts/LineMultiSeriesChart";
import ColumnMultiSeriesChartOrder from "../Charts/ColumnMultiSeriesChartOrder";
import MultiSeriesLineChart from "../Charts/MultiSeriesLineChart";
import LocationCountChart from "../Charts/LocationCountChart";

const PeopleDetailedAnalytics = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);
  const [isBeforeDetails, setIsBeforeDetails] = useState({
    dateFilterType: "before",
    date: "2024-10-15",
  });
  const handleTabClick = (tab) => {
    setIsBeforeDetails({
      ...isBeforeDetails,
      dateFilterType: tab,
    });
  };
  const [graphData, setGraphData] = useState({
    visitorsData: [],
    beforeTotalOrderData: {},
    afterTotalOrderData: {},
    beforeTotalSalesData: {},
    afterTotalSalesData: {},
    beforeMobileUserData: {},
    afterMobileUserData: {},
    beforeDesktopUserData: {},
    afterDesktopUserData: {},
    beforeLocationWiseData: {},
    afterLocationWiseData: {},
    beforeTimeCustomersData: {},
    afterTimeCustomersData: {},
    afterCountryWiseCustomerData: {},
    beforeCountryWiseCustomerData: {},
    afterMostVisitedProducts: [],
    beforeMostVisitedProducts: [],
    afterMostVisitedCategoriesData: [],
    beforeMostVisitedCategoriesData: [],
    mostVisitedPagesData: [],
  });

  const defaultState = {
    beforeTotalSalesGraphState: false,
    afterTotalSalesGraphState: false,
    beforeTotalOrderGraphState: false,
    afterTotalOrderGraphState: false,
    afterMobileUserGraphState: false,
    beforeMobileUserGraphState: false,
    afterDesktopUserGraphState: false,
    beforeDesktopUserGraphState: false,
    afterLocationWiseGraphState: false,
    beforeLocationWiseGraphState: false,
    afterTimeCustomersGraphState: false,
    beforeTimeCustomersGraphState: false,
    afterCountryWiseCustomerGraphState: false,
    beforeCountryWiseCustomerGraphState: false,
    afterMostVisitedProductsGraphState: false,
    beforeMostVisitedProductsGraphState: false,
    afterMostVisitedCategoriesGraphState: false,
    beforeMostVisitedCategoriesGraphState: false,
  };

  const [chartState, setChartState] = useState(defaultState);

  // Reusable function to handle fetching and updating state
  const fetchDataHandler = async (
    url,
    dataKey,
    graphState,
    isBefore = true
  ) => {
    try {
      const response = await FormSubmitHandler({ method: "get", url });
      if (response.success) {
        // const dataKeyWithPrefix = `${dataKey}${isBefore ? "Before" : "After"}`;

        if (dataKey === "visitorsData") {
          // Handle visitorsData
          let visitorsData = [];
          response?.data?.store_event?.forEach((item) => {
            if (item?.data) {
              const parsedItems = JSON.parse(item?.data);
              visitorsData.push(...parsedItems);
            }
          });

          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data,
          }));
        } else if (dataKey === "beforeCountryWiseCustomerData") {
          // Handle country-wise customer data
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.countryWiseCustomerData,
          }));
        } else if (dataKey === "afterCountryWiseCustomerData") {
          // Handle country-wise customer data
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.countryWiseCustomerData,
          }));
        } else if (dataKey == "beforeMostVisitedProducts") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.mostVisitedProducts,
          }));
        } else if (dataKey == "afterMostVisitedProducts") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.mostVisitedProducts,
          }));
        } else if (dataKey == "beforeMostVisitedCategoriesData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.most_visited_categories,
          }));
        } else if (dataKey == "afterMostVisitedCategoriesData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.most_visited_categories,
          }));
        } else if (dataKey === "mostVisitedPagesData") {
          // Handle most visited pages
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.most_visited_pages,
          }));
        } else {
          // Handle other data types
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data,
          }));
        }

        // Update chart state
        if (graphState) {
          setChartState((prevState) => ({
            ...prevState,
            [graphState]: true,
          }));
        }
      }
    } catch (error) {
      console.error(`Error fetching ${dataKey}:`, error);
    }
  };


  // Fetch and update data based on the active tab
  const fetchTabData = async () => {
    setLoading(true);

    try {
      if (isBeforeDetails.dateFilterType === "before") {
        const response = await Promise.all([
          fetchDataHandler(
            `new/oneTime/customer/count?date=${isBeforeDetails?.date}&dateFilterType=before`,
            "beforeTimeCustomersData",
            "beforeTimeCustomersGraphState",
            true
          ),
          fetchDataHandler(
            `new/country/customer/count?date=${isBeforeDetails?.date}&dateFilterType=before`,
            "beforeCountryWiseCustomerData",
            "beforeCountryWiseCustomerGraphState",
            true
          ),
          fetchDataHandler(
            `new/device/mobile/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "beforeMobileUserData",
            "beforeMobileUserGraphState",
            true
          ),
          fetchDataHandler(
            `new/device/desktop/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "beforeDesktopUserData",
            "beforeDesktopUserGraphState",
            true
          ),
          fetchDataHandler(
            `new/location/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "beforeLocationWiseData",
            "beforeLocationWiseGraphState",
            true
          ),
          fetchDataHandler(
            `new/mostVisited/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "beforeMostVisitedProducts",
            "beforeMostVisitedProductsGraphState",
            true
          ),
          fetchDataHandler(
            `new/mostVisited/categories/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "beforeMostVisitedCategoriesData",
            "beforeMostVisitedCategoriesGraphState",
            true
          ),
          fetchDataHandler(
            `new/order/sales/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "beforeTotalSalesData",
            "beforeTotalSalesGraphState",
            true
          ),
          fetchDataHandler(
            `new/order/averageSales/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "beforeTotalOrderData",
            "beforeTotalOrderGraphState",
            true
          ),
          // Add additional "before" API calls here
        ]);
        // setBeforeData(...beforeData, response);
        setIsBeforeDetails({
          ...isBeforeDetails,
          dateFilterType: "after",
        });
      } else {
        const response = await Promise.all([
          fetchDataHandler(
            `new/oneTime/customer/count?date=${isBeforeDetails?.date}&dateFilterType=after`,
            "afterTimeCustomersData",
            "afterTimeCustomersGraphState",
            false
          ),
          fetchDataHandler(
            `new/country/customer/count?date=${isBeforeDetails?.date}&dateFilterType=after`,
            "afterCountryWiseCustomerData",
            "afterCountryWiseCustomerGraphState",
            false
          ),
          fetchDataHandler(
            `new/device/mobile/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "afterMobileUserData",
            "afterMobileUserGraphState",
            false
          ),
          fetchDataHandler(
            `new/device/desktop/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "afterDesktopUserData",
            "afterDesktopUserGraphState",
            false
          ),
          fetchDataHandler(
            `new/location/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "afterLocationWiseData",
            "afterLocationWiseGraphState",
            false
          ),
          fetchDataHandler(
            `new/mostVisited/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "afterMostVisitedProducts",
            "afterMostVisitedProductsGraphState",
            false
          ),
          fetchDataHandler(
            `new/mostVisited/categories/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "afterMostVisitedCategoriesData",
            "afterMostVisitedCategoriesGraphState",
            false
          ),
          fetchDataHandler(
            `new/order/sales/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "afterTotalSalesData",
            "afterTotalSalesGraphState",
            false
          ),
          fetchDataHandler(
            `new/order/averageSales/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "afterTotalOrderData",
            "afterTotalSalesGraphState",
            true
          ),
          // Add additional "after" API calls here
        ]);
        // setAfterData(...afterData, response);
      }
    } catch (error) {
      console.error("Error fetching tab data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabData();
  }, [isBeforeDetails]);
  //END BEFORE/AFTER GRAPH CODE//

  const DashboardTitle = ({ title }) => {
    return (
      <div className="min-h-16 bg-dashboard_gradient rounded-t-lg flex justify-between items-center px-4">
        <p className="text-white font-bold flex items-center h-full ">
          {title}
        </p>
        <div className="text-white text-xl hover:bg-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
          <i className="fa fa-exclamation" aria-hidden="true"></i>
        </div>
      </div>
    );
  };


  const colSixGraph =
    "col-span-12 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark p-4 hover:shadow-xl transition-shadow duration-300 xl:col-span-6 min-h-[450px]";
  const NoDataFound = () => (
    <div className="h-[calc(100%-70px)] flex flex-col justify-center items-center text-center text-red-500">
      <i className="fa fa-exclamation-triangle text-4xl mb-2"></i>{" "}
      {/* Example using Font Awesome */}
      <p className="font-bold text-lg">No data available</p>
      <p className="text-gray-500 text-sm mt-1">
        Please check back later or adjust your filters.
      </p>
    </div>
  );
  return (
    <div className="mb-10">
      {loading && <Loader />}
      <div className="w-full justify-center flex items-center mb-6">
        <i
          className="fa fa-bar-chart fa fa-home text-[14px] bg-[#3292a9] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center"
          aria-hidden="true"
        ></i>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white pl-2">
          Compare Analytics For People
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className={colSixGraph}>
          <DashboardTitle title="Before One Time & Multi Time Customer" />
          {chartState?.beforeTimeCustomersGraphState ? (
            <OneTimeMultiTimeCustomer
              customerData={graphData.beforeTimeCustomersData}
            />
          ) : (
            <NoDataFound />
          )}
        </div>

        <div className={colSixGraph}>
          <DashboardTitle title="After One Time & Multi Time Customer" />
          {chartState?.afterTimeCustomersGraphState ? (
            <OneTimeMultiTimeCustomer
              customerData={graphData.afterTimeCustomersData}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"Before Country Wise User"} />

          {chartState?.beforeCountryWiseCustomerGraphState == true ? (
            <PieChart
              chartData={graphData?.beforeCountryWiseCustomerData}
              colors={graphData?.beforeCountryWiseCustomerData?.colors}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"After Country Wise User"} />

          {chartState?.afterCountryWiseCustomerGraphState == true ? (
            <PieChart
              chartData={graphData?.afterCountryWiseCustomerData}
              colors={graphData?.afterCountryWiseCustomerData?.colors}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"Before Mobile User"} />

          {chartState?.beforeMobileUserGraphState == true ? (
            <MobileUsersChart orderData={graphData?.beforeMobileUserData} />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"After Mobile User"} />

          {chartState?.afterMobileUserGraphState == true ? (
            <MobileUsersChart orderData={graphData?.afterMobileUserData} />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"Before Desktop User"} />

          {chartState?.beforeDesktopUserGraphState == true ? (
            <DesktopUsersChart orderData={graphData?.beforeDesktopUserData} />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"After Desktop User"} />

          {chartState?.afterDesktopUserGraphState == true ? (
            <DesktopUsersChart orderData={graphData?.afterDesktopUserData} />
          ) : (
            <NoDataFound />
          )}
        </div>

        <div className={colSixGraph}>
          <DashboardTitle title={"Before Location Wise User"} />

          {chartState?.beforeLocationWiseGraphState == true ? (
            <LocationCountChart
              locationData={graphData?.beforeLocationWiseData}
            />
          ) : (
            <NoDataFound />
          )}
        </div>

        <div className={colSixGraph}>
          <DashboardTitle title={"After Location Wise User"} />

          {chartState?.afterLocationWiseGraphState == true ? (
            <LocationCountChart
              locationData={graphData?.afterLocationWiseData}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"Before Most Visited Products"} />

          {chartState?.beforeMostVisitedProductsGraphState == true ? (
            <PyramidBarChart data={graphData?.beforeMostVisitedProducts} />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"After Most Visited Products"} />

          {chartState?.afterMostVisitedProductsGraphState == true ? (
            <PyramidBarChart data={graphData?.afterMostVisitedProducts} />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"Before Most Visited Categories"} />
          {chartState?.beforeMostVisitedCategoriesGraphState == true ? (
            <GradientLineChart
              data={graphData?.beforeMostVisitedCategoriesData}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"After Most Visited Categories"} />
          {chartState?.afterMostVisitedCategoriesGraphState == true ? (
            <GradientLineChart
              data={graphData?.afterMostVisitedCategoriesData}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"Before Total & Average Sales (Monthly)"} />

          {chartState?.beforeTotalSalesGraphState == true ? (
            <LineMultiSeriesChart
              salesData={
                graphData?.beforeTotalSalesData?.monthSalesData?.chart_data
              }
              dateRange={Object.keys(
                graphData?.beforeTotalSalesData?.monthSalesData?.chart_data
              )}
              isToday={false}
              color={["#008FFB", "#FF4560"]}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"After Total & Average Sales (Monthly)"} />

          {chartState?.afterTotalSalesGraphState == true ? (
            <LineMultiSeriesChart
              salesData={
                graphData?.afterTotalSalesData?.monthSalesData?.chart_data
              }
              dateRange={Object.keys(
                graphData?.afterTotalSalesData?.monthSalesData?.chart_data
              )}
              isToday={false}
              color={["#008FFB", "#FF4560"]}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"Before Total & Average Sales (Yearly)"} />

          {chartState?.beforeTotalSalesGraphState == true ? (
            <LineMultiSeriesChart
              salesData={
                graphData?.beforeTotalSalesData?.yearSalesData?.chart_data
              }
              dateRange={Object.keys(
                graphData?.beforeTotalSalesData?.yearSalesData?.chart_data
              )}
              isToday={false}
              color={["#775DD0", "#FEB019"]}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle title={"After Total & Average Sales (Yearly)"} />

          {chartState?.afterTotalSalesGraphState == true ? (
            <LineMultiSeriesChart
              salesData={
                graphData?.afterTotalSalesData?.yearSalesData?.chart_data
              }
              dateRange={Object.keys(
                graphData?.afterTotalSalesData?.yearSalesData?.chart_data
              )}
              isToday={false}
              color={["#775DD0", "#FEB019"]}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle
            title={"Before Total & Average Order Count (Monthly)"}
          />

          {chartState?.beforeTotalOrderGraphState == true &&
          Object.keys(graphData?.beforeTotalOrderData).length > 0 ? (
            <MultiSeriesLineChart
              orderData={
                graphData?.beforeTotalOrderData?.monthlySalesResponse
                  ?.chart_data
              }
              dateRange={Object.keys(
                graphData?.beforeTotalOrderData?.monthlySalesResponse
                  ?.chart_data
              )}
              isToday={false}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={colSixGraph}>
          <DashboardTitle
            title={"After Total & Average Order Count (Monthly)"}
          />

          {chartState?.afterTotalSalesGraphState == true &&
          Object.keys(graphData.afterTotalOrderData).length > 0 ? (
            <MultiSeriesLineChart
              orderData={
                graphData?.afterTotalOrderData?.monthlySalesResponse?.chart_data
              }
              dateRange={Object.keys(
                graphData?.afterTotalOrderData?.monthlySalesResponse?.chart_data
              )}
              isToday={false}
            />
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailedAnalytics;
