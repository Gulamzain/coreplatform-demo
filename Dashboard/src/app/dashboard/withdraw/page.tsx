// src/app/dashboard/withdraw/page.tsx
'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiBitcoin, BiWallet, BiCheck, BiArrowToRight, 
  BiInfoCircle, BiLock, BiTime, BiDollar
} from 'react-icons/bi';
import { FaUniversity } from 'react-icons/fa';

const withdrawalMethods = [
  { 
    id: 1, 
    name: 'Bank Transfer', 
    icon: FaUniversity, 
    min: 100, 
    max: 50000, 
    fee: 0, 
    time: '1-3 business days',
    color: '#10b981',
    fields: ['bankName', 'accountNumber', 'routingNumber', 'accountHolder']
  },
  { 
    id: 2, 
    name: 'Crypto (USDT)', 
    icon: BiBitcoin, 
    min: 50, 
    max: 25000, 
    fee: 0, 
    time: '30-60 minutes',
    color: '#f59e0b',
    fields: ['walletAddress', 'network']
  },
  { 
    id: 3, 
    name: 'Skrill', 
    icon: BiWallet, 
    min: 50, 
    max: 10000, 
    fee: 0, 
    time: '24 hours',
    color: '#ef4444',
    fields: ['email']
  },
  { 
    id: 4, 
    name: 'Neteller', 
    icon: BiWallet, 
    min: 50, 
    max: 10000, 
    fee: 0, 
    time: '24 hours',
    color: '#3b82f6',
    fields: ['email']
  },
];

export default function WithdrawPage() {
  const [selectedMethod, setSelectedMethod] = useState(withdrawalMethods[0]);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  
  const balance = 25340.50;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWithdraw = async () => {
    const numAmount = parseFloat(amount);
    
    if (!amount || numAmount < selectedMethod.min) {
      alert(`Minimum withdrawal amount is $${selectedMethod.min}`);
      return;
    }
    
    if (numAmount > balance) {
      alert(`Insufficient balance. Available balance: $${balance.toLocaleString()}`);
      return;
    }

    for (const field of selectedMethod.fields) {
      if (!formData[field]) {
        alert(`Please fill in all required fields`);
        return;
      }
    }
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    setAmount('');
    setFormData({});
  };

  const renderMethodFields = () => {
    switch (selectedMethod.id) {
      case 1:
        return (
          <div className="fields-container">
            <div className="form-group">
              <label>Bank Name</label>
              <input 
                type="text" 
                placeholder="Enter bank name"
                value={formData.bankName || ''}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Account Holder Name</label>
              <input 
                type="text" 
                placeholder="Enter account holder name"
                value={formData.accountHolder || ''}
                onChange={(e) => handleInputChange('accountHolder', e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Account Number</label>
                <input 
                  type="text" 
                  placeholder="Account number"
                  value={formData.accountNumber || ''}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Routing Number</label>
                <input 
                  type="text" 
                  placeholder="Routing number"
                  value={formData.routingNumber || ''}
                  onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="fields-container">
            <div className="form-group">
              <label>Wallet Address</label>
              <input 
                type="text" 
                placeholder="Enter USDT wallet address"
                value={formData.walletAddress || ''}
                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Network</label>
              <select 
                value={formData.network || ''}
                onChange={(e) => handleInputChange('network', e.target.value)}
              >
                <option value="">Select network</option>
                <option value="ERC20">ERC20 (Ethereum)</option>
                <option value="TRC20">TRC20 (Tron)</option>
                <option value="BEP20">BEP20 (BSC)</option>
              </select>
            </div>
          </div>
        );
      case 3:
      case 4:
        return (
          <div className="fields-container">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your account email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="withdraw-page">
      <div className="page-header">
        <h1>Withdraw Funds</h1>
        <p>Securely withdraw funds from your trading account</p>
      </div>

      <div className="balance-card">
        <div className="balance-icon">
          <BiDollar size={28} />
        </div>
        <div className="balance-info">
          <p>Available Balance</p>
          <h2>${balance.toLocaleString()}</h2>
        </div>
      </div>

      <div className="withdraw-container">
        <div className="methods-section">
          <h3>Select Withdrawal Method</h3>
          <div className="methods-grid">
            {withdrawalMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ y: -2 }}
                className={`method-card ${selectedMethod.id === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedMethod(method)}
                style={{ borderColor: selectedMethod.id === method.id ? method.color : 'var(--border-color)' }}
              >
                <div className="method-icon" style={{ background: `${method.color}15`, color: method.color }}>
                  <method.icon size={24} />
                </div>
                <div className="method-info">
                  <h4>{method.name}</h4>
                  <div className="method-details">
                    <span className="min-amount">Min ${method.min}</span>
                    <span className="max-amount">Max ${method.max.toLocaleString()}</span>
                  </div>
                  <div className="method-time">
                    <BiTime size={12} />
                    <span>{method.time}</span>
                  </div>
                </div>
                {selectedMethod.id === method.id && (
                  <div className="selected-badge" style={{ background: method.color }}>
                    <BiCheck size={14} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Withdrawal Details</h3>
          
          <div className="form-group">
            <label>Amount</label>
            <div className="amount-input-wrapper">
              <span className="currency">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="amount-input"
              />
            </div>
            <div className="quick-amounts">
              {[100, 500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="quick-amount-btn"
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {renderMethodFields()}

          <div className="info-box">
            <BiInfoCircle size={16} />
            <div className="info-content">
              <p className="info-title">Important Information</p>
              <p className="info-text">
                Withdrawals are processed within 24 hours. 
                The first withdrawal may require additional verification.
              </p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-row">
              <span>Withdrawal Amount</span>
              <span>${amount || '0.00'}</span>
            </div>
            <div className="summary-row">
              <span>Processing Fee</span>
              <span>${selectedMethod.fee.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>You'll Receive</span>
              <span>${amount || '0.00'}</span>
            </div>
          </div>

          <div className="security-note">
            <BiLock size={14} />
            <span>Your withdrawal is protected by 256-bit SSL encryption</span>
          </div>

          <button 
            className="withdraw-btn"
            onClick={handleWithdraw}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                Confirm Withdrawal
                <BiArrowToRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="success-toast"
          >
            <BiCheck size={20} />
            <div>
              <strong>Withdrawal Request Submitted!</strong>
              <p>Your withdrawal of ${amount} is being processed</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        /* CSS Variables for Theme Support */
        :root {
          --bg-primary: #0a0a0a;
          --bg-card: #1a1a1a;
          --bg-secondary: #141414;
          --bg-input: #141414;
          --text-primary: #ffffff;
          --text-secondary: rgba(255,255,255,0.6);
          --border-color: rgba(255,255,255,0.1);
          --shadow-color: rgba(0,0,0,0.2);
        }

        /* Light Mode */
        @media (prefers-color-scheme: light) {
          :root {
            --bg-primary: #f8f9fa;
            --bg-card: #ffffff;
            --bg-secondary: #f1f3f5;
            --bg-input: #f8f9fa;
            --text-primary: #1a1a1a;
            --text-secondary: rgba(0,0,0,0.6);
            --border-color: #e9ecef;
            --shadow-color: rgba(0,0,0,0.08);
          }
        }

        .withdraw-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          width: 100%;
        }

        @media (max-width: 480px) {
          .withdraw-page {
            padding: 0 12px;
          }
        }

        .page-header {
          margin-bottom: 24px;
        }

        .page-header h1 {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .page-header p {
          font-size: clamp(0.7rem, 3vw, 0.875rem);
          color: var(--text-secondary);
          margin: 6px 0 0;
        }

        /* Balance Card */
        .balance-card {
          background: var(--bg-card);
          border: 1px solid rgba(63,203,27,0.2);
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          box-shadow: 0 2px 8px var(--shadow-color);
        }

        @media (max-width: 480px) {
          .balance-card {
            padding: 16px 20px;
            gap: 16px;
            border-radius: 16px;
            margin-bottom: 20px;
          }
        }

        .balance-icon {
          width: 56px;
          height: 56px;
          background: rgba(63,203,27,0.15);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3fcb1b;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .balance-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
          }
          .balance-icon svg {
            width: 24px;
            height: 24px;
          }
        }

        .balance-info p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 4px;
        }

        .balance-info h2 {
          font-size: clamp(1.25rem, 5vw, 2rem);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        /* Withdraw Container */
        .withdraw-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 968px) {
          .withdraw-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Methods Section */
        .methods-section, .form-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 2px 8px var(--shadow-color);
        }

        @media (max-width: 480px) {
          .methods-section, .form-section {
            padding: 20px;
            border-radius: 16px;
          }
        }

        .methods-section h3, .form-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 20px;
        }

        @media (max-width: 480px) {
          .methods-section h3, .form-section h3 {
            font-size: 1rem;
            margin-bottom: 16px;
          }
        }

        .methods-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Method Cards */
        .method-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1.5px solid var(--border-color);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          background: var(--bg-card);
        }

        @media (max-width: 480px) {
          .method-card {
            padding: 14px;
            gap: 12px;
          }
        }

        .method-card:hover {
          transform: translateX(4px);
          border-color: rgba(63,203,27,0.3);
        }

        .method-card.selected {
          background: rgba(63,203,27,0.05);
          border-color: #3fcb1b;
        }

        .method-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .method-icon {
            width: 42px;
            height: 42px;
          }
          .method-icon svg {
            width: 20px;
            height: 20px;
          }
        }

        .method-info {
          flex: 1;
          min-width: 0;
        }

        .method-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 6px;
        }

        @media (max-width: 480px) {
          .method-info h4 {
            font-size: 0.9rem;
          }
        }

        .method-details {
          display: flex;
          gap: 12px;
          margin-bottom: 4px;
          flex-wrap: wrap;
        }

        .min-amount, .max-amount {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .method-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--text-secondary);
        }

        .selected-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        /* Form Styles - Fixed Alignment */
        .form-group {
          margin-bottom: 20px;
          width: 100%;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .form-group input, 
        .form-group select {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 14px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          -webkit-appearance: none;
          appearance: none;
        }

        .form-group select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }

        .form-group select option {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        @media (max-width: 480px) {
          .form-group input, 
          .form-group select {
            padding: 12px 14px;
            font-size: 13px;
          }
        }

        .form-group input:focus, 
        .form-group select:focus {
          outline: none;
          border-color: #3fcb1b;
          box-shadow: 0 0 0 3px rgba(63,203,27,0.1);
        }

        .form-group input::placeholder,
        .form-group select::placeholder {
          color: var(--text-secondary);
          opacity: 0.5;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .fields-container {
          margin-top: 0;
          width: 100%;
        }

        /* Amount Input */
        .amount-input-wrapper {
          position: relative;
          width: 100%;
        }

        .currency {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          pointer-events: none;
        }

        .amount-input {
          width: 100%;
          padding: 14px 16px 14px 42px;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 24px;
          font-weight: 600;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        @media (max-width: 480px) {
          .currency {
            left: 14px;
            font-size: 18px;
          }
          .amount-input {
            padding: 12px 14px 12px 38px;
            font-size: 20px;
          }
        }

        .amount-input:focus {
          outline: none;
          border-color: #3fcb1b;
          box-shadow: 0 0 0 3px rgba(63,203,27,0.1);
        }

        .quick-amounts {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .quick-amount-btn {
          padding: 6px 16px;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          color: var(--text-secondary);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        @media (max-width: 480px) {
          .quick-amount-btn {
            padding: 5px 14px;
            font-size: 12px;
          }
        }

        .quick-amount-btn:hover {
          background: rgba(63,203,27,0.1);
          border-color: #3fcb1b;
          color: #3fcb1b;
        }

        /* Info Box */
        .info-box {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: rgba(63,203,27,0.08);
          border: 1px solid rgba(63,203,27,0.1);
          border-radius: 12px;
          margin: 20px 0;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .info-box {
            padding: 14px;
            margin: 16px 0;
          }
        }

        .info-box svg {
          color: #3fcb1b;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .info-content {
          flex: 1;
          min-width: 0;
        }

        .info-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .info-text {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        /* Summary Card */
        .summary-card {
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 16px 20px;
          margin: 20px 0;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .summary-card {
            padding: 14px 16px;
            margin: 16px 0;
          }
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          color: var(--text-secondary);
          font-size: 14px;
          gap: 12px;
        }

        .summary-row:not(:last-child) {
          border-bottom: 1px solid var(--border-color);
        }

        .summary-row.total {
          padding-top: 12px;
          margin-top: 0;
          font-weight: 600;
          color: var(--text-primary);
          font-size: 15px;
          border-bottom: none;
        }

        @media (max-width: 480px) {
          .summary-row {
            font-size: 13px;
            padding: 8px 0;
          }
          .summary-row.total {
            font-size: 14px;
          }
        }

        /* Security Note */
        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
          font-size: 12px;
          color: var(--text-secondary);
          flex-wrap: wrap;
          text-align: center;
        }

        @media (max-width: 480px) {
          .security-note {
            font-size: 11px;
            margin-bottom: 20px;
          }
        }

        /* Withdraw Button */
        .withdraw-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .withdraw-btn {
            padding: 14px;
            font-size: 14px;
          }
        }

        .withdraw-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239,68,68,0.3);
        }

        .withdraw-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success Toast */
        .success-toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          background: #10b981;
          color: white;
          border-radius: 14px;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          max-width: 90%;
        }

        @media (max-width: 480px) {
          .success-toast {
            bottom: 20px;
            left: 16px;
            right: 16px;
            transform: translateX(0);
            padding: 12px 16px;
            gap: 10px;
            max-width: 100%;
          }
        }

        .success-toast strong {
          display: block;
          font-size: 14px;
        }

        .success-toast p {
          font-size: 12px;
          margin: 2px 0 0;
          opacity: 0.9;
        }

        /* Remove number input spinners */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}