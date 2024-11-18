import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TrackEventChart = ({ EventTrack }) => {
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
    { name: "Blog", data: seriesData.map((day) => day[5]) },
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
