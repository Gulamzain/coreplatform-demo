// src/components/user-profile-tab.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { BiUser, BiLock, BiShield, BiBell, BiWallet, BiHistory, BiTrendingUp } from 'react-icons/bi';

export default function UserProfileTab() {
  const menuItems = [
    { name: 'Profile', href: '/dashboard/profile', icon: BiUser },
    { name: 'Security', href: '/dashboard/security', icon: BiLock },
    { name: 'Verification', href: '/dashboard/verification', icon: BiShield },
    { name: 'Notifications', href: '/dashboard/notifications', icon: BiBell },
    { name: 'Wallet', href: '/dashboard/wallet', icon: BiWallet },
    { name: 'Transaction History', href: '/dashboard/transactions', icon: BiHistory },
    { name: 'Trading Activity', href: '/dashboard/trading', icon: BiTrendingUp },
  ];

  return (
    <div className="user-profile-tab">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <span>GZ</span>
          </div>
          <h3>Gulam Zain</h3>
          <p>ID: FOX12345</p>
        </div>
        
        <nav className="profile-nav">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="profile-nav-item"
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .user-profile-tab {
          width: 280px;
          background: var(--bg-card);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .profile-avatar {
          padding: 24px;
          text-align: center;
          border-bottom: 1px solid var(--border-color);
          background: linear-gradient(135deg, rgba(63,203,27,0.1), rgba(0,0,0,0.05));
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-circle span {
          font-size: 32px;
          font-weight: bold;
          color: white;
        }

        .profile-avatar h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .profile-avatar p {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
        }

        .profile-nav {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .profile-nav-item:hover {
          background: rgba(63,203,27,0.1);
          color: #3fcb1b;
        }
      `}</style>
    </div>
  );
}