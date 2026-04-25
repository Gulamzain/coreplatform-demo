// src/app/(marketing)/platforms/metatrader5/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  FiZap, FiShield, FiDownload, FiActivity, FiArrowRight,
  FiChevronDown, FiChevronUp, FiCpu, FiLayers, FiTrendingUp,
  FiBarChart2, FiClock, FiGlobe, FiCheck
} from 'react-icons/fi';
import {
  BiDesktop, BiMobile, BiServer, BiNetworkChart,
  BiBarChartAlt2, BiCode, BiCopy, BiSignal1, BiRocket
} from 'react-icons/bi';

const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

const MT5Page = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const refs = useRef<{ [k: string]: HTMLElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  const features = [
    { icon: <FiBarChart2 size={24} />, title: '21 Timeframes', desc: 'From 1-minute to monthly charts for every trading style', stat: 'M1 → MN', color: '#3fcb1b' },
    { icon: <BiBarChartAlt2 size={24} />, title: '80+ Indicators', desc: 'Built-in technical analysis tools + custom indicators', stat: '38 built-in + custom', color: '#3b82f6' },
    { icon: <BiNetworkChart size={24} />, title: 'Depth of Market', desc: 'Full market depth with Level II pricing transparency', stat: 'Level II pricing', color: '#8b5cf6' },
    { icon: <FiCpu size={24} />, title: 'MQL5 Algorithmic', desc: 'Build, back-test and deploy Expert Advisors with MQL5', stat: '10,000+ EAs', color: '#f59e0b' },
    { icon: <BiCopy size={24} />, title: 'Copy Trading', desc: 'Built-in signal subscription and social trading', stat: 'Social trading', color: '#ec4899' },
    { icon: <FiZap size={24} />, title: 'Sub-1ms Execution', desc: 'NY4/LD4 co-located servers for lightning speed', stat: 'Ultra-low latency', color: '#10b981' },
  ];

  const whyItems = [
    { icon: <FiZap size={20} />, title: 'Raw Pricing', desc: 'Spreads from 0.0 pips on major pairs', color: '#3fcb1b' },
    { icon: <BiServer size={20} />, title: 'Low Latency', desc: 'Sub-1ms execution in NY4 data centre', color: '#3b82f6' },
    { icon: <FiGlobe size={20} />, title: 'Multi-Asset', desc: '2,250+ instruments across all markets', color: '#8b5cf6' },
    { icon: <FiShield size={20} />, title: 'FCA & ASIC', desc: 'Fully regulated in multiple jurisdictions', color: '#f59e0b' },
    { icon: <BiSignal1 size={20} />, title: 'Copy Trading', desc: 'Built-in signals and social trading', color: '#ec4899' },
    { icon: <BiRocket size={20} />, title: 'Scalping Allowed', desc: 'No restrictions on trading strategies', color: '#10b981' },
  ];

  const faqs = [
    { q: 'Is MetaTrader 5 free to download?', a: 'Yes, MetaTrader 5 is completely free to download as a desktop, web, or mobile application from our website or official app stores. There is no license fee for traders.' },
    { q: 'Can I trade stocks on MT5?', a: 'Yes, MT5 supports multi-asset trading including stocks, futures, and ETFs. Foxnance offers access to global stock markets through our MT5 platform.' },
    { q: 'Is MT5 better than MT4?', a: 'MT5 is technologically superior with more timeframes (21 vs 9), more order types (6 vs 4), built-in economic calendar, depth of market display, and true multi-asset capabilities.' },
    { q: 'Does Foxnance support Expert Advisors?', a: 'Yes, we fully support MQL5 Expert Advisors. All our MT5 accounts allow algorithmic trading with no restrictions on EA usage.' },
    { q: 'What are the system requirements?', a: 'Windows 7 or higher (64-bit recommended), 2GB RAM, 500MB free disk space, and an internet connection. macOS users can use our web platform.' },
  ];

  return (
    <div ref={containerRef} className="mt5-page">
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined} />

      {/* HERO SECTION - Dark */}
      <section className="mt5-hero">
        <motion.div className="mt5-hero-bg" style={{ y: heroY }}>
          <div className="mt5-hero-gradient" />
          <div className="mt5-hero-particles" />
        </motion.div>

        <motion.div className="mt5-hero-content" style={{ opacity: opacityHero }}>
          <motion.div 
            className="mt5-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="mt5-badge-dot" />
            MetaTrader 5
          </motion.div>
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
          <motion.div 
            className="mt5-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            {[
              { value: '<1ms', label: 'Execution' },
              { value: '21', label: 'Timeframes' },
              { value: '80+', label: 'Indicators' },
              { value: '2,250+', label: 'Instruments' },
            ].map((stat, i) => (
              <div key={i} className="mt5-stat">
                <span className="mt5-stat-value">{stat.value}</span>
                <span className="mt5-stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt5-hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="mt5-terminal-preview">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span /><span /><span />
              </div>
              <span>MetaTrader 5 — Foxnance</span>
              <span className="terminal-badge">LIVE</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-chart">
                <svg viewBox="0 0 400 160" className="terminal-svg">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3fcb1b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3fcb1b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,130 L30,110 L60,120 L90,95 L120,105 L150,75 L180,85 L210,50 L240,60 L270,35 L300,45 L330,25 L360,30 L390,15 L400,10" 
                    fill="none" stroke="#3fcb1b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0,130 L30,110 L60,120 L90,95 L120,105 L150,75 L180,85 L210,50 L240,60 L270,35 L300,45 L330,25 L360,30 L390,15 L400,10 L400,160 L0,160Z" 
                    fill="url(#lineGrad)" />
                  <circle cx="400" cy="10" r="4" fill="#3fcb1b">
                    <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <div className="terminal-order">
                <div className="order-row">
                  <button className="order-sell">SELL 1.08430</button>
                  <div className="order-spread">SPREAD 0.2</div>
                  <button className="order-buy">BUY 1.08432</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES GRID - Dark Section */}
      <section id="features" ref={setRef('features')} className={`mt5-features-dark ${visible.has('features') ? 'in-view' : ''}`}>
        <div className="container">
          <motion.div 
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">Platform Capabilities</span>
            <h2 className="section-title">Everything You Need to Trade Like a Pro</h2>
            <p className="section-desc">MetaTrader 5 combines professional-grade tools with institutional execution</p>
          </motion.div>
          <div className="features-grid">
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon" style={{ background: `${feature.color}15`, color: feature.color }}>{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <span className="feature-stat">{feature.stat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FOXNANCE - Light Section (alternating) */}
      <section id="why" ref={setRef('why')} className={`mt5-why-light ${visible.has('why') ? 'in-view' : ''}`}>
        <div className="container">
          <div className="why-grid">
            <motion.div 
              className="why-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-eyebrow">The Foxnance Edge</span>
              <h2 className="section-title">Why Trade MT5 with Foxnance?</h2>
              <p className="section-desc">MetaTrader 5 is a great platform. Foxnance makes it exceptional with raw pricing, deep liquidity, and institutional execution.</p>
              <div className="why-list">
                {whyItems.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="why-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="why-icon" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/auth-signup" className="mt5-btn-primary-light">Open MT5 Account <FiArrowRight /></Link>
            </motion.div>
            <motion.div 
              className="why-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="why-stats">
                <motion.div 
                  className="why-stat-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="why-stat-value">0.0</span>
                  <span className="why-stat-label">pips spreads</span>
                </motion.div>
                <motion.div 
                  className="why-stat-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="why-stat-value">&lt;1ms</span>
                  <span className="why-stat-label">latency</span>
                </motion.div>
                <motion.div 
                  className="why-stat-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="why-stat-value">1:500</span>
                  <span className="why-stat-label">leverage</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD SECTION - Dark */}
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
              { platform: 'Windows', icon: <BiDesktop size={28} />, size: '~60 MB', color: '#3fcb1b' },
              { platform: 'macOS', icon: <BiDesktop size={28} />, size: '~60 MB', color: '#3b82f6' },
              { platform: 'iOS', icon: <BiMobile size={28} />, size: 'Free', color: '#8b5cf6' },
              { platform: 'Android', icon: <BiMobile size={28} />, size: 'Free', color: '#f59e0b' },
              { platform: 'WebTerminal', icon: <FiGlobe size={28} />, size: 'No install', color: '#10b981' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link href="#" className="download-card">
                  <div className="download-icon" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                  <div className="download-info">
                    <strong>{item.platform}</strong>
                    <span>{item.size}</span>
                  </div>
                  <FiDownload className="download-arrow" />
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

      {/* ALGO TRADING - Light Section */}
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

      {/* FAQ SECTION - Dark */}
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

      {/* CTA SECTION - Light */}
      <section className="mt5-cta-light">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Start Trading on MT5 Today</h2>
            <p className="cta-desc">Join 500,000+ traders already using Foxnance MT5. Open your account in minutes.</p>
            <div className="cta-actions">
              <Link href="/auth-signup" className="mt5-btn-primary">Open MT5 Account <FiArrowRight /></Link>
              <Link href="#download" className="mt5-btn-secondary"><FiDownload /> Download MT5</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <CookieModal />

      <style jsx global>{`
        .mt5-page {
          --g: #3fcb1b;
          --g-dark: #2e9c14;
          --bg-dark: #0c0f0a;
          --bg-dark-card: #141914;
          --bg-dark-border: rgba(255,255,255,0.08);
          --bg-light: #f8fafc;
          --bg-light-card: #ffffff;
          --bg-light-border: #e2e8f0;
          --text-dark: #edf0ea;
          --text-dark-secondary: #556050;
          --text-light: #1a1f36;
          --text-light-secondary: #6b7280;
          font-family: 'Inter', 'Sora', system-ui, sans-serif;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .section-head { text-align: center; margin-bottom: 64px; }
        .section-eyebrow { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--g); margin-bottom: 16px; }
        .section-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 16px; }
        .section-desc { font-size: 1rem; max-width: 600px; margin: 0 auto; }

        /* ========== DARK SECTIONS ========== */
        
        /* Hero - Dark */
        .mt5-hero { position: relative; min-height: 90vh; display: flex; align-items: center; justify-content: space-between; padding: 120px 5% 80px; overflow: hidden; background: var(--bg-dark); }
        .mt5-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .mt5-hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 30%, rgba(63,203,27,0.12), transparent 60%); }
        .mt5-hero-particles { position: absolute; inset: 0; background-image: radial-gradient(rgba(63,203,27,0.1) 1px, transparent 1px); background-size: 40px 40px; }
        .mt5-hero-content { max-width: 550px; position: relative; z-index: 1; }
        .mt5-badge { display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px 4px 8px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.25); border-radius: 100px; font-size: 0.7rem; font-weight: 600; color: var(--g); margin-bottom: 24px; }
        .mt5-badge-dot { width: 6px; height: 6px; background: var(--g); border-radius: 50%; }
        .mt5-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.2; margin-bottom: 20px; color: var(--text-dark); }
        .mt5-title-accent { background: linear-gradient(135deg, #3fcb1b, #7de84a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .mt5-description { font-size: 1rem; color: var(--text-dark-secondary); line-height: 1.6; margin-bottom: 32px; }
        .mt5-stat-value { font-size: 1.5rem; font-weight: 800; color: var(--g); }
        .mt5-stat-label { font-size: 0.7rem; color: var(--text-dark-secondary); text-transform: uppercase; }
        .mt5-stats { display: flex; gap: 32px; }
        .mt5-stat { display: flex; flex-direction: column; }
        
        .mt5-terminal-preview { background: var(--bg-dark-card); border: 1px solid var(--bg-dark-border); border-radius: 16px; overflow: hidden; }
        .terminal-header { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--bg-dark-border); }
        .terminal-dots { display: flex; gap: 6px; }
        .terminal-dots span { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; }
        .terminal-dots span:nth-child(2) { background: #febc2e; }
        .terminal-dots span:nth-child(3) { background: #28c840; }
        .terminal-badge { font-size: 0.6rem; padding: 2px 8px; background: rgba(63,203,27,0.15); border-radius: 20px; color: var(--g); }
        .terminal-body { padding: 20px; }
        .terminal-chart { margin-bottom: 16px; }
        .terminal-svg { width: 100%; height: auto; }
        .order-row { display: flex; gap: 8px; }
        .order-sell, .order-buy { flex: 1; padding: 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; }
        .order-sell { background: rgba(239,68,68,0.15); color: #ef4444; }
        .order-sell:hover { background: rgba(239,68,68,0.25); }
        .order-buy { background: rgba(63,203,27,0.15); color: var(--g); }
        .order-buy:hover { background: rgba(63,203,27,0.25); }
        .order-spread { padding: 10px; font-size: 0.6rem; color: var(--text-dark-secondary); text-align: center; background: rgba(255,255,255,0.03); border-radius: 8px; }
        
        .mt5-actions, .cta-actions { display: flex; gap: 16px; margin-bottom: 48px; flex-wrap: wrap; }
        .mt5-btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; background: var(--g); color: #000; font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.3s; }
        .mt5-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(63,203,27,0.3); background: #2e9c14; color: #fff; }
        .mt5-btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; background: transparent; border: 1px solid rgba(255,255,255,0.15); color: var(--text-dark); font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.3s; }
        .mt5-btn-secondary:hover { border-color: var(--g); color: var(--g); transform: translateY(-2px); background: rgba(63,203,27,0.05); }
        .mt5-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: transparent; border: 1px solid rgba(63,203,27,0.3); color: var(--g); font-weight: 600; border-radius: 40px; text-decoration: none; transition: 0.3s; }
        .mt5-btn-outline:hover { background: rgba(63,203,27,0.1); }

        /* Features - Dark */
        .mt5-features-dark { padding: 80px 0; background: var(--bg-dark); }
        .mt5-features-dark .section-title { color: var(--text-dark); }
        .mt5-features-dark .section-desc { color: var(--text-dark-secondary); }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .features-grid { grid-template-columns: 1fr; } }
        .feature-card { background: var(--bg-dark-card); border: 1px solid var(--bg-dark-border); border-radius: 20px; padding: 28px; transition: 0.3s; }
        .feature-card:hover { transform: translateY(-5px); border-color: rgba(63,203,27,0.3); }
        .feature-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .feature-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; color: var(--text-dark); }
        .feature-desc { font-size: 0.85rem; color: var(--text-dark-secondary); line-height: 1.5; margin-bottom: 12px; }
        .feature-stat { font-size: 0.7rem; font-weight: 700; color: var(--g); background: rgba(63,203,27,0.1); padding: 4px 10px; border-radius: 20px; display: inline-block; }

        /* Download - Dark */
        .mt5-download-dark { padding: 80px 0; background: var(--bg-dark); }
        .mt5-download-dark .section-title { color: var(--text-dark); }
        .mt5-download-dark .section-desc { color: var(--text-dark-secondary); }
        .download-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 32px; }
        @media (max-width: 900px) { .download-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .download-grid { grid-template-columns: 1fr; } }
        .download-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--bg-dark-card); border: 1px solid var(--bg-dark-border); border-radius: 16px; text-decoration: none; transition: 0.3s; }
        .download-card:hover { transform: translateY(-3px); border-color: var(--g); }
        .download-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .download-info strong { display: block; font-size: 0.9rem; font-weight: 700; color: var(--text-dark); }
        .download-info span { font-size: 0.7rem; color: var(--text-dark-secondary); }
        .download-arrow { margin-left: auto; color: var(--text-dark-secondary); transition: 0.3s; }
        .download-card:hover .download-arrow { color: var(--g); transform: translateX(4px); }
        .download-note { text-align: center; font-size: 0.75rem; color: var(--text-dark-secondary); }

        /* FAQ - Dark */
        .mt5-faq-dark { padding: 80px 0; background: var(--bg-dark); }
        .mt5-faq-dark .section-title { color: var(--text-dark); }
        .mt5-faq-dark .section-desc { color: var(--text-dark-secondary); }
        .faq-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; }
        @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr; } }
        .faq-list { display: flex; flex-direction: column; gap: 12px; }
        .faq-item { background: var(--bg-dark-card); border: 1px solid var(--bg-dark-border); border-radius: 16px; cursor: pointer; transition: 0.3s; }
        .faq-item:hover { border-color: rgba(63,203,27,0.3); }
        .faq-item.open { border-color: var(--g); }
        .faq-question { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; font-weight: 600; color: var(--text-dark); }
        .faq-icon { color: var(--g); transition: 0.3s; display: flex; align-items: center; }
        .faq-answer { overflow: hidden; }
        .faq-answer p { margin: 0; padding: 0 20px 18px; font-size: 0.85rem; color: var(--text-dark-secondary); line-height: 1.6; border-top: 1px solid var(--bg-dark-border); padding-top: 14px; }

        /* ========== LIGHT SECTIONS ========== */
        
        /* Why - Light */
        .mt5-why-light { padding: 80px 0; background: var(--bg-light); }
        .mt5-why-light .section-title { color: var(--text-light); }
        .mt5-why-light .section-desc { color: var(--text-light-secondary); }
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr; } }
        .why-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 32px 0; }
        @media (max-width: 500px) { .why-list { grid-template-columns: 1fr; } }
        .why-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg-light-card); border-radius: 12px; border: 1px solid var(--bg-light-border); transition: 0.2s; }
        .why-item:hover { border-color: rgba(63,203,27,0.3); transform: translateX(5px); }
        .why-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .why-item strong { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-light); }
        .why-item span { font-size: 0.7rem; color: var(--text-light-secondary); }
        .why-stats { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .why-stat-card { background: var(--bg-light-card); border: 1px solid var(--bg-light-border); border-radius: 20px; padding: 28px 24px; text-align: center; min-width: 120px; transition: 0.3s; }
        .why-stat-card:hover { transform: translateY(-5px); border-color: var(--g); box-shadow: 0 15px 25px -12px rgba(0,0,0,0.1); }
        .why-stat-value { display: block; font-size: 2rem; font-weight: 800; color: var(--g); }
        .why-stat-label { font-size: 0.7rem; color: var(--text-light-secondary); }
        .mt5-btn-primary-light { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; background: var(--g); color: #fff; font-weight: 700; border-radius: 40px; text-decoration: none; transition: 0.3s; }
        .mt5-btn-primary-light:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(63,203,27,0.3); background: #2e9c14; }

        /* Algo - Light */
        .mt5-algo-light { padding: 80px 0; background: var(--bg-light); }
        .mt5-algo-light .section-title { color: var(--text-light); }
        .mt5-algo-light .section-desc { color: var(--text-light-secondary); }
        .algo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        @media (max-width: 900px) { .algo-grid { grid-template-columns: 1fr; } }
        .algo-list { list-style: none; margin: 24px 0; }
        .algo-list li { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; margin-bottom: 12px; color: var(--text-light-secondary); }
        .algo-list li svg { color: var(--g); }
        .algo-stats-grid { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; }
        .algo-stat-card { background: var(--bg-light-card); border: 1px solid var(--bg-light-border); border-radius: 20px; padding: 32px 28px; text-align: center; transition: 0.3s; }
        .algo-stat-card:hover { transform: translateY(-5px); border-color: var(--g); box-shadow: 0 15px 25px -12px rgba(0,0,0,0.1); }
        .algo-stat-icon { color: var(--g); margin-bottom: 16px; }
        .algo-stat-value { display: block; font-size: 1.3rem; font-weight: 800; color: var(--text-light); margin-bottom: 4px; }
        .algo-stat-label { font-size: 0.75rem; color: var(--text-light-secondary); }
        .mt5-btn-outline-light { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: transparent; border: 1px solid rgba(63,203,27,0.3); color: var(--g); font-weight: 600; border-radius: 40px; text-decoration: none; transition: 0.3s; }
        .mt5-btn-outline-light:hover { background: rgba(63,203,27,0.1); }

        /* CTA - Light */
        .mt5-cta-light { padding: 80px 0; text-align: center; background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); }
        .cta-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 16px; color: var(--text-light); }
        .cta-desc { font-size: 1rem; color: var(--text-light-secondary); max-width: 500px; margin: 0 auto 32px; }

        @media (max-width: 768px) {
          .mt5-hero { flex-direction: column; text-align: center; gap: 48px; }
          .mt5-stats { justify-content: center; }
          .mt5-actions, .cta-actions { justify-content: center; }
          .section-title { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
};

export default MT5Page;