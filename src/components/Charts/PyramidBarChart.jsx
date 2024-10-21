import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PyramidBarChart = ({ data }) => {
  const [filterCount, setFilterCount] = useState(5); // Default to top 5 products

  // Filter the data based on the selected filterCount (top 5 or top 10)
  const filteredData = data.slice(0, filterCount);
  const productNames = filteredData.map((item) => item.product_name);
  const productCounts = filteredData.map((item) =>
    parseInt(item.product_count)
  );

  const options = {
    series: [
      {
        name: "Product Count",
        data: productCounts,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    colors: [
      "#F44F5E",
      "#E55A89",
      "#D863B1",
      "#CA6CD8",
      "#B57BED",
      "#8D95EB",
      "#62ACEA",
      "#4BC3E6",
    ],
    dataLabels: {
      enabled: true,
      // formatter: function (val, opt) {
      //   return productNames[opt.dataPointIndex];
      // },
      formatter: function (val, opt) {
        // Display the product name along with its count
        return `${productNames[opt.dataPointIndex]}: ${val}`;
      },
      dropShadow: {
        enabled: true,
      },
    },
    // title: {
    //   //text: `Top ${filterCount} Most Visited Products`,
    //   align: 'center',
    // },
    xaxis: {
      categories: productNames,
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        <label className="text-gray-700 mr-3">Show Top: </label>
        <select
          value={filterCount}
          onChange={(e) => setFilterCount(parseInt(e.target.value))}
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>

      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default PyramidBarChart;
