import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import graphData from '../helpers/GraphData';

function BarChart () {
    const { sales, labels } = graphData;
    ChartJS.register (
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
      
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: false,
                text: 'Monthly  Motor Third Party Stickers',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            }
            
        }
    };
      
    
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Sticker sales',
                data: [...sales],
                backgroundColor: '#E0E7EC',
                hoverBackgroundColor:"#1475CF"
            },
        ],
    };
    return <Bar options={options} data={data}/>
}

export default BarChart
