import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const EventTrack = {
  today: {
    "2024-10-18": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
  },
  weekly: {
    "2024-10-18": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    "2024-10-17": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [25, 20, 10, 10, 25],
    },
    "2024-10-16": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [45, 16, 27, 50, 30],
    },
    "2024-10-15": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [25, 36, 17, 20, 10],
    },
    "2024-10-14": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 46, 37, 35, 22],
    },
    "2024-10-13": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [35, 36, 37, 30, 30],
    },
    "2024-10-12": {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [25, 26, 27, 20, 20],
    },
  },
  monthly: {
    january: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [25, 26, 17, 30, 20],
    },
    february: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [35, 16, 67, 30, 20],
    },
    march: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    april: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [35, 16, 27, 40, 10],
    },
    may: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    june: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [35, 16, 27, 20, 40],
    },
    july: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [25, 46, 57, 10, 20],
    },
    august: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    september: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [19, 28, 47, 20, 20],
    },
    october: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    november: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    december: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
  },
  yearly: {
    2024: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    2023: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [55, 46, 27, 30, 20],
    },
    2022: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [35, 16, 17, 30, 20],
    },
    2021: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [15, 26, 17, 30, 20],
    },
    2020: {
      label: ["home", "product", "collection", "cart", "checkout"],
      count: [12, 24, 11, 20, 20],
    },
  },
};

const TrackEventChart = () => {
  const [timeframe, setTimeframe] = useState("weekly");

  const categories = Object.keys(EventTrack[timeframe]);
  const seriesData = Object.values(EventTrack[timeframe]).map(
    (day) => day.count
  );

  // Prepare series for each label
  const series = [
    { name: "Home", data: seriesData.map((day) => day[0]) },
    { name: "Product", data: seriesData.map((day) => day[1]) },
    { name: "Collection", data: seriesData.map((day) => day[2]) },
    { name: "Cart", data: seriesData.map((day) => day[3]) },
    { name: "Checkout", data: seriesData.map((day) => day[4]) },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Time Spent (minutes)",
      },
      min: 0,
    },
    // colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019'],
    tooltip: {
      enabled: true,
      shared: false,
      formatter: function (val, { seriesIndex, dataPointIndex }) {
        const label = series[seriesIndex].name;
        return `${label}: ${val}`;
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        <select
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default TrackEventChart;
