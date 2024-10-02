import React from "react";
import Chart from "react-apexcharts";

const SalesPieGraph = ({ seriesData, labels, chartTitle }) => {
  // Chart options and series with dynamic data and labels
  const chartData = {
    series: seriesData || [], // Use seriesData from props
    options: {
      chart: {
        type: "pie",
        height: "100%", // Full height
        width: "100%",  // Full width
      },
      labels: labels || [], // Use labels from props
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",  // Responsive width
              height: 300,    // Height for smaller screens
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      title: {
        text: chartTitle || "Product Sales Distribution", // Use chartTitle from props
        align: "left",
      },
    },
  };

  return (
    <div className="flex justify-center items-center p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full h-full">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={350}  // Ensure the chart fills its container
          width="100%"
        />
      </div>
    </div>
  );
};

export default SalesPieGraph;
