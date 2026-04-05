// src/app/dashboard/transactions/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiDownload, BiSearch, BiFilter, BiCheckCircle, BiXCircle, BiTime, BiArrowFromLeft, BiArrowToRight, BiCalendar, BiDollar } from 'react-icons/bi';

const transactions = [
  { id: 1, type: 'Deposit', amount: 5000, status: 'Completed', date: '2024-03-15', time: '10:30:00', method: 'Bank Transfer', reference: 'TRX-001' },
  { id: 2, type: 'Withdrawal', amount: -1000, status: 'Completed', date: '2024-03-14', time: '14:20:00', method: 'Crypto', reference: 'TRX-002' },
  { id: 3, type: 'Trade Profit', amount: 256.50, status: 'Completed', date: '2024-03-14', time: '09:15:00', method: 'EUR/USD', reference: '#155691' },
  { id: 4, type: 'Deposit', amount: 2000, status: 'Pending', date: '2024-03-13', time: '16:45:00', method: 'Credit Card', reference: 'TRX-003' },
  { id: 5, type: 'Internal Transfer', amount: 500, status: 'Completed', date: '2024-03-12', time: '11:00:00', method: 'Account Transfer', reference: 'TRX-004' },
  { id: 6, type: 'Withdrawal', amount: -500, status: 'Completed', date: '2024-03-11', time: '09:30:00', method: 'Skrill', reference: 'TRX-005' },
  { id: 7, type: 'Deposit', amount: 10000, status: 'Completed', date: '2024-03-10', time: '13:20:00', method: 'Crypto', reference: 'TRX-006' },
  { id: 8, type: 'Trade Profit', amount: 890.20, status: 'Completed', date: '2024-03-09', time: '15:45:00', method: 'BTC/USD', reference: '#155692' },
];

const stats = [
  { label: 'Total Deposits', value: '$17,000', change: '+12.5%', positive: true, icon: BiArrowFromLeft },
  { label: 'Total Withdrawals', value: '$1,500', change: '-8.2%', positive: false, icon: BiArrowToRight },
  { label: 'Total Profit', value: '$1,146.70', change: '+23.1%', positive: true, icon: BiDollar },
  { label: 'Total Trades', value: '127', change: '+5.3%', positive: true, icon: BiTime },
];

export default function TransactionsPage() {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30days');

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (searchTerm && !t.reference.toLowerCase().includes(searchTerm.toLowerCase()) && !t.method.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleExport = () => {
    const csv = transactions.map(t => `${t.date},${t.type},${t.amount},${t.status},${t.method},${t.reference}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1>Transaction History</h1>
        <p>View and manage all your financial transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="stat-icon" style={{ background: stat.positive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: stat.positive ? '#10b981' : '#ef4444' }}>
              <stat.icon size={20} />
            </div>
            <div>
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
              <span className={stat.positive ? 'positive' : 'negative'}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="filter-buttons">
          {['all', 'Deposit', 'Withdrawal', 'Trade Profit', 'Internal Transfer'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type.toLowerCase())}
              className={`filter-btn ${filterType === type.toLowerCase() ? 'active' : ''}`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
        
        <div className="filter-group">
          <BiCalendar size={16} />
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>

        <div className="search-box">
          <BiSearch size={16} />
          <input
            type="text"
            placeholder="Search by reference or method..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="export-btn" onClick={handleExport}>
          <BiDownload size={16} /> Export CSV
        </button>
      </div>

      {/* Transactions Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Method</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="transaction-row"
              >
                <td>
                  <div className="date-cell">
                    <span className="date">{tx.date}</span>
                    <span className="time">{tx.time}</span>
                  </div>
                </td>
                <td>
                  <div className="type-cell">
                    {tx.type === 'Deposit' ? <BiArrowFromLeft className="icon-up" /> : 
                     tx.type === 'Withdrawal' ? <BiArrowToRight className="icon-down" /> :
                     tx.type === 'Trade Profit' ? <BiDollar className="icon-profit" /> :
                     <BiTime className="icon-neutral" />}
                    {tx.type}
                  </div>
                </td>
                <td className={tx.amount > 0 ? 'amount-positive' : 'amount-negative'}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                </td>
                <td>
                  <span className={`status-badge ${tx.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>
                    {tx.status === 'Completed' ? <BiCheckCircle size={12} /> : <BiXCircle size={12} />}
                    {tx.status}
                  </span>
                </td>
                <td className="method-cell">{tx.method}</td>
                <td className="reference-cell">{tx.reference}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn">Previous</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">Next</button>
      </div>

      <style jsx>{`
        .transactions-page { max-width: 1400px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        /* Stats Grid */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-4px); border-color: #3fcb1b; }
        .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .stat-card p { font-size: 13px; color: var(--text-secondary); margin: 0; }
        .stat-card h3 { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 4px 0; }
        .stat-card .positive { color: #10b981; font-size: 12px; }
        .stat-card .negative { color: #ef4444; font-size: 12px; }

        /* Filters Bar */
        .filters-bar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 24px; }
        .filter-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
        .filter-btn { padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-secondary); cursor: pointer; transition: all 0.3s ease; font-size: 13px; }
        .filter-btn:hover { background: rgba(63,203,27,0.1); }
        .filter-btn.active { background: rgba(63,203,27,0.1); border-color: #3fcb1b; color: #3fcb1b; }

        .filter-group { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-secondary); }
        .filter-group select { background: none; border: none; color: var(--text-primary); outline: none; cursor: pointer; }

        .search-box { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; flex: 1; max-width: 300px; }
        .search-box input { background: none; border: none; color: var(--text-primary); outline: none; width: 100%; }

        .export-btn { display: flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); border-radius: 10px; color: #3fcb1b; cursor: pointer; transition: all 0.3s ease; }
        .export-btn:hover { background: rgba(63,203,27,0.2); }

        /* Table */
        .table-container { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow-x: auto; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 16px; color: var(--text-secondary); font-weight: 500; font-size: 13px; border-bottom: 1px solid var(--border-color); }
        td { padding: 16px; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
        .transaction-row:hover { background: rgba(63,203,27,0.03); }

        .date-cell { display: flex; flex-direction: column; }
        .date { font-size: 14px; color: var(--text-primary); }
        .time { font-size: 11px; color: var(--text-secondary); }

        .type-cell { display: flex; align-items: center; gap: 8px; }
        .icon-up { color: #10b981; }
        .icon-down { color: #ef4444; }
        .icon-profit { color: #3fcb1b; }
        .icon-neutral { color: #f59e0b; }

        .amount-positive { color: #10b981; font-weight: 600; }
        .amount-negative { color: #ef4444; font-weight: 600; }

        .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
        .status-completed { background: rgba(16,185,129,0.1); color: #10b981; }
        .status-pending { background: rgba(245,158,11,0.1); color: #f59e0b; }

        .method-cell { font-size: 13px; color: var(--text-secondary); }
        .reference-cell { font-family: monospace; font-size: 12px; color: var(--text-secondary); }

        /* Pagination */
        .pagination { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .page-btn { padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-secondary); cursor: pointer; transition: all 0.3s ease; }
        .page-btn:hover { background: rgba(63,203,27,0.1); border-color: #3fcb1b; color: #3fcb1b; }
        .page-btn.active { background: #3fcb1b; border-color: #3fcb1b; color: white; }

        @media (max-width: 768px) {
          .filters-bar { flex-direction: column; align-items: stretch; }
          .search-box { max-width: none; }
          .filter-buttons { justify-content: center; }
        }
      `}</style>
    </div>
  );
}