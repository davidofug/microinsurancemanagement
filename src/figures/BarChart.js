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

import faker from 'faker';


function BarChart () {
    
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
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly  Motor Third Party Stickers',
            },
        },
    };
      
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Total monthly Sales',
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 200],
                backgroundColor: '#E0E7EC',
            },
        ],
    };
    return <Bar options={options} data={data}/>
}

export default BarChart
