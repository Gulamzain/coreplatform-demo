// src/app/(marketing)/accounts/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  BiDollar, BiShield, BiGlobe, BiLineChart, BiSupport,
  BiTrendingUp, BiLock, BiCheck, BiStar, BiTransfer,
  BiBarChartAlt2, BiWallet, BiGroup, BiRocket, BiTime,
} from 'react-icons/bi';
import {
  FiArrowRight, FiCheck, FiX, FiZap, FiActivity,
  FiShield, FiGlobe, FiTrendingUp, FiChevronDown, FiChevronUp,
} from 'react-icons/fi';

const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

// ── DATA ─────────────────────────────────────────────────────────────────
const accountGroups = [
  {
    id: 'raw', label: 'ECN / Raw Spread', emoji: '⚡',
    tagline: 'Pure ECN pricing — spreads from 0.0 pips',
    color: '#3fcb1b',
    accounts: [
      {
        id: 'standard', name: 'Standard', badge: null,
        tagline: 'Simple & powerful for every trader',
        spread: '1.0 pip', commission: '$0', minDeposit: '$200',
        leverage: '1:500', execution: 'Market', swapFree: true, hedging: true, scalping: true,
        highlight: false, recommended: false,
      },
      {
        id: 'raw', name: 'Raw Spread', badge: 'Most Popular',
        tagline: 'Ultra-low spreads with transparent commission',
        spread: '0.0 pips', commission: '$6/lot', minDeposit: '$500',
        leverage: '1:500', execution: 'Market', swapFree: true, hedging: true, scalping: true,
        highlight: true, recommended: true,
      },
      {
        id: 'pro', name: 'Pro', badge: 'For Experts',
        tagline: 'Institutional conditions for serious traders',
        spread: '0.0 pips', commission: '$4/lot', minDeposit: '$5,000',
        leverage: '1:200', execution: 'Market', swapFree: true, hedging: true, scalping: true,
        highlight: false, recommended: false,
      },
    ],
  },
  {
    id: 'zero', label: 'Zero Commission', emoji: '🎯',
    tagline: 'No commission — simple transparent pricing',
    color: '#3b82f6',
    accounts: [
      {
        id: 'starter', name: 'Starter', badge: 'Best for Beginners',
        tagline: 'Your first step into live trading',
        spread: '1.5 pips', commission: '$0', minDeposit: '$50',
        leverage: '1:500', execution: 'Market', swapFree: true, hedging: true, scalping: false,
        highlight: false, recommended: false,
      },
      {
        id: 'growth', name: 'Growth', badge: null,
        tagline: 'Tighter spreads as your volume scales',
        spread: '0.8 pips', commission: '$0', minDeposit: '$1,000',
        leverage: '1:500', execution: 'Market', swapFree: true, hedging: true, scalping: true,
        highlight: true, recommended: true,
      },
      {
        id: 'elite', name: 'Elite', badge: 'Premium',
        tagline: 'Elite conditions with zero commission',
        spread: '0.4 pips', commission: '$0', minDeposit: '$10,000',
        leverage: '1:200', execution: 'Market', swapFree: true, hedging: true, scalping: true,
        highlight: false, recommended: false,
      },
    ],
  },
];

const compareRows = [
  { label: 'Min Deposit',  key: 'minDeposit' },
  { label: 'Spreads From', key: 'spread' },
  { label: 'Commission',   key: 'commission' },
  { label: 'Max Leverage', key: 'leverage' },
  { label: 'Execution',    key: 'execution' },
  { label: 'Swap-Free',    key: 'swapFree',  bool: true },
  { label: 'Hedging',      key: 'hedging',   bool: true },
  { label: 'Scalping',     key: 'scalping',  bool: true },
];

const platformFeatures = [
  { icon: <FiZap size={22}/>,       title: 'Sub-40ms Execution',   desc: 'No dealing desk. Orders fill in under 40 milliseconds on average.' },
  { icon: <FiShield size={22}/>,    title: 'FCA & ASIC Regulated', desc: 'Client funds held in segregated accounts at Tier-1 banks.' },
  { icon: <BiBarChartAlt2 size={22}/>, title: '2,250+ Instruments',desc: 'Forex, Stocks, Indices, Commodities, Crypto CFDs.' },
  { icon: <BiGlobe size={22}/>,     title: 'Global Coverage',      desc: 'Serve clients across 40+ countries with local payment methods.' },
  { icon: <BiSupport size={22}/>,   title: '24/7 Expert Support',  desc: 'Multilingual support team available every hour, every day.' },
  { icon: <BiWallet size={22}/>,    title: 'Instant Deposits',     desc: 'Fund your account instantly via cards, e-wallets, or crypto.' },
];

// Only Standard, Raw Spread, and Elite for compare section
const compareAccounts = [
  {
    id: 'standard', name: 'Standard', badge: null,
    tagline: 'Simple & powerful for every trader',
    spread: '1.0 pip', commission: '$0', minDeposit: '$200',
    leverage: '1:500', execution: 'Market', swapFree: true, hedging: true, scalping: true,
    highlight: false, recommended: false,
  },
  {
    id: 'raw', name: 'Raw Spread', badge: 'Most Popular',
    tagline: 'Ultra-low spreads with transparent commission',
    spread: '0.0 pips', commission: '$6/lot', minDeposit: '$500',
    leverage: '1:500', execution: 'Market', swapFree: true, hedging: true, scalping: true,
    highlight: true, recommended: true,
  },
  {
    id: 'elite', name: 'Elite', badge: 'Premium',
    tagline: 'Elite conditions with zero commission',
    spread: '0.4 pips', commission: '$0', minDeposit: '$10,000',
    leverage: '1:200', execution: 'Market', swapFree: true, hedging: true, scalping: true,
    highlight: false, recommended: false,
  },
];

const faqs = [
  { q: 'What is the difference between Standard and Raw Spread?', a: 'Standard accounts charge no commission but have slightly wider spreads. Raw Spread accounts offer spreads from 0.0 pips with a small per-lot commission — ideal for high-frequency or larger-volume traders.' },
  { q: 'How quickly can I open an account?', a: 'Live accounts are approved within 24 hours. Demo accounts are instant. Once verified, you can fund and begin trading immediately.' },
  { q: 'Can I hold multiple account types?', a: 'Yes. You can open multiple accounts of any type. Each account has its own balance, trading history, and settings.' },
  { q: 'Do all accounts support swap-free trading?', a: 'Yes. All account types offer a swap-free (Islamic) variant. Simply request it when applying or via your client portal.' },
  { q: 'What leverage is available?', a: 'Leverage up to 1:500 on major Forex pairs for Standard, Raw Spread, Starter and Growth accounts. Pro and Elite accounts offer up to 1:200. Limits may vary by region.' },
];

// ── FLOATING CHART GRAPHIC ─────────────────────────────────────────────
function ChartGraphic() {
  const bars = [38, 55, 44, 68, 52, 80, 72, 91, 84, 100, 96, 78];
  const linePoints = bars.map((h, i) => `${i * 22 + 11},${110 - h * 0.9}`).join(' ');
  return (
    <svg viewBox="0 0 275 130" className="chart-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3fcb1b" stopOpacity=".6"/>
          <stop offset="100%" stopColor="#3fcb1b" stopOpacity=".05"/>
        </linearGradient>
        <linearGradient id="lineG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3fcb1b" stopOpacity=".3"/>
          <stop offset="100%" stopColor="#3fcb1b" stopOpacity="0"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {bars.map((h, i) => (
        <rect key={i} x={i * 22 + 4} y={110 - h * 0.9} width="14" height={h * 0.9}
          rx="3" fill="url(#barG)" opacity=".7"/>
      ))}
      <polygon points={`11,110 ${linePoints} ${bars.length * 22 - 11},110`} fill="url(#lineG)" opacity=".5"/>
      <polyline points={linePoints} fill="none" stroke="#3fcb1b" strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round" filter="url(#glow)"/>
      <circle cx={bars.length * 22 - 11} cy={110 - bars[bars.length-1]*0.9} r="5"
        fill="#3fcb1b" filter="url(#glow)"/>
      <circle cx={bars.length * 22 - 11} cy={110 - bars[bars.length-1]*0.9} r="9"
        fill="none" stroke="#3fcb1b" strokeWidth="1.5" opacity=".4">
        <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".4;0;.4" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

// ── CANDLESTICK GRAPHIC ────────────────────────────────────────────────
function CandleGraphic() {
  const candles = [
    {x:10, o:70, c:50, h:80, l:45, up:false},
    {x:30, o:50, c:65, h:70, l:45, up:true},
    {x:50, o:65, c:55, h:72, l:50, up:false},
    {x:70, o:55, c:75, h:80, l:50, up:true},
    {x:90, o:75, c:60, h:82, l:55, up:false},
    {x:110,o:60, c:85, h:90, l:55, up:true},
    {x:130,o:85, c:70, h:92, l:65, up:false},
    {x:150,o:70, c:90, h:96, l:65, up:true},
  ];
  return (
    <svg viewBox="0 0 175 110" className="candle-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cglow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {candles.map((c, i) => {
        const col = c.up ? '#3fcb1b' : '#ef4444';
        const top = Math.min(c.o, c.c), bot = Math.max(c.o, c.c);
        return (
          <g key={i} filter="url(#cglow)">
            <line x1={c.x+7} y1={110-c.h} x2={c.x+7} y2={110-c.l} stroke={col} strokeWidth="1.5" opacity=".7"/>
            <rect x={c.x} y={110-bot} width="14" height={bot-top||2} rx="2" fill={col} opacity=".85"/>
          </g>
        );
      })}
    </svg>
  );
}

// ── ORB FIELD BACKGROUND ──────────────────────────────────────────────
function OrbField({ count = 8 }: { count?: number }) {
  return (
    <div className="orb-field">
      {Array.from({length: count}).map((_, i) => (
        <div
          key={i}
          className="orb-field__dot"
          style={{
            left: `${12 + (i * 11.5) % 78}%`,
            top:  `${8 + (i * 17) % 84}%`,
            animationDelay: `${i * 0.38}s`,
            animationDuration: `${3.5 + (i % 4) * 0.6}s`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ── TICKER ─────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  {sym:'EUR/USD', p:'1.08945', ch:'+0.47%', up:true},
  {sym:'GBP/USD', p:'1.27420', ch:'-0.21%', up:false},
  {sym:'XAU/USD', p:'2356.80', ch:'+0.67%', up:true},
  {sym:'BTC/USD', p:'69,150',  ch:'+1.39%', up:true},
  {sym:'USD/JPY', p:'154.32',  ch:'+0.12%', up:true},
  {sym:'OIL/USD', p:'78.45',   ch:'-0.88%', up:false},
  {sym:'NASDAQ',  p:'18,240',  ch:'+0.55%', up:true},
  {sym:'S&P 500', p:'5,320',   ch:'+0.31%', up:true},
];

// ── PAGE ─────────────────────────────────────────────────────────────────
export default function AccountsOverviewPage() {
  const [activeGroup, setActiveGroup] = useState('raw');
  const [openFaq,     setOpenFaq]     = useState<number|null>(null);
  const [heroReady,   setHeroReady]   = useState(false);
  const [tickerX,     setTickerX]     = useState(0);
  const [visible,     setVisible]     = useState<Set<string>>(new Set());
  const refs = useRef<{[k:string]: HTMLElement|null}>({});
  const tickerRaf = useRef<number>(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, -120]);
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    setTimeout(() => setHeroReady(true), 100);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));
    // ticker
    const tick = () => {
      setTickerX(x => { const n = x - 0.5; return n < -900 ? 0 : n; });
      tickerRaf.current = requestAnimationFrame(tick);
    };
    tickerRaf.current = requestAnimationFrame(tick);
    return () => { io.disconnect(); cancelAnimationFrame(tickerRaf.current); };
  }, []);

  const setRef = (id:string) => (el:HTMLElement|null) => { refs.current[id] = el; };

  const currentGroup = accountGroups.find(g => g.id === activeGroup)!;

  return (
    <>
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined}/>
      <div id="aov">

        {/* ══════════════════════════════════════════
            HERO - DARK SECTION
        ══════════════════════════════════════════ */}
        <section className="aov-hero" ref={heroRef}>
          {/* Canvas */}
          <div className="aov-hero__canvas">
            <div className="aov-hero__noise"/>
            <motion.div className="aov-hero__aurora aov-aurora-1" style={{y: heroParallax}}/>
            <motion.div className="aov-hero__aurora aov-aurora-2" style={{y: heroParallax}}/>
            <motion.div className="aov-hero__aurora aov-aurora-3" style={{y: heroParallax}}/>
            <svg className="aov-hero__grid" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="hg" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(63,203,27,0.055)" strokeWidth="1"/>
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#hg)"/>
            </svg>
            <OrbField count={12}/>
          </div>

          <motion.div className="aov-hero__inner" style={{opacity: heroOpacity}}>
            {/* LEFT — copy */}
            <div className="aov-hero__copy">
              <motion.h1
                className="aov-hero__title"
                initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:.22,duration:.65}}
              >
                Pick Your Account.<br/>
                <span className="aov-hero__accent">Start Trading.</span>
              </motion.h1>
              <motion.p
                className="aov-hero__desc"
                initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.38,duration:.6}}
              >
                Choose from commission-based ECN accounts with spreads from <strong>0.0 pips</strong>, or zero-commission accounts with transparent pricing. Every account ships with the full Foxnance institutional edge.
              </motion.p>
              <motion.div
                className="aov-hero__actions"
                initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.52,duration:.6}}
              >
                <Link href="/auth-signup" className="aov-btn-primary">Open Live Account <FiArrowRight/></Link>
                <Link href="/demo"        className="aov-btn-ghost">Try Free Demo</Link>
              </motion.div>

            </div>

            {/* RIGHT — floating dashboard graphic */}
            <motion.div
              className="aov-hero__graphic"
              initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:.35,duration:.8,ease:[.16,1,.3,1]}}
            >
              {/* Main mock card */}
              <div className="aov-mock">
                <div className="aov-mock__glow"/>
                <div className="aov-mock__header">
                  <div className="aov-mock__dots">
                    <span style={{background:'#ff5f57'}}/><span style={{background:'#febc2e'}}/><span style={{background:'#28c840'}}/>
                  </div>
                  <span className="aov-mock__label">Raw Spread Account</span>
                  <span className="aov-mock__live"><span className="aov-mock__live-dot"/>LIVE</span>
                </div>
                <div className="aov-mock__body">
                  <div className="aov-mock__balance-row">
                    <div>
                      <span className="aov-mock__bal-lbl">Account Balance</span>
                      <div className="aov-mock__bal-val">$25,340.50</div>
                      <div className="aov-mock__pnl"><FiTrendingUp size={11}/>+$1,439.80 (5.68%)</div>
                    </div>
                    <div className="aov-mock__spread-pill">
                      <span>Spread</span>
                      <strong>0.1 pip</strong>
                    </div>
                  </div>
                  <div className="aov-mock__chart">
                    <ChartGraphic/>
                  </div>
                  <div className="aov-mock__instruments">
                    {[
                      {sym:'EUR/USD', ch:'+0.47%', up:true},
                      {sym:'XAU/USD', ch:'+0.67%', up:true},
                      {sym:'BTC/USD', ch:'+1.39%', up:true},
                    ].map((t,i) => (
                      <div key={i} className="aov-mock__inst">
                        <span>{t.sym}</span>
                        <span className={`aov-mock__inst-ch ${t.up?'up':'dn'}`}>{t.ch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating chip cards */}
              <motion.div
                className="aov-float-card aov-float-card--tl"
                animate={{y:[0,-8,0]}} transition={{duration:3.2,repeat:Infinity,ease:'easeInOut'}}
              >
                <div className="aov-float-card__icon g"><FiZap size={14}/></div>
                <div><strong>&lt;40ms</strong><span>Execution</span></div>
              </motion.div>
              <motion.div
                className="aov-float-card aov-float-card--br"
                animate={{y:[0,7,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut',delay:.5}}
              >
                <div className="aov-float-card__icon b"><FiShield size={14}/></div>
                <div><strong>FCA + ASIC</strong><span>Regulated</span></div>
              </motion.div>
              <motion.div
                className="aov-float-card aov-float-card--tr"
                animate={{y:[0,-6,0]}} transition={{duration:3.6,repeat:Infinity,ease:'easeInOut',delay:1}}
              >
                <div className="aov-float-card__icon y"><BiStar size={14}/></div>
                <div><strong>500K+</strong><span>Traders</span></div>
              </motion.div>

              {/* Candle mini chart */}
              <motion.div
                className="aov-candle-card"
                animate={{y:[0,-5,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut',delay:1.5}}
              >
                <span className="aov-candle-card__label">EUR/USD · 1H</span>
                <CandleGraphic/>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            className="aov-hero__strip"
            initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.8,duration:.6}}
          >
            {[
              {v:'0.0 pips',l:'Spreads From'},
              {v:'1:500',   l:'Max Leverage'},
              {v:'$50',     l:'Min Deposit'},
              {v:'<40ms',   l:'Execution'},
              {v:'2,250+',  l:'Instruments'},
              {v:'500K+',   l:'Active Traders'},
            ].map((s,i) => (
              <div key={i} className="aov-hero__strip-item">
                <strong>{s.v}</strong><span>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── LIVE TICKER ── */}
        <div className="aov-ticker">
          <div className="aov-ticker__label"><FiActivity size={10}/>MARKETS</div>
          <div className="aov-ticker__track">
            <div className="aov-ticker__inner" style={{transform:`translateX(${tickerX}px)`}}>
              {[...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS].map((t,i) => (
                <div key={i} className="aov-ticker__item">
                  <span className="aov-ticker__sym">{t.sym}</span>
                  <span className="aov-ticker__price">{t.p}</span>
                  <span className={`aov-ticker__chg ${t.up?'up':'dn'}`}>{t.ch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ACCOUNT TYPE SELECTOR - DARK SECTION
        ══════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════
            ACCOUNT TYPES - HOME PAGE VERSION
        ══════════════════════════════════════════ */}
        <section id="accounts" ref={setRef('accounts')} className={`aov-section aov-reveal ${visible.has('accounts')?'on':''}`} style={{background:'#0A0A0A'}}>
          <div className="aov-container">
            <div className="aov-section-head" style={{textAlign:'center',marginBottom:'56px'}}>
              <p className="aov-eyebrow" style={{color:'#3fcb1b',fontSize:'.72rem',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',display:'block',marginBottom:'12px'}}>Account Types</p>
              <h2 className="aov-h2" style={{color:'#fff'}}>More Choice. More Control.</h2>
              <p className="aov-sub" style={{color:'rgba(255,255,255,.55)',fontSize:'1.05rem',maxWidth:'560px',margin:'12px auto 0',lineHeight:'1.65'}}>Transparent pricing. No hidden fees. Tailored to your trading style.</p>
            </div>
            <div className="fx-accounts-three-grid">
              {[
                {
                  name: "Standard",
                  badge: "",
                  featured: false,
                  rows: [
                    ["Min. Deposit", "$10"],
                    ["Leverage", "1:500"],
                    ["Spread", "From 0.9 pips"],
                    ["Commission", "Zero"],
                    ["Support", "24/7 Support"]
                  ]
                },
                {
                  name: "Elite",
                  badge: "Most Popular",
                  featured: true,
                  rows: [
                    ["Min. Deposit", "$500"],
                    ["Leverage", "1:500"],
                    ["Spread", "From 0.7 pips"],
                    ["Commission", "Zero"],
                    ["Support", "24/7 Support"]
                  ]
                },
                {
                  name: "Pro",
                  badge: "Institutional",
                  featured: false,
                  rows: [
                    ["Min. Deposit", "$10,000"],
                    ["Spread", "From 0.5 pips"],
                    ["Commission", "Zero"],
                    ["Leverage", "1:500"],
                    ["Dedicated", "Personal Manager"]
                  ]
                },
              ].map((a, i) => (
                <div
                  key={i}
                  className={`fx-account ${a.featured ? "fx-account--featured" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {a.badge && <div className="fx-account__badge" style={{ background: '#3fcb1b', color: '#000' }}>{a.badge}</div>}
                  <h3 className="fx-account__name">{a.name}</h3>
                  {a.rows.map(([k, v], j) => (
                    <div key={j} className="fx-account__row">
                      <span className="fx-account__key">{k}</span>
                      <span className="fx-account__val">{v}</span>
                    </div>
                  ))}
                  <Link href="/auth-signup" className={`fx-btn fx-btn--sm fx-btn--full ${a.featured ? "fx-btn--green" : "fx-btn--outline-white"}`}>
                    Open {a.name} Account
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            COMPARISON TABLE - FULLY RESPONSIVE
        ══════════════════════════════════════════ */}
        <section
          id="compare"
          ref={setRef('compare')}
          className={`cmp-section aov-reveal ${visible.has('compare')?'on':''}`}
        >
          <div className="aov-container">
            <motion.div 
              className="aov-section-head"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="aov-eyebrow">Compare</span>
              <h2 className="aov-h2">All Accounts, Side by Side</h2>
              <p className="aov-sub">Every detail in one place — no hidden conditions, no small print.</p>
            </motion.div>

            {/* Mobile & Tablet: Horizontal scroll cards */}
            <div className="cmp-mobile">
              {compareAccounts.map((acc, i) => (
                <motion.div 
                  key={acc.id} 
                  className={`cmp-mob-card ${acc.highlight?'highlight':''}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="cmp-mob-card__head">
                    <strong>{acc.name}</strong>
                    {acc.badge && <span className="cmp-mob-badge">{acc.badge}</span>}
                  </div>
                  <div className="cmp-mob-row">
                    <span>Min Deposit</span>
                    <strong>{acc.minDeposit}</strong>
                  </div>
                  <div className="cmp-mob-row">
                    <span>Spreads From</span>
                    <strong>{acc.spread}</strong>
                  </div>
                  <div className="cmp-mob-row">
                    <span>Commission</span>
                    <strong>{acc.commission}</strong>
                  </div>
                  <div className="cmp-mob-row">
                    <span>Max Leverage</span>
                    <strong>{acc.leverage}</strong>
                  </div>
                  <div className="cmp-mob-row">
                    <span>Execution</span>
                    <strong>{acc.execution}</strong>
                  </div>
                  <div className="cmp-mob-row">
                    <span>Swap-Free</span>
                    <span className="cmp-bool on"><FiCheck size={12}/></span>
                  </div>
                  <div className="cmp-mob-row">
                    <span>Hedging</span>
                    <span className="cmp-bool on"><FiCheck size={12}/></span>
                  </div>
                  <div className="cmp-mob-row">
                    <span>Scalping</span>
                    <span className={`cmp-bool ${acc.scalping?'on':'off'}`}>
                      {acc.scalping ? <FiCheck size={12}/> : <FiX size={12}/>}
                    </span>
                  </div>
                  <Link href="/auth-signup" className={`cmp-mob-cta ${acc.highlight?'highlight':''}`}>
                    Open {acc.name} <FiArrowRight size={12}/>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="cmp-wrap">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th className="cmp-feature-col">Feature</th>
                    {compareAccounts.map((acc, idx) => (
                      <th key={acc.id} className={`cmp-account-col ${acc.highlight?'highlight':''}`}>
                        <div className="cmp-account-header">
                          {acc.badge && <span className="cmp-badge">{acc.badge}</span>}
                          <span className="cmp-account-name">{acc.name}</span>
                          <span className="cmp-account-group">
                            {acc.id === 'raw' ? 'ECN / Raw Spread' : acc.id === 'elite' ? 'Zero Commission' : 'ECN / Raw Spread'}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cmp-feature">Min Deposit</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>{acc.minDeposit}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="cmp-feature">Spreads From</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>{acc.spread}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="cmp-feature">Commission</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>{acc.commission}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="cmp-feature">Max Leverage</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>{acc.leverage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="cmp-feature">Execution</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>{acc.execution}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="cmp-feature">Swap-Free</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>
                        <span className="cmp-icon on"><FiCheck size={14}/></span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="cmp-feature">Hedging</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>
                        <span className="cmp-icon on"><FiCheck size={14}/></span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="cmp-feature">Scalping</td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-value ${acc.highlight?'highlight':''}`}>
                        <span className={`cmp-icon ${acc.scalping?'on':'off'}`}>
                          {acc.scalping ? <FiCheck size={14}/> : <FiX size={14}/>}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="cmp-cta-row">
                    <td className="cmp-feature"></td>
                    {compareAccounts.map(acc => (
                      <td key={acc.id} className={`cmp-cta-cell ${acc.highlight?'highlight':''}`}>
                        <Link href="/auth-signup" className={`cmp-cta-btn ${acc.highlight?'highlight':''}`}>
                          Open <FiArrowRight size={12}/>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="cmp-note">* Conditions may vary by instrument and jurisdiction. <Link href="/legal">Full terms →</Link></p>
          </div>
        </section>
        {/* ══════════════════════════════════════════
            WHY FOXNANCE - DARK SECTION WITH ANIMATIONS
        ══════════════════════════════════════════ */}
        <section
          id="why"
          ref={setRef('why')}
          className={`aov-section aov-section--alt aov-reveal ${visible.has('why')?'on':''}`}
        >
          <div className="aov-container">
            <div className="aov-section-head">
              <span className="aov-eyebrow">The Foxnance Edge</span>
              <h2 className="aov-h2">Why 500,000+ Traders Choose Us</h2>
              <p className="aov-sub">Every account comes with the same institutional-grade infrastructure.</p>
            </div>
            <div className="aov-why-grid">
              {platformFeatures.map((f,i) => (
                <motion.div 
                  key={i} 
                  className="aov-why-card" 
                  style={{'--wi':i} as React.CSSProperties}
                  initial={{opacity:0,y:30}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true}}
                  transition={{delay:i*0.08,duration:0.5}}
                  whileHover={{y:-8, transition:{duration:0.2}}}
                >
                  <div className="aov-why-card__glow"/>
                  <div className="aov-why-card__icon">{f.icon}</div>
                  <h3 className="aov-why-card__title">{f.title}</h3>
                  <p className="aov-why-card__desc">{f.desc}</p>
                  <div className="aov-why-card__line"/>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FAQ - MATCHING HOME PAGE LAYOUT
        ══════════════════════════════════════════ */}
        <section
          id="faq"
          ref={setRef('faq')}
          className={`aov-section aov-reveal ${visible.has('faq')?'on':''}`}
          style={{background:'#fff'}}
        >
          <div className="aov-container">
            <div className="aov-section-head" style={{textAlign:'center',marginBottom:'48px'}}>
              <span className="aov-eyebrow" style={{color:'#3fcb1b'}}>FAQ</span>
              <h2 className="aov-h2" style={{color:'#0A0A0A'}}>Frequently Asked Questions</h2>
            </div>
            <div className="fx-faq">
              {faqs.map((f,i) => (
                <div key={i} className={`fx-faq__item ${openFaq===i?'open':''}`}>
                  <button className="fx-faq__q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                    <span>{f.q}</span>
                    {openFaq===i
                      ? <span style={{flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',width:28,height:28,borderRadius:6,background:'#3fcb1b',color:'#000'}}><FiChevronUp size={16}/></span>
                      : <span style={{flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',width:28,height:28,borderRadius:6,background:'rgba(63,203,27,0.1)',color:'#3fcb1b'}}><FiChevronDown size={16}/></span>
                    }
                  </button>
                  <AnimatePresence>
                    {openFaq===i && (
                      <motion.div
                        initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
                        exit={{height:0,opacity:0}} transition={{duration:.3,ease:[.16,1,.3,1]}}
                        style={{overflow:'hidden'}}
                      >
                        <div className="fx-faq__a">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA - READY TO TRADE
        ══════════════════════════════════════════ */}
        <section className="aov-cta-section">
          <div className="aov-cta-section__orb aov-cta-section__orb--1"/>
          <div className="aov-cta-section__orb aov-cta-section__orb--2"/>
          <OrbField count={10}/>
          <div className="aov-container">
            <div style={{textAlign:'center',position:'relative',zIndex:1,maxWidth:'640px',margin:'0 auto'}}>
              <motion.div
                initial={{opacity:0,y:20}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:true}}
                transition={{duration:.6}}
              >
                <p className="aov-eyebrow" style={{justifyContent:'center',color:'#3fcb1b',display:'flex',gap:'7px',fontSize:'.67rem',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',marginBottom:'18px'}}>
                  <span className="aov-badge__dot"/>Ready to Trade?
                </p>
                <h2 style={{fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:900,color:'#fff',letterSpacing:'-.04em',lineHeight:1.15,margin:'0 0 16px'}}>
                  Open Your Account<br/>in Under 5 Minutes
                </h2>
                <p style={{fontSize:'.94rem',color:'rgba(237,240,234,.55)',lineHeight:1.7,margin:'0 auto 30px',maxWidth:'480px'}}>
                  Join 500,000+ traders with instant account setup, no joining fee, and 24/7 expert support from day one.
                </p>
                <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'24px'}}>
                  <Link href="/auth-signup" className="aov-btn-primary aov-btn-primary--lg">
                    Open Live Account <FiArrowRight/>
                  </Link>
                  <Link href="/demo" className="aov-btn-ghost">Try Free Demo</Link>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'9px',justifyContent:'center'}}>
                  {['No joining fee','Regulated broker','Instant deposits','24/7 support'].map((c,i) => (
                    <span key={i} className="aov-chip"><FiCheck size={11}/>{c}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
      <CookieModal/>

      {/* ══════════════════════════════════════════
          GLOBAL STYLES
      ══════════════════════════════════════════ */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        /* ─── TOKENS ─────────────────────────────── */
        #aov {
          --g:        #3fcb1b;
          --g-dk:     #2e9c14;
          --g-glow:   rgba(63,203,27,0.22);
          --g-faint:  rgba(63,203,27,0.07);
          --g-border: rgba(63,203,27,0.22);
          --blue:     #3b82f6;
          --amber:    #f59e0b;
          --red:      #ef4444;
          --profit:   #10b981;
          --bg-dark:  #080b08;
          --bg-dark2: #0e110e;
          --bg-dark3: #141914;
          --bg-light: #f8fafc;
          --bg-light2: #ffffff;
          --bg-light3: #f1f5f9;
          --border-dark: rgba(255,255,255,0.07);
          --border-light: #e2e8f0;
          --text-dark: #edf0ea;
          --text-dark2: rgba(237,240,234,0.48);
          --text-light: #1a1f36;
          --text-light2: #6b7280;
          --ease:     cubic-bezier(0.16,1,0.3,1);
          --r-sm:     10px;
          --r-md:     18px;
          --r-lg:     26px;
          font-family:'Sora','DM Sans',system-ui,sans-serif;
          overflow-x:hidden;
        }

        /* Dark sections (default) */
        #aov {
          background:var(--bg-dark);
          color:var(--text-dark);
        }
        
        /* Light sections (alternating) */
        .aov-section-alt {
          background: var(--bg-light);
          color: var(--text-light);
        }
        .aov-section-alt .aov-h2 { color: var(--text-light); }
        .aov-section-alt .aov-sub { color: var(--text-light2); }
        .aov-section-alt .aov-body { color: var(--text-light2); }
        .aov-section-alt .aov-chip { background: rgba(0,0,0,0.03); border-color: var(--border-light); color: var(--text-light2); }
        .aov-section-alt .aov-cmp-mob-card { background: var(--bg-light2); border-color: var(--border-light); }
        .aov-section-alt .aov-cmp-mob-card strong { color: var(--text-light); }
        .aov-section-alt .aov-cmp-mob-row span { color: var(--text-light2); }
        .aov-section-alt .aov-cmp-mob-row strong { color: var(--text-light); }
        .aov-section-alt .aov-faq-item { background: var(--bg-light2); border-color: var(--border-light); }
        .aov-section-alt .aov-faq-item__q { color: var(--text-light); }
        .aov-section-alt .aov-faq-item__a p { color: var(--text-light2); border-top-color: var(--border-light); }
        .aov-section-alt .aov-cmp-wrap { border-color: var(--border-light); }
        .aov-section-alt .aov-cmp thead th { background: var(--bg-light3); }
        .aov-section-alt .aov-cmp th, 
        .aov-section-alt .aov-cmp td { border-bottom-color: var(--border-light); }
        .aov-section-alt .aov-cmp__feat { color: var(--text-light); border-right-color: var(--border-light); }
        .aov-section-alt .aov-cmp__val { color: var(--text-light); }
        .aov-section-alt .aov-cmp tbody tr.ev { background: rgba(0,0,0,0.02); }
        .aov-section-alt .aov-cmp-btn { background: rgba(0,0,0,0.03); border-color: var(--border-light); color: var(--text-light); }
        .aov-section-alt .aov-cmp-note { color: var(--text-light2); }

        #aov *, #aov *::before, #aov *::after { box-sizing:border-box; }

        /* ─── LAYOUT ─────────────────────────────── */
        .aov-container { max-width:1240px; margin:0 auto; padding:0 24px; }
        @media(min-width:1024px){ .aov-container { padding:0 52px; } }
        .aov-section { padding:96px 0; background:var(--bg-dark); }
        .aov-section-alt { padding:96px 0; }
        .aov-section--alt { background:var(--bg-dark2); }
        .aov-reveal { opacity:0; transform:translateY(44px); transition:opacity .9s var(--ease),transform .9s var(--ease); }
        .aov-reveal.on { opacity:1; transform:translateY(0); }

        /* ─── TYPOGRAPHY ─────────────────────────── */
        .aov-eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          font-size:.67rem; font-weight:700; letter-spacing:.18em;
          text-transform:uppercase; color:var(--g); margin-bottom:14px;
        }
        .aov-eyebrow::before,.aov-eyebrow::after {
          content:''; display:block; width:26px; height:1.5px;
          background:currentColor; opacity:.5; border-radius:2px;
        }
        .aov-h2 { font-size:clamp(1.8rem,3.8vw,2.8rem); font-weight:900; letter-spacing:-.04em; line-height:1.15; margin:0 0 10px; }
        .aov-sub  { font-size:.94rem; line-height:1.7; max-width:500px; margin:0 auto; }
        .aov-body { font-size:.9rem; line-height:1.78; margin-bottom:16px; }
        .aov-section-head { text-align:center; margin-bottom:56px; display:flex; flex-direction:column; align-items:center; }

        /* ─── BUTTONS ────────────────────────────── */
        .aov-btn-primary {
          display:inline-flex; align-items:center; gap:7px;
          padding:13px 28px; background:var(--g); color:#000;
          font-weight:800; font-size:.88rem; border-radius:100px;
          text-decoration:none; transition:all .3s var(--ease);
          position:relative; overflow:hidden;
        }
        .aov-btn-primary::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          transform:translateX(-100%); transition:transform .5s;
        }
        .aov-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(63,203,27,.35); }
        .aov-btn-primary:hover::before { transform:translateX(100%); }
        .aov-btn-primary--lg { padding:15px 34px; font-size:.95rem; }

        .aov-btn-ghost {
          display:inline-flex; align-items:center; gap:7px;
          padding:13px 28px; background:transparent;
          color:rgba(237,240,234,.8); font-weight:700; font-size:.88rem;
          border:1.5px solid rgba(255,255,255,.18); border-radius:100px;
          text-decoration:none; transition:all .3s var(--ease);
        }
        .aov-btn-ghost:hover { border-color:var(--g); color:var(--g); transform:translateY(-2px); }

        .aov-btn-outline {
          display:inline-flex; align-items:center; gap:7px;
          padding:12px 24px; background:transparent; color:var(--g);
          font-weight:700; font-size:.86rem;
          border:1.5px solid var(--g-border); border-radius:100px;
          text-decoration:none; transition:all .25s var(--ease);
        }
        .aov-btn-outline:hover { background:var(--g-faint); transform:translateY(-2px); }

        /* ─── HOME PAGE BUTTON STYLES ───────────────── */
        .fx-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;font-size:.9rem;font-weight:700;border-radius:8px;text-decoration:none;transition:all .22s;cursor:pointer;border:none;white-space:nowrap;font-family:inherit;}
        .fx-btn--green{background:linear-gradient(135deg,#3fcb1b 0%,#2e9c14 100%);color:#000;box-shadow:0 4px 18px rgba(63,203,27,.28);}
        .fx-btn--green:hover{background:#2e9c14;transform:translateY(-1px);}
        .fx-btn--outline-white{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4);}
        .fx-btn--outline-white:hover{background:rgba(255,255,255,.08);border-color:#fff;}
        .fx-btn--sm{padding:10px 20px;font-size:.82rem;}
        .fx-btn--full{width:100%;justify-content:center;margin-top:20px;}

        /* ─── HOME PAGE ACCOUNT CARDS ────────────────── */
        .fx-accounts-three-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1100px;margin:0 auto;}
        @media(max-width:1024px){.fx-accounts-three-grid{grid-template-columns:repeat(2,1fr);gap:20px;}}
        @media(max-width:640px){.fx-accounts-three-grid{grid-template-columns:1fr;}}
        .fx-account{position:relative;padding:40px 32px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;transition:all .3s cubic-bezier(0.16,1,0.3,1);display:flex;flex-direction:column;}
        .fx-account:hover{transform:translateY(-8px);border-color:rgba(63,203,27,.5);background:rgba(63,203,27,.03);box-shadow:0 20px 40px rgba(0,0,0,0.4);}
        .fx-account--featured{border:1px solid #3fcb1b!important;background:rgba(63,203,27,.06)!important;box-shadow:0 0 30px rgba(63,203,27,0.1);}
        .fx-account__badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:4px 16px;border-radius:99px;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;}
        .fx-account__name{font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:24px;text-align:center;}
        .fx-account__row{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:.9rem;}
        .fx-account__row:last-of-type{border-bottom:none;}
        .fx-account__key{color:rgba(255,255,255,.5);}
        .fx-account__val{font-weight:700;color:#fff;}

        /* ─── HOME PAGE FAQ STYLES ───────────────────── */
        .fx-faq{max-width:720px;margin:0 auto;}
        .fx-faq__item{border-bottom:1px solid #E5E5E5;}
        .fx-faq__q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:20px 0;font-size:.95rem;font-weight:600;color:#0A0A0A;background:transparent;border:none;cursor:pointer;text-align:left;gap:16px;transition:color .2s;font-family:inherit;}
        .fx-faq__q:hover{color:#3fcb1b;}
        .fx-faq__a{padding:0 0 20px;font-size:.88rem;color:#6B6B6B;line-height:1.65;}

        /* ─── CHIPS / BADGE ──────────────────────── */
        .aov-chip {
          display:inline-flex; align-items:center; gap:5px;
          font-size:.67rem; font-weight:600;
          padding:4px 11px; border:1px solid rgba(255,255,255,.1);
          border-radius:100px; backdrop-filter:blur(6px);
        }
        .aov-chip svg { color:var(--g); }
        .aov-badge {
          display:inline-flex; align-items:center; gap:8px;
          padding:5px 14px 5px 9px; background:rgba(63,203,27,.1);
          border:1px solid rgba(63,203,27,.28); border-radius:100px;
          font-size:.7rem; font-weight:700; color:#82e86a;
          letter-spacing:.08em; text-transform:uppercase; margin-bottom:20px;
        }
        .aov-badge__dot {
          width:7px; height:7px; border-radius:50%; background:var(--g); flex-shrink:0;
          animation:dotP 2s ease-in-out infinite;
        }
        @keyframes dotP { 0%,100%{box-shadow:0 0 0 0 rgba(63,203,27,.5)} 50%{box-shadow:0 0 0 6px rgba(63,203,27,0)} }

        /* ─── PARTICLES ──────────────────────────── */
        .orb-field { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
        .orb-field__dot {
          position:absolute; background:var(--g); border-radius:50%; opacity:0;
          box-shadow:0 0 8px 2px rgba(63,203,27,.4);
          animation:ptFloat var(--dur,4s) ease-in-out infinite;
        }
        @keyframes ptFloat { 0%{opacity:0;transform:translateY(0) scale(.5)} 20%{opacity:.8} 80%{opacity:.5} 100%{opacity:0;transform:translateY(-55px) scale(1.3)} }

        /* ─── HERO ───────────────────────────────── */
        .aov-hero {
          position:relative; min-height:720px; background:var(--bg-dark);
          overflow:hidden; display:flex; flex-direction:column; align-items:center;
          padding-top:88px;
        }
        .aov-hero__canvas { position:absolute; inset:0; pointer-events:none; z-index:0; }
        .aov-hero__noise {
          position:absolute; inset:0; opacity:.35;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
          background-size:180px;
        }
        .aov-hero__aurora { position:absolute; border-radius:50%; filter:blur(100px); }
        .aov-aurora-1 { width:640px; height:640px; background:radial-gradient(circle,rgba(63,203,27,.2),transparent 70%); top:-200px; right:-80px; animation:auraDrift 12s ease-in-out infinite; }
        .aov-aurora-2 { width:480px; height:480px; background:radial-gradient(circle,rgba(45,180,10,.15),transparent 70%); bottom:-100px; left:-60px; animation:auraDrift 9s ease-in-out infinite reverse; }
        .aov-aurora-3 { width:300px; height:300px; background:radial-gradient(circle,rgba(100,220,60,.09),transparent 70%); top:40%; left:35%; animation:auraDrift 7s ease-in-out infinite; }
        @keyframes auraDrift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-18px)} }
        .aov-hero__grid { position:absolute; inset:0; width:100%; height:100%; }

        .aov-hero__inner {
          display:grid; grid-template-columns:1fr 1fr; gap:56px;
          align-items:center; width:100%; max-width:1240px;
          padding:60px 24px 56px; position:relative; z-index:1;
        }
        @media(min-width:1024px){ .aov-hero__inner { padding:60px 52px 56px; } }
        @media(max-width:900px) { .aov-hero__inner { grid-template-columns:1fr; gap:44px; } }

        .aov-hero__copy {}
        .aov-hero__title {
          font-size:clamp(2.4rem,5.5vw,4rem); font-weight:900;
          line-height:1.12; color:#fff; letter-spacing:-.045em; margin:0 0 18px;
        }
        .aov-hero__accent {
          background:linear-gradient(135deg,#3fcb1b 0%,#7de84a 50%,#3fcb1b 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer 4s linear infinite;
        }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        .aov-hero__desc { font-size:.98rem; color:rgba(237,240,234,.62); line-height:1.72; margin:0 0 28px; }
        .aov-hero__desc strong { color:rgba(237,240,234,.9); }
        .aov-hero__actions { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:24px; }
        .aov-hero__chips   { display:flex; flex-wrap:wrap; gap:9px; }

        /* ── HERO GRAPHIC ── */
        .aov-hero__graphic { position:relative; display:flex; justify-content:center; align-items:center; }
        @media(max-width:900px){ .aov-hero__graphic { display:none; } }

        /* Main mock window */
        .aov-mock {
          width:340px; background:rgba(20,25,20,.92);
          border:1px solid rgba(63,203,27,.2); border-radius:20px;
          backdrop-filter:blur(20px); overflow:hidden;
          box-shadow:0 28px 70px rgba(0,0,0,.55), 0 0 0 1px rgba(63,203,27,.1);
          position:relative; z-index:1;
        }
        .aov-mock__glow { position:absolute; top:-60px; right:-40px; width:200px; height:200px; background:radial-gradient(circle,rgba(63,203,27,.2),transparent); border-radius:50%; filter:blur(40px); pointer-events:none; }
        .aov-mock__header { display:flex; align-items:center; gap:6px; padding:11px 14px; background:rgba(255,255,255,.03); border-bottom:1px solid rgba(255,255,255,.06); }
        .aov-mock__dots { display:flex; gap:5px; }
        .aov-mock__dots span { width:9px; height:9px; border-radius:50%; }
        .aov-mock__label { flex:1; font-size:.65rem; font-weight:600; color:rgba(237,240,234,.5); text-align:center; }
        .aov-mock__live { display:flex; align-items:center; gap:4px; font-size:.6rem; font-weight:700; color:#3fcb1b; }
        .aov-mock__live-dot { width:5px; height:5px; border-radius:50%; background:#3fcb1b; animation:dotP 2s ease-in-out infinite; }
        .aov-mock__body { padding:14px; }
        .aov-mock__balance-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
        .aov-mock__bal-lbl { font-size:.6rem; color:rgba(237,240,234,.4); display:block; margin-bottom:3px; }
        .aov-mock__bal-val { font-size:1.3rem; font-weight:900; color:#fff; letter-spacing:-.04em; }
        .aov-mock__pnl { display:inline-flex; align-items:center; gap:3px; font-size:.65rem; font-weight:700; color:#10b981; margin-top:4px; background:rgba(16,185,129,.1); padding:2px 7px; border-radius:100px; }
        .aov-mock__spread-pill { background:var(--g-faint); border:1px solid var(--g-border); border-radius:10px; padding:8px 12px; text-align:center; }
        .aov-mock__spread-pill span { display:block; font-size:.58rem; color:rgba(237,240,234,.4); margin-bottom:2px; }
        .aov-mock__spread-pill strong { display:block; font-size:.9rem; font-weight:800; color:var(--g); }
        .aov-mock__chart { margin-bottom:10px; }
        .chart-svg { width:100%; height:auto; }
        .aov-mock__instruments { display:flex; flex-direction:column; gap:5px; }
        .aov-mock__inst { display:flex; justify-content:space-between; padding:5px 8px; background:rgba(255,255,255,.03); border-radius:7px; }
        .aov-mock__inst span:first-child { font-size:.7rem; color:rgba(237,240,234,.7); font-weight:600; }
        .aov-mock__inst-ch { font-size:.7rem; font-weight:700; }
        .aov-mock__inst-ch.up { color:#3fcb1b; }
        .aov-mock__inst-ch.dn { color:#ef4444; }

        /* Float cards */
        .aov-float-card {
          position:absolute; display:flex; align-items:center; gap:9px;
          background:rgba(20,25,20,.92); border:1px solid rgba(63,203,27,.22);
          border-radius:13px; padding:10px 14px; backdrop-filter:blur(14px);
          box-shadow:0 8px 24px rgba(0,0,0,.45); font-size:.7rem; color:rgba(237,240,234,.8);
        }
        .aov-float-card--tl { top:-24px; left:-30px; }
        .aov-float-card--br { bottom:-18px; right:-24px; }
        .aov-float-card--tr { top:40px; right:-30px; }
        .aov-float-card__icon { width:28px; height:28px; border-radius:8px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .aov-float-card__icon.g { background:var(--g-faint); color:var(--g); border:1px solid var(--g-border); }
        .aov-float-card__icon.b { background:rgba(59,130,246,.1); color:#3b82f6; border:1px solid rgba(59,130,246,.2); }
        .aov-float-card__icon.y { background:rgba(245,158,11,.1); color:#f59e0b; border:1px solid rgba(245,158,11,.2); }
        .aov-float-card strong { display:block; font-size:.88rem; font-weight:900; color:#fff; margin-bottom:1px; }
        .aov-float-card span   { display:block; font-size:.6rem; color:rgba(237,240,234,.42); }

        /* Candle card */
        .aov-candle-card {
          position:absolute; bottom:-30px; left:-38px;
          background:rgba(20,25,20,.92); border:1px solid rgba(63,203,27,.15);
          border-radius:14px; padding:12px 14px; backdrop-filter:blur(14px);
          box-shadow:0 8px 24px rgba(0,0,0,.45);
        }
        .aov-candle-card__label { font-size:.6rem; color:rgba(237,240,234,.4); display:block; margin-bottom:6px; font-weight:600; }
        .candle-svg { width:120px; height:auto; }

        /* Hero stat strip */
        .aov-hero__strip {
          position:relative; z-index:1; width:100%; max-width:1240px;
          background:rgba(255,255,255,.025); border-top:1px solid rgba(255,255,255,.06);
          display:flex; flex-wrap:wrap; align-items:center;
        }
        .aov-hero__strip-item {
          flex:1; min-width:80px; text-align:center; padding:16px 10px; position:relative;
        }
        .aov-hero__strip-item + .aov-hero__strip-item::before { content:''; position:absolute; left:0; top:20%; bottom:20%; width:1px; background:rgba(255,255,255,.08); }
        .aov-hero__strip-item strong { display:block; font-size:clamp(.9rem,1.5vw,1.2rem); font-weight:900; color:var(--g); letter-spacing:-.03em; }
        .aov-hero__strip-item span   { display:block; font-size:.6rem; color:rgba(237,240,234,.38); font-weight:500; margin-top:3px; }

        /* ─── TICKER ─────────────────────────────── */
        .aov-ticker { display:flex; align-items:center; height:38px; background:var(--bg-dark2); border-bottom:1px solid var(--border-dark); overflow:hidden; }
        .aov-ticker__label { display:flex; align-items:center; gap:5px; padding:0 14px; background:var(--g); color:#000; font-size:.6rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; height:100%; flex-shrink:0; white-space:nowrap; }
        .aov-ticker__track { flex:1; overflow:hidden; height:100%; min-width:0; }
        .aov-ticker__inner { display:flex; align-items:center; height:100%; will-change:transform; }
        .aov-ticker__item  { display:flex; align-items:center; gap:7px; padding:0 18px; white-space:nowrap; border-right:1px solid var(--border-dark); height:100%; }
        .aov-ticker__sym   { font-size:.7rem; font-weight:700; color:var(--text-dark); }
        .aov-ticker__price { font-size:.7rem; color:var(--text-dark2); }
        .aov-ticker__chg   { font-size:.67rem; font-weight:700; }
        .aov-ticker__chg.up { color:var(--g); }
        .aov-ticker__chg.dn { color:var(--red); }

        /* ─── GROUP TOGGLE ───────────────────────── */
        .aov-group-toggle { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:18px; }
        .aov-gtab {
          display:flex; align-items:center; gap:14px; flex:1; min-width:240px; max-width:360px;
          padding:18px 22px; background:var(--bg-dark3);
          border:1px solid var(--border-dark); border-radius:var(--r-md);
          cursor:pointer; transition:all .28s var(--ease); text-align:left;
          position:relative; overflow:hidden;
        }
        .aov-gtab.active { border-color:var(--g-border); background:linear-gradient(135deg,rgba(63,203,27,.08),var(--bg-dark3)); }
        .aov-gtab:not(.active):hover { border-color:rgba(255,255,255,.14); }
        .aov-gtab__emoji { font-size:1.6rem; flex-shrink:0; }
        .aov-gtab div strong { display:block; font-size:.9rem; font-weight:800; color:var(--text-dark); margin-bottom:3px; }
        .aov-gtab div span   { display:block; font-size:.72rem; color:var(--text-dark2); }
        .aov-gtab__pill { position:absolute; inset:0; border:2px solid var(--g); border-radius:inherit; pointer-events:none; }
        @media(max-width:540px){ .aov-gtab { min-width:0; } }

        /* ─── ACCOUNT CARDS ──────────────────────── */
        .aov-acc-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:24px; }
        @media(max-width:960px){ .aov-acc-cards { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:580px){ .aov-acc-cards { grid-template-columns:1fr; } }

        .aov-acc-card {
          background:var(--bg-dark3); border:1px solid var(--border-dark);
          border-radius:var(--r-lg); padding:26px 22px;
          position:relative; overflow:hidden; display:flex; flex-direction:column;
          transition:transform .32s var(--ease),border-color .32s,box-shadow .32s;
        }
        .aov-acc-card:hover { transform:translateY(-7px); border-color:var(--g-border); box-shadow:0 18px 50px rgba(63,203,27,.12); }
        .aov-acc-card--hi {
          border-color:var(--g-border); background:linear-gradient(160deg,var(--bg-dark3) 60%,rgba(63,203,27,.05));
          box-shadow:0 8px 32px rgba(63,203,27,.1);
        }
        .aov-acc-card--hi:hover { box-shadow:0 22px 60px rgba(63,203,27,.2); }

        .aov-acc-card__glow {
          position:absolute; top:-60px; right:-50px; width:200px; height:200px;
          background:radial-gradient(circle,var(--g-glow),transparent); border-radius:50%;
          filter:blur(45px); opacity:0; transition:opacity .4s; pointer-events:none;
        }
        .aov-acc-card:hover .aov-acc-card__glow, .aov-acc-card--hi .aov-acc-card__glow { opacity:1; }

        .aov-acc-card__circuit {
          position:absolute; inset:0; width:100%; height:100%; pointer-events:none; opacity:.6;
        }
        .aov-acc-card__badge {
          position:absolute; top:16px; right:16px; z-index:2;
          font-size:.6rem; font-weight:700; padding:3px 10px; border-radius:100px;
          background:var(--bg-dark2); color:var(--text-dark2); border:1px solid var(--border-dark);
          letter-spacing:.06em; text-transform:uppercase;
        }
        .aov-acc-card__recommended {
          position:absolute; top:16px; right:16px; z-index:2;
          display:inline-flex; align-items:center; gap:4px;
          font-size:.6rem; font-weight:800; padding:3px 10px; border-radius:100px;
          background:var(--g); color:#000; letter-spacing:.06em; text-transform:uppercase;
        }
        .aov-acc-card__head { margin-bottom:18px; position:relative; z-index:1; }
        .aov-acc-card__name { font-size:1.25rem; font-weight:900; color:var(--text-dark); letter-spacing:-.03em; margin:0 0 5px; }
        .aov-acc-card__tagline { font-size:.75rem; color:var(--text-dark2); margin:0; line-height:1.5; }

        .aov-acc-card__price {
          display:flex; align-items:center;
          padding:14px 16px; background:rgba(255,255,255,.03);
          border:1px solid var(--border-dark); border-radius:var(--r-sm);
          margin-bottom:16px; position:relative; z-index:1;
        }
        .aov-acc-card__price-item { flex:1; text-align:center; }
        .aov-acc-card__price-val { display:block; font-size:1.15rem; font-weight:900; color:var(--g); letter-spacing:-.03em; margin-bottom:3px; }
        .aov-acc-card__price-val.comm { color:var(--text-dark); }
        .aov-acc-card__price-lbl { font-size:.58rem; color:var(--text-dark2); text-transform:uppercase; letter-spacing:.08em; }
        .aov-acc-card__price-sep { width:1px; height:32px; background:var(--border-dark); flex-shrink:0; }

        .aov-acc-card__specs { list-style:none; margin:0 0 14px; padding:0; display:flex; flex-direction:column; gap:7px; position:relative; z-index:1; }
        .aov-acc-card__specs li { display:flex; justify-content:space-between; align-items:center; font-size:.78rem; }
        .aov-acc-card__specs li span   { color:var(--text-dark2); }
        .aov-acc-card__specs li strong { color:var(--text-dark); font-weight:700; }

        .aov-acc-card__feats { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:18px; position:relative; z-index:1; }
        .aov-feat { display:inline-flex; align-items:center; gap:4px; font-size:.65rem; font-weight:600; padding:3px 9px; border-radius:100px; }
        .aov-feat.on  { background:rgba(63,203,27,.1); color:var(--g); }
        .aov-feat.off { background:rgba(239,68,68,.08); color:var(--red); }

        .aov-acc-card__cta {
          display:flex; align-items:center; justify-content:center; gap:7px;
          padding:12px 18px; border-radius:100px; font-weight:800; font-size:.84rem;
          text-decoration:none; transition:all .28s var(--ease); margin-top:auto;
          background:rgba(255,255,255,.06); border:1px solid var(--border-dark); color:var(--text-dark);
          position:relative; z-index:1;
        }
        .aov-acc-card__cta:hover { border-color:var(--g-border); color:var(--g); }
        .aov-acc-card__cta.hi { background:var(--g); color:#000; border-color:var(--g); }
        .aov-acc-card__cta.hi:hover { box-shadow:0 8px 24px rgba(63,203,27,.35); transform:translateY(-2px); color:#000; }

        /* Demo bar */
        .aov-demo-bar {
          position:relative; overflow:hidden;
          display:flex; align-items:center; justify-content:space-between;
          gap:20px; flex-wrap:wrap;
          background:linear-gradient(135deg,rgba(63,203,27,.09),rgba(63,203,27,.03));
          border:1px solid var(--g-border); border-radius:var(--r-md); padding:22px 28px;
        }
        .aov-demo-bar__orb {
          position:absolute; width:220px; height:220px;
          background:radial-gradient(circle,rgba(63,203,27,.12),transparent);
          border-radius:50%; filter:blur(40px); right:-40px; top:-60px; pointer-events:none;
          animation:auraDrift 8s ease-in-out infinite;
        }
        .aov-demo-bar__left { display:flex; align-items:center; gap:14px; position:relative; z-index:1; }
        .aov-demo-bar__icon { width:44px; height:44px; border-radius:12px; flex-shrink:0; background:var(--g-faint); border:1px solid var(--g-border); color:var(--g); display:flex; align-items:center; justify-content:center; }
        .aov-demo-bar__left strong { display:block; font-size:.92rem; font-weight:800; color:var(--text-dark); margin-bottom:3px; }
        .aov-demo-bar__left span   { display:block; font-size:.75rem; color:var(--text-dark2); }
        .aov-demo-bar__btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:11px 22px; background:var(--bg-dark2); border:1px solid var(--border-dark);
          border-radius:100px; color:var(--text-dark); font-size:.82rem; font-weight:700;
          text-decoration:none; transition:all .22s; white-space:nowrap; flex-shrink:0;
          position:relative; z-index:1;
        }
        .aov-demo-bar__btn:hover { border-color:var(--g-border); color:var(--g); }
        @media(max-width:540px){ .aov-demo-bar { flex-direction:column; align-items:flex-start; } .aov-demo-bar__btn { width:100%; justify-content:center; } }

        /* ─── SHOWCASE ───────────────────────────── */
        .aov-showcase {
          display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;
        }
        @media(max-width:960px){ .aov-showcase { grid-template-columns:1fr; gap:48px; } }

        .aov-showcase__visual { position:relative; display:flex; justify-content:center; }
        .aov-showcase__glow {
          position:absolute; width:380px; height:380px;
          background:radial-gradient(circle,rgba(63,203,27,.16),transparent);
          border-radius:50%; filter:blur(60px); z-index:0;
        }
        .aov-platform-stack { position:relative; width:420px; max-width:100%; }
        .aov-platform-stack__bg  { position:absolute; inset:0; border-radius:22px; background:var(--bg-dark2); border:1px solid var(--g-border); transform:rotate(5deg) translateY(12px); opacity:.5; }
        .aov-platform-stack__mid { position:absolute; inset:0; border-radius:22px; background:var(--bg-dark3); border:1px solid var(--border-dark); transform:rotate(2.5deg) translateY(6px); box-shadow:0 8px 24px rgba(0,0,0,.35); }
        .aov-platform-card { position:relative; z-index:1; background:var(--bg-dark3); border:1px solid rgba(63,203,27,.2); border-radius:22px; overflow:hidden; box-shadow:0 24px 64px rgba(0,0,0,.5); }
        .aov-platform-card__header { display:flex; align-items:center; gap:6px; padding:10px 14px; background:rgba(255,255,255,.03); border-bottom:1px solid var(--border-dark); }
        .aov-platform-card__dots { display:flex; gap:5px; }
        .aov-platform-card__dots span { width:9px; height:9px; border-radius:50%; }
        .aov-platform-card__dots span:nth-child(1){background:#ff5f57}
        .aov-platform-card__dots span:nth-child(2){background:#febc2e}
        .aov-platform-card__dots span:nth-child(3){background:#28c840}
        .aov-platform-card__header span:last-child { font-size:.64rem; color:rgba(237,240,234,.4); margin-left:6px; }
        .aov-platform-card__body { display:flex; gap:0; padding:12px; }
        .aov-platform-card__chart { flex:1; }
        .aov-platform-card__chart-label { font-size:.6rem; color:rgba(237,240,234,.35); margin-bottom:4px; font-weight:600; }
        .aov-platform-card__order { width:100px; padding-left:10px; display:flex; align-items:center; }
        .aov-order-panel { background:rgba(255,255,255,.04); border:1px solid var(--border-dark); border-radius:10px; padding:10px; width:100%; }
        .aov-order-panel__head { font-size:.58rem; color:rgba(237,240,234,.35); margin-bottom:6px; text-transform:uppercase; letter-spacing:.06em; }
        .aov-order-panel__pair { font-size:.78rem; font-weight:800; color:var(--text-dark); margin-bottom:8px; }
        .aov-order-panel__prices { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
        .aov-order-panel__sell, .aov-order-panel__buy { text-align:center; }
        .aov-order-panel__sell span, .aov-order-panel__buy span { display:block; font-size:.55rem; font-weight:700; text-transform:uppercase; margin-bottom:2px; }
        .aov-order-panel__sell span { color:var(--red); }
        .aov-order-panel__buy  span { color:var(--g); }
        .aov-order-panel__sell strong, .aov-order-panel__buy strong { display:block; font-size:.7rem; font-weight:800; color:var(--text-dark); }
        .aov-order-panel__spread { font-size:.6rem; color:rgba(237,240,234,.3); }
        .aov-order-panel__lot { display:flex; justify-content:space-between; font-size:.62rem; }
        .aov-order-panel__lot span { color:rgba(237,240,234,.35); }
        .aov-order-panel__lot strong { color:var(--text-dark); }
        .aov-platform-card__feed { border-top:1px solid var(--border-dark); padding:10px 12px; display:flex; flex-direction:column; gap:5px; }
        .aov-feed-row { display:flex; align-items:center; gap:8px; font-size:.66rem; padding:4px 6px; background:rgba(255,255,255,.03); border-radius:6px; }
        .aov-feed-row__type { padding:2px 6px; border-radius:5px; font-size:.58rem; font-weight:800; }
        .aov-feed-row__type.buy  { background:rgba(63,203,27,.12); color:var(--g); }
        .aov-feed-row__type.sell { background:rgba(239,68,68,.12); color:var(--red); }
        .aov-feed-row__sym  { flex:1; color:rgba(237,240,234,.7); font-weight:600; }
        .aov-feed-row__lots { color:rgba(237,240,234,.4); }
        .aov-feed-row__pnl  { color:var(--profit); font-weight:700; margin-left:auto; }

        .aov-stat-badge {
          position:absolute; display:flex; align-items:center; gap:10px;
          background:rgba(14,17,14,.94); border:1px solid rgba(63,203,27,.22);
          border-radius:13px; padding:11px 14px; backdrop-filter:blur(12px);
          box-shadow:0 8px 24px rgba(0,0,0,.4);
        }
        .aov-stat-badge--tl { top:-18px; left:-30px; }
        .aov-stat-badge--br { bottom:-18px; right:-24px; }
        .aov-stat-badge__icon { width:34px; height:34px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:var(--g-faint); color:var(--g); border:1px solid var(--g-border); }
        .aov-stat-badge__icon.g { background:rgba(59,130,246,.1); color:#3b82f6; border-color:rgba(59,130,246,.2); }
        .aov-stat-badge strong { display:block; font-size:.92rem; font-weight:900; color:#fff; margin-bottom:1px; }
        .aov-stat-badge span   { display:block; font-size:.6rem; color:rgba(237,240,234,.42); }

        .aov-showcase__copy {}
        .aov-showcase__feats { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:24px 0 28px; }
        @media(max-width:480px){ .aov-showcase__feats { grid-template-columns:1fr; } }
        .aov-showcase__feat-item { display:flex; align-items:flex-start; gap:11px; padding:13px; background:rgba(255,255,255,.03); border:1px solid var(--border-dark); border-radius:12px; transition:border-color .22s; }
        .aov-showcase__feat-item:hover { border-color:var(--g-border); }
        .aov-showcase__feat-icon { width:36px; height:36px; border-radius:10px; flex-shrink:0; background:var(--g-faint); border:1px solid var(--g-border); color:var(--g); display:flex; align-items:center; justify-content:center; transition:all .25s; }
        .aov-showcase__feat-item:hover .aov-showcase__feat-icon { background:var(--g); color:#000; }
        .aov-showcase__feat-item strong { display:block; font-size:.8rem; font-weight:700; color:var(--text-dark); margin-bottom:2px; }
        .aov-showcase__feat-item span   { display:block; font-size:.7rem; color:var(--text-dark2); line-height:1.4; }
        .aov-showcase__actions { display:flex; gap:12px; flex-wrap:wrap; }

    

            /* ─── COMPARISON TABLE (WITH ANIMATIONS) ────────────────────────────── */
             /* ─── COMPARISON TABLE - FULLY RESPONSIVE ────────────────────────────── */
        .cmp-section {
          padding: 80px 0;
          background: var(--bg-light);
          color: var(--text-light);
        }
        .cmp-section .aov-h2 {
          color: var(--text-light);
        }
        .cmp-section .aov-sub {
          color: var(--text-light2);
        }

        /* Mobile Cards - Visible on tablet and mobile */
        .cmp-mobile {
          display: none;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 16px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }
        .cmp-mobile::-webkit-scrollbar {
          height: 4px;
        }
        .cmp-mobile::-webkit-scrollbar-track {
          background: var(--border-light);
          border-radius: 4px;
        }
        .cmp-mobile::-webkit-scrollbar-thumb {
          background: var(--g);
          border-radius: 4px;
        }

        /* Show mobile cards on tablet and below */
        @media (max-width: 968px) {
          .cmp-mobile {
            display: flex;
          }
          .cmp-wrap {
            display: none;
          }
        }

        .cmp-mob-card {
          flex: 0 0 280px;
          background: var(--bg-light2);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cmp-mob-card.highlight {
          border-color: var(--g);
          background: linear-gradient(135deg, var(--bg-light2), rgba(63,203,27,0.03));
          position: relative;
          overflow: hidden;
        }
        .cmp-mob-card.highlight::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--g);
        }
        .cmp-mob-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 35px -12px rgba(0,0,0,0.15);
        }
        .cmp-mob-card__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .cmp-mob-card__head strong {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-light);
        }
        .cmp-mob-badge {
          font-size: 0.6rem;
          font-weight: 700;
          padding: 3px 10px;
          background: rgba(63,203,27,0.12);
          color: var(--g);
          border-radius: 20px;
        }
        .cmp-mob-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-light);
        }
        .cmp-mob-row span:first-child {
          font-size: 0.75rem;
          color: var(--text-light2);
        }
        .cmp-mob-row strong {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-light);
        }
        .cmp-bool {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cmp-bool.on {
          color: #10b981;
        }
        .cmp-bool.off {
          color: #ef4444;
        }
        .cmp-mob-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: rgba(0,0,0,0.05);
          border: 1px solid var(--border-light);
          border-radius: 40px;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-light);
          transition: all 0.3s ease;
          margin-top: 8px;
        }
        .cmp-mob-cta:hover {
          border-color: var(--g);
          color: var(--g);
          transform: translateY(-2px);
        }
        .cmp-mob-cta.highlight {
          background: var(--g);
          color: #000;
          border-color: var(--g);
        }
        .cmp-mob-cta.highlight:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(63,203,27,0.3);
        }

        /* Desktop Table - Visible on desktop */
        .cmp-wrap {
          overflow-x: auto;
          border-radius: 20px;
          border: 1px solid var(--border-light);
          background: var(--bg-light2);
        }
        .cmp-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }
        .cmp-table th,
        .cmp-table td {
          padding: 16px 12px;
          text-align: center;
          border-bottom: 1px solid var(--border-light);
        }
        .cmp-table th:first-child,
        .cmp-table td:first-child {
          text-align: left;
          position: sticky;
          left: 0;
          background: var(--bg-light2);
          font-weight: 700;
        }
        .cmp-table tbody tr:hover {
          background: rgba(63,203,27,0.04);
        }
        .cmp-feature-col {
          width: 140px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-light);
          background: var(--bg-light3);
        }
        .cmp-account-col {
          min-width: 120px;
        }
        .cmp-account-col.highlight {
          background: linear-gradient(180deg, rgba(63,203,27,0.05), transparent);
        }
        .cmp-account-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .cmp-badge {
          font-size: 0.6rem;
          font-weight: 700;
          padding: 3px 10px;
          background: var(--g);
          color: #000;
          border-radius: 20px;
          display: inline-block;
        }
        .cmp-account-name {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-light);
        }
        .cmp-account-group {
          font-size: 0.65rem;
          color: var(--text-light2);
        }
        .cmp-feature {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-light);
        }
        .cmp-value {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-light2);
        }
        .cmp-value.highlight {
          font-weight: 700;
          color: var(--g);
          background: rgba(63,203,27,0.03);
        }
        .cmp-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cmp-icon.on {
          color: #10b981;
        }
        .cmp-icon.off {
          color: #ef4444;
        }
        .cmp-cta-row td {
          border-bottom: none;
          padding: 20px 12px;
        }
        .cmp-cta-cell {
          text-align: center;
        }
        .cmp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: rgba(0,0,0,0.05);
          border: 1px solid var(--border-light);
          border-radius: 40px;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-light);
          transition: all 0.3s ease;
        }
        .cmp-cta-btn:hover {
          border-color: var(--g);
          color: var(--g);
          transform: translateY(-2px);
        }
        .cmp-cta-btn.highlight {
          background: var(--g);
          color: #000;
          border-color: var(--g);
        }
        .cmp-cta-btn.highlight:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(63,203,27,0.3);
        }
        .cmp-note {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-light2);
          margin-top: 24px;
        }
        .cmp-note a {
          color: var(--g);
          text-decoration: none;
        }
        .cmp-note a:hover {
          text-decoration: underline;
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          .cmp-section {
            padding: 60px 0;
          }
          .cmp-mob-card {
            flex: 0 0 260px;
            padding: 16px;
          }
          .cmp-mob-card__head strong {
            font-size: 1rem;
          }
          .cmp-mob-row span:first-child {
            font-size: 0.7rem;
          }
          .cmp-mob-row strong {
            font-size: 0.8rem;
          }
          .cmp-mob-cta {
            padding: 10px;
            font-size: 0.75rem;
          }
        }

        /* ─── WHY ────────────────────────────────── */
        .aov-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        @media(max-width:900px){ .aov-why-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:520px){ .aov-why-grid { grid-template-columns:1fr; } }
        .aov-why-card {
          background:var(--bg-dark3); border:1px solid var(--border-dark);
          border-radius:var(--r-md); padding:28px 24px;
          position:relative; overflow:hidden;
          transition:transform .3s var(--ease),border-color .3s,box-shadow .3s;
          animation-delay:calc(var(--wi)*0.07s);
        }
        .aov-why-card:hover { transform:translateY(-5px); border-color:var(--g-border); box-shadow:0 12px 36px rgba(63,203,27,.1); }
        .aov-why-card__glow { position:absolute; top:-40px; left:50%; transform:translateX(-50%); width:160px; height:160px; background:radial-gradient(circle,var(--g-glow),transparent); border-radius:50%; filter:blur(30px); opacity:0; transition:opacity .4s; pointer-events:none; }
        .aov-why-card:hover .aov-why-card__glow { opacity:1; }
        .aov-why-card__icon { width:50px; height:50px; border-radius:14px; margin-bottom:18px; background:var(--g-faint); border:1px solid var(--g-border); color:var(--g); display:flex; align-items:center; justify-content:center; transition:all .3s; }
        .aov-why-card:hover .aov-why-card__icon { background:var(--g); color:#000; transform:scale(1.06) rotate(-4deg); box-shadow:0 6px 18px rgba(63,203,27,.3); }
        .aov-why-card__title { font-size:.96rem; font-weight:800; color:var(--text-dark); margin:0 0 8px; }
        .aov-why-card__desc  { font-size:.78rem; color:var(--text-dark2); line-height:1.65; margin:0; }
        .aov-why-card__line  { position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--g),transparent); opacity:0; transition:opacity .3s; }
        .aov-why-card:hover .aov-why-card__line { opacity:1; }

        /* ─── FAQ ────────────────────────────────── */
        .aov-faq-layout { display:grid; grid-template-columns:1fr 1.8fr; gap:80px; align-items:start; }
        @media(max-width:860px){ .aov-faq-layout { grid-template-columns:1fr; gap:36px; } }
        .aov-faq-list { display:flex; flex-direction:column; gap:10px; }
        .aov-faq-item { background:var(--bg-dark3); border:1px solid var(--border-dark); border-radius:var(--r-md); overflow:hidden; cursor:pointer; transition:border-color .25s,box-shadow .25s; }
        .aov-faq-item.open { border-color:var(--g-border); box-shadow:0 6px 22px rgba(63,203,27,.1); }
        .aov-faq-item__q { display:flex; justify-content:space-between; align-items:center; padding:18px 20px; gap:14px; width:100%; background:none; border:none; cursor:pointer; font-size:.87rem; font-weight:700; color:var(--text-dark); text-align:left; line-height:1.4; font-family:inherit; }
        .aov-faq-item__ico { width:30px; height:30px; border-radius:8px; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:var(--g-faint); color:var(--g); border:1px solid var(--g-border); transition:all .25s; }
        .aov-faq-item.open .aov-faq-item__ico { background:var(--g); color:#000; }
        .aov-faq-item__a { overflow:hidden; }
        .aov-faq-item__a p { margin:0; padding:0 20px 18px; font-size:.82rem; color:var(--text-dark2); line-height:1.7; border-top:1px solid var(--border-dark); padding-top:14px; }

        /* ─── CTA BANNER ─────────────────────────── */
        .aov-cta-section {
          position:relative; overflow:hidden; background:var(--bg-dark);
          padding:100px 0; text-align:center;
          border-top:1px solid rgba(63,203,27,.1);
        }
        .aov-cta-section__orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
        .aov-cta-section__orb--1 { width:500px; height:500px; background:radial-gradient(circle,rgba(63,203,27,.15),transparent); top:-150px; right:-100px; animation:auraDrift 10s ease-in-out infinite; }
        .aov-cta-section__orb--2 { width:350px; height:350px; background:radial-gradient(circle,rgba(45,180,10,.1),transparent); bottom:-100px; left:-80px; animation:auraDrift 14s ease-in-out infinite reverse; }
        .aov-cta-section__inner { position:relative; z-index:1; max-width:640px; margin:0 auto; }
        .aov-cta-section__eyebrow { display:inline-flex; align-items:center; gap:7px; font-size:.67rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--g); margin-bottom:18px; }
        .aov-cta-section__title { font-size:clamp(1.8rem,4vw,3rem); font-weight:900; color:#fff; letter-spacing:-.04em; line-height:1.15; margin:0 0 16px; }
        .aov-cta-section__desc  { font-size:.94rem; color:rgba(237,240,234,.55); line-height:1.7; margin:0 auto 30px; }
        .aov-cta-section__actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom:24px; }
        .aov-cta-section__chips   { display:flex; flex-wrap:wrap; gap:9px; justify-content:center; }

        /* ─── RESPONSIVE ─────────────────────────── */
        @media(max-width:640px){
          .aov-section { padding:70px 0; }
          .aov-section-alt { padding:70px 0; }
          .aov-hero { padding-top:72px; }
          .aov-hero__strip-item { min-width:70px; padding:12px 6px; }
          .aov-group-toggle { flex-direction:column; }
          .aov-cta-section { padding:72px 0; }
        }
      `}</style>
    </>
  );
}