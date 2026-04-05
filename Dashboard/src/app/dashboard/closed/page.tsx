// src/app/dashboard/tickets/closed/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiSearch, BiCheckCircle, BiTime, BiMessage, BiStar } from 'react-icons/bi';

const closedTickets = [
  { id: '#TKT-001', subject: 'Withdrawal Issue', status: 'Closed', priority: 'High', date: '2024-03-10', resolvedDate: '2024-03-12', rating: 5 },
  { id: '#TKT-002', subject: 'Account Verification', status: 'Closed', priority: 'Medium', date: '2024-03-05', resolvedDate: '2024-03-07', rating: 4 },
  { id: '#TKT-003', subject: 'Platform Login', status: 'Closed', priority: 'Low', date: '2024-03-01', resolvedDate: '2024-03-02', rating: 5 },
];

export default function ClosedTicketsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = closedTickets.filter(t => 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="closed-tickets-page">
      <div className="page-header">
        <h1>Closed Tickets</h1>
        <p>View your resolved support tickets</p>
      </div>

      <div className="search-bar">
        <BiSearch size={18} />
        <input type="text" placeholder="Search tickets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="tickets-list">
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="ticket-card"
          >
            <div className="ticket-header">
              <span className="ticket-id">{ticket.id}</span>
              <span className="status closed">Closed</span>
            </div>
            <h3>{ticket.subject}</h3>
            <div className="ticket-meta">
              <span><BiTime size={14} /> Created: {ticket.date}</span>
              <span><BiCheckCircle size={14} /> Resolved: {ticket.resolvedDate}</span>
              <span><BiMessage size={14} /> 4 messages</span>
            </div>
            <div className="ticket-rating">
              <span>Rating:</span>
              {[...Array(5)].map((_, i) => (
                <BiStar key={i} className={i < ticket.rating ? 'filled' : ''} size={14} />
              ))}
            </div>
            <button className="view-btn">View Details →</button>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .closed-tickets-page { max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .search-bar { display: flex; align-items: center; gap: 12px; padding: 12px 20px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 24px; }
        .search-bar input { flex: 1; background: none; border: none; color: var(--text-primary); outline: none; }

        .tickets-list { display: flex; flex-direction: column; gap: 16px; }
        .ticket-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; transition: all 0.3s ease; }
        .ticket-card:hover { transform: translateX(4px); border-color: #10b981; }
        .ticket-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .ticket-id { font-family: monospace; font-size: 12px; color: var(--text-secondary); }
        .status { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .status.closed { background: rgba(16,185,129,0.1); color: #10b981; }
        .ticket-card h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 12px; }
        .ticket-meta { display: flex; gap: 20px; margin-bottom: 16px; flex-wrap: wrap; }
        .ticket-meta span { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-secondary); }
        .ticket-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .ticket-rating span { font-size: 12px; color: var(--text-secondary); }
        .ticket-rating .filled { color: #fbbf24; fill: #fbbf24; }
        .view-btn { background: none; border: none; color: #10b981; cursor: pointer; font-size: 14px; font-weight: 500; }
      `}</style>
    </div>
  );
}