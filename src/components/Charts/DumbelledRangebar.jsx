import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// Function to count occurrences of each customer
const countCustomers = (data) => {
  const customerCount = {};

  data.forEach((_, index) => {
    const customerKey = `Customer ${index + 1}`; // Create a unique customer key
    if (customerCount[customerKey]) {
      customerCount[customerKey] += 1; // Increment count if already exists
    } else {
      customerCount[customerKey] = 1; // Initialize count
    }
  });

  return customerCount;
};

// Function to get top N customers
const getTopCustomers = (customerCount, topN) => {
  const sortedCustomers = Object.entries(customerCount)
    .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
    .slice(0, topN); // Get top N customers

  return sortedCustomers.map(([customer]) => customer); // Return only customer names
};

// Function to convert customer data into chart-ready data with indices
const convertDataToChartFormat = (data, topCustomers) => {
  const pageMapping = ["home", "product", "collection", "cart", "pages"];

  return data
    .map((item, index) => {
      const customerKey = `Customer ${index + 1}`;
      if (topCustomers.includes(customerKey)) {
        return {
          x: customerKey, // Customer label
          y: [
            pageMapping.indexOf(item.entryPage), // Entry page index
            pageMapping.indexOf(item.exitPage), // Exit page index
          ],
          entryPage: item.entryPage, // Keep entry page for tooltip
          exitPage: item.exitPage, // Keep exit page for tooltip
        };
      }
      return null; // Exclude non-top customers
    })
    .filter(Boolean); // Remove nulls from the array
};

const DumbbellRangebarChart = ({ data }) => {
  const [topN, setTopN] = useState(5);

  const customerCount = countCustomers(data);
  const topCustomers = getTopCustomers(customerCount, topN);
  const chartData = convertDataToChartFormat(data, topCustomers);
  const chartOptions = {
    chart: {
      height: 400,
      type: "rangeBar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#008FFB", "#00E396"],
    plotOptions: {
      bar: {
        horizontal: true,
        isDumbbell: true,
        dumbbellColors: [["#008FFB", "#00E396"]],
      },
    },
    // title: {
    //     text: 'Customer Journey',
    //     align: 'center',
    // },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      customLegendItems: ["Entry Point", "Exit Point"],
    },
    xaxis: {
      title: {
        text: "Pages",
      },
      labels: {
        formatter: (val) => {
          const pageMapping = [
            "home",
            "product",
            "collection",
            "cart",
            "pages",
          ];
          return pageMapping[Number(val)]; // Convert index to page name
        },
      },
    },
    yaxis: {
      title: {
        text: "Customers",
      },
    },
    tooltip: {
      enabled: false,
      // shared: true,
      // intersect: false,
      // formatter: function (series) {
      //     // Get the index of the hovered data point
      //     const dataIndex = series[0].dataIndex;
      //     const entryPage = chartData[dataIndex]?.entryPage; // Safely access entryPage
      //     const exitPage = chartData[dataIndex]?.exitPage;   // Safely access exitPage
      //     const customerLabel = chartData[dataIndex]?.x;      // Access customer label

      //     // Ensure all variables are defined before creating the tooltip
      //     if (customerLabel && entryPage && exitPage) {
      //         return `${customerLabel}: ${entryPage} - ${exitPage}`; // Format the tooltip output
      //     } else {
      //         return 'Data not available'; // Fallback if something is wrong
      //     }
      // },
    },
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#00E396"],
        inverseColors: false,
        stops: [0, 100],
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  const chartSeries = [
    {
      data: chartData,
    },
  ];

  const handleDropdownChange = (event) => {
    setTopN(Number(event.target.value));
  };

  return (
    <div>
      <div>
        <label htmlFor="top-customers">Select Top: </label>
        <select id="top-customers" value={topN} onChange={handleDropdownChange}>
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="rangeBar"
          height={400}
        />
      </div>
    </div>
  );
};

export default DumbbellRangebarChart;
