/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import Loader from "../../common/Loader";
import RadarChart from "../Charts/RadarChart";
import AreaChart from "../Charts/AreaChart";
import ColumnChart from "../Charts/ColumnChart";
import ColumnMultiSeriesChartOrder from "../Charts/ColumnMultiSeriesChartOrder";
import MobileUsersChart from "../Charts/MobileUserChart";
import DesktopUsersChart from "../Charts/DesktopUserChart";
import LocationCountChart from "../Charts/LocationCountChart";
import PieChart from "../Charts/PieChart";
import OneTimeMultiTimeCustomer from "../Charts/OnetimeMultiTimeCustomer";
import LineMultiSeriesChart from "../Charts/LineMultiSeriesChart";
import MultiSeriesLineChart from "../Charts/MultiSeriesLineChart";
import LineChartDashedData from "../Charts/LineChartMissingData";
import ColumnMultiSeriesChart from "../Charts/ColumnMultiSeriesChart";
import PyramidBarChart from "../Charts/PyramidBarChart";
import PolarAreaChart from "../Charts/PolarAreaChart";
import RangeBarChart from "../Charts/RangeBarChart";
import PatternedDonutChart from "../Charts/PatternedDonutChart";
import RadialBarChart from "../Charts/RadialBarChart";
import GradientLineChart from "../Charts/GradientLineChart";
import DataBarChart from "../Charts/DataBarChart";
import CustomerDistributionChart from "../Charts/CustomerDistributionChart";
import CustomerPolarAreaChart from "../Charts/CustomerPolarChart";
import DumbbellRangebarChart from "../Charts/DumbelledRangebar";
import FormSubmitHandler from "../FormSubmitHandler";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import PolarAnalytics from "../Analytics/PolarAnalaytics";
import { Link, Navigate } from "react-router-dom";
import LessTimeChart from "../Charts/LessTimeChart";
import CustomerLostTrackChart from "../Charts/CustomerLostTrackChart";
import AbandonOrderSale from "../Charts/AbandonOrderSale";
import AbandonProductChart from "../Charts/AbandonProductChart";
import TotalTimeSpentChart from "../Charts/TotalTimeSpent";
import MoreTimeChart from "../Charts/MoreLessTimeChart";
import TrackEventChart from "../Charts/TrackEvent";
import CustomerPageFlowChart from "../Charts/CustomerPageFlowCHart";
import PageWiseAvgChart from "../Charts/PageWiseAvgChart";
import AverageTimeSpentWholeSite from "../Charts/AverageTimeSpentWholeSite";
import BookSlotModal from "../BookSlot";
import NeedHelpPage from "../NeedHelp";
import { BackIcon } from "../custIcon/svgIcon";

const PeopleDetailedAnalytics = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);
  const [isBeforeDetails, setIsBeforeDetails] = useState({
    dateFilterType: "before",
    date: "2024-11-18",
  });
  const handleTabClick = (tab) => {
    setIsBeforeDetails({
      ...isBeforeDetails,
      dateFilterType: tab,
    });
  };
  const [graphData, setGraphData] = useState({
    visitorsData: [],
    totalOrderData: {},
    totalSalesData: {},
    mobileUserData: {},
    desktopUserData: {},
    locationWiseData: {},
    timeCustomersData: {},
    countryWiseCustomerData: {},
    mostVisitedProducts: [],
    mostPurchasedProducts: [],
    bestSellingProducts: [],
    mostATCProducts: [],
    customerPageFlowData: [],
    abandonOrderSalesData: [],
    abandonProductsData: {},
    totalPagesTimeSpentData: {},
    mostTimeSpentData: {},
    lessTimeSpentData: {},
    customerDistributionByPageData: {},
    customerLostTrackData: [],
    eventTrackingForClicksData: {},
    mostVisitedCategoriesData: [],
    pageWiseAvgData: {},
    wholeSiteData: {},
    customerBasedOnOrderData: [],
    mostVisitedPagesData: [],
  });

  const defaultState = {
    totalSalesGraphState: false,
    totalOrderGraphState: false,
    mobileUserGraphState: false,
    desktopUserGraphState: false,
    locationWiseGraphState: false,
    timeCustomersGraphState: false,
    countryWiseCustomerGraphState: false,
    mostVisitedProductsGraphState: false,
    mostPurchasedProductsGraphState: false,
    bestSellingProductsGraphState: false,
    mostATCProductsGraphState: false,
    customerPageFlowGraphState: false,
    abandonOrderSalesDataGraphState: false,
    abandonProductsDataGraphState: false,
    totalPagesTimeSpentDataGraphState: false,
    mostTimeSpentDataGraphState: false,
    lessTimeSpentDataGraphState: false,
    customerDistributionByPageDataGraphState: false,
    customerLostTrackDataGraphState: false,
    eventTrackingForClicksGraphState: false,
    mostVisitedCategoriesGraphState: false,
    pageWiseAvgGraphState: false,
    wholeSiteGraphState: false,
    customerBasedOnOrderGraphState: false,
    mostVisitedPagesGraphState: false,
  };

  const [chartState, setChartState] = useState(defaultState);

  // Reusable function to handle fetching and updating state
  const fetchDataHandler = async (url, dataKey, graphState) => {
    try {
      const response = await FormSubmitHandler({ method: "get", url });
      if (response.success) {
        if (dataKey == "visitorsData") {
          let visitorsData = [];
          response?.data?.store_event?.map((item) => {
            if (item?.data) {
              let parseItem = JSON.parse(item?.data);
              parseItem.map((item) => {
                visitorsData.push(item);
              });
            }
            setGraphData((prevState) => ({
              ...prevState,
              [dataKey]: visitorsData,
            }));
          });
        } else if (dataKey == "countryWiseCustomerData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.countryWiseCustomerData,
          }));
        } else if (dataKey == "mostVisitedProducts") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.mostVisitedProducts,
          }));
        } else if (dataKey == "customerPageFlowData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.page_flow,
          }));
        } else if (dataKey == "abandonProductsData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.abandon_checkout_products,
          }));
        } else if (dataKey == "mostVisitedCategoriesData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.most_visited_categories,
          }));
        } else if (dataKey == "mostVisitedPagesData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.most_visited_pages,
          }));
        } else {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data,
          }));
        }
        setChartState((prevState) => ({
          ...prevState,
          [graphState]: true,
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${dataKey}:`, error);
    }
  };

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await Promise.all([
          fetchDataHandler(
            `customerJourney?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "visitorsData",
            null
          ),
          fetchDataHandler(
            `new/order/sales/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "totalSalesData",
            "totalSalesGraphState"
          ),
          fetchDataHandler(
            `new/order/averageSales/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "totalOrderData",
            "totalOrderGraphState"
          ),
          fetchDataHandler(
            `new/device/mobile/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mobileUserData",
            "mobileUserGraphState"
          ),
          fetchDataHandler(
            `new/device/desktop/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "desktopUserData",
            "desktopUserGraphState"
          ),
          fetchDataHandler(
            `new/location/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "locationWiseData",
            "locationWiseGraphState"
          ),
          fetchDataHandler(
            `new/oneTime/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "timeCustomersData",
            "timeCustomersGraphState"
          ),
          fetchDataHandler(
            `new/country/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "countryWiseCustomerData",
            "countryWiseCustomerGraphState"
          ),
          fetchDataHandler(
            `new/mostVisited/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostVisitedProducts",
            "mostVisitedProductsGraphState"
          ),
          fetchDataHandler(
            `new/mostPurchased/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostPurchasedProducts",
            "mostPurchasedProductsGraphState"
          ),
          fetchDataHandler(
            `new/bestSelling/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "bestSellingProducts",
            "bestSellingProductsGraphState"
          ),
          fetchDataHandler(
            `new/mostATC/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostATCProducts",
            "mostATCProductsGraphState"
          ),
          fetchDataHandler(
            `new/pageFlow/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "customerPageFlowData",
            "customerPageFlowGraphState"
          ),
          fetchDataHandler(
            `new/abandonCheckout/orderSales/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "abandonOrderSalesData",
            "abandonOrderSalesDataGraphState"
          ),
          fetchDataHandler(
            `new/abandonCheckout/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "abandonProductsData",
            "abandonProductsDataGraphState"
          ),
          fetchDataHandler(
            `new/TotalTime/pages/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "totalPagesTimeSpentData",
            "totalPagesTimeSpentDataGraphState"
          ),
          fetchDataHandler(
            `new/mostTime/pages/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostTimeSpentData",
            "mostTimeSpentDataGraphState"
          ),
          fetchDataHandler(
            "new/lessTime/pages/count",
            "lessTimeSpentData",
            "lessTimeSpentDataGraphState"
          ),
          fetchDataHandler(
            `new/distributionPage/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "customerDistributionByPageData",
            "customerDistributionByPageDataGraphState"
          ),
          fetchDataHandler(
            `new/lostTracking/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "customerLostTrackData",
            "customerLostTrackDataGraphState"
          ),
          fetchDataHandler(
            `new/event/tracking/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "eventTrackingForClicksData",
            "eventTrackingForClicksGraphState"
          ),
          fetchDataHandler(
            `new/mostVisited/categories/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostVisitedCategoriesData",
            "mostVisitedCategoriesGraphState"
          ),
          fetchDataHandler(
            `new/averageTime-spent/pages/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "pageWiseAvgData",
            "pageWiseAvgGraphState"
          ),
          fetchDataHandler(
            `new/averageTime-spent/site/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "wholeSiteData",
            "wholeSiteGraphState"
          ),
          fetchDataHandler(
            "new/customersBasedOnOrder/count",
            "customerBasedOnOrderData",
            "customerBasedOnOrderGraphState"
          ),
          fetchDataHandler(
            `new/mostVisited/pages/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostVisitedPagesData",
            "mostVisitedPagesGraphState"
          ),
        ]);
      } catch (error) {
        console.error("Error in one or more API calls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isBeforeDetails]);

  const filteredData = graphData?.visitorsData.filter((item) =>
    item.timestamp.startsWith(todayStr)
  );

  const timestamps = filteredData.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );

  const timeCountMap = timestamps.reduce((acc, time) => {
    acc[time] = (acc[time] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(timeCountMap);

  const visitorData = Object.values(timeCountMap);

  const series = [
    {
      name: "Visitors",
      data: visitorData,
    },
  ];

  //weekly visitor
  const getVisitorsForCurrentWeeks = (weekCount) => {
    const visitorsMap = {};
    const allDates = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Current month (0-11)
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = endOfMonth.getDate();
    const totalWeeks = Math.ceil(totalDays / 7);

    // Ensure weekCount does not exceed totalWeeks
    weekCount = Math.min(weekCount, totalWeeks);

    for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
      const weekStartDay = weekIndex * 7 + 1;
      const weekEndDay = Math.min(weekStartDay + 6, totalDays);

      for (let day = weekStartDay; day <= weekEndDay; day++) {
        const date = new Date(currentYear, currentMonth, day);
        allDates.push(date.toLocaleDateString());

        const dailyData = graphData?.visitorsData.filter((item) => {
          const timestamp = new Date(item.timestamp);
          return timestamp.toLocaleDateString() === date.toLocaleDateString();
        });

        visitorsMap[date.toLocaleDateString()] = dailyData.length;
      }
    }

    // Handle remaining days if weekCount is 5
    if (weekCount === 5) {
      const remainingStartDay = 29; // Start from the 29th
      for (let day = remainingStartDay; day <= totalDays; day++) {
        const date = new Date(currentYear, currentMonth, day);
        allDates.push(date.toLocaleDateString());

        const dailyData = graphData?.visitorsData.filter((item) => {
          const timestamp = new Date(item.timestamp);
          return timestamp.toLocaleDateString() === date.toLocaleDateString();
        });

        visitorsMap[date.toLocaleDateString()] = dailyData.length;
      }
    }

    const resultDates = allDates;
    const resultData = resultDates.map((date) => visitorsMap[date] || 0);

    return {
      categories: resultDates,
      data: resultData,
    };
  };

  const weekCount = 1; // Number of weeks to show
  const { categories: weekCategories, data: weekData } =
    getVisitorsForCurrentWeeks(weekCount);

  const weekSeries = [
    {
      name: "Visitors",
      data: weekData,
    },
  ];

  // Calculate total visitors  monthly
  const getVisitorsForCurrentMonths = (monthCount) => {
    const visitorsMap = {};
    const allMonths = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < monthCount; i++) {
      const monthIndex = i;
      const monthStart = new Date(currentYear, monthIndex, 1);
      const monthEnd = new Date(currentYear, monthIndex + 1, 0);

      // Get all data for the current month
      const monthlyData = graphData?.visitorsData.filter((item) => {
        const timestamp = new Date(item.timestamp);
        return timestamp >= monthStart && timestamp <= monthEnd;
      });

      const monthName = monthStart.toLocaleString("default", { month: "long" });
      allMonths.push(monthName);

      // Count visitors for the month
      visitorsMap[monthName] = monthlyData.length;
    }

    return {
      categories: allMonths,
      data: Object.values(visitorsMap),
    };
  };

  const monthCount = 12; // Number of months to show
  const { categories: monthCategories, data: monthData } =
    getVisitorsForCurrentMonths(monthCount);

  const monthSeries = [
    {
      name: "Visitors",
      data: monthData,
    },
  ];

  //year
  const getVisitorsForCurrentYears = (yearCount) => {
    const visitorsMap = {};
    const allYears = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < yearCount; i++) {
      const year = currentYear - i;
      allYears.push(year);

      const yearlyData = graphData?.visitorsData.filter((item) => {
        const timestamp = new Date(item.timestamp);
        return timestamp.getFullYear() === year;
      });
      visitorsMap[year] = yearlyData.length;
    }

    return {
      categories: allYears,
      data: allYears.map((year) => visitorsMap[year] || 0),
    };
  };

  const yearCount = 2; // Number of years to show
  const { categories: yearCategories, data: yearData } =
    getVisitorsForCurrentYears(yearCount);

  const chartData = {
    categories: yearCategories,
    seriesData: [
      {
        name: "Visitors",
        data: yearData,
      },
    ],
    xtitle: "Year",
    ytitle: "Number of Visitors",
  };

  //////////         for sales   and orders        ////////////////

  ///////////////////////   products   ///////////////////////

  const [visitedSelectedFilter, setVisitedSelectedFilter] = useState(5); // Default to "Top 5"

  const filterTopVisitedProducts = (data, limit) => {
    return data.slice(0, limit);
  };

  // Get the filtered data (either Top 5 or Top 10)
  const filteredVisitedProducts = filterTopVisitedProducts(
    graphData?.mostVisitedProducts,
    visitedSelectedFilter
  );

  // Create combined data for categories and pages
  const getFilteredData = (data, topCount) => {
    return data
      .sort(
        (a, b) =>
          (b.category_count || b.page_count || b.product_count) -
          (a.category_count || a.page_count || a.product_count)
      )
      .slice(0, topCount);
  };

  const filteredCategories = getFilteredData(
    // most_visited_categories,
    graphData?.mostVisitedCategoriesData,
    visitedSelectedFilter
  );
  const filteredPages = getFilteredData(
    // most_visited_pages,
    graphData?.mostVisitedPagesData,
    visitedSelectedFilter
  );

  // Prepare combined data for the chart
  const combinedData = [];
  const maxLength = Math.max(
    filteredCategories.length,
    filteredPages.length,
    filteredVisitedProducts?.length
  );

  for (let i = 0; i < maxLength; i++) {
    const category = filteredCategories[i];
    const page = filteredPages[i];
    const product = filteredVisitedProducts[i];

    // Create a combined entry for each set
    combinedData.push({
      name: category ? category.category_name : "",
      category_count: category ? category.category_count : 0,
      page_name: page ? page.page_name : "",
      page_count: page ? page.page_count : 0,
      product_name: product ? product.product_name : "",
      product_count: product ? product.product_count : 0,
    });
  }

  const seriesCombined = [
    {
      name: "Most Visited Products",
      data: combinedData.map((item) => item.product_count),
    },
    {
      name: "Most Visited Categories",
      data: combinedData.map((item) => item.category_count),
    },
    {
      name: "Most Visited Pages",
      data: combinedData.map((item) => item.page_count),
    },
  ];

  // Create xAxis categories for display
  const xAxisCategories = combinedData.map((item) => {
    return `${item.product_name}, ${item.name}, ${item.page_name} `;
  });

  // Handle change when the user selects a different filter (Top 5 or Top 10)
  const handleVisitedFilterChange = (e) => {
    setVisitedSelectedFilter(Number(e.target.value));
  };

  const [filterType, setFilterType] = useState("Top 3");

  // Filter customer data based on the selected filter type
  const customerFilteredData = () => {
    let data = [...graphData?.customerBasedOnOrderData].sort(
      (a, b) => b.orderCount - a.orderCount
    ); // Sort in descending order
    if (filterType === "Top 3") {
      return data.slice(0, 3); // Get top 3
    } else if (filterType === "Top 5") {
      return data.slice(0, 5); // Get top 5
    } else {
      return data.slice(0, 10); // Get top 10 (default)
    }
  };

  const filteredCustomerData = customerFilteredData();

  // Extract series (order counts) and labels (customer names) from filtered data
  const seriesCustomer = filteredCustomerData.map(
    (customer) => customer.orderCount
  );
  const labels = filteredCustomerData.map((customer) => customer.customerName);

  const customerPageViewData = [
    {
      entryPage: "home",
      exitPage: "cart",
    },
    {
      entryPage: "product",
      exitPage: "collection",
    },
    {
      entryPage: "home",
      exitPage: "pages",
    },
    {
      entryPage: "collection",
      exitPage: "product",
    },
    {
      entryPage: "cart",
      exitPage: "pages",
    },

    {
      entryPage: "home",
      exitPage: "cart",
    },
    {
      entryPage: "product",
      exitPage: "cart",
    },
    {
      entryPage: "home",
      exitPage: "pages",
    },
    {
      entryPage: "collection",
      exitPage: "cart",
    },
    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },
    {
      entryPage: "product",
      exitPage: "cart",
    },
    {
      entryPage: "collection",
      exitPage: "pages",
    },
    {
      entryPage: "pages",
      exitPage: "cart",
    },
    {
      entryPage: "home",
      exitPage: "collection",
    },

    {
      entryPage: "home",
      exitPage: "cart",
    },
    {
      entryPage: "product",
      exitPage: "collection",
    },

    {
      entryPage: "home",
      exitPage: "pages",
    },
    {
      entryPage: "collection",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },

    {
      entryPage: "home",
      exitPage: "cart",
    },
    {
      entryPage: "product",
      exitPage: "collection",
    },

    {
      entryPage: "home",
      exitPage: "pages",
    },
    {
      entryPage: "collection",
      exitPage: "product",
    },

    {
      entryPage: "cart",
      exitPage: "pages",
    },
    {
      entryPage: "home",
      exitPage: "product",
    },
    {
      entryPage: "product",
      exitPage: "cart",
    },

    {
      entryPage: "collection",
      exitPage: "pages",
    },
    {
      entryPage: "pages",
      exitPage: "cart",
    },
  ];

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

  const colFullWidthGraph =
    "col-span-12 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark p-4 hover:shadow-xl transition-shadow duration-300 xl:col-span-12 min-h-[450px]";

  const colFourGraph =
    "col-span-12 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark p-4 hover:shadow-xl transition-shadow duration-300 xl:col-span-4 min-h-[450px]";

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
console.log('graphData?.totalOrderData', graphData?.totalOrderData)
  return (
    <>
      {loading && <Loader />}

      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-15">
        <ScrollAnimation
          animateIn="animate__fadeInUp"
          animateOut="animate__fadeOut"
          duration={1}
          delay={300}
          offset={100}
          animateOnce={true}
        >
          {" "}
          <div className="w-full flex flex-wrap">
            <div className="sm:w-1/2 w-full flex items-center  sm:justify-end justify-center">
              <div className="flex items-center">
                <i
                  className="fa fa-bar-chart fa fa-home text-[14px] bg-[#3292a9] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center"
                  aria-hidden="true"
                ></i>
              </div>
              <h2 className="text-title-md2 font-semibold text-black dark:text-white pl-2">
                Analytics
              </h2>
            </div>
            <div className="sm:w-1/2 w-full sm:mt-0 mt-4 flex justify-end">
              <button
                onClick={() => handleTabClick("before")}
                className={`px-5 py-3 font-semibold text-black rounded-lg mx-2 transition-all duration-300 ${
                  isBeforeDetails.dateFilterType === "before"
                    ? "bg-dashboard_gradient text-white shadow-lg transform scale-105"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Before
              </button>
              <button
                onClick={() => handleTabClick("after")}
                className={`px-5 py-3 font-semibold text-black rounded-lg mx-2 transition-all duration-300 ${
                  isBeforeDetails.dateFilterType === "after"
                    ? "bg-dashboard_gradient text-white shadow-lg transform scale-105"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                After
              </button>
            </div>
          </div>
          <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>
          <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"One Time & Multi Time Customer"} />

              {chartState?.timeCustomersGraphState == true ? (
                <OneTimeMultiTimeCustomer
                  customerData={graphData?.timeCustomersData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFourGraph}>
              <DashboardTitle title={"Total Visitors Today"} />

              {filteredData.length > 0 ? (
                <RadarChart series={series} categories={categories} />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFourGraph}>
              <DashboardTitle title={"Total Visitors Monthly"} />
              {monthData.length > 0 ? (
                <LineChart
                  series={monthSeries}
                  categories={monthCategories}
                  yAxisTitle="Number Of Visitors"
                  xAxisTitle="Months"
                  color="green"
                  curve="smooth"
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFourGraph}>
              <DashboardTitle title={"Total Visitors Yearly"} />

              {yearData.length > 0 ? (
                <ColumnChart chartData={chartData} />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Total Visitors Weekly"} />
              {weekData.length > 0 ? (
                <AreaChart
                  series={weekSeries}
                  categories={weekCategories}
                  yAxisTitle="Number Of Visitor"
                  xAxisTitle="Date Of Week"
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Total & Average Order Count (Yearly)"} />

              {chartState?.totalOrderGraphState == true ? (
                <ColumnMultiSeriesChartOrder
                  orderData={
                    graphData?.totalOrderData?.yearlySalesResponse?.chart_data
                  }
                  dateRange={Object.keys(
                    graphData?.totalOrderData?.yearlySalesResponse?.chart_data
                  )}
                  isToday={false}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            {/* <div className={colFourGraph}>
              <DashboardTitle title={"Total & Average Sales (Today)"} />
              {chartState?.totalSalesGraphState == true ? (
                <ColumnMultiSeriesChart
                  salesData={graphData?.totalSalesData?.TodaySales}
                  dateRange={[
                    graphData?.totalSalesData?.TodaySales?.start_date,
                  ]}
                  isToday={true}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFourGraph}>
              <DashboardTitle title={"Total & Average Sales (Weekly)"} />
              {chartState?.totalOrderGraphState == true &&
              chartState?.totalSalesGraphState == true ? (
                <LineMultiSeriesChart
                  salesData={
                    graphData?.totalSalesData?.weeklySalesResponse?.chart_data
                  }
                  dateRange={Object.keys(
                    graphData?.totalSalesData?.weeklySalesResponse?.chart_data
                  )}
                  isToday={false}
                  color={["#FF4560", "#FF9800"]}
                />
              ) : (
                <NoDataFound />
              )}
            </div> */}
            <div className={colSixGraph}>
              <DashboardTitle title={"Total & Average Sales (Yearly)"} />

              {chartState?.totalOrderGraphState == true &&
              chartState?.totalSalesGraphState == true ? (
                <LineMultiSeriesChart
                  salesData={
                    graphData?.totalSalesData?.yearSalesData?.chart_data
                  }
                  dateRange={Object.keys(
                    graphData?.totalSalesData?.yearSalesData?.chart_data
                  )}
                  isToday={false}
                  color={["#775DD0", "#FEB019"]}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Total & Average Sales (Monthly)"} />

              {chartState?.totalOrderGraphState == true &&
              chartState?.totalSalesGraphState == true ? (
                <LineMultiSeriesChart
                  salesData={
                    graphData?.totalSalesData?.monthSalesData?.chart_data
                  }
                  dateRange={Object.keys(
                    graphData?.totalSalesData?.monthSalesData?.chart_data
                  )}
                  isToday={false}
                  color={["#008FFB", "#FF4560"]}
                />
              ) : (
                <NoDataFound />
              )}
            </div>

            {/* <div className={colFourGraph}>
              <DashboardTitle title={"Total & Average Order Count (Today)"} />

              {chartState?.totalOrderGraphState == true ? (
                <ColumnMultiSeriesChartOrder
                  orderData={graphData?.totalOrderData?.TodaySales}
                  dateRange={[
                    graphData?.totalOrderData?.TodaySales?.start_date,
                  ]}
                  isToday={true}
                />
              ) : (
                <NoDataFound />
              )}
            </div>

            <div className={colFourGraph}>
              <DashboardTitle title={"Total & Average Order Count (Weekly)"} />

              {chartState?.totalOrderGraphState == true ? (
                <LineChartDashedData
                  orderData={
                    graphData?.totalOrderData?.combinedWeeklySalesResponse
                  }
                  dateRange={Object.keys(
                    graphData?.totalOrderData?.combinedWeeklySalesResponse
                      ?.chart_data
                  )}
                  isToday={false}
                />
              ) : (
                <NoDataFound />
              )}
            </div> */}
          
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Total & Average Order Count (Monthly)"} />

              {chartState?.totalSalesGraphState == true &&
              chartState?.totalOrderGraphState == true ? (
                <MultiSeriesLineChart
                  orderData={
                    graphData?.totalOrderData?.monthlySalesResponse?.chart_data
                  }
                  dateRange={Object.keys(
                    graphData?.totalOrderData?.monthlySalesResponse?.chart_data
                  )}
                  isToday={false}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Mobile User"} />

              {chartState?.mobileUserGraphState == true ? (
                <MobileUsersChart orderData={graphData?.mobileUserData} />
              ) : (
                <NoDataFound />
              )}
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Desktop User"} />

              {chartState?.desktopUserGraphState == true ? (
                <DesktopUsersChart orderData={graphData?.desktopUserData} />
              ) : (
                <NoDataFound />
              )}
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Location Wise User"} />

              {chartState?.locationWiseGraphState == true ? (
                <LocationCountChart
                  locationData={graphData?.locationWiseData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Country Wise User"} />

              {chartState?.countryWiseCustomerGraphState == true ? (
                <PieChart
                  chartData={graphData?.countryWiseCustomerData}
                  colors={graphData?.countryWiseCustomerData?.colors}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Most Visited Products"} />

              {chartState?.mostVisitedProductsGraphState == true ? (
                <PyramidBarChart data={graphData?.mostVisitedProducts} />
              ) : (
                <NoDataFound />
              )}
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Most Purchased Products"} />

              {chartState?.mostPurchasedProductsGraphState == true ? (
                <PolarAreaChart data={graphData?.mostPurchasedProducts} />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Best Selling Products"} />

              {chartState?.bestSellingProductsGraphState == true ? (
                <PatternedDonutChart data={graphData?.bestSellingProducts} />
              ) : (
                // <PatternedDonutChart data={best_selling_products} />
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Most ATC Products"} />

              {chartState?.mostATCProductsGraphState == true ? (
                <RadialBarChart data={graphData?.mostATCProducts} />
              ) : (
                // <RadialBarChart data={most_ATC_products} />
                <NoDataFound />
              )}
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Most Visited Categories"} />
              {chartState?.mostVisitedCategoriesGraphState == true ? (
                <GradientLineChart
                  data={graphData?.mostVisitedCategoriesData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colFullWidthGraph}>
              <DashboardTitle
                title={"Combined Top Views (Products, Categories, Pages)"}
              />

              <div className="w-full flex justify-end items-center p-4">
                <label className="text-gray-700 mr-3">Show Top: </label>
                <select
                  id="productFilter"
                  onChange={handleVisitedFilterChange}
                  value={visitedSelectedFilter}
                  className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
                >
                  <option value={5}>Top 5</option>
                  <option value={10}>Top 10</option>
                </select>
              </div>
              <DataBarChart
                series={seriesCombined}
                xAxisCategories={xAxisCategories}
              />
            </div>

            <div className={colFullWidthGraph}>
              <DashboardTitle title={"Customer Distribution by Page"} />

              {chartState?.customerDistributionByPageDataGraphState == true ? (
                <CustomerDistributionChart
                  distributionData={graphData?.customerDistributionByPageData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Top Customers by Orders"} />
              <div className="w-full flex justify-end items-center p-4">
                <label className="text-gray-700 mr-3">Show Top: </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
                >
                  <option value="Top 3">Top 3</option>
                  <option value="Top 5">Top 5</option>
                  <option value="Top 10">Top 10</option>
                </select>
              </div>

              <CustomerPolarAreaChart series={seriesCustomer} labels={labels} />
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Entry Page - Exit Page"} />
              <DumbbellRangebarChart data={customerPageViewData} />
            </div>
            {/* MANSHI CHART CODE START */}
            <div className={colSixGraph}>
              <DashboardTitle
                title={"Page Flow (Based on Tracking Mechanism)"}
              />
              {chartState?.customerPageFlowGraphState == true ? (
                <CustomerPageFlowChart
                  customerPageFlowData={graphData?.customerPageFlowData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Customer Lost Tracking Mechanism"} />
              {chartState?.customerLostTrackDataGraphState == true ? (
                <CustomerLostTrackChart
                  customerLostTrackData={graphData?.customerLostTrackData}
                />
              ) : (
                <NoDataFound />
              )}
              {/* <CustomerLostTrackChart
                  customerLostTrackData={customerLostTrackData}
                /> */}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Abandon Checkout Order Sales"} />
              {chartState?.abandonOrderSalesDataGraphState == true ? (
                <AbandonOrderSale
                  abandon_checkout_order_sales={
                    graphData?.abandonOrderSalesData
                  }
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Abandon Checkout Products"} />
              {chartState?.abandonProductsDataGraphState == true ? (
                <AbandonProductChart
                  abandon_checkout_products={graphData?.abandonProductsData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Most Time Spent Pages"} />
              {chartState?.mostTimeSpentDataGraphState == true ? (
                <MoreTimeChart PagesTimeSpent={graphData?.mostTimeSpentData} />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Less Time Spent Pages"} />
              {chartState?.lessTimeSpentDataGraphState == true ? (
                <LessTimeChart PagesTimeSpent={graphData?.lessTimeSpentData} />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Total Time Spent – Every Page"} />
              {chartState?.totalPagesTimeSpentDataGraphState == true ? (
                <TotalTimeSpentChart
                  PagesTimeSpent={graphData?.totalPagesTimeSpentData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle
                title={"Event Tracking - Links / Button Clicked"}
              />
              {chartState?.eventTrackingForClicksGraphState == true ? (
                <TrackEventChart
                  EventTrack={graphData?.eventTrackingForClicksData}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Page Wise Average Time Spent on Page"} />
              {chartState?.pageWiseAvgGraphState == true ? (
                <PageWiseAvgChart PageWiseAvg={graphData?.pageWiseAvgData} />
              ) : (
                <NoDataFound />
              )}
              {/* <PageWiseAvgChart PageWiseAvg={PageWiseAvg} />{" "} */}
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Average Time Spent on Whole Site"} />
              {chartState?.wholeSiteGraphState == true ? (
                <AverageTimeSpentWholeSite data={graphData?.wholeSiteData} />
              ) : (
                <NoDataFound />
              )}
            </div>
            {/* MANSHI CHART CODE END */}
          </div>
        </ScrollAnimation>
      </main>

      <NeedHelpPage />
    </>
  );
};

export default PeopleDetailedAnalytics;
