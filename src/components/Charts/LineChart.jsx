import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options1: {
        chart: {
          type: 'line',
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val}`,
          style: {
            fontSize: '12px',
            colors: ["#fff"],
            background: '#fff',
            borderRadius: 5,
          },
          background: {
            enabled: true,
            foreColor: '#b1399e',
            padding: 4,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#b1399e',
            opacity: 1,
          },
        },
        xaxis: {
          categories: ['2023-01', '2023-04', '2023-07', '2023-10', '2024-01', '2024-04', '2024-07'],
          title: {
            text: 'Quarter'
          }
        },
        yaxis: {
          title: {
            text: 'Customer'
          }
        },
        colors: ['#b1399e'],
      },
      series1: [
        {
          name: 'Series 1',
          data: [0, 5, 60, 15, 8, 2, 30],
        },
      ]
    };
  }


  render() {
    return (
      <div>
        <Chart options={this.state.options1} series={this.state.series1} type="line" height={350} />
      </div>
    );
  }
}

export default LineChart;
