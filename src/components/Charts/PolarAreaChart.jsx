import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PolarAreaChart = ({ data }) => {
  const [filter, setFilter] = useState(5); // Default filter to show top 5

  // Sort the data by product count and slice it based on the filter
  const filteredData = data
    .sort((a, b) => parseInt(b.product_count) - parseInt(a.product_count))
    .slice(0, filter);

  const productNames = filteredData.map((item) => item.product_name);
  const productCounts = filteredData.map((item) =>
    parseInt(item.product_count)
  );

  const options = {
    series: productCounts,
    chart: {
      type: "polarArea",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: productNames,
  };

  // Handler to update the filter
  const handleFilterChange = (e) => {
    setFilter(parseInt(e.target.value));
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        <label className="text-gray-700 mr-3">Show Top: </label>
        <select
          id="filter"
          onChange={handleFilterChange}
          value={filter}
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="polarArea"
        height={350}
      />
    </div>
  );
};

export default PolarAreaChart;
