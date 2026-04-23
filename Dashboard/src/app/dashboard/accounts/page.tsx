// src/app/dashboard/accounts/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BiUser, BiPlus, BiDollar, BiTrendingUp, BiTransfer,
  BiLineChart, BiShield, BiCopy, BiCheck, BiRefresh,
  BiLinkExternal, BiChevronDown, BiChevronUp, BiWallet,
  BiBarChartAlt2, BiTime, BiInfoCircle, BiX,
} from 'react-icons/bi';
import {
  FiArrowUpRight, FiArrowDownRight, FiZap,
  FiChevronRight, FiActivity, FiLock,
} from 'react-icons/fi';

// ── DATA ─────────────────────────────────────────────────────────────────
const accounts = [
  {
    id: 1, name: 'MT5 #155691', type: 'Standard', status: 'Live',
    balance: 25340.50, equity: 26780.30, profit: 1439.80,
    profitPercent: 5.68, currency: 'USD', leverage: '1:500',
    margin: 1439.80, freeMargin: 23900.70, marginLevel: 1861.02,
    server: 'FoxnanceLive-1', openTrades: 4, createdAt: '2024-01-15',
    lastLogin: '2025-04-23 10:30',
    history: [18200, 20100, 19400, 21600, 22800, 24100, 24900, 25340],
  },
  {
    id: 2, name: 'MT5 #155692', type: 'Raw Spread', status: 'Live',
    balance: 10000.00, equity: 10890.20, profit: 890.20,
    profitPercent: 8.90, currency: 'USD', leverage: '1:500',
    margin: 890.20, freeMargin: 9109.80, marginLevel: 1223.35,
    server: 'FoxnanceLive-1', openTrades: 2, createdAt: '2024-03-02',
    lastLogin: '2025-04-22 18:14',
    history: [7200, 8100, 7800, 8900, 9300, 9700, 10100, 10000],
  },
  {
    id: 3, name: 'MT5 #155693', type: 'Demo', status: 'Demo',
    balance: 50000.00, equity: 52340.50, profit: 2340.50,
    profitPercent: 4.68, currency: 'USD', leverage: '1:200',
    margin: 2340.50, freeMargin: 50000.00, marginLevel: 2236.20,
    server: 'FoxnanceDemo-1', openTrades: 7, createdAt: '2024-02-10',
    lastLogin: '2025-04-23 09:05',
    history: [44000, 45500, 46200, 47800, 48900, 49600, 51200, 50000],
  },
];

// Tiny inline sparkline SVG
function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 100, h = 36;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const color = positive ? '#3fcb1b' : '#ef4444';
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg${data[0]}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill={`url(#sg${data[0]})`}
      />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Copy-to-clipboard hook
function useCopy() {
  const [copied, setCopied] = useState('');
  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1800);
  };
  return { copied, copy };
}

// ── PAGE ─────────────────────────────────────────────────────────────────
export default function AccountsPage() {
  const [activeTab,   setActiveTab]   = useState<'all'|'live'|'demo'>('all');
  const [expandedId,  setExpandedId]  = useState<number | null>(null);
  const [showNewAcc,  setShowNewAcc]  = useState(false);
  const [mounted,     setMounted]     = useState(false);
  const [animVals,    setAnimVals]    = useState<{[id:number]:number}>({});
  const rafRef = useRef<number>(0);
  const { copied, copy } = useCopy();

  useEffect(() => {
    setMounted(true);
    // count-up all balances
    let t0: number | null = null;
    const dur = 1000;
    const run = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const vals: {[id:number]:number} = {};
      accounts.forEach(a => { vals[a.id] = a.balance * e; });
      setAnimVals(vals);
      if (p < 1) rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const filtered = accounts.filter(a => {
    if (activeTab === 'live') return a.status === 'Live';
    if (activeTab === 'demo') return a.status === 'Demo';
    return true;
  });

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const totalProfit  = accounts.reduce((s, a) => s + a.profit, 0);
  const liveCount    = accounts.filter(a => a.status === 'Live').length;
  const demoCount    = accounts.filter(a => a.status === 'Demo').length;
  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={`ap ${mounted ? 'on' : ''}`}>

      {/* ── PAGE HEADER ── */}
      <div className="ap-header">
        <div className="ap-header__left">
          <div className="ap-header__eyebrow"><FiActivity size={11} />My Accounts</div>
          <h1 className="ap-header__title">Trading Accounts</h1>
          <p className="ap-header__sub">Manage and monitor all your trading accounts in one place</p>
        </div>
        <button className="btn-new" onClick={() => setShowNewAcc(true)}>
          <BiPlus size={17} />
          <span>New Account</span>
        </button>
      </div>

      {/* ── PORTFOLIO SUMMARY STRIP ── */}
      <div className="summary-strip">
        <div className="summary-strip__orb" />
        {[
          { label: 'Total Portfolio',  val: `$${totalBalance.toLocaleString('en-US',{minimumFractionDigits:2})}`, icon: <BiWallet size={17}/>, col: 'g' },
          { label: 'Total P&L',        val: `+$${totalProfit.toLocaleString('en-US',{minimumFractionDigits:2})}`, icon: <FiArrowUpRight size={17}/>, col: 'profit' },
          { label: 'Live Accounts',    val: String(liveCount),  icon: <FiZap size={15}/>, col: 'g' },
          { label: 'Demo Accounts',    val: String(demoCount),  icon: <BiShield size={17}/>, col: 'b' },
          { label: 'Open Trades',      val: String(accounts.reduce((s,a)=>s+a.openTrades,0)), icon: <FiActivity size={15}/>, col: 'g' },
        ].map((s, i) => (
          <motion.div key={i} className={`ss-item`}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i*0.07, duration:0.35 }}
          >
            <div className={`ss-item__icon ${s.col}`}>{s.icon}</div>
            <div>
              <span className="ss-item__lbl">{s.label}</span>
              <strong className={`ss-item__val ${s.col === 'profit' ? 'profit' : ''}`}>{s.val}</strong>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── FILTER TABS ── */}
      <div className="filter-row">
        <div className="filter-tabs">
          {(['all','live','demo'] as const).map(t => (
            <button key={t} className={`ftab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>
              {t === 'all'  && `All (${accounts.length})`}
              {t === 'live' && `Live (${liveCount})`}
              {t === 'demo' && `Demo (${demoCount})`}
            </button>
          ))}
        </div>
        <div className="filter-row__right">
          <button className="icon-btn"><BiRefresh size={16}/></button>
        </div>
      </div>

      {/* ── ACCOUNT CARDS ── */}
      <div className="cards-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((acc, i) => {
            const isExpanded = expandedId === acc.id;
            const isPositive = acc.profit >= 0;
            const animBal    = animVals[acc.id] ?? 0;

            return (
              <motion.div
                key={acc.id}
                layout
                initial={{ opacity:0, y:24, scale:0.97 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, scale:0.95, y:-10 }}
                transition={{ delay: i*0.08, duration:0.38, ease:[0.16,1,0.3,1] }}
                className={`acc-card ${acc.status==='Live'?'card--live':'card--demo'} ${isExpanded?'card--expanded':''}`}
              >
                {/* Glow */}
                <div className={`acc-card__glow ${acc.status==='Live'?'g':'b'}`} />

                {/* ── CARD HEADER ── */}
                <div className="acc-card__head">
                  <div className="acc-card__avatar">
                    <span>{acc.name.slice(-2)}</span>
                    <div className={`acc-card__avatar-ring ${acc.status==='Live'?'live':'demo'}`}/>
                  </div>
                  <div className="acc-card__info">
                    <div className="acc-card__name-row">
                      <h3 className="acc-card__name">{acc.name}</h3>
                      <button className="copy-btn" title="Copy account ID"
                        onClick={e=>{ e.stopPropagation(); copy(acc.name, `name-${acc.id}`); }}>
                        {copied===`name-${acc.id}` ? <BiCheck size={12}/> : <BiCopy size={12}/>}
                      </button>
                    </div>
                    <div className="acc-card__meta-row">
                      <span className="acc-card__type">{acc.type}</span>
                      <span className="acc-card__dot" />
                      <span className="acc-card__leverage">{acc.leverage}</span>
                    </div>
                  </div>
                  <span className={`status-pill ${acc.status==='Live'?'live':'demo'}`}>
                    <span className={`status-pill__dot ${acc.status==='Live'?'live':'demo'}`}/>
                    {acc.status}
                  </span>
                </div>

                {/* ── BALANCE AREA ── */}
                <div className="acc-card__balance-area">
                  <div className="acc-card__balance-left">
                    <span className="acc-card__bal-lbl">Account Balance</span>
                    <strong className="acc-card__bal-val">${fmt(animBal)}</strong>
                    <div className={`acc-card__pnl ${isPositive?'up':'dn'}`}>
                      {isPositive ? <FiArrowUpRight size={12}/> : <FiArrowDownRight size={12}/>}
                      {isPositive?'+':''}${fmt(acc.profit)} ({acc.profitPercent}%)
                    </div>
                  </div>
                  <div className="acc-card__spark">
                    <Sparkline data={acc.history} positive={isPositive} />
                  </div>
                </div>

                {/* ── STATS ROW ── */}
                <div className="acc-card__stats">
                  {[
                    { lbl:'Equity',       val:`$${fmt(acc.equity)}` },
                    { lbl:'Free Margin',  val:`$${fmt(acc.freeMargin)}` },
                    { lbl:'Margin Lvl',   val:`${acc.marginLevel.toFixed(0)}%` },
                    { lbl:'Open Trades',  val:String(acc.openTrades) },
                  ].map((s,idx) => (
                    <div key={idx} className="acc-stat">
                      <span className="acc-stat__lbl">{s.lbl}</span>
                      <strong className="acc-stat__val">{s.val}</strong>
                    </div>
                  ))}
                </div>

                {/* ── PROGRESS BAR — margin usage ── */}
                <div className="acc-card__margin-bar">
                  <div className="acc-card__margin-label">
                    <span>Margin Used</span>
                    <span>${fmt(acc.margin)}</span>
                  </div>
                  <div className="acc-card__bar-track">
                    <motion.div
                      className={`acc-card__bar-fill ${acc.status==='Live'?'g':'b'}`}
                      initial={{ width:0 }}
                      animate={{ width: `${Math.min((acc.margin/acc.balance)*100, 100)}%` }}
                      transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
                    />
                  </div>
                </div>

                {/* ── ACTION BUTTONS ── */}
                <div className="acc-card__actions">
                  <button className="acc-btn acc-btn--dep"><BiDollar size={14}/>Deposit</button>
                  <button className="acc-btn acc-btn--wit"><BiTransfer size={14}/>Withdraw</button>
                  <button className="acc-btn acc-btn--trade"><FiActivity size={13}/>Trade</button>
                  <button
                    className="acc-btn acc-btn--more"
                    onClick={() => setExpandedId(isExpanded ? null : acc.id)}
                  >
                    {isExpanded ? <BiChevronUp size={15}/> : <BiChevronDown size={15}/>}
                  </button>
                </div>

                {/* ── EXPANDED DETAILS ── */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      key="details"
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
                      className="acc-card__details"
                    >
                      <div className="acc-card__details-inner">
                        <div className="det-row">
                          <div className="det-item">
                            <span>Server</span>
                            <strong>{acc.server}</strong>
                          </div>
                          <div className="det-item">
                            <span>Currency</span>
                            <strong>{acc.currency}</strong>
                          </div>
                          <div className="det-item">
                            <span>Account Type</span>
                            <strong>{acc.type}</strong>
                          </div>
                          <div className="det-item">
                            <span>Created</span>
                            <strong>{acc.createdAt}</strong>
                          </div>
                          <div className="det-item">
                            <span>Last Login</span>
                            <strong>{acc.lastLogin}</strong>
                          </div>
                          <div className="det-item">
                            <span>Margin Level</span>
                            <strong className="profit">{acc.marginLevel.toFixed(2)}%</strong>
                          </div>
                        </div>
                        <div className="det-links">
                          <button className="det-link"><BiLineChart size={13}/>View History</button>
                          <button className="det-link"><FiLock size={12}/>Change Password</button>
                          <button className="det-link"><BiLinkExternal size={12}/>Open in MT5</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── EMPTY STATE ── */}
      {filtered.length === 0 && (
        <motion.div className="empty-state" initial={{opacity:0}} animate={{opacity:1}}>
          <div className="empty-state__icon"><BiUser size={32}/></div>
          <h3>No accounts found</h3>
          <p>No {activeTab} accounts yet. Create one to get started.</p>
          <button className="btn-new" onClick={()=>setShowNewAcc(true)}><BiPlus size={16}/>Create Account</button>
        </motion.div>
      )}

      {/* ── NEW ACCOUNT MODAL ── */}
      <AnimatePresence>
        {showNewAcc && (
          <motion.div className="overlay"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.18}} onClick={()=>setShowNewAcc(false)}
          >
            <motion.div className="modal"
              initial={{scale:0.92,y:22,opacity:0}}
              animate={{scale:1,y:0,opacity:1}}
              exit={{scale:0.94,y:14,opacity:0}}
              transition={{duration:0.28,ease:[0.16,1,0.3,1]}}
              onClick={e=>e.stopPropagation()}
            >
              <div className="modal__glow"/>
              <div className="modal__head">
                <div className="modal__icon"><BiPlus size={20}/></div>
                <div>
                  <h3>Open New Account</h3>
                  <p>Choose your account type to get started</p>
                </div>
                <button className="modal__x" onClick={()=>setShowNewAcc(false)}><BiX size={18}/></button>
              </div>

              <p className="mlbl">Account Type</p>
              <div className="acc-types">
                {[
                  { id:'standard', label:'Standard', desc:'Best for beginners. Fixed spreads, simple trading.', icon:'📊' },
                  { id:'raw',      label:'Raw Spread', desc:'Raw ECN pricing. Ultra-low spreads from 0.0 pips.', icon:'⚡' },
                  { id:'demo',     label:'Demo', desc:'Risk-free practice account with $50,000 virtual funds.', icon:'🎯' },
                ].map(t => (
                  <div key={t.id} className="acc-type-card">
                    <span className="acc-type-card__icon">{t.icon}</span>
                    <div>
                      <strong>{t.label}</strong>
                      <span>{t.desc}</span>
                    </div>
                    <FiChevronRight size={14} className="acc-type-card__arr"/>
                  </div>
                ))}
              </div>

              <p className="mlbl">Currency & Leverage</p>
              <div className="modal__selects">
                <select className="mselect">
                  <option>USD</option><option>EUR</option><option>GBP</option>
                </select>
                <select className="mselect">
                  <option>1:500</option><option>1:200</option><option>1:100</option><option>1:50</option>
                </select>
              </div>

              <div className="modal__footer">
                <button className="mcancel" onClick={()=>setShowNewAcc(false)}>Cancel</button>
                <button className="mconfirm"><BiCheck size={15}/>Create Account</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════ */}
      <style jsx>{`
        /* ── BASE ── */
        .ap { width:100%; min-width:0; overflow-x:hidden; opacity:0; transform:translateY(8px); transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1); }
        .ap.on { opacity:1; transform:translateY(0); }
        .ap *,.ap *::before,.ap *::after { box-sizing:border-box; }

        /* ── HEADER ── */
        .ap-header { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:22px; flex-wrap:wrap; }
        .ap-header__eyebrow { display:inline-flex; align-items:center; gap:6px; font-size:.63rem; font-weight:700; color:#3fcb1b; text-transform:uppercase; letter-spacing:.12em; margin-bottom:8px; }
        .ap-header__title { font-size:clamp(1.4rem,3vw,1.9rem); font-weight:900; color:var(--text-primary); letter-spacing:-.03em; margin:0 0 5px; }
        .ap-header__sub   { font-size:.78rem; color:var(--text-secondary); margin:0; }

        .btn-new {
          display:flex; align-items:center; gap:7px;
          padding:10px 20px; background:linear-gradient(135deg,#3fcb1b,#2e9c14);
          color:#000; border:none; border-radius:12px; font-weight:800; font-size:.84rem;
          cursor:pointer; flex-shrink:0; white-space:nowrap;
          transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s;
          position:relative; overflow:hidden;
        }
        .btn-new::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent); transform:translateX(-100%); transition:transform .45s; }
        .btn-new:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(63,203,27,.3); }
        .btn-new:hover::before { transform:translateX(100%); }

        /* ── SUMMARY STRIP ── */
        .summary-strip {
          position:relative; overflow:hidden;
          display:flex; gap:0; align-items:center; flex-wrap:wrap;
          background:linear-gradient(135deg,rgba(63,203,27,.08),rgba(63,203,27,.03) 50%,transparent);
          border:1px solid rgba(63,203,27,.18); border-radius:18px;
          padding:16px 20px; margin-bottom:20px; gap:0;
        }
        .summary-strip__orb {
          position:absolute; width:250px; height:250px;
          background:radial-gradient(circle,rgba(63,203,27,.1),transparent);
          border-radius:50%; filter:blur(50px); top:-80px; right:-30px;
          pointer-events:none; animation:orbF 8s ease-in-out infinite;
        }
        @keyframes orbF { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-10px,8px)} }
        .ss-item {
          display:flex; align-items:center; gap:10px;
          flex:1; min-width:120px; padding:8px 14px;
          position:relative; z-index:1;
        }
        .ss-item + .ss-item::before { content:''; position:absolute; left:0; top:15%; bottom:15%; width:1px; background:var(--border-color); }
        @media(max-width:640px){ .ss-item::before { display:none; } .summary-strip { gap:10px; } }
        .ss-item__icon {
          width:34px; height:34px; border-radius:10px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .ss-item__icon.g      { background:rgba(63,203,27,.1); color:#3fcb1b; border:1px solid rgba(63,203,27,.2); }
        .ss-item__icon.profit { background:rgba(16,185,129,.1); color:#10b981; border:1px solid rgba(16,185,129,.2); }
        .ss-item__icon.b      { background:rgba(59,130,246,.1); color:#3b82f6; border:1px solid rgba(59,130,246,.2); }
        .ss-item__lbl { display:block; font-size:.62rem; color:var(--text-secondary); margin-bottom:2px; }
        .ss-item__val { display:block; font-size:.95rem; font-weight:800; color:var(--text-primary); letter-spacing:-.02em; }
        .ss-item__val.profit { color:#10b981; }

        /* ── FILTER TABS ── */
        .filter-row { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:18px; flex-wrap:wrap; }
        .filter-tabs { display:flex; gap:6px; flex-wrap:wrap; }
        .ftab {
          padding:7px 16px; background:var(--bg-secondary);
          border:1px solid var(--border-color); border-radius:10px;
          color:var(--text-secondary); font-size:.78rem; font-weight:600;
          cursor:pointer; transition:all .2s; white-space:nowrap;
        }
        .ftab.active { background:rgba(63,203,27,.1); border-color:rgba(63,203,27,.35); color:#3fcb1b; }
        .ftab:not(.active):hover { border-color:var(--text-secondary); color:var(--text-primary); }
        .filter-row__right { display:flex; gap:8px; align-items:center; }
        .icon-btn {
          width:36px; height:36px; border-radius:9px; border:1px solid var(--border-color);
          background:var(--bg-secondary); color:var(--text-secondary);
          display:flex; align-items:center; justify-content:center; cursor:pointer;
          transition:all .2s;
        }
        .icon-btn:hover { border-color:rgba(63,203,27,.3); color:#3fcb1b; }

        /* ── CARDS GRID ── */
        .cards-grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:18px; margin-bottom:18px;
        }
        @media(max-width:1100px){ .cards-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:700px)  { .cards-grid { grid-template-columns:1fr; } }

        /* ── ACCOUNT CARD ── */
        .acc-card {
          background:var(--bg-card); border:1px solid var(--border-color);
          border-radius:20px; padding:20px;
          position:relative; overflow:hidden;
          transition:border-color .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,transform .3s;
          cursor:default;
        }
        .acc-card:hover { transform:translateY(-4px); }
        .card--live:hover { border-color:rgba(63,203,27,.35); box-shadow:0 12px 36px rgba(63,203,27,.1); }
        .card--demo:hover { border-color:rgba(59,130,246,.35); box-shadow:0 12px 36px rgba(59,130,246,.1); }
        .card--expanded { border-color:rgba(63,203,27,.3)!important; }

        .acc-card__glow {
          position:absolute; top:-60px; right:-40px;
          width:200px; height:200px; border-radius:50%;
          filter:blur(50px); pointer-events:none; opacity:0;
          transition:opacity .4s;
        }
        .acc-card:hover .acc-card__glow { opacity:1; }
        .acc-card__glow.g { background:radial-gradient(circle,rgba(63,203,27,.18),transparent); }
        .acc-card__glow.b { background:radial-gradient(circle,rgba(59,130,246,.15),transparent); }

        /* Card Header */
        .acc-card__head { display:flex; align-items:center; gap:12px; margin-bottom:18px; }
        .acc-card__avatar {
          width:44px; height:44px; border-radius:14px; flex-shrink:0;
          background:linear-gradient(135deg,#3fcb1b,#2e9c14);
          display:flex; align-items:center; justify-content:center;
          font-size:.9rem; font-weight:900; color:#000;
          position:relative;
        }
        .acc-card__avatar-ring {
          position:absolute; inset:-2px; border-radius:16px;
          border:1.5px solid transparent; animation:ringPulse 3s ease-in-out infinite;
        }
        .acc-card__avatar-ring.live { border-color:rgba(63,203,27,.5); }
        .acc-card__avatar-ring.demo { border-color:rgba(59,130,246,.5); animation:none; }
        @keyframes ringPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.04)} }

        .acc-card__info { flex:1; min-width:0; }
        .acc-card__name-row { display:flex; align-items:center; gap:6px; margin-bottom:3px; }
        .acc-card__name { font-size:.92rem; font-weight:800; color:var(--text-primary); margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .copy-btn { width:20px; height:20px; border-radius:5px; border:1px solid var(--border-color); background:transparent; color:var(--text-secondary); display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:all .18s; }
        .copy-btn:hover { border-color:rgba(63,203,27,.3); color:#3fcb1b; }
        .acc-card__meta-row { display:flex; align-items:center; gap:6px; }
        .acc-card__type    { font-size:.66rem; color:var(--text-secondary); }
        .acc-card__dot     { width:3px; height:3px; border-radius:50%; background:var(--text-secondary); opacity:.5; }
        .acc-card__leverage{ font-size:.66rem; color:var(--text-secondary); }

        .status-pill { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:100px; font-size:.62rem; font-weight:700; flex-shrink:0; text-transform:uppercase; letter-spacing:.05em; }
        .status-pill.live { background:rgba(63,203,27,.1); color:#3fcb1b; border:1px solid rgba(63,203,27,.2); }
        .status-pill.demo { background:rgba(59,130,246,.1); color:#3b82f6; border:1px solid rgba(59,130,246,.2); }
        .status-pill__dot { width:5px; height:5px; border-radius:50%; }
        .status-pill__dot.live { background:#3fcb1b; animation:dotP 2s ease-in-out infinite; }
        .status-pill__dot.demo { background:#3b82f6; }
        @keyframes dotP { 0%,100%{box-shadow:0 0 0 0 rgba(63,203,27,.5)} 50%{box-shadow:0 0 0 4px rgba(63,203,27,0)} }

        /* Balance area */
        .acc-card__balance-area { display:flex; align-items:flex-end; justify-content:space-between; gap:10px; margin-bottom:16px; }
        .acc-card__balance-left { min-width:0; }
        .acc-card__bal-lbl { display:block; font-size:.62rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.08em; margin-bottom:5px; }
        .acc-card__bal-val { display:block; font-size:clamp(1.3rem,2.5vw,1.7rem); font-weight:900; color:var(--text-primary); letter-spacing:-.04em; margin-bottom:6px; font-variant-numeric:tabular-nums; }
        .acc-card__pnl { display:inline-flex; align-items:center; gap:3px; font-size:.7rem; font-weight:700; padding:3px 8px; border-radius:100px; }
        .acc-card__pnl.up { background:rgba(16,185,129,.1); color:#10b981; }
        .acc-card__pnl.dn { background:rgba(239,68,68,.1); color:#ef4444; }
        .acc-card__spark { flex-shrink:0; opacity:.9; }

        /* Stats row */
        .acc-card__stats { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:14px; padding:12px; background:rgba(255,255,255,.025); border:1px solid var(--border-color); border-radius:12px; }
        @media(max-width:400px){ .acc-card__stats { grid-template-columns:repeat(2,1fr); } }
        .acc-stat { display:flex; flex-direction:column; gap:3px; }
        .acc-stat__lbl { font-size:.58rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.06em; }
        .acc-stat__val { font-size:.78rem; font-weight:700; color:var(--text-primary); font-variant-numeric:tabular-nums; }

        /* Margin bar */
        .acc-card__margin-bar { margin-bottom:16px; }
        .acc-card__margin-label { display:flex; justify-content:space-between; align-items:center; font-size:.62rem; color:var(--text-secondary); margin-bottom:5px; }
        .acc-card__bar-track { height:4px; background:var(--border-color); border-radius:100px; overflow:hidden; }
        .acc-card__bar-fill { height:100%; border-radius:100px; }
        .acc-card__bar-fill.g { background:linear-gradient(90deg,#3fcb1b,#7de84a); }
        .acc-card__bar-fill.b { background:linear-gradient(90deg,#3b82f6,#93c5fd); }

        /* Action buttons */
        .acc-card__actions { display:flex; gap:8px; }
        .acc-btn {
          display:flex; align-items:center; justify-content:center; gap:5px;
          padding:9px 0; border-radius:10px; font-size:.76rem; font-weight:700;
          cursor:pointer; transition:all .22s; flex:1; border:none;
        }
        .acc-btn--dep   { background:linear-gradient(135deg,#3fcb1b,#2e9c14); color:#000; }
        .acc-btn--dep:hover { box-shadow:0 6px 18px rgba(63,203,27,.3); transform:translateY(-1px); }
        .acc-btn--wit   { background:var(--bg-secondary); border:1px solid var(--border-color); color:var(--text-primary); }
        .acc-btn--wit:hover { border-color:rgba(239,68,68,.3); color:#ef4444; }
        .acc-btn--trade { background:rgba(63,203,27,.08); border:1px solid rgba(63,203,27,.2); color:#3fcb1b; }
        .acc-btn--trade:hover { background:rgba(63,203,27,.15); }
        .acc-btn--more  { flex:0 0 36px; background:var(--bg-secondary); border:1px solid var(--border-color); color:var(--text-secondary); border-radius:10px; }
        .acc-btn--more:hover { border-color:rgba(63,203,27,.3); color:#3fcb1b; }

        /* Expanded details */
        .acc-card__details { overflow:hidden; }
        .acc-card__details-inner {
          padding-top:16px; border-top:1px solid var(--border-color); margin-top:16px;
        }
        .det-row { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:14px; }
        @media(max-width:480px){ .det-row { grid-template-columns:repeat(2,1fr); } }
        .det-item { display:flex; flex-direction:column; gap:3px; padding:10px; background:rgba(255,255,255,.025); border:1px solid var(--border-color); border-radius:9px; }
        .det-item span   { font-size:.6rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.07em; }
        .det-item strong { font-size:.78rem; color:var(--text-primary); font-weight:700; }
        .det-links { display:flex; gap:8px; flex-wrap:wrap; }
        .det-link {
          display:inline-flex; align-items:center; gap:5px;
          padding:6px 12px; background:transparent; border:1px solid var(--border-color);
          border-radius:8px; color:var(--text-secondary); font-size:.72rem; font-weight:600;
          cursor:pointer; transition:all .18s;
        }
        .det-link:hover { border-color:rgba(63,203,27,.3); color:#3fcb1b; background:rgba(63,203,27,.05); }

        /* ── EMPTY STATE ── */
        .empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:64px 24px; text-align:center; }
        .empty-state__icon { width:64px; height:64px; border-radius:18px; background:rgba(63,203,27,.08); border:1px solid rgba(63,203,27,.2); color:#3fcb1b; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .empty-state h3 { font-size:1.1rem; font-weight:800; color:var(--text-primary); margin:0 0 8px; }
        .empty-state p  { font-size:.84rem; color:var(--text-secondary); margin:0 0 22px; }

        /* ── MODAL ── */
        .overlay { position:fixed; inset:0; z-index:1000; background:rgba(0,0,0,.65); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; padding:16px; }
        .modal { background:var(--bg-card); border:1px solid var(--border-color); border-radius:22px; padding:24px; width:100%; max-width:440px; position:relative; overflow:hidden; box-shadow:0 30px 70px rgba(0,0,0,.55); max-height:90vh; overflow-y:auto; }
        .modal__glow { position:absolute; top:-50px; right:-50px; width:180px; height:180px; background:radial-gradient(circle,rgba(63,203,27,.14),transparent); border-radius:50%; filter:blur(36px); pointer-events:none; }
        .modal__head { display:flex; align-items:center; gap:12px; margin-bottom:20px; position:relative; z-index:1; }
        .modal__icon { width:44px; height:44px; border-radius:12px; flex-shrink:0; background:rgba(63,203,27,.1); color:#3fcb1b; border:1px solid rgba(63,203,27,.2); display:flex; align-items:center; justify-content:center; }
        .modal__head h3 { font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0 0 2px; }
        .modal__head p  { font-size:.72rem; color:var(--text-secondary); margin:0; }
        .modal__x { margin-left:auto; flex-shrink:0; width:28px; height:28px; border-radius:7px; border:1px solid var(--border-color); background:transparent; color:var(--text-secondary); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .16s; }
        .modal__x:hover { background:rgba(255,255,255,.06); color:var(--text-primary); }

        .mlbl { font-size:.61rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.1em; margin:0 0 9px; }
        .acc-types { display:flex; flex-direction:column; gap:8px; margin-bottom:18px; }
        .acc-type-card {
          display:flex; align-items:center; gap:12px;
          padding:12px 14px; background:var(--bg-secondary);
          border:1px solid var(--border-color); border-radius:12px;
          cursor:pointer; transition:all .2s;
        }
        .acc-type-card:hover { border-color:rgba(63,203,27,.3); background:rgba(63,203,27,.04); }
        .acc-type-card__icon { font-size:1.3rem; flex-shrink:0; }
        .acc-type-card div { flex:1; }
        .acc-type-card strong { display:block; font-size:.84rem; font-weight:700; color:var(--text-primary); margin-bottom:2px; }
        .acc-type-card span  { display:block; font-size:.7rem; color:var(--text-secondary); }
        .acc-type-card__arr  { color:var(--text-secondary); flex-shrink:0; transition:transform .2s; }
        .acc-type-card:hover .acc-type-card__arr { transform:translateX(3px); color:#3fcb1b; }

        .modal__selects { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px; }
        .mselect { padding:10px 12px; background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:10px; color:var(--text-primary); font-size:.82rem; cursor:pointer; transition:border-color .16s; font-family:inherit; }
        .mselect:focus { outline:none; border-color:rgba(63,203,27,.4); }

        .modal__footer { display:flex; gap:9px; }
        .mcancel,.mconfirm { flex:1; padding:11px; border-radius:11px; font-weight:700; font-size:.82rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px; transition:all .2s; }
        .mcancel { background:transparent; border:1px solid var(--border-color); color:var(--text-secondary); }
        .mcancel:hover { border-color:var(--text-secondary); color:var(--text-primary); }
        .mconfirm { background:linear-gradient(135deg,#3fcb1b,#2e9c14); color:#000; border:none; }
        .mconfirm:hover { box-shadow:0 6px 18px rgba(63,203,27,.3); transform:translateY(-1px); }

        /* ── SHARED ── */
        .profit { color:#10b981 !important; }
        .loss   { color:#ef4444 !important; }
      `}</style>
    </div>
  );
}