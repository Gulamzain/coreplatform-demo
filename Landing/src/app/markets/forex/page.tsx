// src/app/markets/forex/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  BiDollar, BiShield, BiGlobe, BiCheckCircle,
  BiPlus, BiMinus, BiChart, BiMap, BiLock
} from 'react-icons/bi';
import { FiArrowUpRight, FiArrowDownRight, FiArrowRight } from 'react-icons/fi';

// Components
const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

/* ─── Data ──────────────────────────────────────────────────── */

const TRADING_CATEGORIES = [
  { image: "/images/Forex.png",     title: "Forex",       desc: "60+ currency pairs with tight spreads from 0.0 pips", link: "/markets/forex" },
  { image: "/images/Commodity.png", title: "Commodities", desc: "Gold, Silver, Oil, and agricultural products",         link: "/markets/commodities" },
  { image: "/images/Stocks.png",    title: "Stocks",      desc: "1,700+ global stocks with competitive pricing",        link: "/markets/stocks" },
  { image: "/images/Crypto.png",    title: "Crypto",      desc: "Bitcoin, Ethereum and major altcoins CFDs",            link: "/markets/crypto" },
  { image: "/images/Indices.png",   title: "Indices",     desc: "S&P 500, FTSE 100, DAX 40 and more",                  link: "/markets/indices" },
];

const initialLivePrices = [
  { pair: 'EUR/USD', bid: 1.08432, ask: 1.08435, change: 0.04,  high: 1.08550, low: 1.08320, direction: 'up'   as const },
  { pair: 'GBP/USD', bid: 1.27680, ask: 1.27685, change: 0.19,  high: 1.27800, low: 1.27550, direction: 'up'   as const },
  { pair: 'USD/JPY', bid: 151.22,  ask: 151.25,  change: -0.12, high: 151.50,  low: 151.00,  direction: 'down' as const },
  { pair: 'AUD/USD', bid: 0.65420, ask: 0.65425, change: 0.08,  high: 0.65500, low: 0.65350, direction: 'up'   as const },
  { pair: 'USD/CAD', bid: 1.35840, ask: 1.35845, change: -0.05, high: 1.35900, low: 1.35780, direction: 'down' as const },
  { pair: 'NZD/USD', bid: 0.61230, ask: 0.61235, change: 0.11,  high: 0.61300, low: 0.61150, direction: 'up'   as const },
];

const features = [
  { icon: BiMap,    title: 'Ultra-Fast Execution', desc: 'Sub-40ms execution with no dealing desk intervention' },
  { icon: BiDollar, title: 'Tight Spreads',        desc: 'From 0.0 pips on major currency pairs' },
  { icon: BiShield, title: 'FCA Regulated',        desc: 'Fully regulated and compliant with global standards' },
  { icon: BiGlobe,  title: 'Global Markets',       desc: 'Trade 70+ currency pairs 24/5' },
  { icon: BiChart,  title: 'Advanced Tools',       desc: 'Powerful charts and analysis tools' },
  { icon: BiLock,   title: 'Secure Trading',       desc: 'Segregated accounts and SSL encryption' },
];

const faqItems = [
  { q: 'What is Forex trading?',       a: 'Forex trading is the buying and selling of currencies on the foreign exchange market. It\'s the world\'s largest financial market, with over $6 trillion traded daily.' },
  { q: 'What are the trading hours?',  a: 'Forex markets are open 24 hours a day, 5 days a week (Monday to Friday), allowing you to trade at any time that suits your schedule.' },
  { q: 'What is the minimum deposit?', a: 'The minimum deposit is $200 for all account types. Fund via bank transfer, credit card, or e-wallet.' },
  { q: 'What leverage do you offer?',  a: 'We offer leverage up to 1:500 on Forex pairs, allowing you to control larger positions with a smaller capital investment.' },
  { q: 'Is there a demo account?',     a: 'Yes, you can open a free demo account with $10,000 virtual funds to practice trading without risk.' },
];

/* ─── Page Component ─────────────────────────────────────────── */

export default function ForexPage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [openFaq, setOpenFaq]                 = useState<number | null>(null);
  const [selectedPair, setSelectedPair]       = useState(initialLivePrices[0]);
  const [livePrices, setLivePrices]           = useState(initialLivePrices);
  const [visible, setVisible]                 = useState<Set<string>>(new Set());
  const [heroReady, setHeroReady]             = useState(false);
  const [tickerOffset, setTickerOffset]       = useState(0);
  const [priceAnimations, setPriceAnimations] = useState<Record<string, 'up' | 'down' | null>>({});
  const [hoveredRow, setHoveredRow]           = useState<string | null>(null);

  const refs            = useRef<{ [k: string]: HTMLElement | null }>({});
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* Live price feed */
  useEffect(() => {
    const scheduleUpdate = () => {
      updateTimeoutRef.current = setTimeout(() => {
        setLivePrices(prev =>
          prev.map(price => {
            const movement  = (Math.random() - 0.5) * 0.0008;
            const newBid    = +(price.bid + movement).toFixed(5);
            const newAsk    = +(price.ask + movement).toFixed(5);
            const newChange = +(((newBid - (price.bid - movement * 0.5)) / (price.bid - movement * 0.5)) * 100).toFixed(2);
            const direction = movement >= 0 ? 'up' : 'down';
            setPriceAnimations(p => ({ ...p, [price.pair]: direction }));
            setTimeout(() => setPriceAnimations(p => ({ ...p, [price.pair]: null })), 500);
            return { ...price, bid: newBid, ask: newAsk, change: newChange, direction, high: Math.max(price.high, newBid), low: Math.min(price.low, newBid) };
          })
        );
        scheduleUpdate();
      }, 2000);
    };
    scheduleUpdate();
    return () => { if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current); };
  }, []);

  /* Scroll reveal + hero + ticker */
  useEffect(() => {
    const t  = setTimeout(() => setHeroReady(true), 100);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));

    let frame: number;
    let offset = 0;
    const animate = () => {
      offset -= 0.5;
      if (offset <= -(initialLivePrices.length * 230)) offset = 0;
      setTickerOffset(offset);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { clearTimeout(t); io.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  /* ─── JSX ──────────────────────────────────────────────────── */
  return (
    <>
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined} />

      <div id="fx-wrapper">

        {/* ── 1 · HERO  (BLACK) ─────────────────────────────────── */}
        <section className="fx-hero">
          {/* subtle grid */}
          <div className="fx-hero__grid" aria-hidden />
          {/* glow blobs */}
          <div className="fx-blob fx-blob--a" aria-hidden />
          <div className="fx-blob fx-blob--b" aria-hidden />

          <div className={`fx-hero__inner ${heroReady ? 'ready' : ''}`}>
            {/* floating asset */}
            <div className="fx-hero__visual h-item h-d1" aria-hidden>
              <div className="fx-hero__ring" />
              <Image src="/images/MainForex.png" alt="Forex" width={900} height={900} className="fx-hero__img" priority />
            </div>

            {/* copy */}
            <div className="fx-hero__copy h-item h-d2">
              <span className="fx-badge">
                <span className="fx-badge__dot" />
                Markets Open · Live Prices
              </span>
              <h1 className="fx-hero__title">FORE<span className="fx-accent">X</span></h1>
              <p className="fx-hero__sub">The world's most traded market.</p>
              <p className="fx-hero__desc">
                Trade 70+ currency pairs with tight spreads, deep liquidity, and execution that never misses a move.
              </p>
              <Link href="/auth-signup" className="fx-btn fx-btn--primary">
                Start Trading <FiArrowRight />
              </Link>
              <div className="fx-hero__stats">
                {[{v:'$6T+',l:'Daily Volume'},{v:'70+',l:'Pairs'},{v:'0.0',l:'Min Spread'}].map((s,i)=>(
                  <div key={i} className="fx-hero__stat">
                    <span className="fx-hero__stat-val">{s.v}</span>
                    <span className="fx-hero__stat-lbl">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ticker bar */}
          <div className="fx-ticker">
            <div className="fx-ticker__live">
              <span className="fx-ticker__dot" />LIVE
            </div>
            <div className="fx-ticker__track">
              <div className="fx-ticker__inner" style={{ transform: `translateX(${tickerOffset}px)` }}>
                {[...livePrices, ...livePrices, ...livePrices].map((p, i) => (
                  <div key={i} className="fx-ticker__item">
                    <span className="fx-ticker__pair">{p.pair}</span>
                    <span className={`fx-ticker__bid ${priceAnimations[p.pair] === 'up' ? 'flash-up' : priceAnimations[p.pair] === 'down' ? 'flash-dn' : ''}`}>
                      {p.bid}
                    </span>
                    <span className={`fx-ticker__chg ${p.direction === 'up' ? 'up' : 'dn'}`}>
                      {p.direction === 'up' ? <FiArrowUpRight size={11}/> : <FiArrowDownRight size={11}/>}
                      {p.change >= 0 ? '+' : ''}{Math.abs(p.change)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2 · LIVE PRICES  (WHITE) ──────────────────────────── */}
        <section id="prices" ref={setRef('prices')} className={`fx-section fx-section--white fx-reveal ${visible.has('prices')?'on':''}`}>
          <div className="fx-container">
            <div className="fx-head fx-head--dark">
              <span className="fx-eyebrow fx-eyebrow--dark">LIVE MARKET DATA</span>
              <h2 className="fx-h2 fx-h2--dark">Real-Time Forex Prices</h2>
              <p className="fx-sub fx-sub--dark">Live streaming prices updated every 2 seconds</p>
            </div>

            <div className="fx-prices-wrap">
              <div className="fx-prices-tbl">
                <div className="fx-prices-head">
                  <span>Pair</span><span>Bid</span><span>Ask</span><span>Change</span><span>24H H/L</span>
                </div>
                {livePrices.map((p,i) => (
                  <div
                    key={i}
                    className={`fx-prow ${selectedPair.pair===p.pair?'active':''} ${hoveredRow===p.pair?'hovered':''}`}
                    onMouseEnter={() => setHoveredRow(p.pair)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => setSelectedPair(p)}
                  >
                    <span className="fx-pr-pair">{p.pair}</span>
                    <span className={`fx-pr-mono ${priceAnimations[p.pair]==='up'?'flash-up':priceAnimations[p.pair]==='down'?'flash-dn':''}`}>
                      {p.bid}
                    </span>
                    <span className="fx-pr-mono">{p.ask}</span>
                    <span className={`fx-pr-chg ${p.direction==='up'?'up':'dn'}`}>
                      {p.direction==='up'?<FiArrowUpRight/>:<FiArrowDownRight/>}
                      {p.change>=0?'+':''}{Math.abs(p.change)}%
                    </span>
                    <span className="fx-pr-hl">{p.high}/{p.low}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fx-prices-cta">
              <Link href="/auth-signup" className="fx-btn fx-btn--primary">Open Live Account <FiArrowRight /></Link>
              <Link href="/auth-signup" className="fx-btn fx-btn--outline-dark">Try Demo Free <FiArrowRight /></Link>
            </div>
          </div>
        </section>

        {/* ── 3 · WHAT IS FOREX  (BLACK) ────────────────────────── */}
        <section id="what" ref={setRef('what')} className={`fx-section fx-section--black fx-reveal ${visible.has('what')?'on':''}`}>
          <div className="fx-container">
            <div className="fx-head">
              <span className="fx-eyebrow">Learn the Basics</span>
              <h2 className="fx-h2">What is Forex Trading?</h2>
            </div>
            <div className="fx-what-grid">
              <div className="fx-what-text">
                <p>Forex (foreign exchange) trading is the buying and selling of currencies on the global market. It&apos;s the world&apos;s largest financial market, with over $6 trillion traded daily.</p>
                <p>Unlike stock markets, Forex operates 24 hours a day, five days a week, allowing traders to respond to market movements as they happen.</p>
                <ul className="fx-checklist">
                  {['Trade major, minor, and exotic currency pairs','Leverage up to 1:500 to maximize opportunities','Access deep liquidity from top-tier banks','Trade from anywhere with mobile and web platforms'].map((t,i)=>(
                    <li key={i}><BiCheckCircle className="fx-check-icon" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="fx-stat-grid">
                {[{v:'$6T+',l:'Daily Volume'},{v:'70+',l:'Currency Pairs'},{v:'24/5',l:'Trading Hours'},{v:'0.0',l:'Min Spread (pips)'}].map((s,i)=>(
                  <div key={i} className="fx-stat-card">
                    <span className="fx-stat-val">{s.v}</span>
                    <span className="fx-stat-lbl">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 · WHY TRADE WITH US  (WHITE) ───────────────────── */}
        <section id="why" ref={setRef('why')} className={`fx-section fx-section--white fx-reveal ${visible.has('why')?'on':''}`}>
          <div className="fx-container">
            <div className="fx-head fx-head--dark">
              <span className="fx-eyebrow fx-eyebrow--dark">Why Choose Us</span>
              <h2 className="fx-h2 fx-h2--dark">Why Trade with Foxnance?</h2>
              <p className="fx-sub fx-sub--dark">Experience trading with a broker that puts you first</p>
            </div>
            <div className="fx-feat-grid">
              {features.map((f,i) => (
                <div key={i} className="fx-feat-card">
                  <div className="fx-feat-icon"><f.icon size={26} /></div>
                  <h3 className="fx-feat-title">{f.title}</h3>
                  <p className="fx-feat-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5 · ACCESS GLOBAL MARKETS  (BLACK) ───────────────── */}
        <section id="markets" ref={setRef('markets')} className={`fx-section fx-section--black fx-reveal ${visible.has('markets')?'on':''}`}>
          <div className="fx-container">
            <div className="fx-head">
              <span className="fx-eyebrow">Explore Our Products</span>
              <h2 className="fx-h2">Access Global Markets</h2>
              <p className="fx-sub">One account. 2,250+ instruments. Real-time execution.</p>
            </div>
            <div className="fx-mkt-grid">
              {TRADING_CATEGORIES.map((cat,i) => (
                <div
                  key={i}
                  className={`fx-mkt-card ${hoveredCategory===i?'hovered':''}`}
                  onMouseEnter={() => setHoveredCategory(i)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => window.location.href = cat.link}
                >
                  <div className="fx-mkt-img-wrap">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      width={170}
                      height={170}
                      className="fx-mkt-img"
                      data-category={cat.title}
                      priority
                    />
                  </div>
                  <h3 className="fx-mkt-title">{cat.title}</h3>
                  <p className="fx-mkt-desc">{cat.desc}</p>
                  <div className="fx-mkt-overlay">
                    <span>TRADE {cat.title.toUpperCase()} <FiArrowRight size={12}/></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6 · OPEN ACCOUNT  (WHITE) ─────────────────────────── */}
        <section id="open" ref={setRef('open')} className={`fx-section fx-section--white fx-reveal ${visible.has('open')?'on':''}`}>
          <div className="fx-container">
            <div className="fx-open-card">
              <div className="fx-open-left">
                <span className="fx-eyebrow fx-eyebrow--dark">Get Started</span>
                <h2 className="fx-h2 fx-h2--dark">Open a Foxnance Account Now</h2>
                <div className="fx-steps">
                  {[
                    {n:'1',t:'Register',  d:'Quick and easy account opening process.'},
                    {n:'2',t:'Fund',      d:'Fund your account with multiple deposit methods.'},
                    {n:'3',t:'Trade',     d:'Trade with spreads from 0.0 pips.'},
                  ].map((s,i)=>(
                    <div key={i} className="fx-step">
                      <div className="fx-step-num">{s.n}</div>
                      <div>
                        <h4 className="fx-step-title">{s.t}</h4>
                        <p  className="fx-step-desc">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/auth-signup" className="fx-btn fx-btn--primary">
                  Open Account <FiArrowRight />
                </Link>
              </div>
              <div className="fx-open-right">
                {['No Hidden Fees','Instant Deposits','Fast Withdrawals','24/7 Support','FCA Regulated','Segregated Funds'].map((b,i)=>(
                  <div key={i} className="fx-benefit">
                    <BiCheckCircle className="fx-benefit-icon" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7 · FAQ  (BLACK) ──────────────────────────────────── */}
        <section id="faq" ref={setRef('faq')} className={`fx-section fx-section--black fx-reveal ${visible.has('faq')?'on':''}`}>
          <div className="fx-container">
            <div className="fx-head">
              <span className="fx-eyebrow">FAQ</span>
              <h2 className="fx-h2">Frequently Asked Questions</h2>
              <p className="fx-sub">Everything you need to know about Forex trading</p>
            </div>
            <div className="fx-faq">
              {faqItems.map((item,i) => (
                <div key={i} className={`fx-faq__item ${openFaq===i?'open':''}`}>
                  <button className="fx-faq__q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                    <span>{item.q}</span>
                    <span className="fx-faq__icon">{openFaq===i?<BiMinus size={18}/>:<BiPlus size={18}/>}</span>
                  </button>
                  <div className="fx-faq__a"><p>{item.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>{/* end #fx-wrapper */}

      <Footer />
      <CookieModal />

      {/* ── GLOBAL STYLES ──────────────────────────────────────── */}
      <style jsx global>{`
        /* ── Design tokens ──────────────────────────── */
        #fx-wrapper {
          --green:       #3fcb1b;
          --green-dk:    #2e9c14;
          --green-glow:  rgba(63,203,27,0.28);
          --black:       #080808;
          --white:       #ffffff;
          --off-white:   #f5f5f2;
          --text-on-black: #f0f0ee;
          --text-dim-black: rgba(240,240,238,0.55);
          --text-on-white: #0a0a0a;
          --text-dim-white: #6b7280;
          --border-black: rgba(255,255,255,0.09);
          --border-white: rgba(0,0,0,0.10);
          --radius:  14px;
          --radius-lg: 22px;
          --ease-spring: cubic-bezier(0.16,1,0.3,1);
          --ease-out:    cubic-bezier(0.22,1,0.36,1);
        }

        /* ── Section shells ─────────────────────────── */
        .fx-section         { padding: 100px 0; }
        .fx-section--black  { background: var(--black); color: var(--text-on-black); }
        .fx-section--white  { background: var(--white); color: var(--text-on-white); }

        /* FAQ gets a lighter dark bg so it reads distinctly from the footer */
        #faq.fx-section--black {
          background: #111113;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-bottom: 120px;
        }
        /* Decorative rule above FAQ container */
        #faq .fx-container::before {
          content: '';
          display: block;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, var(--green), var(--green-dk));
          border-radius: 2px;
          margin: 0 auto 56px;
        }
        /* Ensure footer gets a clear black baseline */
        #fx-wrapper + footer,
        #fx-wrapper ~ footer {
          border-top: 2px solid rgba(255,255,255,.06) !important;
        }

        /* Scroll reveal */
        .fx-reveal     { opacity: 0; transform: translateY(36px); transition: opacity .9s var(--ease-spring), transform .9s var(--ease-spring); }
        .fx-reveal.on  { opacity: 1; transform: translateY(0); }

        .fx-container  { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media(min-width:1024px){ .fx-container { padding: 0 64px; } }

        /* ── Typography helpers ─────────────────────── */
        .fx-head        { text-align: center; margin-bottom: 56px; }
        .fx-head--dark  { }   /* used for white-bg heads */

        .fx-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: .68rem; font-weight: 700; letter-spacing: .18em;
          text-transform: uppercase; color: var(--green); margin-bottom: 14px;
        }
        .fx-eyebrow::before, .fx-eyebrow::after {
          content:''; display:block; width:22px; height:1px;
          background: var(--green); opacity:.5;
        }
        .fx-eyebrow--dark { color: var(--green); }

        .fx-h2            { font-size: clamp(1.9rem,4vw,2.9rem); font-weight: 900; letter-spacing:-.03em; line-height:1.1; color: var(--text-on-black); }
        .fx-h2--dark      { color: var(--text-on-white); }
        .fx-sub           { font-size: .95rem; color: var(--text-dim-black); max-width:520px; margin: 14px auto 0; line-height:1.7; }
        .fx-sub--dark     { color: var(--text-dim-white); }

        /* ── Unified Button System ──────────────────── */
        .fx-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 30px;
          font-size: .88rem; font-weight: 700; letter-spacing: .02em;
          border-radius: 8px; text-decoration: none; border: 2px solid transparent;
          transition: transform .25s var(--ease-out), box-shadow .25s var(--ease-out),
                      background .25s, color .25s, border-color .25s;
          cursor: pointer;
        }
        /* Primary – green fill (works on both black and white bg) */
        .fx-btn--primary {
          background: var(--green);
          color: #fff;
          border-color: var(--green);
          box-shadow: 0 4px 18px var(--green-glow);
        }
        .fx-btn--primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 32px rgba(63,203,27,.5);
          background: var(--green-dk);
          border-color: var(--green-dk);
        }
        /* Outline for white bg */
        .fx-btn--outline-dark {
          background: transparent;
          color: var(--text-on-white);
          border-color: rgba(0,0,0,0.18);
        }
        .fx-btn--outline-dark:hover {
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-3px);
        }
        /* Outline for black bg */
        .fx-btn--outline-light {
          background: transparent;
          color: var(--text-on-black);
          border-color: rgba(255,255,255,0.18);
        }
        .fx-btn--outline-light:hover {
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-3px);
        }

        /* ── Badge ──────────────────────────────────── */
        .fx-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; background: rgba(63,203,27,.12);
          border: 1px solid rgba(63,203,27,.25); border-radius: 100px;
          font-size: .7rem; font-weight: 600; color: var(--green); margin-bottom: 22px;
        }
        .fx-badge__dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--green);
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(63,203,27,.4); } 50%{ box-shadow:0 0 0 5px rgba(63,203,27,0); } }

        /* ── HERO ───────────────────────────────────── */
        .fx-hero {
          position: relative; min-height: 660px; background: var(--black);
          display: flex; flex-direction: column; align-items: center;
          padding-top: 80px; overflow: hidden;
        }
        .fx-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(63,203,27,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(63,203,27,.05) 1px, transparent 1px);
          background-size: 54px 54px;
        }
        .fx-blob { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
        .fx-blob--a { width:600px; height:600px; background:radial-gradient(circle,rgba(63,203,27,.2),transparent 70%); top:-140px; right:-80px; animation:blobDrift 9s ease-in-out infinite; }
        .fx-blob--b { width:400px; height:400px; background:radial-gradient(circle,rgba(59,130,246,.14),transparent 70%); bottom:-80px; left:-60px; animation:blobDrift 11s ease-in-out infinite reverse; }
        @keyframes blobDrift { 0%,100%{transform:translate(0,0);} 50%{transform:translate(18px,-18px);} }

        .fx-hero__inner {
          display: flex; justify-content: flex-end; align-items: center;
          width: 100%; max-width: 1280px; margin: 0 auto;
          padding: 0 64px; position: relative; z-index: 1; flex: 1;
        }
        @media(max-width:968px){ .fx-hero__inner { justify-content: center; text-align: center; padding: 0 24px; } }

        .fx-hero__visual {
          position: absolute; left: -100px; top: 50%; transform: translateY(-50%);
          width: 46%; pointer-events: none; animation: floatImg 6s ease-in-out infinite;
        }
        @keyframes floatImg { 0%,100%{ transform:translateY(-50%) translateY(0); } 50%{ transform:translateY(-50%) translateY(-20px); } }

        .fx-hero__ring {
          position: absolute; width: 420px; height: 420px; border-radius: 50%;
          border: 1px solid rgba(63,203,27,.15); top:50%; left:50%;
          transform: translate(-50%,-50%); animation: ringPulse 4s ease-in-out infinite;
        }
        @keyframes ringPulse { 0%,100%{ opacity:.4; transform:translate(-50%,-50%) scale(1); } 50%{ opacity:.8; transform:translate(-50%,-50%) scale(1.04); } }

        .fx-hero__img {
          width:100%; height:auto; max-width:580px; object-fit:contain;
          filter: drop-shadow(0 0 80px rgba(63,203,27,.3)); position:relative; z-index:1;
        }
        .fx-hero__copy {
          width:100%; max-width:490px; text-align:right;
          display:flex; flex-direction:column; align-items:flex-end;
          color: var(--text-on-black); position:relative; z-index:2;
        }
        @media(max-width:968px){
          .fx-hero__copy  { text-align:center; align-items:center; max-width:100%; }
          .fx-hero__visual { display:none; }
        }
        .fx-hero__title  { font-size:clamp(3rem,6vw,5rem); font-weight:900; line-height:1; margin:0 0 16px; letter-spacing:-.04em; color:#fff; }
        .fx-accent       { color:var(--green); text-shadow:0 0 30px rgba(63,203,27,.6); }
        .fx-hero__sub    { font-size:clamp(1.1rem,2.5vw,1.5rem); font-weight:700; color:#fff; margin-bottom:16px; }
        .fx-hero__desc   { color:var(--text-dim-black); max-width:420px; line-height:1.65; margin-bottom:28px; font-size:.95rem; }
        .fx-hero__stats  { display:flex; gap:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,.1); width:100%; justify-content:flex-end; margin-top:20px; }
        @media(max-width:968px){ .fx-hero__stats { justify-content:center; } }
        .fx-hero__stat   { display:flex; flex-direction:column; align-items:flex-end; }
        @media(max-width:968px){ .fx-hero__stat { align-items:center; } }
        .fx-hero__stat-val { font-size:1.3rem; font-weight:900; color:var(--green); }
        .fx-hero__stat-lbl { font-size:.65rem; color:var(--text-dim-black); font-weight:600; margin-top:3px; letter-spacing:.05em; text-transform:uppercase; }

        /* hero reveal animation */
        .h-item { opacity:0; transform:translateY(44px); transition:opacity .8s var(--ease-spring), transform .8s var(--ease-spring); }
        .ready .h-item { opacity:1; transform:translateY(0); }
        .h-d1 { transition-delay:.1s; }
        .h-d2 { transition-delay:.28s; }

        /* ── Ticker ─────────────────────────────────── */
        .fx-ticker {
          position:absolute; bottom:0; left:0; right:0; height:40px;
          background:rgba(63,203,27,.07); border-top:1px solid rgba(63,203,27,.15);
          display:flex; align-items:center; overflow:hidden; z-index:5; backdrop-filter:blur(8px);
        }
        .fx-ticker__live {
          flex-shrink:0; padding:0 14px 0 22px; font-size:.63rem; font-weight:900;
          color:var(--green); border-right:1px solid rgba(63,203,27,.2);
          height:100%; display:flex; align-items:center; gap:6px;
          background:rgba(63,203,27,.07);
        }
        .fx-ticker__dot { width:5px; height:5px; border-radius:50%; background:var(--green); animation:dotPulse 1.5s ease-in-out infinite; }
        .fx-ticker__track   { flex:1; overflow:hidden; }
        .fx-ticker__inner   { display:flex; white-space:nowrap; will-change:transform; }
        .fx-ticker__item    { display:inline-flex; align-items:center; gap:10px; padding:0 20px; border-right:1px solid rgba(255,255,255,.06); min-width:220px; }
        .fx-ticker__pair    { font-family:'DM Mono',monospace; font-size:.72rem; font-weight:500; color:rgba(255,255,255,.8); }
        .fx-ticker__bid     { font-family:'DM Mono',monospace; font-size:.7rem; color:rgba(255,255,255,.5); transition:color .2s; }
        .fx-ticker__bid.flash-up   { color:#10b981; text-shadow:0 0 4px #10b981; }
        .fx-ticker__bid.flash-dn   { color:#ef4444; text-shadow:0 0 4px #ef4444; }
        .fx-ticker__chg     { display:inline-flex; align-items:center; gap:2px; font-family:'DM Mono',monospace; font-size:.68rem; font-weight:500; }
        .fx-ticker__chg.up  { color:#10b981; }
        .fx-ticker__chg.dn  { color:#ef4444; }

        /* ── LIVE PRICES (white bg) ──────────────────── */
        .fx-prices-wrap { max-width:1000px; margin:0 auto; }
        .fx-prices-tbl  {
          border:1px solid var(--border-white); border-radius:var(--radius-lg);
          overflow:hidden; background:#fff;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        .fx-prices-head {
          display:grid; grid-template-columns:1fr 1fr 1fr 1fr 1.2fr;
          padding:14px 24px;
          background:var(--off-white);
          border-bottom:1px solid var(--border-white);
          font-size:.74rem; font-weight:700; color:var(--text-dim-white);
          letter-spacing:.06em; text-transform:uppercase;
        }
        .fx-prow {
          display:grid; grid-template-columns:1fr 1fr 1fr 1fr 1.2fr;
          padding:15px 24px; border-bottom:1px solid var(--border-white);
          cursor:pointer; transition:all .25s ease; align-items:center;
        }
        .fx-prow:last-child { border-bottom:none; }
        .fx-prow:hover      { background:rgba(63,203,27,.05); transform:translateX(4px); }
        .fx-prow.hovered    { background:rgba(63,203,27,.07); transform:translateX(4px); box-shadow:-3px 0 0 var(--green); }
        .fx-prow.active     { background:rgba(63,203,27,.1); border-left:3px solid var(--green); }
        .fx-pr-pair  { font-weight:800; font-size:.88rem; color:var(--text-on-white); }
        .fx-prow.hovered .fx-pr-pair { color:var(--green); }
        .fx-pr-mono  { font-family:'DM Mono',monospace; font-size:.84rem; color:var(--text-dim-white); transition:all .2s; }
        .fx-pr-mono.flash-up { color:#10b981; animation:priceFlash .5s ease; }
        .fx-pr-mono.flash-dn { color:#ef4444; animation:priceFlash .5s ease; }
        @keyframes priceFlash { 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.05); } }
        .fx-pr-chg   { display:flex; align-items:center; gap:3px; font-family:'DM Mono',monospace; font-size:.8rem; font-weight:500; }
        .fx-pr-chg.up { color:#10b981; }
        .fx-pr-chg.dn { color:#ef4444; }
        .fx-pr-hl    { font-family:'DM Mono',monospace; font-size:.74rem; color:var(--text-dim-white); }
        .fx-prices-cta { display:flex; gap:14px; justify-content:center; margin-top:36px; flex-wrap:wrap; }

        @media(max-width:640px){
          .fx-prices-head { display:none; }
          .fx-prow { grid-template-columns:1fr 1fr 1fr; }
          .fx-prow .fx-pr-hl { display:none; }
        }

        /* ── WHAT IS FOREX (black bg) ───────────────── */
        .fx-what-grid { display:grid; grid-template-columns:1fr .9fr; gap:56px; align-items:center; }
        @media(max-width:900px){ .fx-what-grid { grid-template-columns:1fr; } }
        .fx-what-text p { color:var(--text-dim-black); line-height:1.75; margin-bottom:18px; font-size:.95rem; }
        .fx-checklist   { list-style:none; margin-top:20px; display:flex; flex-direction:column; gap:4px; }
        .fx-checklist li {
          display:flex; align-items:center; gap:12px; color:var(--text-on-black);
          font-size:.9rem; padding:10px 14px; border-radius:10px;
          transition:all .3s; cursor:default;
          border:1px solid transparent;
        }
        .fx-checklist li:hover { background:rgba(63,203,27,.08); border-color:rgba(63,203,27,.15); transform:translateX(6px); }
        .fx-check-icon { color:var(--green); flex-shrink:0; width:18px; height:18px; }

        .fx-stat-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        .fx-stat-card {
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.1);
          border-radius:var(--radius-lg); padding:28px; text-align:center;
          transition:all .4s; position:relative; overflow:hidden; cursor:default;
        }
        .fx-stat-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(63,203,27,.15); border-color:var(--green); }
        .fx-stat-val { font-size:2.2rem; font-weight:900; color:var(--green); display:block; margin-bottom:8px; }
        .fx-stat-lbl { font-size:.75rem; color:var(--text-dim-black); font-weight:600; text-transform:uppercase; letter-spacing:.06em; }

        /* ── FEATURES (white bg) ────────────────────── */
        .fx-feat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(290px,1fr)); gap:22px; }
        .fx-feat-card {
          border:1px solid var(--border-white); border-radius:var(--radius-lg);
          padding:32px 26px; text-align:center; transition:all .35s ease;
          position:relative; overflow:hidden; cursor:default;
          background:#fff; box-shadow:0 1px 8px rgba(0,0,0,.04);
        }
        .fx-feat-card:hover { transform:translateY(-6px); box-shadow:0 20px 40px rgba(63,203,27,.12); border-color:var(--green); }
        .fx-feat-icon {
          width:60px; height:60px; background:var(--green); color:#fff;
          border-radius:14px; display:flex; align-items:center; justify-content:center;
          margin:0 auto 18px; transition:all .3s;
        }
        .fx-feat-card:hover .fx-feat-icon { transform:scale(1.08); box-shadow:0 8px 20px rgba(63,203,27,.3); }
        .fx-feat-title { font-size:1rem; font-weight:800; color:var(--text-on-white); margin-bottom:10px; }
        .fx-feat-desc  { font-size:.84rem; color:var(--text-dim-white); line-height:1.65; }

        /* ── MARKET CARDS (black bg) ────────────────── */
        .fx-mkt-grid { display:flex; justify-content:space-between; gap:16px; flex-wrap:nowrap; }
        @media(max-width:1100px){ .fx-mkt-grid { flex-wrap:wrap; justify-content:center; } }
        .fx-mkt-card {
          flex:1; min-width:170px; max-width:230px; text-align:center;
          padding:26px 14px 0; border-radius:var(--radius); cursor:pointer;
          position:relative; overflow:hidden;
          transition: transform .35s var(--ease-out), border-color .35s, box-shadow .35s, background .35s;
          min-height:270px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.28);
        }
        /* Hover: strong green border + glow + card lifts */
        .fx-mkt-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--green);
          background: rgba(63,203,27,.06);
          box-shadow: 0 0 0 1px var(--green), 0 24px 48px rgba(63,203,27,.25), 0 8px 16px rgba(0,0,0,.4);
        }
        /* Image scales up */
        .fx-mkt-img-wrap {
          height:165px; display:flex; align-items:center; justify-content:center;
          margin-bottom:14px; transition:transform .35s var(--ease-out);
          position:relative; z-index:2;
        }
        .fx-mkt-card:hover .fx-mkt-img-wrap { transform:scale(1.08) translateY(-4px); }
        .fx-mkt-img { width:100%; height:100%; object-fit:contain; }
        .fx-mkt-img[data-category="Indices"] { height:75% !important; width:auto !important; margin:0 auto; }

        /* Title + desc slide up to make room for overlay */
        .fx-mkt-title {
          font-size:.95rem; font-weight:800; color:var(--text-on-black);
          margin-bottom:6px; position:relative; z-index:2;
          transition: transform .35s var(--ease-out), color .2s;
        }
        .fx-mkt-desc {
          font-size:.7rem; color:var(--text-dim-black); line-height:1.55;
          padding-bottom:22px; position:relative; z-index:2;
          transition: transform .35s var(--ease-out);
        }
        .fx-mkt-card:hover .fx-mkt-title { transform:translateY(-32px); color: var(--green); }
        .fx-mkt-card:hover .fx-mkt-desc  { transform:translateY(-32px); }

        /* Overlay slides up from bottom — tall enough to read */
        .fx-mkt-overlay {
          position:absolute; bottom:0; left:0; right:0; height:60px;
          background: linear-gradient(135deg, var(--green), var(--green-dk));
          transform: translateY(100%);
          transition: transform .35s var(--ease-out);
          display:flex; align-items:center; justify-content:center; z-index:3;
        }
        .fx-mkt-card:hover .fx-mkt-overlay { transform:translateY(0); }
        .fx-mkt-overlay span {
          font-size:.75rem; font-weight:800; color:#fff;
          display:flex; align-items:center; gap:6px; letter-spacing:.04em;
        }
        @media(max-width:640px){ .fx-mkt-card { min-width:150px; min-height:240px; } .fx-mkt-img-wrap { height:100px; } }

        /* ── OPEN ACCOUNT (white bg) ────────────────── */
        .fx-open-card {
          border:1px solid var(--border-white); border-radius:28px; padding:56px;
          display:grid; grid-template-columns:1fr .85fr; gap:56px;
          background:linear-gradient(135deg, rgba(63,203,27,.04), rgba(255,255,255,0));
          box-shadow:0 4px 24px rgba(0,0,0,.06);
        }
        @media(max-width:900px){ .fx-open-card { grid-template-columns:1fr; padding:32px 24px; } }
        .fx-steps { display:flex; flex-direction:column; gap:20px; margin:28px 0 36px; }
        .fx-step  { display:flex; gap:18px; align-items:flex-start; transition:transform .3s; }
        .fx-step:hover { transform:translateX(6px); }
        .fx-step-num {
          width:40px; height:40px; border-radius:50%; background:var(--green); color:#fff;
          font-weight:900; display:flex; align-items:center; justify-content:center;
          flex-shrink:0; box-shadow:0 0 20px rgba(63,203,27,.3); transition:all .3s;
        }
        .fx-step:hover .fx-step-num { box-shadow:0 0 30px rgba(63,203,27,.5); }
        .fx-step-title { font-size:.95rem; font-weight:700; color:var(--text-on-white); margin-bottom:4px; }
        .fx-step-desc  { font-size:.84rem; color:var(--text-dim-white); }

        .fx-open-right { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; align-content:center; }
        @media(max-width:640px){ .fx-open-right { grid-template-columns:1fr; } }
        .fx-benefit {
          display:flex; align-items:center; gap:10px; font-size:.86rem;
          color:var(--text-on-white); padding:10px 14px; border-radius:10px;
          background:rgba(63,203,27,.04); border:1px solid rgba(63,203,27,.12);
          transition:all .25s; cursor:default; font-weight:600;
        }
        .fx-benefit:hover { background:rgba(63,203,27,.1); border-color:var(--green); transform:translateY(-3px) scale(1.02); }
        .fx-benefit-icon { color:var(--green); flex-shrink:0; width:18px; height:18px; }

        /* ── FAQ (black bg) ─────────────────────────── */
        .fx-faq        { max-width:760px; margin:0 auto; }
        #faq .fx-head  { margin-bottom: 48px; }
        .fx-faq__item  { border-bottom:1px solid rgba(255,255,255,.1); transition:all .3s; }
        .fx-faq__item.open { border-color:rgba(63,203,27,.3); }
        .fx-faq__q {
          width:100%; display:flex; justify-content:space-between; align-items:center;
          padding:22px 0; font-size:.92rem; font-weight:600;
          color:var(--text-on-black); background:none; border:none; cursor:pointer;
          text-align:left; gap:16px; transition:all .2s;
        }
        .fx-faq__q:hover { color:var(--green); padding-left:4px; }
        .fx-faq__item.open .fx-faq__q { color:var(--green); }
        .fx-faq__icon {
          display:flex; align-items:center; justify-content:center;
          width:28px; height:28px; border-radius:50%;
          background:rgba(63,203,27,.08); border:1px solid rgba(63,203,27,.2);
          flex-shrink:0; transition:all .3s; color:var(--green);
        }
        .fx-faq__q:hover .fx-faq__icon { background:rgba(63,203,27,.15); transform:scale(1.05); }
        .fx-faq__item.open .fx-faq__icon { transform:rotate(180deg); background:rgba(63,203,27,.15); }
        .fx-faq__a { max-height:0; overflow:hidden; transition:max-height .4s, padding .4s; }
        .fx-faq__item.open .fx-faq__a { max-height:200px; padding-bottom:20px; }
        .fx-faq__a p { font-size:.87rem; color:var(--text-dim-black); line-height:1.75; }
      `}</style>
    </>
  );
}