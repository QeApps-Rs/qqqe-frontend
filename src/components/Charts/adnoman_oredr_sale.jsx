/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const AdnomanOrderSale = ({ abandon_checkout_order_sales }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: [], // This will be populated based on the selected timeframe
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("today");

  useEffect(() => {
    const data = abandon_checkout_order_sales[selectedTimeFrame];

    if (data) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: data.dates,
        },
      }));

      const newSeries = [
        {
          name: "Sales Count",
          data: data.sales_count,
        },
      ];

      setSeries(newSeries);
    }
  }, [selectedTimeFrame]);

  const handleTimeFrameChange = (event) => {
    setSelectedTimeFrame(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center">
        <select
          className="h-12 bg-white w-30 rounded-lg text-black border flex justify-end p-1 font-bold border-strokedark shadow-md focus:outline-none"
          value={selectedTimeFrame}
          onChange={handleTimeFrameChange}
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
      <div id="html-dist"></div>
    </div>
  );
};

export default AdnomanOrderSale;
