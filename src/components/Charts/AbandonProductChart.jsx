import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const AbandonProductChart = ({ abandon_checkout_products }) => {
  const [timeRange, setTimeRange] = useState("monthly"); // Default time range
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    xaxis: {
      categories: [], // Will be set dynamically
      labels: { show: true },
    },
    yaxis: {
      title: { text: "Product Count" },
      min: 0, // Start from zero
    },
    tooltip: { shared: true, intersect: false },
    legend: { position: "bottom" },
    fill: { opacity: 1 },
  });

  // Utility function to format date to 'YYYY-MM-DD'
  const formatDate = (date) => date.toISOString().split("T")[0];
  const todayDate = formatDate(new Date());

  // Update chart data based on the selected time range
  const updateChartData = () => {
    const categories = [];
    const stackedData = [];

    if (timeRange === "today" && abandon_checkout_products.today[todayDate]) {
      const todayData = abandon_checkout_products.today[todayDate];
      categories.push(todayDate);
      todayData.product.forEach((product, index) => {
        stackedData.push({
          name: product,
          data: [todayData.product_count[index] || 0],
        });
      });
    } else if (timeRange === "weekly") {
      const weeklyData = abandon_checkout_products.weekly;
      Object.keys(weeklyData).forEach((date) => {
        categories.push(date);
        weeklyData[date].product.forEach((product, index) => {
          const productIndex = stackedData.findIndex((item) => item.name === product);
          if (productIndex >= 0) {
            stackedData[productIndex].data.push(weeklyData[date].product_count[index] || 0);
          } else {
            const dataArray = Array(categories.length - 1).fill(0);
            dataArray.push(weeklyData[date].product_count[index] || 0);
            stackedData.push({ name: product, data: dataArray });
          }
        });
      });
      stackedData.forEach((productData) => {
        while (productData.data.length < categories.length) {
          productData.data.push(0);
        }
      });
    } else if (timeRange === "monthly") {
      const monthlyData = abandon_checkout_products.monthly;
      Object.keys(monthlyData).forEach((month) => {
        categories.push(month);
        monthlyData[month].product.forEach((product, index) => {
          const productIndex = stackedData.findIndex((item) => item.name === product);
          if (productIndex >= 0) {
            stackedData[productIndex].data.push(monthlyData[month].product_count[index] || 0);
          } else {
            const dataArray = Array(categories.length - 1).fill(0);
            dataArray.push(monthlyData[month].product_count[index] || 0);
            stackedData.push({ name: product, data: dataArray });
          }
        });
      });
      stackedData.forEach((productData) => {
        while (productData.data.length < categories.length) {
          productData.data.push(0);
        }
      });
    } else if (timeRange === "yearly") {
      const yearlyData = abandon_checkout_products.yearly;
      Object.keys(yearlyData).forEach((year) => {
        categories.push(year);
        yearlyData[year].product.forEach((product, index) => {
          const productIndex = stackedData.findIndex((item) => item.name === product);
          if (productIndex >= 0) {
            stackedData[productIndex].data.push(yearlyData[year].product_count[index] || 0);
          } else {
            const dataArray = Array(categories.length - 1).fill(0);
            dataArray.push(yearlyData[year].product_count[index] || 0);
            stackedData.push({ name: product, data: dataArray });
          }
        });
      });
      stackedData.forEach((productData) => {
        while (productData.data.length < categories.length) {
          productData.data.push(0);
        }
      });
    }

    setSeries(stackedData);
    setOptions((prev) => ({
      ...prev,
      xaxis: { ...prev.xaxis, categories },
    }));
  };

  useEffect(() => {
    updateChartData();
  }, [timeRange, abandon_checkout_products]);

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
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default AbandonProductChart;
