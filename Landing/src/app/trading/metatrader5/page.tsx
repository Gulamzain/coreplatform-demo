// src/app/(marketing)/platforms/metatrader5/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  FiZap, FiDownload, FiArrowRight, FiChevronDown, FiCpu, 
  FiBarChart2, FiClock, FiCheck, FiSun, FiMoon
} from 'react-icons/fi';
import {
  BiNetworkChart, BiCode, BiCopy, BiRocket, BiSun, BiMoon
} from 'react-icons/bi';

const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

const MT5Page = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const refs = useRef<{ [k: string]: HTMLElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

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
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  const coreFeatures = [
    { title: '21 Timeframes', icon: <FiClock size={24} />, desc: 'From 1-minute to monthly charts', color: '#3fcb1b' },
    { title: '80+ Indicators', icon: <FiBarChart2 size={24} />, desc: 'Technical & custom indicators', color: '#3b82f6' },
    { title: 'Depth of Market', icon: <BiNetworkChart size={24} />, desc: 'Level II pricing & order book', color: '#8b5cf6' },
    { title: 'MQL5 Algorithmic', icon: <BiCode size={24} />, desc: 'EAs & automated strategies', color: '#f59e0b' },
    { title: 'Copy Trading', icon: <BiCopy size={24} />, desc: 'Built-in social trading', color: '#ec4899' },
    { title: 'Sub-1ms Execution', icon: <FiZap size={24} />, desc: 'Ultra-low latency fills', color: '#10b981' },
  ];

  const advancedFeatures = [
    { name: 'Multi-Asset', value: '2,250+ Instruments' },
    { name: 'Order Types', value: '6 Types' },
    { name: 'Execution', value: 'Market/Stop/Limit' },
    { name: 'Charting', value: 'Interactive' },
    { name: 'Backtesting', value: 'Multi-threaded' },
    { name: 'Mobile Apps', value: 'iOS & Android' },
  ];

  const faqs = [
    { q: 'Is MetaTrader 5 free to download?', a: 'Yes, MetaTrader 5 is completely free to download as a desktop, web, or mobile application from our website or official app stores. There is no license fee for traders.' },
    { q: 'Can I trade stocks on MT5?', a: 'Yes, MT5 supports multi-asset trading including stocks, futures, and ETFs. Foxnance offers access to global stock markets through our MT5 platform.' },
    { q: 'Is MT5 better than MT4?', a: 'MT5 is technologically superior with more timeframes (21 vs 9), more order types (6 vs 4), built-in economic calendar, depth of market display, and true multi-asset capabilities.' },
    { q: 'Does Foxnance support Expert Advisors?', a: 'Yes, we fully support MQL5 Expert Advisors. All our MT5 accounts allow algorithmic trading with no restrictions on EA usage.' },
    { q: 'What are the system requirements?', a: 'Windows 7 or higher (64-bit recommended), 2GB RAM, 500MB free disk space, and an internet connection. macOS users can use our web platform.' },
  ];

  const downloadLinks = {
    Windows: 'https://download.mql5.com/cdn/web/1582/mt5/foxnance5setup.exe',
    macOS: 'https://download.mql5.com/cdn/web/1582/mt5/foxnance5.dmg',
    iOS: 'https://apps.apple.com/app/metatrader-5/id413251709',
    Android: 'https://play.google.com/store/apps/details?id=com.metaquotes.metatrader5',
    WebTerminal: 'https://trade.foxnance.com',
  };

  return (
    <div ref={containerRef} className="mt5-page">
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined} />

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

      {/* 1. HERO SECTION - Dark Background */}
      <section className="mt5-hero">
        <motion.div className="mt5-hero-bg" style={{ y: heroY }}>
          <div className="mt5-hero-gradient" />
          <div className="mt5-hero-particles" />
        </motion.div>

        <div className="mt5-hero-inner">
          <motion.div className="mt5-hero-content" style={{ opacity: opacityHero }}>
            <motion.h1 
              className="mt5-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Trade Global Markets<br />
              <span className="mt5-title-accent">with MetaTrader 5</span>
            </motion.h1>
            <motion.p 
              className="mt5-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              The ultimate multi-asset trading platform. Forex, Stocks, Indices, Commodities, and Futures — 
              all from a single interface with advanced charting and algorithmic trading.
            </motion.p>
            <motion.div 
              className="mt5-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link href="/auth-signup" className="mt5-btn-primary">
                Open MT5 Account <FiArrowRight />
              </Link>
              <Link href="#download" className="mt5-btn-secondary">
                <FiDownload /> Download Platform
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt5-hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img 
              src="/images/MT5-Extra.png" 
              alt="MetaTrader 5 Platform" 
              className="mt5-hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. PLATFORM CAPABILITIES SECTION - White Background */}
      <section id="features" ref={setRef('features')} className={`mt5-features-light ${visible.has('features') ? 'in-view' : ''}`}>
        <div className="container">
          <motion.div 
            className="features-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Platform Capabilities</span>
            <h2 className="features-title">Everything You Need to Trade Like a Pro</h2>
            <p className="features-subtitle">MetaTrader 5 combines professional-grade tools with institutional execution</p>
          </motion.div>

          <div className="core-features-grid">
            {coreFeatures.map((feature, i) => (
              <motion.div
                key={i}
                className="core-feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{ '--feature-color': feature.color } as React.CSSProperties}
              >
                <div className="core-feature-icon" style={{ color: feature.color, background: `${feature.color}15` }}>
                  {feature.icon}
                </div>
                <h3 className="core-feature-title">{feature.title}</h3>
                <p className="core-feature-desc">{feature.desc}</p>
                <div className="core-feature-glow" style={{ background: `radial-gradient(circle, ${feature.color}30, transparent)` }} />
              </motion.div>
            ))}
          </div>

          <div className="advanced-features-bar">
            <div className="advanced-features-inner">
              {advancedFeatures.map((feature, i) => (
                <div key={i} className="advanced-feature-item">
                  <span className="advanced-feature-value">{feature.value}</span>
                  <span className="advanced-feature-name">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DOWNLOAD SECTION - Black Background */}
      <section id="download" ref={setRef('download')} className={`mt5-download-dark ${visible.has('download') ? 'in-view' : ''}`}>
        <div className="container">
          <motion.div 
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">Download</span>
            <h2 className="section-title">Available on All Platforms</h2>
            <p className="section-desc">Trade anywhere, anytime — all platforms are completely free</p>
          </motion.div>
          <div className="download-grid">
            {[
              { 
                platform: 'Windows', 
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                  </svg>
                ), 
                color: '#0078D4',
                url: downloadLinks.Windows
              },
              { 
                platform: 'macOS', 
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                ), 
                color: '#c0c0c0',
                url: downloadLinks.macOS
              },
              { 
                platform: 'iOS', 
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                ), 
                color: '#c0c0c0',
                url: downloadLinks.iOS
              },
              { 
                platform: 'Android', 
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396"/>
                  </svg>
                ), 
                color: '#3DDC84',
                url: downloadLinks.Android
              },
              { 
                platform: 'WebTerminal', 
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                ), 
                color: '#10b981',
                url: downloadLinks.WebTerminal
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="download-card"
                >
                  <div className="download-icon" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="download-info">
                    <strong>{item.platform}</strong>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.p 
            className="download-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            System requirements: Windows 7 or higher, 2GB RAM, 500MB disk space
          </motion.p>
        </div>
      </section>

      {/* 4. ALGO TRADING SECTION - White Background */}
      <section id="algo" ref={setRef('algo')} className={`mt5-algo-light ${visible.has('algo') ? 'in-view' : ''}`}>
        <div className="container">
          <div className="algo-grid">
            <motion.div 
              className="algo-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-eyebrow">Algorithmic Trading</span>
              <h2 className="section-title">Automate Your Strategy with MQL5</h2>
              <p className="section-desc">Build, back-test, and deploy Expert Advisors using MQL5 — the most powerful language for algorithmic trading. Access the MQL5 Marketplace for thousands of pre-built EAs and indicators.</p>
              <ul className="algo-list">
                {[
                  'Multi-threaded strategy testing',
                  'Cloud optimization network',
                  '10,000+ EAs on Marketplace',
                  'Built-in copy trading signals'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <FiCheck /> {item}
                  </motion.li>
                ))}
              </ul>
              <Link href="#" className="mt5-btn-outline-light">Learn More About MQL5 <FiArrowRight /></Link>
            </motion.div>
            <motion.div 
              className="algo-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="algo-stats-grid">
                <motion.div 
                  className="algo-stat-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <BiRocket size={32} className="algo-stat-icon" />
                  <span className="algo-stat-value">10,000+</span>
                  <span className="algo-stat-label">Expert Advisors</span>
                </motion.div>
                <motion.div 
                  className="algo-stat-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiCpu size={32} className="algo-stat-icon" />
                  <span className="algo-stat-value">Multi-thread</span>
                  <span className="algo-stat-label">Backtesting</span>
                </motion.div>
                <motion.div 
                  className="algo-stat-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <BiCopy size={32} className="algo-stat-icon" />
                  <span className="algo-stat-value">Built-in</span>
                  <span className="algo-stat-label">Copy Trading</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION - Black Background */}
      <section id="faq" ref={setRef('faq')} className={`mt5-faq-dark ${visible.has('faq') ? 'in-view' : ''}`}>
        <div className="container">
          <div className="faq-grid">
            <motion.div 
              className="faq-head"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-desc">Everything you need to know about MT5 with Foxnance</p>
              <Link href="/contact" className="mt5-btn-outline">Contact Support <FiArrowRight /></Link>
            </motion.div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={i} 
                  className={`faq-item ${openFaq === i ? 'open' : ''}`} 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 3 }}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <motion.span 
                      className="faq-icon"
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown />
                    </motion.span>
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-answer"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. START TRADING SECTION - White Background */}
      <section className="mt5-start-trading">
        <div className="container">
          <div className="start-trading-grid">
            <motion.div 
              className="start-trading-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-eyebrow">Start Trading</span>
              <h2 className="start-trading-title">Start Trading on MT5 Today</h2>
              <p className="start-trading-desc">Join 500,000+ traders already using Foxnance MT5. Open your account in minutes and get access to institutional-grade trading conditions.</p>
              <div className="start-trading-features">
                <div className="start-feature"><FiCheck size={16} /> Raw spreads from 0.0 pips</div>
                <div className="start-feature"><FiCheck size={16} /> No dealing desk execution</div>
                <div className="start-feature"><FiCheck size={16} /> 24/7 dedicated support</div>
                <div className="start-feature"><FiCheck size={16} /> Instant deposits & withdrawals</div>
              </div>
              <div className="start-trading-actions">
                <Link href="/auth-signup" className="mt5-btn-primary">Open MT5 Account <FiArrowRight /></Link>
                <Link href="#download" className="mt5-btn-secondary-light"><FiDownload /> Download MT5</Link>
              </div>
            </motion.div>
            <motion.div 
              className="start-trading-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="start-trading-image-wrapper">
                <img 
                  src="/images/MT5-Hero.png" 
                  alt="MetaTrader 5 Trading Platform" 
                  className="start-trading-image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieModal />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        /* CSS Variables for Theme Support */
        :root {
          --g: #3fcb1b;
          --g-dark: #2e9c14;
          --g-glow: rgba(63,203,27,0.22);
          --red: #ef4444;
          --profit: #10b981;
        }

        /* Light Mode (Default) */
        .light-mode {
          --bg-white: #ffffff;
          --bg-white-card: #ffffff;
          --bg-white-alt: #f8fafc;
          --bg-dark: #000000;
          --bg-dark-card: #0a0a0a;
          --border-light: #e2e8f0;
          --border-dark: rgba(255,255,255,0.08);
          --text-light: #0f172a;
          --text-light-secondary: #475569;
          --text-dark: #ffffff;
          --text-dark-secondary: rgba(255,255,255,0.65);
        }

        /* Dark Mode */
        .dark-mode {
          --bg-white: #0a0a0a;
          --bg-white-card: #141414;
          --bg-white-alt: #111111;
          --bg-dark: #000000;
          --bg-dark-card: #0a0a0a;
          --border-light: rgba(255,255,255,0.08);
          --border-dark: rgba(255,255,255,0.08);
          --text-light: #edf0ea;
          --text-light-secondary: rgba(237,240,234,0.55);
          --text-dark: #ffffff;
          --text-dark-secondary: rgba(255,255,255,0.65);
        }

        .mt5-page {
          transition: background 0.28s ease, color 0.28s ease;
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

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .section-head { text-align: center; margin-bottom: 64px; }
        .section-eyebrow { display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--g); margin-bottom: 16px; }
        .section-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 16px; color: var(--text-light); }
        .section-desc { font-size: 1rem; max-width: 600px; margin: 0 auto; color: var(--text-light-secondary); }

        /* ========== HERO SECTION (Always Dark) ========== */
        .mt5-hero { 
          position: relative; 
          min-height: 90vh; 
          background: #000000; 
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .mt5-hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 2;
        }
        .mt5-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .mt5-hero-gradient { position: absolute; inset: 0; background: radial-gradient(circle at 80% 40%, rgba(63,203,27,0.15), transparent 70%); }
        .mt5-hero-particles { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 32px 32px; }
        
        .mt5-hero-content { 
          padding: 80px 40px 80px max(24px, calc((100vw - 1200px) / 2 + 24px)); 
          z-index: 1; 
        }
        .mt5-title { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.15; margin-bottom: 24px; color: #ffffff; letter-spacing: -0.03em; }
        .mt5-title-accent { background: linear-gradient(135deg, #3fcb1b, #84f05b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .mt5-description { font-size: 1.1rem; color: rgba(255,255,255,0.65); line-height: 1.6; margin-bottom: 36px; }
        .mt5-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        
        .mt5-btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: var(--g); color: #000; font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.25s ease-in-out; font-size: 0.95rem; }
        .mt5-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(63,203,27,0.35); background: #4ae024; color: #000; }
        .mt5-btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: transparent; border: 1.5px solid rgba(255,255,255,0.25); color: #ffffff; font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.25s ease-in-out; font-size: 0.95rem; }
        .mt5-btn-secondary:hover { border-color: var(--g); color: var(--g); background: rgba(63,203,27,0.05); transform: translateY(-2px); }
        .mt5-btn-secondary-light { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: transparent; border: 1.5px solid var(--border-light); color: var(--text-light); font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.25s ease-in-out; font-size: 0.95rem; }
        .mt5-btn-secondary-light:hover { border-color: var(--g); color: var(--g); transform: translateY(-2px); }
        
        .mt5-hero-visual { width: 100%; height: 100%; display: flex; align-items: center; justify-content: flex-end; position: relative; }
        .mt5-hero-image { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Mobile hero image — center & show fully */
        @media(max-width:968px) {
          .mt5-hero-visual { width:100%; height:auto; min-height:260px; padding:0 24px 32px; }
          .mt5-hero-image { width:100%; height:auto; object-fit:contain; max-height:320px; object-position:center; filter:drop-shadow(0 8px 32px rgba(0,0,0,0.6)); }
        }
        @media(max-width:560px) {
          .mt5-hero-visual { min-height:220px; padding:0 16px 24px; }
          .mt5-hero-image { max-height:260px; }
        }

        /* ========== PLATFORM CAPABILITIES - WHITE BACKGROUND ========== */
        .mt5-features-light { padding: 100px 0; background: var(--bg-white); transition: background 0.28s, border-color 0.28s; }
        .features-header { text-align: center; margin-bottom: 64px; }
        .section-badge { display: inline-block; padding: 6px 18px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); border-radius: 40px; font-size: 0.75rem; font-weight: 700; color: var(--g-dark); letter-spacing: 0.05em; margin-bottom: 20px; }
        .features-title { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; color: var(--text-light); letter-spacing: -0.02em; margin-bottom: 16px; }
        .features-subtitle { font-size: 1.05rem; color: var(--text-light-secondary); max-width: 560px; margin: 0 auto; }
        
        .core-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 48px; }
        .core-feature-card { position: relative; background: var(--bg-white-card); border: 1px solid var(--border-light); border-radius: 20px; padding: 36px 28px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: all 0.3s ease; }
        .core-feature-card:hover { border-color: var(--feature-color); box-shadow: 0 20px 35px -12px rgba(0,0,0,0.15); }
        .core-feature-glow { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; opacity: 0; pointer-events: none; transition: opacity 0.5s ease; }
        .core-feature-card:hover .core-feature-glow { opacity: 0.4; }
        .core-feature-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; transition: 0.3s; }
        .core-feature-card:hover .core-feature-icon { transform: scale(1.05); }
        .core-feature-title { font-size: 1.25rem; font-weight: 700; color: var(--text-light); margin-bottom: 12px; }
        .core-feature-desc { font-size: 0.95rem; color: var(--text-light-secondary); line-height: 1.55; margin: 0; }
        
        .advanced-features-bar { background: var(--bg-white-alt); border: 1px solid var(--border-light); border-radius: 20px; padding: 32px; }
        .advanced-features-inner { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; text-align: center; }
        .advanced-feature-item { border-right: 1px solid var(--border-light); }
        .advanced-feature-item:last-child { border-right: none; }
        .advanced-feature-value { display: block; font-size: 1.15rem; font-weight: 800; color: var(--g-dark); margin-bottom: 6px; }
        .advanced-feature-name { font-size: 0.75rem; color: var(--text-light-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }

        /* ========== DOWNLOAD SECTION - BLACK BACKGROUND ========== */
        .mt5-download-dark { padding: 100px 0; background: #0a0a0a; }
        .mt5-download-dark .section-title { color: #ffffff; }
        .mt5-download-dark .section-desc { color: rgba(255,255,255,0.65); }
        .download-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-bottom: 36px; }
        .download-card { display: flex; align-items: center; gap: 16px; padding: 22px; background: #141414; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; text-decoration: none; transition: 0.3s; }
        .download-card:hover { transform: translateY(-3px); border-color: var(--g); background: rgba(63,203,27,0.05); }
        .download-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .download-info strong { display: block; font-size: 0.95rem; font-weight: 700; color: #fff; }
        .download-note { text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.4); }

        /* ========== ALGO SECTION - WHITE BACKGROUND ========== */
        .mt5-algo-light { padding: 100px 0; background: var(--bg-white); border-top: 1px solid var(--border-light); transition: background 0.28s, border-color 0.28s; }
        .mt5-algo-light .section-title { color: var(--text-light); }
        .mt5-algo-light .section-desc { color: var(--text-light-secondary); font-size: 1.05rem; line-height: 1.6; }
        .algo-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; }
        .algo-list { list-style: none; margin: 32px 0; padding: 0; }
        .algo-list li { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; margin-bottom: 16px; color: var(--text-light-secondary); }
        .algo-list li svg { color: var(--g-dark); flex-shrink: 0; }
        .algo-stats-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .algo-stat-card { background: var(--bg-white-alt); border: 1px solid var(--border-light); border-radius: 20px; padding: 28px; display: flex; align-items: center; gap: 24px; transition: 0.3s; }
        .algo-stat-card:hover { border-color: var(--g); box-shadow: 0 15px 25px -12px rgba(0,0,0,0.1); }
        .algo-stat-icon { color: var(--g-dark); flex-shrink: 0; }
        .algo-stat-value { display: block; font-size: 1.4rem; font-weight: 800; color: var(--text-light); margin-bottom: 2px; }
        .algo-stat-label { font-size: 0.85rem; color: var(--text-light-secondary); }
        .mt5-btn-outline-light { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: transparent; border: 1.5px solid var(--g-dark); color: var(--g-dark); font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.3s; }
        .mt5-btn-outline-light:hover { background: rgba(63,203,27,0.06); transform: translateY(-2px); }

        /* ========== FAQ SECTION - BLACK BACKGROUND ========== */
        .mt5-faq-dark { padding: 100px 0; background: #0a0a0a; }
        .faq-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 80px; }
        .faq-head .section-title { color: #fff; }
        .faq-head .section-desc { color: rgba(255,255,255,0.65); margin-bottom: 32px; font-size: 1.05rem; }
        .faq-list { display: flex; flex-direction: column; gap: 16px; }
        .faq-item { background: #141414; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; cursor: pointer; transition: 0.3s; }
        .faq-item:hover { border-color: rgba(63,203,27,0.3); }
        .faq-item.open { border-color: var(--g); background: rgba(63,203,27,0.04); }
        .faq-question { display: flex; justify-content: space-between; align-items: center; padding: 22px 24px; font-weight: 600; color: #fff; font-size: 1.05rem; gap: 16px; }
        .faq-icon { color: var(--g); display: flex; align-items: center; flex-shrink: 0; }
        .faq-answer p { margin: 0; padding: 0 24px 24px; font-size: 0.95rem; color: rgba(255,255,255,0.65); line-height: 1.65; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px; }
        .mt5-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: transparent; border: 1.5px solid rgba(63,203,27,0.3); color: var(--g); font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.3s; }
        .mt5-btn-outline:hover { background: rgba(63,203,27,0.1); transform: translateY(-2px); }

        /* ========== START TRADING SECTION - WHITE BACKGROUND ========== */
        .mt5-start-trading { padding: 120px 0; background: var(--bg-white); border-top: 1px solid var(--border-light); transition: background 0.28s, border-color 0.28s; }
        .start-trading-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
        .start-trading-title { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; color: var(--text-light); letter-spacing: -0.02em; margin-bottom: 20px; line-height: 1.2; }
        .start-trading-desc { font-size: 1.05rem; color: var(--text-light-secondary); line-height: 1.65; margin-bottom: 32px; }
        .start-trading-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px; }
        .start-feature { display: flex; align-items: center; gap: 10px; font-size: 0.95rem; color: var(--text-light-secondary); }
        .start-feature svg { color: var(--g-dark); flex-shrink: 0; }
        .start-trading-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .start-trading-visual { display: flex; justify-content: center; align-items: center; }
        .start-trading-image-wrapper { width: 100%; display: flex; justify-content: center; }
        .start-trading-image { max-width: 100%; height: auto; display: block; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.12)); border-radius: 12px; }

        /* ==================== SCREEN RESPONSIVENESS ==================== */
        @media (max-width: 1100px) {
          .mt5-hero-inner { grid-template-columns: 1.2fr 0.8fr; }
          .start-trading-grid { gap: 48px; }
          .faq-grid, .algo-grid { gap: 40px; }
        }

        @media (max-width: 968px) {
          .mt5-hero-inner { grid-template-columns: 1fr; text-align: center; min-height: auto; }
          .mt5-hero-content { padding: 100px 24px 40px; max-width: 700px; margin: 0 auto; }
          .mt5-actions { justify-content: center; flex-wrap: wrap; }
          .mt5-hero-visual { display: flex; justify-content: center; align-items: center; min-height: 300px; } 
          
          .core-features-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .advanced-features-inner { grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .advanced-feature-item { border-right: none; }
          
          .download-grid { grid-template-columns: repeat(3, 1fr); }
          
          .algo-grid, .faq-grid, .start-trading-grid { grid-template-columns: 1fr; text-align: center; }
          .algo-list, .start-trading-features { justify-content: center; display: inline-block; text-align: left; }
          .algo-list li, .start-feature { margin-bottom: 12px; }
          .algo-stats-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .algo-stat-card { flex-direction: column; text-align: center; padding: 20px 12px; gap: 12px; }
          
          .start-trading-features { display: grid; grid-template-columns: repeat(2, 1fr); max-width: 500px; margin: 0 auto 32px; }
          .start-trading-actions { justify-content: center; }
          .start-trading-visual { order: -1; } 
        }

        @media (max-width: 768px) {
          .features-header, .section-head { margin-bottom: 40px; }
          .mt5-features-light, .mt5-download-dark, .mt5-algo-light, .mt5-faq-dark, .mt5-start-trading { padding: 70px 0; }
          .download-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 560px) {
          .core-features-grid, .download-grid, .algo-stats-grid { grid-template-columns: 1fr; }
          .advanced-features-inner { grid-template-columns: repeat(2, 1fr); }
          .start-trading-features { grid-template-columns: 1fr; }
          .mt5-actions, .start-trading-actions { flex-direction: column; align-items: stretch; }
          .mt5-btn-primary, .mt5-btn-secondary, .mt5-btn-secondary-light, .mt5-btn-outline, .mt5-btn-outline-light { justify-content: center; }
          .faq-question { font-size: 0.95rem; padding: 18px 20px; }
          .faq-answer p { padding: 0 20px 20px; }
        }
      `}</style>
    </div>
  );
};

export default MT5Page;