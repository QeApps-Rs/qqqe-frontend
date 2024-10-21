import React from "react";
import ReactApexChart from "react-apexcharts";

const DataBarChart = ({ series, xAxisCategories }) => {
  const options = {
    chart: {
      height: 380,
      type: "bar",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: xAxisCategories,
      title: {
        text: "Count",
      },
    },
    yaxis: {
      title: {
        text: "Product, Category, Page",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#008FFB", "#00E396", "#FEB019"], // Customize colors for each series
  };

  return (
    <div className="p-4">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={380}
      />
    </div>
  );
};

export default DataBarChart;
