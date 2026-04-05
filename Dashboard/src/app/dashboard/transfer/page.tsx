// src/app/dashboard/transfer/page.tsx
'use client'
import React, { useState } from 'react';

const accounts = [
  { id: 1, name: 'MT5 #155691', type: 'Standard', balance: 25340.50 },
  { id: 2, name: 'MT5 #155692', type: 'Raw Spread', balance: 10000.00 },
];

export default function TransferPage() {
  const [fromAccount, setFromAccount] = useState(accounts[0]);
  const [toAccount, setToAccount] = useState(accounts[1]);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (parseFloat(amount) > fromAccount.balance) {
      alert(`Insufficient balance in ${fromAccount.name}`);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Transfer of $${amount} from ${fromAccount.name} to ${toAccount.name} completed!`);
      setIsProcessing(false);
      setAmount('');
    }, 1500);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Internal Transfer</h1>
        <p className="page-subtitle">Transfer funds between your accounts</p>
      </div>

      <div className="transfer-container">
        <div className="form-card">
          <div className="form-group">
            <label>From Account</label>
            <select onChange={(e) => setFromAccount(accounts[parseInt(e.target.value)])}>
              {accounts.map((acc, idx) => (
                <option key={acc.id} value={idx}>{acc.name} (${acc.balance.toLocaleString()})</option>
              ))}
            </select>
          </div>

          <div className="transfer-arrow">↓</div>

          <div className="form-group">
            <label>To Account</label>
            <select onChange={(e) => setToAccount(accounts[parseInt(e.target.value)])}>
              {accounts.map((acc, idx) => (
                <option key={acc.id} value={idx}>{acc.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Transfer Amount</label>
            <div className="amount-input">
              <span>$</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
            </div>
          </div>

          <div className="transfer-info">
            <div className="info-row"><span>Available in From Account:</span><span>${fromAccount.balance.toLocaleString()}</span></div>
            <div className="info-row"><span>Transfer Fee:</span><span>$0</span></div>
            <div className="info-row total"><span>After Transfer:</span><span>${(fromAccount.balance - parseFloat(amount || '0')).toLocaleString()}</span></div>
          </div>

          <button className="transfer-btn" onClick={handleTransfer} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Complete Transfer'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 24px; }
        .page-title { font-size: 24px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .page-subtitle { font-size: 13px; color: var(--text-secondary); margin: 4px 0 0; }

        .transfer-container { max-width: 500px; margin: 0 auto; }
        .form-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 32px; }

        .form-group { margin-bottom: 24px; }
        .form-group label { display: block; font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px; }
        .form-group select { width: 100%; padding: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); }

        .transfer-arrow { text-align: center; font-size: 24px; color: #3fcb1b; margin: 16px 0; }

        .amount-input { position: relative; }
        .amount-input span { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; color: var(--text-primary); }
        .amount-input input { width: 100%; padding: 12px 12px 12px 32px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); font-size: 16px; }

        .transfer-info { background: var(--bg-secondary); border-radius: 12px; padding: 16px; margin: 24px 0; }
        .info-row { display: flex; justify-content: space-between; padding: 8px 0; color: var(--text-secondary); }
        .info-row.total { padding-top: 12px; margin-top: 8px; border-top: 1px solid var(--border-color); font-weight: 600; color: var(--text-primary); }

        .transfer-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; }
        .transfer-btn:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
}