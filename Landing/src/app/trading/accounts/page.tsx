// src/app/(marketing)/accounts/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  BiDollar, BiShield, BiGlobe, BiLineChart, BiSupport,
  BiTrendingUp, BiLock, BiCheck, BiStar, BiTransfer,
  BiBarChartAlt2, BiWallet, BiGroup, BiRocket, BiTime, BiSun, BiMoon,
} from 'react-icons/bi';
import {
  FiArrowRight, FiCheck, FiX, FiZap, FiActivity,
  FiShield, FiGlobe, FiTrendingUp, FiChevronDown, FiChevronUp,
} from 'react-icons/fi';

const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

// ── DATA ─────────────────────────────────────────────────────────────────
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const refs = useRef<{[k:string]: HTMLElement|null}>({});
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, -120]);

  // Check for saved theme preference on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }, [])

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }

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
      
      {/* Dark Mode Toggle Button */}
      <button 
        onClick={toggleDarkMode} 
        className="dark-mode-toggle"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <BiSun size={20} /> : <BiMoon size={20} />}
        <span className="dark-mode-toggle__tooltip">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </span>
      </button>

      <div id="aov">

        {/* 1. HERO SECTION - Dark Background (always dark) */}
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

        {/* 2. ACCOUNT TYPES SECTION - White/Light Background */}
        <section id="accounts" ref={setRef('accounts')} className={`aov-section-white aov-reveal ${visible.has('accounts')?'on':''}`}>
          <div className="aov-container">
            <div className="aov-section-head">
              <p className="aov-eyebrow">Account Types</p>
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
                  {a.badge && <div className="fx-account__badge">{a.badge}</div>}
                  <h3 className="fx-account__name">{a.name}</h3>
                  {a.rows.map(([k, v], j) => (
                    <div key={j} className="fx-account__row">
                      <span className="fx-account__key">{k}</span>
                      <span className="fx-account__val">{v}</span>
                    </div>
                  ))}
                  <Link href="/auth-signup" className={`fx-btn fx-btn--sm fx-btn--full ${a.featured ? "fx-btn--green" : "fx-btn--outline"}`}>
                    Open {a.name} Account
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. COMPARISON TABLE SECTION - Dark Background */}
        <section id="compare" ref={setRef('compare')} className={`cmp-section-dark aov-reveal ${visible.has('compare')?'on':''}`}>
          <div className="aov-container">
            <div className="aov-section-head">
              <span className="aov-eyebrow aov-eyebrow--light">Compare</span>
              <h2 className="aov-h2 aov-h2--light">All Accounts, Side by Side</h2>
              <p className="aov-sub aov-sub--light">Every detail in one place — no hidden conditions, no small print.</p>
            </div>

            {/* Mobile Horizontal Cards */}
            <div className="cmp-mobile">
              {compareAccounts.map((acc, i) => (
                <div key={acc.id} className={`cmp-mob-card ${acc.highlight?'highlight':''}`}>
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
                </div>
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
              <span className="aov-eyebrow">The Foxnance Edge</span>
              <h2 className="aov-h2">Why 500,000+ Traders Choose Us</h2>
              <p className="aov-sub">Every account comes with the same institutional-grade infrastructure.</p>
            </div>
            <div className="aov-why-grid">
              {platformFeatures.map((f,i) => (
                <div key={i} className="aov-why-card">
                  <div className="aov-why-card__glow"/>
                  <div className="aov-why-card__icon">{f.icon}</div>
                  <h3 className="aov-why-card__title">{f.title}</h3>
                  <p className="aov-why-card__desc">{f.desc}</p>
                  <div className="aov-why-card__line"/>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQ SECTION - Dark Background */}
        <section id="faq" ref={setRef('faq')} className={`aov-section-faq aov-reveal ${visible.has('faq')?'on':''}`}>
          <div className="aov-container">
            <div className="aov-section-head">
              <span className="aov-eyebrow aov-eyebrow--light">FAQ</span>
              <h2 className="aov-h2 aov-h2--light">Frequently Asked Questions</h2>
            </div>
            <div className="fx-faq">
              {faqs.map((f,i) => (
                <div key={i} className={`fx-faq__item ${openFaq===i?'open':''}`}>
                  <button className="fx-faq__q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                    <span>{f.q}</span>
                    {openFaq===i
                      ? <span className="fx-faq__icon open"><FiChevronUp size={16}/></span>
                      : <span className="fx-faq__icon"><FiChevronDown size={16}/></span>
                    }
                  </button>
                  <AnimatePresence>
                    {openFaq===i && (
                      <motion.div
                        initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
                        exit={{height:0,opacity:0}} transition={{duration:.3,ease:[.16,1,.3,1]}}
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
              <p className="aov-eyebrow">Ready to Trade?</p>
              <h2 className="aov-cta-title">Open Your Account in Under 5 Minutes</h2>
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
                  <Link href="/demo" className="aov-btn-ghost">Try Free Demo</Link>
                </div>
                <div className="aov-cta-chips">
                  {['No joining fee','Regulated broker','Instant deposits','24/7 support'].map((c,i) => (
                    <span key={i} className="aov-chip"><FiCheck size={11}/>{c}</span>
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        /* CSS Variables for Theme Support */
        :root {
          --g: #3fcb1b;
          --g-dk: #2e9c14;
          --g-glow: rgba(63,203,27,0.22);
          --red: #ef4444;
          --profit: #10b981;
        }

        /* Light Mode (Default) */
        .light-mode {
          --bg-white: #ffffff;
          --bg-white-card: #ffffff;
          --bg-dark: #0A0A0A;
          --bg-dark-card: #141414;
          --border-light: #e2e8f0;
          --border-dark: rgba(255,255,255,0.08);
          --text-light: #0f172a;
          --text-light-secondary: #475569;
          --text-dark: #edf0ea;
          --text-dark-secondary: rgba(237,240,234,0.55);
        }

        /* Dark Mode */
        .dark-mode {
          --bg-white: #0A0A0A;
          --bg-white-card: #141414;
          --bg-dark: #0A0A0A;
          --bg-dark-card: #141414;
          --border-light: rgba(255,255,255,0.08);
          --border-dark: rgba(255,255,255,0.08);
          --text-light: #edf0ea;
          --text-light-secondary: rgba(237,240,234,0.55);
          --text-dark: #edf0ea;
          --text-dark-secondary: rgba(237,240,234,0.55);
        }

        #aov {
          font-family: 'Sora', 'DM Sans', system-ui, sans-serif;
          overflow-x: hidden;
        }

        /* Dark Mode Toggle Button */
        .dark-mode-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--g);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          color: #000;
        }
        
        .dark-mode-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(63, 203, 27, 0.4);
        }
        
        .dark-mode-toggle__tooltip {
          position: absolute;
          right: 56px;
          white-space: nowrap;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .dark-mode-toggle:hover .dark-mode-toggle__tooltip {
          opacity: 1;
        }

        #aov *, #aov *::before, #aov *::after { box-sizing:border-box; }
        .aov-container { max-width:1240px; margin:0 auto; padding:0 24px; }
        @media(min-width:1024px){ .aov-container { padding:0 52px; } }
        .aov-reveal { opacity:0; transform:translateY(44px); transition:opacity .9s ease,transform .9s ease; }
        .aov-reveal.on { opacity:1; transform:translateY(0); }

        .aov-section-head { text-align:center; margin-bottom:56px; }
        .aov-eyebrow { 
          display:inline-flex; align-items:center; gap:10px; 
          font-size:.67rem; font-weight:700; letter-spacing:.18em; 
          text-transform:uppercase; color:var(--g); margin-bottom:14px; 
        }
        .aov-eyebrow::before,.aov-eyebrow::after { 
          content:''; display:block; width:26px; height:1.5px; 
          background:currentColor; opacity:.5; border-radius:2px; 
        }
        .aov-eyebrow--light { color:var(--g); }
        .aov-eyebrow--light::before,.aov-eyebrow--light::after { background:currentColor; }
        
        .aov-h2 { font-size:clamp(1.8rem,3.8vw,2.8rem); font-weight:900; letter-spacing:-.04em; line-height:1.15; margin:0 0 10px; color: var(--text-light); }
        .aov-h2--light { color: #fff; }
        .aov-sub { font-size:.94rem; line-height:1.7; max-width:500px; margin:0 auto; color: var(--text-light-secondary); }
        .aov-sub--light { color: var(--text-dark-secondary); }

        /* BUTTONS */
        .aov-btn-primary { 
          display:inline-flex; align-items:center; gap:7px; padding:13px 28px; 
          background:var(--g); color:#000; font-weight:800; font-size:.88rem; 
          border-radius:100px; text-decoration:none; transition:all .3s; 
          position:relative; overflow:hidden; 
        }
        .aov-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(63,203,27,.35); }
        .aov-btn-primary--lg { padding:15px 34px; font-size:.95rem; }
        .aov-btn-ghost { 
          display:inline-flex; align-items:center; gap:7px; padding:13px 28px; 
          background:transparent; color:var(--text-light); font-weight:700; font-size:.88rem; 
          border:1.5px solid var(--border-light); border-radius:100px; text-decoration:none; 
          transition:all .3s; 
        }
        .aov-btn-ghost:hover { border-color:var(--g); color:var(--g); transform:translateY(-2px); }

        /* ========== 1. HERO (always dark) ========== */
        .aov-hero { position:relative; background:#000; overflow:clip; display:flex; flex-direction:column; align-items:stretch; padding:0; }
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
        .aov-hero__desc { font-size:.98rem; color:rgba(237,240,234,0.55); line-height:1.72; margin:0 0 28px; }
        .aov-hero__actions { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:24px; }
        .aov-hero__copy { display:flex; flex-direction:column; justify-content:center; padding:60px 60px 60px 80px; }
        .aov-hero__graphic { position:relative; display:flex; justify-content:flex-start; align-items:flex-end; overflow:visible; }
        .aov-hero__img-wrap { position:absolute; bottom:-20px; left:-5%; width:115%; display:flex; align-items:flex-end; justify-content:flex-start; pointer-events:none; }
        .aov-hero__img { width:100%; height:auto; display:block; object-fit:contain; object-position:left bottom; filter:drop-shadow(-20px 0 80px rgba(0,0,0,0.7)); }

        .orb-field { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
        .orb-field__dot { position:absolute; background:var(--g); border-radius:50%; opacity:0; box-shadow:0 0 8px 2px rgba(63,203,27,.4); animation:ptFloat var(--dur,4s) ease-in-out infinite; }
        @keyframes ptFloat { 0%{opacity:0;transform:translateY(0) scale(.5)} 20%{opacity:.8} 80%{opacity:.5} 100%{opacity:0;transform:translateY(-55px) scale(1.3)} }

        /* ========== TICKER ========== */
        .aov-ticker { display: flex; align-items: center; height: 44px; background: #111; border-bottom: 1px solid rgba(255,255,255,0.08); overflow: hidden; position: relative; z-index: 10; width: 100%; }
        .aov-ticker__label { display: flex; align-items: center; gap: 6px; padding: 0 20px; background: var(--g); color: #000; font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; height: 100%; flex-shrink: 0; white-space: nowrap; z-index: 12; box-shadow: 8px 0 20px rgba(0,0,0,0.4); }
        .aov-ticker__track { flex: 1; overflow: hidden; height: 100%; display: flex; align-items: center; }
        .aov-ticker__inner { display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; gap: 0; height: 100%; width: max-content; animation: tickerLoop 25s linear infinite; }
        .aov-ticker__item { display: flex; flex-direction: row; align-items: center; gap: 8px; padding: 0 28px; white-space: nowrap; border-right: 1px solid rgba(255,255,255,0.08); height: 100%; flex-shrink: 0; }
        .aov-ticker__sym { font-size: .75rem; font-weight: 700; color: #fff; }
        .aov-ticker__price { font-size: .75rem; color: rgba(237,240,234,0.55); font-family: monospace; }
        .aov-ticker__chg { font-size: .7rem; font-weight: 700; }
        .aov-ticker__chg.up { color: var(--g); }
        .aov-ticker__chg.dn { color: var(--red); }
        @keyframes tickerLoop { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }

        /* ========== 2. ACCOUNT TYPES (WHITE BG) ========== */
        .aov-section-white { padding:96px 0; background: var(--bg-white); }
        .aov-section-white .aov-h2 { color: var(--text-light); }
        .aov-section-white .aov-sub { color: var(--text-light-secondary); }
        
        .fx-accounts-three-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:30px; max-width:1100px; margin:0 auto; }
        .fx-account { position:relative; padding:40px 32px; background: var(--bg-white-card); border:1px solid var(--border-light); border-radius:12px; transition:all .3s; display:flex; flex-direction:column; }
        .fx-account:hover { transform:translateY(-8px); border-color:rgba(63,203,27,.5); box-shadow:0 20px 40px rgba(0,0,0,0.08); }
        .fx-account--featured { border:1px solid #3fcb1b!important; background:rgba(63,203,27,.03)!important; }
        .fx-account__badge { position:absolute; top:-14px; left:50%; transform:translateX(-50%); padding:4px 16px; border-radius:99px; font-size:.7rem; font-weight:800; text-transform:uppercase; background:var(--g); color:#000; }
        .fx-account__name { font-size:1.5rem; font-weight:800; color:var(--text-light); margin-bottom:24px; text-align:center; }
        .fx-account__row { display:flex; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--border-light); font-size:.9rem; }
        .fx-account__row:last-of-type { border-bottom:none; }
        .fx-account__key { color:var(--text-light-secondary); }
        .fx-account__val { font-weight:700; color:var(--text-light); }
        .fx-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; font-size:.9rem; font-weight:700; border-radius:8px; text-decoration:none; transition:all .22s; cursor:pointer; border:none; white-space:nowrap; }
        .fx-btn--green { background:linear-gradient(135deg,#3fcb1b 0%,#2e9c14 100%); color:#000; box-shadow:0 4px 18px rgba(63,203,27,.28); }
        .fx-btn--green:hover { background:#2e9c14; transform:translateY(-1px); }
        .fx-btn--outline { background:transparent; color:var(--text-light); border:1.5px solid var(--border-light); }
        .fx-btn--outline:hover { border-color:var(--g); color:var(--g); }
        .fx-btn--sm { padding:10px 20px; font-size:.82rem; }
        .fx-btn--full { width:100%; justify-content:center; margin-top:20px; }

        /* ========== 3. COMPARISON TABLE (DARK BG) ========== */
        .cmp-section-dark { padding:96px 0; background: #0A0A0A; border-top: 1px solid rgba(255,255,255,0.08); }
        .cmp-wrap { overflow-x: auto; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: #0f0f0f; }
        .cmp-table { width: 100%; border-collapse: collapse; min-width: 800px; }
        .cmp-table th, .cmp-table td { padding: 16px 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .cmp-table th:first-child, .cmp-table td:first-child { text-align: left; position: sticky; left: 0; background: #0f0f0f; font-weight: 700; z-index: 2; color: #fff; }
        .cmp-table tbody tr:hover td { background: rgba(255, 255, 255, 0.05); }
        .cmp-feature-col { width: 140px; font-size: 0.8rem; font-weight: 700; color: rgba(237,240,234,0.7); background: #141414; }
        .cmp-account-col { min-width: 120px; }
        .cmp-account-col.highlight { background: linear-gradient(180deg, rgba(63,203,27,0.08), transparent); }
        .cmp-account-header { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .cmp-badge { font-size: 0.6rem; font-weight: 700; padding: 3px 10px; background: var(--g); color: #000; border-radius: 20px; display: inline-block; }
        .cmp-account-name { font-size: 0.9rem; font-weight: 800; color: #fff; }
        .cmp-account-group { font-size: 0.65rem; color: rgba(237,240,234,0.5); }
        .cmp-feature { font-size: 0.8rem; font-weight: 600; color: #fff; }
        .cmp-value { font-size: 0.85rem; font-weight: 500; color: rgba(237,240,234,0.7); }
        .cmp-value.highlight { font-weight: 700; color: var(--g); background: rgba(63,203,27,0.02); }
        .cmp-icon.on { color: #10b981; }
        .cmp-icon.off { color: #ef4444; }
        .cmp-cta-row td { border-bottom: none; padding: 20px 12px; }
        .cmp-cta-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 40px; text-decoration: none; font-size: 0.75rem; font-weight: 700; color: #fff; transition: all 0.3s ease; }
        .cmp-cta-btn:hover { border-color: var(--g); color: var(--g); transform: translateY(-2px); }
        .cmp-cta-btn.highlight { background: var(--g); color: #000; border-color: var(--g); }
        .cmp-mobile { display: none; gap: 16px; overflow-x: auto; padding-bottom: 16px; }
        .cmp-mob-card { flex: 0 0 280px; background: #0f0f0f; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .cmp-mob-card.highlight { border-color: var(--g); background: linear-gradient(135deg, #0f0f0f, rgba(63,203,27,0.03)); }
        .cmp-mob-card__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .cmp-mob-card__head strong { font-size: 1.1rem; font-weight: 800; color: #fff; }
        .cmp-mob-badge { font-size: 0.6rem; font-weight: 700; padding: 3px 10px; background: rgba(63,203,27,0.12); color: var(--g); border-radius: 20px; }
        .cmp-mob-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .cmp-mob-row span:first-child { font-size: 0.75rem; color: rgba(237,240,234,0.5); }
        .cmp-mob-row strong { font-size: 0.85rem; font-weight: 700; color: #fff; }
        .cmp-mob-cta { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 40px; text-decoration: none; font-size: 0.8rem; font-weight: 700; color: #fff; transition: all 0.3s ease; margin-top: 8px; }
        .cmp-mob-cta:hover { border-color: var(--g); color: var(--g); transform: translateY(-2px); }
        .cmp-note { text-align: center; margin-top: 24px; font-size: 0.75rem; color: rgba(237,240,234,0.4); }
        .cmp-note a { color: var(--g); text-decoration: none; }

        /* ========== 4. WHY FOXNANCE (WHITE BG) ========== */
        .aov-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .aov-why-card { background: var(--bg-white-card); border:1px solid var(--border-light); border-radius:12px; padding:28px 24px; position:relative; overflow:hidden; transition:transform .3s,border-color .3s; }
        .aov-why-card:hover { transform:translateY(-5px); border-color:rgba(63,203,27,0.3); box-shadow:0 12px 36px rgba(0,0,0,0.06); }
        .aov-why-card__glow { position:absolute; top:-40px; left:50%; transform:translateX(-50%); width:160px; height:160px; background:radial-gradient(circle,rgba(63,203,27,0.1),transparent); border-radius:50%; filter:blur(30px); opacity:0; transition:opacity .4s; pointer-events:none; }
        .aov-why-card:hover .aov-why-card__glow { opacity:1; }
        .aov-why-card__icon { width:50px; height:50px; border-radius:14px; margin-bottom:18px; background:rgba(63,203,27,0.08); border:1px solid rgba(63,203,27,0.2); color:var(--g-dk); display:flex; align-items:center; justify-content:center; transition:all .3s; }
        .aov-why-card:hover .aov-why-card__icon { background:var(--g); color:#000; transform:scale(1.06) rotate(-4deg); box-shadow:0 6px 18px rgba(63,203,27,.3); }
        .aov-why-card__title { font-size:.96rem; font-weight:800; color:var(--text-light); margin:0 0 8px; }
        .aov-why-card__desc { font-size:.78rem; color:var(--text-light-secondary); line-height:1.65; margin:0; }
        .aov-why-card__line { position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--g),transparent); opacity:0; transition:opacity .3s; }
        .aov-why-card:hover .aov-why-card__line { opacity:1; }

        /* ========== 5. FAQ (DARK BG) ========== */
        .aov-section-faq { padding: 140px 0; background: #0A0A0A; border-top: 1px solid rgba(255,255,255,0.08); }
        .fx-faq { max-width:720px; margin:0 auto; }
        .fx-faq__item { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .fx-faq__q { width:100%; display:flex; align-items:center; justify-content:space-between; padding:24px 0; font-size:.95rem; font-weight:600; color:#fff; background:transparent; border:none; cursor:pointer; text-align:left; gap:16px; transition:color .2s; }
        .fx-faq__q:hover { color:#3fcb1b; }
        .fx-faq__icon { display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:6px; background:rgba(63,203,27,0.1); color:#3fcb1b; }
        .fx-faq__icon.open { background:#3fcb1b; color:#000; }
        .fx-faq__a { padding:0 0 24px; font-size:.88rem; color:rgba(237,240,234,0.55); line-height:1.7; }

        /* ========== 6. FINAL CTA (WHITE BG) ========== */
        .aov-cta-section-white { padding: 120px 0; background: var(--bg-white); border-top: 1px solid var(--border-light); }
        .aov-cta-centered-header { text-align: center; margin-bottom: 64px; width: 100%; }
        .aov-cta-title { font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 900; color: var(--text-light); letter-spacing: -.040em; margin: 0; line-height: 1.15; }
        .aov-cta-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }
        .aov-cta-desc { font-size: 1rem; color: var(--text-light-secondary); line-height: 1.7; margin-bottom: 36px; }
        .aov-cta-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 36px; }
        .aov-cta-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .aov-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 500; padding: 6px 14px; border: 1px solid var(--border-light); border-radius: 100px; color: var(--text-light-secondary); background: var(--bg-white-card); }
        .aov-chip svg { color: var(--g); }
        .aov-cta-visual { display: flex; justify-content: center; align-items: center; position: relative; }
        .aov-cta-img { max-width: 100%; height: auto; display: block; }

        /* ========== RESPONSIVE ========== */
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
          .aov-btn-primary, .aov-btn-ghost { justify-content: center; }
        }

        @keyframes auraDrift {
          0%,100%{transform:translate(0,0);}
          50%{transform:translate(15px,-15px);}
        }
        @keyframes shimmer {
          0%{background-position:0% center;}
          100%{background-position:200% center;}
        }
      `}</style>
    </>
  );
}