// src/app/dashboard/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BiDollar, BiTrendingUp, BiTrendingDown, BiArrowToRight, 
  BiArrowFromLeft, BiWallet, BiLineChart, BiPieChart,
  BiRefresh, BiBell, BiCalendar, BiDownload
} from 'react-icons/bi';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
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

// Account Data
const accounts = [
  { id: 1, name: 'MT5 #155691', type: 'Standard', status: 'Live', balance: 25340.50, equity: 26780.30, profit: 1439.80, profitPercent: 5.68 },
  { id: 2, name: 'MT5 #155692', type: 'Raw Spread', status: 'Demo', balance: 10000.00, equity: 10890.20, profit: 890.20, profitPercent: 8.90 },
];

// Recent Trades
const recentTrades = [
  { id: 1, symbol: 'EUR/USD', type: 'Buy', volume: 0.5, price: 1.08432, current: 1.08945, profit: 256.50, time: '10:32:15' },
  { id: 2, symbol: 'GBP/USD', type: 'Sell', volume: 0.3, price: 1.27680, current: 1.27420, profit: 78.00, time: '10:28:42' },
  { id: 3, symbol: 'XAU/USD', type: 'Buy', volume: 0.1, price: 2341.20, current: 2356.80, profit: 156.00, time: '10:15:33' },
  { id: 4, symbol: 'BTC/USD', type: 'Buy', volume: 0.05, price: 68200, current: 69150, profit: 47.50, time: '09:58:21' },
];

// Balance History Data
const balanceHistoryData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
  datasets: [{
    label: 'Balance',
    data: [12500, 14200, 13800, 15600, 16800, 18500, 19200, 20500],
    borderColor: '#3fcb1b',
    backgroundColor: 'rgba(63,203,27,0.05)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#3fcb1b',
    pointBorderColor: '#0A0A0A',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
  }],
};

// Asset Allocation Data
const allocationData = {
  labels: ['Forex', 'Commodities', 'Indices', 'Crypto', 'Stocks'],
  datasets: [{
    data: [45, 20, 15, 12, 8],
    backgroundColor: ['#3fcb1b', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec489a'],
    borderWidth: 0,
  }],
};

const chartOptions = {
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

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: 'rgba(255,255,255,0.7)', usePointStyle: true, boxWidth: 8 },
    },
  },
};

export default function DashboardOverview() {
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const currentAccount = accounts[selectedAccount];

  return (
    <div className="dashboard-overview">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div>
          <h2 className="welcome-title">Welcome Back, Gulam Zain</h2>
          <p className="welcome-subtitle">Here's your trading overview</p>
        </div>
        <div className="banner-stats">
          <div className="banner-stat">
            <BiWallet className="stat-icon" />
            <div>
              <p>Total Balance</p>
              <h4>${(accounts[0].balance + accounts[1].balance).toLocaleString()}</h4>
            </div>
          </div>
          <div className="banner-stat">
            <BiTrendingUp className="stat-icon" />
            <div>
              <p>Total Profit</p>
              <h4 className="profit-text">+${(accounts[0].profit + accounts[1].profit).toLocaleString()}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Account Selection Tabs */}
      <div className="account-tabs">
        {accounts.map((account, index) => (
          <button
            key={account.id}
            onClick={() => setSelectedAccount(index)}
            className={`tab-btn ${selectedAccount === index ? 'active' : ''}`}
          >
            {account.name}
          </button>
        ))}
      </div>

      {/* Account Cards */}
      <div className="account-cards">
        <div className="account-card">
          <div className="card-header">
            <span className="card-label">Total Balance</span>
            <span className="card-value">${currentAccount.balance.toLocaleString()}</span>
            <span className="card-change positive">+${currentAccount.profit.toLocaleString()} ({currentAccount.profitPercent}%)</span>
          </div>
        </div>
        <div className="account-card">
          <div className="card-header">
            <span className="card-label">Total Equity</span>
            <span className="card-value">${currentAccount.equity.toLocaleString()}</span>
            <span className="card-sub">Margin: ${(currentAccount.equity - currentAccount.balance).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-deposit" onClick={() => setShowDeposit(true)}>+ Deposit Funds</button>
        <button className="btn-withdraw" onClick={() => setShowWithdraw(true)}>- Withdraw Funds</button>
        <button className="btn-transfer">↗ Internal Transfer</button>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card large">
          <div className="chart-header">
            <div>
              <h3>Balance History</h3>
              <p>Account performance over time</p>
            </div>
            <div className="chart-periods">
              <button className="period-btn active">1M</button>
              <button className="period-btn">3M</button>
              <button className="period-btn">1Y</button>
            </div>
          </div>
          <div className="chart-container">
            <Line data={balanceHistoryData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Asset Allocation</h3>
          </div>
          <div className="chart-container small">
            <Doughnut data={allocationData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Recent Trades Table */}
      <div className="trades-section">
        <div className="section-header">
          <h3>Recent Trades</h3>
          <button className="view-all">View All →</button>
        </div>
        <div className="table-wrapper">
          <table className="trades-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Volume</th>
                <th>Open Price</th>
                <th>Current</th>
                <th>P&L</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade) => (
                <tr key={trade.id}>
                  <td className="symbol">{trade.symbol}</td>
                  <td><span className={`badge ${trade.type === 'Buy' ? 'badge-buy' : 'badge-sell'}`}>{trade.type}</span></td>
                  <td>{trade.volume}</td>
                  <td>{trade.price}</td>
                  <td>{trade.current}</td>
                  <td className={trade.profit >= 0 ? 'profit-positive' : 'profit-negative'}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit}
                  </td>
                  <td className="time-cell">{trade.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="modal-overlay" onClick={() => setShowDeposit(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Deposit Funds</h3>
            <p>Select deposit method and amount</p>
            <select className="modal-select">
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Crypto (USDT)</option>
              <option>Skrill</option>
              <option>Neteller</option>
            </select>
            <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="modal-input" />
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowDeposit(false)}>Cancel</button>
              <button className="modal-confirm">Confirm Deposit</button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="modal-overlay" onClick={() => setShowWithdraw(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Withdraw Funds</h3>
            <p>Available: ${currentAccount.balance.toLocaleString()}</p>
            <select className="modal-select">
              <option>Bank Transfer</option>
              <option>Crypto (USDT)</option>
              <option>Skrill</option>
              <option>Neteller</option>
            </select>
            <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="modal-input" />
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowWithdraw(false)}>Cancel</button>
              <button className="modal-confirm">Confirm Withdrawal</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard-overview {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Welcome Banner */
        .welcome-banner {
          background: linear-gradient(135deg, rgba(63,203,27,0.1), rgba(0,0,0,0.05));
          border: 1px solid rgba(63,203,27,0.2);
          border-radius: 20px;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .welcome-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .welcome-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 4px 0 0;
        }

        .banner-stats {
          display: flex;
          gap: 32px;
        }

        .banner-stat {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .banner-stat .stat-icon {
          width: 40px;
          height: 40px;
          padding: 10px;
          background: rgba(63,203,27,0.1);
          border-radius: 10px;
          color: #3fcb1b;
        }

        .banner-stat p {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
        }

        .banner-stat h4 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .profit-text {
          color: #10b981;
        }

        /* Account Tabs */
        .account-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .tab-btn {
          padding: 10px 24px;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .tab-btn.active {
          background: rgba(63,203,27,0.1);
          border-color: #3fcb1b;
          color: #3fcb1b;
        }

        /* Account Cards */
        .account-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .account-cards {
            grid-template-columns: 1fr;
          }
        }

        .account-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .account-card:hover {
          transform: translateY(-4px);
          border-color: #3fcb1b;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .card-value {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .card-change {
          font-size: 14px;
          font-weight: 600;
        }

        .card-change.positive {
          color: #10b981;
        }

        .card-sub {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .btn-deposit, .btn-withdraw, .btn-transfer {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-deposit {
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          color: white;
        }

        .btn-withdraw {
          background: rgba(239,68,68,0.1);
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.2);
        }

        .btn-transfer {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .btn-deposit:hover, .btn-withdraw:hover, .btn-transfer:hover {
          transform: translateY(-2px);
        }

        /* Charts Section */
        .charts-section {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .charts-section {
            grid-template-columns: 1fr;
          }
        }

        .chart-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 24px;
        }

        .chart-card.large {
          grid-column: span 1;
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
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .chart-header p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 4px 0 0;
        }

        .chart-periods {
          display: flex;
          gap: 8px;
        }

        .period-btn {
          padding: 6px 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .period-btn.active {
          background: rgba(63,203,27,0.1);
          border-color: #3fcb1b;
          color: #3fcb1b;
        }

        .chart-container {
          height: 280px;
        }

        .chart-container.small {
          height: 250px;
        }

        /* Trades Section */
        .trades-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .view-all {
          background: none;
          border: none;
          color: #3fcb1b;
          cursor: pointer;
          font-size: 13px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .trades-table {
          width: 100%;
          border-collapse: collapse;
        }

        .trades-table th {
          text-align: left;
          padding: 12px;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 13px;
          border-bottom: 1px solid var(--border-color);
        }

        .trades-table td {
          padding: 12px;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .symbol {
          font-weight: 600;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .badge-buy {
          background: rgba(63,203,27,0.1);
          color: #3fcb1b;
        }

        .badge-sell {
          background: rgba(239,68,68,0.1);
          color: #ef4444;
        }

        .profit-positive {
          color: #10b981;
          font-weight: 600;
        }

        .profit-negative {
          color: #ef4444;
          font-weight: 600;
        }

        .time-cell {
          color: var(--text-secondary);
          font-size: 12px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 28px;
          width: 90%;
          max-width: 400px;
        }

        .modal h3 {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 8px;
        }

        .modal p {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .modal-select, .modal-input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
        }

        .modal-cancel, .modal-confirm {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .modal-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
        }

        .modal-confirm {
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          color: white;
          border: none;
        }
      `}</style>
    </div>
  );
}