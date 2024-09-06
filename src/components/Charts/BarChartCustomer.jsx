import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChartcustomer = ({
  chartData,
  name,
  title,
  isHorizontal,
  dataLabelStatus,
  barColors
}) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      fontFamily: "Satoshi, sans-serif",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top", // top, center, bottom
        },
        horizontal: isHorizontal ?? false,
      },
    },
    dataLabels: {
      enabled: dataLabelStatus ?? true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: chartData ? chartData.categories : [], // Set x-axis categories
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val;
        },
      },
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
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3056D3", "#80CAEE"], 
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

  });

  useEffect(() => {
    if (chartData) {
      setSeries([{ name: name, data: chartData.data }]); // Set the series data

      // Create an array with alternating colors
     

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { categories: chartData.categories }, // Update x-axis categories
        colors: barColors, // Apply alternating colors
      }));
    }
  }, [chartData, name]);

  return (
    <div>
      <div id="Bar-Chart" className="-ml-5">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default BarChartcustomer;
