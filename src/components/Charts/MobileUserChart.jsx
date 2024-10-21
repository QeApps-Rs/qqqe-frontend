import React, { useState, useEffect } from "react";
import Apexcharts from "../apexChart/ApexChart";
import { defaultBoxClassName } from "../../pages/forms/masterFormConfig";

const MobileUsersChart = ({ orderData }) => {
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
        title: { text: "Total Users" },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " users";
          },
        },
      },
      colors: ["#008FFB", "#00E396", "#FF4560", "#775DD0", "#FEB019"], // Add more colors for additional devices
    },
  });

  // Function to fetch static data from the passed prop
  const fetchStaticData = () => {
    let data;
    // Select the correct static data based on timeRange
    if (timeRange === "today") {
      data = orderData.today;
      updateXAxisTitle("Today");
    } else if (timeRange === "weekly") {
      data = orderData.weekly;
      updateXAxisTitle("Week");
    } else if (timeRange === "monthly") {
      data = orderData.monthly;
      updateXAxisTitle("Month");
    } else if (timeRange === "yearly") {
      data = orderData.yearly;
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
    const iosData = data.ios || [];
    const androidData = data.android || [];

    // Prepare series with default iOS and Android data
    let series = [
      { name: "iOS Users", data: iosData },
      { name: "Android Users", data: androidData },
    ];

    // Check for any additional devices beyond iOS and Android
    Object.keys(data).forEach((key) => {
      if (key !== "ios" && key !== "android" && key !== "dates") {
        series.push({
          name: `${key.charAt(0).toUpperCase() + key.slice(1)} Users`,
          data: data[key],
        });
      }
    });

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
      <div className="w-full flex justify-end">
        <select
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
        >
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
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

export default MobileUsersChart;

// import React, { useState, useEffect } from 'react';
// import Apexcharts from '../apexChart/ApexChart';

// const MobileUsersChart = ({ orderData }) => {
//     const [timeRange, setTimeRange] = useState('today'); // Default to 'today'
//     const [chartState, setChartState] = useState({
//         series: [],
//         options: {
//             chart: {
//                 type: 'bar',
//                 height: 350,
//                 toolbar: { show: false },
//             },
//             plotOptions: {
//                 bar: {
//                     horizontal: false,
//                     columnWidth: '55%',
//                     endingShape: 'rounded',
//                 },
//             },
//             dataLabels: { enabled: false },
//             stroke: { show: true, width: 2, colors: ['transparent'] },
//             xaxis: {
//                 categories: [],
//             },
//             yaxis: {
//                 title: { text: 'Total Users' },
//             },
//             fill: { opacity: 1 },
//             tooltip: {
//                 y: {
//                     formatter: function (val) {
//                         return val + " users";
//                     },
//                 },
//             },
//             colors: ['#008FFB', '#00E396', '#FF4560', '#775DD0','#FEB019'], // Add more colors for additional devices
//         },
//     });

//     // Function to fetch static data from the passed prop
//     const fetchStaticData = () => {
//         let data;
//         // Select the correct static data based on timeRange
//         if (timeRange === 'today') {
//             data = orderData.today;
//         } else if (timeRange === 'weekly') {
//             data = orderData.weekly;
//         } else if (timeRange === 'monthly') {
//             data = orderData.monthly;
//         } else if (timeRange === 'yearly') {
//             data = orderData.yearly;
//         }

//         // Update the chart with static data
//         updateChartData(data);
//     };

//     // Function to update the chart data based on received data
//     const updateChartData = (data) => {
//         const categories = data.dates;
//         const iosData = data.ios || [];
//         const androidData = data.android || [];

//         // Prepare series with default iOS and Android data
//         let series = [
//             { name: 'iOS Users', data: iosData },
//             { name: 'Android Users', data: androidData },
//         ];

//         // Check for any additional devices beyond iOS and Android
//         Object.keys(data).forEach((key) => {
//             if (key !== 'ios' && key !== 'android' && key !== 'dates') {
//                 series.push({
//                     name: `${key.charAt(0).toUpperCase() + key.slice(1)} Users`,
//                     data: data[key],
//                 });
//             }
//         });

//         // Update chart state
//         setChartState((prevState) => ({
//             ...prevState,
//             series: series,
//             options: {
//                 ...prevState.options,
//                 xaxis: { categories: categories },
//             },
//         }));
//     };

//     // Call fetchStaticData whenever timeRange changes
//     useEffect(() => {
//         fetchStaticData();
//     }, [timeRange]);

//     return (
//         <div>
//             {/* Time Range Dropdown */}
//             <select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
//                 <option value="today">Today</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//             </select>

//             {/* Chart */}
//             <Apexcharts options={chartState.options} series={chartState.series} type="bar" height={350} />
//         </div>
//     );
// };

// export default MobileUsersChart;
