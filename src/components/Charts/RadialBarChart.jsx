import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialBarChart = ({ data }) => {
  const [filterCount, setFilterCount] = useState(5); // Default to top 5

  // Sort and filter data based on filter count
  const filteredData = data
    .sort((a, b) => b.product_count - a.product_count)
    .slice(0, filterCount);

  const series = filteredData.map(item => parseInt(item.product_count, 10));
  const labels = filteredData.map(item => item.product_name);

  const options = {
    chart: {
      height: filterCount > 5 ? 450 : 390,  // Increase height for more data points
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          }
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -10, // Adjust offset to give more room
          fontSize: filterCount > 5 ? '12px' : '18px', // Smaller font for more data
          formatter: function (seriesName, opts) {
            return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
          },
        },
      }
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#f45252', '#72b419', '#f0a30a', '#b267e6', '#e14eca', '#45b6f7'],
    labels, // Dynamic labels
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300, // Smaller width on small devices
        },
        plotOptions: {
          radialBar: {
            barLabels: {
              fontSize: '10px', // Reduce font size on smaller screens
            }
          }
        }
      }
    }],
    tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val + " counts"; // Add unit to tooltips
        }
      }
    }
  };

  return (
    <div className="p-4">
      <div>
        <label htmlFor="filter">Show Top: </label>
        <select
          id="filter"
          value={filterCount}
          onChange={(e) => setFilterCount(Number(e.target.value))}
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>

      <ReactApexChart
        options={options}
        series={series} // Use filtered series
        type="radialBar"
        height={options.chart.height} // Dynamically adjust height
      />
    </div>
  );
};

export default RadialBarChart;
