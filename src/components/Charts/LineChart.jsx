import React from 'react';
import Apexcharts from '../apexChart/ApexChart';

const LineChart = ({ lineChart }) => {
    const options1 = {
        chart: {
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val}`,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
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
            categories: lineChart?.xaxis?.categories || [],
            title: {
                text: lineChart?.xaxis?.title?.text || 'X Axis'
            },
        },
        yaxis: {
            title: {
                text: lineChart?.yaxis?.title?.text || 'Y Axis'
            },
        },
    };

    return (
        <div>
            <Apexcharts options={options1} series={lineChart?.lineSeries} type="line" height={350} />
        </div>
    );
};

export default LineChart;
