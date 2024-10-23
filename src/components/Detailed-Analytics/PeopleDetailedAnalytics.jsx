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
import { Link } from "react-router-dom";
import LessTimeChart from "../Charts/LessTimeChart";
import CustomerLostTrackChart from "../Charts/CustomerLostTrackChart";
import AdnomanOrderSale from "../Charts/adnoman_oredr_sale";
import AbandonProductChart from "../Charts/Adnoman_product";
import TotalTimeSpentChart from "../Charts/TotalTimeSpent";
import MoreTimeChart from "../Charts/MoreLessTimeChart";
import TrackEventChart from "../Charts/TrackEvent";
import CustomerPageFlowChart from "../Charts/CustomerPageFlowCHart";

const PeopleDetailedAnalytics = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);
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
    unSoldProducts: [],
    bestSellingProducts: [],
    mostATCProducts: [],
  });

  const [chartState, setChartState] = useState({
    totalSalesGraphState: false,
    totalOrderGraphState: false,
    mobileUserGraphState: false,
    desktopUserGraphState: false,
    locationWiseGraphState: false,
    timeCustomersGraphState: false,
    countryWiseCustomerGraphState: false,
    mostVisitedProductsGraphState: false,
    mostPurchasedProductsGraphState: false,
    unSoldProductsGraphState: false,
    bestSellingProductsGraphState: false,
    mostATCProductsGraphState: false,
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
          fetchDataHandler(
            "new/device/mobile/count",
            "mobileUserData",
            "mobileUserGraphState"
          ),
          fetchDataHandler(
            "new/device/desktop/count",
            "desktopUserData",
            "desktopUserGraphState"
          ),
          fetchDataHandler(
            "new/location/customer/count",
            "locationWiseData",
            "locationWiseGraphState"
          ),
          fetchDataHandler(
            "new/location/customer/count",
            "timeCustomersData",
            "timeCustomersGraphState"
          ),
          fetchDataHandler(
            "new/country/customer/count",
            "countryWiseCustomerData",
            "countryWiseCustomerGraphState"
          ),
          fetchDataHandler(
            "new/mostVisited/product/count",
            "mostVisitedProducts",
            "mostVisitedProductsGraphState"
          ),
          fetchDataHandler(
            "new/mostPurchased/product/count",
            "mostPurchasedProducts",
            "mostPurchasedProductsGraphState"
          ),
          fetchDataHandler(
            "new/unSold/product/count",
            "unSoldProducts",
            "unSoldProductsGraphState"
          ),
          fetchDataHandler(
            "new/bestSelling/product/count",
            "bestSellingProducts",
            "bestSellingProductsGraphState"
          ),
          fetchDataHandler(
            "new/mostATC/product/count",
            "mostATCProducts",
            "mostATCProductsGraphState"
          ),
        ]);
      } catch (error) {
        console.error("Error in one or more API calls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const LessTimeSpent = {
    today: {
      "2024-10-18": {
        pages: ["checkout", "order", "blog"],
        spent_time: [20, 45, 10], ///min
      },
    },
    weekly: {
      "2024-10-18": {
        pages: ["checkout", "order", "blog"],
        spent_time: [5, 6, 7], ///min
      },
      "2024-10-17": {
        pages: ["checkout", "order", "blog"],
        spent_time: [2, 4, 5],
      },
      "2024-10-16": {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 6, 4],
      },
      "2024-10-15": {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 4, 3],
      },
      "2024-10-14": {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 7, 5],
      },
      "2024-10-13": {
        pages: ["checkout", "order", "blog"],
        spent_time: [4, 6, 7],
      },
      "2024-10-12": {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 5, 6],
      },
    },
    monthly: {
      january: {
        pages: ["checkout", "order", "blog"],
        spent_time: [1, 6, 4],
      },
      february: {
        pages: ["checkout", "order", "blog"],
        spent_time: [7, 4, 7],
      },
      march: {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 6, 9],
      },
      april: {
        pages: ["checkout", "order", "blog"],
        spent_time: [5, 9, 4],
      },
      may: {
        pages: ["checkout", "order", "blog"],
        spent_time: [2, 5, 8],
      },
      june: {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 5, 2],
      },
      july: {
        pages: ["checkout", "order", "blog"],
        spent_time: [8, 9, 5],
      },

      august: {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 4, 8],
      },
      september: {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 5, 6],
      },
      october: {
        pages: ["checkout", "order", "blog"],
        spent_time: [6, 3, 2],
      },
      november: {
        pages: ["checkout", "order", "blog"],
        spent_time: [4, 7, 5],
      },
      december: {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 2, 3],
      },
    },
    yearly: {
      2024: {
        pages: ["checkout", "order", "blog"],
        spent_time: [5, 4, 2],
      },
      2023: {
        pages: ["checkout", "order", "blog"],
        spent_time: [5, 6, 5],
      },
      2022: {
        pages: ["checkout", "order", "blog"],
        spent_time: [3, 9, 3],
      },
      2021: {
        pages: ["checkout", "order", "blog"],
        spent_time: [1, 5, 2],
      },
      2020: {
        pages: ["checkout", "order", "blog"],
        spent_time: [5, 8, 9],
      },
    },
  };

  const customerLostTrackData = [
    {
      name: "Customer1",
      track: ["Product", "Search", "Collection", "Page"],
      date: "2024-10-17",
    },
    { name: "Customer2", track: ["product", "search"], date: "2024-10-16" },
    {
      name: "Customer3",
      track: ["product", "collection", "page"],
      date: "2024-10-15",
    },
    { name: "Customer4", track: ["product"], date: "2024-10-14" },
    { name: "Customer5", track: ["collection", "product"], date: "2024-10-12" },
    { name: "Customer6", track: ["collection", "product"], date: "2024-10-11" },
    {
      name: "Customer7",
      track: ["product", "collection", "search"],
      date: "2024-10-10",
    },
    {
      name: "Customer8",
      track: ["Product", "Search", "Collection", "Page"],
      date: "2024-10-09",
    },
    { name: "Customer9", track: ["product", "search"], date: "2024-10-08" },
    {
      name: "Customer10",
      track: ["product", "collection", "page"],
      date: "2024-10-07",
    },
    { name: "Customer11", track: ["product"], date: "2024-10-06" },
    {
      name: "Customer12",
      track: ["collection", "product"],
      date: "2024-10-05",
    },
    {
      name: "Customer13",
      track: ["collection", "product"],
      date: "2024-10-04",
    },
    {
      name: "Customer14",
      track: ["product", "collection", "search"],
      date: "2024-10-03",
    },
    {
      name: "Customer15",
      track: ["Product", "Search", "Collection", "Page"],
      date: "2024-10-02",
    },
    { name: "Customer16", track: ["product", "search"], date: "2024-10-01" },
    {
      name: "Customer17",
      track: ["product", "collection", "page"],
      date: "2024-09-30",
    },
    { name: "Customer18", track: ["product"], date: "2024-09-29" },
    {
      name: "Customer19",
      track: ["collection", "product"],
      date: "2024-09-28",
    },
    {
      name: "Customer20",
      track: ["collection", "product"],
      date: "2024-09-27",
    },
    {
      name: "Customer21",
      track: ["product", "collection", "search"],
      date: "2024-09-26",
    },
  ];

  const abandon_checkout_order_sales = {
    today: {
      dates: ["2024-10-17"],
      sales_count: [95],
    },
    weekly: {
      dates: [
        "2024-10-11",
        "2024-10-12",
        "2024-10-13",
        "2024-10-14",
        "2024-10-15",
        "2024-10-16",
        "2024-10-17",
      ], //consider end_date as currentdate and startdate is 7 days before currentdate
      sales_count: [700, 800, 900, 950, 1000, 1100, 1200],
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
      sales_count: [
        2000, 2200, 2400, 1600, 2800, 2000, 4000, 1000, 1700, 2000, 2100, 2800,
      ],
    },
    yearly: {
      dates: ["2020", "2021", "2022", "2023", "2024"], //last 5 year
      sales_count: [6000, 4200, 6400, 7600, 8800],
    },
  };

  const abandon_checkout_products = {
    today: {
      "2024-10-17": {
        prodct: ["abc", "pqr", "xyz", "klm", "mno"],
        product_count: [30, 71, 20, 10, 40],
      },
    },
    weekly: {
      "2024-10-11": {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [5, 15, 10, 10],
      },
      "2024-10-12": {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [3, 5, 7, 0],
      },
      "2024-10-13": {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [2, 0, 8, 4],
      },
      "2024-10-14": {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [0, 0, 10, 2],
      },
      "2024-10-15": {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [6, 3, 2, 0],
      },
      "2024-10-16": {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [7, 4, 0, 1],
      },
      "2024-10-17": {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [10, 2, 5, 3],
      },
    },
    monthly: {
      January: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [60, 30, 40, 0],
      },
      February: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [0, 20, 15, 25],
      },
      March: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [50, 0, 20, 35],
      },
      April: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [40, 25, 0, 30],
      },
      May: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [30, 10, 20, 0],
      },
      June: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [50, 40, 0, 30],
      },
      July: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [60, 55, 50, 0],
      },
      August: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [0, 80, 70, 90],
      },
      September: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [90, 0, 85, 100],
      },
      October: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [30, 40, 50, 0],
      },
      November: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [20, 25, 15, 0],
      },
      December: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [10, 0, 20, 30],
      },
    },
    yearly: {
      2024: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [300, 200, 0, 0],
      },
      2023: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [150, 0, 0, 250],
      },
      2022: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [0, 200, 100, 0],
      },
      2021: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [120, 0, 80, 0],
      },
      2020: {
        prodct: ["abc", "pqr", "xyz", "klm"],
        product_count: [150, 200, 300, 250],
      },
    },
  };

  const MostTimeSpent = {
    today: {
      "2024-10-18": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 10, 5], ///min
      },
    },
    weekly: {
      "2024-10-18": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 20, 25], ///min
      },
      "2024-10-17": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [29, 30, 14, 15],
      },
      "2024-10-16": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 30, 25],
      },
      "2024-10-15": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [60, 45, 10, 35],
      },
      "2024-10-14": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [24, 52, 16, 20],
      },
      "2024-10-13": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [30, 15, 20, 15],
      },
      "2024-10-12": {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [10, 25, 30, 15],
      },
    },
    monthly: {
      january: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 10, 51],
      },
      february: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [29, 60, 14, 15],
      },
      march: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 20, 45],
      },
      april: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [40, 45, 10, 53],
      },
      may: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [29, 51, 11, 25],
      },
      june: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [30, 15, 20, 15],
      },
      july: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [10, 25, 50, 15],
      },

      august: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 30, 35],
      },
      september: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [30, 45, 10, 51],
      },
      october: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 50, 10, 20],
      },
      november: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [30, 15, 20, 15],
      },
      december: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [10, 25, 30, 15],
      },
    },
    yearly: {
      2024: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 10, 45],
      },
      2023: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [29, 20, 14, 15],
      },
      2022: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 45, 30, 35],
      },
      2021: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [40, 45, 10, 25],
      },
      2020: {
        pages: ["home", "product", "collection", "cart"],
        spent_time: [20, 50, 10, 22],
      },
    },
  };

  const TotalPagesTimeSpent = {
    today: {
      "2024-10-18": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 10, 5, 3], ///min
      },
    },
    weekly: {
      "2024-10-18": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 10, 5, 3], ///min
      },
      "2024-10-17": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [29, 0, 14, 15, 5],
      },
      "2024-10-16": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 0, 5, 3],
      },
      "2024-10-15": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [0, 45, 10, 5, 3],
      },
      "2024-10-14": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [2, 5, 1, 2, 3],
      },
      "2024-10-13": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [30, 15, 20, 15, 0],
      },
      "2024-10-12": {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [10, 25, 0, 15, 3],
      },
    },
    monthly: {
      january: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 10, 5, 3],
      },
      february: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [29, 0, 14, 15, 5],
      },
      march: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 0, 5, 3],
      },
      april: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [0, 45, 10, 5, 3],
      },
      may: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [2, 5, 1, 2, 3],
      },
      june: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [30, 15, 20, 15, 0],
      },
      july: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: ["10", "25", "0", "15", "3"],
      },

      august: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 0, 5, 3],
      },
      september: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [0, 45, 10, 5, 3],
      },
      october: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [2, 5, 1, 2, 3],
      },
      november: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [30, 15, 20, 15, 0],
      },
      december: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [10, 25, 0, 15, 3],
      },
    },
    yearly: {
      2024: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 10, 5, 3],
      },
      2023: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [29, 0, 14, 15, 5],
      },
      2022: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [20, 45, 0, 5, 3],
      },
      2021: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [0, 45, 10, 5, 3],
      },
      2020: {
        pages: ["home", "product", "collection", "cart", "checkout"],
        spent_time: [2, 5, 1, 2, 3],
      },
    },
  };

  const customerPageFlowData = [
    { ip_address: "122.186.66.102", y: [0, 1, 3] },
    { ip_address: "23.113.218.66", y: [0, 2, 0, 1] },
    { ip_address: "122.186.67.102", y: [1, 2, 3, 1] },
    { ip_address: "122.187.66.102", y: [0, 3, 1] },
    { ip_address: "122.186.66.103", y: [0, 1, 2, 3, 4] },
    { ip_address: "121.186.66.102", y: [2, 1] },
    { ip_address: "91.170.56.41", y: [1, 2, 3, 0] },
    { ip_address: "119.184.66.103", y: [2, 1] },
    { ip_address: "119.186.66.102", y: [3, 2, 3] },
    { ip_address: "91.170.56.42", y: [2, 1] },
  ];

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
            <div className={colFullWidthGraph}>
              <DashboardTitle title={"One Time & Mutli Time Customer"} />

              {chartState?.timeCustomersGraphState == true ? (
                // <OneTimeMultiTimeCustomer customerData={graphData?.timeCustomersData} />
                <OneTimeMultiTimeCustomer customerData={OneTimeMultiTimeData} />
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
            </div>
            <div className={colFourGraph}>
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
              <DashboardTitle title={"Un Sold Products"} />

              <RangeBarChart data={un_sold_products} />
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

              <GradientLineChart data={most_visited_categories} />
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

              <CustomerDistributionChart
                distributionData={customer_distribution_by_page}
              />
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

              <CustomerPolarAreaChart series={seriescustomer} labels={labels} />
            </div>

            <div className={colSixGraph}>
              <DashboardTitle title={"Entry Page - Exit Page"} />
              <DumbbellRangebarChart data={customerPageViewData} />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle
                title={"Page Flow (Based on Tracking Mechanism)"}
              />
              <CustomerPageFlowChart
                customerPageFlowData={customerPageFlowData}
              />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Customer Lost Tracking Mechanism"} />
              <CustomerLostTrackChart
                customerLostTrackData={customerLostTrackData}
              />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Abandon Checkout Order Sales"} />
              <AdnomanOrderSale
                abandon_checkout_order_sales={abandon_checkout_order_sales}
              />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Abandon Checkout Products"} />
              <AbandonProductChart
                abandon_checkout_products={abandon_checkout_products}
              />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Most Time Spent Pages"} />
              <MoreTimeChart
                PagesTimeSpent={MostTimeSpent} // Ensure this is defined correctly
              />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Less Time Spent Pages"} />
              <LessTimeChart PagesTimeSpent={LessTimeSpent} />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle title={"Total Time Spent – Every Page"} />
              <TotalTimeSpentChart PagesTimeSpent={TotalPagesTimeSpent} />
            </div>
            <div className={colSixGraph}>
              <DashboardTitle
                title={"Event Tracking - Links / Button Clicked"}
              />
              <TrackEventChart />{" "}
            </div>
          </div>
        </ScrollAnimation>
      </main>
    </>
  );
};

export default PeopleDetailedAnalytics;
