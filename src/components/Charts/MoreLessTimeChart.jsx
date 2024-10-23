/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Sample MostTimeSpent data

const MoreTimeChart = ({ PagesTimeSpent }) => {
  const [timeRange, setTimeRange] = useState("weekly");
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
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
    xaxis: {
      categories: [],
      labels: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: "Time Spent (minutes)",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      show: true,
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },
  });

  const updateChartData = () => {
    const categories = [];
    const stackedData = [];

    const timeData = PagesTimeSpent[timeRange];

    for (const date in timeData) {
      categories.push(date); // Add date to categories
      timeData[date].pages.forEach((page, index) => {
        const spentTime = timeData[date].spent_time[index];
        const existingPage = stackedData.find((s) => s.name === page);

        if (existingPage) {
          existingPage.data.push(spentTime); // Push time spent for this page on this date
        } else {
          stackedData.push({
            name: page,
            data: [spentTime], // Start a new entry for this page
          });
        }
      });
    }

    setSeries(stackedData); // Update series data
    setOptions((prev) => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        categories, // Set the dynamic categories
      },
    }));
  };

  // Effect to update chart data when timeRange changes
  useEffect(() => {
    updateChartData(); // Update chart data when time range changes
  }, [timeRange]);

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        <select
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
        >
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default MoreTimeChart;
