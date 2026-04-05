// src/app/dashboard/chat/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiSend, BiPaperclip, BiSmile, BiSupport, BiUser, BiTime } from 'react-icons/bi';

const messages = [
  { id: 1, type: 'support', message: 'Hello! How can I help you today?', time: '10:30 AM', sender: 'Support Agent' },
  { id: 2, type: 'user', message: 'I need help with my deposit', time: '10:31 AM', sender: 'You' },
  { id: 3, type: 'support', message: 'Sure, I can help with that. What seems to be the issue?', time: '10:32 AM', sender: 'Support Agent' },
];

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  return (
    <div className="chat-page">
      <div className="page-header">
        <h1>Live Chat Support</h1>
        <p>Get instant help from our support team</p>
      </div>

      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="agent-info">
            <div className="agent-avatar"><BiSupport size={32} /></div>
            <h3>Support Team</h3>
            <p>Online · Avg response 2min</p>
          </div>
          <div className="chat-history">
            <h4>Previous Chats</h4>
            <div className="history-item"><BiUser size={16} /><div><p>Deposit Issue</p><span>2 days ago</span></div></div>
          </div>
        </div>

        <div className="chat-main">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.type}`}>
                <div className="message-content"><p>{msg.message}</p><span className="time"><BiTime size={12} /> {msg.time}</span></div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <button className="attach-btn"><BiPaperclip size={20} /></button>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
            <button className="emoji-btn"><BiSmile size={20} /></button>
            <button className="send-btn" onClick={handleSend}><BiSend size={20} /></button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-page { max-width: 1200px; margin: 0 auto; height: calc(100vh - 200px); }
        .page-header { margin-bottom: 24px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .chat-container { display: flex; height: calc(100% - 80px); background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; overflow: hidden; }
        .chat-sidebar { width: 280px; background: var(--bg-secondary); border-right: 1px solid var(--border-color); padding: 20px; }
        .agent-info { text-align: center; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); margin-bottom: 20px; }
        .agent-avatar { width: 64px; height: 64px; margin: 0 auto 12px; background: rgba(63,203,27,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #3fcb1b; }
        .agent-info h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .agent-info p { font-size: 12px; color: #10b981; margin-top: 4px; }
        .chat-history h4 { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }
        .history-item { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 10px; cursor: pointer; }
        .history-item:hover { background: rgba(63,203,27,0.05); }
        .history-item p { font-size: 13px; color: var(--text-primary); margin: 0; }
        .history-item span { font-size: 10px; color: var(--text-secondary); }

        .chat-main { flex: 1; display: flex; flex-direction: column; }
        .chat-messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
        .message { display: flex; }
        .message.support { justify-content: flex-start; }
        .message.user { justify-content: flex-end; }
        .message-content { max-width: 70%; padding: 12px 16px; border-radius: 16px; }
        .message.support .message-content { background: rgba(63,203,27,0.1); border-bottom-left-radius: 4px; }
        .message.user .message-content { background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border-bottom-right-radius: 4px; }
        .message-content p { margin: 0; font-size: 14px; }
        .message-content .time { font-size: 10px; opacity: 0.7; display: flex; align-items: center; gap: 4px; margin-top: 6px; }

        .chat-input { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-top: 1px solid var(--border-color); background: var(--bg-card); }
        .attach-btn, .emoji-btn, .send-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .send-btn { background: #3fcb1b; border: none; color: white; }
        .chat-input input { flex: 1; padding: 12px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 20px; color: var(--text-primary); outline: none; }
      `}</style>
    </div>
  );
}