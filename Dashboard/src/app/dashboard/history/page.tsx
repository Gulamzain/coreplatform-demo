// src/app/dashboard/history/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiSearch, BiDownload, BiCalendar, BiFilter, BiArrowFromLeft, BiArrowToRight } from 'react-icons/bi';

const orderHistory = [
  { id: 1, symbol: 'EUR/USD', type: 'Buy', volume: 0.5, openPrice: 1.08432, closePrice: 1.08945, profit: 256.50, openTime: '2024-03-15 10:30:00', closeTime: '2024-03-15 14:20:00', status: 'Closed' },
  { id: 2, symbol: 'GBP/USD', type: 'Sell', volume: 0.3, openPrice: 1.27680, closePrice: 1.27420, profit: 78.00, openTime: '2024-03-14 09:15:00', closeTime: '2024-03-14 16:45:00', status: 'Closed' },
  { id: 3, symbol: 'XAU/USD', type: 'Buy', volume: 0.1, openPrice: 2341.20, closePrice: 2356.80, profit: 156.00, openTime: '2024-03-13 11:00:00', closeTime: '2024-03-13 15:30:00', status: 'Closed' },
  { id: 4, symbol: 'BTC/USD', type: 'Buy', volume: 0.05, openPrice: 68200, closePrice: 69150, profit: 47.50, openTime: '2024-03-12 08:45:00', closeTime: '2024-03-12 12:00:00', status: 'Closed' },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('30days');

  const filteredOrders = orderHistory.filter(o => {
    if (filterType !== 'all' && o.type !== filterType) return false;
    if (searchTerm && !o.symbol.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalProfit = filteredOrders.reduce((sum, o) => sum + o.profit, 0);
  const winRate = (filteredOrders.filter(o => o.profit > 0).length / filteredOrders.length) * 100;

  return (
    <div className="history-page">
      <div className="page-header">
        <h1>Order History</h1>
        <p>View all your closed positions and trade history</p>
      </div>

      <div className="stats-row">
        <div className="stat-card"><p>Total Trades</p><h3>{filteredOrders.length}</h3></div>
        <div className="stat-card"><p>Total Profit/Loss</p><h3 className={totalProfit >= 0 ? 'positive' : 'negative'}>{totalProfit >= 0 ? '+' : ''}{totalProfit}</h3></div>
        <div className="stat-card"><p>Win Rate</p><h3>{winRate.toFixed(1)}%</h3></div>
        <div className="stat-card"><p>Profit Factor</p><h3>1.85</h3></div>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <BiCalendar size={16} />
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
        <div className="filter-group">
          <BiFilter size={16} />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div className="search-box">
          <BiSearch size={16} />
          <input type="text" placeholder="Search symbol..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button className="export-btn"><BiDownload size={16} /> Export CSV</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Type</th>
              <th>Volume</th>
              <th>Open Price</th>
              <th>Close Price</th>
              <th>Profit/Loss</th>
              <th>Open Time</th>
              <th>Close Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                <td className="symbol">{order.symbol}</td>
                <td><span className={`badge ${order.type === 'Buy' ? 'badge-buy' : 'badge-sell'}`}>{order.type}</span></td>
                <td>{order.volume}</td>
                <td>{order.openPrice}</td>
                <td>{order.closePrice}</td>
                <td className={order.profit >= 0 ? 'profit' : 'loss'}>{order.profit >= 0 ? '+' : ''}{order.profit}</td>
                <td className="time">{order.openTime}</td>
                <td className="time">{order.closeTime}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .history-page { max-width: 1400px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; }
        .stat-card p { font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; }
        .stat-card h3 { font-size: 24px; font-weight: 700; margin: 0; color: var(--text-primary); }
        .stat-card .positive { color: #10b981; }
        .stat-card .negative { color: #ef4444; }

        .filters-bar { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; align-items: center; }
        .filter-group { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-secondary); }
        .filter-group select { background: none; border: none; color: var(--text-primary); outline: none; }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; flex: 1; }
        .search-box input { background: none; border: none; color: var(--text-primary); outline: none; width: 100%; }
        .export-btn { display: flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); border-radius: 10px; color: #3fcb1b; cursor: pointer; }

        .table-container { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 16px; color: var(--text-secondary); font-weight: 500; font-size: 13px; border-bottom: 1px solid var(--border-color); }
        td { padding: 16px; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
        .symbol { font-weight: 600; }
        .badge { padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; }
        .badge-buy { background: rgba(63,203,27,0.1); color: #3fcb1b; }
        .badge-sell { background: rgba(239,68,68,0.1); color: #ef4444; }
        .profit { color: #10b981; font-weight: 600; }
        .loss { color: #ef4444; font-weight: 600; }
        .time { font-size: 12px; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}