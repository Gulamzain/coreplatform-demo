// src/app/about/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  BiDollar, BiShield, BiGlobe, BiCheckCircle,
  BiTrendingUp, BiLock, BiAward, BiLineChart,
  BiTrophy, BiUserCheck, BiBarChartSquare, BiTargetLock,
  BiRocket, BiHeart, BiGroup, BiStar, BiTime, BiSupport, BiSun, BiMoon
} from 'react-icons/bi';
import { FiArrowRight, FiCheck, FiAward, FiShield, FiGlobe, FiZap } from 'react-icons/fi';
import { FaRegHandshake, FaChartLine, FaUserTie, FaGlobeAmericas } from 'react-icons/fa';

const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

const milestones = [
  { year: '2009', title: 'Founded', description: 'Foxnance was established with a vision to democratize trading.' },
  { year: '2012', title: 'Global Expansion', description: 'Expanded operations to Asia-Pacific and Middle East markets.' },
  { year: '2015', title: 'MT5 Integration', description: 'Launched MetaTrader 5 platform with advanced features.' },
  { year: '2018', title: 'Regulatory Milestone', description: 'Obtained FCA and ASIC regulatory licenses.' },
  { year: '2020', title: 'Mobile Revolution', description: 'Launched award-winning mobile trading app.' },
  { year: '2024', title: '500K+ Clients', description: 'Reached over 500,000 active traders worldwide.' },
];

const coreValues = [
  { icon: BiShield, title: 'Trust & Transparency', desc: 'We operate with complete transparency, ensuring our clients always have full visibility of costs and processes.' },
  { icon: FiZap, title: 'Speed & Efficiency', desc: 'Sub-40ms execution with no dealer intervention. Every millisecond counts in trading.' },
  { icon: BiHeart, title: 'Client First', desc: 'Our clients\' success is our success. We provide 24/7 dedicated support and educational resources.' },
];

const whyFeatures = [
  { icon: BiAward, title: '15+ Years Experience', desc: 'Over a decade of excellence in financial markets' },
  { icon: BiShield, title: 'FCA & ASIC Regulated', desc: 'Fully regulated and compliant with global standards' },
  { icon: BiLineChart, title: '2,250+ Instruments', desc: 'Access to Forex, Stocks, Commodities, Indices & Crypto' },
  { icon: BiUserCheck, title: '500K+ Active Clients', desc: 'Trusted by traders worldwide' },
  { icon: BiRocket, title: 'Sub-40ms Execution', desc: 'Ultra-fast execution with no dealing desk' },
  { icon: BiSupport, title: '24/7 Dedicated Support', desc: 'Professional support team always ready to help' },
];

const awards = [
  { name: 'Best Forex Broker 2024', issuer: 'Global Forex Awards', year: '2024' },
  { name: 'Best Customer Service', issuer: 'International Business Magazine', year: '2024' },
  { name: 'Most Transparent Broker', issuer: 'World Business Outlook', year: '2023' },
  { name: 'Best Trading Platform', issuer: 'Ultimate Fintech Awards', year: '2023' },
];

export default function AboutPage() {
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [heroReady, setHeroReady] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const refs = useRef<{ [k: string]: HTMLElement | null }>({});

  // Check for saved theme preference on mount (default to light)
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
      if (!savedTheme) {
        localStorage.setItem('theme', 'light')
      }
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
    const t = setTimeout(() => setHeroReady(true), 120);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));

    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    return () => { clearTimeout(t); io.disconnect(); window.removeEventListener('mousemove', handleMouse); };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  return (
    <>
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined} />

      <div id="fox-about">

        {/* Dark Mode Toggle Button */}
        <button 
          onClick={toggleDarkMode} 
          className="dark-mode-toggle"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <BiSun size={20} /> : <BiMoon size={20} />}
          <span className="dark-mode-toggle__tooltip">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* ── HERO (Dark) ── */}
        <section className="fox-hero">
          <div className="fox-hero__canvas">
            <div className="fox-hero__noise" />
            <div
              className="fox-hero__aurora fox-hero__aurora--1"
              style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 20}px)` }}
            />
            <div
              className="fox-hero__aurora fox-hero__aurora--2"
              style={{ transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 30}px)` }}
            />
            <div
              className="fox-hero__aurora fox-hero__aurora--3"
              style={{ transform: `translate(${mousePos.x * 15}px, ${-mousePos.y * 15}px)` }}
            />
            <svg className="fox-hero__grid-lines" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(63,203,27,0.06)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {[...Array(12)].map((_, i) => (
              <div key={i} className="fox-hero__particle" style={{
                '--pi': i,
                left: `${10 + (i * 7.5) % 85}%`,
                top: `${15 + (i * 13) % 70}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${4 + (i % 3)}s`,
              } as React.CSSProperties} />
            ))}
          </div>

          <div className={`fox-hero__inner ${heroReady ? 'ready' : ''}`}>
            <div className="fox-hero__content">
              <h1 className="fox-hero__title h-item h-d0">
                Where Traders<br />
                <span className="fox-hero__accent">Become Market Leaders</span>
              </h1>
              <p className="fox-hero__desc h-item h-d1">
                For over 15 years, Foxnance has been empowering traders with institutional-grade technology,
                razor-sharp execution, and a commitment to transparency that puts you first.
              </p>
              <div className="fox-hero__stats h-item h-d2">
                {[{ v: '15+', l: 'Years of Excellence' }, { v: '500K+', l: 'Active Traders' }, { v: '$15.2B', l: 'Monthly Volume' }].map((s, i) => (
                  <div key={i} className="fox-hero__stat">
                    <span className="fox-hero__stat-val">{s.v}</span>
                    <span className="fox-hero__stat-lbl">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fox-hero__scroll">
            <div className="fox-hero__scroll-dot" />
          </div>
        </section>

        {/* ── STORY / WHO WE ARE (Light) with Enlarged Image ── */}
        <section
          id="story"
          ref={setRef('story')}
          className={`fox-section fox-section--light fox-reveal ${visible.has('story') ? 'on' : ''}`}
        >
          <div className="fox-container">
            <div className="fox-story">
              <div className="fox-story__text">
                <span className="fox-eyebrow">Who We Are</span>
                <h2 className="fox-h2">The Story Behind<br />Foxnance</h2>
                <p className="fox-body">
                  Founded in 2009, Foxnance emerged from a simple belief: every trader deserves
                  access to institutional-grade trading technology without the institutional barriers.
                </p>
                <p className="fox-body">
                  What started as a vision by a team of passionate traders and technologists has
                  grown into a global brokerage serving over 500,000 clients across 40+ countries.
                  We've built our reputation on three pillars: speed, transparency, and innovation.
                </p>
                <p className="fox-body">
                  Today, Foxnance stands as a multi-regulated broker, offering 2,250+ instruments
                  with ultra-fast execution and spreads from 0.0 pips.
                </p>
              </div>
              <div className="fox-story__visual">
                <div className="fox-story__glow" />
                <div className="fox-story__card-stack">
                  <div className="fox-story__bg-card" />
                  <div className="fox-story__mid-card" />
                  <div className="fox-story__img-wrap fox-story__img-wrap--enlarged">
                    <Image 
                      src="/images/About-us-1.png" 
                      alt="Foxnance Story" 
                      width={600} 
                      height={600} 
                      className="fox-story__image"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE (Dark) ── */}
        <section
          id="history"
          ref={setRef('history')}
          className={`fox-section fox-section--dark fox-reveal ${visible.has('history') ? 'on' : ''}`}
        >
          <div className="fox-container">
            <div className="fox-section-head">
              <span className="fox-eyebrow">Our Journey</span>
              <h2 className="fox-h2">A Legacy of Excellence</h2>
              <p className="fox-sub">15+ years of innovation, growth, and unwavering commitment to traders</p>
            </div>
            <div className="fox-timeline">
              <div className="fox-timeline__spine" />
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`fox-tl-item ${i % 2 === 0 ? 'left' : 'right'} ${activeMilestone === i ? 'active' : ''}`}
                  onMouseEnter={() => setActiveMilestone(i)}
                  onMouseLeave={() => setActiveMilestone(null)}
                  style={{ '--tl-i': i } as React.CSSProperties}
                >
                  <div className="fox-tl-item__dot">
                    <div className="fox-tl-item__dot-inner" />
                    <div className="fox-tl-item__dot-ring" />
                  </div>
                  <div className="fox-tl-item__card">
                    <div className="fox-tl-item__year">{m.year}</div>
                    <h3 className="fox-tl-item__title">{m.title}</h3>
                    <p className="fox-tl-item__desc">{m.description}</p>
                    <div className="fox-tl-item__bar" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES (Light) ── */}
        <section
          id="values"
          ref={setRef('values')}
          className={`fox-section fox-section--light fox-reveal ${visible.has('values') ? 'on' : ''}`}
        >
          <div className="fox-container">
            <div className="fox-section-head">
              <span className="fox-eyebrow">Our Mission & Values</span>
              <h2 className="fox-h2">What Drives Us Forward</h2>
              <p className="fox-sub">Guided by principles that put traders first</p>
            </div>
            <div className="fox-values-grid">
              {coreValues.map((v, i) => (
                <div key={i} className="fox-value-card" style={{ '--vi': i } as React.CSSProperties}>
                  <div className="fox-value-card__glow" />
                  <div className="fox-value-card__icon">
                    <v.icon size={28} />
                  </div>
                  <h3 className="fox-value-card__title">{v.title}</h3>
                  <p className="fox-value-card__desc">{v.desc}</p>
                  <div className="fox-value-card__border" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY FOXNANCE (Dark) ── */}
        <section
          id="why"
          ref={setRef('why')}
          className={`fox-section fox-section--dark fox-reveal ${visible.has('why') ? 'on' : ''}`}
        >
          <div className="fox-container">
            <div className="fox-section-head">
              <span className="fox-eyebrow">Why Foxnance</span>
              <h2 className="fox-h2">The Foxnance Advantage</h2>
              <p className="fox-sub">Experience trading with a broker that truly puts you first</p>
            </div>
            <div className="fox-why-grid">
              {whyFeatures.map((f, i) => (
                <div key={i} className="fox-why-card" style={{ '--wi': i } as React.CSSProperties}>
                  <div className="fox-why-card__icon-wrap">
                    <f.icon size={24} />
                  </div>
                  <div className="fox-why-card__text">
                    <h4 className="fox-why-card__title">{f.title}</h4>
                    <p className="fox-why-card__desc">{f.desc}</p>
                  </div>
                  <div className="fox-why-card__arrow">
                    <FiArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA / READY TO TRADE (Light) with Image ── */}
        <section
          id="ready"
          ref={setRef('ready')}
          className={`fox-section fox-cta fox-reveal ${visible.has('ready') ? 'on' : ''}`}
        >
          <div className="fox-container">
            <div className="fox-cta__card">
              <div className="fox-cta__orb fox-cta__orb--1" />
              <div className="fox-cta__orb fox-cta__orb--2" />
              <div className="fox-cta__content">
                <span className="fox-eyebrow fox-eyebrow--light">Ready to Trade?</span>
                <h2 className="fox-cta__title">Join 500,000+ Traders<br />Who Trust Foxnance</h2>
                <p className="fox-cta__desc">
                  Experience the Foxnance difference. Open your account today and trade with confidence.
                </p>
                <div className="fox-cta__actions">
                  <Link href="/auth-signup" className="fox-btn-primary">
                    Open Live Account <FiArrowRight />
                  </Link>
                  <Link href="/demo" className="fox-btn-secondary">
                    Try Free Demo
                  </Link>
                </div>
                <div className="fox-cta__features">
                  {['No Hidden Fees', 'Instant Deposits', '24/7 Support', 'FCA Regulated'].map((f, i) => (
                    <div key={i} className="fox-cta__feature">
                      <FiCheck size={13} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="fox-cta__visual">
                <div className="fox-cta__img-glow" />
                <Image 
                  src="/images/about-us-2.png" 
                  alt="Start Trading with Foxnance" 
                  width={450} 
                  height={450} 
                  className="fox-cta__image"
                />
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
      <CookieModal />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        /* YOUR ORIGINAL LIGHT THEME STYLES (UNCHANGED) */
        #fox-about {
          --green:        #3fcb1b;
          --green-dk:     #2e9c14;
          --green-glow:   rgba(63,203,27,0.22);
          --green-faint:  rgba(63,203,27,0.07);
          --border-green: rgba(63,203,27,0.22);

          --dk-bg:      #0c0f0a;
          --dk-card:    #141914;
          --dk-border:  rgba(255,255,255,0.08);
          --dk-text:    #edf0ea;
          --dk-text2:   rgba(255,255,255,0.52);

          --lt-bg:      #f8fafc;
          --lt-card:    #ffffff;
          --lt-border:  #e2e8f0;
          --lt-text:    #0c0f0a;
          --lt-text2:   #6b7280;

          --shadow-sm:    0 2px 8px rgba(0,0,0,0.06);
          --shadow-md:    0 8px 32px rgba(0,0,0,0.10);
          --shadow-lg:    0 20px 60px rgba(0,0,0,0.14);
          --shadow-green: 0 8px 32px rgba(63,203,27,0.18);
          --radius-sm:    10px;
          --radius-md:    18px;
          --radius-lg:    28px;
          --ease-spring:  cubic-bezier(0.16,1,0.3,1);
          --ease-out:     cubic-bezier(0.22,1,0.36,1);
          font-family: 'Sora', 'DM Sans', system-ui, sans-serif;
          background: var(--dk-bg);
          color: var(--dk-text);
        }

        /* DARK MODE OVERRIDES (ADDED) */
        .dark-mode #fox-about {
          --lt-bg:      #0a0a0a;
          --lt-card:    #141414;
          --lt-border:  rgba(255,255,255,0.08);
          --lt-text:    #edf0ea;
          --lt-text2:   rgba(237,240,234,0.55);
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
          background: var(--green);
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

        /* Dark mode overrides for light background elements */
        .dark-mode .fox-section--light {
          background: var(--lt-bg);
        }
        
        .dark-mode .fox-story__img-wrap {
          background: var(--lt-card);
          border-color: var(--lt-border);
        }
        
        .dark-mode .fox-story__mid-card {
          background: var(--lt-card);
        }
        
        .dark-mode .fox-value-card {
          background: var(--lt-card);
          border-color: var(--lt-border);
        }
        
        .dark-mode .fox-value-card__title {
          color: var(--lt-text);
        }
        
        .dark-mode .fox-value-card__desc {
          color: var(--lt-text2);
        }
        
        .dark-mode .fox-cta {
          background: var(--lt-bg);
        }
        
        .dark-mode .fox-cta__card {
          background: linear-gradient(135deg, rgba(63,203,27,0.05), rgba(10,10,10,0.02));
          border-color: var(--lt-border);
        }
        
        .dark-mode .fox-cta__title {
          color: var(--lt-text);
        }
        
        .dark-mode .fox-cta__desc {
          color: var(--lt-text2);
        }
        
        .dark-mode .fox-cta__feature {
          color: var(--lt-text2);
        }
        
        .dark-mode .fox-btn-secondary {
          color: var(--lt-text);
          border-color: var(--lt-border);
        }
        
        .dark-mode .fox-btn-secondary:hover {
          border-color: var(--green);
          color: var(--green);
        }

        /* YOUR ORIGINAL STYLES CONTINUE BELOW (COMPLETELY UNCHANGED) */
        #fox-about *, #fox-about *::before, #fox-about *::after { box-sizing: border-box; }

        /* ══ LAYOUT ══ */
        .fox-container { max-width: 1240px; margin: 0 auto; padding: 0 28px; }
        @media(min-width:1024px) { .fox-container { padding: 0 60px; } }
        .fox-section { padding: 100px 0; }

        /* ── DARK SECTION ── */
        .fox-section--dark { background: var(--dk-bg); }
        .fox-section--dark .fox-h2   { color: var(--dk-text) !important; }
        .fox-section--dark .fox-sub  { color: var(--dk-text2) !important; }
        .fox-section--dark .fox-body { color: var(--dk-text2) !important; }

        /* ── LIGHT SECTION ── */
        .fox-section--light { background: var(--lt-bg); }
        .fox-section--light .fox-h2   { color: var(--lt-text) !important; }
        .fox-section--light .fox-sub  { color: var(--lt-text2) !important; }
        .fox-section--light .fox-body { color: var(--lt-text2) !important; }

        .fox-reveal {
          opacity: 0; transform: translateY(48px);
          transition: opacity 0.9s var(--ease-spring), transform 0.9s var(--ease-spring);
        }
        .fox-reveal.on { opacity: 1; transform: translateY(0); }

        /* ══ TYPOGRAPHY ══ */
        .fox-section-head { text-align: center; margin-bottom: 64px; display: flex; flex-direction: column; align-items: center; }
        .fox-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--green); margin-bottom: 16px;
        }
        .fox-eyebrow::before, .fox-eyebrow::after { content: ''; display: block; width: 28px; height: 1.5px; background: currentColor; opacity: 0.5; border-radius: 2px; }
        .fox-eyebrow--light { color: rgba(63,203,27,0.9); }
        .fox-eyebrow--light::before, .fox-eyebrow--light::after { background: rgba(63,203,27,0.6); }
        .fox-h2  { font-size: clamp(1.9rem,4vw,2.9rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.15; color: var(--dk-text); margin: 0 0 10px; }
        .fox-sub { font-size: 1rem; color: var(--dk-text2); line-height: 1.7; max-width: 500px; margin: 0 auto; }
        .fox-body { font-size: 0.94rem; color: var(--dk-text2); line-height: 1.78; margin-bottom: 16px; }

        /* ══ HERO (Dark) ══ */
        .fox-hero {
          position: relative; min-height: 640px;
          display: flex; flex-direction: column; align-items: center;
          background: var(--dk-bg); overflow: hidden; padding-top: 80px;
        }
        .fox-hero__canvas { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .fox-hero__noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px; opacity: 0.4;
        }
        .fox-hero__aurora { position: absolute; border-radius: 50%; filter: blur(100px); transition: transform 0.8s var(--ease-out); will-change: transform; }
        .fox-hero__aurora--1 { width:640px; height:640px; background:radial-gradient(circle,rgba(63,203,27,0.22),transparent 70%); top:-200px; right:-100px; }
        .fox-hero__aurora--2 { width:480px; height:480px; background:radial-gradient(circle,rgba(45,180,10,0.16),transparent 70%); bottom:-100px; left:-80px; animation:auroraShift 12s ease-in-out infinite; }
        .fox-hero__aurora--3 { width:320px; height:320px; background:radial-gradient(circle,rgba(100,230,60,0.1),transparent 70%); top:40%; left:40%; animation:auroraShift 8s ease-in-out infinite reverse; }
        @keyframes auroraShift { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(20px,-20px) scale(1.05);} }
        .fox-hero__grid-lines { position:absolute; inset:0; width:100%; height:100%; }
        .fox-hero__particle { position:absolute; width:3px; height:3px; background:var(--green); border-radius:50%; opacity:0; animation:particleFloat 5s ease-in-out infinite; box-shadow:0 0 8px 2px rgba(63,203,27,0.4); }
        @keyframes particleFloat { 0%{opacity:0;transform:translateY(0) scale(0.5);} 20%{opacity:0.8;} 80%{opacity:0.6;} 100%{opacity:0;transform:translateY(-60px) scale(1.2);} }

        .fox-hero__inner {
          display: flex; justify-content: center; align-items: center;
          flex: 1; width: 100%; max-width: 1240px; margin: 0 auto;
          padding: 60px 28px 80px; position: relative; z-index: 1; text-align: center;
        }
        @media(min-width:1024px){ .fox-hero__inner { padding: 60px 60px 80px; } }

        .h-item { opacity:0; transform:translateY(50px); transition:opacity 0.9s var(--ease-spring),transform 0.9s var(--ease-spring); }
        .fox-hero__inner.ready .h-item { opacity:1; transform:translateY(0); }
        .h-d0{transition-delay:0.1s;} .h-d1{transition-delay:0.25s;} .h-d2{transition-delay:0.4s;}

        .fox-hero__title { font-size:clamp(2.6rem,6vw,4.4rem); font-weight:900; line-height:1.13; color:#fff; letter-spacing:-0.045em; margin:0 0 20px; }
        .fox-hero__accent {
          background:linear-gradient(135deg,#3fcb1b 0%,#7de84a 50%,#3fcb1b 100%); background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmerText 4s linear infinite;
        }
        @keyframes shimmerText { 0%{background-position:0% center;} 100%{background-position:200% center;} }
        .fox-hero__desc { font-size:1rem; color:rgba(237,240,234,0.62); max-width:580px; margin:0 auto 36px; line-height:1.72; }
        .fox-hero__stats { display:flex; justify-content:center; gap:0; padding-top:28px; border-top:1px solid rgba(255,255,255,0.08); }
        .fox-hero__stat { flex:1; max-width:180px; text-align:center; position:relative; padding:0 20px; }
        .fox-hero__stat + .fox-hero__stat::before { content:''; position:absolute; left:0; top:20%; bottom:20%; width:1px; background:rgba(255,255,255,0.12); }
        .fox-hero__stat-val { display:block; font-size:clamp(1.4rem,2.5vw,1.9rem); font-weight:900; color:var(--green); letter-spacing:-0.03em; line-height:1.1; margin-bottom:5px; }
        .fox-hero__stat-lbl { font-size:0.68rem; color:rgba(237,240,234,0.42); font-weight:500; letter-spacing:0.04em; }
        .fox-hero__scroll { position:absolute; bottom:28px; left:50%; transform:translateX(-50%); z-index:1; width:24px; height:38px; border:1.5px solid rgba(255,255,255,0.2); border-radius:100px; display:flex; justify-content:center; padding-top:7px; }
        .fox-hero__scroll-dot { width:4px; height:8px; background:var(--green); border-radius:100px; animation:scrollBob 2s ease-in-out infinite; }
        @keyframes scrollBob { 0%,100%{opacity:1;transform:translateY(0);} 60%{opacity:0.3;transform:translateY(10px);} }

        /* ══ STORY — LIGHT with Enlarged Image ══ */
        .fox-story { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
        @media(max-width:900px){ .fox-story { grid-template-columns:1fr; gap:48px; } }
        .fox-story__text { display:flex; flex-direction:column; }

        .fox-story__visual { position:relative; display:flex; justify-content:center; }
        .fox-story__glow { position:absolute; width:380px; height:380px; background:radial-gradient(circle,var(--green-glow),transparent); border-radius:50%; filter:blur(60px); z-index:0; }
        .fox-story__card-stack { position:relative; width:520px; max-width:100%; }
        .fox-story__bg-card, .fox-story__mid-card { position:absolute; inset:0; border-radius:var(--radius-lg); border:1px solid var(--border-green); }
        .fox-story__bg-card { transform:rotate(6deg) translateY(12px); background:var(--green-faint); opacity:0.5; }
        .fox-story__mid-card { transform:rotate(3deg) translateY(6px); background:var(--lt-card); box-shadow:var(--shadow-md); }
        .fox-story__img-wrap { position:relative; z-index:1; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-lg),0 0 0 1px var(--border-green); background:var(--lt-card); }
        .fox-story__img-wrap--enlarged { transform:scale(1.05); }
        .fox-story__image { width:100%; height:auto; display:block; object-fit:cover; transition:transform 0.5s var(--ease-spring); }
        .fox-story__img-wrap:hover .fox-story__image { transform:scale(1.02); }

        /* ══ TIMELINE — DARK ══ */
        .fox-timeline { position:relative; max-width:860px; margin:0 auto; padding:20px 0; }
        .fox-timeline__spine { position:absolute; left:20px; top:0; bottom:0; width:2px; background:linear-gradient(to bottom,var(--green),rgba(63,203,27,0.1)); border-radius:2px; }
        @media(min-width:768px){ .fox-timeline__spine { left:50%; transform:translateX(-50%); } }

        .fox-tl-item { display:flex; position:relative; margin-bottom:36px; transition:all 0.3s var(--ease-out); }
        @media(min-width:768px){
          .fox-tl-item.left  { justify-content:flex-end; padding-right:calc(50% + 28px); }
          .fox-tl-item.right { justify-content:flex-start; padding-left:calc(50% + 28px); }
        }
        .fox-tl-item__dot { position:absolute; left:14px; top:18px; width:14px; height:14px; z-index:1; }
        @media(min-width:768px){ .fox-tl-item__dot { left:50%; transform:translateX(-50%); } }
        .fox-tl-item__dot-inner { width:100%; height:100%; background:var(--green); border-radius:50%; border:2px solid var(--dk-bg); transition:all 0.3s; }
        .fox-tl-item__dot-ring { position:absolute; inset:-5px; border-radius:50%; border:1.5px solid rgba(63,203,27,0.35); opacity:0; transition:all 0.3s; }
        .fox-tl-item.active .fox-tl-item__dot-inner { transform:scale(1.3); box-shadow:0 0 0 4px rgba(63,203,27,0.2); }
        .fox-tl-item.active .fox-tl-item__dot-ring { opacity:1; animation:ringPulse 1.5s ease-in-out infinite; }
        @keyframes ringPulse { 0%,100%{transform:scale(1);opacity:0.5;} 50%{transform:scale(1.4);opacity:0;} }

        .fox-tl-item__card {
          background:var(--dk-card); border:1px solid var(--dk-border);
          border-radius:var(--radius-md); padding:22px 24px;
          margin-left:40px; width:calc(100% - 40px);
          box-shadow:var(--shadow-sm); transition:all 0.3s var(--ease-out);
          cursor:pointer; position:relative; overflow:hidden;
        }
        @media(min-width:768px){ .fox-tl-item__card { margin-left:0; width:100%; } }
        .fox-tl-item.active .fox-tl-item__card { border-color:var(--border-green); box-shadow:var(--shadow-green),var(--shadow-md); transform:translateY(-4px); }
        .fox-tl-item__year { font-size:0.72rem; font-weight:800; color:var(--green); letter-spacing:0.1em; margin-bottom:6px; text-transform:uppercase; }
        .fox-tl-item__title { font-size:1rem; font-weight:800; color:var(--dk-text); margin-bottom:6px; }
        .fox-tl-item__desc { font-size:0.82rem; color:var(--dk-text2); line-height:1.55; margin:0; }
        .fox-tl-item__bar { position:absolute; bottom:0; left:0; height:2px; width:0; background:linear-gradient(90deg,var(--green),rgba(63,203,27,0.3)); transition:width 0.4s var(--ease-out); }
        .fox-tl-item.active .fox-tl-item__bar { width:100%; }

        /* ══ VALUES — LIGHT ══ */
        .fox-values-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(270px,1fr)); gap:24px; }
        .fox-value-card {
          background:var(--lt-card); border:1px solid var(--lt-border);
          border-radius:var(--radius-md); padding:36px 28px;
          text-align:center; cursor:pointer; position:relative; overflow:hidden;
          transition:transform 0.35s var(--ease-spring),box-shadow 0.35s,border-color 0.35s;
          box-shadow:var(--shadow-sm);
        }
        .fox-value-card:hover { transform:translateY(-8px); border-color:var(--border-green); box-shadow:var(--shadow-green),var(--shadow-md); }
        .fox-value-card__glow { position:absolute; top:-40px; left:50%; transform:translateX(-50%); width:160px; height:160px; background:radial-gradient(circle,var(--green-glow),transparent); border-radius:50%; opacity:0; filter:blur(30px); transition:opacity 0.4s; pointer-events:none; }
        .fox-value-card:hover .fox-value-card__glow { opacity:1; }
        .fox-value-card__icon { width:68px; height:68px; background:var(--green-faint); color:var(--green); border-radius:20px; display:flex; align-items:center; justify-content:center; margin:0 auto 22px; border:1px solid var(--border-green); transition:all 0.35s var(--ease-spring); position:relative; z-index:1; }
        .fox-value-card:hover .fox-value-card__icon { background:var(--green); color:#000; transform:scale(1.08) rotate(-4deg); box-shadow:0 8px 24px rgba(63,203,27,0.35); }
        .fox-value-card__title { font-size:1.05rem; font-weight:800; color:var(--lt-text); margin:0 0 12px; position:relative; z-index:1; }
        .fox-value-card__desc { font-size:0.84rem; color:var(--lt-text2); line-height:1.65; margin:0; position:relative; z-index:1; }
        .fox-value-card__border { position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--green),transparent); opacity:0; transition:opacity 0.35s; }
        .fox-value-card:hover .fox-value-card__border { opacity:1; }

        /* ══ WHY FOXNANCE — DARK ══ */
        .fox-why-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:16px; }
        .fox-why-card {
          display:flex; align-items:center; gap:18px; padding:22px 24px;
          background:var(--dk-card); border:1px solid var(--dk-border);
          border-radius:var(--radius-md); cursor:pointer; position:relative; overflow:hidden;
          box-shadow:var(--shadow-sm); transition:all 0.3s var(--ease-out);
        }
        .fox-why-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0; background:linear-gradient(90deg,var(--green-faint),transparent); transition:width 0.35s var(--ease-out); border-radius:inherit; }
        .fox-why-card:hover { border-color:var(--border-green); box-shadow:var(--shadow-md); transform:translateX(4px); }
        .fox-why-card:hover::before { width:100%; }
        .fox-why-card__icon-wrap { width:48px; height:48px; flex-shrink:0; background:var(--green-faint); color:var(--green); border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; border:1px solid var(--border-green); transition:all 0.3s; position:relative; z-index:1; }
        .fox-why-card:hover .fox-why-card__icon-wrap { background:var(--green); color:#000; box-shadow:0 4px 16px rgba(63,203,27,0.3); }
        .fox-why-card__text { flex:1; position:relative; z-index:1; }
        .fox-why-card__title { font-size:0.92rem; font-weight:800; color:var(--dk-text); margin:0 0 3px; }
        .fox-why-card__desc { font-size:0.75rem; color:var(--dk-text2); margin:0; }
        .fox-why-card__arrow { color:var(--dk-text2); opacity:0; transform:translateX(-8px); transition:all 0.3s; position:relative; z-index:1; }
        .fox-why-card:hover .fox-why-card__arrow { opacity:1; transform:translateX(0); color:var(--green); }

        /* ══ CTA — LIGHT with Image ══ */
        .fox-cta { background: var(--lt-bg); }
        .fox-cta__card {
          display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center;
          background:linear-gradient(135deg,rgba(63,203,27,0.05) 0%,rgba(255,255,255,0.02) 60%);
          border:1px solid var(--lt-border);
          border-radius:var(--radius-lg);
          padding:64px 60px; position:relative; overflow:hidden;
          box-shadow:var(--shadow-lg);
        }
        @media(max-width:900px){ .fox-cta__card { grid-template-columns:1fr; padding:48px 32px; gap:40px; text-align:center; } }
        .fox-cta__orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
        .fox-cta__orb--1 { width:400px; height:400px; background:radial-gradient(circle,rgba(63,203,27,0.08),transparent); top:-100px; right:-100px; animation:orbDrift 10s ease-in-out infinite; }
        .fox-cta__orb--2 { width:300px; height:300px; background:radial-gradient(circle,rgba(63,203,27,0.06),transparent); bottom:-80px; left:-60px; animation:orbDrift 14s ease-in-out infinite reverse; }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0);} 50%{transform:translate(15px,-15px);} }
        .fox-cta__content { position:relative; z-index:1; }
        .fox-cta__title { font-size:clamp(1.6rem,3vw,2.4rem); font-weight:900; color:var(--lt-text); letter-spacing:-0.04em; line-height:1.18; margin:0 0 16px; }
        .fox-cta__desc { font-size:0.95rem; color:var(--lt-text2); line-height:1.7; margin-bottom:32px; }
        .fox-cta__actions { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:28px; }
        @media(max-width:900px){ .fox-cta__actions { justify-content:center; } }
        .fox-cta__features { display:flex; flex-wrap:wrap; gap:18px; }
        @media(max-width:900px){ .fox-cta__features { justify-content:center; } }
        .fox-cta__feature { display:flex; align-items:center; gap:6px; font-size:0.78rem; color:var(--lt-text2); font-weight:500; }
        .fox-cta__feature svg { color:var(--green); }
        .fox-cta__visual { position:relative; display:flex; justify-content:center; z-index:1; }
        .fox-cta__img-glow { position:absolute; width:350px; height:350px; background:radial-gradient(circle,rgba(63,203,27,0.15),transparent); border-radius:50%; filter:blur(50px); }
        .fox-cta__image { max-width:100%; height:auto; position:relative; z-index:1; filter:drop-shadow(0 20px 40px rgba(63,203,27,0.15)); animation:floatImg 6s ease-in-out infinite; border-radius:var(--radius-md); }
        @keyframes floatImg { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }

        /* ══ BUTTONS ══ */
        .fox-btn-primary { display:inline-flex; align-items:center; gap:8px; padding:14px 30px; background:var(--green); color:#000; font-weight:800; font-size:0.88rem; border-radius:100px; text-decoration:none; transition:all 0.3s var(--ease-out); position:relative; overflow:hidden; }
        .fox-btn-primary::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent); transform:translateX(-100%); transition:transform 0.5s var(--ease-out); }
        .fox-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(63,203,27,0.4); }
        .fox-btn-primary:hover::before { transform:translateX(100%); }
        .fox-btn-secondary { display:inline-flex; align-items:center; gap:8px; padding:14px 30px; background:transparent; color:var(--lt-text); font-weight:700; font-size:0.88rem; border:1.5px solid var(--lt-border); border-radius:100px; text-decoration:none; transition:all 0.3s var(--ease-out); }
        .fox-btn-secondary:hover { border-color:var(--green); color:var(--green); transform:translateY(-3px); box-shadow:0 8px 24px rgba(63,203,27,0.15); }

        /* ══ RESPONSIVE ══ */
        @media(max-width:640px){
          .fox-section { padding:72px 0; }
          .fox-hero__stats { gap:0; }
          .fox-hero__stat-val { font-size:1.3rem; }
          .fox-timeline__spine { display:none; }
          .fox-tl-item__card { margin-left:28px; width:calc(100% - 28px); }
          .fox-tl-item__dot { left:10px; }
          .fox-story__card-stack { width:100%; }
          .fox-story__bg-card, .fox-story__mid-card { display:none; }
          .fox-story__img-wrap--enlarged { transform:scale(1); }
          .fox-cta__card { padding:40px 24px; }
        }
      `}</style>
    </>
  );
}