/* eslint-disable react/prop-types */
import Apexcharts from '../apexChart/ApexChart';

const PieChart = ({ chartData,title }) => {
    const options = {
        chart: {
            type: 'donut',
        },
        colors: chartData.colors,
        labels: chartData.labels,
        plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270,
            },
          },
          dataLabels: {
            enabled: true,
          },
          fill: {
            type: "gradient",
          },
          title: {
            text: title,
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
              color: "#444",
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
    };

    return (
        <div id="chart" className="p-4">
            <Apexcharts   width="100%"  height={350} type="donut" series={chartData.pieSeries} options={options} />
        </div>
    );
};

export default PieChart;
