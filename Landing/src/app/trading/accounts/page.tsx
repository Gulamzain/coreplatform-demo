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

const platformFeatures = [
  { icon: <FiZap size={22}/>,       title: 'Sub-40ms Execution',   desc: 'No dealing desk. Orders fill in under 40 milliseconds on average.' },
  { icon: <FiShield size={22}/>,    title: 'FCA & ASIC Regulated', desc: 'Client funds held in segregated accounts at Tier-1 banks.' },
  { icon: <BiBarChartAlt2 size={22}/>, title: '2,250+ Instruments',desc: 'Forex, Stocks, Indices, Commodities, Crypto CFDs.' },
  { icon: <BiGlobe size={22}/>,     title: 'Global Coverage',      desc: 'Serve clients across 40+ countries with local payment methods.' },
  { icon: <BiSupport size={22}/>,   title: '24/7 Expert Support',  desc: 'Multilingual support team available every hour, every day.' },
  { icon: <BiWallet size={22}/>,    title: 'Instant Deposits',     desc: 'Fund your account instantly via cards, e-wallets, or crypto.' },
];

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

export default function AccountsOverviewPage() {
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const refs = useRef<{[k:string]: HTMLElement|null}>({});
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, -120]);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const setRef = (id:string) => (el:HTMLElement|null) => { refs.current[id] = el; };

  return (
    <>
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined}/>
      <div id="aov">

        {/* 1. HERO SECTION - Dark Background */}
        <section className="aov-hero" ref={heroRef}>
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

          <div className="aov-hero__inner">
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

            <motion.div
              className="aov-hero__graphic"
              initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:.35,duration:.8,ease:[.16,1,.3,1]}}
            >
              <div className="aov-hero__img-wrap">
                <img src="/images/Accounts-verview-HERO.png" alt="Accounts Overview" className="aov-hero__img" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* LIVE TICKER */}
        <div className="aov-ticker">
          <div className="aov-ticker__label"><FiActivity size={10}/>MARKETS</div>
          <div className="aov-ticker__track">
            <div className="aov-ticker__inner">
              {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t,i) => (
                <div key={i} className="aov-ticker__item">
                  <span className="aov-ticker__sym">{t.sym}</span>
                  <span className="aov-ticker__price">{t.p}</span>
                  <span className={`aov-ticker__chg ${t.up?'up':'dn'}`}>{t.ch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. ACCOUNT TYPES SECTION - White Background */}
        <section id="accounts" ref={setRef('accounts')} className={`aov-section-white aov-reveal ${visible.has('accounts')?'on':''}`}>
          <div className="aov-container">
            <div className="aov-section-head" style={{textAlign:'center',marginBottom:'56px'}}>
              <p className="aov-eyebrow" style={{color:'#2e9c14',fontSize:'.72rem',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',display:'block',marginBottom:'12px'}}>Account Types</p>
              <h2 className="aov-h2">More Choice. More Control.</h2>
              <p className="aov-sub">Transparent pricing. No hidden fees. Tailored to your trading style.</p>
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

        {/* 3. COMPARISON TABLE SECTION - Black Background */}
        <section id="compare" ref={setRef('compare')} className={`cmp-section-dark aov-reveal ${visible.has('compare')?'on':''}`}>
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

            {/* Mobile Horizontal Cards */}
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

            {/* Desktop Table View */}
            <div className="cmp-wrap">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th className="cmp-feature-col">Feature</th>
                    {compareAccounts.map((acc) => (
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

        {/* 4. WHY FOXNANCE SECTION - White Background */}
        <section id="why" ref={setRef('why')} className={`aov-section-white aov-reveal ${visible.has('why')?'on':''}`}>
          <div className="aov-container">
            <div className="aov-section-head">
              <span className="aov-eyebrow" style={{color:'#2e9c14'}}>The Foxnance Edge</span>
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

        {/* 5. FAQ SECTION - Black Background */}
        <section id="faq" ref={setRef('faq')} className={`aov-section-faq aov-reveal ${visible.has('faq')?'on':''}`}>
          <div className="aov-container">
            <div className="aov-section-head" style={{textAlign:'center',marginBottom:'56px'}}>
              <span className="aov-eyebrow" style={{color:'#3fcb1b'}}>FAQ</span>
              <h2 className="aov-h2" style={{color:'#fff'}}>Frequently Asked Questions</h2>
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

        {/* 6. FINAL CTA SECTION - White Background */}
        <section className="aov-cta-section-white">
          <div className="aov-container">
            <div className="aov-cta-centered-header">
              <p className="aov-eyebrow" style={{color:'#2e9c14',fontSize:'.72rem',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',marginBottom:'12px'}}>
                Ready to Trade?
              </p>
              <h2 className="aov-cta-title">
                Open Your Account in Under 5 Minutes
              </h2>
            </div>
            
            <div className="aov-cta-grid">
              <div className="aov-cta-content">
                <p className="aov-cta-desc">
                  Join 500,000+ traders with instant account setup, no joining fee, and 24/7 expert support from day one.
                </p>
                <div className="aov-cta-actions">
                  <Link href="/auth-signup" className="aov-btn-primary aov-btn-primary--lg">
                    Open Live Account <FiArrowRight/>
                  </Link>
                  <Link href="/demo" className="aov-btn-ghost-dark">Try Free Demo</Link>
                </div>
                <div className="aov-cta-chips">
                  {['No joining fee','Regulated broker','Instant deposits','24/7 support'].map((c,i) => (
                    <span key={i} className="aov-chip-dark"><FiCheck size={11}/>{c}</span>
                  ))}
                </div>
              </div>
              <div className="aov-cta-visual">
                <img 
                  src="/images/Accounts-Hero-2.png" 
                  alt="Foxnance Trading Dashboard" 
                  className="aov-cta-img"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
      <CookieModal/>

      {/* ── STYLING ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

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
          --bg-dark:  #000000;
          --bg-dark2: #0a0a0a;
          --bg-dark3: #111111;
          --bg-light: #ffffff;
          --bg-light-card: #f8fafc;
          --border-dark: rgba(255,255,255,0.08);
          --border-light: #e2e8f0;
          --text-dark: #edf0ea;
          --text-dark2: rgba(237,240,234,0.55);
          --text-light: #0f172a;
          --text-light-secondary: #475569;
          --ease:     cubic-bezier(0.16,1,0.3,1);
          font-family:'Sora','DM Sans',system-ui,sans-serif;
          overflow-x:hidden;
          background: var(--bg-dark);
          color: var(--text-dark);
        }

        #aov *, #aov *::before, #aov *::after { box-sizing:border-box; }
        .aov-container { max-width:1240px; margin:0 auto; padding:0 24px; }
        @media(min-width:1024px){ .aov-container { padding:0 52px; } }
        .aov-reveal { opacity:0; transform:translateY(44px); transition:opacity .9s var(--ease),transform .9s var(--ease); }
        .aov-reveal.on { opacity:1; transform:translateY(0); }

        .aov-eyebrow { display:inline-flex; align-items:center; gap:10px; font-size:.67rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--g); margin-bottom:14px; }
        .aov-eyebrow::before,.aov-eyebrow::after { content:''; display:block; width:26px; height:1.5px; background:currentColor; opacity:.5; border-radius:2px; }
        .aov-h2 { font-size:clamp(1.8rem,3.8vw,2.8rem); font-weight:900; letter-spacing:-.04em; line-height:1.15; margin:0 0 10px; }
        .aov-sub { font-size:.94rem; line-height:1.7; max-width:500px; margin:0 auto; }
        .aov-section-head { text-align:center; margin-bottom:56px; display:flex; flex-direction:column; align-items:center; }

        /* BUTTON GENERICS */
        .aov-btn-primary { display:inline-flex; align-items:center; gap:7px; padding:13px 28px; background:var(--g); color:#000; font-weight:800; font-size:.88rem; border-radius:100px; text-decoration:none; transition:all .3s var(--ease); position:relative; overflow:hidden; }
        .aov-btn-primary::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); transform:translateX(-100%); transition:transform .5s; }
        .aov-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(63,203,27,.35); color:#000; }
        .aov-btn-primary:hover::before { transform:translateX(100%); }
        .aov-btn-primary--lg { padding:15px 34px; font-size:.95rem; }
        .aov-btn-ghost { display:inline-flex; align-items:center; gap:7px; padding:13px 28px; background:transparent; color:rgba(237,240,234,.8); font-weight:700; font-size:.88rem; border:1.5px solid rgba(255,255,255,.18); border-radius:100px; text-decoration:none; transition:all .3s var(--ease); }
        .aov-btn-ghost:hover { border-color:var(--g); color:var(--g); transform:translateY(-2px); }
        .aov-btn-ghost-dark { display:inline-flex; align-items:center; gap:7px; padding:13px 28px; background:transparent; color:var(--text-light); font-weight:700; font-size:.88rem; border:1.5px solid rgba(0,0,0,0.15); border-radius:100px; text-decoration:none; transition:all .3s var(--ease); }
        .aov-btn-ghost-dark:hover { border-color:#000; transform:translateY(-2px); }

        /* ========== 1. HERO ========== */
        .aov-hero { position:relative; background:var(--bg-dark); overflow:clip; display:flex; flex-direction:column; align-items:stretch; padding:0; }
        .aov-hero__canvas { position:absolute; inset:0; pointer-events:none; z-index:0; }
        .aov-hero__noise { position:absolute; inset:0; opacity:.35; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E"); background-size:180px; }
        .aov-hero__aurora { position:absolute; border-radius:50%; filter:blur(100px); }
        .aov-aurora-1 { width:640px; height:640px; background:radial-gradient(circle,rgba(63,203,27,.2),transparent 70%); top:-200px; right:-80px; animation:auraDrift 12s ease-in-out infinite; }
        .aov-aurora-2 { width:480px; height:480px; background:radial-gradient(circle,rgba(45,180,10,.15),transparent 70%); bottom:-100px; left:-60px; animation:auraDrift 9s ease-in-out infinite reverse; }
        .aov-aurora-3 { width:300px; height:300px; background:radial-gradient(circle,rgba(100,220,60,.09),transparent 70%); top:40%; left:35%; animation:auraDrift 7s ease-in-out infinite; }
        .aov-hero__grid { position:absolute; inset:0; width:100%; height:100%; }
        .aov-hero__inner { display:grid; grid-template-columns:1fr 1fr; gap:0; align-items:stretch; width:100%; position:relative; z-index:1; min-height: calc(100vh - 72px); }
        .aov-hero__title { font-size:clamp(2.4rem,5.5vw,4rem); font-weight:900; line-height:1.12; color:#fff; letter-spacing:-.045em; margin:0 0 18px; }
        .aov-hero__accent { background:linear-gradient(135deg,#3fcb1b 0%,#7de84a 50%,#3fcb1b 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
        .aov-hero__desc { font-size:.98rem; color:var(--text-dark2); line-height:1.72; margin:0 0 28px; }
        .aov-hero__actions { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:24px; }
        .aov-hero__copy { display:flex; flex-direction:column; justify-content:center; padding:60px 60px 60px 80px; }
        .aov-hero__graphic { position:relative; display:flex; justify-content:flex-start; align-items:flex-end; overflow:visible; }
        .aov-hero__img-wrap { position:absolute; bottom:-20px; left:-5%; width:115%; display:flex; align-items:flex-end; justify-content:flex-start; pointer-events:none; }
        .aov-hero__img { width:100%; height:auto; display:block; object-fit:contain; object-position:left bottom; filter:drop-shadow(-20px 0 80px rgba(0,0,0,0.7)); }

        .orb-field { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
        .orb-field__dot { position:absolute; background:var(--g); border-radius:50%; opacity:0; box-shadow:0 0 8px 2px rgba(63,203,27,.4); animation:ptFloat var(--dur,4s) ease-in-out infinite; }
        @keyframes ptFloat { 0%{opacity:0;transform:translateY(0) scale(.5)} 20%{opacity:.8} 80%{opacity:.5} 100%{opacity:0;transform:translateY(-55px) scale(1.3)} }

        /* ========== TICKER STRIP FIX (IMAGE_973309 REPAIR) ========== */
        .aov-ticker { 
          display: flex; 
          align-items: center; 
          height: 44px; 
          background: #050705; 
          border-bottom: 1px solid var(--border-dark); 
          overflow: hidden; 
          position: relative;
          z-index: 10;
          width: 100%;
        }
        .aov-ticker__label { 
          display: flex; 
          align-items: center; 
          gap: 6px; 
          padding: 0 20px; 
          background: var(--g); 
          color: #000; 
          font-size: .65rem; 
          font-weight: 800; 
          letter-spacing: .1em; 
          text-transform: uppercase; 
          height: 100%; 
          flex-shrink: 0; 
          white-space: nowrap; 
          z-index: 12;
          box-shadow: 8px 0 20px rgba(0,0,0,0.4);
        }
        .aov-ticker__track { 
          flex: 1; 
          overflow: hidden; 
          height: 100%; 
          display: flex;
          align-items: center;
        }
        /* Forces horizontal flow layout inside track window */
        .aov-ticker__inner { 
          display: flex; 
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: center; 
          gap: 0;
          height: 100%; 
          width: max-content;
          animation: tickerLoop 25s linear infinite;
        }
        .aov-ticker__item { 
          display: flex; 
          flex-direction: row !important;
          align-items: center; 
          gap: 8px; 
          padding: 0 28px; 
          white-space: nowrap !important; 
          border-right: 1px solid var(--border-dark); 
          height: 100%; 
          flex-shrink: 0;
        }
        .aov-ticker__sym   { font-size: .75rem; font-weight: 700; color: #fff; }
        .aov-ticker__price { font-size: .75rem; color: var(--text-dark2); font-family: monospace; }
        .aov-ticker__chg   { font-size: .7rem; font-weight: 700; }
        .aov-ticker__chg.up { color: var(--g); }
        .aov-ticker__chg.dn { color: var(--red); }

        @keyframes tickerLoop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        /* ========== 2. ACCOUNT TYPES SECTION (WHITE) ========== */
        .aov-section-white { padding:96px 0; background: var(--bg-light); color: var(--text-light); }
        .aov-section-white .aov-h2 { color: var(--text-light); }
        .aov-section-white .aov-sub { color: var(--text-light-secondary); }
        .fx-accounts-three-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:30px; max-width:1100px; margin:0 auto; }
        .fx-account { position:relative; padding:40px 32px; background: var(--bg-light-card); border:1px solid var(--border-light); border-radius:12px; transition:all .3s cubic-bezier(0.16,1,0.3,1); display:flex; flex-direction:column; }
        .fx-account:hover { transform:translateY(-8px); border-color:rgba(63,203,27,.5); background:#ffffff; box-shadow:0 20px 40px rgba(0,0,0,0.08); }
        .fx-account--featured { border:1px solid #3fcb1b!important; background:rgba(63,203,27,.03)!important; box-shadow:0 10px 30px rgba(63,203,27,0.06); }
        .fx-account__badge { position:absolute; top:-14px; left:50%; transform:translateX(-50%); padding:4px 16px; border-radius:99px; font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; }
        .fx-account__name { font-size:1.5rem; font-weight:800; color:var(--text-light); margin-bottom:24px; text-align:center; }
        .fx-account__row { display:flex; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--border-light); font-size:.9rem; }
        .fx-account__row:last-of-type { border-bottom:none; }
        .fx-account__key { color:var(--text-light-secondary); }
        .fx-account__val { font-weight:700; color:var(--text-light); }

        .fx-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; font-size:.9rem; font-weight:700; border-radius:8px; text-decoration:none; transition:all .22s; cursor:pointer; border:none; white-space:nowrap; font-family:inherit; }
        .fx-btn--green { background:linear-gradient(135deg,#3fcb1b 0%,#2e9c14 100%); color:#000; box-shadow:0 4px 18px rgba(63,203,27,.28); }
        .fx-btn--green:hover { background:#2e9c14; transform:translateY(-1px); }
        .fx-btn--outline-white { background:transparent; color:var(--text-light); border:1.5px solid var(--text-light-secondary); }
        .fx-btn--outline-white:hover { background:rgba(0,0,0,.04); border-color:var(--text-light); }
        .fx-btn--sm { padding:10px 20px; font-size:.82rem; }
        .fx-btn--full { width:100%; justify-content:center; margin-top:20px; }

        /* ========== 3. COMPARISON TABLE SECTION (BLACK) ========== */
        .cmp-section-dark { padding:96px 0; background: var(--bg-dark); color: var(--text-dark); border-top: 1px solid var(--border-dark); }
        .cmp-section-dark .aov-h2 { color: #fff; }
        .cmp-section-dark .aov-sub { color: var(--text-dark2); }
        .cmp-wrap { overflow-x: auto; border-radius: 20px; border: 1px solid var(--border-dark); background: var(--bg-dark2); }
        .cmp-table { width: 100%; border-collapse: collapse; min-width: 800px; }
        .cmp-table th, .cmp-table td { padding: 16px 12px; text-align: center; border-bottom: 1px solid var(--border-dark); transition: background-color 0.25s var(--ease); }
        .cmp-table th:first-child, .cmp-table td:first-child { text-align: left; position: sticky; left: 0; background: var(--bg-dark2); font-weight: 700; z-index: 2; color: #fff; }
        .cmp-table tbody tr:hover td { background: rgba(255, 255, 255, 0.05) !important; }
        .cmp-table tbody tr:hover td:first-child { background: var(--bg-dark3) !important; }
        
        .cmp-feature-col { width: 140px; font-size: 0.8rem; font-weight: 700; color: var(--text-dark); background: var(--bg-dark3); }
        .cmp-account-col { min-width: 120px; }
        .cmp-account-col.highlight { background: linear-gradient(180deg, rgba(63,203,27,0.08), transparent); }
        .cmp-account-header { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .cmp-badge { font-size: 0.6rem; font-weight: 700; padding: 3px 10px; background: var(--g); color: #000; border-radius: 20px; display: inline-block; }
        .cmp-account-name { font-size: 0.9rem; font-weight: 800; color: #fff; }
        .cmp-account-group { font-size: 0.65rem; color: var(--text-dark2); }
        .cmp-feature { font-size: 0.8rem; font-weight: 600; color: #fff; }
        .cmp-value { font-size: 0.85rem; font-weight: 500; color: var(--text-dark); }
        .cmp-value.highlight { font-weight: 700; color: var(--g); background: rgba(63,203,27,0.02); }
        .cmp-icon.on { color: #10b981; }
        .cmp-icon.off { color: #ef4444; }
        .cmp-cta-row td { border-bottom: none; padding: 20px 12px; }
        .cmp-cta-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-dark); border-radius: 40px; text-decoration: none; font-size: 0.75rem; font-weight: 700; color: #fff; transition: all 0.3s ease; }
        .cmp-cta-btn:hover { border-color: var(--g); color: var(--g); transform: translateY(-2px); }
        .cmp-cta-btn.highlight { background: var(--g); color: #000; border-color: var(--g); }
        .cmp-cta-btn.highlight:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(63,203,27,0.3); }

        .cmp-mobile { display: none; gap: 16px; overflow-x: auto; padding-bottom: 16px; -webkit-overflow-scrolling: touch; }
        .cmp-mob-card { flex: 0 0 280px; background: var(--bg-dark2); border: 1px solid var(--border-dark); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .cmp-mob-card.highlight { border-color: var(--g); background: linear-gradient(135deg, var(--bg-dark2), rgba(63,203,27,0.03)); position: relative; overflow: hidden; }
        .cmp-mob-card.highlight::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--g); }
        .cmp-mob-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); border-color: rgba(63,203,27,0.4); }
        .cmp-mob-card__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding-bottom: 12px; border-bottom: 1px solid var(--border-dark); }
        .cmp-mob-card__head strong { font-size: 1.1rem; font-weight: 800; color: #fff; }
        .cmp-mob-badge { font-size: 0.6rem; font-weight: 700; padding: 3px 10px; background: rgba(63,203,27,0.12); color: var(--g); border-radius: 20px; }
        .cmp-mob-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-dark); }
        .cmp-mob-row span:first-child { font-size: 0.75rem; color: var(--text-dark2); }
        .cmp-mob-row strong { font-size: 0.85rem; font-weight: 700; color: #fff; }
        .cmp-mob-cta { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-dark); border-radius: 40px; text-decoration: none; font-size: 0.8rem; font-weight: 700; color: #fff; transition: all 0.3s ease; margin-top: 8px; }
        .cmp-mob-cta:hover { border-color: var(--g); color: var(--g); transform: translateY(-2px); }

        /* ========== 4. WHY FOXNANCE SECTION (WHITE) ========== */
        .aov-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .aov-why-card { background: #f8fafc; border:1px solid var(--border-light); border-radius:var(--r-md); padding:28px 24px; position:relative; overflow:hidden; transition:transform .3s var(--ease),border-color .3s,box-shadow .3s; }
        .aov-why-card suicide { transform:translateY(-5px); border-color:var(--g-border); box-shadow:0 12px 36px rgba(0,0,0,0.06); background:#ffffff; }
        .aov-why-card__glow { position:absolute; top:-40px; left:50%; transform:translateX(-50%); width:160px; height:160px; background:radial-gradient(circle,rgba(63,203,27,0.1),transparent); border-radius:50%; filter:blur(30px); opacity:0; transition:opacity .4s; pointer-events:none; }
        .aov-why-card:hover .aov-why-card__glow { opacity:1; }
        .aov-why-card__icon { width:50px; height:50px; border-radius:14px; margin-bottom:18px; background:rgba(63,203,27,0.08); border:1px solid rgba(63,203,27,0.2); color:var(--g-dark); display:flex; align-items:center; justify-content:center; transition:all .3s; }
        .aov-why-card:hover .aov-why-card__icon { background:var(--g); color:#000; transform:scale(1.06) rotate(-4deg); box-shadow:0 6px 18px rgba(63,203,27,.3); }
        .aov-why-card__title { font-size:.96rem; font-weight:800; color:var(--text-light); margin:0 0 8px; }
        .aov-why-card__desc { font-size:.78rem; color:var(--text-light-secondary); line-height:1.65; margin:0; }
        .aov-why-card__line { position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--g),transparent); opacity:0; transition:opacity .3s; }
        .aov-why-card:hover .aov-why-card__line { opacity:1; }

        /* ========== 5. FAQ SECTION (BLACK) ========== */
        .aov-section-faq { padding: 140px 0; background: #000000; border-top: 1px solid var(--border-dark); }
        .fx-faq { max-width:720px; margin:0 auto; }
        .fx-faq__item { border-bottom: 1px solid var(--border-dark); }
        .fx-faq__q { width:100%; display:flex; align-items:center; justify-content:space-between; padding:24px 0; font-size:.95rem; font-weight:600; color:#fff; background:transparent; border:none; cursor:pointer; text-align:left; gap:16px; transition:color .2s; font-family:inherit; }
        .fx-faq__q:hover { color:#3fcb1b; }
        .fx-faq__a { padding:0 0 24px; font-size:.88rem; color:var(--text-dark2); line-height:1.7; }

        /* ========== 6. READY TO TRADE SECTION (WHITE) ========== */
        .aov-cta-section-white { padding: 120px 0; background: var(--bg-light); border-top: 1px solid var(--border-light); }
        .aov-cta-centered-header { text-align: center; margin-bottom: 64px; width: 100%; }
        .aov-cta-title { font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 900; color: var(--text-light); letter-spacing: -.040em; margin: 0; line-height: 1.15; }
        .aov-cta-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }
        .aov-cta-desc { font-size: 1.1rem; color: var(--text-light-secondary); line-height: 1.7; margin-bottom: 36px; }
        .aov-cta-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 36px; }
        .aov-cta-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .aov-chip-dark { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600; padding: 6px 14px; border: 1px solid rgba(0,0,0,0.1); border-radius: 100px; color: var(--text-light-secondary); background: rgba(0,0,0,0.02); }
        .aov-chip-dark svg { color: var(--g-dk); }
        .aov-cta-visual { display: flex; justify-content: center; align-items: center; position: relative; }
        .aov-cta-img { max-width: 100%; height: auto; display: block; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.06)); }

        /* SCREEN RESPONSIVENESS */
        @media (max-width: 968px) {
          .cmp-mobile { display: flex; }
          .cmp-wrap { display: none; }
          .aov-hero__inner { grid-template-columns:1fr; min-height: auto; text-align: center; }
          .aov-hero__copy { padding: 80px 24px 60px; max-width: 700px; margin: 0 auto; }
          .aov-hero__actions { justify-content: center; }
          .aov-hero__graphic { display: none; }
          .fx-accounts-three-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .aov-why-grid { grid-template-columns: repeat(2, 1fr); }
          .aov-cta-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .aov-cta-actions, .aov-cta-chips { justify-content: center; }
          .aov-cta-visual { order: -1; }
        }

        @media (max-width: 768px) {
          .aov-section-white, .cmp-section-dark, .aov-section-faq, .aov-cta-section-white { padding: 75px 0; }
          .aov-section-head, .aov-cta-centered-header { margin-bottom: 40px; }
        }

        @media (max-width: 640px) {
          .fx-accounts-three-grid, .aov-why-grid { grid-template-columns: 1fr; }
          .aov-hero__actions, .aov-cta-actions { flex-direction: column; align-items: stretch; }
          .aov-btn-primary, .aov-btn-ghost, .aov-btn-ghost-dark { justify-content: center; }
        }

        @media (max-width: 480px) {
          .cmp-mob-card { flex: 0 0 260px; padding: 16px; }
          .cmp-mob-card__head strong { font-size: 1rem; }
          .cmp-mob-row span:first-child { font-size: 0.7rem; }
          .cmp-mob-row strong { font-size: 0.8rem; }
        }
      `}</style>
    </>
  );
}