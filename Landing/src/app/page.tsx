"use client"
import React, { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

const Navbar      = dynamic(() => import('./componets/Navbar/navbar'))
const Footer      = dynamic(() => import('./componets/Footer/footer'))
const CookieModal = dynamic(() => import('./componets/cookieModal'))

import {
  ArrowRight, Check, ChevronRight,
  PlayCircle, Shield, Zap, Globe, Activity,
  TrendingUp, Monitor, Smartphone, Plus, Minus,
  CreditCard, DollarSign, Users, Clock,
  
} from 'react-feather'

const FAQ_ITEMS = [
  { q:"What is the minimum deposit?",           a:"The minimum deposit is $10 for all account types. Fund via bank transfer, credit card, or e-wallet." },
  { q:"What leverage does Foxnance offer?",      a:"We offer leverage up to 1:500 on Forex pairs. Leverage varies by instrument and account type." },
  { q:"How fast is trade execution?",            a:"Orders executed in under 40ms via NY4 and LD4 co-located servers. No dealing desk." },
  { q:"Is Foxnance regulated?",                  a:"Yes. Foxnance is regulated under multiple jurisdictions. Client funds held in fully segregated accounts." },
  { q:"Can I trade on mobile?",                  a:"Yes. MetaTrader 5 on iOS and Android, plus full account management via our mobile app." },
  { q:"What instruments can I trade?",           a:"Over 2,250 instruments including Forex, Stocks, Commodities, Indices, Crypto and Bonds." },
  { q:"Is there a free demo account?",           a:"Yes. Open a risk-free demo instantly with $10,000 virtual funds — no deposit required." },
  { q:"How do I withdraw my funds?",             a:"Withdrawals processed within 24 hours via your original payment method with no Foxnance fees." },
]

// 20 Testimonials for slider
const SLIDES = [
  { quote:"Foxnance gave me the edge I needed — raw spreads and sub-40ms execution changed my trading completely.", name:"James R.",  role:"Forex Trader, London",      init:"JR" },
  { quote:"The MT5 platform is flawless and the support team responds within minutes. Best broker I've used.",     name:"Priya S.",  role:"Equity Trader, Singapore",  init:"PS" },
  { quote:"I've traded with five brokers. Foxnance is the only one where I can trust the pricing completely.",     name:"Marco T.",  role:"Algorithmic Trader, Milan", init:"MT" },
  { quote:"Raw spreads from 0.0 pips on major pairs. My scalping strategy has never been more profitable.",        name:"Sarah K.",  role:"Scalp Trader, Dubai",       init:"SK" },
  { quote:"Regulation, speed, and tight spreads. Everything a serious trader needs — all in one place.",           name:"David O.",  role:"Portfolio Manager, Lagos",  init:"DO" },
  { quote:"The customer support is outstanding. They resolved my issue in under 2 minutes. Highly recommended!",   name:"Michael L.", role:"Day Trader, New York",      init:"ML" },
  { quote:"Foxnance's execution speed is unmatched. My scalping strategy has never been more profitable.",         name:"Anna W.",    role:"Scalper, Sydney",           init:"AW" },
  { quote:"Lowest spreads I've ever seen. The ECN model really delivers on its promise.",                         name:"Thomas K.",  role:"Swing Trader, Berlin",       init:"TK" },
  { quote:"The withdrawal process is seamless. Funds arrived in my bank account within 12 hours.",                name:"Maria G.",   role:"Investor, Madrid",          init:"MG" },
  { quote:"MT5 integration is perfect. All my indicators and EAs work flawlessly.",                               name:"Robert C.",  role:"Algorithmic Trader, Tokyo", init:"RC" },
  { quote:"I've been with Foxnance for 3 years. Never had a single issue with slippage or requotes.",             name:"Jennifer L.",role:"Forex Trader, Chicago",     init:"JL" },
  { quote:"The educational resources helped me go from beginner to profitable trader in 6 months.",               name:"Daniel S.",  role:"Retail Trader, Toronto",     init:"DS" },
  { quote:"Best trading experience I've had in 10 years. Foxnance is truly a game changer.",                      name:"Richard P.", role:"Professional Trader, London",init:"RP" },
  { quote:"The mobile app is incredible. I can manage my trades perfectly from anywhere.",                        name:"Sophia M.",  role:"Travel Trader, Dubai",       init:"SM" },
  { quote:"Deep liquidity even during major news events. No slippage at all.",                                    name:"William H.", role:"News Trader, Singapore",    init:"WH" },
  { quote:"Foxnance's leverage options gave me the flexibility I needed to grow my account.",                     name:"Emma D.",    role:"Forex Trader, Paris",        init:"ED" },
  { quote:"The VPS hosting is a lifesaver for my automated strategies. Zero downtime.",                          name:"Alex B.",    role:"EA Developer, Amsterdam",    init:"AB" },
  { quote:"Transparent pricing and no hidden fees. Exactly what every trader needs.",                             name:"Oliver N.",  role:"Position Trader, Zurich",    init:"ON" },
  { quote:"The community and signals within MT5 are fantastic. I've learned so much.",                            name:"Isabella R.",role:"Beginner Trader, Milan",     init:"IR" },
  { quote:"Foxnance is the only broker I trust with my large volume trades. Exceptional service.",                name:"Lucas V.",   role:"Institutional Trader, Frankfurt", init:"LV" },
]

// Trading categories for Access Global Markets
const TRADING_CATEGORIES = [
  { image: "/images/Forex.png", title: "Forex", desc: "60+ currency pairs with tight spreads from 0.0 pips" , link: "/markets/forex"},
  { image: "/images/Commodity.png", title: "Commodities", desc: "Gold, Silver, Oil, and agricultural products" ,link: "/markets/commodities" },
  { image: "/images/Stocks.png", title: "Stocks", desc: "1,700+ global stocks with competitive pricing" ,link: "/markets/stocks"},
  { image: "/images/Crypto.png", title: "Crypto", desc: "Bitcoin, Ethereum and major altcoins CFDs" ,link: "/markets/crypto"},
  { image: "/images/Indices.png", title: "Indices", desc: "S&P 500, FTSE 100, DAX 40 and more" ,link: "/markets/indices"},
]

// Upgrade features
const UPGRADE_FEATURES = [
  { icon: "/images/High-leverage.png", floatingIcon: "/images/high-leverageicon.png", title: "High Leverage", desc: "Trade major FX and gold CFDs with up to 1:500 leverage.", badge: "1:500" },
  { icon: "/images/Elite-tech.png", floatingIcon: "/images/elitetechicon.png", title: "Elite trading tech", desc: "MetaTrader 5 — the world's most powerful trading platform.", badge: "MT5" },
  { icon: "/images/Fast-execution.png", floatingIcon: "/images/fast-executionicon.png", title: "Fast execution", desc: "99.59% fill rate. No dealer intervention. Sub-40ms execution.", badge: "<40ms" },
  { icon: "/images/Fast-deposit.png", floatingIcon: "/images/fast-depositicon.png", title: "Fast deposits", desc: "Fund your account instantly using cards, bank wire, or e-wallets.", badge: "Instant" },
  { icon: "/images/Super-spreads.png", floatingIcon: "/images/super-tight-spreadsicons.png", title: "Super-tight spreads", desc: "Trade CFDs on FX from 0.0 pips, and on gold from just 0.07 pts.", badge: "0.0 pip" },
  { icon: "/images/Regulated.png", floatingIcon: "/images/regulated-secureicons.png", title: "Regulated & secure", desc: "Client funds in fully segregated accounts at tier-1 banks.", badge: "FCA" },
]

export default function FoxnanceBroker() {
  const [openFaq, setOpenFaq] = useState<number|null>(null)
  const [slideIdx, setSlideIdx] = useState(0)
  const [visible, setVisible] = useState<Set<string>>(new Set())
  const [hoveredFeature, setHoveredFeature] = useState<number|null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number|null>(null)
  const [hoveredAccount, setHoveredAccount] = useState<number|null>(null)
  const [heroReady, setHeroReady] = useState(false)
  const refs = useRef<{[k:string]: HTMLElement|null}>({})

  useEffect(() => {
    if (typeof window === "undefined") return
    // Trigger hero animation after a short delay for smooth entrance
    const heroTimer = setTimeout(() => setHeroReady(true), 100)
    const timer = setInterval(() => setSlideIdx(i => (i+1) % Math.ceil(SLIDES.length / 5)), 4500)
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) setVisible(s => new Set([...s, e.target.id])) }),
      { threshold: 0.12 }
    )
    Object.values(refs.current).forEach(el => el && io.observe(el))
    return () => { clearTimeout(heroTimer); clearInterval(timer); io.disconnect() }
  }, [])

  const ref = (id:string) => (el:HTMLElement|null) => { refs.current[id] = el }

  return (
    <>
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined} />

      {/* ═══ 1. HERO SECTION WITH MODERN FLOATING ANIMATIONS ═══ */}
      <section className="fx-hero">
        <video className="fx-hero__vid fx-hero__vid--desk" autoPlay loop muted playsInline poster="/images/hero-poster.jpg">
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        </video>
        <video className="fx-hero__vid fx-hero__vid--mob" autoPlay loop muted playsInline poster="/images/hero-poster.jpg">
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        </video>
        <div className="fx-hero__overlay" />
        <div className={`fx-hero__body ${heroReady ? "hero-animate" : ""}`}>
          <h1 className="fx-hero__h1 hero-float hero-float--1">
            <span className="hero-line hero-line--1">Markets Move Fast.</span>
            <span className="hero-line hero-line--2">We Move Faster</span>
          </h1>
          <p className="fx-hero__sub hero-float hero-float--2">
            Ultra-fast execution, low spreads, and instant global payouts.<br />
            Built for traders who don't wait.
          </p>
          <div className="fx-hero__stats hero-float hero-float--3">
            {[{val:"1:500",sup:"",lbl:"LEVERAGE"},{val:"170+",sup:"",lbl:"MARKETS"},{val:"24/7",sup:"",lbl:"SUPPORT"}].map((s,i)=>(
              <div key={i} className="fx-hero__stat stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="fx-hero__stat-val">{s.val}{s.sup&&<sup>{s.sup}</sup>}</span>
                <span className="fx-hero__stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
          <div className="fx-hero__ctas hero-float hero-float--4">
            <Link href="/auth-signup" className="fx-btn fx-btn--green">
              Start Trading <ArrowRight size={16}/>
            </Link>
            <Link href="/demo" className="fx-btn fx-btn--glass">
              <PlayCircle size={16}/> Try Demo
            </Link>
          </div>
        </div>
      </section>

    {/* ═══ 2. ACCESS GLOBAL MARKETS SECTION ═══ */}
<section id="trade" ref={ref("trade")} className={`fx-section fx-section--white fx-reveal ${visible.has("trade")?"on":""}`}>
  <div className="fx-container">
    <div className="fx-section__head">
      <p className="fx-eyebrow fx-eyebrow--green">WHAT YOU CAN TRADE</p>
      <h2 className="fx-h2">Access Global Markets</h2>
      <p className="fx-section__sub">One account. 2,250+ instruments. Real-time execution.</p>
    </div>
    <div className="fx-trade-grid">
      {TRADING_CATEGORIES.map((cat, i) => (
        <div 
          key={i} 
          className={`fx-trade-category-card ${hoveredCategory === i ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredCategory(i)}
          onMouseLeave={() => setHoveredCategory(null)}
          onClick={() => window.location.href = cat.link}
        >
          <div className="fx-trade-category-image">
            <Image src={cat.image} alt={cat.title} width={140} height={140} className="fx-category-img" priority />
          </div>
          <h3 className="fx-trade-category-title">{cat.title}</h3>
          <p className="fx-trade-category-desc">{cat.desc}</p>
          
          {/* Hover Overlay with Call to Action */}
          <div className="fx-trade-hover-overlay">
            <div className="fx-trade-hover-content">
              <span className="fx-trade-hover-text">TRADE {cat.title.toUpperCase()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ═══ 3. UPGRADE YOUR TRADING SECTION - Larger images ═══ */}
      <section id="upgrade" ref={ref("upgrade")} className={`fx-section fx-section--black fx-reveal ${visible.has("upgrade")?"on":""}`}>
        <div className="fx-container">
          <div className="fx-section__head">
            <p className="fx-eyebrow fx-eyebrow--green">WHY FOXNANCE?</p>
            <h2 className="fx-h2 fx-h2--white">Upgrade your trading with Foxnance</h2>
            <p className="fx-section__sub fx-section__sub--light">The infrastructure that institutional traders demand — now available to everyone.</p>
          </div>
          <div className="fx-upgrade-grid">
            {UPGRADE_FEATURES.map((feat, i) => (
              <div 
                key={i} 
                className={`fx-upgrade-card ${hoveredFeature === i ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <img src={feat.floatingIcon} className="fx-floating-icon" alt="icon" />
                <div className="fx-upgrade-row">
                  <div className="fx-upgrade-content">
                    <h3 className="fx-upgrade-title">{feat.title}</h3>
                    <p className="fx-upgrade-desc">{feat.desc}</p>
                  </div>
                  <div className="fx-upgrade-visual">
                    <img src={feat.icon} className="fx-main-device" alt={feat.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  
  {/* ═══ 4. MT5 SECTION - Larger device image with animated floating tabs ═══ */}
<section id="platform" ref={ref("platform")} className={`fx-section fx-section--white fx-reveal ${visible.has("platform")?"on":""}`}>
  <div className="fx-container">
    <div className="fx-section__head">
      <p className="fx-eyebrow fx-eyebrow--green">TRADING PLATFORM</p>
      <h2 className="fx-h2">MetaTrader 5 — The Professional's Choice</h2>
      <p className="fx-section__sub">The most advanced trading platform, connected to Foxnance's ultra-fast ECN infrastructure.</p>
    </div>
    
    <div className="fx-mt5-layout">
      <div className="fx-mt5-features">
        {[
          { t:"21 Timeframes", d:"From 1 minute to 1 month. Full technical analysis suite.", icon: <Clock size={20}/> },
          { t:"38 Built-in Indicators", d:"Technical indicators, oscillators and drawing tools.", icon: <Activity size={20}/> },
          { t:"Automated Trading", d:"Run Expert Advisors and algorithmic strategies 24/5.", icon: <Zap size={20}/> },
          { t:"Multi-Asset", d:"Trade Forex, Stocks, Commodities and Crypto in one platform.", icon: <Globe size={20}/> },
          { t:"iOS & Android", d:"Full-featured mobile app with real-time charts and alerts.", icon: <Smartphone size={20}/> },
        ].map((f,i)=>(
          <div key={i} className="fx-mt5-feature animate-feature" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="fx-mt5-feature-icon-box">{f.icon}</div>
            <div>
              <div className="fx-mt5-feature-title">{f.t}</div>
              <div className="fx-mt5-feature-desc">{f.d}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="fx-mt5-visual">
        <div className="fx-mt5-devices">
          <Image 
            src="/images/MT5-Devices.png" 
            alt="MetaTrader 5" 
            width={700}
            height={490}
            className="fx-mt5-devices-img" 
            priority
          />
        </div>
        
        {/* Tab 1: Profit - Animated Floating */}
        <div className="fx-mt5-floating-tab left-tab animate-slide-left">
          <div className="fx-mt5-tab-title animate-text-pulse">PROFIT</div>
          <div className="fx-mt5-tab-value-large animate-number-pulse">$3400</div>
          <div className="fx-mt5-tab-subvalue animate-up-trend">+22%</div>
        </div>
        
        {/* Tab 2: Global Market - Animated Floating */}
        <div className="fx-mt5-floating-tab right-tab animate-slide-right">
          <div className="fx-mt5-tab-value-large animate-number-pulse">24%</div>
          <div className="fx-mt5-tab-subtitle animate-text-pulse">Global Market</div>
        </div>
      </div>
    </div>

    <div className="fx-mt5-ctas">
      <Link href="/platforms/mt5" className="fx-btn fx-btn--green">Download MT5 <ArrowRight size={15}/></Link>
      <Link href="/platforms/web" className="fx-btn fx-btn--outline-black">Try WebTrader</Link>
    </div>
  </div>
</section>

      {/* ═══ 5. ACCOUNT TYPES SECTION ═══ */}
   <section id="accounts" ref={ref("accounts")} className={`fx-section fx-section--black fx-reveal ${visible.has("accounts")?"on":""}`}>
        <div className="fx-container">
          <div className="fx-section__head">
            <p className="fx-eyebrow" style={{ color: '#3fcb1b' }}>Account Types</p>
            <h2 className="fx-h2 fx-h2--white">More Choice. More Control.</h2>
            <p className="fx-section__sub fx-section__sub--light">Transparent pricing. No hidden fees. Tailored to your trading style.</p>
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
                className={`fx-account ${a.featured ? "fx-account--featured" : ""} ${hoveredAccount === i ? 'hovered' : ''}`} 
                onMouseEnter={() => setHoveredAccount(i)}
                onMouseLeave={() => setHoveredAccount(null)}
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

      {/* ═══ 6. PAYMENT METHODS SECTION - Centered logos ═══ */}
      <section id="payments" ref={ref("payments")} className={`fx-section fx-section--white fx-reveal ${visible.has("payments")?"on":""}`}>
        <div className="fx-container">
          <div className="fx-section__head">
            <p className="fx-eyebrow fx-eyebrow--green">Money Deposit Methods</p>
            <h2 className="fx-h2">Fast, Secure Funding</h2>
            <p className="fx-section__sub">No Foxnance deposit fees. Multiple options. Withdrawals within 24 hours.</p>
          </div>
          <div className="fx-payment-icons-row">
            <div className="fx-payment-icon">
              <svg width="100" height="65" viewBox="0 0 120 75" fill="none">
                <rect width="120" height="75" rx="12" fill="#1434CB"/>
                <text x="18" y="48" fontSize="32" fontWeight="900" fontFamily="Arial, sans-serif" fill="white">VISA</text>
              </svg>
            </div>
            <div className="fx-payment-icon">
  <svg width="100" height="65" viewBox="0 0 120 75" fill="none">
    <rect width="120" height="75" rx="12" fill="#F7931A"/>
    {/* Centered Bitcoin symbol and text */}
    <text x="20" y="48" fontSize="34" fontWeight="900" fill="white" fontFamily="monospace">₿</text>
    <text x="52" y="45" fontSize="14" fontWeight="800" fill="white" fontFamily="Inter, sans-serif">CRYPTO</text>
  </svg>
</div>
            <div className="fx-payment-icon">
              <svg width="100" height="65" viewBox="0 0 120 75" fill="none">
                <rect width="120" height="75" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="2"/>
                <circle cx="45" cy="37.5" r="22" fill="#EB001B"/>
                <circle cx="75" cy="37.5" r="22" fill="#F79E1B"/>
                <path d="M60 20a22 22 0 0 1 0 35A22 22 0 0 1 60 20z" fill="#FF5F00"/>
              </svg>
            </div>
            <div className="fx-payment-icon">
              <svg width="100" height="65" viewBox="0 0 120 75" fill="none">
                <rect width="120" height="75" rx="12" fill="#1A2C3E"/>
                <rect x="15" y="25" width="90" height="8" rx="4" fill="#FFD966"/>
                <rect x="25" y="40" width="70" height="22" rx="4" fill="#FFD966" opacity="0.9"/>
                <text x="48" y="57" fontSize="16" fontWeight="bold" fill="#1A2C3E" fontFamily="monospace">BANK</text>
              </svg>
            </div>
            
            <div className="fx-payment-icon">
              <svg width="100" height="65" viewBox="0 0 120 75" fill="none">
                <rect width="120" height="75" rx="12" fill="#097969"/>
                <text x="18" y="48" fontSize="28" fontWeight="900" fill="white">UPI</text>
                <text x="70" y="48" fontSize="18" fontWeight="500" fill="white">BHIM</text>
              </svg>
            </div>
            <div className="fx-payment-icon">
              <svg width="100" height="65" viewBox="0 0 120 75" fill="none">
                <rect width="120" height="75" rx="12" fill="#003087"/>
                <text x="12" y="48" fontSize="28" fontWeight="900" fill="white">Pay</text>
                <text x="58" y="48" fontSize="28" fontWeight="900" fill="#009CDE">Pal</text>
              </svg>
            </div>
          </div>
          <p className="fx-pay-note">No deposit fees charged by Foxnance. Third-party fees may apply.</p>
        </div>
      </section>

      {/* ═══ 7. GET STARTED SECTION ═══ */}
      <section id="getstarted" ref={ref("getstarted")} className={`fx-section fx-section--black fx-reveal ${visible.has("getstarted")?"on":""}`}>
        <div className="fx-container">
          <div className="fx-section__head">
            <p className="fx-eyebrow" style={{color:"#3fcb1b"}}>GET STARTED</p>
            <h2 className="fx-h2 fx-h2--white">Open an Account in Minutes</h2>
          </div>
          <div className="fx-steps">
  {[
    {
      n: "01",
      title: "Create Account",
      desc: "Complete our simple online application. Most accounts approved instantly.",
      icon: <Check size={22} strokeWidth={2.5} />
    },
    {
      n: "02",
      title: "Fund Your Account",
      desc: "Deposit from $200 via bank wire, credit card, or e-wallet.",
      icon: <DollarSign size={22} strokeWidth={2} />
    },
    {
      n: "03",
      title: "Download & Trade",
      desc: "Install MT5 or use WebTrader. Access 2,250+ instruments immediately.",
      icon: <TrendingUp size={22} strokeWidth={2} />
    },
  ].map((s, i) => (
    <div key={i} className="fx-step" style={{ transitionDelay: `${i * 100}ms` }}>
      <div className="fx-step__icon" style={{ background: 'rgba(63,203,27,0.15)', color: '#3fcb1b' }}>{s.icon}</div>
      <div className="fx-step__num-circle" style={{ background: '#3fcb1b', color: '#000' }}>{s.n}</div>
      <h3 className="fx-step__title">{s.title}</h3>
      <p className="fx-step__desc">{s.desc}</p>
      {i < 2 && <div className="fx-step__arrow"><ChevronRight size={20} /></div>}
    </div>
  ))}
</div>
          <div style={{textAlign:"center",marginTop:48}}>
            <Link href="/auth-signup" className="fx-btn fx-btn--green fx-btn--lg">Open Live Account <ArrowRight size={16}/></Link>
            <p style={{marginTop:16,fontSize:".85rem",color:"rgba(255,255,255,0.45)"}}>
              Or <Link href="/demo" style={{color:"rgba(255,255,255,0.7)",textDecoration:"underline"}}>open a free demo account</Link> to practise first
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 8. FAQ SECTION ═══ */}
      <section id="faq" ref={ref("faq")} className={`fx-section fx-section--white fx-reveal ${visible.has("faq")?"on":""}`}>
        <div className="fx-container">
          <div className="fx-section__head">
            <p className="fx-eyebrow fx-eyebrow--green">FAQ</p>
            <h2 className="fx-h2">Frequently Asked Questions</h2>
          </div>
          <div className="fx-faq">
            {FAQ_ITEMS.map((f,i)=>(
              <div key={i} className={`fx-faq__item ${openFaq===i?"open":""}`}>
                <button className="fx-faq__q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span>{f.q}</span>
                  {openFaq===i?<Minus size={18} strokeWidth={2}/>:<Plus size={18} strokeWidth={2}/>}
                </button>
                {openFaq===i&&<div className="fx-faq__a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ═══ 9. TRUST SECTION ═══ */}
<section id="trust" ref={ref("trust")} className={`fx-section fx-section--white fx-reveal ${visible.has("trust")?"on":""}`}>
  <div className="fx-container">
    <div className="fx-trust-split">
      <div className="fx-trust-split__left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 className="fx-h2">A Platform You Can Trust</h2>
        <p className="fx-section__sub" style={{ textAlign: "left", margin: "12px 0 0", maxWidth: "100%" }}>
          Regulated across multiple jurisdictions. Client funds fully segregated. Conservative balance sheet with $15.2B equity capital.
        </p>
      </div>
      <div className="fx-trust-split__right">
        <Image 
          src="/images/Trust-tab.PNG" 
          alt="Trust Badges" 
          width={450} 
          height={380} 
          className="fx-trust-image" 
          priority
          style={{ width: '100%', height: 'auto', maxWidth: '450px' }}
        />
      </div>
    </div>
  </div>
</section>

  {/* ═══ 10. READY TO TRADE SECTION ═══ */}
<section id="ready" ref={ref("ready")} className={`fx-section fx-section--black fx-reveal ${visible.has("ready")?"on":""}`}>
  <div className="fx-container">
    <div className="fx-section__head">
      <p className="fx-eyebrow" style={{ color: '#3fcb1b' }}>Ready to Trade with Foxnance?</p>
      <h2 className="fx-h2 fx-h2--white">Join 500,000+ Traders Worldwide</h2>
      <p className="fx-section__sub fx-section__sub--light">Raw spreads. Fast execution. Regulated platform.</p>
    </div>
    
    <div className="fx-testimonials-slider">
      <div 
        className="fx-testimonials-track" 
        style={{ transform: `translateX(-${slideIdx * 100}%)` }}
      >
        {SLIDES.map((s, i) => (
          <div key={i} className="fx-testi-card">
            <div>
              <div className="fx-testi-card__quote">&ldquo;</div>
              <p className="fx-testi-card__text">{s.quote}</p>
            </div>
            <div className="fx-testi-card__author">
              <div className="fx-testi-card__avatar" style={{ background: '#3fcb1b', color: '#000' }}>{s.init}</div>
              <div>
                <div className="fx-testi-card__name">{s.name}</div>
                <div className="fx-testi-card__role">{s.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="fx-slider__dots">
      {Array.from({ length: Math.ceil(SLIDES.length / 5) }).map((_, i) => (
        <button 
          key={i} 
          onClick={() => setSlideIdx(i)} 
          className={`fx-slider__dot ${slideIdx === i ? 'active' : ''}`} 
          style={{ background: slideIdx === i ? '#3fcb1b' : 'rgba(255,255,255,0.2)' }}
        />
      ))}
    </div>

    <div className="fx-final-ctas">
      <Link href="/auth-signup" className="fx-btn fx-btn--green fx-btn--lg">Open Live Account <ArrowRight size={16}/></Link>
      <Link href="/demo" className="fx-btn fx-btn--white-outline"><PlayCircle size={16}/> Free Demo</Link>
    </div>
  </div>
</section>

      <Footer />
      <CookieModal />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        :root{--green:#3fcb1b;--black:#0A0A0A;--white:#fff;--grey:#F5F5F5;--border:#E5E5E5;--muted:#6B6B6B;--radius:12px;}
        *{font-family:'Aktiv Grotesk','Inter',-apple-system,sans-serif;box-sizing:border-box;}
        .fx-container{max-width:1280px;margin:0 auto;padding:0 24px;}
        @media(min-width:1024px){.fx-container{padding:0 64px;}}
        .fx-section{padding:96px 0;position:relative;overflow:hidden;}
        .fx-section--white{background:#fff;}
        .fx-section--black{background:#0A0A0A;}
        .fx-reveal{opacity:0;transform:translateY(40px);transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1);}
        .fx-reveal.on{opacity:1;transform:translateY(0);}
        .fx-section__head{text-align:center;margin-bottom:56px;}
        .fx-section__sub{font-size:1.05rem;color:#6B6B6B;max-width:560px;margin:12px auto 0;line-height:1.65;}
        .fx-section__sub--light{color:rgba(255,255,255,.55);}
        .fx-eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--green);display:block;margin-bottom:12px;animation:eyebrowIn 0.6s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes eyebrowIn{from{opacity:0;letter-spacing:0.3em;}to{opacity:1;letter-spacing:0.14em;}}
        .fx-eyebrow--green{color:var(--green);}
        .fx-eyebrow--light{color:rgba(255,255,255,.5);}
        .fx-h2{font-size:clamp(1.9rem,3.5vw,2.9rem);font-weight:900;color:#0A0A0A;letter-spacing:-.02em;line-height:1.12;margin:0;}
        .fx-h2--white{color:#fff!important;}
        .fx-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;font-size:.9rem;font-weight:700;border-radius:8px;text-decoration:none;transition:all .22s;cursor:pointer;border:none;white-space:nowrap;}
        .fx-btn--green{background:linear-gradient(135deg, #3fcb1b 0%, #2e9c14 100%);color:#000;box-shadow:0 4px 18px rgba(63,203,27,.28);}
        .fx-btn--green:hover{background:#2e9c14;transform:translateY(-1px);}
        .fx-btn--glass{background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);color:#fff;border:1px solid rgba(255,255,255,0.2);}
        .fx-btn--glass:hover{background:rgba(255,255,255,0.2);transform:translateY(-1px);}
        .fx-btn--white-outline{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.35);}
        .fx-btn--white-outline:hover{border-color:#fff;background:rgba(255,255,255,.08);}
        .fx-btn--outline-black{background:transparent;color:#0A0A0A;border:1.5px solid #0A0A0A;}
        .fx-btn--outline-black:hover{background:#0A0A0A;color:#fff;}
        .fx-btn--outline-white{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4);}
        .fx-btn--outline-white:hover{background:rgba(255,255,255,.08);border-color:#fff;}
        .fx-btn--sm{padding:10px 20px;font-size:.82rem;}
        .fx-btn--lg{padding:16px 36px;font-size:1rem;}
        .fx-btn--full{width:100%;justify-content:center;margin-top:20px;}

        /* HERO */
        .fx-hero{position:relative;width:100%;height:100svh;min-height:620px;max-height:980px;display:flex;align-items:center;overflow:hidden;background:#000;}
        .fx-hero__vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
        .fx-hero__vid--desk{display:block;} .fx-hero__vid--mob{display:none;}
        @media(max-width:640px){.fx-hero__vid--desk{display:none;}.fx-hero__vid--mob{display:block;}}
        .fx-hero__overlay{position:absolute;inset:0;background:linear-gradient(105deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.65) 55%,rgba(0,0,0,.2) 100%);}
        .fx-hero__body{position:relative;z-index:3;max-width:1280px;margin:0 auto;padding:80px 24px 0;width:100%;}
        @media(min-width:1024px){.fx-hero__body{padding:80px 64px 0;}}
        .fx-hero__h1{font-size:clamp(2.4rem,5.5vw,4.5rem);font-weight:900;color:#fff;line-height:1.06;letter-spacing:-.025em;margin-bottom:20px;max-width:700px;}
        .hero-line{display:block;opacity:0;transform:translateY(40px);animation:lineRise 0.8s cubic-bezier(0.16,1,0.3,1) forwards;}
        .hero-line--1{animation-delay:0.1s;}
        .hero-line--2{animation-delay:0.3s;}
        @keyframes lineRise{to{opacity:1;transform:translateY(0);}}
        .fx-hero__sub{font-size:clamp(1rem,2vw,1.15rem);color:rgba(255,255,255,.68);line-height:1.65;margin-bottom:36px;max-width:540px;opacity:0;transform:translateY(30px);animation:subRise 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;}
        @keyframes subRise{to{opacity:1;transform:translateY(0);}}
        .fx-hero__stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:36px;}
        .fx-hero__stat{display:flex;flex-direction:column;padding:12px 20px;border-radius:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);transition:transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;opacity:0;transform:translateY(20px) scale(0.95);animation:statRise 0.6s cubic-bezier(0.16,1,0.3,1) forwards;}
        .stat-card:nth-child(1){animation-delay:0.7s;}
        .stat-card:nth-child(2){animation-delay:0.8s;}
        .stat-card:nth-child(3){animation-delay:0.9s;}
        .stat-card:nth-child(4){animation-delay:1.0s;}
        @keyframes statRise{to{opacity:1;transform:translateY(0) scale(1);}}
        .fx-hero__stat:hover{transform:translateY(-3px);border-color:rgba(63,203,27,0.4);box-shadow:0 8px 24px rgba(63,203,27,0.15);}
        .fx-hero__stat-val{font-size:1.5rem;font-weight:900;color:#fff;}
        .fx-hero__stat-lbl{font-size:.68rem;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.08em;margin-top:3px;}
        .fx-hero__ctas{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;opacity:0;transform:translateY(20px);animation:ctasRise 0.6s cubic-bezier(0.16,1,0.3,1) 1.1s forwards;}
        @keyframes ctasRise{to{opacity:1;transform:translateY(0);}}

/* ACCESS GLOBAL MARKETS - No gap, all items in one row */
.fx-trade-grid {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  flex-wrap: nowrap;
  width: 100%;
}

@media(max-width:1100px) {
  .fx-trade-grid {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.fx-trade-category-card {
  flex: 1;
  min-width: 180px;
  max-width: 220px;
  text-align: center;
  padding: 5px 12px 0px;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid #E5E5E5;
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.fx-trade-category-card.hovered {
  transform: translateY(-12px);
  box-shadow: 0 24px 48px rgba(0,0,0,0.12);
  border-color: #E5E5E5;
}

.fx-trade-category-image {
  width: 400px;
  height: 200px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.fx-category-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.fx-trade-category-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0A0A0A;
  margin-bottom: 4px;
  margin-top: 0;
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  /* reserve space for the overlay below */
  padding-bottom: 0;
}

.fx-trade-category-desc {
  font-size: 0.7rem;
  color: #6B6B6B;
  line-height: 1.3;
  position: relative;
  z-index: 2;
  /* this bottom padding is the space the green bar will fill */
  padding-bottom: 35px;
  margin-bottom: 0;
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

/* On hover: slide both title + desc upward by exactly the overlay height */
.fx-trade-category-card.hovered .fx-trade-category-title,
.fx-trade-category-card.hovered .fx-trade-category-desc {
  transform: translateY(-20px);
}

/* Green overlay — always exactly 52px, anchored to bottom */
.fx-trade-hover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  background: linear-gradient(135deg, #3fcb1b, #2e9c14);
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  border-radius: 0 0 var(--radius) var(--radius);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fx-trade-category-card.hovered .fx-trade-hover-overlay {
  transform: translateY(0);
}

.fx-trade-hover-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fx-trade-hover-text {
  font-size: 0.8rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.fx-trade-grid .fx-trade-category-card:nth-child(1) .fx-trade-hover-overlay,
.fx-trade-grid .fx-trade-category-card:nth-child(2) .fx-trade-hover-overlay,
.fx-trade-grid .fx-trade-category-card:nth-child(3) .fx-trade-hover-overlay,
.fx-trade-grid .fx-trade-category-card:nth-child(4) .fx-trade-hover-overlay,
.fx-trade-grid .fx-trade-category-card:nth-child(5) .fx-trade-hover-overlay {
  background: linear-gradient(135deg, #3fcb1b, #2e9c14);
}

@media(max-width: 768px) {
  .fx-trade-hover-text { font-size: 0.7rem; }
}
        /* UPGRADE SECTION - Exact reference: title+desc top-left | image center-right large | icon top-right */
        .fx-upgrade-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;}
        @media(max-width:1024px){.fx-upgrade-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.fx-upgrade-grid{grid-template-columns:1fr;}}

        .fx-upgrade-card{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:20px;
          padding:0;
          display:flex;
          flex-direction:column;
          transition:all 0.3s ease;
          position:relative;
          overflow:hidden;
          min-height:280px;
        }
        .fx-upgrade-card.hovered{transform:translateY(-6px);border-color:rgba(63,203,27,0.5);box-shadow:0 20px 40px rgba(63,203,27,0.12);background:rgba(255,255,255,0.08);}

        /* Horizontal row: text left | image right, both filling height */
        .fx-upgrade-row{
          display:flex;
          flex-direction:row;
          align-items:stretch;
          flex:1;
          height:100%;
          min-height:280px;
        }

        /* LEFT: title + desc - top aligned with padding */
        .fx-upgrade-content{
          flex:0 0 45%;
          padding:26px 0 26px 26px;
          display:flex;
          flex-direction:column;
          justify-content:flex-start;
          z-index:2;
        }
        .fx-upgrade-title{
          font-size:1.1rem;
          font-weight:800;
          color:#fff;
          margin-bottom:10px;
          line-height:1.25;
        }
        .fx-upgrade-desc{
          font-size:0.78rem;
          color:rgba(255,255,255,0.55);
          line-height:1.5;
        }

        /* RIGHT: device image - fills right half, anchored to bottom */
        .fx-upgrade-visual{
          flex:1;
          position:relative;
          display:flex;
          align-items:flex-end;
          justify-content:center;
          overflow:hidden;
          padding-bottom:0;
        }
        .fx-main-device{
          display:block;
          width:100%;
          height:auto;
          max-height:260px;
          object-fit:contain;
          object-position:bottom center;
        }
        /* Portrait phone images (cards 1,3,5) — narrower, taller */
        .fx-upgrade-card:nth-child(1) .fx-main-device,
        .fx-upgrade-card:nth-child(3) .fx-main-device,
        .fx-upgrade-card:nth-child(5) .fx-main-device {
          width:auto;
          max-width:90%;
          max-height:275px;
          object-position:bottom center;
        }
        /* Landscape laptop images (cards 2,4,6) */
        .fx-upgrade-card:nth-child(2) .fx-main-device,
        .fx-upgrade-card:nth-child(4) .fx-main-device,
        .fx-upgrade-card:nth-child(6) .fx-main-device {
          width:105%;
          max-height:260px;
        }

        /* TOP-RIGHT: floating green icon - absolutely positioned in card */
        .fx-floating-icon{
          position:absolute;
          top:22px;
          right:22px;
          width:42px;
          height:42px;
          z-index:3;
          filter:invert(61%) sepia(85%) saturate(1219%) hue-rotate(63deg) brightness(96%) contrast(90%);
        }

/* ═══ 4. MT5 SECTION STYLES with RESPONSIVE FIXES ═══ */
.fx-mt5-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 18px;
  margin-bottom: 48px;
  align-items: start;
}

@media(max-width:1024px) {
  .fx-mt5-layout { 
    grid-template-columns: 1fr; 
    gap: 40px;
  }
}

/* Animated Features */
.fx-mt5-feature {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInRight 0.5s ease forwards;
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fx-mt5-feature-icon-box {
  width: 44px;
  height: 44px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.fx-mt5-feature:hover .fx-mt5-feature-icon-box {
  transform: scale(1.1);
  background: var(--green);
  color: white;
}

.fx-mt5-feature-title {
  font-weight: 800;
  color: #0A0A0A;
  font-size: 0.95rem;
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.fx-mt5-feature:hover .fx-mt5-feature-title {
  color: var(--green);
}

.fx-mt5-feature-desc {
  font-size: 0.8rem;
  color: #6B6B6B;
  line-height: 1.5;
}

.fx-mt5-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: unset;
}

.fx-mt5-devices {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Device image responsive */
.fx-mt5-devices-img {
  width: 100%;
  max-width: 800px;
  height: auto;
  display: block;
  object-fit: contain;
}

@media(max-width: 768px) {
  .fx-mt5-devices-img {
    max-width: 100%;
    padding: 0 20px;
  }
}

/* ═══ GLASS FLOATING TABS - SMALLER, NO ZOOM/OUTLINE ON HOVER ═══ */
.fx-mt5-floating-tab {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  min-height: 70px;
  animation: floatTab 3s ease-in-out infinite;
}

/* Desktop positioning */
.fx-mt5-floating-tab.left-tab {
  left: -40px;
  top: 30%;
  min-width: 140px;
  animation-delay: 0s;
}

.fx-mt5-floating-tab.right-tab {
  right: -60px;
  bottom: 35%;
  min-width: 150px;
  animation-delay: 0.5s;
}

/* Tablet positioning */
@media(max-width: 1024px) and (min-width: 769px) {
  .fx-mt5-floating-tab.left-tab { 
    left: -20px; 
    min-width: 120px;
    padding: 8px 16px;
  }
  .fx-mt5-floating-tab.right-tab { 
    right: -20px; 
    min-width: 130px;
    padding: 8px 16px;
  }
}

/* Mobile positioning - stack vertically */
@media(max-width: 768px) {
  .fx-mt5-floating-tab {
    position: relative;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
    margin: 10px auto;
    width: 75%;
    min-width: auto;
    padding: 8px 16px;
    min-height: 65px;
    animation: floatTabMobile 3s ease-in-out infinite;
  }
  
  .fx-mt5-floating-tab.left-tab,
  .fx-mt5-floating-tab.right-tab {
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
  }
  
  .fx-mt5-visual {
    display: flex;
    flex-direction: column;
  }
  
  .fx-mt5-devices { order: 1; }
  .fx-mt5-floating-tab.left-tab { order: 2; }
  .fx-mt5-floating-tab.right-tab { order: 3; }
}

/* Hover — no zoom, no outline colour change */
.fx-mt5-floating-tab:hover {
  animation-play-state: paused;
  background: rgba(255, 255, 255, 0.45);
}

/* Floating keyframes */
@keyframes floatTab {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes floatTabMobile {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

/* Slide-in animations */
.animate-slide-left {
  animation: slideInLeft 0.6s ease-out, floatTab 3s ease-in-out infinite;
  animation-fill-mode: both;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-right {
  animation: slideInRight 0.6s ease-out, floatTab 3s ease-in-out infinite;
  animation-fill-mode: both;
  animation-delay: 0.2s;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile slide animations */
@media(max-width: 768px) {
  .animate-slide-left,
  .animate-slide-right {
    animation: slideInUp 0.6s ease-out, floatTabMobile 3s ease-in-out infinite;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Text animations */
.animate-text-pulse {
  animation: textPulse 2s ease-in-out infinite;
}

@keyframes textPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-number-pulse {
  animation: numberPulse 2s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% {
    transform: scale(1);
    color: var(--green);
  }
  50% {
    transform: scale(1.05);
    color: #2e9c14;
  }
}

.animate-up-trend {
  animation: upTrend 1.5s ease-in-out infinite;
}

@keyframes upTrend {
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-3px);
    opacity: 1;
    color: #22c55e;
  }
}

/* Tab Text Styling - Smaller sizes */
.fx-mt5-tab-title {
  font-size: 0.7rem;
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.fx-mt5-tab-value-large {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--green);
  line-height: 1;
  margin: 3px 0;
  transition: all 0.3s ease;
}

.fx-mt5-tab-subvalue {
  font-size: 0.72rem;
  font-weight: 700;
  color: #22c55e;
  line-height: 1;
  transition: all 0.3s ease;
}

.fx-mt5-tab-subtitle {
  font-size: 0.7rem;
  font-weight: 800;
  color: #000000;
  line-height: 1;
  margin-top: 4px;
  transition: all 0.3s ease;
}

/* Floating tab hover — subtle only, no colour/gradient effects */

.fx-mt5-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
  justify-content: center;
}

@media(max-width: 480px) {
  .fx-mt5-ctas {
    flex-direction: column;
    align-items: center;
  }
  
  .fx-mt5-ctas .fx-btn {
    width: 100%;
    justify-content: center;
  }
}

        /* ACCOUNTS */
        .fx-accounts{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
        @media(max-width:1024px){.fx-accounts{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.fx-accounts{grid-template-columns:1fr;}}
        .fx-account {
          position: relative;
          padding: 40px 32px; /* Increased padding for better hierarchy */
          background: rgba(255, 255, 255, .05);
          border: 1px solid rgba(255, 255, 255, .1);
          border-radius: var(--radius);
          transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
          .fx-account.hovered {
          transform: translateY(-8px);
          border-color: rgba(63, 203, 27, .5);
          background: rgba(63, 203, 27, .03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .fx-account--featured {
          border: 1px solid #3fcb1b;
          background: rgba(63, 203, 27, .06);
          /* Subtle glow for featured card */
          box-shadow: 0 0 30px rgba(63, 203, 27, 0.1);
        }
        .fx-account__badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 16px;
          border-radius: 99px;
          font-size: .7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .fx-account__name {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 24px;
          text-align: center;
        }
        .fx-account__row {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, .08);
          font-size: .9rem;
        }
        .fx-account__row:last-of-type {
          border-bottom: none;
        }
        .fx-account__key {
          color: rgba(255, 255, 255, .5);
        }
        .fx-account__val {
          font-weight: 700;
          color: #fff;
        }
        .fx-accounts-three-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }



        /* PAYMENT ICONS - Centered */
        .fx-payment-icons-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:30px;margin:40px 0;}
        .fx-payment-icon{transition:all 0.3s ease;cursor:pointer;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.08));}
        .fx-payment-icon:hover{transform:translateY(-6px);filter:drop-shadow(0 12px 20px rgba(0,0,0,0.12));}
        .fx-pay-note{text-align:center;margin-top:28px;font-size:.78rem;color:#6B6B6B;}
@media(max-width:1024px) {
          .fx-accounts-three-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 on tablets */
            gap: 20px;
          }
        }

        @media(max-width:640px) {
          .fx-accounts-three-grid {
            grid-template-columns: 1fr; /* 1 on mobile */
          }
        }
        /* GET STARTED */
      /* ═══ GET STARTED REFINED ═══ */
.fx-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
  z-index: 2;
}

@media(max-width:768px) {
  .fx-steps { grid-template-columns: 1fr; }
}

.fx-step {
  position: relative;
  padding: 40px 28px 32px;
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, .08);
  background: rgba(255, 255, 255, 0.02);
  text-align: center;
  transition: all 0.3s ease;
}

.fx-step:hover {
  border-color: rgba(63, 203, 27, 0.4);
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.04);
}

.fx-step__icon {
  width: 64px; /* Slightly larger for better icon visibility */
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: transform 0.3s ease;
}

.fx-step:hover .fx-step__icon {
  transform: scale(1.1); /* Icons "pop" on hover */
}

.fx-step__num-circle {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .9rem;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.fx-step__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.fx-step__desc {
  font-size: .88rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

.fx-step__arrow {
  display: none;
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.2);
}

@media(min-width:768px) {
  .fx-step__arrow { display: block; }
}

        /* FAQ */
        .fx-faq{max-width:720px;margin:0 auto;}
        .fx-faq__item{border-bottom:1px solid #E5E5E5;}
        .fx-faq__q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:20px 0;font-size:.95rem;font-weight:600;color:#0A0A0A;background:transparent;border:none;cursor:pointer;text-align:left;gap:16px;transition:color .2s;}
        .fx-faq__q:hover{color:var(--green);}
        .fx-faq__a{padding:0 0 20px;font-size:.88rem;color:#6B6B6B;line-height:1.65;}

 /* ═══ TRUST SECTION ═══ */
.fx-trust-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  justify-content: center;
}
@media(max-width: 1024px) {
  .fx-trust-split {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .fx-trust-split__left {
    text-align: center;
  }

  .fx-trust-split__left .fx-section__sub {
    text-align: center !important;
  }
}
.fx-trust__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
@media(max-width: 1024px) {
  .fx-trust__badges {
    justify-content: center;
  }
}
.fx-trust__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 40px;
  border: 1px solid 
#E5E5E5;
  background: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  color: 
#0A0A0A;
}
@media(max-width: 480px) {
  .fx-trust__badge {
    font-size: 0.7rem;
    padding: 6px 12px;
  }
}
.fx-trust-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  mix-blend-mode: multiply;
  filter: contrast(1.05);
  margin-bottom: 0px;
  position: relative;
  z-index: 10;
}

.fx-trust-split__right {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  overflow: visible;
}

 #trust.fx-section {
  padding-bottom: 0;
  overflow: visible;
}
@media(max-width: 480px) {
  .fx-trust-image {
    max-width: 100%;
    padding: 0 20px;
  }
}
        /* READY TO TRADE */
        /* ═══ READY TO TRADE SLIDER REFINED ═══ */
.fx-testimonials-slider {
  overflow: hidden;
  width: 100%;
  margin: 40px 0 32px;
  padding: 10px 0;
}

.fx-testimonials-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  gap: 20px;
}

.fx-testi-card {
  /* Exactly 5 items per row including gap math */
  flex: 0 0 calc(20% - 16px); 
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, .08);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.4s ease;
  
  /* Flex layout to eliminate empty top space */
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: auto;
  min-height: 220px; 
}

.fx-testi-card:hover {
  border-color: rgba(63, 203, 27, 0.5);
  background: rgba(63, 203, 27, 0.06);
  transform: translateY(-5px);
}

.fx-testi-card__quote {
  font-size: 2.2rem;
  line-height: 1;
  color: #3fcb1b;
  opacity: 0.5;
  margin-bottom: 12px; /* Pulls text up closer to quote */
  font-family: serif;
}

.fx-testi-card__text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  font-style: italic;
  margin-bottom: 20px;
  /* Multi-line truncation for alignment */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fx-testi-card__author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fx-testi-card__avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  flex-shrink: 0;
}

.fx-testi-card__name {
  font-weight: 700;
  color: #fff;
  font-size: 0.85rem;
  line-height: 1.2;
}

.fx-testi-card__role {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
}

/* Dots Styling */
.fx-slider__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fx-slider__dot.active {
  width: 24px;
  border-radius: 4px;
}

/* ═══ BUTTON & DOT ALIGNMENT FIX ═══ */
.fx-slider__dots {
  display: flex;
  justify-content: center; /* Centers dots horizontally */
  gap: 10px;
  margin: 32px 0; /* Adds consistent spacing above/below dots */
  width: 100%;
}

.fx-final-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center; /* Centers buttons horizontally */
  align-items: center;
  margin-top: 24px;
  width: 100%;
}

/* Optional: Ensure buttons have consistent height for better alignment */
.fx-final-ctas .fx-btn {
  min-height: 52px; 
  justify-content: center;
}
  
@media(max-width: 1200px) { .fx-testi-card { flex: 0 0 calc(33.33% - 14px); } }
@media(max-width: 768px) { .fx-testi-card { flex: 0 0 calc(50% - 10px); } }
@media(max-width: 480px) { .fx-testi-card { flex: 0 0 100%; } }
      `}</style>
    </>
  )
}