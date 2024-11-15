/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import Loader from "../../common/Loader";
import RadarChart from "../Charts/RadarChart";
import AreaChart from "../Charts/AreaChart";
import ColumnChart from "../Charts/ColumnChart";
import MobileUsersChart from "../Charts/MobileUserChart";
import DesktopUsersChart from "../Charts/DesktopUserChart";
import LocationCountChart from "../Charts/LocationCountChart";
import PieChart from "../Charts/PieChart";
import OneTimeMultiTimeCustomer from "../Charts/OnetimeMultiTimeCustomer";
import DataBarChart from "../Charts/DataBarChart";
import CustomerDistributionChart from "../Charts/CustomerDistributionChart";
import DumbbellRangebarChart from "../Charts/DumbelledRangebar";
import FormSubmitHandler from "../FormSubmitHandler";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import AllPageStartOverviewPage from "../AllPageStartOverview";
import { Link, useLocation } from "react-router-dom";
import { BackIcon } from "../custIcon/svgIcon";
import toast from "react-hot-toast";

const DashboardCard = () => {
  const today = new Date();
  const location = useLocation();
  const { priorityCount } = location.state || {};
  const [peoplePriorityCount, setPeoplePriorityCount] = useState(priorityCount);

  const todayStr = today.toISOString().split("T")[0];
  const category = {
    title: "People",
    url: "/problem-statement?category=people",
  };
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
    mobileUserData: {},
    desktopUserData: {},
    locationWiseData: {},
    timeCustomersData: {},
    countryWiseCustomerData: {},
    mostVisitedProducts: [],
    customerDistributionByPageData: {},
    mostVisitedCategoriesData: [],
    mostVisitedPagesData: [],
  });

  const defaultState = {
    mobileUserGraphState: false,
    desktopUserGraphState: false,
    locationWiseGraphState: false,
    timeCustomersGraphState: false,
    countryWiseCustomerGraphState: false,
    customerDistributionByPageDataGraphState: false,
    mostVisitedProductsGraphState: false,
    mostVisitedCategoriesGraphState: false,
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
    setChartState(defaultState);
    const fetchData = async () => {
      setLoading(true);

      try {
        await Promise.all([
          fetchDataHandler("customerJourney", "visitorsData", null),

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
            `new/distributionPage/customer/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "customerDistributionByPageData",
            "customerDistributionByPageDataGraphState"
          ),
          fetchDataHandler(
            `new/mostVisited/product/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostVisitedProducts",
            "mostVisitedProductsGraphState"
          ),
          fetchDataHandler(
            `new/mostVisited/categories/count?date=${isBeforeDetails?.date}&dateFilterType=${isBeforeDetails?.dateFilterType}`,
            "mostVisitedCategoriesData",
            "mostVisitedCategoriesGraphState"
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

    const getDashboardCount = async () => {
      setLoading(true);
      await FormSubmitHandler({
        method: "get",
        url: "level1/question/list?category=people",
      })
        .then((res) => {
          if (res.data) {
            const responseData = res.data;
            const peopleCount = responseData.reduce((acc, item) => {
              const priority = item?.priority?.toLowerCase();
              acc["count"] = (acc["count"] || 0) + 1;
              acc[priority] = (acc[priority] || 0) + 1;
              return acc;
            }, {});
            setPeoplePriorityCount(peopleCount);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (peoplePriorityCount == undefined) {
      getDashboardCount();
    }
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

  ///////////////////////   products   ///////////////////////

  const most_visited_pages = [
    { page_name: "Home", page_count: "100" },
    { page_name: "Contect Us", page_count: "98" },
    { page_name: "About Us", page_count: "95" },
    { page_name: "Article", page_count: "92" },
    { page_name: "Blog", page_count: "90" },
    { page_name: "Product", page_count: "70" },
    { page_name: "Checkout", page_count: "60" },
    { page_name: "Order", page_count: "58" },
    { page_name: "Category", page_count: "55" },
    { page_name: "Shipping", page_count: "40" },
  ];

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
          <div className="w-full sm:hidden flex justify-end mb-2">
            <Link to={"/app-dashboard"}>
              <button
                type="button"
                className="w-auto flex items-center gap-x-1 cursor-pointer bg-white border border-gray-300 pt-1.5 pb-1.5 pl-2.5 pr-2.5 text-[15px] rounded-md hover:bg-black hover:text-white transition-colors duration-300"
              >
                <BackIcon /> Back
              </button>
            </Link>
          </div>
          <AllPageStartOverviewPage
            category={category}
            priorityCount={peoplePriorityCount}
          />
          <div className="w-full flex">
            <div className="w-1/2 flex items-center  justify-end">
              <i
                className="fa fa-bar-chart fa fa-home text-[14px] bg-[#3292a9] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center"
                aria-hidden="true"
              ></i>
              <h2 className="text-title-md2 font-semibold text-black dark:text-white pl-2 ">
                People Analytics
              </h2>
            </div>
            <div className="w-1/2 flex justify-end">
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
              <DashboardTitle title={"Entry Page - Exit Page"} />
              <DumbbellRangebarChart data={customerPageViewData} />
            </div>
          </div>
        </ScrollAnimation>
      </main>
    </>
  );
};

export default DashboardCard;
