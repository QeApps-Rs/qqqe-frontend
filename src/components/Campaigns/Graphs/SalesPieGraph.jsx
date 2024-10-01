import React, { useState } from "react";
import Chart from "react-apexcharts";

const SalesPieGraph = () => {
  // State to manage chart options and series
  const [chartData] = useState({
    series: [44, 55, 13, 43, 22], // Example data
    options: {
      chart: {
        type: "pie",
        height: "100%", // Full height
        width: "100%", // Full width
      },
      labels: ["Product A", "Product B", "Product C", "Product D", "Product E"], // Labels for pie segments
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%", // Responsive width
              height: 300, // Height for smaller screens
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      title: {
        text: "Product Sales Distribution",
        align: "left",
      },
    },
  });

  return (
    <div className="flex justify-center items-center  p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full h-full">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={350} // Ensure the chart fills its container
          width="100%"
        />
      </div>
    </div>
  );
};

export default SalesPieGraph;
