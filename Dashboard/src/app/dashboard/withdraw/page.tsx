// src/app/dashboard/withdraw/page.tsx
'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  BiBitcoin, BiWallet, BiCheck, BiArrowToRight, 
  BiInfoCircle, BiLock, BiShield, BiTime, BiDollar
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
  
  // Mock balance - replace with actual user balance
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

    // Check required fields
    for (const field of selectedMethod.fields) {
      if (!formData[field]) {
        alert(`Please fill in all required fields`);
        return;
      }
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    
    // Reset form
    setAmount('');
    setFormData({});
  };

  const renderMethodFields = () => {
    switch (selectedMethod.id) {
      case 1: // Bank Transfer
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
      case 2: // Crypto
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
      case 3: // Skrill
      case 4: // Neteller
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

      {/* Balance Card */}
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
        {/* Withdrawal Methods */}
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

        {/* Withdrawal Form */}
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
              <span>${amount || '0'}</span>
            </div>
            <div className="summary-row">
              <span>Processing Fee</span>
              <span>${selectedMethod.fee}</span>
            </div>
            <div className="summary-row total">
              <span>You'll Receive</span>
              <span>${amount || '0'}</span>
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

      {/* Success Toast */}
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
        .withdraw-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 28px;
        }

        .page-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .page-header p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 6px 0 0;
        }

        /* Balance Card */
        .balance-card {
          background: linear-gradient(135deg, rgba(63,203,27,0.1), rgba(0,0,0,0.05));
          border: 1px solid rgba(63,203,27,0.2);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .balance-icon {
          width: 60px;
          height: 60px;
          background: rgba(63,203,27,0.15);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3fcb1b;
        }

        .balance-info p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 4px;
        }

        .balance-info h2 {
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        /* Withdraw Container */
        .withdraw-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 28px;
        }

        @media (max-width: 968px) {
          .withdraw-container {
            grid-template-columns: 1fr;
          }
        }

        /* Methods Section */
        .methods-section, .form-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 24px;
        }

        .methods-section h3, .form-section h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 20px;
        }

        .methods-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

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
        }

        .method-card:hover {
          transform: translateX(4px);
        }

        .method-card.selected {
          background: rgba(63,203,27,0.05);
        }

        .method-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .method-info {
          flex: 1;
        }

        .method-info h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 6px;
        }

        .method-details {
          display: flex;
          gap: 12px;
          margin-bottom: 4px;
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
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .form-group input, .form-group select {
          width: 100%;
          padding: 12px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: #3fcb1b;
          box-shadow: 0 0 0 2px rgba(63,203,27,0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .amount-input-wrapper {
          position: relative;
        }

        .currency {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .amount-input {
          width: 100%;
          padding: 14px 14px 14px 38px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 24px;
          font-weight: 600;
        }

        .quick-amounts {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .quick-amount-btn {
          padding: 6px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          color: var(--text-secondary);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quick-amount-btn:hover {
          background: rgba(63,203,27,0.1);
          border-color: #3fcb1b;
          color: #3fcb1b;
        }

        .fields-container {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }

        /* Info Box */
        .info-box {
          display: flex;
          gap: 12px;
          padding: 14px;
          background: rgba(63,203,27,0.08);
          border-radius: 12px;
          margin: 20px 0;
        }

        .info-box svg {
          color: #3fcb1b;
          flex-shrink: 0;
          margin-top: 2px;
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
        }

        /* Summary Card */
        .summary-card {
          background: var(--bg-secondary);
          border-radius: 14px;
          padding: 16px;
          margin: 20px 0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .summary-row.total {
          padding-top: 12px;
          margin-top: 8px;
          border-top: 1px solid var(--border-color);
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Security Note */
        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Withdraw Button */
        .withdraw-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .withdraw-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239,68,68,0.3);
        }

        .withdraw-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
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
      `}</style>
    </div>
  );
}