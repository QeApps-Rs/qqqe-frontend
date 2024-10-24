/* eslint-disable react/prop-types */
// CustomerLostTrackData.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const CustomerLostTrackData = ({ customerLostTrackData }) => {
  const [timeFrame, setTimeFrame] = React.useState("today"); // State for time frame selection

  // Prepare data for the chart based on the selected time frame
  const getFilteredData = () => {
    const currentDate = new Date();
    return customerLostTrackData.filter((customer) => {
      const customerDate = new Date(customer.date);
      switch (timeFrame) {
        case "today":
          return customerDate.toDateString() === currentDate.toDateString();
        case "weekly":
          return currentDate - customerDate <= 7 * 24 * 60 * 60 * 1000; // 7 days
        case "monthly":
          return (
            customerDate.getMonth() === currentDate.getMonth() &&
            customerDate.getFullYear() === currentDate.getFullYear()
          );
        case "yearly":
          return customerDate.getFullYear() === currentDate.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredData = getFilteredData();

  // Prepare track counts based on the filtered data
  const trackLabels = ["Product", "Search", "Collection", "Page"];
  const trackCounts = trackLabels.map((label) => {
    return filteredData.filter((customer) =>
      customer.track
        .map((track) => track.toLowerCase())
        .includes(label.toLowerCase())
    ).length;
  });

  // Define chart options and series
  const options = {
    chart: {
      width: 400,
      type: "pie",
    },
    labels: trackLabels,
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
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        {/* Dropdown for selecting the time frame */}
        {/* <label style={{ marginBottom: "16px" }}>Select Time Frame:</label> */}
        <select
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div
        id="chart"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <ReactApexChart
          options={options}
          series={trackCounts}
          type="pie"
          width={400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CustomerLostTrackData;
