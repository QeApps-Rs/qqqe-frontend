/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const TotalTimeSpentChart = ({ PagesTimeSpent }) => {
  const [timeRange, setTimeRange] = useState("weekly"); // Default time range
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true, // Enable stacking
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: [], // Will be set dynamically
      labels: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: "Time Spent (minutes)",
      },
      min: 0, // Start from zero
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

  // Update chart data based on the selected time range
  const updateChartData = () => {
    const categories = [];
    const stackedData = [];

    const timeData = PagesTimeSpent[timeRange]; // Get time data for the selected range

    for (const date in timeData) {
      categories.push(date);

      timeData[date].pages.forEach((page, index) => {
        const spentTime = timeData[date].spent_time[index];
        const existingPage = stackedData.find((s) => s.name === page);

        if (existingPage) {
          existingPage.data.push(spentTime); // Push data for existing pages
        } else {
          stackedData.push({
            name: page,
            data: [spentTime], // Add new page data
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

export default TotalTimeSpentChart;
