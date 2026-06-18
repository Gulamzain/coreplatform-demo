// src/app/dashboard/overview/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BiArrowToRight, BiArrowFromLeft, BiTransfer,
  BiTime, BiX, BiCheck, BiUser, BiCreditCard
} from 'react-icons/bi'
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
    pointBorderColor: 'var(--bg-card)', pointBorderWidth: 2,
    pointRadius: 4, pointHoverRadius: 7, borderWidth: 2.5,
  }],
}

const allocation = {
  labels: ['Forex','Commodities','Indices','Crypto','Stocks'],
  datasets: [{ data:[45,20,15,12,8], backgroundColor:['#3fcb1b','#f59e0b','#3b82f6','#8b5cf6','#ec489a'], borderWidth:0, hoverOffset:5 }],
}
const allocColors = ['#3fcb1b','#f59e0b','#3b82f6','#8b5cf6','#ec489a']

// ── COMPONENT ─────────────────────────────────────────────────────────────
export default function DashboardOverview() {
  const [selAcc,   setSelAcc]   = useState(0)
  const [showDep,  setShowDep]  = useState(false)
  const [showWit,  setShowWit]  = useState(false)
  const [amount,   setAmount]   = useState('')
  const [method,   setMethod]   = useState('')
  const [period,   setPeriod]   = useState('1M')
  const [counters, setCounters] = useState({ bal:0, eq:0, pnl:0 })
  const animRef = useRef<number>(0)

  const acc    = accounts[selAcc]
  const totBal = accounts.reduce((s,a) => s + a.balance, 0)
  const totPnl = accounts.reduce((s,a) => s + a.profit,  0)
  const fmt  = (n: number) => n.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})
  const fmt2 = (n: number) => n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})

  // animated counters
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
        backgroundColor:'rgba(10,12,10,0.95)', titleColor:'#edf0ea', bodyColor:'#9aad94',
        borderColor:'rgba(63,203,27,0.35)', borderWidth:1, padding:10, cornerRadius:10,
        callbacks:{ label:(ctx:any) => ' $'+ctx.raw.toLocaleString() }
      }
    },
    scales:{
      y:{ grid:{color:'rgba(128,128,128,0.08)',drawBorder:false}, ticks:{color:'#888',font:{size:11}, callback:(v:any)=>'$'+(v/1000).toFixed(0)+'k'}, border:{display:false} },
      x:{ grid:{display:false}, border:{display:false}, ticks:{color:'#888',font:{size:11}} },
    },
    interaction:{mode:'index',intersect:false},
  }

  const donutOpts: any = {
    responsive:true, maintainAspectRatio:false, cutout:'70%',
    plugins:{
      legend:{display:false},
      tooltip:{
        backgroundColor:'rgba(10,12,10,0.95)', titleColor:'#edf0ea', bodyColor:'#9aad94',
        borderColor:'rgba(63,203,27,0.3)', borderWidth:1, padding:10, cornerRadius:10
      }
    },
  }

  return (
    <div className="ov-wrap">

      {/* ── WELCOME BANNER ── */}
      <div className="ov-welcome">
        <div className="ov-welcome__bg" />
        <div className="ov-welcome__grid">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ovg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(63,203,27,0.06)" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#ovg)"/>
          </svg>
        </div>
        <div className="ov-welcome__left">
          <div className="ov-welcome__title">Welcome Back, Gulam Zain</div>
          <div className="ov-welcome__sub">Here's your trading overview for today</div>
        </div>
        <div className="ov-welcome__right">
          <div className="ov-welcome__kpi">
            <span className="ov-welcome__kpi-lbl">Total Balance</span>
            <span className="ov-welcome__kpi-val">${fmt(totBal)}</span>
          </div>
          <div className="ov-welcome__sep"/>
          <div className="ov-welcome__kpi">
            <span className="ov-welcome__kpi-lbl">Total Profit</span>
            <span className="ov-welcome__kpi-val ov-welcome__kpi-val--up">+${fmt(totPnl)}</span>
          </div>
        </div>
      </div>

      {/* ── ACCOUNT TABS ── */}
      <div className="ov-tabs">
        {accounts.map((a,i) => (
          <button key={a.id} onClick={()=>setSelAcc(i)} className={`ov-tab ${selAcc===i?'ov-tab--active':''}`}>
            <span className={`ov-tab__dot ${a.status==='Live'?'ov-tab__dot--live':'ov-tab__dot--demo'}`}/>
            {a.name}
            <span className="ov-tab__badge">{a.type}</span>
          </button>
        ))}
      </div>

      {/* ── KPI CARDS ── */}
      <AnimatePresence mode="wait">
        <motion.div key={selAcc} className="ov-kpi-row"
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
          transition={{duration:.3,ease:[.16,1,.3,1]}}
        >
          <div className="ov-kpi">
            <div className="ov-kpi__lbl">Balance</div>
            <div className="ov-kpi__val">${fmt(counters.bal)}</div>
            <div className="ov-kpi__foot ov-kpi__foot--up">+${fmt2(acc.profit)} ({acc.profitPct}%)</div>
          </div>
          <div className="ov-kpi">
            <div className="ov-kpi__lbl">Equity</div>
            <div className="ov-kpi__val">${fmt(counters.eq)}</div>
            <div className="ov-kpi__foot">Margin: ${fmt2(acc.margin)}</div>
          </div>
          <div className="ov-kpi">
            <div className="ov-kpi__lbl">P&amp;L</div>
            <div className="ov-kpi__val ov-kpi__val--up">+${fmt2(counters.pnl)}</div>
            <div className="ov-kpi__foot">Margin Level: {acc.marginLevel}%</div>
          </div>
          <div className="ov-kpi">
            <div className="ov-kpi__lbl">Free Margin</div>
            <div className="ov-kpi__val">${fmt(acc.freeMargin)}</div>
            <div className="ov-kpi__foot">Status: <span className={acc.status==='Live'?'ov-live':'ov-demo'}>{acc.status}</span></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── ACTION BUTTONS ── */}
      <div className="ov-actions">
        <button className="ov-act ov-act--dep" onClick={()=>{setShowDep(true);setAmount('');setMethod('')}}>
          <BiArrowFromLeft size={18}/> Deposit Funds
        </button>
        <button className="ov-act ov-act--wit" onClick={()=>{setShowWit(true);setAmount('');setMethod('')}}>
          <BiArrowToRight size={18}/> Withdraw Funds
        </button>
        <button className="ov-act ov-act--tra">
          <BiTransfer size={18}/> Internal Transfer
        </button>
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="ov-charts">
        {/* Balance History */}
        <div className="ov-chart-card ov-chart-card--line">
          <div className="ov-chart-card__head">
            <div>
              <div className="ov-chart-card__title">Balance History</div>
              <div className="ov-chart-card__sub">Account performance over time</div>
            </div>
            <div className="ov-periods">
              {['1M','3M','1Y'].map(p => (
                <button key={p} onClick={()=>setPeriod(p)} className={`ov-period ${period===p?'ov-period--active':''}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="ov-chart-card__body">
            <Line data={balanceHistory} options={lineOpts}/>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="ov-chart-card ov-chart-card--donut">
          <div className="ov-chart-card__title" style={{marginBottom:'16px'}}>Asset Allocation</div>
          <div className="ov-chart-card__donut">
            <Doughnut data={allocation} options={donutOpts}/>
          </div>
          <div className="ov-alloc-legend">
            {allocation.labels.map((lbl,i) => (
              <span key={i} className="ov-alloc-item">
                <span className="ov-alloc-dot" style={{background:allocColors[i]}}/>
                {lbl} <strong>{allocation.datasets[0].data[i]}%</strong>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENT TRADES ── */}
      <div className="ov-trades">
        <div className="ov-trades__head">
          <span className="ov-trades__title">Recent Trades</span>
          <button className="ov-trades__view-all">View All →</button>
        </div>

        {/* Mobile cards */}
        <div className="ov-trades-mob">
          {recentTrades.map(t => (
            <div key={t.id} className="ov-trade-mob">
              <span className="ov-trade-mob__flag">{t.flag}</span>
              <div className="ov-trade-mob__info">
                <strong>{t.symbol}</strong>
                <div className="ov-trade-mob__meta">
                  <span className={`ov-badge ${t.type==='Buy'?'ov-badge--buy':'ov-badge--sell'}`}>{t.type}</span>
                  <span className="ov-trade-mob__vol">Vol: {t.volume}</span>
                </div>
              </div>
              <span className={`ov-trade-mob__pnl ${t.profit>=0?'ov-green':'ov-red'}`}>
                {t.profit>=0?'+':''}${t.profit.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="ov-trades-tbl-wrap">
          <table className="ov-trades-tbl">
            <thead>
              <tr>
                <th>Symbol</th><th>Type</th><th>Volume</th>
                <th>Open Price</th><th>Current</th><th>P&amp;L</th><th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((t,i) => (
                <motion.tr key={t.id} className="ov-trade-row"
                  initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
                  transition={{delay:i*0.06,duration:.3}}
                >
                  <td>
                    <div className="ov-sym-cell">
                      <span className="ov-flag">{t.flag}</span>
                      <span className="ov-sym">{t.symbol}</span>
                    </div>
                  </td>
                  <td><span className={`ov-badge ${t.type==='Buy'?'ov-badge--buy':'ov-badge--sell'}`}>{t.type}</span></td>
                  <td className="ov-num">{t.volume}</td>
                  <td className="ov-num">{t.open}</td>
                  <td className="ov-num">{t.current}</td>
                  <td className={`ov-pnl ${t.profit>=0?'ov-green':'ov-red'}`}>{t.profit>=0?'+':''}${t.profit.toFixed(2)}</td>
                  <td className="ov-time"><BiTime size={11} style={{marginRight:4}}/>{t.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════ DEPOSIT MODAL ═══════════ */}
      <AnimatePresence>
        {showDep && (
          <motion.div className="ov-modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowDep(false)}>
            <motion.div className="ov-modal" initial={{scale:.92,y:24,opacity:0}} animate={{scale:1,y:0,opacity:1}} exit={{scale:.94,opacity:0}} transition={{duration:.28,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()}>
              <div className="ov-modal__glow"/>
              <div className="ov-modal__head">
                <div className="ov-modal__icon ov-modal__icon--dep"><BiArrowFromLeft size={20}/></div>
                <div><div className="ov-modal__title">Deposit Funds</div><div className="ov-modal__sub">Instant deposits, no fees</div></div>
                <button className="ov-modal__close" onClick={()=>setShowDep(false)}><BiX size={20}/></button>
              </div>
              <span className="ov-modal__lbl">Select Payment Method</span>
              <div className="ov-modal__methods">
                {[{id:'card',label:'Credit Card',icon:'💳'},{id:'bank',label:'Bank Wire',icon:'🏦'},{id:'crypto',label:'Crypto',icon:'₿'},{id:'skrill',label:'Skrill',icon:'⚡'}].map(m=>(
                  <button key={m.id} className={`ov-modal__method ${method===m.id?'ov-modal__method--active':''}`} onClick={()=>setMethod(m.id)}>
                    <span style={{fontSize:'1.1rem'}}>{m.icon}</span><span>{m.label}</span>
                  </button>
                ))}
              </div>
              <span className="ov-modal__lbl">Amount</span>
              <div className="ov-modal__input-wrap">
                <span className="ov-modal__prefix">$</span>
                <input type="number" placeholder="0.00" className="ov-modal__input" value={amount} onChange={e=>setAmount(e.target.value)}/>
              </div>
              <div className="ov-modal__quick">
                {['100','500','1000','5000'].map(v=><button key={v} className="ov-modal__quick-btn" onClick={()=>setAmount(v)}>${v}</button>)}
              </div>
              <div className="ov-modal__footer">
                <button className="ov-modal__cancel" onClick={()=>setShowDep(false)}>Cancel</button>
                <button className="ov-modal__confirm"><BiCheck size={16}/>Confirm Deposit</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ WITHDRAW MODAL ═══════════ */}
      <AnimatePresence>
        {showWit && (
          <motion.div className="ov-modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowWit(false)}>
            <motion.div className="ov-modal" initial={{scale:.92,y:24,opacity:0}} animate={{scale:1,y:0,opacity:1}} exit={{scale:.94,opacity:0}} transition={{duration:.28,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()}>
              <div className="ov-modal__glow ov-modal__glow--red"/>
              <div className="ov-modal__head">
                <div className="ov-modal__icon ov-modal__icon--wit"><BiArrowToRight size={20}/></div>
                <div><div className="ov-modal__title">Withdraw Funds</div><div className="ov-modal__sub">Available: ${fmt2(acc.balance)}</div></div>
                <button className="ov-modal__close" onClick={()=>setShowWit(false)}><BiX size={20}/></button>
              </div>
              <span className="ov-modal__lbl">Select Withdrawal Method</span>
              <div className="ov-modal__methods">
                {[{id:'bank',label:'Bank Wire',icon:'🏦'},{id:'crypto',label:'Crypto',icon:'₿'},{id:'skrill',label:'Skrill',icon:'⚡'},{id:'neteller',label:'Neteller',icon:'🔵'}].map(m=>(
                  <button key={m.id} className={`ov-modal__method ${method===m.id?'ov-modal__method--active':''}`} onClick={()=>setMethod(m.id)}>
                    <span style={{fontSize:'1.1rem'}}>{m.icon}</span><span>{m.label}</span>
                  </button>
                ))}
              </div>
              <span className="ov-modal__lbl">Amount</span>
              <div className="ov-modal__input-wrap">
                <span className="ov-modal__prefix">$</span>
                <input type="number" placeholder="0.00" className="ov-modal__input" value={amount} onChange={e=>setAmount(e.target.value)}/>
              </div>
              <div className="ov-modal__quick">
                {['100','500','1000','5000'].map(v=><button key={v} className="ov-modal__quick-btn" onClick={()=>setAmount(v)}>${v}</button>)}
              </div>
              <div className="ov-modal__footer">
                <button className="ov-modal__cancel" onClick={()=>setShowWit(false)}>Cancel</button>
                <button className="ov-modal__confirm ov-modal__confirm--red"><BiCheck size={16}/>Confirm Withdrawal</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STYLES ── */}
      <style jsx global>{`
        /* ── OVERVIEW WRAP ── */
        .ov-wrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
          --g:       #3fcb1b;
          --g-dk:    #2e9c14;
          --g-faint: rgba(63,203,27,0.09);
          --g-bdr:   rgba(63,203,27,0.25);
          --red:     #ef4444;
          --blue:    #3b82f6;
          --profit:  #10b981;
          --ease:    cubic-bezier(.16,1,.3,1);
          --r:       12px;
        }
        .ov-wrap * { box-sizing: border-box; }

        /* ── WELCOME ── */
        .ov-welcome {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, rgba(30,50,28,0.9) 0%, rgba(20,32,18,0.95) 100%);
          border: 1px solid var(--g-bdr); border-radius: 16px;
          padding: 22px 28px; display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 14px;
        }
        [data-theme="light"] .ov-welcome {
          background: linear-gradient(135deg, #1e3a1c 0%, #162914 100%);
        }
        .ov-welcome__bg {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse at 80% 50%, rgba(63,203,27,0.14) 0%, transparent 65%);
        }
        .ov-welcome__grid { position: absolute; inset: 0; pointer-events: none; }
        .ov-welcome__left { position: relative; z-index: 1; }
        .ov-welcome__title { font-size: 1.05rem; font-weight: 800; color: #fff; letter-spacing: -.02em; margin-bottom: 4px; }
        .ov-welcome__sub   { font-size: .74rem; color: rgba(255,255,255,0.5); }
        .ov-welcome__right { display: flex; align-items: center; gap: 24px; position: relative; z-index: 1; }
        .ov-welcome__kpi   { text-align: right; }
        .ov-welcome__kpi-lbl { display: block; font-size: .62rem; color: rgba(255,255,255,0.45); font-weight: 600; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 3px; }
        .ov-welcome__kpi-val { display: block; font-size: 1.2rem; font-weight: 900; color: #fff; letter-spacing: -.03em; }
        .ov-welcome__kpi-val--up { color: var(--g); }
        .ov-welcome__sep { width: 1px; height: 38px; background: rgba(255,255,255,0.12); }
        @media(max-width:600px) {
          .ov-welcome { flex-direction: column; padding: 18px 20px; }
          .ov-welcome__right { width: 100%; justify-content: flex-start; }
          .ov-welcome__kpi { text-align: left; }
        }

        /* ── TABS ── */
        .ov-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .ov-tab {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; background: var(--bg-card); border: 1px solid var(--border-color);
          border-radius: 30px; color: var(--text-secondary); cursor: pointer;
          font-size: .8rem; font-weight: 600; transition: all .22s; font-family: inherit;
        }
        .ov-tab--active { background: var(--g-faint); border-color: var(--g-bdr); color: var(--text-primary); }
        .ov-tab__dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .ov-tab__dot--live { background: var(--g); box-shadow: 0 0 0 3px rgba(63,203,27,.18); animation: liveDot 2s ease-in-out infinite; }
        .ov-tab__dot--demo { background: var(--blue); }
        .ov-tab__badge { font-size: .62rem; padding: 2px 7px; background: rgba(128,128,128,0.12); border-radius: 10px; color: var(--text-secondary); }
        @keyframes liveDot { 0%,100%{box-shadow:0 0 0 0 rgba(63,203,27,.5);} 50%{box-shadow:0 0 0 5px rgba(63,203,27,0);} }

        /* ── KPI ── */
        .ov-kpi-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        @media(max-width:1000px) { .ov-kpi-row { grid-template-columns: 1fr 1fr; } }
        @media(max-width:480px)  { .ov-kpi-row { grid-template-columns: 1fr; } }

        .ov-kpi {
          background: var(--bg-card); border: 1px solid var(--border-color);
          border-radius: var(--r); padding: 20px 22px;
          transition: background .3s, border-color .3s;
        }
        .ov-kpi__lbl { font-size: .65rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 8px; }
        .ov-kpi__val { font-size: clamp(1.4rem,2.5vw,1.9rem); font-weight: 900; color: var(--text-primary); letter-spacing: -.04em; margin-bottom: 6px; font-variant-numeric: tabular-nums; }
        .ov-kpi__val--up { color: var(--g); }
        .ov-kpi__foot { font-size: .72rem; color: var(--text-secondary); }
        .ov-kpi__foot--up { color: var(--g); font-weight: 700; }
        .ov-live { color: var(--g); font-weight: 700; }
        .ov-demo { color: var(--blue); font-weight: 700; }

        /* ── ACTIONS ── */
        .ov-actions { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
        @media(max-width:600px) { .ov-actions { grid-template-columns: 1fr; } }
        .ov-act {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 18px; border-radius: 10px; border: none;
          font-size: .86rem; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: all .25s var(--ease); letter-spacing: -.01em;
        }
        .ov-act--dep { background: linear-gradient(135deg,#3fcb1b,#2e9c14); color: #000; }
        .ov-act--dep:hover { box-shadow: 0 8px 24px rgba(63,203,27,.35); transform: translateY(-2px); }
        .ov-act--wit { background: rgba(90,20,20,0.65); border: 1px solid rgba(239,68,68,0.3); color: #f87171; }
        [data-theme="light"] .ov-act--wit { background: rgba(254,226,226,0.8); color: #dc2626; border-color: rgba(239,68,68,0.3); }
        .ov-act--wit:hover { transform: translateY(-2px); }
        .ov-act--tra { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-primary); }
        .ov-act--tra:hover { border-color: var(--text-secondary); transform: translateY(-2px); }

        /* ── CHARTS ── */
        .ov-charts { display: grid; grid-template-columns: 1.55fr 1fr; gap: 14px; }
        @media(max-width:1000px) { .ov-charts { grid-template-columns: 1fr; } }

        .ov-chart-card {
          background: var(--bg-card); border: 1px solid var(--border-color);
          border-radius: var(--r); padding: 20px;
          transition: background .3s, border-color .3s;
        }
        .ov-chart-card--donut { display: flex; flex-direction: column; }
        .ov-chart-card__head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
        .ov-chart-card__title { font-size: .88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
        .ov-chart-card__sub   { font-size: .66rem; color: var(--text-secondary); }
        .ov-chart-card__body  { height: 230px; }
        .ov-chart-card__donut { height: 190px; margin-bottom: 14px; flex-shrink: 0; }
        @media(max-width:480px) {
          .ov-chart-card__body  { height: 185px; }
          .ov-chart-card__donut { height: 160px; }
        }

        .ov-periods { display: flex; gap: 5px; }
        .ov-period {
          padding: 4px 11px; border: 1px solid var(--border-color); border-radius: 20px;
          color: var(--text-secondary); font-size: .67rem; cursor: pointer;
          background: transparent; font-family: inherit; transition: all .18s;
        }
        .ov-period--active { background: var(--g-faint); border-color: var(--g-bdr); color: var(--g); font-weight: 700; }
        .ov-period:not(.ov-period--active):hover { border-color: var(--text-secondary); color: var(--text-primary); }

        .ov-alloc-legend { display: flex; flex-wrap: wrap; gap: 8px 14px; justify-content: center; margin-top: auto; padding-top: 8px; }
        .ov-alloc-item { display: inline-flex; align-items: center; gap: 5px; font-size: .71rem; color: var(--text-secondary); }
        .ov-alloc-item strong { color: var(--text-primary); }
        .ov-alloc-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        /* ── TRADES ── */
        .ov-trades {
          background: var(--bg-card); border: 1px solid var(--border-color);
          border-radius: var(--r); padding: 20px;
          transition: background .3s, border-color .3s;
        }
        .ov-trades__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .ov-trades__title { font-size: .88rem; font-weight: 700; color: var(--text-primary); }
        .ov-trades__view-all {
          display: inline-flex; align-items: center; gap: 4px;
          background: var(--g-faint); border: 1px solid var(--g-bdr);
          color: var(--g); font-size: .72rem; font-weight: 700;
          padding: 5px 12px; border-radius: 20px; cursor: pointer;
          font-family: inherit; transition: all .18s; background-color: var(--g-faint);
        }
        .ov-trades__view-all:hover { background: rgba(63,203,27,.14); }

        /* Mobile trade cards */
        .ov-trades-mob { display: none; flex-direction: column; gap: 8px; }
        .ov-trade-mob { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--bg-secondary, var(--hover-bg)); border: 1px solid var(--border-color); border-radius: 10px; }
        .ov-trade-mob__flag { width: 32px; height: 32px; border-radius: 9px; background: rgba(128,128,128,0.1); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
        .ov-trade-mob__info { flex: 1; }
        .ov-trade-mob__info strong { display: block; font-size: .83rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        .ov-trade-mob__meta { display: flex; align-items: center; gap: 8px; }
        .ov-trade-mob__vol { font-size: .68rem; color: var(--text-secondary); }
        .ov-trade-mob__pnl { font-size: .88rem; font-weight: 800; }

        /* Desktop table */
        .ov-trades-tbl-wrap { overflow-x: auto; }
        .ov-trades-tbl { width: 100%; border-collapse: collapse; min-width: 520px; }
        .ov-trades-tbl thead th { text-align: left; padding: 8px 12px; font-size: .62rem; color: var(--text-secondary); font-weight: 700; text-transform: uppercase; letter-spacing: .08em; border-bottom: 1px solid var(--border-color); }
        .ov-trade-row { transition: background .18s; }
        .ov-trade-row:hover { background: var(--hover-bg); }
        .ov-trades-tbl td { padding: 11px 12px; border-bottom: 1px solid var(--border-color); }
        .ov-trades-tbl tr:last-child td { border-bottom: none; }
        .ov-sym-cell { display: flex; align-items: center; gap: 9px; }
        .ov-flag { width: 28px; height: 28px; border-radius: 8px; background: rgba(128,128,128,0.1); display: flex; align-items: center; justify-content: center; font-size: 13px; }
        .ov-sym  { font-size: .82rem; font-weight: 700; color: var(--text-primary); }
        .ov-badge { font-size: .63rem; font-weight: 700; padding: 3px 9px; border-radius: 10px; }
        .ov-badge--buy  { background: rgba(63,203,27,.12);  color: var(--g); }
        .ov-badge--sell { background: rgba(239,68,68,.12);  color: var(--red); }
        .ov-num  { font-size: .77rem; color: var(--text-secondary); font-variant-numeric: tabular-nums; }
        .ov-pnl  { font-size: .81rem; font-weight: 700; font-variant-numeric: tabular-nums; }
        .ov-time { font-size: .69rem; color: var(--text-secondary); display: flex; align-items: center; }
        .ov-green { color: var(--profit) !important; }
        .ov-red   { color: var(--red) !important; }

        @media(max-width:600px) {
          .ov-trades-mob { display: flex; }
          .ov-trades-tbl-wrap { display: none; }
        }

        /* ── MODAL ── */
        .ov-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.65);
          backdrop-filter: blur(6px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .ov-modal {
          background: var(--bg-card); border: 1px solid var(--border-color);
          border-radius: 20px; padding: 26px; width: 100%; max-width: 430px;
          position: relative; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,.5);
        }
        [data-theme="light"] .ov-modal { box-shadow: 0 20px 60px rgba(0,0,0,.15); }
        .ov-modal__glow { position: absolute; top:-60px; right:-60px; width:200px; height:200px; background: radial-gradient(circle,rgba(63,203,27,.15),transparent); border-radius:50%; filter:blur(40px); pointer-events:none; }
        .ov-modal__glow--red { background: radial-gradient(circle,rgba(239,68,68,.12),transparent); }
        .ov-modal__head { display:flex; align-items:center; gap:13px; margin-bottom:20px; position:relative; z-index:1; }
        .ov-modal__icon { width:42px; height:42px; border-radius:11px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .ov-modal__icon--dep { background:rgba(63,203,27,.1); color:var(--g); border:1px solid rgba(63,203,27,.22); }
        .ov-modal__icon--wit { background:rgba(239,68,68,.1); color:var(--red); border:1px solid rgba(239,68,68,.2); }
        .ov-modal__title { font-size:1.05rem; font-weight:800; color:var(--text-primary); margin-bottom:2px; }
        .ov-modal__sub   { font-size:.71rem; color:var(--text-secondary); }
        .ov-modal__close { margin-left:auto; flex-shrink:0; width:30px; height:30px; border-radius:8px; border:1px solid var(--border-color); background:transparent; color:var(--text-secondary); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; }
        .ov-modal__close:hover { background:var(--hover-bg); color:var(--text-primary); }
        .ov-modal__lbl { font-size:.62rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.1em; margin-bottom:10px; display:block; position:relative; z-index:1; }
        .ov-modal__methods { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:18px; position:relative; z-index:1; }
        @media(max-width:480px) { .ov-modal__methods { grid-template-columns:repeat(2,1fr); } }
        .ov-modal__method { display:flex; flex-direction:column; align-items:center; gap:5px; padding:10px 8px; background:var(--bg-secondary,var(--hover-bg)); border:1px solid var(--border-color); border-radius:10px; color:var(--text-secondary); cursor:pointer; font-size:.69rem; font-weight:600; transition:all .2s; font-family:inherit; }
        .ov-modal__method:hover { border-color:var(--text-secondary); color:var(--text-primary); }
        .ov-modal__method--active { background:var(--g-faint); border-color:var(--g-bdr); color:var(--g); }
        .ov-modal__input-wrap { position:relative; margin-bottom:11px; z-index:1; }
        .ov-modal__prefix { position:absolute; left:13px; top:50%; transform:translateY(-50%); font-size:1rem; font-weight:700; color:var(--text-secondary); }
        .ov-modal__input { width:100%; padding:12px 12px 12px 28px; background:var(--bg-secondary,var(--hover-bg)); border:1px solid var(--border-color); border-radius:11px; color:var(--text-primary); font-size:1.05rem; font-weight:700; transition:border-color .2s; font-family:inherit; }
        .ov-modal__input:focus { outline:none; border-color:var(--g-bdr); }
        .ov-modal__input::placeholder { color:var(--text-secondary); font-weight:400; }
        .ov-modal__quick { display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap; position:relative; z-index:1; }
        .ov-modal__quick-btn { padding:5px 13px; background:var(--bg-secondary,var(--hover-bg)); border:1px solid var(--border-color); border-radius:20px; color:var(--text-secondary); font-size:.72rem; font-weight:700; cursor:pointer; transition:all .2s; font-family:inherit; }
        .ov-modal__quick-btn:hover { border-color:var(--g-bdr); color:var(--g); background:var(--g-faint); }
        .ov-modal__footer { display:flex; gap:10px; position:relative; z-index:1; }
        .ov-modal__cancel, .ov-modal__confirm { flex:1; padding:12px; border-radius:11px; font-weight:700; font-size:.84rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:all .25s; font-family:inherit; }
        .ov-modal__cancel { background:transparent; border:1px solid var(--border-color); color:var(--text-secondary); }
        .ov-modal__cancel:hover { border-color:var(--text-secondary); color:var(--text-primary); }
        .ov-modal__confirm { background:linear-gradient(135deg,#3fcb1b,#2e9c14); color:#000; border:none; }
        .ov-modal__confirm:hover { box-shadow:0 8px 24px rgba(63,203,27,.35); transform:translateY(-2px); }
        .ov-modal__confirm--red { background:linear-gradient(135deg,#ef4444,#dc2626); color:#fff; }
        .ov-modal__confirm--red:hover { box-shadow:0 8px 24px rgba(239,68,68,.3); }
      `}</style>
    </div>
  )
}