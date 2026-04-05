// src/app/dashboard/portfolio/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiPieChart, BiTrendingUp, BiTrendingDown, BiDollar, BiLineChart, BiCalendar, BiDownload } from 'react-icons/bi';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const portfolioData = {
  labels: ['Forex', 'Commodities', 'Indices', 'Crypto', 'Stocks'],
  datasets: [{
    data: [45, 20, 15, 12, 8],
    backgroundColor: ['#3fcb1b', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec489a'],
    borderWidth: 0,
  }],
};

const equityData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
  datasets: [{
    label: 'Portfolio Value',
    data: [12500, 14200, 13800, 15600, 16800, 18500, 19200, 20500],
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

const holdings = [
  { symbol: 'EUR/USD', type: 'Forex', value: 8500, change: 5.2, allocation: 45 },
  { symbol: 'XAU/USD', type: 'Commodity', value: 3800, change: 3.8, allocation: 20 },
  { symbol: 'NAS100', type: 'Index', value: 2850, change: 2.1, allocation: 15 },
  { symbol: 'BTC/USD', type: 'Crypto', value: 2280, change: 8.5, allocation: 12 },
  { symbol: 'AAPL', type: 'Stock', value: 1520, change: 1.5, allocation: 8 },
];

const recentTransactions = [
  { id: 1, type: 'Buy', symbol: 'EUR/USD', amount: 5000, price: 1.08432, date: '2024-03-15' },
  { id: 2, type: 'Sell', symbol: 'GBP/USD', amount: 3000, price: 1.27680, date: '2024-03-14' },
  { id: 3, type: 'Buy', symbol: 'BTC/USD', amount: 2000, price: 68200, date: '2024-03-13' },
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: 'rgba(255,255,255,0.7)', usePointStyle: true, boxWidth: 8 },
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.9)',
      titleColor: '#fff',
      bodyColor: '#ccc',
      borderColor: '#3fcb1b',
      borderWidth: 1,
    },
  },
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
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
      ticks: { color: 'rgba(255,255,255,0.6)', callback: (v: any) => '$' + v.toLocaleString() },
    },
    x: {
      grid: { display: false },
      ticks: { color: 'rgba(255,255,255,0.6)' },
    },
  },
};

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState('monthly');

  const handleExport = () => {
    alert('Portfolio report exported successfully!');
  };

  return (
    <div className="portfolio-page">
      <div className="page-header">
        <h1>Portfolio Overview</h1>
        <p>Track your investment performance and allocation</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card"><p>Total Value</p><h3>$20,500.00</h3><span className="positive">+12.5%</span></div>
        <div className="stat-card"><p>Daily P&L</p><h3>+$1,250.00</h3><span className="positive">+7.2%</span></div>
        <div className="stat-card"><p>Total Return</p><h3>+$5,500.00</h3><span className="positive">+36.7%</span></div>
        <div className="stat-card"><p>Win Rate</p><h3>68.5%</h3><span className="positive">+5.2%</span></div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Asset Allocation</h3>
            <button className="export-btn" onClick={handleExport}><BiDownload size={14} /> Export</button>
          </div>
          <div className="chart-container">
            <Doughnut data={portfolioData} options={chartOptions} />
          </div>
          <div className="allocation-list">
            {portfolioData.labels.map((label, i) => (
              <div key={label} className="allocation-item">
                <div className="color-dot" style={{ background: portfolioData.datasets[0].backgroundColor[i] }}></div>
                <span>{label}</span>
                <span className="percentage">{portfolioData.datasets[0].data[i]}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Portfolio Growth</h3>
            <div className="timeframes">
              {['weekly', 'monthly', 'yearly'].map((tf) => (
                <button key={tf} className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`} onClick={() => setTimeframe(tf)}>
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container large">
            <Line data={equityData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Holdings Section */}
      <div className="holdings-section">
        <div className="section-header">
          <h3>Holdings</h3>
          <button className="view-all">View All →</button>
        </div>
        <div className="holdings-list">
          {holdings.map((holding, index) => (
            <motion.div
              key={holding.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="holding-item"
            >
              <div className="holding-info">
                <h4>{holding.symbol}</h4>
                <p>{holding.type}</p>
              </div>
              <div className="holding-value">
                <span>${holding.value.toLocaleString()}</span>
                <span className={holding.change >= 0 ? 'positive' : 'negative'}>
                  {holding.change >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                  {holding.change}%
                </span>
              </div>
              <div className="holding-bar">
                <div className="bar-fill" style={{ width: `${holding.allocation}%` }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <button className="view-all">View History →</button>
        </div>
        <div className="table-container">
          <table className="transactions-table">
            <thead>
              <tr><th>Date</th><th>Type</th><th>Symbol</th><th>Amount</th><th>Price</th></tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, index) => (
                <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                  <td>{tx.date}</td>
                  <td><span className={`tx-type ${tx.type === 'Buy' ? 'buy' : 'sell'}`}>{tx.type}</span></td>
                  <td className="symbol">{tx.symbol}</td>
                  <td>${tx.amount.toLocaleString()}</td>
                  <td>{tx.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .portfolio-page { max-width: 1400px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-4px); border-color: #3fcb1b; }
        .stat-card p { font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; }
        .stat-card h3 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .stat-card .positive { color: #10b981; font-size: 12px; }

        .charts-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; margin-bottom: 32px; }
        @media (max-width: 768px) { .charts-grid { grid-template-columns: 1fr; } }

        .chart-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        .chart-header h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .export-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(63,203,27,0.1); border: none; border-radius: 8px; color: #3fcb1b; cursor: pointer; }
        .timeframes { display: flex; gap: 8px; }
        .timeframe-btn { padding: 6px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-secondary); cursor: pointer; font-size: 12px; }
        .timeframe-btn.active { background: rgba(63,203,27,0.1); border-color: #3fcb1b; color: #3fcb1b; }

        .chart-container { height: 280px; margin-bottom: 20px; }
        .chart-container.large { height: 320px; }

        .allocation-list { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-top: 16px; }
        .allocation-item { display: flex; align-items: center; gap: 8px; }
        .color-dot { width: 10px; height: 10px; border-radius: 50%; }
        .allocation-item span { font-size: 13px; color: var(--text-secondary); }
        .allocation-item .percentage { color: var(--text-primary); font-weight: 600; }

        .holdings-section, .transactions-section { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; margin-bottom: 32px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .section-header h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .view-all { background: none; border: none; color: #3fcb1b; cursor: pointer; font-size: 13px; }

        .holdings-list { display: flex; flex-direction: column; gap: 16px; }
        .holding-item { padding: 12px; border-radius: 12px; background: var(--bg-secondary); }
        .holding-info h4 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .holding-info p { font-size: 11px; color: var(--text-secondary); margin: 4px 0 0; }
        .holding-value { display: flex; justify-content: space-between; margin: 8px 0; }
        .holding-value span:first-child { font-weight: 600; color: var(--text-primary); }
        .holding-value .positive { color: #10b981; display: flex; align-items: center; gap: 4px; font-size: 13px; }
        .holding-value .negative { color: #ef4444; display: flex; align-items: center; gap: 4px; font-size: 13px; }
        .holding-bar { height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden; }
        .bar-fill { height: 100%; background: #3fcb1b; border-radius: 3px; }

        .table-container { overflow-x: auto; }
        .transactions-table { width: 100%; border-collapse: collapse; }
        .transactions-table th, .transactions-table td { padding: 12px; text-align: left; border-bottom: 1px solid var(--border-color); }
        .transactions-table th { color: var(--text-secondary); font-weight: 500; font-size: 13px; }
        .transactions-table td { color: var(--text-primary); }
        .tx-type { padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; }
        .tx-type.buy { background: rgba(63,203,27,0.1); color: #3fcb1b; }
        .tx-type.sell { background: rgba(239,68,68,0.1); color: #ef4444; }
        .symbol { font-weight: 600; }
      `}</style>
    </div>
  );
}