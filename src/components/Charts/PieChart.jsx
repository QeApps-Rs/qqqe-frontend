import React, { useState } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const PieChart = ({ pieChart }) => {
    // const [data] = useState([
    //     { label: 'Most Purchased Products', value: 267 },
    //     { label: 'Un-sold Products', value: 1125 },
    //     { label: 'Best Selling Products', value: 200 }
    // ]);
    // const [tableData, setTableData] = useState(null);
    // const [showTable, setShowTable] = useState(false);

    // const handleDataPointClick = (dataPointIndex) => {
    //     const dataPoint = data[dataPointIndex];

    //     setTableData(dataPoint);
    //     setShowTable(true);
    // };

    const options = {
        chart: {
            type: 'donut',
            // events: {
            //     dataPointSelection: (event, chartContext, { dataPointIndex }) => {
            //         handleDataPointClick(dataPointIndex);
            //     }
            // }
        },
        labels: pieChart.labels,
        legend: {
            show: true,
            position: 'bottom',
            // horizontalAlign: 'center',
            // fontSize: '14px',
            // labels: {
            //     colors: '#333'
            // },
            // markers: {
            //     width: 10,
            //     height: 10,
            //     radius: 12,
            //     offsetX: 0,
            //     offsetY: 0,
            //     strokeColor: '#fff',
            //     strokeWidth: 0,
            //     fillColors: undefined
            // }
        },
        // dataLabels: {
        //     formatter: (val, opts) => {
        //         const seriesValue = opts.w.config.series[opts.seriesIndex];
        //         return seriesValue !== undefined ? `${seriesValue} units` : 'N/A';
        //     },
        // },
        // tooltip: {
        //     y: {
        //         formatter: (val) => (val !== undefined ? `${val} units` : 'N/A')
        //     }
        // }
    };

    // const renderTable = () => {
    //     if (!showTable || !tableData) return null;

    //     const { label, value } = tableData;
    //     return (
    //         <table border="1" style={{ marginTop: '20px', width: "100%" }}>
    //             <thead>
    //                 <tr>
    //                     <th className='text-justify'>Label</th>
    //                     <th className='text-justify'>Value</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td>{label}</td>
    //                     <td>{value} units</td>
    //                 </tr>
    //             </tbody>
    //         </table>
    //     );
    // };

    return (
        <div id="chart">
            <Apexcharts type="donut" series={pieChart.pieSeries} options={options} />
            {/* {renderTable()} */}
        </div>
    );
};

export default PieChart;
