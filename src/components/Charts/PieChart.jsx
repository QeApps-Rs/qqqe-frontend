/* eslint-disable react/prop-types */
import Apexcharts from '../apexChart/ApexChart';

const PieChart = ({ chartData }) => {
    const options = {
        chart: {
            type: 'donut',
        },
        labels: chartData.labels,
        legend: {
            show: true,
            position: 'bottom',
        },
    };

    return (
        <div id="chart">
            <Apexcharts type="donut" series={chartData.pieSeries} options={options} />
        </div>
    );
};

export default PieChart;
