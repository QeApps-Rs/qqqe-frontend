/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ColumnMultiSeriesChartOrder from "../components/Charts/ColumnMultiSeriesChartOrder";
import LineMultiSeriesChart from "../components/Charts/LineMultiSeriesChart";
import MultiSeriesLineChart from "../components/Charts/MultiSeriesLineChart";
import LineChartDashedData from "../components/Charts/LineChartMissingData";
import ColumnMultiSeriesChart from "../components/Charts/ColumnMultiSeriesChart";
import CustomerPolarAreaChart from "../components/Charts/CustomerPolarChart";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import FormSubmitHandler from "../components/FormSubmitHandler";
import PolarAnalytics from "../components/Analytics/PolarAnalaytics";
import NeedHelpPage from "../components/NeedHelp";

const PricePage = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const [showIframe, setShowIframe] = useState(true);

  // Function to handle showing the iframe when the page is clicked
  const handlePageClick = () => {
    setShowIframe(false); // Show iframe
  };


  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState({
    visitorsData: [],
    totalOrderData: {},
    totalSalesData: {},
    mobileUserData: {},
    desktopUserData: {},
    locationWiseData: {},
    countryWiseCustomerData: {},
    mostVisitedProducts: [],
  });

  const [chartState, setChartState] = useState({
    totalSalesGraphState: false,
    totalOrderGraphState: false,
  });

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
        } else if (dataKey == "mobileUserData") {
          setGraphData((prevState) => ({
            ...prevState,
            [dataKey]: response?.data?.response,
          }));
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
          fetchDataHandler("customerJourney", "visitorsData", null),
          fetchDataHandler(
            "new/order/sales/count",
            "totalSalesData",
            "totalSalesGraphState"
          ),
          fetchDataHandler(
            "new/order/averageSales/count",
            "totalOrderData",
            "totalOrderGraphState"
          ),
     
        ]);
      } catch (error) {
        console.error("Error in one or more API calls:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!showIframe) {
      fetchData();
    }
  }, [showIframe]);

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

    const startOfMonth = new Date(currentYear, currentMonth, 1);
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
    const currentMonth = today.getMonth();

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

  const yearSeries = [
    {
      name: "Visitors",
      data: yearData,
    },
  ];

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

  const OneTimeMultiTimeData = {
    today: {
      "2024-10-07": {
        oneTime: 127,
        multipleTime: 178,
      },
    },
    weekly: {
      "2024-09-27": {
        oneTime: 250,
        multipleTime: 350,
      },
      "2024-09-28": {
        oneTime: 490,
        multipleTime: 200,
      },
      "2024-09-29": {
        oneTime: 250,
        multipleTime: 190,
      },
      "2024-09-30": {
        oneTime: 200,
        multipleTime: 100,
      },
      "2024-10-01": {
        oneTime: 490,
        multipleTime: 200,
      },
      "2024-10-02": {
        oneTime: 550,
        multipleTime: 190,
      },
      "2024-10-03": {
        oneTime: 190,
        multipleTime: 350,
      },
    },
    monthly: {
      January: {
        oneTime: 250,
        multipleTime: 350,
      },
      February: {
        oneTime: 490,
        multipleTime: 200,
      },
      March: {
        oneTime: 250,
        multipleTime: 190,
      },
      April: {
        oneTime: 200,
        multipleTime: 100,
      },
      May: {
        oneTime: 490,
        multipleTime: 200,
      },
      June: {
        oneTime: 550,
        multipleTime: 190,
      },
      July: {
        oneTime: 190,
        multipleTime: 350,
      },
      August: {
        oneTime: 190,
        multipleTime: 350,
      },
      September: {
        oneTime: 80,
        multipleTime: 350,
      },
      October: {
        oneTime: 190,
        multipleTime: 350,
      },
      November: {
        oneTime: 70,
        multipleTime: 90,
      },
      December: {
        oneTime: 200,
        multipleTime: 190,
      },
    },
    yearly: {
      2020: {
        oneTime: 250,
        multipleTime: 350,
      },
      2021: {
        oneTime: 490,
        multipleTime: 200,
      },
      2022: {
        oneTime: 250,
        multipleTime: 190,
      },
      2023: {
        oneTime: 490,
        multipleTime: 200,
      },
      2024: {
        oneTime: 550,
        multipleTime: 190,
      },
    },
  };

  ///////////////////////   products   ///////////////////////

  const un_sold_products = [
    { product_name: "7 Shakra Bracelet - Blue", product_count: "50" },
    { product_name: "Anchor Bracelet Mens - Gold", product_count: "47" },
    { product_name: "Antique Drawers", product_count: "41" },
    { product_name: "Bangle Bracelet", product_count: "38" },
    { product_name: "Bedside Table", product_count: "37" },
    { product_name: "The Collection Snowboard: Hydrogen", product_count: "36" },
    { product_name: "The Complete Snowboard", product_count: "35" },
    { product_name: "The Compare at Price Snowboard", product_count: "33" },
    { product_name: "The Hidden Snowboard", product_count: "32" },
    { product_name: "The Videographer Snowboard", product_count: "30" },
  ];

  const most_visited_categories = [
    { category_name: "Hardware", category_count: "60" },
    { category_name: "Furniture", category_count: "58" },
    { category_name: "Software", category_count: "55" },
    { category_name: "Gift Cards", category_count: "53" },
    { category_name: "Electronics", category_count: "52" },
    { category_name: "Arts & Entertainment", category_count: "51" },
    { category_name: "Sporting Goods", category_count: "47" },
    { category_name: "Services", category_count: "45" },
    { category_name: "Business & Industrial", category_count: "41" },
    { category_name: "Baby & Toddler", category_count: "40" },
  ];

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
    most_visited_categories,
    visitedSelectedFilter
  );
  const filteredPages = getFilteredData(
    most_visited_pages,
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

  const customer_distribution_by_page = {
    today: {
      dates: ["2024-10-14"], // Example date for today
      home_page_count: [95],
      product_page_count: [80],
      category_page_count: [70],
      cart_page_count: [50],
      pages_count: [100],
    },
    weekly: {
      dates: [
        "2024-10-08",
        "2024-10-09",
        "2024-10-10",
        "2024-10-11",
        "2024-10-12",
        "2024-10-13",
        "2024-10-14",
      ], //consider end_date as currentdate and startdate is 7 days before currentdate
      home_page_count: [700, 800, 900, 950, 1000, 1100, 1200],
      product_page_count: [1300, 1400, 1450, 1500, 1550, 1600, 1700],
      category_page_count: [7000, 3000, 4500, 2200, 5000, 4100, 6000],
      cart_page_count: [5000, 3500, 5500, 2000, 4000, 1200, 4000],
      pages_count: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
    },
    monthly: {
      dates: [
        "january",
        "feb",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ], //current year's month
      home_page_count: [
        6000, 6200, 6400, 6600, 6800, 3000, 5000, 2000, 5700, 3000, 5000, 4000,
      ],
      product_page_count: [
        7000, 7200, 7400, 7600, 7800, 7000, 7200, 7400, 7600, 7800, 2000, 3000,
      ],
      category_page_count: [
        5000, 7200, 7400, 7000, 7800, 6000, 4200, 3800, 8900, 7800, 6000, 5000,
      ],
      cart_page_count: [
        7200, 7200, 3000, 4500, 7800, 7200, 6000, 7200, 4200, 7800, 3100, 7200,
      ],
      pages_count: [
        5000, 7200, 4000, 2900, 3600, 7200, 6700, 7200, 3200, 8900, 6500, 7200,
      ],
    },
    yearly: {
      dates: ["2020", "2021", "2022", "2023", "2024"], //last 5 year
      home_page_count: [4000, 4200, 4400, 4600, 4800],
      product_page_count: [9000, 9200, 9400, 9600, 9800],
      category_page_count: [2000, 3600, 7000, 4100, 5000],
      cart_page_count: [5000, 4200, 3000, 8000, 2200],
      pages_count: [8000, 7000, 9000, 8700, 8900],
    },
  };

  const customerData = [
    { customerId: "123", customerName: "Alice Smith", orderCount: 10 },
    { customerId: "456", customerName: "Bob Johnson", orderCount: 7 },
    { customerId: "789", customerName: "Charlie Brown", orderCount: 5 },
    { customerId: "101", customerName: "Diana Prince", orderCount: 15 },
    { customerId: "102", customerName: "Eve Adams", orderCount: 2 },
    { customerId: "103", customerName: "Frank Wright", orderCount: 8 },
    { customerId: "104", customerName: "Grace Lee", orderCount: 11 },
    { customerId: "105", customerName: "Henry Miller", orderCount: 6 },
    { customerId: "106", customerName: "Irene Black", orderCount: 4 },
    { customerId: "107", customerName: "Jack White", orderCount: 14 },
    { customerId: "108", customerName: "Karen Green", orderCount: 3 },
    { customerId: "109", customerName: "Larry Thompson", orderCount: 9 },
    { customerId: "110", customerName: "Maria Garcia", orderCount: 12 },
    { customerId: "111", customerName: "Nathan Taylor", orderCount: 13 },
    { customerId: "112", customerName: "Olivia King", orderCount: 1 },
  ];

  const [filterType, setFilterType] = useState("Top 3");

  // Filter customer data based on the selected filter type
  const customerfilteredData = () => {
    let data = [...customerData].sort((a, b) => b.orderCount - a.orderCount); // Sort in descending order
    if (filterType === "Top 3") {
      return data.slice(0, 3); // Get top 3
    } else if (filterType === "Top 5") {
      return data.slice(0, 5); // Get top 5
    } else {
      return data.slice(0, 10); // Get top 10 (default)
    }
  };

  const filteredCustomerData = customerfilteredData();

  // Extract series (order counts) and labels (customer names) from filtered data
  const seriescustomer = filteredCustomerData.map(
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
      <div className=" h-16 bg-dashboard_gradient rounded-t-lg flex justify-between items-center px-4">
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
      {showIframe ? (
        <>
          <ScrollAnimation
            animateIn="animate__fadeInDown"
            animateOut="animate__fadeOut"
            duration={1}
          >
            <div className="w-full  flex justify-center items-center bg-gray-100">
              <div className="w-10/12 max-w-screen-xl h-[calc(100vh-120px)] shadow-2xl rounded-lg overflow-hidden relative ">
                <label className="h-16 bg-white shadow-lg flex items-center justify-center px-4 border-b border-gray-300 font-bold text-2xl text-gray-800">
                  Let us help you get the most from QQQE
                </label>
                <div className="bg-book_appointment backdrop-brightness-50 h-[calc(100vh-100px)]">
                  <div className="grid grid-cols-12 gap-8 py-6 px-10">
                    <div className="col-span-12 xl:col-span-5 text-white space-y-6">
                      <h1 className="text-5xl font-bold leading-tight ">
                        You've qualified for a VIP launch session!
                      </h1>
                      <p className="text-lg font-normal leading-relaxed text-justify">
                        Select a time today or tomorrow for a complimentary
                        30-minute QQQE introduction with a dedicated launch
                        manager who will make your implementations seamless and
                        future customer support more personalized.
                      </p>
                      <span className="text-lg font-normal leading-relaxed block text-justify">
                        You'll also receive an additional 7 days on your free
                        trial just for participating.
                      </span>
                    </div>

                    <div className="col-span-12 xl:col-span-7 ">
                      <iframe
                        src="https://schedule.calrik.com/m3arie1821"
                        title="Schedule Embed"
                        className="w-full h-[calc(100vh-310px)] border-none rounded-lg custom-scrollbar overflow-y-auto"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end w-full p-4 border-t border-white">
                    <button
                      className="bg-transparent p-3 border border-white text-white mr-4 rounded-lg hover:bg-white hover:text-blue-700 transition-all"
                      onClick={handlePageClick}
                    >
                      Remind me next time
                    </button>
                    <button
                      type="button"
                      onClick={handlePageClick}
                      className="bg-transparent p-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </>
      ) : (
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
            <PolarAnalytics />
            <div className="flex items-center mt-16 justify-center">
              <div className="flex items-center">
                <Link to="/detailed-analytics">
                  <i
                    className="fa fa-bar-chart fa fa-home text-[14px] bg-[#3292a9] text-white p-1 rounded-full h-6 w-6 flex items-center justify-center"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
              <h2 className="text-title-md2 font-semibold text-black dark:text-white pl-2">
                Analytics
              </h2>
            </div>
            <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
              <div className={colFourGraph}>
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
                      graphData?.totalOrderData?.combinedWeeklySalesResponse
                        ?.chart_data
                    )}
                    isToday={false}
                    color={["#FF4560", "#FF9800"]}
                  />
                ) : (
                  <NoDataFound />
                )}
              </div>
              <div className={colFourGraph}>
                <DashboardTitle title={"Total & Average Sales (Yearly)"} />

                {chartState?.totalOrderGraphState == true &&
                chartState?.totalSalesGraphState == true ? (
                  <LineMultiSeriesChart
                    salesData={
                      graphData?.totalSalesData?.yearSalesData?.chart_data
                    }
                    dateRange={Object.keys(
                      graphData?.totalOrderData?.yearlySalesResponse?.chart_data
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
                      graphData?.totalOrderData?.monthlySalesResponse.chart_data
                    )}
                    isToday={false}
                    color={["#008FFB", "#FF4560"]}
                  />
                ) : (
                  <NoDataFound />
                )}
              </div>

              <div className={colFourGraph}>
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
                <DashboardTitle
                  title={"Total & Average Order Count (Weekly)"}
                />

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
              </div>
              <div className={colFourGraph}>
                <DashboardTitle
                  title={"Total & Average Order Count (Yearly)"}
                />

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
              <div className={colFullWidthGraph}>
                <DashboardTitle
                  title={"Total & Average Order Count (Monthly)"}
                />

                {chartState?.totalSalesGraphState == true &&
                chartState?.totalOrderGraphState == true ? (
                  <MultiSeriesLineChart
                    orderData={
                      graphData?.totalOrderData?.monthlySalesResponse
                        ?.chart_data
                    }
                    dateRange={Object.keys(
                      graphData?.totalOrderData?.monthlySalesResponse
                        ?.chart_data
                    )}
                    isToday={false}
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

                <CustomerPolarAreaChart
                  series={seriescustomer}
                  labels={labels}
                />
              </div>
            </div>
          </ScrollAnimation>
        </main>
      )}
      <NeedHelpPage />

    </>
  );
};

export default PricePage;
