// src/app/dashboard/analysis/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
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
  Filler
} from 'chart.js';
import { BiDownload } from 'react-icons/bi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Monthly Performance',
    data: [2450, 3120, 4580, 3720, 4890, 5650, 6950, 7420, 8180, 8950, 9380, 10250],
    borderColor: '#3fcb1b',
    backgroundColor: 'rgba(63,203,27,0.1)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#3fcb1b',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
  }],
};

const monthlyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    label: 'Profit',
    data: [1250, 890, 1560, 2340],
    backgroundColor: '#3fcb1b',
    borderRadius: 8,
    barPercentage: 0.7,
  }],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { color: 'rgba(255,255,255,0.7)' }
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.9)',
      titleColor: '#fff',
      bodyColor: '#ccc',
      borderColor: '#3fcb1b',
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: 'rgba(255,255,255,0.6)' },
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255,255,255,0.6)' },
    },
  },
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { color: 'rgba(255,255,255,0.7)' }
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.9)',
      titleColor: '#fff',
      bodyColor: '#ccc',
      borderColor: '#3fcb1b',
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: 'rgba(255,255,255,0.6)' },
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255,255,255,0.6)' },
    },
  },
};

export default function AnalysisPage() {
  const [timeframe, setTimeframe] = useState('yearly');

  const handleDownloadReport = () => {
    alert('Report downloaded successfully!');
  };

  return (
    <div className="analysis-page">
      <div className="page-header">
        <h1>Trading Analysis</h1>
        <p>Analyze your trading performance with advanced metrics</p>
      </div>

      <div className="action-bar">
        <div className="timeframes">
          {['weekly', 'monthly', 'yearly'].map((tf) => (
            <button key={tf} className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`} onClick={() => setTimeframe(tf)}>
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
        <button className="download-btn" onClick={handleDownloadReport}><BiDownload size={16} /> Download Report</button>
      </div>

      <div className="charts-grid">
        <div className="chart-card large">
          <h3>Performance Overview</h3>
          <div className="chart-container">
            <Line data={performanceData} options={lineOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Breakdown</h3>
          <div className="chart-container small">
            <Bar data={monthlyData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card"><h4>Sharpe Ratio</h4><p>1.85</p><span>Excellent</span></div>
        <div className="metric-card"><h4>Max Drawdown</h4><p>-12.5%</p><span>Low Risk</span></div>
        <div className="metric-card"><h4>Average Win</h4><p>+$245</p><span>+15%</span></div>
        <div className="metric-card"><h4>Average Loss</h4><p>-$85</p><span>-8%</span></div>
        <div className="metric-card"><h4>Best Trade</h4><p>+$890</p><span>BTC/USD</span></div>
        <div className="metric-card"><h4>Worst Trade</h4><p>-$150</p><span>GBP/USD</span></div>
      </div>

      <style jsx>{`
        .analysis-page { max-width: 1400px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .action-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
        .timeframes { display: flex; gap: 10px; }
        .timeframe-btn { padding: 8px 20px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-secondary); cursor: pointer; transition: all 0.3s ease; }
        .timeframe-btn:hover { background: rgba(63,203,27,0.1); }
        .timeframe-btn.active { background: rgba(63,203,27,0.1); border-color: #3fcb1b; color: #3fcb1b; }
        .download-btn { display: flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); border-radius: 10px; color: #3fcb1b; cursor: pointer; transition: all 0.3s ease; }
        .download-btn:hover { background: rgba(63,203,27,0.2); }

        .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
        @media (max-width: 768px) { .charts-grid { grid-template-columns: 1fr; } }
        .chart-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; }
        .chart-card.large { grid-column: span 2; }
        @media (max-width: 768px) { .chart-card.large { grid-column: span 1; } }
        .chart-card h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; }
        .chart-container { height: 350px; }
        .chart-container.small { height: 300px; }

        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
        .metric-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; text-align: center; transition: all 0.3s ease; }
        .metric-card:hover { transform: translateY(-4px); border-color: #3fcb1b; }
        .metric-card h4 { font-size: 13px; color: var(--text-secondary); margin: 0 0 8px; }
        .metric-card p { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .metric-card span { font-size: 11px; color: #10b981; margin-top: 8px; display: block; }
      `}</style>
    </div>
  );
}