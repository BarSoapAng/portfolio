"use client";

import { useMemo } from "react";
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

const labels = ['Ownership', 'Speed', 'Quality', 'Communication', 'Design']

const FALLBACK_CHART_COLORS = {
  accent: "#ef476f",
  accentSoft: "rgba(239, 71, 111, 0.35)",
  grid: "rgba(54, 83, 109, 0.2)",
  transparent: "transparent",
};

export default function RadarChart() {
  const chartColors = FALLBACK_CHART_COLORS;

  const devData = useMemo(() => ({
    labels,
    datasets: [
      {
        data: [4, 2, 4, 5, 3],
        fill: true,
        backgroundColor: chartColors.accentSoft,
        borderColor: chartColors.accent,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: chartColors.accent,
      },
    ],
  }), [chartColors]);

  const options: ChartOptions<'radar'> = useMemo(() => ({
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 600,
    },
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          display: false,
        },
        grid: {
          color: chartColors.grid,
        },
        angleLines: {
          color: chartColors.grid,
        },
        pointLabels: {
          color: '#1f3442',
          font: {
            size: 9,
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
        backgroundColor: '#1f3442',
        titleFont: {
          weight: 'bold' as const,
        },
        displayColors: false,
      },
    },
  }), [chartColors])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-full max-h-[175px] w-full max-w-[175px]">
        <Radar 
          data={devData}
          options={options}
        />
      </div>
    </div>
  )
}
