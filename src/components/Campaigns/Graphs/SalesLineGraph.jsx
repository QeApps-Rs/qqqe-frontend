import React from "react";
import Chart from "react-apexcharts";

const SalesLineGraph = ({ salesLineData, lineCategories, lineyAxisTitle }) => {
  // Chart options and series with dynamic data and labels
  const chartData = {
    series: [
      {
        name: "Sales",
        data: salesLineData || [], // Use salesData from props
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
        categories: lineCategories || [], // Use categories from props
      },
      yaxis: {
        title: {
          text: lineyAxisTitle || "Sales", // Use yAxisTitle from props
        },
      },
    },
  };

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
