// src/app/dashboard/overview/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BiDollar, BiTrendingUp, BiArrowToRight, BiArrowFromLeft,
  BiWallet, BiLineChart, BiRefresh, BiBell, BiX, BiCheck,
  BiTransfer, BiShield, BiTime, BiSun, BiMoon, BiMenu,
  BiHistory, BiSupport, BiCog, BiBarChart, BiGroup, BiRocket,
  BiChevronDown, BiChevronRight, BiLogOut, BiUser, BiCreditCard,
  BiBarChartSquare
} from 'react-icons/bi'
import {
  FiArrowUpRight, FiActivity, FiZap,
  FiChevronRight, FiTrendingUp, FiUsers,
  FiPieChart, FiAlertCircle, FiSettings
} from 'react-icons/fi'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ArcElement, Filler)

// ── DATA ─────────────────────────────────────────────────────────────────
const accounts = [
  { id:1, name:'MT5 #155691', type:'Standard',   status:'Live', balance:25340.5, equity:26780.3, profit:1439.8, profitPct:5.68, margin:1439.8, freeMargin:25340.5, marginLevel:1861.02 },
  { id:2, name:'MT5 #155692', type:'Raw Spread', status:'Demo', balance:10000.0, equity:10890.2, profit:890.2,  profitPct:8.90, margin:890.2,  freeMargin:10000.0, marginLevel:1223.35 },
]

const recentTrades = [
  { id:1, symbol:'EUR/USD', type:'Buy',  volume:0.5,  open:1.08432, current:1.08945, profit:256.50, time:'10:32', flag:'🇪🇺' },
  { id:2, symbol:'GBP/USD', type:'Sell', volume:0.3,  open:1.27680, current:1.27420, profit:78.00,  time:'10:28', flag:'🇬🇧' },
  { id:3, symbol:'XAU/USD', type:'Buy',  volume:0.1,  open:2341.20, current:2356.80, profit:156.00, time:'10:15', flag:'🥇' },
  { id:4, symbol:'BTC/USD', type:'Buy',  volume:0.05, open:68200,   current:69150,   profit:47.50,  time:'09:58', flag:'₿' },
]

const balanceHistory = {
  labels: ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6','Week 7','Week 8'],
  datasets: [{
    label: 'Balance',
    data: [12500, 14200, 13800, 15600, 16800, 18500, 19200, 20500],
    borderColor: '#3fcb1b',
    backgroundColor: (ctx: any) => {
      const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280)
      g.addColorStop(0, 'rgba(63,203,27,0.18)')
      g.addColorStop(1, 'rgba(63,203,27,0)')
      return g
    },
    fill: true, tension: 0.45,
    pointBackgroundColor: '#3fcb1b',
    pointBorderColor: '#1a201a', pointBorderWidth: 2,
    pointRadius: 4, pointHoverRadius: 7, borderWidth: 2.5,
  }],
}

const allocation = {
  labels: ['Forex','Commodities','Indices','Crypto','Stocks'],
  datasets: [{ data:[45,20,15,12,8], backgroundColor:['#3fcb1b','#f59e0b','#3b82f6','#8b5cf6','#ec489a'], borderWidth:0, hoverOffset:5 }],
}
const allocColors = ['#3fcb1b','#f59e0b','#3b82f6','#8b5cf6','#ec489a']

// ── NAV ──────────────────────────────────────────────────────────────────
const NAV = [
  { section:'DASHBOARD', items:[
    { label:'Overview',    href:'/dashboard/overview', icon:BiBarChart,   active:true },
    { label:'My Accounts', href:'/dashboard/accounts', icon:BiUser },
    { label:'History',     href:'/dashboard/history',  icon:BiHistory },
  ]},
  { section:'TRANSACTIONS', items:[
    { label:'Deposit',    href:'/dashboard/deposit',   icon:BiArrowFromLeft },
    { label:'Withdraw',   href:'/dashboard/withdraw',  icon:BiArrowToRight },
    { label:'Transfer',   href:'/dashboard/transfer',  icon:BiTransfer },
  ]},
  { section:'DATA & ANALYTICS', items:[
    { label:'Reports',   href:'/dashboard/reports',   icon:BiBarChartSquare },
    { label:'Analytics', href:'/dashboard/analytics', icon:FiPieChart },
  ]},
  { section:'WALLET', items:[
    { label:'My Wallet',       href:'/dashboard/wallet',          icon:BiWallet },
    { label:'Payment Methods', href:'/dashboard/payment-methods', icon:BiCreditCard },
  ]},
  { section:'SUPPORT', items:[
    { label:'Help Center', href:'/dashboard/help',    icon:BiSupport },
    { label:'Tickets',     href:'/dashboard/tickets', icon:FiAlertCircle },
  ]},
  { section:'SETTINGS', items:[
    { label:'Settings', href:'/dashboard/settings', icon:BiCog },
  ]},
]

// ── COMPONENT ─────────────────────────────────────────────────────────────
export default function DashboardOverview() {
  const [selAcc,       setSelAcc]       = useState(0)
  const [showDep,      setShowDep]      = useState(false)
  const [showWit,      setShowWit]      = useState(false)
  const [amount,       setAmount]       = useState('')
  const [method,       setMethod]       = useState('')
  const [period,       setPeriod]       = useState('1M')
  const [counters,     setCounters]     = useState({ bal:0, eq:0, pnl:0 })
  const [mounted,      setMounted]      = useState(false)
  const [dark,         setDark]         = useState(true)
  const [mobOpen,      setMobOpen]      = useState(false)
  const [expanded,     setExpanded]     = useState<Set<string>>(new Set(NAV.map(n=>n.section)))
  const animRef = useRef<number>(0)

  const acc   = accounts[selAcc]
  const totBal = accounts.reduce((s,a) => s + a.balance, 0)
  const totPnl = accounts.reduce((s,a) => s + a.profit,  0)
  const fmt = (n: number) => n.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})
  const fmt2 = (n: number) => n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})

  // theme - sync with layout
  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('fox-dash-theme')
    const isDark = saved ? saved === 'dark' : true
    setDark(isDark)
    setMounted(true)
    
    // Listen for theme changes from layout
    const handleStorageChange = () => {
      const updated = localStorage.getItem('fox-dash-theme')
      if (updated) {
        setDark(updated === 'dark')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // counters
  useEffect(() => {
    const t = { bal: acc.balance, eq: acc.equity, pnl: acc.profit }
    let start: number|null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start)/1200, 1)
      const e = 1 - Math.pow(1-p, 3)
      setCounters({ bal: t.bal*e, eq: t.eq*e, pnl: t.pnl*e })
      if (p < 1) animRef.current = requestAnimationFrame(step)
    }
    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [selAcc])

  const lineOpts: any = {
    responsive:true, maintainAspectRatio:false,
    plugins:{ 
      legend:{display:false}, 
      tooltip:{ 
        backgroundColor: dark ? 'rgba(10,12,10,0.95)' : 'rgba(255,255,255,0.95)',
        titleColor: dark ? '#edf0ea' : '#1a1f36',
        bodyColor: dark ? '#9aad94' : '#6b7280',
        borderColor: dark ? 'rgba(63,203,27,0.35)' : 'rgba(63,203,27,0.2)',
        borderWidth:1, 
        padding:10, 
        cornerRadius:10, 
        callbacks:{ label:(ctx:any) => ' $'+ctx.raw.toLocaleString() } 
      } 
    },
    scales:{
      y:{ 
        grid:{ color: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)', drawBorder:false }, 
        ticks:{ color: dark ? '#556050' : '#9aa8a0', font:{size:11}, callback:(v:any)=>'$'+(v/1000).toFixed(0)+'k' }, 
        border:{display:false} 
      },
      x:{ 
        grid:{display:false}, 
        border:{display:false}, 
        ticks:{ color: dark ? '#556050' : '#9aa8a0', font:{size:11} } 
      },
    },
    interaction:{mode:'index',intersect:false},
  }

  const donutOpts: any = {
    responsive:true, maintainAspectRatio:false, cutout:'70%',
    plugins:{ 
      legend:{display:false}, 
      tooltip:{ 
        backgroundColor: dark ? 'rgba(10,12,10,0.95)' : 'rgba(255,255,255,0.95)',
        titleColor: dark ? '#edf0ea' : '#1a1f36',
        bodyColor: dark ? '#9aad94' : '#6b7280',
        borderColor: dark ? 'rgba(63,203,27,0.3)' : 'rgba(63,203,27,0.2)',
        borderWidth:1, 
        padding:10, 
        cornerRadius:10 
      } 
    },
  }

  if (!mounted) return null

  return (
    <div className={`fd ${dark ? 'fd--dark' : 'fd--light'}`}>

      {/* MOBILE OVERLAY */}
      {mobOpen && <div className="fd-mob-overlay" onClick={()=>setMobOpen(false)} />}

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className={`fd-sb ${mobOpen ? 'fd-sb--open' : ''}`}>

        {/* Logo */}
        <div className="fd-sb__logo">
          <div className="fd-sb__logo-icon">F</div>
          <div>
            <div className="fd-sb__logo-name">Foxnance</div>
            <div className="fd-sb__logo-sub">Client Portal</div>
          </div>
        </div>

        {/* User */}
        <div className="fd-sb__user">
          <div className="fd-sb__avatar">GZ</div>
          <div className="fd-sb__user-info">
            <span className="fd-sb__user-name">Gulam Zain</span>
            <span className="fd-sb__user-id">ID: FOX12345</span>
          </div>
          <BiUser size={16} className="fd-sb__user-edit" />
        </div>

        {/* Nav */}
        <nav className="fd-sb__nav">
          {NAV.map(section => (
            <div key={section.section} className="fd-sb__sec">
              <button
                className="fd-sb__sec-label"
                onClick={() => setExpanded(prev => { const n=new Set(prev); n.has(section.section)?n.delete(section.section):n.add(section.section); return n })}
              >
                {section.section}
                <BiChevronDown size={13} style={{transform: expanded.has(section.section)?'rotate(180deg)':'none', transition:'transform .25s'}} />
              </button>
              {expanded.has(section.section) && (
                <div className="fd-sb__sec-items">
                  {section.items.map(item => (
                    <Link key={item.href} href={item.href} className={`fd-sb__item ${item.active ? 'fd-sb__item--active' : ''}`}>
                      <item.icon size={17} />
                      <span>{item.label}</span>
                      {item.active && <span className="fd-sb__item-dot" />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Disconnect */}
        <button className="fd-sb__disconnect">
          <BiLogOut size={15} />
          <span>Disconnect MT5</span>
        </button>
      </aside>

      {/* ═══════════ MAIN ═══════════ */}
      <div className="fd-main">

        {/* CONTENT - Keep only the page-specific content, not the topbar since it's in layout */}
        <div className="fd-content">

          {/* ── WELCOME BANNER ── */}
          <div className="fd-welcome">
            <div className="fd-welcome__bg" />
            <div className="fd-welcome__grid-svg">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="wg2" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(63,203,27,0.06)" strokeWidth="1"/>
                </pattern></defs>
                <rect width="100%" height="100%" fill="url(#wg2)"/>
              </svg>
            </div>
            <div className="fd-welcome__left">
              <div className="fd-welcome__title">Welcome Back, Gulam Zain</div>
              <div className="fd-welcome__sub">Here's your trading overview</div>
            </div>
            <div className="fd-welcome__right">
              <div className="fd-welcome__kpi">
                <span className="fd-welcome__kpi-lbl">Total Balance</span>
                <span className="fd-welcome__kpi-val">${fmt(totBal)}</span>
              </div>
              <div className="fd-welcome__sep"/>
              <div className="fd-welcome__kpi">
                <span className="fd-welcome__kpi-lbl">Total Profit</span>
                <span className="fd-welcome__kpi-val fd-welcome__kpi-val--up">+${fmt(totPnl)}</span>
              </div>
            </div>
          </div>

          {/* ── ACCOUNT TABS ── */}
          <div className="fd-tabs">
            {accounts.map((a,i) => (
              <button key={a.id} onClick={()=>setSelAcc(i)} className={`fd-tab ${selAcc===i?'fd-tab--active':''}`}>
                <span className={`fd-tab__dot ${a.status==='Live'?'fd-tab__dot--live':'fd-tab__dot--demo'}`}/>
                {a.name}
              </button>
            ))}
          </div>

          {/* ── KPI CARDS ── */}
          <AnimatePresence mode="wait">
            <motion.div key={selAcc} className="fd-kpi-row"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              transition={{duration:.3,ease:[.16,1,.3,1]}}
            >
              <div className="fd-kpi">
                <div className="fd-kpi__lbl">Total Balance</div>
                <div className="fd-kpi__val">${fmt(counters.bal)}</div>
                <div className="fd-kpi__foot fd-kpi__foot--up">+${fmt2(acc.profit)} ({acc.profitPct}%)</div>
              </div>
              <div className="fd-kpi">
                <div className="fd-kpi__lbl">Total Equity</div>
                <div className="fd-kpi__val">${fmt(counters.eq)}</div>
                <div className="fd-kpi__foot">Margin: ${fmt2(acc.margin)}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── ACTION BUTTONS ── */}
          <div className="fd-actions">
            <button className="fd-act fd-act--dep" onClick={()=>{setShowDep(true);setAmount('');setMethod('')}}>
              + Deposit Funds
            </button>
            <button className="fd-act fd-act--wit" onClick={()=>{setShowWit(true);setAmount('');setMethod('')}}>
              - Withdraw Funds
            </button>
            <button className="fd-act fd-act--tra">
              ↗ Internal Transfer
            </button>
          </div>

          {/* ── CHARTS ROW ── */}
          <div className="fd-charts">

            {/* Balance History */}
            <div className="fd-chart-card fd-chart-card--line">
              <div className="fd-chart-card__head">
                <div>
                  <div className="fd-chart-card__title">Balance History</div>
                  <div className="fd-chart-card__sub">Account performance over time</div>
                </div>
                <div className="fd-periods">
                  {['1M','3M','1Y'].map(p => (
                    <button key={p} onClick={()=>setPeriod(p)} className={`fd-period ${period===p?'fd-period--active':''}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="fd-chart-card__body">
                <Line data={balanceHistory} options={lineOpts}/>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="fd-chart-card fd-chart-card--donut">
              <div className="fd-chart-card__title" style={{marginBottom:'16px'}}>Asset Allocation</div>
              <div className="fd-chart-card__donut">
                <Doughnut data={allocation} options={donutOpts}/>
              </div>
              <div className="fd-alloc-legend">
                {allocation.labels.map((lbl,i) => (
                  <span key={i} className="fd-alloc-item">
                    <span className="fd-alloc-dot" style={{background:allocColors[i]}}/>
                    {lbl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RECENT TRADES ── */}
          <div className="fd-trades">
            <div className="fd-trades__head">
              <span className="fd-trades__title">Recent Trades</span>
              <button className="fd-trades__view-all">View All →</button>
            </div>

            {/* Mobile */}
            <div className="fd-trades-mob">
              {recentTrades.map(t => (
                <div key={t.id} className="fd-trade-mob">
                  <span className="fd-trade-mob__flag">{t.flag}</span>
                  <div className="fd-trade-mob__info">
                    <strong>{t.symbol}</strong>
                    <span className={`fd-badge ${t.type==='Buy'?'fd-badge--buy':'fd-badge--sell'}`}>{t.type}</span>
                  </div>
                  <span className={`fd-trade-mob__pnl ${t.profit>=0?'fd-green':'fd-red'}`}>{t.profit>=0?'+':''}${t.profit.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className="fd-trades-tbl-wrap">
              <table className="fd-trades-tbl">
                <thead>
                  <tr>
                    <th>Symbol</th><th>Type</th><th>Volume</th>
                    <th>Open Price</th><th>Current</th><th>P&amp;L</th><th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((t,i) => (
                    <motion.tr key={t.id} className="fd-trade-row"
                      initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
                      transition={{delay:i*0.06,duration:.3}}
                    >
                      <td><div className="fd-sym-cell"><span className="fd-flag">{t.flag}</span><span className="fd-sym">{t.symbol}</span></div></td>
                      <td><span className={`fd-badge ${t.type==='Buy'?'fd-badge--buy':'fd-badge--sell'}`}>{t.type}</span></td>
                      <td className="fd-num">{t.volume}</td>
                      <td className="fd-num">{t.open}</td>
                      <td className="fd-num">{t.current}</td>
                      <td className={`fd-pnl ${t.profit>=0?'fd-green':'fd-red'}`}>{t.profit>=0?'+':''}${t.profit.toFixed(2)}</td>
                      <td className="fd-time"><BiTime size={11} style={{marginRight:4}}/>{t.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>{/* /fd-content */}
      </div>{/* /fd-main */}

      {/* ═══════════ DEPOSIT MODAL ═══════════ */}
      <AnimatePresence>
        {showDep && (
          <motion.div className="fd-modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowDep(false)}>
            <motion.div className="fd-modal" initial={{scale:.92,y:24,opacity:0}} animate={{scale:1,y:0,opacity:1}} exit={{scale:.94,opacity:0}} transition={{duration:.28,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()}>
              <div className="fd-modal__glow"/>
              <div className="fd-modal__head">
                <div className="fd-modal__icon fd-modal__icon--dep"><BiArrowFromLeft size={20}/></div>
                <div><div className="fd-modal__title">Deposit Funds</div><div className="fd-modal__sub">Instant deposits, no fees</div></div>
                <button className="fd-modal__close" onClick={()=>setShowDep(false)}><BiX size={20}/></button>
              </div>
              <div className="fd-modal__lbl">Select Payment Method</div>
              <div className="fd-modal__methods">
                {[{id:'card',label:'Credit Card',icon:'💳'},{id:'bank',label:'Bank Wire',icon:'🏦'},{id:'crypto',label:'Crypto',icon:'₿'},{id:'skrill',label:'Skrill',icon:'⚡'}].map(m=>(
                  <button key={m.id} className={`fd-modal__method ${method===m.id?'fd-modal__method--active':''}`} onClick={()=>setMethod(m.id)}>
                    <span style={{fontSize:'1.1rem'}}>{m.icon}</span><span>{m.label}</span>
                  </button>
                ))}
              </div>
              <div className="fd-modal__lbl">Amount</div>
              <div className="fd-modal__input-wrap"><span className="fd-modal__prefix">$</span><input type="number" placeholder="0.00" className="fd-modal__input" value={amount} onChange={e=>setAmount(e.target.value)}/></div>
              <div className="fd-modal__quick">{['100','500','1000','5000'].map(v=><button key={v} className="fd-modal__quick-btn" onClick={()=>setAmount(v)}>${v}</button>)}</div>
              <div className="fd-modal__footer">
                <button className="fd-modal__cancel" onClick={()=>setShowDep(false)}>Cancel</button>
                <button className="fd-modal__confirm"><BiCheck size={16}/>Confirm Deposit</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ WITHDRAW MODAL ═══════════ */}
      <AnimatePresence>
        {showWit && (
          <motion.div className="fd-modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowWit(false)}>
            <motion.div className="fd-modal" initial={{scale:.92,y:24,opacity:0}} animate={{scale:1,y:0,opacity:1}} exit={{scale:.94,opacity:0}} transition={{duration:.28,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()}>
              <div className="fd-modal__glow fd-modal__glow--red"/>
              <div className="fd-modal__head">
                <div className="fd-modal__icon fd-modal__icon--wit"><BiArrowToRight size={20}/></div>
                <div><div className="fd-modal__title">Withdraw Funds</div><div className="fd-modal__sub">Available: ${fmt2(acc.balance)}</div></div>
                <button className="fd-modal__close" onClick={()=>setShowWit(false)}><BiX size={20}/></button>
              </div>
              <div className="fd-modal__lbl">Select Withdrawal Method</div>
              <div className="fd-modal__methods">
                {[{id:'bank',label:'Bank Wire',icon:'🏦'},{id:'crypto',label:'Crypto',icon:'₿'},{id:'skrill',label:'Skrill',icon:'⚡'},{id:'neteller',label:'Neteller',icon:'🔵'}].map(m=>(
                  <button key={m.id} className={`fd-modal__method ${method===m.id?'fd-modal__method--active':''}`} onClick={()=>setMethod(m.id)}>
                    <span style={{fontSize:'1.1rem'}}>{m.icon}</span><span>{m.label}</span>
                  </button>
                ))}
              </div>
              <div className="fd-modal__lbl">Amount</div>
              <div className="fd-modal__input-wrap"><span className="fd-modal__prefix">$</span><input type="number" placeholder="0.00" className="fd-modal__input" value={amount} onChange={e=>setAmount(e.target.value)}/></div>
              <div className="fd-modal__quick">{['100','500','1000','5000'].map(v=><button key={v} className="fd-modal__quick-btn" onClick={()=>setAmount(v)}>${v}</button>)}</div>
              <div className="fd-modal__footer">
                <button className="fd-modal__cancel" onClick={()=>setShowWit(false)}>Cancel</button>
                <button className="fd-modal__confirm fd-modal__confirm--red"><BiCheck size={16}/>Confirm Withdrawal</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ STYLES - Only page-specific styles, theme is in layout ═══════════ */}
      <style jsx global>{`
        /* ── Page-specific styles that aren't in layout ── */
        .fd {
          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: 'Sora','DM Sans',system-ui,sans-serif;
          --g: #3fcb1b;
          --g-dk: #2e9c14;
          --red: #ef4444;
          --blue: #3b82f6;
          --profit: #10b981;
          --ease: cubic-bezier(.16,1,.3,1);
          --r: 14px;
        }

        .fd-main {
          flex: 1;
          margin-left: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
        }

        .fd-content {
          flex: 1;
          padding: 22px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .fd-content {
            padding: 14px 16px;
            gap: 12px;
          }
        }

        /* ── WELCOME ── */
        .fd-welcome {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, var(--welcome-bg-start, rgba(30,50,28,0.9)) 0%, var(--welcome-bg-end, rgba(20,32,18,0.95)) 100%);
          border: 1px solid var(--g-bdr, rgba(63,203,27,0.25));
          border-radius: 16px;
          padding: 22px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .fd-welcome__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 80% 50%, rgba(63,203,27,0.12) 0%, transparent 65%);
        }
        .fd-welcome__grid-svg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .fd-welcome__left {
          position: relative;
          z-index: 1;
        }
        .fd-welcome__title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary, #fff);
          letter-spacing: -.02em;
          margin-bottom: 4px;
          transition: color 0.3s ease;
        }
        .fd-welcome__sub {
          font-size: .74rem;
          color: var(--text-secondary, rgba(255,255,255,0.5));
          transition: color 0.3s ease;
        }
        .fd-welcome__right {
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
        }
        .fd-welcome__kpi {
          text-align: right;
        }
        .fd-welcome__kpi-lbl {
          display: block;
          font-size: .62rem;
          color: var(--text-secondary, rgba(255,255,255,0.45));
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .07em;
          margin-bottom: 3px;
          transition: color 0.3s ease;
        }
        .fd-welcome__kpi-val {
          display: block;
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--text-primary, #fff);
          letter-spacing: -.03em;
          transition: color 0.3s ease;
        }
        .fd-welcome__kpi-val--up {
          color: var(--g);
        }
        .fd-welcome__sep {
          width: 1px;
          height: 40px;
          background: var(--border-color, rgba(255,255,255,0.1));
          transition: background 0.3s ease;
        }

        /* ── TABS ── */
        .fd-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .fd-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 30px;
          color: var(--text-secondary, #556050);
          cursor: pointer;
          font-size: .82rem;
          font-weight: 600;
          transition: all .22s;
          font-family: inherit;
        }
        .fd-tab:hover {
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--text-primary, #edf0ea);
        }
        .fd-tab--active {
          background: var(--g-faint, rgba(63,203,27,0.09));
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--text-primary, #edf0ea);
        }
        .fd-tab__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .fd-tab__dot--live {
          background: var(--g);
          box-shadow: 0 0 0 3px rgba(63,203,27,.18);
          animation: liveDot 2s ease-in-out infinite;
        }
        .fd-tab__dot--demo {
          background: var(--blue);
        }
        @keyframes liveDot {
          0%,100%{box-shadow:0 0 0 0 rgba(63,203,27,.5);}
          50%{box-shadow:0 0 0 5px rgba(63,203,27,0);}
        }

        /* ── KPI ── */
        .fd-kpi-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 900px) {
          .fd-kpi-row {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .fd-kpi-row {
            grid-template-columns: 1fr;
          }
        }
        .fd-kpi {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: var(--r);
          padding: 22px 26px;
          transition: background .3s, border-color .3s, box-shadow .3s;
          box-shadow: var(--card-shadow, none);
        }
        .fd-kpi__lbl {
          font-size: .68rem;
          color: var(--text-secondary, #556050);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .07em;
          margin-bottom: 10px;
          transition: color 0.3s ease;
        }
        .fd-kpi__val {
          font-size: clamp(1.6rem,3vw,2.2rem);
          font-weight: 900;
          color: var(--text-primary, #edf0ea);
          letter-spacing: -.04em;
          margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
          transition: color 0.3s ease;
        }
        .fd-kpi__foot {
          font-size: .76rem;
          color: var(--text-secondary, #556050);
          transition: color 0.3s ease;
        }
        .fd-kpi__foot--up {
          color: var(--g);
          font-weight: 700;
        }

        /* ── ACTIONS ── */
        .fd-actions {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 12px;
        }
        @media (max-width: 768px) {
          .fd-actions {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
        .fd-act {
          padding: 15px 20px;
          border-radius: 12px;
          border: none;
          font-size: .88rem;
          font-weight: 800;
          cursor: pointer;
          font-family: inherit;
          transition: all .25s var(--ease);
          letter-spacing: -.01em;
        }
        .fd-act--dep {
          background: linear-gradient(135deg,#3fcb1b,#2e9c14);
          color: #000;
        }
        .fd-act--dep:hover {
          box-shadow: 0 8px 24px rgba(63,203,27,.35);
          transform: translateY(-2px);
        }
        .fd-act--wit {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: var(--red);
        }
        .fd-act--wit:hover {
          background: rgba(239,68,68,0.2);
          transform: translateY(-2px);
        }
        .fd-act--tra {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          color: var(--text-primary, #edf0ea);
        }
        .fd-act--tra:hover {
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          transform: translateY(-2px);
        }

        /* ── CHARTS ── */
        .fd-charts {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 14px;
        }
        @media (max-width: 1100px) {
          .fd-charts {
            grid-template-columns: 1fr;
          }
        }
        .fd-chart-card {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: var(--r);
          padding: 22px;
          transition: background .3s, border-color .3s, box-shadow .3s;
          box-shadow: var(--card-shadow, none);
        }
        .fd-chart-card__head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .fd-chart-card__title {
          font-size: .92rem;
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
          margin-bottom: 3px;
          transition: color 0.3s ease;
        }
        .fd-chart-card__sub {
          font-size: .68rem;
          color: var(--text-secondary, #556050);
          transition: color 0.3s ease;
        }
        .fd-chart-card__body {
          height: 240px;
        }
        @media(max-width:480px) {
          .fd-chart-card__body {
            height: 190px;
          }
        }
        .fd-periods {
          display: flex;
          gap: 5px;
        }
        .fd-period {
          padding: 4px 12px;
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 20px;
          color: var(--text-secondary, #556050);
          font-size: .68rem;
          cursor: pointer;
          background: transparent;
          font-family: inherit;
          transition: all .18s;
        }
        .fd-period--active {
          background: var(--g-faint, rgba(63,203,27,0.09));
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--g);
          font-weight: 700;
        }
        .fd-period:not(.fd-period--active):hover {
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--text-primary, #edf0ea);
        }

        /* ── DONUT ── */
        .fd-chart-card--donut {
          display: flex;
          flex-direction: column;
        }
        .fd-chart-card__donut {
          height: 200px;
          margin-bottom: 16px;
          flex-shrink: 0;
        }
        .fd-alloc-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
          justify-content: center;
          margin-top: auto;
        }
        .fd-alloc-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: .72rem;
          color: var(--text-secondary, #556050);
          transition: color 0.3s ease;
        }
        .fd-alloc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── TRADES ── */
        .fd-trades {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: var(--r);
          padding: 22px;
          transition: background .3s, border-color .3s, box-shadow .3s;
          box-shadow: var(--card-shadow, none);
        }
        .fd-trades__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .fd-trades__title {
          font-size: .92rem;
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
          transition: color 0.3s ease;
        }
        .fd-trades__view-all {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--g-faint, rgba(63,203,27,0.09));
          border: 1px solid var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--g);
          font-size: .74rem;
          font-weight: 700;
          padding: 5px 13px;
          border-radius: 20px;
          cursor: pointer;
          font-family: inherit;
          transition: all .18s;
        }
        .fd-trades__view-all:hover {
          background: rgba(63,203,27,.14);
        }

        /* Mobile trade cards */
        .fd-trades-mob {
          display: none;
          flex-direction: column;
          gap: 8px;
        }
        @media (max-width: 600px) {
          .fd-trades-mob {
            display: flex;
          }
          .fd-trades-tbl-wrap {
            display: none;
          }
        }
        .fd-trade-mob {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: var(--bg-secondary, #141914);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 11px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .fd-trade-mob__flag {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: var(--g-faint, rgba(63,203,27,0.09));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }
        .fd-trade-mob__info {
          flex: 1;
        }
        .fd-trade-mob__info strong {
          display: block;
          font-size: .83rem;
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
          margin-bottom: 3px;
          transition: color 0.3s ease;
        }
        .fd-trade-mob__pnl {
          font-size: .88rem;
          font-weight: 800;
        }

        /* Desktop table */
        .fd-trades-tbl-wrap {
          overflow-x: auto;
        }
        .fd-trades-tbl {
          width: 100%;
          border-collapse: collapse;
          min-width: 540px;
        }
        .fd-trades-tbl thead th {
          text-align: left;
          padding: 8px 12px;
          font-size: .63rem;
          color: var(--text-secondary, #556050);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .08em;
          border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.08));
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .fd-trade-row {
          transition: background .18s;
        }
        .fd-trade-row:hover {
          background: var(--g-faint, rgba(63,203,27,0.09));
        }
        .fd-trades-tbl td {
          padding: 12px;
          border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.08));
          transition: border-color 0.3s ease;
        }
        .fd-trades-tbl tr:last-child td {
          border-bottom: none;
        }
        .fd-sym-cell {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .fd-flag {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--g-faint, rgba(63,203,27,0.09));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
        .fd-sym {
          font-size: .83rem;
          font-weight: 700;
          color: var(--text-primary, #edf0ea);
          transition: color 0.3s ease;
        }
        .fd-badge {
          font-size: .64rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 10px;
        }
        .fd-badge--buy {
          background: var(--badge-buy-bg, rgba(63,203,27,0.12));
          color: var(--g);
        }
        .fd-badge--sell {
          background: var(--badge-sell-bg, rgba(239,68,68,0.12));
          color: var(--red);
        }
        .fd-num {
          font-size: .78rem;
          color: var(--text-secondary, #556050);
          font-variant-numeric: tabular-nums;
          transition: color 0.3s ease;
        }
        .fd-pnl {
          font-size: .82rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        .fd-time {
          font-size: .7rem;
          color: var(--text-secondary, #556050);
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }
        .fd-green {
          color: var(--profit) !important;
        }
        .fd-red {
          color: var(--red) !important;
        }

        /* ── MODAL ── */
        .fd-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.65);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .fd-modal {
          background: var(--bg-card, #1a201a);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 22px;
          padding: 28px;
          width: 100%;
          max-width: 440px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,.6);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .fd-modal__glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle,rgba(63,203,27,.15),transparent);
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
        }
        .fd-modal__glow--red {
          background: radial-gradient(circle,rgba(239,68,68,.12),transparent);
        }
        .fd-modal__head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }
        .fd-modal__icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fd-modal__icon--dep {
          background: rgba(63,203,27,.1);
          color: var(--g);
          border: 1px solid rgba(63,203,27,.22);
        }
        .fd-modal__icon--wit {
          background: rgba(239,68,68,.1);
          color: var(--red);
          border: 1px solid rgba(239,68,68,.2);
        }
        .fd-modal__title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary, #edf0ea);
          margin-bottom: 3px;
          transition: color 0.3s ease;
        }
        .fd-modal__sub {
          font-size: .73rem;
          color: var(--text-secondary, #556050);
          transition: color 0.3s ease;
        }
        .fd-modal__close {
          margin-left: auto;
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          background: transparent;
          color: var(--text-secondary, #556050);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s;
        }
        .fd-modal__close:hover {
          background: var(--g-faint, rgba(63,203,27,0.09));
          color: var(--text-primary, #edf0ea);
        }
        .fd-modal__lbl {
          font-size: .63rem;
          font-weight: 700;
          color: var(--text-secondary, #556050);
          text-transform: uppercase;
          letter-spacing: .1em;
          margin-bottom: 10px;
          display: block;
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }
        .fd-modal__methods {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 8px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 600px) {
          .fd-modal__methods {
            grid-template-columns: repeat(2,1fr);
          }
        }
        .fd-modal__method {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 10px 8px;
          background: var(--bg-secondary, #141914);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 11px;
          color: var(--text-secondary, #556050);
          cursor: pointer;
          font-size: .7rem;
          font-weight: 600;
          transition: all .2s;
          font-family: inherit;
        }
        .fd-modal__method:hover {
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--text-primary, #edf0ea);
        }
        .fd-modal__method--active {
          background: var(--g-faint, rgba(63,203,27,0.09));
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--g);
        }
        .fd-modal__input-wrap {
          position: relative;
          margin-bottom: 12px;
          z-index: 1;
        }
        .fd-modal__prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-secondary, #556050);
        }
        .fd-modal__input {
          width: 100%;
          padding: 13px 13px 13px 30px;
          background: var(--bg-secondary, #141914);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 12px;
          color: var(--text-primary, #edf0ea);
          font-size: 1.1rem;
          font-weight: 700;
          transition: border-color .2s;
          font-family: inherit;
        }
        .fd-modal__input:focus {
          outline: none;
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
        }
        .fd-modal__input::placeholder {
          color: var(--text-secondary, #556050);
          font-weight: 400;
        }
        .fd-modal__quick {
          display: flex;
          gap: 8px;
          margin-bottom: 22px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .fd-modal__quick-btn {
          padding: 6px 14px;
          background: var(--bg-secondary, #141914);
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 20px;
          color: var(--text-secondary, #556050);
          font-size: .74rem;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          font-family: inherit;
        }
        .fd-modal__quick-btn:hover {
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--g);
          background: var(--g-faint, rgba(63,203,27,0.09));
        }
        .fd-modal__footer {
          display: flex;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .fd-modal__cancel, .fd-modal__confirm {
          flex: 1;
          padding: 13px;
          border-radius: 12px;
          font-weight: 700;
          font-size: .86rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all .25s var(--ease);
          font-family: inherit;
        }
        .fd-modal__cancel {
          background: transparent;
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          color: var(--text-secondary, #556050);
        }
        .fd-modal__cancel:hover {
          border-color: var(--g-bdr, rgba(63,203,27,0.25));
          color: var(--text-primary, #edf0ea);
        }
        .fd-modal__confirm {
          background: linear-gradient(135deg,#3fcb1b,#2e9c14);
          color: #000;
          border: none;
        }
        .fd-modal__confirm:hover {
          box-shadow: 0 8px 24px rgba(63,203,27,.35);
          transform: translateY(-2px);
        }
        .fd-modal__confirm--red {
          background: linear-gradient(135deg,#ef4444,#dc2626);
          color: #fff;
        }
        .fd-modal__confirm--red:hover {
          box-shadow: 0 8px 24px rgba(239,68,68,.3);
        }

        /* ── RESPONSIVE ── */
        @media(max-width:768px) {
          .fd-sb {
            transform: translateX(-100%);
          }
          .fd-sb--open {
            transform: translateX(0);
          }
          .fd-main {
            margin-left: 0 !important;
          }
        }
        @media(max-width:600px) {
          .fd-welcome {
            flex-direction: column;
          }
          .fd-welcome__right {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  )
}