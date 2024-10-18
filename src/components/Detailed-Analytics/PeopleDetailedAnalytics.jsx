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
    bestSellingProducts:[],
    mostATCProducts:[],
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
  return (
    <>
      {loading && <Loader />}
      <main className="main-content todo-app w-full px-[var(--margin-x)] pb-8">
        <div className="mb-1 -mt-2 p-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between __web-inspector-hide-shortcut__"></div>

        <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
          <div className=" h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Total Visitors Weekly
            </p>
          </div>
          {weekData.length > 0 ? (
            <AreaChart
              series={weekSeries}
              categories={weekCategories}
              yAxisTitle="Number Of Visitor"
              xAxisTitle="Date Of Week"
            />
          ) : (
            <p className="text-center text-red-500">
              No data available for the selected weeks
            </p>
          )}
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total Visitors Today
              </p>
            </div>

            {filteredData.length > 0 ? (
              <RadarChart series={series} categories={categories} />
            ) : (
              <p className="text-center text-red-500">
                No data available for today
              </p>
            )}
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total Visitors Monthly
              </p>
            </div>

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
              <p className="text-center text-red-500">
                No data available for the selected months
              </p>
            )}
          </div>
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total Visitors Yearly
              </p>
            </div>

            {yearData.length > 0 ? (
              <ColumnChart chartData={chartData} />
            ) : (
              <p className="text-center text-red-500">
                No data available for the selected years
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
          <div className=" h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Total & Average Sales (Monthly)
            </p>
          </div>
          {chartState?.totalOrderGraphState == true &&
            chartState?.totalSalesGraphState == true && (
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
            )}
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total & Average Sales (Today)
              </p>
            </div>
            {chartState?.totalSalesGraphState == true && (
              <ColumnMultiSeriesChart
                salesData={graphData?.totalSalesData?.TodaySales}
                dateRange={[graphData?.totalSalesData?.TodaySales?.start_date]}
                isToday={true}
              />
            )}
          </div>
          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total & Average Sales (Weekly)
              </p>
            </div>
            {chartState?.totalOrderGraphState == true &&
              chartState?.totalSalesGraphState == true && (
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
              )}
          </div>
          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total & Average Sales (Yearly)
              </p>
            </div>
            {chartState?.totalOrderGraphState == true &&
              chartState?.totalSalesGraphState == true && (
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
              )}
          </div>
        </div>

        <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
          <div className=" h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Total & Average Order Count (Monthly)
            </p>
          </div>
          {chartState?.totalSalesGraphState == true &&
            chartState?.totalOrderGraphState == true && (
              <MultiSeriesLineChart
                orderData={
                  graphData?.totalOrderData?.monthlySalesResponse?.chart_data
                }
                dateRange={Object.keys(
                  graphData?.totalOrderData?.monthlySalesResponse?.chart_data
                )}
                isToday={false}
              />
            )}
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total & Average Order Count (Today)
              </p>
            </div>
            {chartState?.totalOrderGraphState == true && (
              <ColumnMultiSeriesChartOrder
                orderData={graphData?.totalOrderData?.TodaySales}
                dateRange={[graphData?.totalOrderData?.TodaySales?.start_date]}
                isToday={true}
              />
            )}
          </div>

          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total & Average Order Count (Weekly)
              </p>
            </div>
            {chartState?.totalOrderGraphState == true && (
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
            )}
          </div>
          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Total & Average Order Count (Yearly)
              </p>
            </div>
            {chartState?.totalOrderGraphState == true && (
              <ColumnMultiSeriesChartOrder
                orderData={
                  graphData?.totalOrderData?.yearlySalesResponse?.chart_data
                }
                dateRange={Object.keys(
                  graphData?.totalOrderData?.yearlySalesResponse?.chart_data
                )}
                isToday={false}
              />
            )}
          </div>
        </div>

        <div
          className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
        >
          <div className=" h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Mobile User
            </p>
          </div>
          {chartState?.mobileUserGraphState == true && (
            <MobileUsersChart orderData={graphData?.mobileUserData} />
          )}
        </div>

        <div
          className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
        >
          <div className=" h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Desktop User
            </p>
          </div>
          {chartState?.desktopUserGraphState == true && (
            <DesktopUsersChart orderData={graphData?.desktopUserData} />
          )}
        </div>

        <div
          className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
        >
          <div className=" h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Location Wise User
            </p>
          </div>
          {chartState?.locationWiseGraphState == true && (
            <LocationCountChart locationData={graphData?.locationWiseData} />
          )}
        </div>

        <div
          className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
        >
          <div className=" h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              One Time & Mutli Time Customer
            </p>
          </div>
          {chartState?.timeCustomersGraphState == true && (
            // <OneTimeMultiTimeCustomer customerData={graphData?.timeCustomersData} />
            <OneTimeMultiTimeCustomer customerData={OneTimeMultiTimeData} />
          )}
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Country Wise User
              </p>
            </div>
            {chartState?.countryWiseCustomerGraphState == true && (
              <PieChart
                chartData={graphData?.countryWiseCustomerData}
                colors={graphData?.countryWiseCustomerData?.colors}
              />
            )}
          </div>
          <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Most Visited Products
              </p>
            </div>
            {chartState?.mostVisitedProductsGraphState == true && (
              <PyramidBarChart data={graphData?.mostVisitedProducts} />
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Most Purchased Products
              </p>
            </div>
            {chartState?.mostPurchasedProductsGraphState == true && (
              <PolarAreaChart data={graphData?.mostPurchasedProducts} />
            )}
          </div>
          <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Un Sold Products
              </p>
            </div>
            <RangeBarChart data={un_sold_products} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Best Selling Products
              </p>
            </div>
            {
              chartState?.bestSellingProductsGraphState == true && (

                <PatternedDonutChart data={graphData?.bestSellingProducts} />
                // <PatternedDonutChart data={best_selling_products} />
              )
            }
          </div>
          <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Most ATC Products
              </p>
            </div>
            {
              chartState?.mostATCProductsGraphState == true && (
                <RadialBarChart data={graphData?.mostATCProducts} />
                // <RadialBarChart data={most_ATC_products} />
              )
            }
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Most Visited Ctaegories
              </p>
            </div>
            <GradientLineChart data={most_visited_categories} />
          </div>
          <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Combined Top Views (Products, Categories, Pages)
              </p>
            </div>
            <div>
              <div>
                <label htmlFor="productFilter">Select Top: </label>
                <select
                  id="productFilter"
                  onChange={handleVisitedFilterChange}
                  value={visitedSelectedFilter}
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
          </div>
        </div>
        <div className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
          <div className="h-16">
            <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
              Customer Distribution by Page
            </p>
          </div>
          <CustomerDistributionChart
            distributionData={customer_distribution_by_page}
          />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
          >
            <div className=" h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Top Customers by Orders
              </p>
            </div>
            <label htmlFor="topNSelect">Show Top: </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Top 3">Top 3</option>
              <option value="Top 5">Top 5</option>
              <option value="Top 10">Top 10</option>
            </select>

            <CustomerPolarAreaChart series={seriescustomer} labels={labels} />
          </div>

          <div
            className="mt-8 col-span-12 rounded-sm border border-stroke bg-white px-5
                pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
          >
            <div className="h-16">
              <p className="mt-5 text-black font-bold flex h-8 items-center justify-between px-4 sm:px-5 p-7">
                Entry Page - Exit Page
              </p>
            </div>
            <DumbbellRangebarChart data={customerPageViewData} />
          </div>
        </div>
      </main>
    </>
  );
};

export default PeopleDetailedAnalytics;