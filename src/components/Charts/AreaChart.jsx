import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ series, title, categories }) => {
  const options = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: title,
      align: "left",
    },
    stroke: {
      //curve: 'smooth',
      //width: 2,
      curve: "straight",
    },
    xaxis: {
      categories: categories || [],
      title: {
        text: "Products",
      },
    },
    yaxis: {
      title: {
        text: "Counts",
      },
    },
    colors: ["#FF5733"],
    tooltip: {
      shared: false,
      intersect: false,
    },
  };

  return (
    <div className="p-4">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
