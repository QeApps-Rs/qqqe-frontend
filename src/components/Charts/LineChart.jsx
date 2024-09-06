import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ series, title, categories }) => {
  const options = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: title,
      align: 'left',
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: categories || [],
      title: {
        text: 'Title',
      },
    },
    yaxis: {
      title: {
        text: 'Views',
      },
    },
    colors: ['#FF5733', '#33FF57', '#3357FF'],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
