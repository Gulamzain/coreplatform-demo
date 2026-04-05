// src/app/dashboard/analytics/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { BiTrendingUp, BiTrendingDown, BiCalendar } from 'react-icons/bi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const weeklyProfitData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Profit',
      data: [450, 620, 580, 720, 890, 650, 430],
      backgroundColor: 'rgba(63, 203, 27, 0.5)',
      borderColor: '#3fcb1b',
      borderWidth: 2,
      borderRadius: 8,
    },
  ],
};

const monthlyProfitData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Profit',
      data: [2450, 3120, 4580, 3720, 4890, 5650, 6950, 7420, 8180, 8950, 9380, 10250],
      borderColor: '#3fcb1b',
      backgroundColor: 'rgba(63, 203, 27, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const instrumentPerformance = {
  labels: ['EUR/USD', 'GBP/USD', 'XAU/USD', 'BTC/USD', 'NAS100'],
  datasets: [
    {
      data: [35, 20, 25, 12, 8],
      backgroundColor: ['#3fcb1b', '#22c55e', '#16a34a', '#15803d', '#0d9488'],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const, labels: { color: 'rgba(255,255,255,0.7)' } },
    tooltip: { backgroundColor: 'rgba(0,0,0,0.9)', borderColor: '#3fcb1b', borderWidth: 1 },
  },
  scales: {
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.6)' } },
    x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.6)' } },
  },
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: 'rgba(0,0,0,0.9)', borderColor: '#3fcb1b', borderWidth: 1 },
  },
  scales: {
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.6)' } },
    x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.6)' } },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' as const, labels: { color: 'rgba(255,255,255,0.7)' } },
  },
};

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('monthly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-gray-400">Track your trading performance</p>
        </div>
        <div className="flex gap-2">
          {['weekly', 'monthly', 'yearly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                timeframe === tf
                  ? 'bg-green-500 text-black'
                  : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Profit', value: '$10,250', change: '+23.5%', icon: <BiTrendingUp />, color: 'green' },
          { label: 'Win Rate', value: '68.5%', change: '+5.2%', icon: <BiTrendingUp />, color: 'green' },
          { label: 'Total Trades', value: '127', change: '+12', icon: <BiTrendingUp />, color: 'green' },
          { label: 'Profit Factor', value: '1.85', change: '+0.15', icon: <BiTrendingUp />, color: 'green' },
        ].map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-400">{kpi.label}</p>
              <div className="p-1 rounded-lg bg-green-500/20 text-green-400">{kpi.icon}</div>
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className={`text-xs flex items-center gap-1 mt-1 text-green-400`}>{kpi.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Chart */}
        <div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Profit/Loss Overview</h3>
          <div className="h-80">
            {timeframe === 'weekly' ? (
              <Bar data={weeklyProfitData} options={barOptions} />
            ) : (
              <Line data={monthlyProfitData} options={chartOptions} />
            )}
          </div>
        </div>

        {/* Instrument Performance */}
        <div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Instrument Performance</h3>
          <div className="h-80">
            <Doughnut data={instrumentPerformance} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Best Trade</p>
            <p className="text-xl font-bold text-green-400">+$890.20</p>
            <p className="text-xs text-gray-500">BTC/USD · Mar 9, 2024</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Worst Trade</p>
            <p className="text-xl font-bold text-red-400">-$150.75</p>
            <p className="text-xs text-gray-500">GBP/USD · Mar 12, 2024</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Average Win</p>
            <p className="text-xl font-bold text-green-400">+$245.30</p>
            <p className="text-xs text-gray-500">Per winning trade</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Average Loss</p>
            <p className="text-xl font-bold text-red-400">-$85.20</p>
            <p className="text-xs text-gray-500">Per losing trade</p>
          </div>
        </div>
      </div>
    </div>
  );
}