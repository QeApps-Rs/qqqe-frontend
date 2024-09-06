import React from "react";
import ReactApexChart from "react-apexcharts";

const StepLineChart = ({ data, title }) => {
  const series = [
    {
      name: title,
      data: data.map((item) => ({
        x: item.keyword,
        y: item.count,
      })),
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      }
    },
    
    title: {
      text: title,
      align: "left",
    },
    stroke: {
      curve: "stepline",
    },
    xaxis: {
      type: "category",
      title: {
        text: "Keywords",
      },
      labels: {
        rotate: -45, // Optional: Rotate labels for better readability
      },
    },
    yaxis: {
      title: {
        text: "Count",
      },
      min: 0,
    },
    tooltip: {
      shared: false,
      intersect: false,
    },
    colors: ["#00C292"], // Customize the color as needed
    markers: {
      size: 5,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default StepLineChart;
