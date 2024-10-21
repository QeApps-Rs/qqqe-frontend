import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomerPolarAreaChart = ({ series, labels }) => {
  const options = {
    chart: {
      width: 380,
      type: 'polarArea'
    },
    labels: labels,
    fill: {
      opacity: 1
    },
    stroke: {
      width: 1,
      colors: undefined
    },
    yaxis: {
      show: false
    },
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0
        },
        spokes: {
          strokeWidth: 0
        },
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 0.6
      }
    }
  };

  return (
    <div className="p-4">
      <ReactApexChart
        options={options}
        series={series}
        type="polarArea"
        height={350}
      />
    </div>
  );
};

export default CustomerPolarAreaChart;
