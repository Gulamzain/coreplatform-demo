// src/app/markets/forex/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BiDollar, BiShield, BiGlobe, BiCheckCircle,
  BiPlus, BiMinus, BiChart, BiMap, BiLock
} from 'react-icons/bi';
import { FiArrowUpRight, FiArrowDownRight, FiArrowRight } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TRADING_CATEGORIES = [
  { image: "/images/Forex.png",     title: "Forex",       desc: "60+ currency pairs with tight spreads from 0.0 pips", link: "/markets/forex" },
  { image: "/images/Commodity.png", title: "Commodities", desc: "Gold, Silver, Oil, and agricultural products",         link: "/markets/commodities" },
  { image: "/images/Stocks.png",    title: "Stocks",      desc: "1,700+ global stocks with competitive pricing",        link: "/markets/stocks" },
  { image: "/images/Crypto.png",    title: "Crypto",      desc: "Bitcoin, Ethereum and major altcoins CFDs",            link: "/markets/crypto" },
  { image: "/images/Indices.png",   title: "Indices",     desc: "S&P 500, FTSE 100, DAX 40 and more",                  link: "/markets/indices" },
];

const livePrices = [
  { pair: 'EUR/USD', bid: 1.08432, ask: 1.08435, change:  0.04, high: 1.08550, low: 1.08320 },
  { pair: 'GBP/USD', bid: 1.27680, ask: 1.27685, change:  0.19, high: 1.27800, low: 1.27550 },
  { pair: 'USD/JPY', bid: 151.22,  ask: 151.25,  change: -0.12, high: 151.50,  low: 151.00  },
  { pair: 'AUD/USD', bid: 0.65420, ask: 0.65425, change:  0.08, high: 0.65500, low: 0.65350 },
  { pair: 'USD/CAD', bid: 1.35840, ask: 1.35845, change: -0.05, high: 1.35900, low: 1.35780 },
  { pair: 'NZD/USD', bid: 0.61230, ask: 0.61235, change:  0.11, high: 0.61300, low: 0.61150 },
];

const features = [
  { icon: BiMap,    title: 'Ultra-Fast Execution', desc: 'Sub-40ms execution with no dealing desk intervention', color: '#3fcb1b' },
  { icon: BiDollar, title: 'Tight Spreads',        desc: 'From 0.0 pips on major currency pairs',               color: '#3b82f6' },
  { icon: BiShield, title: 'FCA Regulated',        desc: 'Fully regulated and compliant with global standards',  color: '#8b5cf6' },
  { icon: BiGlobe,  title: 'Global Markets',       desc: 'Trade 70+ currency pairs 24/5',                       color: '#f59e0b' },
  { icon: BiChart,  title: 'Advanced Tools',       desc: 'Powerful charts and analysis tools',                   color: '#ec489a' },
  { icon: BiLock,   title: 'Secure Trading',       desc: 'Segregated accounts and SSL encryption',               color: '#10b981' },
];

const faqItems = [
  { q: 'What is Forex trading?',       a: 'Forex trading is the buying and selling of currencies on the foreign exchange market. It\'s the world\'s largest financial market, with over $6 trillion traded daily.' },
  { q: 'What are the trading hours?',  a: 'Forex markets are open 24 hours a day, 5 days a week (Monday to Friday), allowing you to trade at any time that suits your schedule.' },
  { q: 'What is the minimum deposit?', a: 'The minimum deposit is $200 for all account types. Fund via bank transfer, credit card, or e-wallet.' },
  { q: 'What leverage do you offer?',  a: 'We offer leverage up to 1:500 on Forex pairs, allowing you to control larger positions with a smaller capital investment.' },
  { q: 'Is there a demo account?',     a: 'Yes, you can open a free demo account with $10,000 virtual funds to practice trading without risk.' },
];

const chartData = {
  labels: ['00:00','04:00','08:00','12:00','16:00','20:00'],
  datasets: [{
    label: 'EUR/USD',
    data: [1.0842, 1.0845, 1.0848, 1.0843, 1.0849, 1.08432],
    borderColor: '#3fcb1b',
    backgroundColor: 'rgba(63,203,27,0.08)',
    fill: true, tension: 0.4,
    pointBackgroundColor: '#3fcb1b',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 3, pointHoverRadius: 5,
  }],
};

export default function ForexPage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [openFaq, setOpenFaq]             = useState<number | null>(null);
  const [selectedPair, setSelectedPair]   = useState(livePrices[0]);
  const [visible, setVisible]             = useState<Set<string>>(new Set());
  const [heroReady, setHeroReady]         = useState(false);
  const refs = useRef<{ [k: string]: HTMLElement | null }>({});

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  const chartOptions: any = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: 'rgba(0,0,0,0.9)', titleColor: '#fff', bodyColor: '#ccc', borderColor: '#3fcb1b', borderWidth: 1 },
    },
    scales: {
      y: { grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { color: '#888', font: { size: 11 } } },
      x: { grid: { display: false },                 ticks: { color: '#888', font: { size: 11 } } },
    },
  };

  return (
    <div className="fp">

      {/* ── HERO SECTION ── */}
      <section className="fp-hero-ref">
        <div className="fp-hero__bg">
          <div className="fp-hero__orb fp-hero__orb--1" />
          <div className="fp-hero__orb fp-hero__orb--2" />
          <div className="fp-hero__grid" />
        </div>

        <div className={`fp-hero-ref__inner ${heroReady ? 'ready' : ''}`}>
          {/* Left side - Large Visual */}
          <div className="hero-visual h-item h-d1">
            <Image 
              src="/images/Forex.png" 
              alt="Forex Symbols" 
              width={550} 
              height={550} 
              className="hero-3d-asset" 
              priority 
            />
          </div>

          {/* Right side - Content */}
          <div className="hero-content h-item h-d2">
            <h1 className="hero-brand">
              FORE<span className="green-x">X</span>
            </h1>
            <h2 className="hero-tagline">The world's most traded market.</h2>
            <p className="hero-description">
              Trade 70+ currency pairs with tight spreads, deep liquidity, and execution that never misses a move.
            </p>
            <div className="hero-actions">
              <Link href="/auth-signup" className="btn-green-ref">
                Start Trading <FiArrowRight />
              </Link>
              <Link href="/demo" className="btn-outline-ref">
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE PRICES ── */}
      <section id="prices" ref={setRef('prices')} className={`fp-section fp-section--alt fp-reveal ${visible.has('prices')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-head">
            <span className="fp-eyebrow">LIVE MARKET DATA</span>
            <h2 className="fp-h2">Real-Time Forex Prices</h2>
            <p className="fp-sub">Stay updated with live streaming prices from global markets</p>
          </div>
          <div className="fp-prices-grid">
            <div className="fp-prices-tbl">
              <div className="fp-prices-thead">
                <span>Pair</span><span>Bid</span><span>Ask</span><span>Change</span><span>H/L</span>
              </div>
              {livePrices.map((p,i)=>(
                <div key={i} className={`fp-prow ${selectedPair.pair===p.pair?'active':''}`} onClick={()=>setSelectedPair(p)}>
                  <span className="fp-pr-pair">{p.pair}</span>
                  <span className="fp-pr-mono">{p.bid}</span>
                  <span className="fp-pr-mono">{p.ask}</span>
                  <span className={`fp-pr-chg ${p.change>=0?'up':'dn'}`}>
                    {p.change>=0?<FiArrowUpRight />:<FiArrowDownRight />}{p.change>=0?'+':''}{p.change}%
                  </span>
                  <span className="fp-pr-hl">{p.high}/{p.low}</span>
                </div>
              ))}
            </div>
            <div className="fp-chart-card">
              <div className="fp-chart-hd">
                <h3>{selectedPair.pair} — Live Chart</h3>
                <div className="fp-tfs">
                  {['1H','4H','1D','1W'].map((t,i)=>(
                    <button key={t} className={`fp-tf ${i===0?'active':''}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="fp-chart-wrap"><Line data={chartData} options={chartOptions} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS FOREX ── */}
      <section id="what" ref={setRef('what')} className={`fp-section fp-reveal ${visible.has('what')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-head">
            <span className="fp-eyebrow">Learn the Basics</span>
            <h2 className="fp-h2">What is Forex Trading?</h2>
          </div>
          <div className="fp-what-grid">
            <div className="fp-what-text">
              <p>Forex (foreign exchange) trading is the buying and selling of currencies on the global market. It&apos;s the world&apos;s largest financial market, with over $6 trillion traded daily.</p>
              <p>Unlike stock markets, Forex operates 24 hours a day, five days a week, allowing traders to respond to market movements as they happen.</p>
              <ul className="fp-checklist">
                {['Trade major, minor, and exotic currency pairs','Leverage up to 1:500 to maximize opportunities','Access deep liquidity from top-tier banks','Trade from anywhere with mobile and web platforms'].map((t,i)=>(
                  <li key={i}><BiCheckCircle />{t}</li>
                ))}
              </ul>
            </div>
            <div className="fp-what-stats">
              {[{v:'$6T+',l:'Daily Volume'},{v:'70+',l:'Currency Pairs'},{v:'24/5',l:'Trading Hours'}].map((s,i)=>(
                <div key={i} className="fp-stat-card">
                  <span className="fp-sc-val">{s.v}</span>
                  <span className="fp-sc-lbl">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY FOXNANCE ── */}
      <section id="why" ref={setRef('why')} className={`fp-section fp-section--alt fp-reveal ${visible.has('why')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-head">
            <span className="fp-eyebrow">Why Choose Us</span>
            <h2 className="fp-h2">Why Trade with Foxnance?</h2>
            <p className="fp-sub">Experience trading with a broker that puts you first</p>
          </div>
          <div className="fp-features-grid">
            {features.map((f,i)=>(
              <div key={i} className="fp-feat-card" style={{'--acc':f.color} as React.CSSProperties}>
                <div className="fp-feat-icon"><f.icon size={24} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETS ── */}
      <section id="markets" ref={setRef('markets')} className={`fp-section fp-reveal ${visible.has('markets')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-head">
            <span className="fp-eyebrow">Explore Our Products</span>
            <h2 className="fp-h2">Access Global Markets</h2>
            <p className="fp-sub">One account. 2,250+ instruments. Real-time execution.</p>
          </div>
          <div className="fp-mkt-grid">
            {TRADING_CATEGORIES.map((cat,i)=>(
              <div
                key={i}
                className={`fp-mkt-card ${hoveredCategory===i?'hovered':''}`}
                onMouseEnter={()=>setHoveredCategory(i)}
                onMouseLeave={()=>setHoveredCategory(null)}
                onClick={()=>window.location.href=cat.link}
              >
                <div className="fp-mkt-img">
                  <Image src={cat.image} alt={cat.title} width={110} height={110} style={{objectFit:'contain'}} />
                </div>
                <h3 className="fp-mkt-title">{cat.title}</h3>
                <p  className="fp-mkt-desc">{cat.desc}</p>
                <div className="fp-mkt-overlay"><span>TRADE {cat.title.toUpperCase()}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ACCOUNT ── */}
      <section id="open" ref={setRef('open')} className={`fp-section fp-section--dark fp-reveal ${visible.has('open')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-open-card">
            <div className="fp-open-left">
              <span className="fp-eyebrow fp-eyebrow--lt">Get Started</span>
              <h2 className="fp-h2 fp-h2--w">Open a Foxnance Account Now</h2>
              <div className="fp-steps">
                {[{n:'1',t:'Register',d:'Quick and easy account opening process.'},{n:'2',t:'Fund',d:'Fund your account with multiple deposit methods.'},{n:'3',t:'Trade',d:'Trade with spreads from 0.0 pips.'}].map((s,i)=>(
                  <div key={i} className="fp-step">
                    <div className="fp-step-num">{s.n}</div>
                    <div><h4>{s.t}</h4><p>{s.d}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/auth-signup" className="fp-btn fp-btn--green fp-btn--lg">Open Account <FiArrowRight /></Link>
            </div>
            <div className="fp-open-right">
              {['No Hidden Fees','Instant Deposits','Fast Withdrawals','24/7 Support','FCA Regulated','Segregated Funds'].map((b,i)=>(
                <div key={i} className="fp-benefit"><BiCheckCircle size={18}/>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" ref={setRef('faq')} className={`fp-section fp-reveal ${visible.has('faq')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-head">
            <span className="fp-eyebrow">FAQ</span>
            <h2 className="fp-h2">Frequently Asked Questions</h2>
            <p className="fp-sub">Everything you need to know about Forex trading</p>
          </div>
          <div className="fp-faq">
            {faqItems.map((item,i)=>(
              <div key={i} className={`fp-faq__item ${openFaq===i?'open':''}`}>
                <button className="fp-faq__q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span>{item.q}</span>
                  {openFaq===i?<BiMinus size={18}/>:<BiPlus size={18}/>}
                </button>
                <div className="fp-faq__a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ STYLES ══════════════════════ */}
      <style jsx global>{`
        /* Light & Dark CSS Variables */
        :root {
          --green:      #3fcb1b;
          --green-dk:   #2e9c14;
          --bg:         #ffffff;
          --bg-alt:     #f7f8f5;
          --bg-card:    #ffffff;
          --bg-dark:    #0A0A0A;
          --border:     #e5e7eb;
          --text:       #0A0A0A;
          --text2:      #6b7280;
          --radius:     16px;
          --nav-h:      80px;
        }
        @media(prefers-color-scheme:dark){
          :root{
            --bg:      #0A0A0A;
            --bg-alt:  #111111;
            --bg-card: #181818;
            --border:  rgba(255,255,255,0.09);
            --text:    #f0f0f0;
            --text2:   rgba(255,255,255,0.5);
          }
        }

        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Aktiv Grotesk','Inter',-apple-system,sans-serif;background:var(--bg);color:var(--text);}

        .fp{width:100%;overflow-x:hidden;}

        /* Container */
        .fp-container{max-width:1280px;margin:0 auto;padding:0 24px;}
        @media(min-width:1024px){.fp-container{padding:0 64px;}}

        /* Sections */
        .fp-section{padding:96px 0;background:var(--bg);}
        .fp-section--alt{background:var(--bg-alt);}
        .fp-section--dark{background:var(--bg-dark);}

        /* Scroll reveal */
        .fp-reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
        .fp-reveal.on{opacity:1;transform:translateY(0);}

        /* Section head */
        .fp-head{text-align:center;margin-bottom:56px;}
        .fp-eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--green);display:block;margin-bottom:12px;}
        .fp-eyebrow--lt{color:rgba(255,255,255,.6);}
        .fp-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;color:var(--text);letter-spacing:-.02em;line-height:1.12;}
        .fp-h2--w{color:#fff!important;}
        .fp-sub{font-size:1rem;color:var(--text2);max-width:540px;margin:12px auto 0;line-height:1.65;}

        /* Buttons */
        .fp-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;font-size:.9rem;font-weight:700;border-radius:8px;text-decoration:none;transition:all .22s;cursor:pointer;border:none;white-space:nowrap;}
        .fp-btn--green{background:linear-gradient(135deg,var(--green),var(--green-dk));color:#000;box-shadow:0 4px 18px rgba(63,203,27,.28);}
        .fp-btn--green:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(63,203,27,.4);}
        .fp-btn--lg{padding:16px 36px;font-size:1rem;}

        /* Hero Section */
        .fp-hero-ref {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          background: #0A0A0A;
          padding: 100px 0 80px;
          overflow: hidden;
        }

        .fp-hero__bg{position:absolute;inset:0;pointer-events:none;z-index:0;}
        .fp-hero__orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .fp-hero__orb--1{
          width:560px;height:560px;
          background:radial-gradient(circle,rgba(63,203,27,.22),transparent 70%);
          top:-120px;right:-80px;
          animation:orbF 9s ease-in-out infinite;
        }
        .fp-hero__orb--2{
          width:380px;height:380px;
          background:radial-gradient(circle,rgba(59,130,246,.15),transparent 70%);
          bottom:-80px;left:-60px;
          animation:orbF 11s ease-in-out infinite reverse;
        }
        @keyframes orbF{0%,100%{transform:translate(0,0);}50%{transform:translate(18px,-18px);}}
        .fp-hero__grid{
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(63,203,27,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(63,203,27,.04) 1px,transparent 1px);
          background-size:52px 52px;
        }

        .fp-hero-ref__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 968px) {
          .fp-hero-ref__inner {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 0 24px;
            gap: 40px;
          }
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-3d-asset {
          max-width: 100%;
          height: auto;
          object-fit: contain;
          animation: floatAsset 4s ease-in-out infinite;
        }

        @keyframes floatAsset {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .hero-content {
          text-align: left;
        }

        @media (max-width: 968px) {
          .hero-content {
            text-align: center;
          }
        }

        .hero-brand {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 1;
          margin: 0 0 16px 0;
          color: white;
        }

        .green-x {
          color: #3fcb1b;
        }

        .hero-tagline {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          color: white;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        .hero-description {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 500px;
        }

        @media (max-width: 968px) {
          .hero-description {
            max-width: 100%;
          }
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 968px) {
          .hero-actions {
            justify-content: center;
          }
        }

        .btn-green-ref {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 40px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-green-ref:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(63,203,27,0.3);
        }

        .btn-outline-ref {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: transparent;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 40px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }

        .btn-outline-ref:hover {
          border-color: #3fcb1b;
          color: #3fcb1b;
          transform: translateY(-2px);
        }

        .h-item {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fp-hero-ref__inner.ready .h-item {
          opacity: 1;
          transform: translateY(0);
        }

        .h-d1 { transition-delay: 0.1s; }
        .h-d2 { transition-delay: 0.25s; }

        /* Live Prices */
        .fp-prices-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:24px;}
        @media(max-width:900px){.fp-prices-grid{grid-template-columns:1fr;}}
        .fp-prices-tbl{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;overflow:hidden;}
        .fp-prices-thead{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1.2fr;padding:14px 20px;background:rgba(63,203,27,.05);border-bottom:1px solid var(--border);font-size:.78rem;font-weight:700;color:var(--text2);}
        .fp-prow{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1.2fr;padding:14px 20px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .2s;}
        .fp-prow:hover{background:rgba(63,203,27,.04);}
        .fp-prow.active{background:rgba(63,203,27,.08);border-left:3px solid var(--green);}
        .fp-pr-pair{font-weight:700;font-size:.88rem;color:var(--text);}
        .fp-pr-mono{font-family:monospace;font-size:.85rem;color:var(--text2);}
        .fp-pr-chg{display:flex;align-items:center;gap:3px;font-size:.82rem;font-weight:600;}
        .fp-pr-chg.up{color:#10b981;}.fp-pr-chg.dn{color:#ef4444;}
        .fp-pr-hl{font-size:.78rem;color:var(--text2);}

        .fp-chart-card{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:20px;}
        .fp-chart-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;}
        .fp-chart-hd h3{font-size:.95rem;font-weight:700;color:var(--text);}
        .fp-tfs{display:flex;gap:6px;}
        .fp-tf{padding:4px 10px;background:var(--bg-alt);border:1px solid var(--border);border-radius:6px;font-size:.72rem;color:var(--text2);cursor:pointer;}
        .fp-tf.active{background:rgba(63,203,27,.1);border-color:var(--green);color:var(--green);}
        .fp-chart-wrap{height:280px;}

        /* What is Forex */
        .fp-what-grid{display:grid;grid-template-columns:1fr .85fr;gap:56px;align-items:center;}
        @media(max-width:900px){.fp-what-grid{grid-template-columns:1fr;}}
        .fp-what-text p{color:var(--text2);line-height:1.7;margin-bottom:16px;font-size:.95rem;}
        .fp-checklist{list-style:none;margin-top:20px;}
        .fp-checklist li{display:flex;align-items:center;gap:10px;color:var(--text);margin-bottom:12px;font-size:.92rem;}
        .fp-checklist li svg{color:var(--green);}
        .fp-what-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
        .fp-stat-card{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:24px;text-align:center;transition:transform .3s;}
        .fp-stat-card:hover{transform:translateY(-4px);}
        .fp-sc-val{font-size:2rem;font-weight:900;color:var(--green);display:block;margin-bottom:6px;}
        .fp-sc-lbl{font-size:.82rem;color:var(--text2);}

        /* Features */
        .fp-features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;}
        .fp-feat-card{background:var(--bg-card);border:1px solid var(--border);border-top:3px solid var(--acc,var(--green));border-radius:20px;padding:28px;text-align:center;transition:all .3s;}
        .fp-feat-card:hover{transform:translateY(-6px);}
        .fp-feat-icon{width:58px;height:58px;background:color-mix(in srgb,var(--acc,var(--green)) 12%,transparent);color:var(--acc,var(--green));border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
        .fp-feat-card h3{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:8px;}
        .fp-feat-card p{font-size:.85rem;color:var(--text2);}

        /* Markets Grid */
        .fp-mkt-grid{display:flex;justify-content:space-between;gap:16px;flex-wrap:nowrap;}
        @media(max-width:1100px){.fp-mkt-grid{flex-wrap:wrap;justify-content:center;}}
        .fp-mkt-card{flex:1;min-width:160px;max-width:210px;text-align:center;padding:20px 12px 0;border-radius:var(--radius);background:var(--bg-card);border:1px solid var(--border);cursor:pointer;position:relative;overflow:hidden;transition:all .4s cubic-bezier(.2,.9,.4,1.1);}
        .fp-mkt-card.hovered{transform:translateY(-10px);}
        .fp-mkt-img{height:110px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
        .fp-mkt-title{font-size:.95rem;font-weight:800;color:var(--text);margin-bottom:6px;position:relative;z-index:2;transition:transform .4s;}
        .fp-mkt-desc{font-size:.68rem;color:var(--text2);line-height:1.35;padding-bottom:20px;position:relative;z-index:2;transition:transform .4s;}
        .fp-mkt-card.hovered .fp-mkt-title,.fp-mkt-card.hovered .fp-mkt-desc{transform:translateY(-20px);}
        .fp-mkt-overlay{position:absolute;bottom:0;left:0;right:0;height:48px;background:linear-gradient(135deg,var(--green),var(--green-dk));transform:translateY(100%);transition:transform .4s;display:flex;align-items:center;justify-content:center;z-index:1;}
        .fp-mkt-card.hovered .fp-mkt-overlay{transform:translateY(0);}
        .fp-mkt-overlay span{font-size:.75rem;font-weight:800;color:#fff;letter-spacing:.8px;}

        /* Open Account */
        .fp-open-card{background:linear-gradient(135deg,rgba(63,203,27,.08),rgba(0,0,0,.25));border:1px solid rgba(63,203,27,.15);border-radius:28px;padding:56px;display:grid;grid-template-columns:1fr .8fr;gap:56px;}
        @media(max-width:900px){.fp-open-card{grid-template-columns:1fr;padding:32px 24px;}}
        .fp-steps{display:flex;flex-direction:column;gap:20px;margin-bottom:32px;}
        .fp-step{display:flex;gap:16px;align-items:flex-start;}
        .fp-step-num{width:38px;height:38px;border-radius:50%;background:var(--green);color:#000;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .fp-step h4{font-size:1rem;font-weight:700;color:#fff;margin-bottom:4px;}
        .fp-step p{font-size:.85rem;color:rgba(255,255,255,.5);}
        .fp-open-right{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;align-content:center;}
        .fp-benefit{display:flex;align-items:center;gap:8px;font-size:.88rem;color:rgba(255,255,255,.8);}
        .fp-benefit svg{color:var(--green);}

        /* FAQ */
        .fp-faq{max-width:760px;margin:0 auto;}
        .fp-faq__item{border-bottom:1px solid var(--border);}
        .fp-faq__q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 0;font-size:.95rem;font-weight:600;color:var(--text);background:none;border:none;cursor:pointer;text-align:left;gap:16px;transition:color .2s;}
        .fp-faq__q:hover{color:var(--green);}
        .fp-faq__a{max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s ease;}
        .fp-faq__item.open .fp-faq__a{max-height:200px;padding-bottom:16px;}
        .fp-faq__a p{font-size:.88rem;color:var(--text2);line-height:1.65;}

        /* Responsive */
        @media(max-width:640px){
          .fp-section{padding:64px 0;}
          .fp-prices-thead{display:none;}
          .fp-prow{grid-template-columns:1fr 1fr 1fr;}
          .fp-prow .fp-pr-hl{display:none;}
          .fp-what-stats{grid-template-columns:1fr;}
          .fp-open-right{grid-template-columns:1fr;}
          .fp-mkt-card{min-width:140px;}
          .hero-brand{font-size:2.5rem;}
          .hero-tagline{font-size:1.3rem;}
        }
      `}</style>
    </div>
  );
}