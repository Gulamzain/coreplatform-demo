// src/app/dashboard/deposit/page.tsx
'use client'
import React, { useState } from 'react';

const depositMethods = [
  { id: 1, name: 'Credit Card', icon: '💳', min: 100, max: 50000, fee: 0 },
  { id: 2, name: 'Bank Transfer', icon: '🏦', min: 500, max: 100000, fee: 0 },
  { id: 3, name: 'Crypto (USDT)', icon: '₿', min: 50, max: 50000, fee: 0 },
  { id: 4, name: 'Skrill', icon: 'S', min: 100, max: 25000, fee: 0 },
  { id: 5, name: 'Neteller', icon: 'N', min: 100, max: 25000, fee: 0 },
];

export default function DepositPage() {
  const [selectedMethod, setSelectedMethod] = useState(depositMethods[0]);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) < selectedMethod.min) {
      alert(`Minimum deposit is $${selectedMethod.min}`);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Deposit of $${amount} via ${selectedMethod.name} initiated!`);
      setIsProcessing(false);
      setAmount('');
    }, 1500);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Deposit Funds</h1>
        <p className="page-subtitle">Add funds to your trading account</p>
      </div>

      <div className="deposit-grid">
        {/* Deposit Methods */}
        <div className="methods-section">
          <h3 className="section-title">Select Deposit Method</h3>
          <div className="methods-list">
            {depositMethods.map((method) => (
              <div
                key={method.id}
                className={`method-card ${selectedMethod.id === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedMethod(method)}
              >
                <div className="method-icon">{method.icon}</div>
                <div className="method-info">
                  <h4>{method.name}</h4>
                  <p>Min: ${method.min} | Max: ${method.max.toLocaleString()}</p>
                </div>
                {selectedMethod.id === method.id && <div className="check-mark">✓</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Deposit Form */}
        <div className="form-section">
          <h3 className="section-title">Enter Amount</h3>
          <div className="amount-input">
            <span className="currency">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="quick-amounts">
            {[100, 500, 1000, 5000].map((amt) => (
              <button key={amt} onClick={() => setAmount(amt.toString())} className="quick-amount">
                ${amt}
              </button>
            ))}
          </div>
          <div className="summary">
            <div className="summary-row">
              <span>Deposit Amount:</span>
              <span>${amount || '0'}</span>
            </div>
            <div className="summary-row">
              <span>Processing Fee:</span>
              <span>${selectedMethod.fee}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${amount || '0'}</span>
            </div>
          </div>
          <button className="deposit-btn" onClick={handleDeposit} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Confirm Deposit'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 24px; }
        .page-title { font-size: 24px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .page-subtitle { font-size: 13px; color: var(--text-secondary); margin: 4px 0 0; }

        .deposit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) { .deposit-grid { grid-template-columns: 1fr; } }

        .methods-section, .form-section { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; }
        .section-title { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0 0 16px; }

        .methods-list { display: flex; flex-direction: column; gap: 12px; }
        .method-card { display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid var(--border-color); border-radius: 12px; cursor: pointer; transition: all 0.3s ease; position: relative; }
        .method-card:hover { border-color: #3fcb1b; transform: translateX(4px); }
        .method-card.selected { border-color: #3fcb1b; background: rgba(63,203,27,0.05); }
        .method-icon { width: 48px; height: 48px; background: var(--bg-secondary); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .method-info h4 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .method-info p { font-size: 12px; color: var(--text-secondary); margin: 4px 0 0; }
        .check-mark { position: absolute; top: 12px; right: 12px; width: 20px; height: 20px; background: #3fcb1b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; }

        .amount-input { position: relative; margin-bottom: 16px; }
        .currency { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 18px; font-weight: 600; color: var(--text-primary); }
        .amount-input input { width: 100%; padding: 16px 16px 16px 40px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; color: var(--text-primary); font-size: 24px; font-weight: 600; }

        .quick-amounts { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .quick-amount { padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); cursor: pointer; }

        .summary { background: var(--bg-secondary); border-radius: 12px; padding: 16px; margin-bottom: 24px; }
        .summary-row { display: flex; justify-content: space-between; padding: 8px 0; color: var(--text-secondary); }
        .summary-row.total { padding-top: 12px; margin-top: 8px; border-top: 1px solid var(--border-color); font-weight: 600; color: var(--text-primary); }

        .deposit-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; }
        .deposit-btn:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
}