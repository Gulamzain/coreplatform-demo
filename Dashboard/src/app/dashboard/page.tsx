// src/app/dashboard/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BiDollar, BiTrendingUp, BiTrendingDown, BiArrowToRight,
  BiArrowFromLeft, BiWallet, BiLineChart, BiPieChart,
  BiRefresh, BiBell, BiCalendar, BiDownload, BiX, BiCheck,
  BiTransfer, BiShield, BiTime
} from 'react-icons/bi';
import {
  FiArrowUpRight, FiArrowDownRight, FiZap, FiActivity,
  FiCreditCard, FiRepeat, FiChevronRight, FiTrendingUp
} from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ArcElement, Filler);

// ── DATA ────────────────────────────────────────────────────────────────
const accounts = [
  { id: 1, name: 'MT5 #155691', type: 'Standard', status: 'Live', balance: 25340.50, equity: 26780.30, profit: 1439.80, profitPercent: 5.68, margin: 1439.80, freeMargin: 25340.50, marginLevel: 1861.02 },
  { id: 2, name: 'MT5 #155692', type: 'Raw Spread', status: 'Demo', balance: 10000.00, equity: 10890.20, profit: 890.20, profitPercent: 8.90, margin: 890.20, freeMargin: 10000.00, marginLevel: 1223.35 },
];

const recentTrades = [
  { id: 1, symbol: 'EUR/USD', type: 'Buy',  volume: 0.5,  price: 1.08432, current: 1.08945, profit: 256.50,  time: '10:32', flag: '🇪🇺' },
  { id: 2, symbol: 'GBP/USD', type: 'Sell', volume: 0.3,  price: 1.27680, current: 1.27420, profit: 78.00,   time: '10:28', flag: '🇬🇧' },
  { id: 3, symbol: 'XAU/USD', type: 'Buy',  volume: 0.1,  price: 2341.20, current: 2356.80, profit: 156.00,  time: '10:15', flag: '🥇' },
  { id: 4, symbol: 'BTC/USD', type: 'Buy',  volume: 0.05, price: 68200,   current: 69150,   profit: 47.50,   time: '09:58', flag: '₿' },
];

const marketTicker = [
  { symbol: 'EUR/USD', price: '1.08945', change: '+0.47%', up: true },
  { symbol: 'GBP/USD', price: '1.27420', change: '-0.21%', up: false },
  { symbol: 'XAU/USD', price: '2356.80', change: '+0.67%', up: true },
  { symbol: 'BTC/USD', price: '69,150',  change: '+1.39%', up: true },
  { symbol: 'USD/JPY', price: '154.32',  change: '+0.12%', up: true },
  { symbol: 'OIL/USD', price: '78.45',   change: '-0.88%', up: false },
];

const balanceHistoryData = {
  labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
  datasets: [{
    label: 'Balance',
    data: [12500, 14200, 13800, 15600, 16800, 18500, 19200, 20500],
    borderColor: '#3fcb1b',
    backgroundColor: (ctx: any) => {
      const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260);
      g.addColorStop(0, 'rgba(63,203,27,0.18)');
      g.addColorStop(1, 'rgba(63,203,27,0)');
      return g;
    },
    fill: true, tension: 0.45,
    pointBackgroundColor: '#3fcb1b',
    pointBorderColor: '#0c0f0a',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 7,
    borderWidth: 2.5,
  }],
};

const allocationData = {
  labels: ['Forex', 'Commodities', 'Indices', 'Crypto', 'Stocks'],
  datasets: [{
    data: [45, 20, 15, 12, 8],
    backgroundColor: ['#3fcb1b', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec489a'],
    hoverBackgroundColor: ['#4de022', '#fbbf24', '#60a5fa', '#a78bfa', '#f472b6'],
    borderWidth: 0,
    hoverOffset: 6,
  }],
};

// ── COMPONENT ────────────────────────────────────────────────────────────
export default function DashboardOverview() {
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [showDeposit, setShowDeposit]   = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount]             = useState('');
  const [activePeriod, setActivePeriod] = useState('1M');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [tickerX, setTickerX] = useState(0);
  const [counters, setCounters] = useState({ balance: 0, equity: 0, profit: 0 });
  const [mounted, setMounted] = useState(false);
  const tickerRef = useRef<number>(0);
  const animRef   = useRef<number>(0);

  const currentAccount = accounts[selectedAccount];
  const totalBalance   = accounts.reduce((s, a) => s + a.balance, 0);
  const totalProfit    = accounts.reduce((s, a) => s + a.profit, 0);

  // Mount animation
  useEffect(() => {
    setMounted(true);
    const targets = { balance: currentAccount.balance, equity: currentAccount.equity, profit: currentAccount.profit };
    let start: number | null = null;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounters({
        balance: targets.balance * ease,
        equity:  targets.equity  * ease,
        profit:  targets.profit  * ease,
      });
      if (p < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [selectedAccount]);

  // Ticker scroll
  useEffect(() => {
    const speed = 0.4;
    const scroll = () => {
      setTickerX(x => {
        const next = x - speed;
        return next < -900 ? 0 : next;
      });
      tickerRef.current = requestAnimationFrame(scroll);
    };
    tickerRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(tickerRef.current);
  }, []);

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(12,15,10,0.95)',
        titleColor: '#edf0ea', bodyColor: '#9aad94',
        borderColor: 'rgba(63,203,27,0.4)', borderWidth: 1,
        padding: 10, cornerRadius: 10,
        callbacks: { label: (ctx: any) => ' $' + ctx.raw.toLocaleString() },
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(237,240,234,0.05)', drawBorder: false },
        ticks: { color: '#556050', font: { size: 10 }, callback: (v: any) => '$' + (v/1000).toFixed(0) + 'k' },
        border: { display: false },
      },
      x: {
        grid: { display: false }, border: { display: false },
        ticks: { color: '#556050', font: { size: 10 } },
      },
    },
    interaction: { mode: 'index', intersect: false },
  };

  const doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#556050', usePointStyle: true, boxWidth: 7, font: { size: 10 }, padding: 14 },
      },
      tooltip: {
        backgroundColor: 'rgba(12,15,10,0.95)',
        titleColor: '#edf0ea', bodyColor: '#9aad94',
        borderColor: 'rgba(63,203,27,0.3)', borderWidth: 1,
        padding: 10, cornerRadius: 10,
      },
    },
  };

  const allocationColors = ['#3fcb1b','#f59e0b','#3b82f6','#8b5cf6','#ec489a'];

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={`dov ${mounted ? 'mounted' : ''}`}>

      {/* ── MARKET TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-label"><FiActivity size={11} />LIVE</div>
        <div className="ticker-track">
          <div className="ticker-inner" style={{ transform: `translateX(${tickerX}px)` }}>
            {[...marketTicker, ...marketTicker, ...marketTicker].map((m, i) => (
              <div key={i} className="ticker-item">
                <span className="ticker-sym">{m.symbol}</span>
                <span className="ticker-price">{m.price}</span>
                <span className={`ticker-chg ${m.up ? 'up' : 'dn'}`}>{m.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WELCOME BANNER ── */}
      <div className="welcome">
        <div className="welcome__canvas">
          <div className="welcome__orb" />
          <svg className="welcome__grid" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="wg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(63,203,27,0.05)" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#wg)" />
          </svg>
        </div>
        <div className="welcome__left">
          <div className="welcome__greeting">
            <span className="welcome__dot" />
            Good Morning
          </div>
          <h2 className="welcome__name">Gulam Zain 👋</h2>
          <p className="welcome__sub">Here's your trading overview for today</p>
        </div>
        <div className="welcome__right">
          <div className="welcome__kpi">
            <div className="welcome__kpi-icon"><BiWallet size={18} /></div>
            <div>
              <span className="welcome__kpi-lbl">Total Portfolio</span>
              <strong className="welcome__kpi-val">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>
          <div className="welcome__divider" />
          <div className="welcome__kpi">
            <div className="welcome__kpi-icon green"><FiTrendingUp size={18} /></div>
            <div>
              <span className="welcome__kpi-lbl">Total P&L</span>
              <strong className="welcome__kpi-val profit">+${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACCOUNT TABS ── */}
      <div className="acc-tabs">
        {accounts.map((acc, i) => (
          <button
            key={acc.id}
            onClick={() => setSelectedAccount(i)}
            className={`acc-tab ${selectedAccount === i ? 'active' : ''}`}
          >
            <span className={`acc-tab__dot ${acc.status === 'Live' ? 'live' : 'demo'}`} />
            <span className="acc-tab__name">{acc.name}</span>
            <span className={`acc-tab__badge ${acc.status === 'Live' ? 'live' : 'demo'}`}>{acc.status}</span>
          </button>
        ))}
      </div>

      {/* ── KPI CARDS ROW ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAccount}
          className="kpi-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Balance */}
          <div className="kpi-card kpi-card--green">
            <div className="kpi-card__top">
              <div className="kpi-card__icon green"><BiDollar size={20} /></div>
              <span className="kpi-card__lbl">Account Balance</span>
            </div>
            <strong className="kpi-card__val">${fmt(counters.balance)}</strong>
            <div className="kpi-card__footer">
              <span className="kpi-badge up"><FiArrowUpRight size={11} />+${fmt(currentAccount.profit)} ({currentAccount.profitPercent}%)</span>
            </div>
            <div className="kpi-card__bar"><div className="kpi-card__bar-fill" style={{ width: '72%' }} /></div>
          </div>

          {/* Equity */}
          <div className="kpi-card kpi-card--blue">
            <div className="kpi-card__top">
              <div className="kpi-card__icon blue"><BiLineChart size={20} /></div>
              <span className="kpi-card__lbl">Total Equity</span>
            </div>
            <strong className="kpi-card__val">${fmt(counters.equity)}</strong>
            <div className="kpi-card__footer">
              <span className="kpi-card__sub">Floating P&L: <em className="profit">+${fmt(currentAccount.profit)}</em></span>
            </div>
            <div className="kpi-card__bar"><div className="kpi-card__bar-fill blue" style={{ width: '88%' }} /></div>
          </div>

          {/* Margin */}
          <div className="kpi-card kpi-card--amber">
            <div className="kpi-card__top">
              <div className="kpi-card__icon amber"><FiZap size={18} /></div>
              <span className="kpi-card__lbl">Free Margin</span>
            </div>
            <strong className="kpi-card__val">${fmt(currentAccount.freeMargin)}</strong>
            <div className="kpi-card__footer">
              <span className="kpi-card__sub">Margin Used: <em>${fmt(currentAccount.margin)}</em></span>
            </div>
            <div className="kpi-card__bar"><div className="kpi-card__bar-fill amber" style={{ width: '55%' }} /></div>
          </div>

          {/* Margin Level */}
          <div className="kpi-card kpi-card--purple">
            <div className="kpi-card__top">
              <div className="kpi-card__icon purple"><BiShield size={20} /></div>
              <span className="kpi-card__lbl">Margin Level</span>
            </div>
            <strong className="kpi-card__val">{currentAccount.marginLevel.toFixed(2)}%</strong>
            <div className="kpi-card__footer">
              <span className="kpi-badge safe"><BiCheck size={11} />Safe Level</span>
            </div>
            <div className="kpi-card__bar"><div className="kpi-card__bar-fill purple" style={{ width: '93%' }} /></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── ACTION BUTTONS ── */}
      <div className="actions">
        <button className="act-btn act-btn--deposit" onClick={() => { setShowDeposit(true); setAmount(''); setSelectedMethod(''); }}>
          <div className="act-btn__icon"><BiArrowFromLeft size={18} /></div>
          <div className="act-btn__text">
            <strong>Deposit</strong>
            <span>Add funds</span>
          </div>
          <FiChevronRight size={16} className="act-btn__arrow" />
        </button>
        <button className="act-btn act-btn--withdraw" onClick={() => { setShowWithdraw(true); setAmount(''); setSelectedMethod(''); }}>
          <div className="act-btn__icon"><BiArrowToRight size={18} /></div>
          <div className="act-btn__text">
            <strong>Withdraw</strong>
            <span>Cash out</span>
          </div>
          <FiChevronRight size={16} className="act-btn__arrow" />
        </button>
        <button className="act-btn act-btn--transfer">
          <div className="act-btn__icon"><BiTransfer size={18} /></div>
          <div className="act-btn__text">
            <strong>Transfer</strong>
            <span>Between accounts</span>
          </div>
          <FiChevronRight size={16} className="act-btn__arrow" />
        </button>
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="charts-row">
        {/* Line Chart */}
        <div className="chart-card">
          <div className="chart-card__head">
            <div>
              <h3 className="chart-card__title">Balance History</h3>
              <p className="chart-card__sub">Portfolio performance over time</p>
            </div>
            <div className="periods">
              {['1W','1M','3M','1Y'].map(p => (
                <button
                  key={p}
                  className={`period-btn ${activePeriod === p ? 'active' : ''}`}
                  onClick={() => setActivePeriod(p)}
                >{p}</button>
              ))}
            </div>
          </div>
          {/* Inline stat */}
          <div className="chart-card__stat-row">
            <div className="chart-mini-stat">
              <span>Peak</span><strong>$20,500</strong>
            </div>
            <div className="chart-mini-stat">
              <span>Growth</span><strong className="profit">+64%</strong>
            </div>
            <div className="chart-mini-stat">
              <span>Drawdown</span><strong className="loss">-2.8%</strong>
            </div>
          </div>
          <div className="chart-card__body">
            <Line data={balanceHistoryData} options={chartOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="chart-card chart-card--sm">
          <div className="chart-card__head">
            <div>
              <h3 className="chart-card__title">Asset Allocation</h3>
              <p className="chart-card__sub">Portfolio diversification</p>
            </div>
          </div>
          <div className="chart-card__donut-wrap">
            <div className="chart-card__donut-center">
              <span>Total</span>
              <strong>100%</strong>
            </div>
            <Doughnut data={allocationData} options={doughnutOptions} />
          </div>
          {/* Manual legend */}
          <div className="allocation-list">
            {['Forex','Commodities','Indices','Crypto','Stocks'].map((l, i) => (
              <div key={l} className="alloc-row">
                <div className="alloc-dot" style={{ background: allocationColors[i] }} />
                <span className="alloc-label">{l}</span>
                <div className="alloc-bar-track">
                  <div className="alloc-bar-fill" style={{ width: `${[45,20,15,12,8][i]}%`, background: allocationColors[i] }} />
                </div>
                <span className="alloc-pct">{[45,20,15,12,8][i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENT TRADES ── */}
      <div className="trades-card">
        <div className="trades-card__head">
          <div>
            <h3 className="trades-card__title">Open Positions</h3>
            <p className="trades-card__sub">{recentTrades.length} active trades</p>
          </div>
          <button className="view-all-btn">View All <FiChevronRight size={14} /></button>
        </div>

        {/* Mobile cards view */}
        <div className="trades-cards-mobile">
          {recentTrades.map(t => (
            <div key={t.id} className="trade-mob-card">
              <div className="trade-mob-card__left">
                <div className="trade-mob-card__flag">{t.flag}</div>
                <div>
                  <strong className="trade-mob-card__sym">{t.symbol}</strong>
                  <span className={`trade-mob-card__badge ${t.type === 'Buy' ? 'buy' : 'sell'}`}>{t.type}</span>
                </div>
              </div>
              <div className="trade-mob-card__mid">
                <span className="trade-mob-card__lbl">Vol</span>
                <span className="trade-mob-card__val">{t.volume}</span>
              </div>
              <div className="trade-mob-card__mid">
                <span className="trade-mob-card__lbl">Price</span>
                <span className="trade-mob-card__val">{t.price}</span>
              </div>
              <div className="trade-mob-card__right">
                <span className={`trade-mob-card__pnl ${t.profit >= 0 ? 'profit' : 'loss'}`}>
                  {t.profit >= 0 ? '+' : ''}${t.profit.toFixed(2)}
                </span>
                <span className="trade-mob-card__time">{t.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="trades-table-wrap">
          <table className="trades-table">
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
              {recentTrades.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="trade-row"
                >
                  <td>
                    <div className="trade-sym-cell">
                      <span className="trade-flag">{t.flag}</span>
                      <span className="trade-sym">{t.symbol}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`t-badge ${t.type === 'Buy' ? 'buy' : 'sell'}`}>{t.type}</span>
                  </td>
                  <td className="t-num">{t.volume}</td>
                  <td className="t-num">{t.price}</td>
                  <td className="t-num">{t.current}</td>
                  <td className={`t-pnl ${t.profit >= 0 ? 'profit' : 'loss'}`}>
                    {t.profit >= 0 ? '+' : ''}${t.profit.toFixed(2)}
                  </td>
                  <td className="t-time">
                    <BiTime size={11} style={{ marginRight: 4 }} />{t.time}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DEPOSIT MODAL ── */}
      <AnimatePresence>
        {showDeposit && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowDeposit(false)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal__glow" />
              <div className="modal__head">
                <div className="modal__icon deposit"><BiArrowFromLeft size={20} /></div>
                <div>
                  <h3 className="modal__title">Deposit Funds</h3>
                  <p className="modal__sub">Instant deposits, no fees</p>
                </div>
                <button className="modal__close" onClick={() => setShowDeposit(false)}><BiX size={20} /></button>
              </div>
              <p className="modal__section-label">Select Payment Method</p>
              <div className="modal__methods">
                {[
                  { id: 'card', label: 'Credit Card', icon: '💳' },
                  { id: 'bank', label: 'Bank Wire',   icon: '🏦' },
                  { id: 'crypto', label: 'Crypto',    icon: '₿' },
                  { id: 'skrill', label: 'Skrill',    icon: '⚡' },
                ].map(m => (
                  <button
                    key={m.id}
                    className={`modal__method ${selectedMethod === m.id ? 'active' : ''}`}
                    onClick={() => setSelectedMethod(m.id)}
                  >
                    <span className="modal__method-icon">{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
              <p className="modal__section-label">Amount</p>
              <div className="modal__input-wrap">
                <span className="modal__input-prefix">$</span>
                <input
                  type="number" placeholder="0.00"
                  className="modal__input" value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <div className="modal__quick-amounts">
                {['100','500','1000','5000'].map(v => (
                  <button key={v} className="modal__quick" onClick={() => setAmount(v)}>${v}</button>
                ))}
              </div>
              <div className="modal__footer">
                <button className="modal__cancel" onClick={() => setShowDeposit(false)}>Cancel</button>
                <button className="modal__confirm">
                  <BiCheck size={16} /> Confirm Deposit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WITHDRAW MODAL ── */}
      <AnimatePresence>
        {showWithdraw && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowWithdraw(false)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal__glow modal__glow--red" />
              <div className="modal__head">
                <div className="modal__icon withdraw"><BiArrowToRight size={20} /></div>
                <div>
                  <h3 className="modal__title">Withdraw Funds</h3>
                  <p className="modal__sub">Available: ${fmt(currentAccount.balance)}</p>
                </div>
                <button className="modal__close" onClick={() => setShowWithdraw(false)}><BiX size={20} /></button>
              </div>
              <p className="modal__section-label">Select Withdrawal Method</p>
              <div className="modal__methods">
                {[
                  { id: 'bank',    label: 'Bank Wire', icon: '🏦' },
                  { id: 'crypto',  label: 'Crypto',    icon: '₿' },
                  { id: 'skrill',  label: 'Skrill',    icon: '⚡' },
                  { id: 'neteller', label: 'Neteller', icon: '🔵' },
                ].map(m => (
                  <button
                    key={m.id}
                    className={`modal__method ${selectedMethod === m.id ? 'active' : ''}`}
                    onClick={() => setSelectedMethod(m.id)}
                  >
                    <span className="modal__method-icon">{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
              <p className="modal__section-label">Amount</p>
              <div className="modal__input-wrap">
                <span className="modal__input-prefix">$</span>
                <input
                  type="number" placeholder="0.00"
                  className="modal__input" value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <div className="modal__quick-amounts">
                {['100','500','1000','5000'].map(v => (
                  <button key={v} className="modal__quick" onClick={() => setAmount(v)}>${v}</button>
                ))}
              </div>
              <div className="modal__footer">
                <button className="modal__cancel" onClick={() => setShowWithdraw(false)}>Cancel</button>
                <button className="modal__confirm modal__confirm--red">
                  <BiCheck size={16} /> Confirm Withdrawal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          RESPONSIVE STYLES - MOBILE OPTIMIZED
      ══════════════════════════════════════════ */}
      <style jsx>{`
        /* ── TOKENS & RESET ── */
        .dov {
          --g:        #3fcb1b;
          --g-dk:     #2e9c14;
          --g-faint:  rgba(63,203,27,0.08);
          --g-border: rgba(63,203,27,0.22);
          --blue:     #3b82f6;
          --amber:    #f59e0b;
          --purple:   #8b5cf6;
          --red:      #ef4444;
          --profit:   #10b981;
          --bg:       var(--bg-primary, #0c0f0a);
          --bg2:      var(--bg-secondary, #141914);
          --bg3:      var(--bg-card, #1a201a);
          --border:   var(--border-color, rgba(255,255,255,0.08));
          --text:     var(--text-primary, #edf0ea);
          --text2:    var(--text-secondary, #556050);
          --ease:     cubic-bezier(0.16,1,0.3,1);
          --r:        16px;
          font-family: 'Sora', 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .5s var(--ease), transform .5s var(--ease);
        }
        
        /* Mobile padding adjustment */
        @media (max-width: 640px) {
          .dov {
            padding: 12px;
          }
        }
        
        .dov.mounted { opacity: 1; transform: translateY(0); }

        /* ── TICKER (Fully responsive) ── */
        .ticker-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
          height: 38px;
        }
        
        @media (max-width: 640px) {
          .ticker-wrap {
            height: 34px;
            margin-bottom: 16px;
          }
        }
        
        .ticker-label {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 12px;
          background: var(--g);
          color: #000;
          font-size: .62rem;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          height: 100%;
          flex-shrink: 0;
          white-space: nowrap;
        }
        
        @media (max-width: 480px) {
          .ticker-label {
            padding: 0 8px;
            font-size: 0.55rem;
          }
          .ticker-label svg {
            width: 9px;
            height: 9px;
          }
        }
        
        .ticker-track { flex: 1; overflow: hidden; height: 100%; }
        .ticker-inner {
          display: flex;
          align-items: center;
          height: 100%;
          will-change: transform;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 16px;
          white-space: nowrap;
          border-right: 1px solid var(--border);
          height: 100%;
        }
        
        @media (max-width: 640px) {
          .ticker-item {
            padding: 0 10px;
            gap: 5px;
          }
          .ticker-sym {
            font-size: 0.65rem;
          }
          .ticker-price {
            font-size: 0.65rem;
          }
          .ticker-chg {
            font-size: 0.6rem;
          }
        }
        
        .ticker-sym  { font-size: .72rem; font-weight: 700; color: var(--text); }
        .ticker-price{ font-size: .72rem; color: var(--text2); }
        .ticker-chg  { font-size: .68rem; font-weight: 700; }
        .ticker-chg.up { color: var(--g); }
        .ticker-chg.dn { color: var(--red); }

        /* ── WELCOME (Mobile optimized) ── */
        .welcome {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(63,203,27,0.08) 0%, rgba(63,203,27,0.03) 50%, transparent 100%);
          border: 1px solid var(--g-border);
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .welcome {
            padding: 16px 18px;
            flex-direction: column;
            align-items: flex-start;
          }
        }
        
        @media (max-width: 640px) {
          .welcome {
            padding: 14px 16px;
            margin-bottom: 16px;
          }
        }
        
        .welcome__canvas { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .welcome__orb {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(63,203,27,0.12), transparent);
          border-radius: 50%;
          filter: blur(60px);
          top: -100px;
          right: -50px;
          animation: welcomeOrb 8s ease-in-out infinite;
        }
        
        @keyframes welcomeOrb { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-15px,10px);} }
        .welcome__grid { position: absolute; inset: 0; width: 100%; height: 100%; }

        .welcome__left { position: relative; z-index: 1; }
        
        @media (max-width: 768px) {
          .welcome__left {
            width: 100%;
          }
        }
        
        .welcome__greeting {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: .68rem;
          font-weight: 700;
          color: var(--g);
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .welcome__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--g);
          animation: wDotPulse 2s ease-in-out infinite;
        }
        
        @keyframes wDotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(63,203,27,.5);} 50%{box-shadow:0 0 0 5px rgba(63,203,27,0);} }
        
        .welcome__name {
          font-size: clamp(1.1rem, 4vw, 1.6rem);
          font-weight: 900;
          color: var(--text);
          letter-spacing: -.03em;
          margin: 0 0 4px;
        }
        
        .welcome__sub {
          font-size: .78rem;
          color: var(--text2);
          margin: 0;
        }
        
        @media (max-width: 640px) {
          .welcome__sub {
            font-size: 0.7rem;
          }
        }

        .welcome__right {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 18px;
          backdrop-filter: blur(10px);
        }
        
        @media (max-width: 768px) {
          .welcome__right {
            width: 100%;
            justify-content: space-between;
            padding: 10px 16px;
          }
        }
        
        @media (max-width: 480px) {
          .welcome__right {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
          .welcome__divider {
            display: none;
          }
          .welcome__kpi {
            justify-content: space-between;
          }
        }
        
        .welcome__kpi { display: flex; align-items: center; gap: 12px; }
        
        @media (max-width: 480px) {
          .welcome__kpi {
            width: 100%;
          }
        }
        
        .welcome__kpi-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          color: var(--text2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .welcome__kpi-icon.green { background: var(--g-faint); border-color: var(--g-border); color: var(--g); }
        .welcome__kpi-lbl { font-size: .66rem; color: var(--text2); display: block; margin-bottom: 3px; }
        .welcome__kpi-val { font-size: 1rem; font-weight: 800; color: var(--text); display: block; letter-spacing: -.02em; }
        .welcome__kpi-val.profit { color: var(--profit); }
        .welcome__divider { width: 1px; height: 36px; background: var(--border); }

        /* ── ACCOUNT TABS (Scrollable on mobile) ── */
        .acc-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        @media (max-width: 640px) {
          .acc-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 8px;
            margin-bottom: 16px;
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
          }
          .acc-tabs::-webkit-scrollbar {
            height: 3px;
          }
          .acc-tab {
            flex-shrink: 0;
          }
        }
        
        .acc-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 30px;
          color: var(--text2);
          cursor: pointer;
          font-size: .82rem;
          transition: all .25s var(--ease);
          white-space: nowrap;
        }
        
        @media (max-width: 640px) {
          .acc-tab {
            padding: 6px 12px;
            font-size: 0.75rem;
          }
        }
        
        .acc-tab.active { background: var(--g-faint); border-color: var(--g-border); color: var(--text); }
        .acc-tab__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .acc-tab__dot.live { background: var(--g); box-shadow: 0 0 0 3px rgba(63,203,27,.2); animation: wDotPulse 2s ease-in-out infinite; }
        .acc-tab__dot.demo { background: var(--blue); }
        .acc-tab__name { font-weight: 600; }
        .acc-tab__badge {
          font-size: .6rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .acc-tab__badge.live { background: rgba(63,203,27,.15); color: var(--g); }
        .acc-tab__badge.demo { background: rgba(59,130,246,.15); color: var(--blue); }

        /* ── KPI CARDS (Grid responsive) ── */
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        
        @media (max-width: 1100px) {
          .kpi-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .kpi-row {
            gap: 12px;
            margin-bottom: 16px;
          }
        }
        
        @media (max-width: 520px) {
          .kpi-row {
            grid-template-columns: 1fr;
          }
        }

        .kpi-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px 16px;
          position: relative;
          overflow: hidden;
          transition: transform .3s var(--ease), box-shadow .3s, border-color .3s;
        }
        
        @media (max-width: 640px) {
          .kpi-card {
            padding: 14px 16px;
          }
        }
        
        .kpi-card:hover { transform: translateY(-4px); }
        .kpi-card--green:hover { border-color: var(--g-border); box-shadow: 0 8px 28px rgba(63,203,27,.12); }
        .kpi-card--blue:hover  { border-color: rgba(59,130,246,.3); box-shadow: 0 8px 28px rgba(59,130,246,.1); }
        .kpi-card--amber:hover { border-color: rgba(245,158,11,.3); box-shadow: 0 8px 28px rgba(245,158,11,.1); }
        .kpi-card--purple:hover{ border-color: rgba(139,92,246,.3); box-shadow: 0 8px 28px rgba(139,92,246,.1); }

        .kpi-card__top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .kpi-card__icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .kpi-card__icon.green  { background: var(--g-faint); color: var(--g); border: 1px solid var(--g-border); }
        .kpi-card__icon.blue   { background: rgba(59,130,246,.1); color: var(--blue); border: 1px solid rgba(59,130,246,.2); }
        .kpi-card__icon.amber  { background: rgba(245,158,11,.1); color: var(--amber); border: 1px solid rgba(245,158,11,.2); }
        .kpi-card__icon.purple { background: rgba(139,92,246,.1); color: var(--purple); border: 1px solid rgba(139,92,246,.2); }
        .kpi-card__lbl { font-size: .65rem; color: var(--text2); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }

        .kpi-card__val {
          font-size: clamp(1.2rem, 3vw, 1.7rem);
          font-weight: 900;
          color: var(--text);
          letter-spacing: -.04em;
          display: block;
          margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }
        
        .kpi-card__footer { margin-bottom: 12px; }
        .kpi-card__sub { font-size: .7rem; color: var(--text2); }
        .kpi-card__sub em { font-style: normal; }

        .kpi-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: .65rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
        }
        
        .kpi-badge.up   { background: rgba(16,185,129,.12); color: var(--profit); }
        .kpi-badge.safe { background: rgba(63,203,27,.1); color: var(--g); }

        .kpi-card__bar { height: 3px; background: var(--border); border-radius: 100px; overflow: hidden; }
        .kpi-card__bar-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, var(--g), #7de84a);
          transition: width 1.2s var(--ease);
        }
        .kpi-card__bar-fill.blue   { background: linear-gradient(90deg, var(--blue), #93c5fd); }
        .kpi-card__bar-fill.amber  { background: linear-gradient(90deg, var(--amber), #fcd34d); }
        .kpi-card__bar-fill.purple { background: linear-gradient(90deg, var(--purple), #c4b5fd); }

        /* ── ACTION BUTTONS (Stack on mobile) ── */
        .actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .actions {
            gap: 12px;
          }
        }
        
        @media (max-width: 640px) {
          .actions {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-bottom: 16px;
          }
        }

        .act-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 15px;
          cursor: pointer;
          border: none;
          transition: all .3s var(--ease);
          text-align: left;
        }
        
        @media (max-width: 640px) {
          .act-btn {
            padding: 10px 14px;
          }
        }
        
        .act-btn__icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .act-btn__text { flex: 1; }
        .act-btn__text strong { display: block; font-size: .85rem; font-weight: 800; margin-bottom: 2px; }
        .act-btn__text span   { display: block; font-size: .68rem; opacity: .65; }
        .act-btn__arrow { opacity: .4; transition: all .3s; flex-shrink: 0; }
        .act-btn:hover .act-btn__arrow { opacity: 1; transform: translateX(3px); }

        .act-btn--deposit {
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          color: #000;
        }
        .act-btn--deposit .act-btn__icon { background: rgba(0,0,0,.15); color: #000; }
        .act-btn--deposit:hover { box-shadow: 0 10px 28px rgba(63,203,27,.35); transform: translateY(-3px); }

        .act-btn--withdraw {
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--text);
        }
        .act-btn--withdraw .act-btn__icon { background: rgba(239,68,68,.1); color: var(--red); border: 1px solid rgba(239,68,68,.2); }
        .act-btn--withdraw:hover { border-color: rgba(239,68,68,.3); box-shadow: 0 8px 24px rgba(239,68,68,.08); transform: translateY(-2px); }

        .act-btn--transfer {
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--text);
        }
        .act-btn--transfer .act-btn__icon { background: rgba(59,130,246,.1); color: var(--blue); border: 1px solid rgba(59,130,246,.2); }
        .act-btn--transfer:hover { border-color: rgba(59,130,246,.3); box-shadow: 0 8px 24px rgba(59,130,246,.08); transform: translateY(-2px); }

        /* ── CHARTS ROW (Stack on mobile) ── */
        .charts-row {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        @media (max-width: 960px) {
          .charts-row {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
        
        @media (max-width: 640px) {
          .charts-row {
            margin-bottom: 16px;
            gap: 12px;
          }
        }

        .chart-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 18px;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .chart-card {
            padding: 14px;
          }
        }
        
        .chart-card__head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .chart-card__title { font-size: .9rem; font-weight: 700; color: var(--text); margin: 0 0 3px; }
        .chart-card__sub   { font-size: .68rem; color: var(--text2); margin: 0; }
        .chart-card__stat-row { display: flex; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; }
        .chart-mini-stat { display: flex; flex-direction: column; gap: 2px; }
        .chart-mini-stat span    { font-size: .62rem; color: var(--text2); text-transform: uppercase; letter-spacing: .06em; }
        .chart-mini-stat strong  { font-size: .85rem; font-weight: 800; color: var(--text); }

        .periods { display: flex; gap: 5px; flex-wrap: wrap; }
        .period-btn {
          padding: 4px 10px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text2);
          font-size: .65rem;
          cursor: pointer;
          transition: all .2s;
        }
        
        @media (max-width: 480px) {
          .period-btn {
            padding: 3px 8px;
            font-size: 0.6rem;
          }
        }
        
        .period-btn.active { background: var(--g-faint); border-color: var(--g-border); color: var(--g); font-weight: 700; }
        .period-btn:not(.active):hover { border-color: var(--text2); color: var(--text); }

        .chart-card__body {
          height: 240px;
        }
        
        @media (max-width: 768px) {
          .chart-card__body {
            height: 200px;
          }
        }
        
        @media (max-width: 480px) {
          .chart-card__body {
            height: 170px;
          }
        }

        /* Donut card */
        .chart-card__donut-wrap {
          position: relative;
          height: 180px;
          margin-bottom: 14px;
        }
        
        @media (max-width: 640px) {
          .chart-card__donut-wrap {
            height: 160px;
          }
        }
        
        .chart-card__donut-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          z-index: 1;
        }
        .chart-card__donut-center span  { display: block; font-size: .6rem; color: var(--text2); margin-bottom: 2px; }
        .chart-card__donut-center strong{ display: block; font-size: 1.2rem; font-weight: 900; color: var(--text); }

        .allocation-list { display: flex; flex-direction: column; gap: 8px; }
        .alloc-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        
        @media (max-width: 480px) {
          .alloc-row {
            gap: 6px;
          }
          .alloc-label {
            width: auto;
            min-width: 70px;
          }
        }
        
        .alloc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .alloc-label { font-size: .7rem; color: var(--text2); width: 80px; flex-shrink: 0; }
        .alloc-bar-track { flex: 1; height: 4px; background: var(--border); border-radius: 100px; overflow: hidden; }
        .alloc-bar-fill  { height: 100%; border-radius: 100px; transition: width 1s var(--ease); }
        .alloc-pct { font-size: .68rem; font-weight: 700; color: var(--text); width: 32px; text-align: right; flex-shrink: 0; }

        /* ── TRADES (Mobile optimized with cards) ── */
        .trades-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 18px;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .trades-card {
            padding: 14px;
          }
        }
        
        .trades-card__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .trades-card__title { font-size: .9rem; font-weight: 700; color: var(--text); margin: 0 0 2px; }
        .trades-card__sub   { font-size: .68rem; color: var(--text2); margin: 0; }
        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--g-faint);
          border: 1px solid var(--g-border);
          color: var(--g);
          font-size: .72rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: all .2s;
        }
        
        @media (max-width: 480px) {
          .view-all-btn {
            font-size: 0.68rem;
            padding: 4px 10px;
          }
        }
        
        .view-all-btn:hover { background: rgba(63,203,27,.15); }

        /* Mobile card view - Enhanced */
        .trades-cards-mobile {
          display: none;
          flex-direction: column;
          gap: 10px;
        }
        
        @media (max-width: 700px) {
          .trades-cards-mobile {
            display: flex;
          }
          .trades-table-wrap {
            display: none;
          }
        }

        .trade-mob-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 13px;
          flex-wrap: wrap;
        }
        
        @media (max-width: 480px) {
          .trade-mob-card {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
          .trade-mob-card__left {
            width: 100%;
          }
          .trade-mob-card__mid {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }
          .trade-mob-card__right {
            margin-left: 0;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
        }
        
        .trade-mob-card__left  { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 110px; }
        .trade-mob-card__flag  { width: 32px; height: 32px; border-radius: 10px; background: rgba(255,255,255,.05); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
        .trade-mob-card__sym   { display: block; font-size: .82rem; font-weight: 800; color: var(--text); margin-bottom: 3px; }
        .trade-mob-card__badge { font-size: .6rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; }
        .trade-mob-card__badge.buy  { background: rgba(63,203,27,.12); color: var(--g); }
        .trade-mob-card__badge.sell { background: rgba(239,68,68,.12); color: var(--red); }
        .trade-mob-card__mid  { display: flex; flex-direction: column; gap: 2px; }
        .trade-mob-card__lbl  { font-size: .6rem; color: var(--text2); text-transform: uppercase; letter-spacing: .06em; }
        .trade-mob-card__val  { font-size: .75rem; color: var(--text); font-weight: 600; }
        .trade-mob-card__right{ margin-left: auto; text-align: right; }
        .trade-mob-card__pnl  { display: block; font-size: .88rem; font-weight: 800; }
        .trade-mob-card__time { font-size: .64rem; color: var(--text2); }

        /* Desktop table - Scrollable on tablet */
        .trades-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        .trades-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 560px;
        }
        
        .trades-table thead th {
          text-align: left;
          padding: 8px 10px;
          font-size: .64rem;
          color: var(--text2);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .08em;
          border-bottom: 1px solid var(--border);
        }
        
        .trade-row { transition: background .2s; }
        .trade-row:hover { background: rgba(255,255,255,.025); }
        .trades-table td { padding: 10px 10px; border-bottom: 1px solid rgba(255,255,255,.04); }
        .trades-table tr:last-child td { border-bottom: none; }

        .trade-sym-cell { display: flex; align-items: center; gap: 8px; }
        .trade-flag { width: 26px; height: 26px; border-radius: 8px; background: rgba(255,255,255,.05); display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
        .trade-sym  { font-size: .8rem; font-weight: 700; color: var(--text); }
        .t-badge { font-size: .64rem; font-weight: 700; padding: 3px 8px; border-radius: 10px; }
        .t-badge.buy  { background: rgba(63,203,27,.12); color: var(--g); }
        .t-badge.sell { background: rgba(239,68,68,.12); color: var(--red); }
        .t-num    { font-size: .75rem; color: var(--text2); font-variant-numeric: tabular-nums; }
        .t-pnl    { font-size: .8rem; font-weight: 700; font-variant-numeric: tabular-nums; }
        .t-time   { font-size: .7rem; color: var(--text2); display: flex; align-items: center; white-space: nowrap; }

        /* shared profit/loss colors */
        .profit { color: var(--profit) !important; }
        .loss   { color: var(--red)    !important; }

        /* ── MODAL (Mobile optimized) ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        
        .modal {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 24px;
          width: 100%;
          max-width: 440px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,.6);
        }
        
        @media (max-width: 480px) {
          .modal {
            padding: 18px;
            max-height: 85vh;
          }
        }
        
        .modal__glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(63,203,27,.15), transparent);
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
        }
        .modal__glow--red {
          background: radial-gradient(circle, rgba(239,68,68,.12), transparent);
        }
        .modal__head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        
        .modal__icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal__icon.deposit  { background: var(--g-faint); color: var(--g); border: 1px solid var(--g-border); }
        .modal__icon.withdraw { background: rgba(239,68,68,.1); color: var(--red); border: 1px solid rgba(239,68,68,.2); }
        .modal__title { font-size: 1.05rem; font-weight: 800; color: var(--text); margin: 0 0 3px; }
        .modal__sub   { font-size: .72rem; color: var(--text2); margin: 0; }
        .modal__close {
          margin-left: auto;
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s;
        }
        .modal__close:hover { background: rgba(255,255,255,.06); color: var(--text); }

        .modal__section-label { font-size: .62rem; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: .1em; margin: 0 0 8px; position: relative; z-index:1; }

        .modal__methods {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 420px) {
          .modal__methods {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .modal__method {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 8px 6px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text2);
          cursor: pointer;
          font-size: .68rem;
          font-weight: 600;
          transition: all .25s var(--ease);
        }
        .modal__method:hover  { border-color: var(--text2); color: var(--text); }
        .modal__method.active { background: var(--g-faint); border-color: var(--g-border); color: var(--g); }
        .modal__method-icon   { font-size: 1.1rem; }

        .modal__input-wrap { position: relative; margin-bottom: 12px; z-index:1; }
        .modal__input-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text2);
        }
        .modal__input {
          width: 100%;
          padding: 12px 12px 12px 30px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 13px;
          color: var(--text);
          font-size: 1rem;
          font-weight: 700;
          transition: border-color .2s;
          font-family: inherit;
        }
        .modal__input:focus { outline: none; border-color: var(--g-border); }
        .modal__input::placeholder { color: var(--text2); font-weight: 400; }

        .modal__quick-amounts {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        
        .modal__quick {
          padding: 5px 12px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text2);
          font-size: .72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
        }
        .modal__quick:hover { border-color: var(--g-border); color: var(--g); background: var(--g-faint); }

        .modal__footer {
          display: flex;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 480px) {
          .modal__footer {
            flex-direction: column;
          }
        }
        
        .modal__cancel, .modal__confirm {
          flex: 1;
          padding: 12px;
          border-radius: 13px;
          font-weight: 700;
          font-size: .84rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all .25s var(--ease);
        }
        
        .modal__cancel {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text2);
        }
        .modal__cancel:hover { border-color: var(--text2); color: var(--text); }
        .modal__confirm {
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          color: #000;
          border: none;
        }
        .modal__confirm:hover { box-shadow: 0 8px 24px rgba(63,203,27,.35); transform: translateY(-2px); }
        .modal__confirm--red {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #fff;
        }
        .modal__confirm--red:hover { box-shadow: 0 8px 24px rgba(239,68,68,.3); }
      `}</style>
    </div>
  );
}