// src/app/dashboard/verification/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiCheckCircle, BiXCircle, BiUpload, BiBuilding, BiUser, BiIdCard, BiShield } from 'react-icons/bi';

const verificationSteps = [
  { id: 1, name: 'Identity Verification', icon: BiUser, status: 'completed', description: 'Verify your identity with government ID' },
  { id: 2, name: 'Address Verification', icon: BiBuilding, status: 'pending', description: 'Proof of address (utility bill, bank statement)' },
  { id: 3, name: 'Bank Account', icon: BiIdCard, status: 'pending', description: 'Add and verify your bank account' },
];

export default function VerificationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bankDetails, setBankDetails] = useState({ bankName: '', accountHolder: '', accountNumber: '', routingNumber: '' });

  const handleBankSubmit = () => {
    alert('Bank account added successfully!');
  };

  return (
    <div className="verification-page">
      <div className="page-header">
        <h1>Account Verification</h1>
        <p>Complete your verification to unlock all features</p>
      </div>

      <div className="verification-steps">
        {verificationSteps.map((step, index) => (
          <motion.div key={step.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className={`step ${step.status}`}>
            <div className="step-icon">{step.status === 'completed' ? <BiCheckCircle size={24} /> : <step.icon size={24} />}</div>
            <div className="step-content">
              <h3>{step.name}</h3>
              <p>{step.description}</p>
              {step.status === 'pending' && (<div className="upload-area"><input type="file" id={`file-${step.id}`} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} /><label htmlFor={`file-${step.id}`}><BiUpload size={20} /> Upload Document</label></div>)}
              {step.status === 'completed' && <span className="completed-badge">Verified</span>}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bank-account-section">
        <h3><BiShield size={20} /> Bank Account Information</h3>
        <div className="bank-form">
          <input type="text" placeholder="Bank Name" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} />
          <input type="text" placeholder="Account Holder Name" value={bankDetails.accountHolder} onChange={(e) => setBankDetails({...bankDetails, accountHolder: e.target.value})} />
          <input type="text" placeholder="Account Number" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} />
          <input type="text" placeholder="Routing Number" value={bankDetails.routingNumber} onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})} />
          <button className="add-bank-btn" onClick={handleBankSubmit}>Add Bank Account</button>
        </div>
      </div>

      <div className="verification-status">
        <h3>Verification Status</h3>
        <div className="status-progress"><div className="progress-bar" style={{ width: '33%' }}></div></div>
        <p>1 of 3 steps completed</p>
      </div>

      <style jsx>{`
        .verification-page { max-width: 800px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .verification-steps { display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px; }
        .step { display: flex; gap: 20px; padding: 24px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; }
        .step.completed { border-color: #10b981; }
        .step-icon { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(63,203,27,0.1); color: #3fcb1b; }
        .step-content { flex: 1; }
        .step-content h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 4px; }
        .step-content p { font-size: 13px; color: var(--text-secondary); margin: 0 0 16px; }
        .upload-area label { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(63,203,27,0.1); border-radius: 10px; color: #3fcb1b; cursor: pointer; }
        .upload-area input { display: none; }
        .completed-badge { display: inline-block; padding: 6px 12px; background: rgba(16,185,129,0.1); color: #10b981; border-radius: 20px; font-size: 12px; }

        .bank-account-section { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
        .bank-account-section h3 { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; }
        .bank-form { display: flex; flex-direction: column; gap: 16px; }
        .bank-form input { padding: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); }
        .add-bank-btn { padding: 12px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; }

        .verification-status { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; text-align: center; }
        .verification-status h3 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0 0 16px; }
        .status-progress { height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
        .progress-bar { height: 100%; background: #3fcb1b; border-radius: 4px; }
        .verification-status p { font-size: 13px; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}