import React, { useEffect, useState } from "react";
import Apexcharts from "../apexChart/ApexChart";

const MultiSeriesLineChart = ({
  chartTitle,
  orderData,
  dateRange,
  isToday,
  xAxisTitle,
}) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        type: "line", // Change chart type to line
        height: 350,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [2, 6], // Line widths for different series
        curve: ["straight", "monotoneCubic"], // Different curves for the lines
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [], // Dates/categories will be passed dynamically
        title: {
          text: xAxisTitle,
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      colors: ["#00E396", "#FEB019"], // Blue for total sales, Green for average sales
    },
  });

  useEffect(() => {
    if (orderData && dateRange && Object.keys(orderData).length > 0) {
      const months = Object.keys(orderData).map(
        (month) => month.charAt(0).toUpperCase() + month.slice(1)
      );

      let salesValues = [];
      let averageValues = [];
      // console.log(orderData, "salesData");

      // If it's for today's data (single object)
      if (isToday) {
        salesValues = [parseFloat(orderData.total_order_count)];
        averageValues = [parseFloat(orderData.average_order_count)];
      } else {
        // For monthly data (multiple months)
        salesValues = Object.values(orderData).map((data) =>
          parseFloat(data.total_order_count)
        );
        averageValues = Object.values(orderData).map((data) =>
          parseFloat(data.average_order_count)
        );
      }

      setChartState((prevState) => ({
        ...prevState,
        series: [
          { name: "Total Sales", data: salesValues },
          { name: "Average Sales", data: averageValues },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            categories: isToday ? dateRange : months, // Set dynamic x-axis
          },
        },
      }));
    }
  }, [orderData, dateRange, isToday]);

  return (
    <div className="p-4">
      <h2>{chartTitle}</h2>
      <Apexcharts
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default MultiSeriesLineChart;
