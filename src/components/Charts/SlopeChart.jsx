import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const SlopeChart = ({
  chartData,
  name,
  title,
  isHorizontal,
  dataLabelStatus,
}) => {
  const [series, setSeries] = useState([
    {
      data: chartData?.data,
    },
  ]);

  // Page names mapping
  const pageNames = {
    0: "Home",
    1: "Product",
    2: "Collection",
    3: "Cart",
    4: "Pages",
  };

  const [options, setOptions] = useState({
    chart: {
      height: 390,
      type: "rangeBar",
      zoom: {
        enabled: false,
      },
    },
    colors: ["#EC7D31", "#36BDCB"],
    plotOptions: {
      bar: {
        horizontal: true,
        isDumbbell: true,
        dumbbellColors: [["#EC7D31", "#36BDCB"]],
      },
    },
    title: {
      text: title,
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      horizontalAlign: "left",
      customLegendItems: ["Entry Page", "Exit Page"],
    },
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#36BDCB"],
        inverseColors: false,
        stops: [0, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        formatter: function (val) {
          // Convert the numerical value to the corresponding page name
          return ` ${pageNames[val] || ""}`;
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val) {
          return val;
        },
      },
    },
  });

  return (
    <div>
      <div id="Bar-Chart" className="-ml-5">
        <ReactApexChart
          options={options}
          series={series}
          type="rangeBar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default SlopeChart;
