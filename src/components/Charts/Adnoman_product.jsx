/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const AbandonProductChart = ({ abandon_checkout_products }) => {
  const [timeRange, setTimeRange] = useState("today"); // Default time range
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
        text: "Product Count",
      },
      min: 0, // Start from zero
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
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

    if (timeRange === "today") {
      const todayData = abandon_checkout_products.today["2024-10-17"];
      categories.push("2024-10-17"); // Push today's date as the category
      const data = todayData.product_count;

      // Prepare series data for stacking
      todayData.prodct.forEach((product, index) => {
        stackedData.push({
          name: product,
          data: [data[index]], // Data for each product for today
        });
      });
    } else if (timeRange === "weekly") {
      const today = new Date("2024-10-17");
      const weekData = abandon_checkout_products.weekly;
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        if (weekData[dateString]) {
          categories.push(dateString);
          weekData[dateString].prodct.forEach((product, index) => {
            const productCount = weekData[dateString].product_count[index];
            const existingProduct = stackedData.find((s) => s.name === product);

            if (existingProduct) {
              existingProduct.data.push(productCount); // Push product count for this date
            } else {
              stackedData.push({
                name: product,
                data: [productCount], // Start a new entry for this product
              });
            }
          });
        } else {
          // If no data for the day, fill with 0s
          categories.push(dateString);
          stackedData.forEach((s) => {
            s.data.push(0); // Fill with 0 if no data for that date
          });
        }
      }
    } else if (timeRange === "monthly") {
      const monthData = abandon_checkout_products.monthly;
      for (const month in monthData) {
        categories.push(month);
        monthData[month].prodct.forEach((product, index) => {
          const productCount = monthData[month].product_count[index];
          const existingProduct = stackedData.find((s) => s.name === product);

          if (existingProduct) {
            existingProduct.data.push(productCount); // Push product count for this month
          } else {
            stackedData.push({
              name: product,
              data: [productCount], // Start a new entry for this product
            });
          }
        });
      }
    } else if (timeRange === "yearly") {
      const yearData = abandon_checkout_products.yearly;
      for (let year = 2024; year >= 2020; year--) {
        const yearString = year.toString();
        categories.push(yearString); // Add year to categories

        if (yearData[yearString]) {
          yearData[yearString].prodct.forEach((product, index) => {
            const productCount = yearData[yearString].product_count[index];
            const existingProduct = stackedData.find((s) => s.name === product);

            if (existingProduct) {
              existingProduct.data.push(productCount || 0); // Use 0 if data is missing
            } else {
              // Initialize new product entry
              stackedData.push({
                name: product,
                data: [productCount || 0], // Start a new entry for this product
              });
            }
          });
        } else {
          // If no data for the year, fill with 0s for each product
          stackedData.forEach((s) => {
            s.data.push(0); // Fill with 0 if no data for that year
          });
        }
      }

      // Ensure all products are accounted for
      const allProducts = [...new Set(stackedData.map((s) => s.name))];
      allProducts.forEach((product) => {
        if (!stackedData.find((s) => s.name === product)) {
          stackedData.push({
            name: product,
            data: new Array(categories.length).fill(0), // Fill with zeros for all years
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

export default AbandonProductChart;
