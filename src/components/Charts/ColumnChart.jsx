/* eslint-disable react/prop-types */
import Apexcharts from '../apexChart/ApexChart';

const ColumnChart = ({ chartData }) => {
    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                distributed: true, 
            },
        },
        xaxis: {
            categories: chartData?.categories || [],
            title: {
                text: chartData.xtitle || 'X Axis'
            }

        },
        yaxis: {
            labels: {
                formatter: (val) => `${val}`,
            },
            title: {
                text: chartData.ytitle || 'Y Axis'
            },
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
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    };

    return (
        <div>
            <Apexcharts options={options} series={chartData?.seriesData || []} type="bar" height={350} />
        </div>
    );
};

export default ColumnChart;
