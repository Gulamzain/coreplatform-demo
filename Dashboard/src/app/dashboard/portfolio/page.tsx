// src/app/dashboard/portfolio/page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BiTrendingUp, BiTrendingDown, BiDownload, BiCalendar, BiDollar } from 'react-icons/bi';
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
  Filler,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

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
    backgroundColor: 'rgba(63,203,27,0.08)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#3fcb1b',
    pointBorderColor: '#1a1a1a',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 7,
    borderWidth: 2.5,
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
  { id: 1, type: 'Buy', symbol: 'EUR/USD', amount: 5000, price: 1.08432, date: 'Mar 15, 2024' },
  { id: 2, type: 'Sell', symbol: 'GBP/USD', amount: 3000, price: 1.27680, date: 'Mar 14, 2024' },
  { id: 3, type: 'Buy', symbol: 'BTC/USD', amount: 2000, price: 68200, date: 'Mar 13, 2024' },
];

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState('1M');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Donut chart options with proper typing
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { 
          color: '#556050',
          usePointStyle: true, 
          boxWidth: 8,
          font: { size: 11 },
          padding: 12
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleColor: '#edf0ea',
        bodyColor: '#9aad94',
        borderColor: '#3fcb1b',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.raw}%`;
          }
        }
      },
    },
  };

  // Line chart options with proper typing
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleColor: '#edf0ea',
        bodyColor: '#9aad94',
        borderColor: '#3fcb1b',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(85,96,80,0.15)', drawBorder: false },
        ticks: { 
          color: '#556050', 
          font: { size: 10 },
          callback: (value: any) => '$' + (value / 1000).toFixed(0) + 'k'
        },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#556050', font: { size: 10 } },
        border: { display: false },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const handleExport = () => {
    alert('Portfolio report exported successfully!');
  };

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    // You can update chart data based on timeframe here
  };

  if (!mounted) {
    return (
      <div className="portfolio-page">
        <div className="loading">Loading portfolio data...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <div className="page-header">
        <h1>Portfolio Overview</h1>
        <p>Track your investment performance and allocation</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p>Total Value</p>
            <h3>$20,500.00</h3>
            <span className="positive">▲ +12.5%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <p>Daily P&L</p>
            <h3>+$1,250.00</h3>
            <span className="positive">▲ +7.2%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <p>Total Return</p>
            <h3>+$5,500.00</h3>
            <span className="positive">▲ +36.7%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <p>Win Rate</p>
            <h3>68.5%</h3>
            <span className="positive">▲ +5.2%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Asset Allocation Doughnut */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Asset Allocation</h3>
            <button className="export-btn" onClick={handleExport}>
              <BiDownload size={14} /> Export
            </button>
          </div>
          <div className="chart-container doughnut-container">
            <Doughnut data={portfolioData} options={doughnutOptions} />
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

        {/* Portfolio Growth Line Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Portfolio Growth</h3>
            <div className="timeframes">
              {['1W', '1M', '3M', '1Y'].map((tf) => (
                <button 
                  key={tf} 
                  className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`} 
                  onClick={() => handleTimeframeChange(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container line-container">
            <Line data={equityData} options={lineOptions} />
          </div>
          <div className="chart-stats">
            <div className="chart-stat">
              <span>Peak</span>
              <strong>$20,500</strong>
            </div>
            <div className="chart-stat">
              <span>Growth</span>
              <strong className="positive">+64%</strong>
            </div>
            <div className="chart-stat">
              <span>Drawdown</span>
              <strong className="negative">-2.8%</strong>
            </div>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="holding-item"
            >
              <div className="holding-left">
                <h4>{holding.symbol}</h4>
                <p>{holding.type}</p>
              </div>
              <div className="holding-middle">
                <span className="holding-value">${holding.value.toLocaleString()}</span>
                <div className="holding-bar">
                  <div className="bar-fill" style={{ width: `${holding.allocation}%` }}></div>
                </div>
              </div>
              <div className="holding-right">
                <span className={holding.change >= 0 ? 'positive' : 'negative'}>
                  {holding.change >= 0 ? <BiTrendingUp size={12} /> : <BiTrendingDown size={12} />}
                  {holding.change}%
                </span>
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
        <div className="transactions-list">
          {recentTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="transaction-item"
            >
              <div className="transaction-left">
                <div className={`tx-badge ${tx.type === 'Buy' ? 'buy' : 'sell'}`}>
                  {tx.type}
                </div>
                <div className="tx-info">
                  <strong>{tx.symbol}</strong>
                  <span>{tx.date}</span>
                </div>
              </div>
              <div className="transaction-right">
                <div className="tx-amount">${tx.amount.toLocaleString()}</div>
                <div className="tx-price">{tx.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .portfolio-page {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 0;
        }

        .loading {
          text-align: center;
          padding: 60px;
          color: var(--text-secondary, #556050);
        }

        .page-header {
          margin-bottom: 24px;
        }

        .page-header h1 {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
          margin: 0;
        }

        .page-header p {
          font-size: clamp(0.7rem, 3vw, 0.875rem);
          color: var(--text-secondary, #556050);
          margin-top: 6px;
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .stat-card {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(63,203,27,0.3);
        }

        .stat-icon {
          font-size: 28px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-card p {
          font-size: 12px;
          color: var(--text-secondary, #556050);
          margin-bottom: 4px;
        }

        .stat-card h3 {
          font-size: clamp(1rem, 3.5vw, 1.25rem);
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
          margin: 0;
        }

        .stat-card .positive {
          color: #10b981;
          font-size: 11px;
          display: inline-block;
          margin-top: 4px;
        }

        /* Charts Grid */
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }

        @media (max-width: 900px) {
          .charts-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .chart-card {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 20px;
          padding: 20px;
        }

        @media (max-width: 480px) {
          .chart-card {
            padding: 16px;
            border-radius: 16px;
          }
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chart-header h3 {
          font-size: clamp(0.9rem, 3.5vw, 1rem);
          font-weight: 600;
          color: var(--text-primary, #edf0ea);
          margin: 0;
        }

        .export-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(63,203,27,0.1);
          border: 1px solid rgba(63,203,27,0.2);
          border-radius: 8px;
          color: #3fcb1b;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
        }

        .export-btn:hover {
          background: rgba(63,203,27,0.2);
          transform: translateY(-2px);
        }

        .timeframes {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .timeframe-btn {
          padding: 5px 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 20px;
          color: var(--text-secondary, #556050);
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
        }

        .timeframe-btn.active {
          background: rgba(63,203,27,0.15);
          border-color: #3fcb1b;
          color: #3fcb1b;
        }

        .chart-container {
          height: 260px;
          margin-bottom: 16px;
        }

        .doughnut-container {
          height: 240px;
        }

        .line-container {
          height: 260px;
        }

        @media (max-width: 768px) {
          .doughnut-container {
            height: 210px;
          }
          .line-container {
            height: 230px;
          }
        }

        @media (max-width: 480px) {
          .doughnut-container {
            height: 190px;
          }
          .line-container {
            height: 210px;
          }
        }

        .chart-stats {
          display: flex;
          justify-content: space-around;
          gap: 12px;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border-color, rgba(255,255,255,0.08));
        }

        .chart-stat {
          text-align: center;
          flex: 1;
        }

        .chart-stat span {
          font-size: 10px;
          color: var(--text-secondary, #556050);
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .chart-stat strong {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
        }

        .chart-stat strong.positive {
          color: #10b981;
        }

        .chart-stat strong.negative {
          color: #ef4444;
        }

        /* Allocation List */
        .allocation-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 16px;
        }

        .allocation-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
        }

        .color-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .allocation-item span {
          font-size: 11px;
          color: var(--text-secondary, #556050);
        }

        .allocation-item .percentage {
          color: var(--text-primary, #edf0ea);
          font-weight: 600;
        }

        /* Holdings Section */
        .holdings-section, .transactions-section {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 24px;
        }

        @media (max-width: 480px) {
          .holdings-section, .transactions-section {
            padding: 16px;
            border-radius: 16px;
          }
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .section-header h3 {
          font-size: clamp(0.9rem, 3.5vw, 1rem);
          font-weight: 600;
          color: var(--text-primary, #edf0ea);
          margin: 0;
        }

        .view-all {
          background: none;
          border: none;
          color: #3fcb1b;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
        }

        .view-all:hover {
          opacity: 0.8;
          transform: translateX(2px);
        }

        .holdings-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .holding-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          background: var(--bg-secondary, #141914);
          border-radius: 12px;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .holding-item {
            flex-direction: column;
            align-items: stretch;
          }
        }

        .holding-left h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary, #edf0ea);
          margin: 0;
        }

        .holding-left p {
          font-size: 10px;
          color: var(--text-secondary, #556050);
          margin: 3px 0 0;
        }

        .holding-middle {
          flex: 1;
          min-width: 150px;
        }

        @media (max-width: 600px) {
          .holding-middle {
            width: 100%;
          }
        }

        .holding-value {
          font-weight: 600;
          color: var(--text-primary, #edf0ea);
          font-size: 0.85rem;
          display: block;
          margin-bottom: 6px;
        }

        .holding-bar {
          height: 4px;
          background: var(--border-color, rgba(255,255,255,0.1));
          border-radius: 2px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: #3fcb1b;
          border-radius: 2px;
        }

        .holding-right .positive {
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .holding-right .negative {
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        /* Transactions List - Card based */
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          background: var(--bg-secondary, #141914);
          border-radius: 12px;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 500px) {
          .transaction-item {
            flex-direction: column;
            align-items: stretch;
          }
        }

        .transaction-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tx-badge {
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
        }

        .tx-badge.buy {
          background: rgba(63,203,27,0.12);
          color: #3fcb1b;
        }

        .tx-badge.sell {
          background: rgba(239,68,68,0.12);
          color: #ef4444;
        }

        .tx-info strong {
          font-size: 0.85rem;
          color: var(--text-primary, #edf0ea);
          display: block;
        }

        .tx-info span {
          font-size: 10px;
          color: var(--text-secondary, #556050);
        }

        .transaction-right {
          text-align: right;
        }

        @media (max-width: 500px) {
          .transaction-right {
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }

        .tx-amount {
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
          font-size: 0.9rem;
        }

        .tx-price {
          font-size: 11px;
          color: var(--text-secondary, #556050);
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}