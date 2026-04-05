// src/app/dashboard/security/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiLock, BiShield, BiMobile, BiKey, BiSave, BiCheck, BiRefresh, BiTrash } from 'react-icons/bi';

export default function SecurityPage() {
  const [twoFA, setTwoFA] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) { alert('Passwords do not match'); return; }
    alert('Password changed successfully!');
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
  };

  return (
    <div className="security-page">
      <div className="page-header"><h1>Security Settings</h1><p>Protect your account with advanced security</p></div>

      <div className="security-grid">
        <div className="security-card"><div className="card-icon"><BiLock size={24} /></div><h3>Password</h3><p>Change your password regularly to keep your account secure</p>
          <div className="password-form"><input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /><input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><button className="update-btn" onClick={handlePasswordChange}><BiSave size={16} /> Update Password</button></div>
        </div>

        <div className="security-card"><div className="card-icon"><BiShield size={24} /></div><h3>Two-Factor Authentication</h3><p>Add an extra layer of security to your account</p>
          <div className="twofa-toggle"><span>{twoFA ? 'Enabled' : 'Disabled'}</span><button className={`toggle-btn ${twoFA ? 'active' : ''}`} onClick={() => setTwoFA(!twoFA)}>{twoFA && <BiCheck size={16} />}</button></div>
          {twoFA && (<div className="twofa-setup"><p>Scan QR code with Google Authenticator</p><div className="qr-placeholder">[QR Code]</div><input type="text" placeholder="Enter 6-digit code" /><button className="verify-btn">Verify & Enable</button></div>)}
        </div>

        <div className="security-card"><div className="card-icon"><BiMobile size={24} /></div><h3>Device Management</h3><p>Manage devices connected to your account</p>
          <div className="device-list"><div className="device-item"><div><p>Windows PC - Chrome</p><span>Last active: Today</span></div><button className="remove-btn"><BiTrash size={14} /> Remove</button></div><div className="device-item"><div><p>iPhone 14 - Safari</p><span>Last active: Yesterday</span></div><button className="remove-btn"><BiTrash size={14} /> Remove</button></div></div>
          <button className="refresh-devices"><BiRefresh size={16} /> Refresh Devices</button>
        </div>

        <div className="security-card"><div className="card-icon"><BiKey size={24} /></div><h3>API Keys</h3><p>Generate API keys for automated trading</p><button className="generate-btn">+ Generate New API Key</button>
          <div className="api-keys-list"><div className="api-item"><div><p>API Key #1</p><span>Created: 2024-03-01</span></div><button className="revoke-btn">Revoke</button></div></div>
        </div>
      </div>

      <style jsx>{`
        .security-page { max-width: 1200px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .security-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; }
        @media (max-width: 768px) { .security-grid { grid-template-columns: 1fr; } }

        .security-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; transition: all 0.3s ease; }
        .security-card:hover { transform: translateY(-4px); border-color: #3fcb1b; }
        .card-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(63,203,27,0.1); color: #3fcb1b; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .security-card h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 8px; }
        .security-card p { font-size: 13px; color: var(--text-secondary); margin-bottom: 20px; }

        .password-form { display: flex; flex-direction: column; gap: 12px; }
        .password-form input { padding: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); }
        .update-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 10px; cursor: pointer; }

        .twofa-toggle { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .toggle-btn { width: 48px; height: 24px; border-radius: 12px; background: var(--border-color); border: none; cursor: pointer; position: relative; transition: all 0.3s ease; }
        .toggle-btn.active { background: #3fcb1b; }
        .twofa-setup { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color); }
        .qr-placeholder { width: 120px; height: 120px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 12px 0; color: var(--text-secondary); }
        .twofa-setup input { width: 100%; padding: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; margin-bottom: 12px; }
        .verify-btn { width: 100%; padding: 12px; background: #3fcb1b; color: white; border: none; border-radius: 10px; cursor: pointer; }

        .device-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
        .device-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-secondary); border-radius: 10px; }
        .device-item p { margin: 0; font-weight: 500; color: var(--text-primary); }
        .device-item span { font-size: 11px; color: var(--text-secondary); }
        .remove-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(239,68,68,0.1); color: #ef4444; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; }
        .refresh-devices { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; background: rgba(63,203,27,0.1); color: #3fcb1b; border: none; border-radius: 10px; cursor: pointer; }

        .generate-btn { width: 100%; padding: 12px; background: rgba(63,203,27,0.1); color: #3fcb1b; border: 1px solid rgba(63,203,27,0.2); border-radius: 10px; cursor: pointer; font-weight: 500; margin-bottom: 16px; }
        .api-keys-list .api-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-secondary); border-radius: 10px; margin-bottom: 8px; }
        .api-item p { margin: 0; font-weight: 500; color: var(--text-primary); }
        .api-item span { font-size: 11px; color: var(--text-secondary); }
        .revoke-btn { padding: 6px 12px; background: rgba(239,68,68,0.1); color: #ef4444; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; }
      `}</style>
    </div>
  );
}