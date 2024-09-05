import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'donut',
          events: {
            dataPointSelection: (event, chartContext, { dataPointIndex }) => {
              this.handleDataPointClick(dataPointIndex);
            }
          }
        },
        labels: ['Most Purchased Products', 'Un-sold Products', 'Best Selling Products'],
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          labels: {
            colors: '#333'
          },
          markers: {
            width: 10,
            height: 10,
            radius: 12,
            offsetX: 0,
            offsetY: 0,
            strokeColor: '#fff',
            strokeWidth: 0,
            fillColors: undefined
          }
        },
        dataLabels: {
          formatter: (val, opts) => {
            const seriesValue = opts.w.config.series[opts.seriesIndex];
            return seriesValue !== undefined ? `${seriesValue} units` : 'N/A';
          },
        },
        tooltip: {
          y: {
            formatter: (val) => {
              return val !== undefined ? `${val} units` : 'N/A';
            }
          }
        },
      },
      series: [267, 1125, 200],
      data: [
        { label: 'Most Purchased Products', value: 267 },
        { label: 'Un-sold Products', value: 1125 },
        { label: 'Best Selling Products', value: 200 }
      ],
      tableData: null,
      showTable: false
    };
  }

  handleDataPointClick = (dataPointIndex) => {
    const dataPoint = this.state.data[dataPointIndex];
    this.setState({
      tableData: dataPoint,
      showTable: true
    });
  };

  renderTable = () => {
    if (!this.state.showTable || !this.state.tableData) return null;

    const { label, value } = this.state.tableData;
    return (
      <table border="1" style={{ marginTop: '20px', width: "100%" }}>
        <thead>
          <tr>
            <th className='text-justify'>Label</th>
            <th className='text-justify'>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{label}</td>
            <td>{value} units</td>
          </tr>
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
        />
        {this.renderTable()}
      </div>
    );
  }
}

export default PieChart;
