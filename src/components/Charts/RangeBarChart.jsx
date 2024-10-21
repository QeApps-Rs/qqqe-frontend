import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const RangeBarChart = ({ data }) => {
  const [filterCount, setFilterCount] = useState(5); // Default to top 5

  // Prepare the filtered data based on the selection (top 5 or top 10)
  const filteredData = data
    .sort((a, b) => b.product_count - a.product_count) // Sort by count in descending order
    .slice(0, filterCount); // Filter top 5 or top 10

  const productNames = filteredData.map((item) => item.product_name);
  const productCounts = filteredData.map((item) =>
    parseInt(item.product_count, 10)
  );

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Makes the bar chart horizontal
        distributed: true, // Adds different colors for each bar
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toString(); // Display the count on each bar
      },
    },
    xaxis: {
      categories: productNames, // Product names on the y-axis (since horizontal)
      title: {
        text: "Product Count",
      },
    },
    yaxis: {
      title: {
        text: "Products",
      },
    },
    legend: {
      show: false,
    },
    colors: ["#008FFB", "#00E396", "#775DD0", "#FEB019", "#FF4560"], // Color set for the bars
  };

  const series = [
    {
      data: productCounts, // Product counts will be displayed on the x-axis
    },
  ];

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        <label className="text-gray-700 mr-3">Show Top: </label>
        <select
          id="filter"
          value={filterCount}
          onChange={(e) => setFilterCount(Number(e.target.value))}
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default RangeBarChart;
