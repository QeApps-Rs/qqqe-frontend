import React from "react";
import Chart from "react-apexcharts";

const SalesBarGraph = ({ salesBarData, barCategories, baryAxisTitle }) => {
  // Chart options and series with dynamic data and labels
  const chartData = {
    series: [
      {
        name: "Sales",
        data: salesBarData || [], // Use salesData from props
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: "100%",
        width: "100%",
        responsive: [
          {
            breakpoint: 1000, // Custom breakpoint for medium screens
            options: {
              chart: {
                height: 300,
              },
              plotOptions: {
                bar: {
                  columnWidth: "70%", // Adjust column width for medium screens
                },
              },
            },
          },
          {
            breakpoint: 600, // Custom breakpoint for small screens
            options: {
              chart: {
                height: 250,
              },
              plotOptions: {
                bar: {
                  columnWidth: "80%", // Adjust column width for small screens
                },
              },
              xaxis: {
                labels: {
                  show: true, // Show x-axis labels
                },
              },
              yaxis: {
                labels: {
                  show: true, // Show y-axis labels
                },
              },
            },
          },
        ],
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      title: {
        text: "Product Sales",
        align: "left",
      },
      xaxis: {
        categories: barCategories || [], // Use categories from props
      },
      yaxis: {
        title: {
          text: baryAxisTitle || "Sales", // Use yAxisTitle from props
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `$ ${val}`;
          },
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
          type="bar"
          height="100%" // Adjust to fill the parent container height
        />
      </div>
    </div>
  );
};

export default SalesBarGraph;
