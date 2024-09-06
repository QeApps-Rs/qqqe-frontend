import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({
  chartData,
  name,
  title,
  isHorizontal,
  dataLabelStatus,
}) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      width: 380,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: "gradient",
    },
    title: {
      text: title,
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
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
    labels: [], // Add labels for the legend here
  });

  useEffect(() => {
    if (chartData) {
      const legendData = Object.keys(chartData); // Get the keys as legend data
      const values = Object.values(chartData); // Get the values for the series

      setSeries(values); // Update series with the values

      // Update options to include labels for the legend
      setOptions((prevOptions) => ({
        ...prevOptions,
        labels: legendData, // Set the legend labels dynamically
      }));
    }
  }, [chartData, title]); // Also, include `title` in the dependencies to reflect any changes to it

  return (
    <div>
      <div id="Bar-Chart" className="-ml-5">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default DonutChart;
