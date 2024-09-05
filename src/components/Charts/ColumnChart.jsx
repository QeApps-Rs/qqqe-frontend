import React, { useState, useEffect } from 'react';
import Apexcharts from '../apexChart/ApexChart';

const ColumnChart = ({ columnChart }) => {
    const [state, setState] = useState({
        columnSeries: [],
    });

    useEffect(() => {
        if (columnChart) {
            setState({
                columnSeries: columnChart.columnSeries,
            });
        }
    }, [columnChart]);

    const options = {
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
            type: 'Default Type',
            categories: columnChart?.xaxis?.categories || [],
            title: {
                text: columnChart?.xaxis?.title?.text || 'X Axis'
            }

        },
        yaxis: {
            max: columnChart?.yaxis?.max || 300,
            labels: {
                formatter: (val) => `${val}`,
            },
            title: {
                text: columnChart?.yaxis?.title?.text || 'Y Axis'
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
    };

    return (
        <div>
            <Apexcharts options={options} series={state.columnSeries} type="bar" height={350} />
        </div>
    );
};

export default ColumnChart;
