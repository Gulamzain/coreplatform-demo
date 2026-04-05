// src/app/dashboard/settings/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiUser, BiLock, BiShield, BiBell, BiGlobe, BiWallet, BiSave } from 'react-icons/bi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    country: 'United States',
    timezone: 'EST',
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    tradeNotifications: true,
    priceAlerts: false,
    newsletter: true,
  });
  const [twoFA, setTwoFA] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: BiUser },
    { id: 'security', label: 'Security', icon: BiLock },
    { id: 'notifications', label: 'Notifications', icon: BiBell },
    { id: 'preferences', label: 'Preferences', icon: BiGlobe },
    { id: 'banking', label: 'Banking', icon: BiWallet },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-400">Manage your account preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
                activeTab === tab.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Country</label>
                  <select
                    value={profile.country}
                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Time Zone</label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
                  >
                    <option>EST</option>
                    <option>CST</option>
                    <option>MST</option>
                    <option>PST</option>
                    <option>GMT</option>
                  </select>
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-medium hover:bg-green-400 transition-all flex items-center gap-2">
                <BiSave /> Save Changes
              </button>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Current Password</label>
                  <input type="password" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">New Password</label>
                  <input type="password" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Confirm New Password</label>
                  <input type="password" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <button
                    onClick={() => setTwoFA(!twoFA)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      twoFA ? 'bg-green-500 text-black' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {twoFA ? 'Enabled' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-medium hover:bg-green-400 transition-all flex items-center gap-2">
                <BiSave /> Update Password
              </button>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm text-gray-400">Receive {key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`w-12 h-6 rounded-full transition-all ${
                      value ? 'bg-green-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform mt-0.5 ${
                      value ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Platform Preferences</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="text-white font-medium block mb-2">Chart Theme</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500">
                    <option>Dark</option>
                    <option>Light</option>
                    <option>System Default</option>
                  </select>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="text-white font-medium block mb-2">Default Leverage</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500">
                    <option>1:100</option>
                    <option>1:200</option>
                    <option>1:500</option>
                  </select>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="text-white font-medium block mb-2">Quote Display</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500">
                    <option>5 Decimals</option>
                    <option>4 Decimals</option>
                    <option>3 Decimals</option>
                  </select>
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-medium hover:bg-green-400 transition-all flex items-center gap-2">
                <BiSave /> Save Preferences
              </button>
            </motion.div>
          )}

          {activeTab === 'banking' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Banking Information</h3>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
                <p className="text-green-400 text-sm">Bank accounts are verified and secure</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Bank Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500" placeholder="Enter bank name" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Account Holder Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500" placeholder="Enter account holder name" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Account Number</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500" placeholder="Enter account number" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Routing Number</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500" placeholder="Enter routing number" />
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-medium hover:bg-green-400 transition-all flex items-center gap-2">
                <BiSave /> Save Banking Info
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}