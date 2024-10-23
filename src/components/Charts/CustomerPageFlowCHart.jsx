/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Define page mappings for y-axis
const pageMapping = ["home", "product", "collection", "cart", "pages"];

// Function to transform customer data into chart series format
const transformDataToSeries = (data) => {
  return data.map((customer, index) => {
    return {
      name: `Customer${index + 1}`, // Label customers as Customer1, Customer2, etc.
      data: customer.y, // Use 'y' directly from the data
    };
  });
};

const CustomerPageFlowChart = ({ customerPageFlowData }) => {
  const [series, setSeries] = useState([]);
  const [topN, setTopN] = useState(5); // Default to showing top 5 customers
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [2, 2, 2, 2, 2],
      curve: "smooth",
    },
    xaxis: {
      labels: {
        show: true,
      },
      title: {
        text: "Step in Flow",
      },
    },
    yaxis: {
      categories: pageMapping, // Use the page names for y-axis categories
      title: {
        text: "Pages",
      },
      labels: {
        formatter: (value) => pageMapping[value], // Display page names instead of indices
      },
    },
    colors: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF5733",
      "#FF4560",
      "#00E396",
      "#3056D3",
    ],
  });

  useEffect(() => {
    // Take the top N customers from the data
    const transformedSeries = transformDataToSeries(
      customerPageFlowData.slice(0, topN)
    );
    setSeries(transformedSeries);
  }, [topN, customerPageFlowData]);

  const handleTopNChange = (e) => {
    setTopN(parseInt(e.target.value, 10));
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        {/* Dropdown to select the number of customers to display */}
        <label className="text-gray-700 mr-3">Show Top: </label>
        <select
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
          id="customer-select"
          value={topN}
          onChange={handleTopNChange}
        >
          <option value="5">Top 5</option>
          <option value="10">Top 10</option>
        </select>
      </div>

      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default CustomerPageFlowChart;
