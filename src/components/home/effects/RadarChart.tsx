"use client";

import { Radar } from 'react-chartjs-2'
import {
  Chart,
  ChartOptions,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
)

const devData = {
  labels: ['Ownership', 'Speed', 'Quality', 'Communication', 'Design'],
  datasets: [
    {
      data: [4, 2, 4, 5, 3],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.35)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: 'rgb(255, 99, 132)',
    },
  ],
}

const options: ChartOptions<'radar'> = {
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        backdropColor: 'transparent',
      },
      grid: {
        color: 'rgba(0,0,0,0.2)',
      },
      pointLabels: {
        font: {
          size: 10,
          weight: 'bold',
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      titleFont: {
        weight: 'bold' as const,
      },
      displayColors: false,
    },
  },
}

Chart.defaults.font.size = 8;

export default function RadarChart() {
  return (
    <div className="h-full w-full">
      <Radar 
        data={devData}
        options={options}
      />
    </div>
  )
}
