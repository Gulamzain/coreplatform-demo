// src/app/markets/stocks/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  BiDollar, BiShield, BiGlobe, BiCheckCircle,
  BiPlus, BiMinus, BiChart, BiMap, BiLock, BiTrendingUp, BiBuilding
} from 'react-icons/bi';
import { FiArrowUpRight, FiArrowDownRight, FiArrowRight } from 'react-icons/fi';

// Components
const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

const TRADING_CATEGORIES = [
  { image: "/images/Forex.png",     title: "Forex",       desc: "60+ currency pairs with tight spreads from 0.0 pips", link: "/markets/forex" },
  { image: "/images/Commodity.png", title: "Commodities", desc: "Gold, Silver, Oil, and agricultural products",         link: "/markets/commodities" },
  { image: "/images/Stocks.png",    title: "Stocks",      desc: "1,700+ global stocks with competitive pricing",        link: "/markets/stocks" },
  { image: "/images/Crypto.png",    title: "Crypto",      desc: "Bitcoin, Ethereum and major altcoins CFDs",            link: "/markets/crypto" },
  { image: "/images/Indices.png",   title: "Indices",     desc: "S&P 500, FTSE 100, DAX 40 and more",                  link: "/markets/indices" },
];

// Initial live stock prices (simulated data)
const initialLivePrices = [
  { pair: 'AAPL', name: 'Apple Inc.', bid: 185.42, ask: 185.45, change: 1.24, high: 186.50, low: 184.20, direction: 'up' as const },
  { pair: 'MSFT', name: 'Microsoft', bid: 420.15, ask: 420.20, change: 0.85, high: 422.00, low: 418.50, direction: 'up' as const },
  { pair: 'GOOGL', name: 'Alphabet', bid: 142.30, ask: 142.35, change: -0.32, high: 143.50, low: 141.80, direction: 'down' as const },
  { pair: 'AMZN', name: 'Amazon', bid: 178.50, ask: 178.55, change: 0.95, high: 180.00, low: 177.50, direction: 'up' as const },
  { pair: 'TSLA', name: 'Tesla', bid: 245.80, ask: 245.85, change: -1.42, high: 250.00, low: 243.00, direction: 'down' as const },
  { pair: 'NVDA', name: 'NVIDIA', bid: 895.20, ask: 895.25, change: 2.35, high: 900.00, low: 888.00, direction: 'up' as const },
];

// Stock specific features
const stockFeatures = [
  { icon: BiBuilding, title: 'Global Stocks', desc: 'Trade 1,700+ stocks from US, EU, and Asian markets' },
  { icon: BiDollar, title: 'No Commission', desc: '$0 commission on all stock CFDs' },
  { icon: BiTrendingUp, title: 'Real-Time Data', desc: 'Live streaming prices and market depth' },
  { icon: BiShield, title: 'FCA Regulated', desc: 'Fully regulated and compliant with global standards' },
  { icon: BiGlobe, title: 'Global Markets', desc: 'Trade NYSE, NASDAQ, LSE, and more' },
  { icon: BiLock, title: 'Secure Trading', desc: 'Segregated accounts and SSL encryption' },
];

const faqItems = [
  { q: 'What is stock trading?',       a: 'Stock trading involves buying and selling shares of publicly traded companies. With Foxnance, you can trade stock CFDs, allowing you to speculate on price movements without owning the underlying asset.' },
  { q: 'What stocks can I trade?',     a: 'You can trade over 1,700 global stocks including Apple, Microsoft, Amazon, Tesla, NVIDIA, and many more from US, European, and Asian markets.' },
  { q: 'What is the minimum deposit?', a: 'The minimum deposit is $200 for all account types. Fund via bank transfer, credit card, or e-wallet.' },
  { q: 'Do you charge commission?',     a: 'No, we offer commission-free trading on all stock CFDs. You only pay the spread.' },
  { q: 'Is there a demo account?',     a: 'Yes, you can open a free demo account with $10,000 virtual funds to practice stock trading without risk.' },
];

export default function StocksPage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPair, setSelectedPair] = useState(initialLivePrices[0]);
  const [livePrices, setLivePrices] = useState(initialLivePrices);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [heroReady, setHeroReady] = useState(false);
  const [tickerOffset, setTickerOffset] = useState(0);
  const [priceAnimations, setPriceAnimations] = useState<Record<string, 'up' | 'down' | null>>({});
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  const refs = useRef<{ [k: string]: HTMLElement | null }>({});
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time price simulation with 2-second delay
  useEffect(() => {
    const scheduleUpdate = () => {
      updateTimeoutRef.current = setTimeout(() => {
        setLivePrices(prevPrices => 
          prevPrices.map(price => {
            let movement;
            if (price.pair === 'NVDA') {
              movement = (Math.random() - 0.5) * 3.5;
            } else if (price.pair === 'TSLA') {
              movement = (Math.random() - 0.5) * 2.5;
            } else {
              movement = (Math.random() - 0.5) * 0.8;
            }
            const newBid = +(price.bid + movement).toFixed(2);
            const newAsk = +(price.ask + movement).toFixed(2);
            const newChange = +(((newBid - (price.bid - movement * 0.5)) / (price.bid - movement * 0.5)) * 100).toFixed(2);
            const direction = movement >= 0 ? 'up' : 'down';
            
            setPriceAnimations(prev => ({ ...prev, [price.pair]: direction }));
            setTimeout(() => {
              setPriceAnimations(prev => ({ ...prev, [price.pair]: null }));
            }, 500);
            
            return {
              ...price,
              bid: newBid,
              ask: newAsk,
              change: newChange,
              direction: direction,
              high: Math.max(price.high, newBid),
              low: Math.min(price.low, newBid),
            };
          })
        );
        scheduleUpdate();
      }, 2000);
    };
    scheduleUpdate();
    return () => { if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current); };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));

    let frame: number;
    let offset = 0;
    const animate = () => {
      offset -= 0.5;
      if (offset <= -(initialLivePrices.length * 260)) {
        offset = 0;
      }
      setTickerOffset(offset);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => { clearTimeout(t); io.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  return (
    <>
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined} />
      
      <div id="stocks-layout-wrapper">
        {/* Hero Section */}
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
              <Image src="/images/StocksIn.png" alt="Stock Symbols" width={1000} height={1000} className="hero-3d-asset" priority />
            </div>

            <div className="hero-content h-item h-d2">
              <div className="hero-badge">
                <span className="hero-badge__dot" />
                <span>Markets Open · Live Prices</span>
              </div>
              <h1 className="hero-brand">
                STOC<span className="green-x">K</span>S
              </h1>
              <h2 className="hero-tagline">Own a piece of what moves the world</h2>
              <p className="hero-description">
                Trade 1,000+ global stocks with no commission, real-time data, and the speed your strategy deserves.
              </p>
              <div className="hero-actions">
                <Link href="/auth-signup" className="btn-green-ref">
                  Start Trading <FiArrowRight />
                </Link>
              </div>
              <div className="hero-stats-row">
                {[{v:'1,700+',l:'Global Stocks'},{v:'$0',l:'Commission'},{v:'24/5',l:'Trading Hours'}].map((s,i) => (
                  <div key={i} className="hero-stat">
                    <span className="hero-stat__val">{s.v}</span>
                    <span className="hero-stat__lbl">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fp-ticker">
            <div className="fp-ticker__label">LIVE</div>
            <div className="fp-ticker__track">
              <div className="fp-ticker__inner" style={{ transform: `translateX(${tickerOffset}px)` }}>
                {[...livePrices, ...livePrices, ...livePrices].map((p, i) => (
                  <div key={i} className="fp-ticker__item">
                    <span className="fp-ticker__pair">{p.pair}</span>
                    <span className={`fp-ticker__bid ${priceAnimations[p.pair] === 'up' ? 'flash-up' : priceAnimations[p.pair] === 'down' ? 'flash-down' : ''}`}>
                      ${p.bid}
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

        {/* Live Stock Prices - White Background */}
        <section id="prices" ref={setRef('prices')} className={`fp-section fp-section--white fp-reveal ${visible.has('prices')?'on':''}`}>
          <div className="fp-container">
            <div className="fp-head fp-head--dark">
              <span className="fp-eyebrow fp-eyebrow--dark">LIVE MARKET DATA</span>
              <h2 className="fp-h2 fp-h2--dark">Real-Time Stock Prices</h2>
              <p className="fp-sub fp-sub--dark">Live streaming prices from global stock exchanges</p>
            </div>
            <div className="fp-prices-single">
              <div className="fp-prices-tbl-full">
                <div className="fp-prices-thead">
                  <span>Symbol</span><span>Company</span><span>Price</span><span>Change</span><span>24H H/L</span>
                </div>
                {livePrices.map((p,i)=>(
                  <div 
                    key={i} 
                    className={`fp-prow ${selectedPair.pair===p.pair?'active':''} ${hoveredRow === p.pair ? 'hovered' : ''}`} 
                    onMouseEnter={() => setHoveredRow(p.pair)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => setSelectedPair(p)}
                  >
                    <span className="fp-pr-pair">{p.pair}</span>
                    <span className="fp-pr-name">{p.name}</span>
                    <span className={`fp-pr-mono ${priceAnimations[p.pair] === 'up' ? 'price-up-text' : priceAnimations[p.pair] === 'down' ? 'price-down-text' : ''}`}>
                      ${p.bid}
                    </span>
                    <span className={`fp-pr-chg ${p.direction === 'up'?'up':'dn'}`}>
                      {p.direction === 'up'?<FiArrowUpRight />:<FiArrowDownRight />}{p.change>=0?'+':''}{Math.abs(p.change)}%
                    </span>
                    <span className="fp-pr-hl">${p.high}/{p.low}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="fp-prices-cta">
              <Link href="/auth-signup" className="fp-btn fp-btn--green">Open Live Account <FiArrowRight /></Link>
              <Link href="/auth-signup" className="fp-btn fp-btn--outline-dark">Try Demo Free <FiArrowRight /></Link>
            </div>
          </div>
        </section>

        {/* What is Stock Trading - Dark/Black Background */}
        <section id="what" ref={setRef('what')} className={`fp-section fp-section--black fp-reveal ${visible.has('what')?'on':''}`}>
          <div className="fp-container">
            <div className="fp-head">
              <span className="fp-eyebrow">Learn the Basics</span>
              <h2 className="fp-h2">What is Stock Trading?</h2>
            </div>
            <div className="fp-what-grid">
              <div className="fp-what-text">
                <p>Stock trading involves buying and selling shares of publicly traded companies. With Foxnance, you can trade stock CFDs, allowing you to speculate on price movements without owning the underlying asset.</p>
                <p>Stock markets offer opportunities to profit from both rising and falling prices, with access to some of the world's most innovative companies.</p>
                <ul className="fp-checklist">
                  {['Trade 1,700+ global stocks','$0 commission on all stock CFDs','Access US, EU, and Asian markets','Go long or short on stock prices'].map((t,i)=>(
                    <li key={i} style={{ '--li': i } as React.CSSProperties}><BiCheckCircle />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="fp-what-stats">
                {[{v:'1,700+',l:'Stocks Available'},{v:'$0',l:'Commission'},{v:'24/5',l:'Trading Hours'},{v:'0.01',l:'Min Spread'}].map((s,i)=>(
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

        {/* Why Trade Stocks - White Background */}
        <section id="why" ref={setRef('why')} className={`fp-section fp-section--white fp-reveal ${visible.has('why')?'on':''}`}>
          <div className="fp-container">
            <div className="fp-head fp-head--dark">
              <span className="fp-eyebrow fp-eyebrow--dark">Why Trade Stocks</span>
              <h2 className="fp-h2 fp-h2--dark">Why Trade Stocks with Foxnance?</h2>
              <p className="fp-sub fp-sub--dark">Experience stock trading with a broker that puts you first</p>
            </div>
            <div className="fp-features-grid">
              {stockFeatures.map((f,i)=>(
                <div key={i} className="fp-feat-card" style={{ '--fi': i } as React.CSSProperties}>
                  <div className="fp-feat-card__shine" />
                  <div className="fp-feat-icon"><f.icon size={28} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Access Global Markets - Dark/Black Background */}
        <section id="markets" ref={setRef('markets')} className={`fp-section fp-section--black fp-reveal ${visible.has('markets')?'on':''}`}>
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
                  <div className="fx-trade-category-image">
                    <Image 
                      src={cat.image} 
                      alt={cat.title} 
                      width={140} 
                      height={140} 
                      className="fx-category-img" 
                      data-category={cat.title} 
                      priority 
                    />
                  </div>
                  <h3 className="fp-mkt-title">{cat.title}</h3>
                  <p className="fp-mkt-desc">{cat.desc}</p>
                  <div className="fp-mkt-overlay"><span>TRADE {cat.title.toUpperCase()} <FiArrowRight size={12}/></span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Account - White Background with gradient accent */}
        <section id="open" ref={setRef('open')} className={`fp-section fp-section--white fp-reveal ${visible.has('open')?'on':''}`}>
          <div className="fp-container">
            <div className="fp-open-card">
              <div className="fp-open-card__decoration" aria-hidden="true">
                <div className="fp-open-card__ring fp-open-card__ring--1" />
                <div className="fp-open-card__ring fp-open-card__ring--2" />
              </div>
              <div className="fp-open-left">
                <span className="fp-eyebrow fp-eyebrow--dark">Get Started</span>
                <h2 className="fp-h2 fp-h2--dark">Open a Foxnance Account Now</h2>
                <div className="fp-spacer"></div>
                <div className="fp-steps">
                  {[{n:'1',t:'Register',d:'Quick and easy account opening process.'},{n:'2',t:'Fund',d:'Fund your account with multiple deposit methods.'},{n:'3',t:'Trade',d:'Trade stocks with $0 commission.'}].map((s,i)=>(
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

        {/* FAQ - Light Gray Background to separate from dark footer */}
        <section id="faq" ref={setRef('faq')} className={`fp-section fp-section--faq-light fp-reveal ${visible.has('faq')?'on':''}`}>
          <div className="fp-container">
            <div className="fp-head">
              <span className="fp-eyebrow fp-eyebrow--dark">FAQ</span>
              <h2 className="fp-h2 fp-h2--dark">Frequently Asked Questions</h2>
              <p className="fp-sub fp-sub--dark">Everything you need to know about stock trading</p>
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
      </div>

      <Footer />
      <CookieModal />

      <style jsx global>{`
        #stocks-layout-wrapper {
          --green:      #3fcb1b;
          --green-dk:   #2e9c14;
          --blue:       #3b82f6;
          --green-glow: rgba(63,203,27,0.25);
          --bg:         #ffffff;
          --bg-alt:     #f7f8f5;
          --bg-card:    #ffffff;
          --bg-dark:    #0A0A0A;
          --bg-faq-light: #f5f5f0;
          --border:     #e5e7eb;
          --text:       #0A0A0A;
          --text2:      #6b7280;
          --radius:     16px;
          --radius-lg:  22px;
          --nav-h:      80px;
          --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
          background: var(--bg);
          color: var(--text);
        }
        @media(prefers-color-scheme:dark){
          #stocks-layout-wrapper {
            --bg:      #0A0A0A;
            --bg-alt:  #111111;
            --bg-card: #181818;
            --bg-faq-light: #1a1a1a;
            --border:  rgba(255,255,255,0.09);
            --text:    #f0f0f0;
            --text2:   rgba(255,255,255,0.5);
          }
        }

        #stocks-layout-wrapper .fp-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media(min-width:1024px){ #stocks-layout-wrapper .fp-container { padding: 0 64px; } }

        .fp-section { padding: 96px 0; }
        .fp-section--white { background: var(--bg); color: var(--text); }
        .fp-section--black { background: var(--bg-dark); color: #f0f0f0; }
        .fp-section--faq-light { 
          background: var(--bg-faq-light); 
          color: var(--text);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .fp-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.9s var(--ease-spring), transform 0.9s var(--ease-spring); }
        .fp-reveal.on { opacity: 1; transform: translateY(0); }

        .fp-head { text-align: center; margin-bottom: 56px; }
        .fp-head--dark { }
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
        .fp-eyebrow--dark { color: var(--green); }
        .fp-eyebrow--dark::before, .fp-eyebrow--dark::after { background: var(--green); }
        .fp-h2 { font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 900; color: var(--text); letter-spacing: -.03em; line-height: 1.1; }
        .fp-section--black .fp-h2 { color: #fff; }
        .fp-h2--dark { color: var(--text); }
        .fp-sub { font-size: 1rem; color: var(--text2); max-width: 540px; margin: 14px auto 0; line-height: 1.7; }
        .fp-sub--dark { color: var(--text2); }
        .fp-section--black .fp-sub { color: rgba(255,255,255,0.55); }

        /* Button System */
        .fp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; font-size: .9rem; font-weight: 700;
          border-radius: 8px; text-decoration: none;
          transition: all .25s var(--ease-out);
          cursor: pointer; border: 2px solid transparent;
        }
        .fp-btn--green {
          background: linear-gradient(135deg, var(--green), var(--green-dk));
          color: #fff;
          box-shadow: 0 4px 18px rgba(63,203,27,.3);
        }
        .fp-btn--green:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(63,203,27,.45), 0 0 0 6px rgba(63,203,27,.08);
        }
        .fp-btn--outline-dark {
          background: transparent;
          color: var(--text);
          border-color: rgba(0,0,0,0.18);
        }
        .fp-btn--outline-dark:hover {
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-3px);
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
        .hero-glow-ring { position: absolute; width: 420px; height: 420px; border-radius: 50%; border: 1px solid rgba(59,130,246,.15); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: ringPulse 4s ease-in-out infinite; }
        @keyframes ringPulse { 0%,100%{ opacity: 0.4; transform: translate(-50%,-50%) scale(1); } 50%{ opacity: 0.8; transform: translate(-50%,-50%) scale(1.04); } }
        .hero-3d-asset { width: 100%; height: auto; max-width: 600px; object-fit: contain; filter: drop-shadow(0 0 80px rgba(59,130,246,.3)); position: relative; z-index: 1; }
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
        .ready .h-item { opacity: 1; transform: translateY(0); }
        .h-d1 { transition-delay: 0.1s; }
        .h-d2 { transition-delay: 0.28s; }

        /* Ticker Bar */
        .fp-ticker { position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: rgba(63,203,27,.08); border-top: 1px solid rgba(63,203,27,.15); display: flex; align-items: center; overflow: hidden; z-index: 5; backdrop-filter: blur(8px); }
        .fp-ticker__label { flex-shrink: 0; padding: 0 14px; font-size: .65rem; font-weight: 900; color: var(--green); border-right: 1px solid rgba(63,203,27,.2); background: rgba(63,203,27,.08); height: 100%; display: flex; align-items: center; padding-left: 22px; position: relative; }
        .fp-ticker__label::before { content: ''; position: absolute; left: 8px; top: 50%; transform: translateY(-50%); width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: dotPulse 1.5s ease-in-out infinite; }
        .fp-ticker__track { flex: 1; overflow: hidden; }
        .fp-ticker__inner { display: flex; gap: 0; white-space: nowrap; will-change: transform; }
        .fp-ticker__item { display: inline-flex; align-items: center; gap: 10px; padding: 0 20px; border-right: 1px solid rgba(255,255,255,.06); min-width: 270px; }
        .fp-ticker__pair { font-size: .75rem; font-weight: 700; color: rgba(255,255,255,.8); }
        .fp-ticker__bid { font-family: monospace; font-size: .72rem; color: rgba(255,255,255,.55); transition: color 0.2s; }
        .fp-ticker__bid.flash-up { color: #10b981; text-shadow: 0 0 4px #10b981; }
        .fp-ticker__bid.flash-down { color: #ef4444; text-shadow: 0 0 4px #ef4444; }
        .fp-ticker__chg { display: inline-flex; align-items: center; gap: 2px; font-size: .7rem; font-weight: 700; }
        .fp-ticker__chg.up { color: #10b981; }
        .fp-ticker__chg.dn { color: #ef4444; }

        /* Live Prices - Single Table Full Width (White Background) */
        .fp-prices-single { width: 100%; max-width: 1000px; margin: 0 auto; }
        .fp-prices-tbl-full { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; width: 100%; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
        .fp-prices-thead { display: grid; grid-template-columns: 0.8fr 1.2fr 0.8fr 0.8fr 1fr; padding: 16px 24px; background: rgba(63,203,27,.05); border-bottom: 1px solid var(--border); font-size: .8rem; font-weight: 700; color: var(--text2); letter-spacing: .04em; text-transform: uppercase; }
        .fp-prow { display: grid; grid-template-columns: 0.8fr 1.2fr 0.8fr 0.8fr 1fr; padding: 16px 24px; border-bottom: 1px solid var(--border); cursor: pointer; transition: all 0.3s ease; align-items: center; position: relative; }
        .fp-prow:hover { background: rgba(63,203,27,.05); transform: translateX(4px); }
        .fp-prow.hovered { background: rgba(63,203,27,.07); transform: translateX(4px); box-shadow: -4px 0 0 var(--green); }
        .fp-prow.active { background: rgba(63,203,27,.1); border-left: 3px solid var(--green); }
        .fp-pr-pair { font-weight: 700; font-size: .88rem; color: var(--text); transition: color 0.2s; }
        .fp-pr-name { font-size: .75rem; color: var(--text2); }
        .fp-prow.hovered .fp-pr-pair { color: var(--green); }
        .fp-pr-mono { font-family: monospace; font-size: .85rem; color: var(--text2); transition: all 0.2s; font-weight: 600; }
        .fp-pr-mono.price-up-text { color: #10b981; animation: priceFlash 0.5s ease; }
        .fp-pr-mono.price-down-text { color: #ef4444; animation: priceFlash 0.5s ease; }
        @keyframes priceFlash { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .fp-pr-chg { display: flex; align-items: center; gap: 3px; font-size: .82rem; font-weight: 600; }
        .fp-prow.hovered .fp-pr-chg { transform: translateX(2px); }
        .fp-pr-chg.up { color: #10b981; }
        .fp-pr-chg.dn { color: #ef4444; }
        .fp-pr-hl { font-size: .78rem; color: var(--text2); }
        .fp-prices-cta { display: flex; gap: 14px; justify-content: center; margin-top: 36px; flex-wrap: wrap; }

        /* What is Stock Trading - Dark theme */
        .fp-what-grid { display: grid; grid-template-columns: 1fr .85fr; gap: 56px; align-items: center; }
        @media(max-width:900px){ .fp-what-grid { grid-template-columns: 1fr; } }
        .fp-what-text p { color: rgba(255,255,255,0.65); line-height: 1.75; margin-bottom: 18px; font-size: .95rem; }
        .fp-checklist { list-style: none; margin-top: 24px; }
        .fp-checklist li { display: flex; align-items: center; gap: 12px; color: #f0f0f0; font-size: .92rem; padding: 10px 14px; border-radius: 10px; transition: all 0.3s; cursor: pointer; }
        .fp-checklist li:hover { background: rgba(63,203,27,.08); transform: translateX(6px); }
        .fp-checklist li svg { color: var(--green); flex-shrink: 0; }

        .fp-what-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .fp-stat-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.1); border-radius: var(--radius-lg); padding: 28px; text-align: center; transition: all 0.4s; position: relative; overflow: hidden; cursor: pointer; }
        .fp-stat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(63,203,27,.15); border-color: var(--green); }
        .fp-stat-card__glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(63,203,27,.08), transparent 60%); opacity: 0; transition: opacity .4s; }
        .fp-stat-card:hover .fp-stat-card__glow { opacity: 1; }
        .fp-sc-val { font-size: 2.2rem; font-weight: 900; color: var(--green); display: block; margin-bottom: 8px; transition: transform 0.3s; }
        .fp-stat-card:hover .fp-sc-val { transform: scale(1.05); }
        .fp-sc-lbl { font-size: .8rem; color: rgba(255,255,255,0.55); font-weight: 600; }

        /* Features - White theme */
        .fp-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .fp-feat-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px 28px; text-align: center; transition: all 0.35s ease; position: relative; overflow: hidden; cursor: pointer; }
        .fp-feat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(63,203,27,.12); border-color: var(--green); background: rgba(63,203,27,.02); }
        .fp-feat-card__shine { position: absolute; top: -60%; left: -60%; width: 80%; height: 80%; background: radial-gradient(circle, rgba(63,203,27,.04), transparent 60%); transition: transform .5s; pointer-events: none; }
        .fp-feat-card:hover .fp-feat-card__shine { transform: translate(130%, 130%); }
        .fp-feat-icon { width: 64px; height: 64px; background: var(--green); color: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; transition: all 0.3s; }
        .fp-feat-card:hover .fp-feat-icon { transform: scale(1.08); box-shadow: 0 8px 20px rgba(63,203,27,.3); }
        .fp-feat-card h3 { font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 12px; }
        .fp-feat-card p { font-size: .85rem; color: var(--text2); line-height: 1.6; }

        /* Access Global Markets - Dark theme */
        .fp-mkt-grid { display: flex; justify-content: space-between; gap: 16px; flex-wrap: nowrap; }
        @media(max-width:1100px){ .fp-mkt-grid { flex-wrap: wrap; justify-content: center; } }
        .fp-mkt-card { flex: 1; min-width: 180px; max-width: 240px; text-align: center; padding: 28px 16px 0; border-radius: var(--radius); background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.28); cursor: pointer; position: relative; overflow: hidden; transition: all 0.4s; min-height: 260px; }
        .fp-mkt-card:hover { transform: translateY(-8px) scale(1.02); border-color: var(--green); background: rgba(63,203,27,.06); box-shadow: 0 0 0 1px var(--green), 0 24px 48px rgba(63,203,27,.25); }
        .fp-mkt-card__glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 30%, rgba(63,203,27,.08), transparent 60%); opacity: 0; transition: opacity .35s; pointer-events: none; }
        .fp-mkt-card:hover .fp-mkt-card__glow { opacity: 1; }
        .fp-mkt-img { height: 130px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: transform 0.3s; }
        .fp-mkt-card:hover .fp-mkt-img { transform: scale(1.05); }
        .fp-mkt-title { font-size: 1rem; font-weight: 800; color: #f0f0f0; margin-bottom: 8px; position: relative; z-index: 2; transition: transform .4s, color .2s; }
        .fp-mkt-desc { font-size: .72rem; color: rgba(255,255,255,0.55); line-height: 1.5; padding-bottom: 24px; position: relative; z-index: 2; transition: transform .4s; }
        .fp-mkt-card:hover .fp-mkt-title, .fp-mkt-card:hover .fp-mkt-desc { transform: translateY(-30px); }
        .fp-mkt-card:hover .fp-mkt-title { color: var(--green); }
        .fp-mkt-overlay { position: absolute; bottom: 0; left: 0; right: 0; height: 56px; background: linear-gradient(135deg, var(--green), var(--green-dk)); transform: translateY(100%); transition: transform .4s; display: flex; align-items: center; justify-content: center; z-index: 1; }
        .fp-mkt-card:hover .fp-mkt-overlay { transform: translateY(0); }
        .fp-mkt-overlay span { font-size: .75rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 6px; }

        .fx-category-img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
        .fx-category-img[data-category="Indices"] { height: 75% !important; width: auto !important; margin: 0 auto; }
        .fx-trade-category-image { width: 100%; height: 200px; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; }

        /* Open Account - White theme */
        .fp-open-card { background: linear-gradient(135deg, rgba(63,203,27,.04), rgba(0,0,0,.02)); border: 1px solid var(--border); border-radius: 28px; padding: 56px; display: grid; grid-template-columns: 1fr .8fr; gap: 56px; position: relative; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.06); }
        @media(max-width:900px){ .fp-open-card { grid-template-columns: 1fr; padding: 32px 24px; } }
        .fp-open-card__decoration { position: absolute; inset: 0; pointer-events: none; }
        .fp-open-card__ring { position: absolute; border-radius: 50%; border: 1px solid rgba(63,203,27,.08); animation: ringPulse 6s ease-in-out infinite; }
        .fp-open-card__ring--1 { width: 400px; height: 400px; top: -100px; right: -100px; }
        .fp-open-card__ring--2 { width: 280px; height: 280px; top: -40px; right: -40px; animation-delay: 1s; }
        .fp-spacer { height: 16px; }
        .fp-steps { display: flex; flex-direction: column; gap: 20px; margin-bottom: 36px; }
        .fp-step { display: flex; gap: 18px; align-items: flex-start; transition: transform 0.3s; }
        .fp-step:hover { transform: translateX(6px); }
        .fp-step-num { width: 40px; height: 40px; border-radius: 50%; background: var(--green); color: #000; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 0 20px rgba(63,203,27,.35); transition: all 0.3s; }
        .fp-step:hover .fp-step-num { transform: scale(1.05); box-shadow: 0 0 30px rgba(63,203,27,.5); }
        .fp-step h4 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .fp-step p { font-size: .85rem; color: var(--text2); }
        .fp-open-right { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; align-content: center; }
        .fp-benefit { display: flex; align-items: center; gap: 10px; font-size: .88rem; color: var(--text); padding: 10px 14px; border-radius: 10px; background: rgba(63,203,27,.04); border: 1px solid rgba(63,203,27,.12); transition: all 0.25s; cursor: pointer; font-weight: 600; }
        .fp-benefit:hover { background: rgba(63,203,27,0.1); border-color: var(--green); transform: translateY(-3px) scale(1.02); }
        .fp-benefit svg { color: var(--green); }

        /* FAQ - Light background with distinct styling */
        .fp-faq { max-width: 760px; margin: 0 auto; }
        .fp-faq::before {
          content: '';
          display: block;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, var(--green), var(--green-dk));
          border-radius: 2px;
          margin: 0 auto 56px;
        }
        .fp-faq__item { 
          border-bottom: 1px solid var(--border); 
          transition: all 0.3s;
          background: transparent;
        }
        .fp-faq__item.open { border-color: var(--green); }
        .fp-faq__q { 
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 22px 0; font-size: .95rem; font-weight: 600;
          background: none; border: none; cursor: pointer;
          text-align: left; gap: 16px; transition: all 0.2s;
          color: var(--text);
        }
        .fp-faq__q:hover { color: var(--green); padding-left: 4px; }
        .fp-faq__item.open .fp-faq__q { color: var(--green); }
        .fp-faq__icon {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(63,203,27,.1); border: 1px solid rgba(63,203,27,.2);
          flex-shrink: 0; transition: all 0.3s; color: var(--green);
        }
        .fp-faq__q:hover .fp-faq__icon { background: rgba(63,203,27,.2); transform: scale(1.05); }
        .fp-faq__item.open .fp-faq__icon { transform: rotate(180deg); background: rgba(63,203,27,.2); }
        .fp-faq__a { max-height: 0; overflow: hidden; transition: max-height .4s, padding .4s; }
        .fp-faq__item.open .fp-faq__a { max-height: 200px; padding-bottom: 20px; }
        .fp-faq__a p { font-size: .88rem; color: var(--text2); line-height: 1.7; }

        @media(max-width:640px){
          .fp-section { padding: 64px 0; }
          .fp-prices-thead { display: none; }
          .fp-prow { grid-template-columns: 1fr 1fr 1fr; }
          .fp-prow .fp-pr-hl, .fp-prow .fp-pr-name { display: none; }
          .fp-what-stats { grid-template-columns: 1fr; }
          .fp-open-right { grid-template-columns: 1fr; }
          .fp-mkt-card { min-width: 150px; min-height: 240px; }

          .fx-trade-category-image { height: 100px; }
        }
      `}</style>
    </>
  );
}