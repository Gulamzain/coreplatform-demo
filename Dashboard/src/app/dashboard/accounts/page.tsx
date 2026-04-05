// src/app/dashboard/accounts/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiUser, BiPlus, BiDollar, BiTrendingUp, BiTrendingDown, BiRefresh, BiDownload } from 'react-icons/bi';

const accounts = [
  { id: 1, name: 'MT5 #155691', type: 'Standard', status: 'Live', balance: 25340.50, equity: 26780.30, profit: 1439.80, profitPercent: 5.68, currency: 'USD', leverage: '1:500' },
  { id: 2, name: 'MT5 #155692', type: 'Raw Spread', status: 'Live', balance: 10000.00, equity: 10890.20, profit: 890.20, profitPercent: 8.90, currency: 'USD', leverage: '1:500' },
  { id: 3, name: 'MT5 #155693', type: 'Demo', status: 'Demo', balance: 50000.00, equity: 52340.50, profit: 2340.50, profitPercent: 4.68, currency: 'USD', leverage: '1:200' },
];

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const filteredAccounts = accounts.filter(a => {
    if (activeTab === 'live') return a.status === 'Live';
    if (activeTab === 'demo') return a.status === 'Demo';
    return true;
  });

  return (
    <div className="accounts-page">
      <div className="page-header">
        <h1>My Accounts</h1>
        <p>Manage all your trading accounts in one place</p>
      </div>

      <div className="account-tabs">
        <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Accounts</button>
        <button className={`tab ${activeTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTab('live')}>Live Accounts</button>
        <button className={`tab ${activeTab === 'demo' ? 'active' : ''}`} onClick={() => setActiveTab('demo')}>Demo Accounts</button>
        <button className="btn-new-account"><BiPlus size={16} /> New Account</button>
      </div>

      <div className="accounts-grid">
        {filteredAccounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`account-card ${selectedAccount === account.id ? 'selected' : ''}`}
            onClick={() => setSelectedAccount(account.id)}
          >
            <div className="account-header">
              <div className="account-info">
                <h3>{account.name}</h3>
                <p>{account.type}</p>
              </div>
              <span className={`status-badge ${account.status === 'Live' ? 'live' : 'demo'}`}>{account.status}</span>
            </div>

            <div className="account-stats">
              <div className="stat">
                <span>Balance</span>
                <strong>${account.balance.toLocaleString()}</strong>
              </div>
              <div className="stat">
                <span>Equity</span>
                <strong>${account.equity.toLocaleString()}</strong>
              </div>
              <div className="stat">
                <span>Profit</span>
                <strong className={account.profit >= 0 ? 'positive' : 'negative'}>
                  {account.profit >= 0 ? '+' : ''}{account.profit.toLocaleString()}
                </strong>
              </div>
              <div className="stat">
                <span>Leverage</span>
                <strong>{account.leverage}</strong>
              </div>
            </div>

            <div className="account-actions">
              <button className="btn-deposit"><BiDollar /> Deposit</button>
              <button className="btn-withdraw">Withdraw</button>
              <button className="btn-trade">Trade</button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedAccount && (
        <div className="account-details">
          <h3>Account Details</h3>
          <div className="details-grid">
            <div className="detail-item"><span>Account ID:</span><strong>{accounts.find(a => a.id === selectedAccount)?.name}</strong></div>
            <div className="detail-item"><span>Account Type:</span><strong>{accounts.find(a => a.id === selectedAccount)?.type}</strong></div>
            <div className="detail-item"><span>Currency:</span><strong>{accounts.find(a => a.id === selectedAccount)?.currency}</strong></div>
            <div className="detail-item"><span>Leverage:</span><strong>{accounts.find(a => a.id === selectedAccount)?.leverage}</strong></div>
            <div className="detail-item"><span>Created:</span><strong>2024-01-15</strong></div>
            <div className="detail-item"><span>Last Login:</span><strong>2024-03-15 10:30:00</strong></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .accounts-page { max-width: 1400px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .account-tabs { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; align-items: center; }
        .tab { padding: 8px 20px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-secondary); cursor: pointer; }
        .tab.active { background: rgba(63,203,27,0.1); border-color: #3fcb1b; color: #3fcb1b; }
        .btn-new-account { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 10px; cursor: pointer; margin-left: auto; }

        .accounts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; margin-bottom: 32px; }
        .account-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; cursor: pointer; transition: all 0.3s ease; }
        .account-card:hover { transform: translateY(-4px); border-color: #3fcb1b; }
        .account-card.selected { border-color: #3fcb1b; box-shadow: 0 4px 20px rgba(63,203,27,0.1); }

        .account-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .account-info h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .account-info p { font-size: 12px; color: var(--text-secondary); margin: 4px 0 0; }
        .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .status-badge.live { background: rgba(63,203,27,0.1); color: #3fcb1b; }
        .status-badge.demo { background: rgba(59,130,246,0.1); color: #3b82f6; }

        .account-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
        .stat { display: flex; flex-direction: column; }
        .stat span { font-size: 11px; color: var(--text-secondary); margin-bottom: 4px; }
        .stat strong { font-size: 18px; font-weight: 700; color: var(--text-primary); }
        .stat .positive { color: #10b981; }
        .stat .negative { color: #ef4444; }

        .account-actions { display: flex; gap: 10px; }
        .btn-deposit, .btn-withdraw, .btn-trade { flex: 1; padding: 10px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-deposit { background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; }
        .btn-withdraw { background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); }
        .btn-trade { background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); color: #3fcb1b; }

        .account-details { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; }
        .account-details h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; }
        .details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        .detail-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-secondary); border-radius: 10px; }
        .detail-item span { font-size: 13px; color: var(--text-secondary); }
        .detail-item strong { font-size: 13px; color: var(--text-primary); }
      `}</style>
    </div>
  );
}