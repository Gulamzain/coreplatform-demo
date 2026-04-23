// src/app/dashboard/page.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  BiChevronRight,
  BiChevronLeft,
  BiDollar,
  BiRefresh,
  BiDownload,
  BiPlus,
} from 'react-icons/bi'
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

const ticker = [
  { label: 'EUR/USD', price: '1.08945', change: '+0.47%', up: true },
  { label: 'GBP/USD', price: '1.27420', change: '-0.21%', up: false },
  { label: 'XAU/USD', price: '2356.80', change: '+0.67%', up: true },
  { label: 'BTC/USD', price: '69,150', change: '+1.39%', up: true },
  { label: 'USD/JPY', price: '154.32', change: '+0.12%', up: true },
  { label: 'OIL/USD', price: '78.45', change: '-0.88%', up: false },
]

const accounts = [
  { id: 1, name: 'MT5 #155691', tag: 'LIVE' },
  { id: 2, name: 'MT5 #155692', tag: 'DEMO' },
]

const metrics = [
  {
    id: 'balance',
    title: 'Account Balance',
    value: '$25,340.50',
    sub: '↑ +$1,439.80 ( +5.68% )',
    positive: true,
  },
  {
    id: 'equity',
    title: 'Total Equity',
    value: '$26,780.30',
    sub: 'Floating P&L: +$1,439.80',
    positive: true,
  },
  {
    id: 'free',
    title: 'Free Margin',
    value: '$25,340.50',
    sub: 'Margin Used: $1,439.80',
    positive: true,
  },
  {
    id: 'margin',
    title: 'Margin Level',
    value: '1861.02%',
    sub: 'Safe Level',
    positive: true,
  },
]

const positions = [
  {
    symbol: 'EUR/USD',
    type: 'Buy',
    volume: 0.5,
    open: 1.08432,
    current: 1.08945,
    pnl: 256.5,
    time: '10:32',
  },
  {
    symbol: 'GBP/USD',
    type: 'Sell',
    volume: 0.3,
    open: 1.2768,
    current: 1.2742,
    pnl: 78.0,
    time: '10:28',
  },
  {
    symbol: 'XAU/USD',
    type: 'Buy',
    volume: 0.1,
    open: 2341.2,
    current: 2356.8,
    pnl: 156.0,
    time: '10:15',
  },
  {
    symbol: 'BTC/USD',
    type: 'Buy',
    volume: 0.01,
    open: 68000,
    current: 69150,
    pnl: 1150.0,
    time: '09:58',
  },
]

export default function DashboardPage() {
  return (
    <div className="dashboard-root">
      <div className="container">
        {/* Top ticker */}
        <div className="ticker">
          <button className="ticker-btn"><BiChevronLeft /></button>
          <div className="ticker-scroll">
            {ticker.map((t, i) => (
              <div key={i} className="ticker-item">
                <div className="t-label">{t.label}</div>
                <div className="t-price">{t.price}</div>
                <div className={`t-change ${t.up ? 'up' : 'down'}`}>{t.change}</div>
              </div>
            ))}
          </div>
          <button className="ticker-btn"><BiChevronRight /></button>
        </div>

        {/* Greeting + accounts */}
        <div className="header-row">
          <div className="greeting">
            <h2>Hello, Gulam Zain</h2>
            <p>Good morning 👋 Here’s your trading overview for today</p>
          </div>

          <div className="accounts-row">
            {accounts.map((a) => (
              <div key={a.id} className="account-pill">
                <div className="acc-name">{a.name}</div>
                <div className={`acc-tag ${a.tag === 'LIVE' ? 'live' : 'demo'}`}>{a.tag}</div>
              </div>
            ))}

            <button className="btn-new"><BiPlus /> New Account</button>
          </div>
        </div>

        {/* Portfolio summary */}
        <div className="grid-3">
          <div className="portfolio-card">
            <div className="portfolio-top">
              <div>
                <div className="muted">Total Portfolio</div>
                <div className="big">$35,340.50</div>
                <div className="gain">+ $2,330.00</div>
              </div>

              <div className="portfolio-actions">
                <button className="action-btn"><BiRefresh /> Refresh</button>
                <button className="action-btn"><BiDownload /> Export</button>
              </div>
            </div>

            <div className="balance-section">
              <div className="balance-meta">
                <div className="meta-title">Balance History</div>
                <div className="meta-badges">
                  <span className="badge green">Peak $20,500</span>
                  <span className="badge slate">Growth +64%</span>
                  <span className="badge red">Drawdown -2.8%</span>
                </div>
              </div>

              <div className="chart-wrap">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="sparkline">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#0ea5a0" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <path d="M0,25 L10,22 L20,18 L30,16 L40,12 L50,10 L60,8 L70,6 L80,5 L90,4 L100,3" stroke="#34d399" strokeWidth="1.6" fill="none" />
                  <path d="M0,25 L10,22 L20,18 L30,16 L40,12 L50,10 L60,8 L70,6 L80,5 L90,4 L100,3 L100,30 L0,30 Z" fill="url(#g1)" opacity="0.9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="donut-card">
            <div className="donut-top">
              <div>
                <div className="muted">Asset Allocation</div>
                <div className="big">Total 100%</div>
              </div>
              <div className="muted">Legend</div>
            </div>

            <div className="donut-body">
              <div className="donut" />
              <ul className="legend">
                <li><span className="swatch forex" /> <span className="legend-label">Forex</span> <span className="legend-value">45%</span></li>
                <li><span className="swatch comm" /> <span className="legend-label">Commodities</span> <span className="legend-value">20%</span></li>
                <li><span className="swatch idx" /> <span className="legend-label">Indices</span> <span className="legend-value">15%</span></li>
                <li><span className="swatch crypto" /> <span className="legend-label">Crypto</span> <span className="legend-value">12%</span></li>
                <li><span className="swatch stocks" /> <span className="legend-label">Stocks</span> <span className="legend-value">8%</span></li>
              </ul>
            </div>

            <div className="margin-level">
              <div className="muted">Margin Level <span className="ml-auto bold">1861.02% (Safe)</span></div>
              <div className="progress">
                <div className="progress-fill" style={{ width: '86%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="metrics-grid">
          {metrics.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="metric-card">
              <div className="muted">{m.title}</div>
              <div className="metric-value">{m.value}</div>
              <div className={`metric-sub ${m.positive ? 'pos' : 'neg'}`}>{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="actions-row">
          <button className="btn-deposit"><BiDollar /> Deposit</button>
          <button className="btn-outline">Withdraw</button>
          <button className="btn-outline">Transfer</button>
        </div>

        {/* Open Positions */}
        <div className="positions-card">
          <div className="positions-header">
            <div>
              <h3>Open Positions</h3>
              <p className="muted">Active trades and real-time P&L</p>
            </div>
            <div className="positions-controls">
              <span className="active-pill">4 Active</span>
              <button className="manage-btn">Manage</button>
            </div>
          </div>

          <div className="table-wrap">
            <table className="positions-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Volume</th>
                  <th>Open Price</th>
                  <th>Current</th>
                  <th>P&L</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p, i) => (
                  <tr key={i}>
                    <td className="sym">{p.symbol}</td>
                    <td>
                      <div className={`type-pill ${p.type === 'Buy' ? 'buy' : 'sell'}`}>
                        {p.type === 'Buy' ? <FiArrowUpRight /> : <FiArrowDownRight />} {p.type}
                      </div>
                    </td>
                    <td>{p.volume}</td>
                    <td>{p.open}</td>
                    <td>{p.current}</td>
                    <td className={`pnl ${p.pnl >= 0 ? 'pnl-pos' : 'pnl-neg'}`}>{p.pnl >= 0 ? `+${p.pnl.toFixed(2)}` : p.pnl.toFixed(2)}</td>
                    <td className="muted">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <style jsx>{`
        :root{
          --bg:#0f1724;
          --card:#071028;
          --card-border:#1f2937;
          --muted:#94a3b8;
          --accent-green:#10b981;
          --accent-yellow:#f59e0b;
          --accent-blue:#3b82f6;
          --accent-purple:#8b5cf6;
          --accent-pink:#ec4899;
        }
        .dashboard-root{
          min-height:100vh;
          background:var(--bg);
          color:#e6eef6;
          padding:24px;
          font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        .container{ max-width:1400px; margin:0 auto; display:flex; flex-direction:column; gap:20px; }

        /* Ticker */
        .ticker{ background:var(--card); border:1px solid var(--card-border); border-radius:12px; padding:8px; display:flex; align-items:center; gap:8px; overflow:hidden; }
        .ticker-btn{ background:transparent; border:none; color:inherit; padding:6px; border-radius:8px; cursor:pointer; }
        .ticker-scroll{ display:flex; gap:20px; overflow-x:auto; padding:6px 4px; scrollbar-width:none; -ms-overflow-style:none; }
        .ticker-scroll::-webkit-scrollbar{ display:none; }
        .ticker-item{ display:flex; gap:8px; align-items:center; padding:6px 8px; border-radius:8px; }
        .t-label{ font-size:12px; color:var(--muted); min-width:70px; }
        .t-price{ font-weight:700; color:#fff; min-width:70px; }
        .t-change{ font-size:12px; padding:4px 8px; border-radius:999px; font-weight:600; }
        .t-change.up{ background:rgba(16,185,129,0.08); color:#34d399; }
        .t-change.down{ background:rgba(239,68,68,0.08); color:#fb7185; }

        /* Header */
        .header-row{ display:flex; justify-content:space-between; gap:16px; align-items:center; flex-wrap:wrap; }
        .greeting h2{ margin:0; font-size:22px; color:#fff; }
        .greeting p{ margin:4px 0 0; color:var(--muted); font-size:13px; }

        .accounts-row{ display:flex; gap:12px; align-items:center; }
        .account-pill{ background:var(--card); border:1px solid var(--card-border); padding:12px 14px; border-radius:12px; display:flex; flex-direction:column; gap:8px; min-width:160px; }
        .acc-name{ font-weight:700; color:#fff; }
        .acc-tag{ font-size:12px; padding:6px 8px; border-radius:999px; font-weight:700; display:inline-block; }
        .acc-tag.live{ background:rgba(63,203,27,0.08); color:#34d399; }
        .acc-tag.demo{ background:rgba(59,130,246,0.08); color:#60a5fa; }
        .btn-new{ display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#34d399,#16a34a); color:#071028; padding:10px 12px; border-radius:10px; border:none; font-weight:700; cursor:pointer; }

        /* Grid 3 */
        .grid-3{ display:grid; grid-template-columns: 1fr 360px; gap:20px; align-items:start; }
        .portfolio-card{ background:var(--card); border:1px solid var(--card-border); border-radius:12px; padding:18px; }
        .portfolio-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .muted{ color:var(--muted); font-size:13px; }
        .big{ font-size:28px; font-weight:800; color:#fff; margin-top:6px; }
        .gain{ color:#34d399; margin-top:6px; font-weight:700; }

        .portfolio-actions{ display:flex; gap:8px; }
        .action-btn{ background:#0b1220; border:1px solid var(--card-border); color:var(--muted); padding:8px 10px; border-radius:8px; display:inline-flex; gap:8px; align-items:center; cursor:pointer; }

        .balance-section{ margin-top:16px; }
        .balance-meta{ display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
        .meta-title{ font-weight:700; color:#fff; }
        .meta-badges{ display:flex; gap:8px; align-items:center; }
        .badge{ font-size:12px; padding:6px 8px; border-radius:8px; }
        .badge.green{ background:rgba(16,185,129,0.08); color:#34d399; }
        .badge.slate{ background:rgba(148,163,184,0.06); color:var(--muted); }
        .badge.red{ background:rgba(239,68,68,0.06); color:#fb7185; }

        .chart-wrap{ margin-top:12px; background:linear-gradient(180deg,#071028,#06101a); border-radius:10px; padding:12px; border:1px solid #0f1724; height:160px; display:flex; align-items:center; }
        .sparkline{ width:100%; height:100%; }

        /* Donut card */
        .donut-card{ background:var(--card); border:1px solid var(--card-border); border-radius:12px; padding:18px; display:flex; flex-direction:column; gap:12px; }
        .donut-top{ display:flex; justify-content:space-between; align-items:center; }
        .donut-body{ display:flex; gap:12px; align-items:center; }
        .donut{ width:144px; height:144px; border-radius:999px; background: conic-gradient(#10b981 0% 45%, #f59e0b 45% 65%, #3b82f6 65% 80%, #8b5cf6 80% 92%, #ec4899 92% 100%); box-shadow: inset 0 2px 6px rgba(0,0,0,0.4); }
        .legend{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
        .legend li{ display:flex; align-items:center; gap:8px; }
        .swatch{ width:12px; height:12px; display:inline-block; border-radius:3px; }
        .swatch.forex{ background:#10b981; }
        .swatch.comm{ background:#f59e0b; }
        .swatch.idx{ background:#3b82f6; }
        .swatch.crypto{ background:#8b5cf6; }
        .swatch.stocks{ background:#ec4899; }
        .legend-label{ color:var(--muted); }
        .legend-value{ margin-left:auto; color:#fff; font-weight:700; }

        .margin-level{ margin-top:8px; }
        .progress{ background:#071028; border:1px solid #0f1724; height:10px; border-radius:999px; overflow:hidden; margin-top:8px; }
        .progress-fill{ height:100%; background:linear-gradient(90deg,#34d399,#059669); border-radius:999px; }

        /* Metrics grid */
        .metrics-grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; margin-top:6px; }
        .metric-card{ background:var(--card); border:1px solid var(--card-border); border-radius:12px; padding:14px; }
        .metric-value{ font-size:18px; font-weight:800; color:#fff; margin-top:8px; }
        .metric-sub.pos{ color:#34d399; margin-top:6px; }
        .metric-sub.neg{ color:#fb7185; margin-top:6px; }

        /* Actions */
        .actions-row{ display:flex; gap:12px; margin-top:12px; }
        .btn-deposit{ background:linear-gradient(135deg,#34d399,#16a34a); color:#071028; padding:10px 14px; border-radius:10px; border:none; font-weight:800; display:inline-flex; gap:8px; align-items:center; cursor:pointer; }
        .btn-outline{ background:#0b1220; border:1px solid var(--card-border); color:var(--muted); padding:10px 14px; border-radius:10px; cursor:pointer; }

        /* Positions */
        .positions-card{ background:var(--card); border:1px solid var(--card-border); border-radius:12px; padding:18px; margin-top:8px; }
        .positions-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .positions-controls{ display:flex; gap:8px; align-items:center; }
        .active-pill{ background:#0b1220; padding:6px 10px; border-radius:8px; color:var(--muted); }
        .manage-btn{ background:#0b1220; border:1px solid var(--card-border); padding:6px 10px; border-radius:8px; color:var(--muted); cursor:pointer; }

        .table-wrap{ overflow-x:auto; }
        .positions-table{ width:100%; border-collapse:collapse; min-width:900px; }
        .positions-table thead th{ text-align:left; color:var(--muted); padding:10px 8px; font-size:13px; }
        .positions-table tbody tr{ border-top:1px solid #0f1724; }
        .positions-table td{ padding:12px 8px; vertical-align:middle; color:#fff; }
        .type-pill{ display:inline-flex; align-items:center; gap:6px; padding:6px 8px; border-radius:8px; font-weight:700; font-size:13px; }
        .type-pill.buy{ background:rgba(16,185,129,0.06); color:#34d399; }
        .type-pill.sell{ background:rgba(239,68,68,0.06); color:#fb7185; }
        .pnl-pos{ color:#34d399; font-weight:800; }
        .pnl-neg{ color:#fb7185; font-weight:800; }

        /* Responsive */
        @media (max-width: 1100px){
          .grid-3{ grid-template-columns: 1fr; }
          .metrics-grid{ grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px){
          .metrics-grid{ grid-template-columns: 1fr; }
          .accounts-row{ flex-direction:column; align-items:flex-start; gap:8px; }
        }
      `}</style>
    </div>
  )
}
