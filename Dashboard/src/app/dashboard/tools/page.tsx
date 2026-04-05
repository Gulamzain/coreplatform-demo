// src/app/dashboard/tools/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiCalculator, BiLineChart, BiNews, BiBot, BiRefresh, BiCalendar, BiTrendingUp } from 'react-icons/bi';
import { MdSignalCellularAlt } from 'react-icons/md';

const tools = [
  { id: 1, name: 'Trade Calculator', icon: BiCalculator, description: 'Calculate position size, risk, and potential profit', color: '#3b82f6' },
  { id: 2, name: 'Economic Calendar', icon: BiCalendar, description: 'Stay updated with important economic events', color: '#f59e0b' },
  { id: 3, name: 'Market News', icon: BiNews, description: 'Real-time market news and analysis', color: '#10b981' },
  { id: 4, name: 'Trading Signals', icon: MdSignalCellularAlt, description: 'Get trading signals from experts', color: '#8b5cf6' },
  { id: 5, name: 'Auto Trading Bot', icon: BiBot, description: 'Automate your trading strategies', color: '#ec489a' },
  { id: 6, name: 'Market Screener', icon: BiLineChart, description: 'Screen markets based on your criteria', color: '#06b6d4' },
];

export default function ToolsPage() {
  return (
    <div className="tools-page">
      <div className="page-header">
        <h1>Trading Tools</h1>
        <p>Professional tools to enhance your trading experience</p>
      </div>

      <div className="tools-grid">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="tool-card"
            style={{ borderColor: `${tool.color}30` }}
          >
            <div className="tool-icon" style={{ background: `${tool.color}15`, color: tool.color }}>
              <tool.icon size={32} />
            </div>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <button className="tool-btn" style={{ background: tool.color }}>Launch Tool →</button>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .tools-page { max-width: 1200px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .tool-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 28px; text-align: center; transition: all 0.3s ease; }
        .tool-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
        .tool-icon { width: 64px; height: 64px; margin: 0 auto 20px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .tool-card h3 { font-size: 20px; font-weight: 600; color: var(--text-primary); margin: 0 0 8px; }
        .tool-card p { font-size: 13px; color: var(--text-secondary); margin: 0 0 20px; line-height: 1.5; }
        .tool-btn { padding: 10px 24px; border: none; border-radius: 10px; color: white; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .tool-btn:hover { transform: translateX(4px); }
      `}</style>
    </div>
  );
}