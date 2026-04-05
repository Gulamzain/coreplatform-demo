// src/app/dashboard/support/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiHeadphone, BiMessage, BiEnvelope, BiLogoWhatsapp, BiSend, BiPaperclip } from 'react-icons/bi';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';

const tickets = [
  { id: '#TKT-001', subject: 'Withdrawal Issue', status: 'Open', priority: 'High', date: '2024-03-15' },
  { id: '#TKT-002', subject: 'Platform Login', status: 'In Progress', priority: 'Medium', date: '2024-03-14' },
  { id: '#TKT-003', subject: 'Account Verification', status: 'Closed', priority: 'Low', date: '2024-03-10' },
];

export default function SupportPage() {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Support Center</h1>
        <p className="text-sm text-gray-400">Get help and support from our team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Options */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                  <BiHeadphone size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Live Chat</p>
                  <p className="text-xs text-gray-400">Available 24/7</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <BiEnvelope size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Email Support</p>
                  <p className="text-xs text-gray-400">support@foxnance.com</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                  <BiLogoWhatsapp size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">WhatsApp</p>
                  <p className="text-xs text-gray-400">+1 888 123 4567</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <FaDiscord size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">Discord</p>
                  <p className="text-xs text-gray-400">Join our community</p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Help */}
          <div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Help</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors text-sm">• FAQ & Knowledge Base</a>
              <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors text-sm">• Video Tutorials</a>
              <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors text-sm">• Platform Guides</a>
              <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors text-sm">• API Documentation</a>
            </div>
          </div>
        </div>

        {/* Create Ticket */}
        <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Create New Ticket</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue in detail..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-500 resize-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <BiPaperclip size={18} />
                <span className="text-sm">Attach file</span>
              </button>
              <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-medium hover:bg-green-400 transition-all flex items-center gap-2">
                <BiSend /> Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">My Support Tickets</h3>
          <button className="text-green-400 text-sm hover:text-green-300">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-sm font-medium text-gray-400">Ticket ID</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Subject</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Priority</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-white font-mono text-sm">{ticket.id}</td>
                  <td className="py-3 text-gray-300">{ticket.subject}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-green-500/20 text-green-400' :
                      ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      ticket.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300">{ticket.date}</td>
                  <td className="py-3">
                    <button className="text-green-400 text-sm hover:text-green-300">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}