// src/app/dashboard/wallet-balance/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiDollar, BiBitcoin, BiWallet, BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { SiLitecoin, SiDogecoin } from 'react-icons/si';

const wallets = [
  { currency: 'USD', balance: 25340.50, icon: BiDollar, color: '#10b981', change: 5.2 },
  { currency: 'BTC', balance: 0.85, icon: BiBitcoin, color: '#f59e0b', change: 3.8 },
  { currency: 'ETH', balance: 12.5, icon: FaEthereum, color: '#6366f1', change: -2.1 },
  { currency: 'LTC', balance: 45.2, icon: SiLitecoin, color: '#6b7280', change: 1.5 },
  { currency: 'DOGE', balance: 12500, icon: SiDogecoin, color: '#fbbf24', change: 8.5 },
];

export default function WalletBalancePage() {
  return (
    <div className="wallet-page">
      <div className="page-header">
        <h1>Wallet Balance</h1>
        <p>View and manage your digital assets</p>
      </div>

      <div className="total-balance">
        <p>Total Portfolio Value</p>
        <h2>$28,500.00</h2>
        <span className="positive">+12.5%</span>
      </div>

      <div className="wallets-grid">
        {wallets.map((wallet, index) => (
          <motion.div
            key={wallet.currency}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="wallet-card"
            style={{ borderColor: `${wallet.color}30` }}
          >
            <div className="wallet-icon" style={{ background: `${wallet.color}15`, color: wallet.color }}>
              <wallet.icon size={28} />
            </div>
            <div className="wallet-info">
              <h3>{wallet.currency}</h3>
              <p className="balance">
                {wallet.currency === 'USD' ? '$' : ''}
                {wallet.balance.toLocaleString()}
                {wallet.currency !== 'USD' ? ` ${wallet.currency}` : ''}
              </p>
              <p className={`change ${wallet.change >= 0 ? 'positive' : 'negative'}`}>
                {wallet.change >= 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                {Math.abs(wallet.change)}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="action-buttons">
        <button className="btn-deposit">+ Deposit</button>
        <button className="btn-withdraw">- Withdraw</button>
        <button className="btn-transfer">↗ Transfer</button>
      </div>

      <style jsx>{`
        .wallet-page { max-width: 1200px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .total-balance { text-align: center; padding: 32px; background: linear-gradient(135deg, rgba(63,203,27,0.1), rgba(0,0,0,0.05)); border-radius: 24px; margin-bottom: 32px; }
        .total-balance p { font-size: 14px; color: var(--text-secondary); margin-bottom: 8px; }
        .total-balance h2 { font-size: 48px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .total-balance .positive { color: #10b981; font-size: 14px; }

        .wallets-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .wallet-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; transition: all 0.3s ease; }
        .wallet-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .wallet-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .wallet-info h3 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0 0 4px; }
        .wallet-info .balance { font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .wallet-info .change { font-size: 12px; display: flex; align-items: center; gap: 4px; margin-top: 4px; }
        .change.positive { color: #10b981; }
        .change.negative { color: #ef4444; }

        .action-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .btn-deposit, .btn-withdraw, .btn-transfer { padding: 12px 32px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-deposit { background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; }
        .btn-withdraw { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
        .btn-transfer { background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); }
        .btn-deposit:hover, .btn-withdraw:hover, .btn-transfer:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
}