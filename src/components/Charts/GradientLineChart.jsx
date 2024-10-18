import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const GradientLineChart = ({ data }) => {
  const [filterCount, setFilterCount] = useState(5); // Default to top 5

  // Filter the data based on the selected filterCount (top 5 or top 10)
  const filteredData = data.slice(0, filterCount);
  const categoryNames = filteredData.map(item => item.category_name);
  const categoryCounts = filteredData.map(item => parseInt(item.category_count));

  const options = {
    series: [{
      name: 'Category Count',
      data: categoryCounts,
    }],
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    forecastDataPoints: {
      count: 7
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      categories: categoryNames,
      tickAmount: filterCount,
      labels: {
        formatter: function(value) {
          return value;
        }
      },
      title: {
        text: 'Categories'
      }
    },
    // title: {
    //   text: 'Most Visited Categories',
    //   align: 'left',
    //   style: {
    //     fontSize: "16px",
    //     color: '#666'
    //   }
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#F44F5E'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    yaxis: {
      title: {
        text: 'Count'
      },
    },
    colors: ['#4fc0f4'],
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>Show Top: </label>
        <select value={filterCount} onChange={(e) => setFilterCount(parseInt(e.target.value))}>
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>

      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default GradientLineChart;
