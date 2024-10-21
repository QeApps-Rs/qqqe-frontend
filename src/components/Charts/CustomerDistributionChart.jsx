import React, { useState, useEffect } from "react";
import Apexcharts from "../apexChart/ApexChart";

const CustomerDistributionChart = ({ distributionData }) => {
  const [timeRange, setTimeRange] = useState("monthly"); // Default to 'today'
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: {
        categories: [],
        title: { text: "" }, // Initialize x-axis title
      },
      yaxis: {
        title: { text: "Page Count" },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " visits";
          },
        },
      },
      colors: ["#FF4560", "#00E396", "#775DD0", "#008FFB", "#FEB019"], // Colors for different pages
    },
  });

  // Function to fetch static data from the passed prop
  const fetchStaticData = () => {
    let data;
    // Select the correct static data based on timeRange
    if (timeRange === "today") {
      data = distributionData.today;
      updateXAxisTitle("Today");
    } else if (timeRange === "weekly") {
      data = distributionData.weekly;
      updateXAxisTitle("Week");
    } else if (timeRange === "monthly") {
      data = distributionData.monthly;
      updateXAxisTitle("Month");
    } else if (timeRange === "yearly") {
      data = distributionData.yearly;
      updateXAxisTitle("Year");
    }

    // Update the chart with static data
    updateChartData(data);
  };

  // Function to update the x-axis title
  const updateXAxisTitle = (title) => {
    setChartState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          title: { text: title },
        },
      },
    }));
  };

  // Function to update the chart data based on received data
  const updateChartData = (data) => {
    const categories = data.dates;
    const homePageData = data.home_page_count || [];
    const productPageData = data.product_page_count || [];
    const categoryPageData = data.category_page_count || [];
    const cartPageData = data.cart_page_count || [];
    const pageData = data.pages_count || [];

    // Prepare series with page data
    let series = [
      { name: "Home Page Visits", data: homePageData },
      { name: "Product Page Visits", data: productPageData },
      { name: "Category Page Visits", data: categoryPageData },
      { name: "Cart Page Visits", data: cartPageData },
      { name: "Page Visits", data: pageData },
    ];

    // Update chart state
    setChartState((prevState) => ({
      ...prevState,
      series: series,
      options: {
        ...prevState.options,
        xaxis: { ...prevState.options.xaxis, categories: categories },
      },
    }));
  };

  // Call fetchStaticData whenever timeRange changes
  useEffect(() => {
    fetchStaticData();
  }, [timeRange]);

  return (
    <div className="p-4">
      {/* Time Range Dropdown */}
      <label>Show Top:</label>
      <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
        <option value="today">Today</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Chart */}
      <Apexcharts
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default CustomerDistributionChart;
