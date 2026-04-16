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
  { image: "/images/MainForex.png",     title: "Forex",       desc: "60+ currency pairs with tight spreads from 0.0 pips", link: "/markets/forex" },
  { image: "/images/Commodity.png", title: "Commodities", desc: "Gold, Silver, Oil, and agricultural products",         link: "/markets/commodities" },
  { image: "/images/Stocks.png",    title: "Stocks",      desc: "1,700+ global stocks with competitive pricing",        link: "/markets/stocks" },
  { image: "/images/Crypto.png",    title: "Crypto",      desc: "Bitcoin, Ethereum and major altcoins CFDs",            link: "/markets/crypto" },
  { image: "/images/Indices.png",   title: "Indices",     desc: "S&P 500, FTSE 100, DAX 40 and more",                  link: "/markets/indices" },
];

// Initial live prices with history for chart
const initialLivePrices = [
  { pair: 'EUR/USD', bid: 1.08432, ask: 1.08435, change: 0.04, high: 1.08550, low: 1.08320, direction: 'up' as const, history: Array(24).fill(0).map(() => 1.0842 + (Math.random() - 0.5) * 0.003) },
  { pair: 'GBP/USD', bid: 1.27680, ask: 1.27685, change: 0.19, high: 1.27800, low: 1.27550, direction: 'up' as const, history: Array(24).fill(0).map(() => 1.2767 + (Math.random() - 0.5) * 0.003) },
  { pair: 'USD/JPY', bid: 151.22,  ask: 151.25,  change: -0.12, high: 151.50,  low: 151.00,  direction: 'down' as const, history: Array(24).fill(0).map(() => 151.20 + (Math.random() - 0.5) * 0.3) },
  { pair: 'AUD/USD', bid: 0.65420, ask: 0.65425, change: 0.08, high: 0.65500, low: 0.65350, direction: 'up' as const, history: Array(24).fill(0).map(() => 0.6541 + (Math.random() - 0.5) * 0.002) },
  { pair: 'USD/CAD', bid: 1.35840, ask: 1.35845, change: -0.05, high: 1.35900, low: 1.35780, direction: 'down' as const, history: Array(24).fill(0).map(() => 1.3583 + (Math.random() - 0.5) * 0.002) },
  { pair: 'NZD/USD', bid: 0.61230, ask: 0.61235, change: 0.11, high: 0.61300, low: 0.61150, direction: 'up' as const, history: Array(24).fill(0).map(() => 0.6122 + (Math.random() - 0.5) * 0.002) },
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

// Generate chart labels for last 24 hours
const generateChartLabels = () => {
  const labels = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  return labels;
};

export default function ForexPage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPair, setSelectedPair] = useState(initialLivePrices[0]);
  const [livePrices, setLivePrices] = useState(initialLivePrices);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [heroReady, setHeroReady] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState(0);
  const [tickerOffset, setTickerOffset] = useState(0);
  const [priceAnimations, setPriceAnimations] = useState<Record<string, 'up' | 'down' | null>>({});
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredChart, setHoveredChart] = useState(false);
  const [chartData, setChartData] = useState({
    labels: generateChartLabels(),
    datasets: [{
      label: 'EUR/USD',
      data: initialLivePrices[0].history,
      borderColor: '#3fcb1b',
      backgroundColor: 'rgba(63,203,27,0.08)',
      fill: true, tension: 0.4,
      pointBackgroundColor: '#3fcb1b',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 3, pointHoverRadius: 6,
    }],
  });
  
  const refs = useRef<{ [k: string]: HTMLElement | null }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time price simulation with 2-second delay
  useEffect(() => {
    const scheduleUpdate = () => {
      updateTimeoutRef.current = setTimeout(() => {
        setLivePrices(prevPrices => 
          prevPrices.map(price => {
            // Random price movement between -0.0005 and +0.0005 for forex pairs
            const movement = (Math.random() - 0.5) * 0.0008;
            const newBid = +(price.bid + movement).toFixed(5);
            const newAsk = +(price.ask + movement).toFixed(5);
            const newChange = +(((newBid - (price.bid - movement * 0.5)) / (price.bid - movement * 0.5)) * 100).toFixed(2);
            const direction = movement >= 0 ? 'up' : 'down';
            
            // Set animation flash for this specific pair
            setPriceAnimations(prev => ({ ...prev, [price.pair]: direction }));
            setTimeout(() => {
              setPriceAnimations(prev => ({ ...prev, [price.pair]: null }));
            }, 500);
            
            // Update history for chart
            const newHistory = [...price.history.slice(1), newBid];
            
            // Update chart for selected pair
            if (price.pair === selectedPair.pair) {
              setChartData(prev => ({
                ...prev,
                datasets: [{
                  ...prev.datasets[0],
                  label: price.pair,
                  data: newHistory,
                }],
              }));
            }
            
            return {
              ...price,
              bid: newBid,
              ask: newAsk,
              change: newChange,
              direction: direction,
              high: Math.max(price.high, newBid),
              low: Math.min(price.low, newBid),
              history: newHistory,
            };
          })
        );
        
        // Schedule next update after 2 seconds
        scheduleUpdate();
      }, 2000);
    };
    
    scheduleUpdate();
    
    return () => {
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedPair.pair]);

  // Update selected pair when live prices change
  useEffect(() => {
    const updatedSelected = livePrices.find(p => p.pair === selectedPair.pair);
    if (updatedSelected) {
      setSelectedPair(updatedSelected);
    }
  }, [livePrices, selectedPair.pair]);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));

    // Ticker animation - continuous scrolling
    let frame: number;
    let offset = 0;
    const animate = () => {
      offset -= 0.5;
      if (offset <= -(initialLivePrices.length * 230)) {
        offset = 0;
      }
      setTickerOffset(offset);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => { clearTimeout(t); io.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  const chartOptions: any = {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 800, easing: 'easeOutQuad' as const },
    plugins: {
      legend: { display: false },
      tooltip: { 
        backgroundColor: 'rgba(0,0,0,0.9)', 
        titleColor: '#fff', 
        bodyColor: '#ccc', 
        borderColor: '#3fcb1b', 
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            return `${selectedPair.pair}: ${context.parsed.y.toFixed(5)}`;
          }
        }
      },
    },
    scales: {
      y: { 
        grid: { color: 'rgba(128,128,128,0.1)' }, 
        ticks: { color: '#888', font: { size: 11 },
          callback: (value: any) => value.toFixed(5)
        } 
      },
      x: { grid: { display: false }, ticks: { color: '#888', font: { size: 11 }, maxRotation: 45, minRotation: 45 } },
    },
    elements: {
      point: {
        hoverRadius: 8,
        hoverBorderWidth: 3,
      }
    },
    onHover: (event: any, chartElement: any) => {
      setHoveredChart(chartElement && chartElement.length > 0);
    }
  };

  // Handle timeframe change
  const handleTimeframeChange = (tf: string, index: number) => {
    setActiveTimeframe(index);
    let newLabels: string[] = [];
    let newData: number[] = [];
    const now = new Date();
    const basePrice = selectedPair.bid;
    
    if (tf === '1H') {
      newLabels = generateChartLabels();
      newData = Array(24).fill(0).map((_, i) => basePrice + (Math.sin(i * 0.5) * 0.002) + (Math.random() - 0.5) * 0.001);
    } else if (tf === '4H') {
      for (let i = 30; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 4 * 3600000);
        newLabels.push(time.toLocaleDateString() + ' ' + time.toLocaleTimeString([], { hour: '2-digit' }));
      }
      newData = Array(31).fill(0).map((_, i) => basePrice + (Math.sin(i * 0.2) * 0.008) + (Math.random() - 0.5) * 0.003);
    } else if (tf === '1D') {
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 3600000);
        newLabels.push(date.toLocaleDateString([], { month: 'short', day: 'numeric' }));
      }
      newData = Array(31).fill(0).map((_, i) => basePrice + (Math.sin(i * 0.1) * 0.015) + (Math.random() - 0.5) * 0.005);
    } else {
      for (let i = 52; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 7 * 24 * 3600000);
        newLabels.push('W' + (52 - i));
      }
      newData = Array(53).fill(0).map((_, i) => basePrice + (Math.sin(i * 0.05) * 0.03) + (Math.random() - 0.5) * 0.01);
    }
    
    setChartData({
      labels: newLabels,
      datasets: [{
        ...chartData.datasets[0],
        data: newData,
      }],
    });
  };

  return (
    <div className="fp">

      {/* ── HERO SECTION ── */}
      <section className="fp-hero-ref">
        <div className="fp-hero__bg">
          <div className="fp-hero__orb fp-hero__orb--1" />
          <div className="fp-hero__orb fp-hero__orb--2" />
          <div className="fp-hero__orb fp-hero__orb--3" />
          <div className="fp-hero__grid" />
          <div className="fp-hero__scanline" />
        </div>

        <div className="fp-particles" aria-hidden="true">
          {Array.from({length: 18}).map((_,i) => (
            <div key={i} className={`fp-particle fp-particle--${i % 6}`} style={{ '--pi': i } as React.CSSProperties} />
          ))}
        </div>

        <div className={`fp-hero-ref__inner ${heroReady ? 'ready' : ''}`}>
          <div className="hero-visual h-item h-d1">
            <div className="hero-glow-ring" />
            <Image 
              src="/images/MainForex.png" 
              alt="Forex Symbols" 
              width={1000} 
              height={1000} 
              className="hero-3d-asset" 
              priority 
            />
          </div>

          <div className="hero-content h-item h-d2">
            <div className="hero-badge">
              <span className="hero-badge__dot" />
              <span>Markets Open · Live Prices</span>
            </div>
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
            </div>
            <div className="hero-stats-row">
              {[{v:'$6T+',l:'Daily Volume'},{v:'70+',l:'Pairs'},{v:'0.0',l:'Min Spread'}].map((s,i) => (
                <div key={i} className="hero-stat">
                  <span className="hero-stat__val">{s.v}</span>
                  <span className="hero-stat__lbl">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live ticker bar */}
        <div className="fp-ticker">
          <div className="fp-ticker__label">LIVE</div>
          <div className="fp-ticker__track">
            <div className="fp-ticker__inner" style={{ transform: `translateX(${tickerOffset}px)` }}>
              {[...livePrices, ...livePrices, ...livePrices].map((p, i) => (
                <div key={i} className="fp-ticker__item">
                  <span className="fp-ticker__pair">{p.pair}</span>
                  <span className={`fp-ticker__bid ${priceAnimations[p.pair] === 'up' ? 'flash-up' : priceAnimations[p.pair] === 'down' ? 'flash-down' : ''}`}>
                    {p.bid}
                  </span>
                  <span className={`fp-ticker__chg ${p.direction === 'up' ? 'up' : 'dn'}`}>
                    {p.direction === 'up' ? <FiArrowUpRight size={11}/> : <FiArrowDownRight size={11}/>}
                    {p.change >= 0 ? '+' : ''}{Math.abs(p.change)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE PRICES SECTION ── */}
      <section id="prices" ref={setRef('prices')} className={`fp-section fp-section--alt fp-reveal ${visible.has('prices')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-head">
            <span className="fp-eyebrow">LIVE MARKET DATA</span>
            <h2 className="fp-h2">Real-Time Forex Prices</h2>
            <p className="fp-sub">Live streaming prices updated every 2 seconds</p>
          </div>
          <div className="fp-prices-grid">
            <div className="fp-prices-tbl">
              <div className="fp-prices-thead">
                <span>Pair</span><span>Bid</span><span>Ask</span><span>Change</span><span>24H H/L</span>
              </div>
              {livePrices.map((p,i)=>(
                <div 
                  key={i} 
                  className={`fp-prow ${selectedPair.pair===p.pair?'active':''} ${hoveredRow === p.pair ? 'hovered' : ''}`} 
                  onMouseEnter={() => setHoveredRow(p.pair)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => {
                    setSelectedPair(p);
                    setChartData({
                      ...chartData,
                      datasets: [{
                        ...chartData.datasets[0],
                        label: p.pair,
                        data: p.history,
                      }],
                    });
                  }}
                >
                  <span className="fp-pr-pair">{p.pair}</span>
                  <span className={`fp-pr-mono ${priceAnimations[p.pair] === 'up' ? 'price-up-text' : priceAnimations[p.pair] === 'down' ? 'price-down-text' : ''}`}>
                    {p.bid}
                  </span>
                  <span className="fp-pr-mono">{p.ask}</span>
                  <span className={`fp-pr-chg ${p.direction === 'up'?'up':'dn'}`}>
                    {p.direction === 'up'?<FiArrowUpRight />:<FiArrowDownRight />}{p.change>=0?'+':''}{Math.abs(p.change)}%
                  </span>
                  <span className="fp-pr-hl">{p.high}/{p.low}</span>
                </div>
              ))}
            </div>
            <div className={`fp-chart-card ${hoveredChart ? 'hovered' : ''}`}>
              <div className="fp-chart-hd">
                <h3>{selectedPair.pair} — Live Chart</h3>
                <div className="fp-tfs">
                  {['1H','4H','1D','1W'].map((t,i)=>(
                    <button key={t} className={`fp-tf ${activeTimeframe===i?'active':''}`} onClick={() => handleTimeframeChange(t, i)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="fp-chart-wrap">
                <Line key={selectedPair.pair + activeTimeframe} data={chartData} options={chartOptions} />
              </div>
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
                  <li key={i} style={{ '--li': i } as React.CSSProperties}><BiCheckCircle />{t}</li>
                ))}
              </ul>
            </div>
            <div className="fp-what-stats">
              {[{v:'$6T+',l:'Daily Volume'},{v:'70+',l:'Currency Pairs'},{v:'24/5',l:'Trading Hours'}].map((s,i)=>(
                <div key={i} className="fp-stat-card" style={{ '--si': i } as React.CSSProperties}>
                  <div className="fp-stat-card__glow" />
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
              <div key={i} className="fp-feat-card" style={{'--acc':f.color,'--fi':i} as React.CSSProperties}>
                <div className="fp-feat-card__shine" />
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
                style={{ '--mi': i } as React.CSSProperties}
              >
                <div className="fp-mkt-card__glow" />
                <div className="fp-mkt-img">
                  <Image src={cat.image} alt={cat.title} width={110} height={110} style={{objectFit:'contain'}} />
                </div>
                <h3 className="fp-mkt-title">{cat.title}</h3>
                <p className="fp-mkt-desc">{cat.desc}</p>
                <div className="fp-mkt-overlay"><span>TRADE {cat.title.toUpperCase()} <FiArrowRight size={12}/></span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ACCOUNT ── */}
      <section id="open" ref={setRef('open')} className={`fp-section fp-section--dark fp-reveal ${visible.has('open')?'on':''}`}>
        <div className="fp-container">
          <div className="fp-open-card">
            <div className="fp-open-card__decoration" aria-hidden="true">
              <div className="fp-open-card__ring fp-open-card__ring--1" />
              <div className="fp-open-card__ring fp-open-card__ring--2" />
            </div>
            <div className="fp-open-left">
              <span className="fp-eyebrow fp-eyebrow--lt">Get Started</span>
              <h2 className="fp-h2 fp-h2--w">Open a Foxnance Account Now</h2>
              <div className="fp-steps">
                {[{n:'1',t:'Register',d:'Quick and easy account opening process.'},{n:'2',t:'Fund',d:'Fund your account with multiple deposit methods.'},{n:'3',t:'Trade',d:'Trade with spreads from 0.0 pips.'}].map((s,i)=>(
                  <div key={i} className="fp-step" style={{ '--sti': i } as React.CSSProperties}>
                    <div className="fp-step-num">{s.n}</div>
                    <div><h4>{s.t}</h4><p>{s.d}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/auth-signup" className="fp-btn fp-btn--green fp-btn--lg">Open Account <FiArrowRight /></Link>
            </div>
            <div className="fp-open-right">
              {['No Hidden Fees','Instant Deposits','Fast Withdrawals','24/7 Support','FCA Regulated','Segregated Funds'].map((b,i)=>(
                <div key={i} className="fp-benefit" style={{ '--bi': i } as React.CSSProperties}><BiCheckCircle size={18}/>{b}</div>
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
                  <span className="fp-faq__icon">{openFaq===i?<BiMinus size={18}/>:<BiPlus size={18}/>}</span>
                </button>
                <div className="fp-faq__a"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* Light & Dark CSS Variables */
        :root {
          --green:      #3fcb1b;
          --green-dk:   #2e9c14;
          --green-glow: rgba(63,203,27,0.25);
          --bg:         #ffffff;
          --bg-alt:     #f7f8f5;
          --bg-card:    #ffffff;
          --bg-dark:    #0A0A0A;
          --border:     #e5e7eb;
          --text:       #0A0A0A;
          --text2:      #6b7280;
          --radius:     16px;
          --nav-h:      80px;
          --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
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

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: clip;
          font-family: 'Aktiv Grotesk','Inter',-apple-system,sans-serif;
          background: var(--bg);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .fp { width: 100%; position: relative; }

        .fp-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media(min-width:1024px){ .fp-container { padding: 0 64px; } }

        .fp-section { padding: 96px 0; background: var(--bg); }
        .fp-section--alt  { background: var(--bg-alt); }
        .fp-section--dark { background: var(--bg-dark); }

        .fp-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.9s var(--ease-spring), transform 0.9s var(--ease-spring); }
        .fp-reveal.on { opacity: 1; transform: translateY(0); }

        .fp-head { text-align: center; margin-bottom: 56px; }
        .fp-eyebrow {
          font-size: .72rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: var(--green);
          display: inline-flex; align-items: center; gap: 8px;
          margin-bottom: 14px;
        }
        .fp-eyebrow::before, .fp-eyebrow::after {
          content: ''; display: block; width: 24px; height: 1px;
          background: var(--green); opacity: 0.5;
        }
        .fp-eyebrow--lt { color: rgba(255,255,255,.6); }
        .fp-eyebrow--lt::before, .fp-eyebrow--lt::after { background: rgba(255,255,255,.4); }
        .fp-h2 { font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 900; color: var(--text); letter-spacing: -.03em; line-height: 1.1; }
        .fp-h2--w { color: #fff !important; }
        .fp-sub { font-size: 1rem; color: var(--text2); max-width: 540px; margin: 14px auto 0; line-height: 1.7; }

        .fp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; font-size: .9rem; font-weight: 700;
          border-radius: 8px; text-decoration: none;
          transition: all .25s var(--ease-out);
          cursor: pointer; border: none; white-space: nowrap;
        }
        .fp-btn--green {
          background: linear-gradient(135deg, var(--green), var(--green-dk));
          color: #000;
          box-shadow: 0 4px 18px rgba(63,203,27,.3), 0 0 0 0 rgba(63,203,27,0);
        }
        .fp-btn--green:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(63,203,27,.45), 0 0 0 6px rgba(63,203,27,.08);
        }
        .fp-btn--lg { padding: 16px 36px; font-size: 1rem; }

        /* Hero Section */
        .fp-hero-ref {
          position: relative;
          height: 660px;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #000;
          padding-top: 80px;
          overflow: hidden;
          overflow-x: clip;
        }

        .fp-hero__bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .fp-hero__orb { position: absolute; border-radius: 50%; filter: blur(90px); }
        .fp-hero__orb--1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(63,203,27,.22), transparent 70%); top: -140px; right: -80px; animation: orbF 9s ease-in-out infinite; }
        .fp-hero__orb--2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(59,130,246,.15), transparent 70%); bottom: -80px; left: -60px; animation: orbF 11s ease-in-out infinite reverse; }
        .fp-hero__orb--3 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(63,203,27,.1), transparent 70%); top: 40%; left: 40%; animation: orbF 14s ease-in-out infinite 3s; }
        @keyframes orbF { 0%,100%{transform:translate(0,0);} 50%{transform:translate(18px,-18px);} }

        .fp-hero__grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(63,203,27,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(63,203,27,.05) 1px, transparent 1px); background-size: 52px 52px; }
        .fp-hero__scanline { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(63,203,27,.012) 2px, rgba(63,203,27,.012) 4px); pointer-events: none; }

        .fp-particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .fp-particle { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: var(--green); opacity: 0; animation: particleFly var(--pd, 8s) ease-in-out infinite var(--pdl, 0s); left: calc(var(--pi, 0) * 5.88% + 5%); bottom: -10px; }

        .fp-hero-ref__inner { display: flex; justify-content: flex-end; align-items: center; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 64px; position: relative; z-index: 1; flex: 1; }
        @media(max-width:968px){ .fp-hero-ref__inner { justify-content: center; text-align: center; padding: 0 24px; } }

        .hero-visual { position: absolute; left: -120px; top: 50%; transform: translateY(-50%); width: 45%; display: flex; justify-content: center; pointer-events: none; animation: floatAsset 6s ease-in-out infinite; }
        .hero-glow-ring { position: absolute; width: 420px; height: 420px; border-radius: 50%; border: 1px solid rgba(63,203,27,.15); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: ringPulse 4s ease-in-out infinite; }
        @keyframes ringPulse { 0%,100%{ opacity: 0.4; transform: translate(-50%,-50%) scale(1); } 50%{ opacity: 0.8; transform: translate(-50%,-50%) scale(1.04); } }
        .hero-3d-asset { width: 100%; height: auto; max-width: 600px; object-fit: contain; filter: drop-shadow(0 0 80px rgba(63,203,27,.3)); position: relative; z-index: 1; }
        @keyframes floatAsset { 0%,100%{ transform: translateY(-50%) translateY(0px); } 50%{ transform: translateY(-50%) translateY(-20px); } }

        .hero-content { width: 100%; max-width: 490px; text-align: right; display: flex; flex-direction: column; align-items: flex-end; color: white; position: relative; z-index: 2; }
        @media(max-width:968px){ .hero-content { text-align: center; align-items: center; max-width: 100%; } .hero-visual { display: none; } }

        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: rgba(63,203,27,.12); border: 1px solid rgba(63,203,27,.25); border-radius: 100px; font-size: .72rem; font-weight: 600; color: var(--green); margin-bottom: 20px; backdrop-filter: blur(8px); }
        .hero-badge__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); animation: dotPulse 2s ease-in-out infinite; }
        @keyframes dotPulse { 0%,100%{ box-shadow: 0 0 0 0 rgba(63,203,27,.4); } 50%{ box-shadow: 0 0 0 5px rgba(63,203,27,0); } }

        .hero-brand { font-size: clamp(3rem,6vw,5rem); font-weight: 900; line-height: 1; margin: 0 0 16px; letter-spacing: -.04em; }
        .green-x { color: #3fcb1b; text-shadow: 0 0 30px rgba(63,203,27,.6); }
        .hero-tagline { font-size: clamp(1.1rem,2.5vw,1.6rem); font-weight: 700; color: white; margin-bottom: 18px; }
        .hero-description { color: rgba(255,255,255,.65); max-width: 420px; line-height: 1.65; margin-bottom: 28px; font-size: 1rem; }

        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 28px; }
        .btn-green-ref { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; font-weight: 700; border-radius: 40px; text-decoration: none; transition: all 0.3s var(--ease-out); box-shadow: 0 4px 20px rgba(63,203,27,.3); }
        .btn-green-ref:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 12px 32px rgba(63,203,27,.5); }

        .hero-stats-row { display: flex; gap: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.1); width: 100%; justify-content: flex-end; }
        @media(max-width:968px){ .hero-stats-row { justify-content: center; } }
        .hero-stat { display: flex; flex-direction: column; align-items: flex-end; }
        @media(max-width:968px){ .hero-stat { align-items: center; } }
        .hero-stat__val { font-size: 1.35rem; font-weight: 900; color: var(--green); }
        .hero-stat__lbl { font-size: .68rem; color: rgba(255,255,255,.45); font-weight: 600; margin-top: 3px; }

        .h-item { opacity: 0; transform: translateY(44px); transition: opacity 0.8s var(--ease-spring), transform 0.8s var(--ease-spring); }
        .fp-hero-ref__inner.ready .h-item { opacity: 1; transform: translateY(0); }
        .h-d1 { transition-delay: 0.1s; }
        .h-d2 { transition-delay: 0.28s; }

        /* Ticker Bar */
        .fp-ticker { position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: rgba(63,203,27,.08); border-top: 1px solid rgba(63,203,27,.15); display: flex; align-items: center; overflow: hidden; z-index: 5; backdrop-filter: blur(8px); }
        .fp-ticker__label { flex-shrink: 0; padding: 0 14px; font-size: .65rem; font-weight: 900; color: var(--green); border-right: 1px solid rgba(63,203,27,.2); background: rgba(63,203,27,.08); height: 100%; display: flex; align-items: center; padding-left: 22px; position: relative; }
        .fp-ticker__label::before { content: ''; position: absolute; left: 8px; top: 50%; transform: translateY(-50%); width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: dotPulse 1.5s ease-in-out infinite; }
        .fp-ticker__track { flex: 1; overflow: hidden; }
        .fp-ticker__inner { display: flex; gap: 0; white-space: nowrap; will-change: transform; }
        .fp-ticker__item { display: inline-flex; align-items: center; gap: 10px; padding: 0 20px; border-right: 1px solid rgba(255,255,255,.06); min-width: 220px; }
        .fp-ticker__pair { font-size: .75rem; font-weight: 700; color: rgba(255,255,255,.8); }
        .fp-ticker__bid { font-family: monospace; font-size: .72rem; color: rgba(255,255,255,.55); transition: color 0.2s; }
        .fp-ticker__bid.flash-up { color: #10b981; text-shadow: 0 0 4px #10b981; }
        .fp-ticker__bid.flash-down { color: #ef4444; text-shadow: 0 0 4px #ef4444; }
        .fp-ticker__chg { display: inline-flex; align-items: center; gap: 2px; font-size: .7rem; font-weight: 700; }
        .fp-ticker__chg.up { color: #10b981; }
        .fp-ticker__chg.dn { color: #ef4444; }

        /* Live Prices - Hover Effects */
        .fp-prices-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
        @media(max-width:900px){ .fp-prices-grid { grid-template-columns: 1fr; } }
        .fp-prices-tbl { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
        .fp-prices-thead { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1.2fr; padding: 14px 20px; background: rgba(63,203,27,.04); border-bottom: 1px solid var(--border); font-size: .72rem; font-weight: 700; color: var(--text2); }
        .fp-prow { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1.2fr; padding: 14px 20px; border-bottom: 1px solid var(--border); cursor: pointer; transition: all 0.3s ease; align-items: center; position: relative; }
        .fp-prow:hover { background: rgba(63,203,27,.08); transform: translateX(4px); }
        .fp-prow.hovered { background: rgba(63,203,27,.1); transform: translateX(4px); box-shadow: -4px 0 0 var(--green); }
        .fp-prow.active { background: rgba(63,203,27,.12); border-left: 3px solid var(--green); }
        .fp-pr-pair { font-weight: 700; font-size: .88rem; color: var(--text); transition: color 0.2s; }
        .fp-prow.hovered .fp-pr-pair { color: var(--green); }
        .fp-pr-mono { font-family: monospace; font-size: .85rem; color: var(--text2); transition: all 0.2s; }
        .fp-pr-mono.price-up-text { color: #10b981; animation: priceFlash 0.5s ease; }
        .fp-pr-mono.price-down-text { color: #ef4444; animation: priceFlash 0.5s ease; }
        @keyframes priceFlash { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .fp-pr-chg { display: flex; align-items: center; gap: 3px; font-size: .82rem; font-weight: 600; transition: transform 0.2s; }
        .fp-prow.hovered .fp-pr-chg { transform: translateX(2px); }
        .fp-pr-chg.up { color: #10b981; }
        .fp-pr-chg.dn { color: #ef4444; }
        .fp-pr-hl { font-size: .78rem; color: var(--text2); }

        /* Chart Card - Hover Effect */
        .fp-chart-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 20px; transition: all 0.3s ease; cursor: pointer; }
        .fp-chart-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); border-color: rgba(63,203,27,.3); }
        .fp-chart-card.hovered { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(63,203,27,.15); border-color: var(--green); }
        .fp-chart-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
        .fp-chart-hd h3 { font-size: .95rem; font-weight: 700; color: var(--text); transition: color 0.2s; }
        .fp-chart-card:hover .fp-chart-hd h3 { color: var(--green); }
        .fp-tfs { display: flex; gap: 6px; }
        .fp-tf { padding: 5px 12px; background: var(--bg-alt); border: 1px solid var(--border); border-radius: 6px; font-size: .72rem; color: var(--text2); cursor: pointer; transition: all .2s; }
        .fp-tf:hover { border-color: var(--green); color: var(--green); transform: translateY(-2px); }
        .fp-tf.active { background: rgba(63,203,27,.1); border-color: var(--green); color: var(--green); }
        .fp-chart-wrap { height: 280px; }

        /* What is Forex */
        .fp-what-grid { display: grid; grid-template-columns: 1fr .85fr; gap: 56px; align-items: center; }
        @media(max-width:900px){ .fp-what-grid { grid-template-columns: 1fr; } }
        .fp-what-text p { color: var(--text2); line-height: 1.75; margin-bottom: 18px; font-size: .95rem; }
        .fp-checklist { list-style: none; margin-top: 24px; }
        .fp-checklist li { display: flex; align-items: center; gap: 12px; color: var(--text); font-size: .92rem; padding: 10px 14px; border-radius: 10px; transition: all 0.3s; cursor: pointer; }
        .fp-checklist li:hover { background: rgba(63,203,27,.08); transform: translateX(6px); }
        .fp-checklist li svg { color: var(--green); flex-shrink: 0; }

        .fp-what-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .fp-stat-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 28px; text-align: center; transition: all 0.4s; position: relative; overflow: hidden; cursor: pointer; }
        .fp-stat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(63,203,27,.15); border-color: var(--green); }
        .fp-stat-card__glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(63,203,27,.08), transparent 60%); opacity: 0; transition: opacity .4s; }
        .fp-stat-card:hover .fp-stat-card__glow { opacity: 1; }
        .fp-sc-val { font-size: 2.2rem; font-weight: 900; color: var(--green); display: block; margin-bottom: 8px; transition: transform 0.3s; }
        .fp-stat-card:hover .fp-sc-val { transform: scale(1.05); }
        .fp-sc-lbl { font-size: .8rem; color: var(--text2); font-weight: 600; }

        /* Features */
        .fp-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .fp-feat-card { background: var(--bg-card); border: 1px solid var(--border); border-top: 3px solid var(--acc, var(--green)); border-radius: 20px; padding: 28px; text-align: center; transition: all 0.35s; position: relative; overflow: hidden; cursor: pointer; }
        .fp-feat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(0,0,0,.12); border-color: var(--acc, var(--green)); }
        .fp-feat-card__shine { position: absolute; top: -60%; left: -60%; width: 80%; height: 80%; background: radial-gradient(circle, rgba(255,255,255,.04), transparent 60%); transition: transform .5s; pointer-events: none; }
        .fp-feat-card:hover .fp-feat-card__shine { transform: translate(130%, 130%); }
        .fp-feat-icon { width: 60px; height: 60px; background: color-mix(in srgb, var(--acc, var(--green)) 12%, transparent); color: var(--acc, var(--green)); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; transition: all 0.3s; }
        .fp-feat-card:hover .fp-feat-icon { transform: scale(1.1) rotate(-4deg); box-shadow: 0 8px 20px rgba(63,203,27,.2); }
        .fp-feat-card h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 10px; }
        .fp-feat-card p { font-size: .85rem; color: var(--text2); line-height: 1.6; }

        /* Markets */
        .fp-mkt-grid { display: flex; justify-content: space-between; gap: 16px; flex-wrap: nowrap; }
        @media(max-width:1100px){ .fp-mkt-grid { flex-wrap: wrap; justify-content: center; } }
        .fp-mkt-card { flex: 1; min-width: 160px; max-width: 210px; text-align: center; padding: 20px 12px 0; border-radius: var(--radius); background: var(--bg-card); border: 1px solid var(--border); cursor: pointer; position: relative; overflow: hidden; transition: all 0.4s; }
        .fp-mkt-card:hover { transform: translateY(-10px); border-color: rgba(63,203,27,.4); box-shadow: 0 20px 40px rgba(63,203,27,.15); }
        .fp-mkt-card__glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 30%, rgba(63,203,27,.08), transparent 60%); opacity: 0; transition: opacity .35s; pointer-events: none; }
        .fp-mkt-card:hover .fp-mkt-card__glow { opacity: 1; }
        .fp-mkt-img { height: 110px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; transition: transform 0.3s; }
        .fp-mkt-card:hover .fp-mkt-img { transform: scale(1.05); }
        .fp-mkt-title { font-size: .95rem; font-weight: 800; color: var(--text); margin-bottom: 6px; position: relative; z-index: 2; transition: transform .4s; }
        .fp-mkt-desc { font-size: .68rem; color: var(--text2); line-height: 1.4; padding-bottom: 20px; position: relative; z-index: 2; transition: transform .4s; }
        .fp-mkt-card:hover .fp-mkt-title, .fp-mkt-card:hover .fp-mkt-desc { transform: translateY(-20px); }
        .fp-mkt-overlay { position: absolute; bottom: 0; left: 0; right: 0; height: 52px; background: linear-gradient(135deg, var(--green), var(--green-dk)); transform: translateY(100%); transition: transform .4s; display: flex; align-items: center; justify-content: center; z-index: 1; }
        .fp-mkt-card:hover .fp-mkt-overlay { transform: translateY(0); }
        .fp-mkt-overlay span { font-size: .72rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 6px; }

        /* Open Account */
        .fp-open-card { background: linear-gradient(135deg, rgba(63,203,27,.08), rgba(0,0,0,.25)); border: 1px solid rgba(63,203,27,.15); border-radius: 28px; padding: 56px; display: grid; grid-template-columns: 1fr .8fr; gap: 56px; position: relative; overflow: hidden; }
        @media(max-width:900px){ .fp-open-card { grid-template-columns: 1fr; padding: 32px 24px; } }
        .fp-open-card__decoration { position: absolute; inset: 0; pointer-events: none; }
        .fp-open-card__ring { position: absolute; border-radius: 50%; border: 1px solid rgba(63,203,27,.08); animation: ringPulse 6s ease-in-out infinite; }
        .fp-open-card__ring--1 { width: 400px; height: 400px; top: -100px; right: -100px; }
        .fp-open-card__ring--2 { width: 280px; height: 280px; top: -40px; right: -40px; animation-delay: 1s; }
        .fp-steps { display: flex; flex-direction: column; gap: 20px; margin-bottom: 36px; }
        .fp-step { display: flex; gap: 18px; align-items: flex-start; transition: transform 0.3s; }
        .fp-step:hover { transform: translateX(6px); }
        .fp-step-num { width: 40px; height: 40px; border-radius: 50%; background: var(--green); color: #000; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 0 20px rgba(63,203,27,.35); transition: all 0.3s; }
        .fp-step:hover .fp-step-num { transform: scale(1.05); box-shadow: 0 0 30px rgba(63,203,27,.5); }
        .fp-step h4 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .fp-step p { font-size: .85rem; color: rgba(255,255,255,.5); }
        .fp-open-right { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; align-content: center; }
        .fp-benefit { display: flex; align-items: center; gap: 10px; font-size: .88rem; color: rgba(255,255,255,.8); padding: 10px 14px; border-radius: 10px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.06); transition: all 0.25s; cursor: pointer; }
        .fp-benefit:hover { background: rgba(63,203,27,.12); border-color: var(--green); transform: translateY(-3px) scale(1.02); }
        .fp-benefit svg { color: var(--green); }

        /* FAQ */
        .fp-faq { max-width: 760px; margin: 0 auto; }
        .fp-faq__item { border-bottom: 1px solid var(--border); transition: all 0.3s; }
        .fp-faq__item.open { border-color: rgba(63,203,27,.3); }
        .fp-faq__q { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 22px 0; font-size: .95rem; font-weight: 600; color: var(--text); background: none; border: none; cursor: pointer; text-align: left; gap: 16px; transition: all 0.2s; }
        .fp-faq__q:hover { color: var(--green); padding-left: 4px; }
        .fp-faq__item.open .fp-faq__q { color: var(--green); }
        .fp-faq__icon { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: rgba(63,203,27,.08); border: 1px solid rgba(63,203,27,.2); flex-shrink: 0; transition: all 0.3s; color: var(--green); }
        .fp-faq__q:hover .fp-faq__icon { background: rgba(63,203,27,.15); transform: scale(1.05); }
        .fp-faq__item.open .fp-faq__icon { transform: rotate(180deg); background: rgba(63,203,27,.15); }
        .fp-faq__a { max-height: 0; overflow: hidden; transition: max-height .4s, padding .4s; }
        .fp-faq__item.open .fp-faq__a { max-height: 200px; padding-bottom: 20px; }
        .fp-faq__a p { font-size: .88rem; color: var(--text2); line-height: 1.7; }

        @media(max-width:640px){
          .fp-section { padding: 64px 0; }
          .fp-prices-thead { display: none; }
          .fp-prow { grid-template-columns: 1fr 1fr 1fr; }
          .fp-prow .fp-pr-hl { display: none; }
          .fp-what-stats { grid-template-columns: 1fr; }
          .fp-open-right { grid-template-columns: 1fr; }
          .fp-mkt-card { min-width: 140px; }
        }
      `}</style>
    </div>
  );
}