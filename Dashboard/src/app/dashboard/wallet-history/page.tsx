// src/app/dashboard/wallet-history/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiSearch, BiDownload, BiArrowFromLeft, BiArrowToRight } from 'react-icons/bi';

const walletTransactions = [
  { id: 1, type: 'Deposit', amount: 5000, currency: 'USD', status: 'Completed', date: '2024-03-15', time: '10:30:00', txHash: '0x1234...5678' },
  { id: 2, type: 'Withdrawal', amount: 1000, currency: 'USD', status: 'Completed', date: '2024-03-14', time: '14:20:00', txHash: '0x8765...4321' },
  { id: 3, type: 'Deposit', amount: 0.25, currency: 'BTC', status: 'Completed', date: '2024-03-13', time: '09:15:00', txHash: '0xabcd...efgh' },
  { id: 4, type: 'Withdrawal', amount: 2.5, currency: 'ETH', status: 'Pending', date: '2024-03-12', time: '16:45:00', txHash: '0xefgh...ijkl' },
];

export default function WalletHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = walletTransactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (searchTerm && !t.txHash.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="wallet-history-page">
      <div className="page-header">
        <h1>Wallet History</h1>
        <p>View all your wallet transactions</p>
      </div>

      <div className="filters-bar">
        <div className="filter-buttons">
          {['all', 'Deposit', 'Withdrawal'].map((type) => (
            <button key={type} onClick={() => setFilterType(type.toLowerCase())} className={`filter-btn ${filterType === type.toLowerCase() ? 'active' : ''}`}>
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
        <div className="search-box">
          <BiSearch size={18} />
          <input type="text" placeholder="Search by transaction hash..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button className="export-btn"><BiDownload size={18} /> Export</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Date</th><th>Type</th><th>Amount</th><th>Currency</th><th>Status</th><th>Transaction Hash</th></tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => (
              <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                <td>{tx.date} <span className="time">{tx.time}</span></td>
                <td><div className="type-cell">{tx.type === 'Deposit' ? <BiArrowFromLeft className="icon-up" /> : <BiArrowToRight className="icon-down" />}{tx.type}</div></td>
                <td className={tx.type === 'Deposit' ? 'amount-positive' : 'amount-negative'}>{tx.type === 'Deposit' ? '+' : '-'}{tx.amount}</td>
                <td>{tx.currency}</td>
                <td><span className={`status-badge ${tx.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>{tx.status}</span></td>
                <td className="tx-hash">{tx.txHash}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .wallet-history-page { max-width: 1400px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .filters-bar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 24px; }
        .filter-buttons { display: flex; gap: 10px; }
        .filter-btn { padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-secondary); cursor: pointer; }
        .filter-btn.active { background: rgba(63,203,27,0.1); border-color: #3fcb1b; color: #3fcb1b; }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; }
        .search-box input { background: none; border: none; color: var(--text-primary); outline: none; width: 250px; }
        .export-btn { display: flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); border-radius: 10px; color: #3fcb1b; cursor: pointer; }

        .table-container { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 16px; text-align: left; border-bottom: 1px solid var(--border-color); }
        th { color: var(--text-secondary); font-weight: 500; font-size: 13px; }
        td { color: var(--text-primary); }
        .time { font-size: 11px; color: var(--text-secondary); display: block; }
        .type-cell { display: flex; align-items: center; gap: 8px; }
        .icon-up { color: #10b981; }
        .icon-down { color: #ef4444; }
        .amount-positive { color: #10b981; font-weight: 600; }
        .amount-negative { color: #ef4444; font-weight: 600; }
        .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; }
        .status-completed { background: rgba(16,185,129,0.1); color: #10b981; }
        .status-pending { background: rgba(245,158,11,0.1); color: #f59e0b; }
        .tx-hash { font-family: monospace; font-size: 12px; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}