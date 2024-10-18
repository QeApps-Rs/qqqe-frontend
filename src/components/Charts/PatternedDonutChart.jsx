import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PatternedDonutChart = ({ data }) => {
  const [filterCount, setFilterCount] = useState(5); // Default to top 5

  // Prepare the filtered data based on the selection (top 5 or top 10)
  const filteredData = data
    .sort((a, b) => b.product_count - a.product_count) // Sort by count in descending order
    .slice(0, filterCount); // Filter top 5 or top 10

  const series = filteredData.map(item => parseInt(item.product_count, 10));
  const labels = filteredData.map(item => item.product_name);

  const options = {
    series,
    chart: {
      width: 380,
      type: 'donut',
      dropShadow: {
        enabled: true,
        color: '#111',
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2
      }
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: false, // Hide total label, as we want to show actual counts
            }
          }
        }
      }
    },
    labels,
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex }) {
        // Display the actual count instead of percentage
        return series[seriesIndex]; // Return the actual product count
      },
      dropShadow: {
        blur: 3,
        opacity: 0.8
      }
    },
    fill: {
      type: 'pattern',
      opacity: 1,
      pattern: {
        enabled: true,
        style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines','verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
      },
    },
    states: {
      hover: {
        filter: 'none'
      }
    },
    theme: {
      palette: 'palette2'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div>
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
        series={options.series} // Use the series prepared earlier
        type="donut"
        height={350}
      />
    </div>
  );
};

export default PatternedDonutChart;
