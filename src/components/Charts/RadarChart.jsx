import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadarChart = ({ series, categories, title }) => {
    const options = {
        chart: {
            type: 'radar',
            height: 350
        },
        title: {
            text: title
        },
        xaxis: {
            categories
        }
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radar" height={350} />
        </div>
    );
};

export default RadarChart;
