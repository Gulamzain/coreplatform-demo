// src/app/dashboard/tickets/open/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiPlus, BiSearch, BiMessage, BiTime, BiHelpCircle } from 'react-icons/bi';

const tickets = [
  { id: '#TKT-001', subject: 'Withdrawal Issue', status: 'Open', priority: 'High', date: '2024-03-15', messages: 3 },
  { id: '#TKT-002', subject: 'Platform Login', status: 'In Progress', priority: 'Medium', date: '2024-03-14', messages: 5 },
];

export default function OpenTicketsPage() {
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = () => {
    if (!subject || !message) return;
    alert(`Ticket created: ${subject}`);
    setShowForm(false);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="tickets-page">
      <div className="page-header">
        <h1>Open Tickets</h1>
        <p>View and manage your active support requests</p>
      </div>

      <div className="actions-bar">
        <button className="new-ticket-btn" onClick={() => setShowForm(true)}><BiPlus size={18} /> New Ticket</button>
        <div className="search-box"><BiSearch size={18} /><input type="text" placeholder="Search tickets..." /></div>
      </div>

      <div className="tickets-list">
        {tickets.map((ticket, index) => (
          <motion.div key={ticket.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="ticket-card">
            <div className="ticket-header">
              <span className="ticket-id">{ticket.id}</span>
              <span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
            </div>
            <h3>{ticket.subject}</h3>
            <div className="ticket-meta">
              <span><BiTime size={14} /> {ticket.date}</span>
              <span><BiMessage size={14} /> {ticket.messages} messages</span>
              <span className={`status ${ticket.status === 'Open' ? 'open' : 'progress'}`}>{ticket.status}</span>
            </div>
            <button className="view-btn">View Ticket →</button>
          </motion.div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Ticket</h3>
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
            <textarea rows={4} placeholder="Describe your issue..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <div className="modal-actions">
              <button className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="submit" onClick={handleSubmit}>Submit Ticket</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .tickets-page { max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .actions-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
        .new-ticket-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 10px; cursor: pointer; }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; }
        .search-box input { background: none; border: none; color: var(--text-primary); outline: none; width: 200px; }

        .tickets-list { display: flex; flex-direction: column; gap: 16px; }
        .ticket-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; transition: all 0.3s ease; }
        .ticket-card:hover { transform: translateX(4px); border-color: #3fcb1b; }
        .ticket-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .ticket-id { font-family: monospace; font-size: 12px; color: var(--text-secondary); }
        .priority { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .priority.high { background: rgba(239,68,68,0.1); color: #ef4444; }
        .priority.medium { background: rgba(245,158,11,0.1); color: #f59e0b; }
        .priority.low { background: rgba(16,185,129,0.1); color: #10b981; }
        .ticket-card h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 12px; }
        .ticket-meta { display: flex; gap: 16px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
        .ticket-meta span { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-secondary); }
        .status { padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; }
        .status.open { background: rgba(239,68,68,0.1); color: #ef4444; }
        .status.progress { background: rgba(245,158,11,0.1); color: #f59e0b; }
        .view-btn { background: none; border: none; color: #3fcb1b; cursor: pointer; font-size: 14px; font-weight: 500; }

        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .modal { background: var(--bg-card); border-radius: 20px; padding: 28px; width: 90%; max-width: 500px; }
        .modal h3 { font-size: 20px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; }
        .modal input, .modal select, .modal textarea { width: 100%; padding: 12px; margin-bottom: 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); }
        .modal-actions { display: flex; gap: 12px; margin-top: 20px; }
        .cancel, .submit { flex: 1; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; }
        .cancel { background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-secondary); }
        .submit { background: #3fcb1b; border: none; color: white; }
      `}</style>
    </div>
  );
}