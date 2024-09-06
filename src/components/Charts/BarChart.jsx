import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({
  chartData,
  name,
  title,
  isHorizontal,
  dataLabelStatus,
  colors
}) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (chartData) {
      // Prepare data for the chart
      const countries = Object.keys(chartData); // x-axis categories
      const values = Object.values(chartData); // series data

      setSeries([{ name: name, data: values }]); // Set the series data
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { categories: countries }, // Set the x-axis categories
      }));
    }
  }, [chartData]);

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
        distributed: true, 
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
      categories: [], // Initially empty, will be set by useEffect
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
    colors: colors,
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

export default BarChart;
