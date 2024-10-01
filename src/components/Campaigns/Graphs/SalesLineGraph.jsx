import React, { useState } from "react";
import Chart from "react-apexcharts";

const SalesLineGraph = () => {
  // State to manage chart options and series
  const [chartData] = useState({
    series: [
      {
        name: "Sales",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // Example data
      },
    ],
    options: {
      chart: {
        type: "line",
        height: "100%",  
        zoom: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 1000,  
            options: {
              chart: {
                height: 300, 
              },
            },
          },
          {
            breakpoint: 600,  
            options: {
              chart: {
                height: 250,  
              },
              xaxis: {
                labels: {
                  show: true,  
                },
              },
              yaxis: {
                labels: {
                  show: true,  
                },
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Product Sales",
        align: "left",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        title: {
          text: "Sales",
        },
      },
    },
  });

  return (
    <div className="flex justify-center items-center p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full h-full">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350} 
        />
      </div>
    </div>
  );
};

export default SalesLineGraph;
