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

Chart.defaults.font.size = 8;

export default function RadarChart() {
  const withAlpha = (color: string, alpha: number) => {
    const hex = color.replace("#", "");
    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  };

  const chartColors = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        accent: "var(--color-pink-1)",
        accentSoft: withAlpha("#db2777", 0.35),
        grid: withAlpha("#345362", 0.2),
        transparent: "var(--color-transparent)",
      };
    }

    const getColor = (token: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(token).trim();

    const accent = getColor('--color-pink-1');
    const gray = getColor('--color-gray-1');

    return {
      accent,
      accentSoft: withAlpha(accent, 0.35),
      grid: withAlpha(gray, 0.2),
      transparent: getColor('--color-transparent'),
    };
  }, []);

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

const options: ChartOptions<'radar'> = {
  maintainAspectRatio: false,
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
        color: 'rgba(0,0,0,0.2)',
      },
      pointLabels: {
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
      titleFont: {
        weight: 'bold' as const,
      },
      displayColors: false,
    },
  },
}

Chart.defaults.font.size = 8;

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
