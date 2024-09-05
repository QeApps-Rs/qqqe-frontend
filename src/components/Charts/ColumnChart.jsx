import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
          },
        },
        xaxis: {
          categories: [
            "iPhone",
            "X11",
            "Windows NT 10.0",
            "Linux",
            "Macintosh",
            "Windows NT 6.1",
            "iPad",
          ],
          title: {
            text: 'Category'
          }
        },
        yaxis: {
          max: 300,
          labels: {
            formatter: (val) => `${val}`,
          },
          title: {
            text: 'Amount'
          }
        },
        tooltip: {
          y: {
            formatter: (val) => `${val}`,
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          markers: {
            borderRadius: 80,
            width: 10,
            height: 10,
            strokeWidth: 0,
          },
        },
      },
      series: [
        {
          name: 'Inflation',
          data: [36, 245, 55, 62, 10, 7, 3],
          color: "#b1399e"
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
    );
  }
}

export default ColumnChart;
