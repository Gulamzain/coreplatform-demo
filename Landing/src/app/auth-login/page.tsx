"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Switcher from '../componets/switcher'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight,
  Shield, Zap, Globe, Users, TrendingUp, TrendingDown,
  Activity, CheckCircle,
} from 'react-feather'

/* ── Same green theme as main page ── */
const GREEN = '#3fcb1b'

const TICKERS = [
  { n: 'EUR/USD', v: '1.08432', up: true,  c: '+0.04%' },
  { n: 'GBP/USD', v: '1.27680', up: true,  c: '+0.19%' },
  { n: 'XAU/USD', v: '2341.20', up: true,  c: '+0.35%' },
  { n: 'BTC/USD', v: '68,200',  up: true,  c: '+1.23%' },
  { n: 'NAS100',  v: '17,890',  up: true,  c: '+0.33%' },
  { n: 'USD/JPY', v: '151.22',  up: false, c: '-0.12%' },
  { n: 'US30',    v: '38,512',  up: false, c: '-0.08%' },
  { n: 'ETH/USD', v: '3,410',   up: true,  c: '+0.88%' },
]

const TRUST_ITEMS = [
  { icon: <Users    size={14} strokeWidth={1.8} />, label: '500K+ Active Clients'  },
  { icon: <Globe    size={14} strokeWidth={1.8} />, label: '170+ Global Markets'   },
  { icon: <Activity size={14} strokeWidth={1.8} />, label: 'Raw Spreads 0.0 pips'  },
  { icon: <Zap      size={14} strokeWidth={1.8} />, label: '<40ms Execution'        },
  { icon: <Shield   size={14} strokeWidth={1.8} />, label: 'FCA & ASIC Regulated'  },
  { icon: <CheckCircle size={14} strokeWidth={1.8} />, label: '24/7 Support'       },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe]     = useState(false)
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [isLoading, setIsLoading]       = useState(false)
  const [focused, setFocused]           = useState<string | null>(null)
  const [heroReady, setHeroReady]       = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      // window.location.href = 'http://localhost:3001/dashboard'
      window.location.href = 'https://gulam-dashboard.netlify.app/dashboard'
    }, 1200)
  }

  return (
    <>
      <div className="fl">

        {/* ══════════════════════
            LEFT — dark panel with modern effects
        ══════════════════════ */}
        <div className={`fl__left ${heroReady ? "hero-animate" : ""}`}>
          {/* Gradient overlay */}
          <div className="fl__left-gradient" />
          {/* Dot-grid pattern */}
          <div className="fl__left-grid" />
          {/* Diagonal lines */}
          <div className="fl__left-lines" />

          <div className="fl__left-inner">
            {/* Logo with animation */}
            <div className="fl__logo-wrapper hero-float hero-float--1">
              <Link href="/" className="fl__logo">
                <Image
                  src="/images/FoxnanceMain.png"
                  width={180}
                  height={48}
                  alt="Foxnance"
                  className="fl__logo-img"
                  style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
                  priority
                />
              </Link>
              <div className="fl__logo-glow"></div>
            </div>

            {/* Headline with animations */}
            <div className="fl__headline">
              <p className="fl__eyebrow hero-float hero-float--2">Secure Trading Platform</p>
              <h1 className="fl__h1 hero-float hero-float--3">
                <span className="hero-line hero-line--1">Welcome Back</span>
                <span className="hero-line hero-line--2">to Foxnance</span>
              </h1>
              <p className="fl__sub hero-float hero-float--4">
                Access 170+ global markets with institutional-grade execution,
                raw spreads from 0.0 pips, and real-time analytics.
              </p>
            </div>

            {/* Trust items with hover effects */}
            <div className="fl__trust-grid hero-float hero-float--5">
              {TRUST_ITEMS.map((t, i) => (
                <div key={i} className="fl__trust-item" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="fl__trust-icon">{t.icon}</div>
                  <span className="fl__trust-lbl">{t.label}</span>
                </div>
              ))}
            </div>

            {/* Live market card with floating animation */}
            <div className="fl__market-card hero-float hero-float--6">
              <div className="fl__market-top">
                <div className="fl__market-live">
                  <span className="fl__live-dot" />
                  <span>LIVE MARKETS</span>
                </div>
                <span className="fl__market-note">24/5 Trading</span>
              </div>
              <div className="fl__market-rows">
                {TICKERS.slice(0, 4).map((t, i) => (
                  <div key={i} className="fl__market-row">
                    <span className="fl__mkt-sym">{t.n}</span>
                    <span className="fl__mkt-val">{t.v}</span>
                    <span className={`fl__mkt-chg ${t.up ? 'up' : 'dn'}`}>
                      {t.up
                        ? <TrendingUp size={10} strokeWidth={2} style={{display:'inline',marginRight:2}} />
                        : <TrendingDown size={10} strokeWidth={2} style={{display:'inline',marginRight:2}} />
                      }
                      {t.c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════
            RIGHT — form panel with glass effect
        ══════════════════════ */}
        <div className="fl__right">
          <div className="fl__form-wrap">
            <div className="fl__card">
              {/* Card header */}
              <div className="fl__card-top">
                <Link href="/" className="fl__card-logo">
                  <Image src="/images/FoxnanceMain.png"
                    width={160} height={40} alt="Foxnance"
                    className="fl__card-logo-img"
                    style={{ objectFit: 'contain', height: '40px', width: 'auto' }} priority />
                </Link>
                <h2 className="fl__card-h2">Sign in to your account</h2>
                <p className="fl__card-sub">Access global markets in seconds</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="fl__form">

                {/* Email */}
                <div className="fl__field">
                  <label className="fl__field-lbl">Email Address</label>
                  <div className={`fl__field-wrap ${focused === 'email' ? 'on' : ''}`}>
                    <span className="fl__field-ico">
                      <Mail size={15} strokeWidth={1.8} />
                    </span>
                    <input
                      type="email" value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="name@example.com" required
                      className="fl__field-inp"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="fl__field">
                  <label className="fl__field-lbl">Password</label>
                  <div className={`fl__field-wrap ${focused === 'password' ? 'on' : ''}`}>
                    <span className="fl__field-ico">
                      <Lock size={15} strokeWidth={1.8} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused(null)}
                      placeholder="Enter your password" required
                      className="fl__field-inp fl__field-inp--pr"
                    />
                    <button type="button" className="fl__field-eye"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword
                        ? <EyeOff size={15} strokeWidth={1.8} />
                        : <Eye    size={15} strokeWidth={1.8} />}
                    </button>
                  </div>
                </div>

                {/* Remember + forgot */}
                <div className="fl__options">
                  <label className="fl__remember">
                    <input type="checkbox" checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="fl__chk" />
                    <span>Remember me</span>
                  </label>
                  <Link href="/auth-re-password" className="fl__forgot">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button with gradient */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`fl__submit ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading
                    ? <span className="fl__spinner" />
                    : <>Sign In <ArrowRight size={16} strokeWidth={2} /></>
                  }
                </button>

                {/* Divider */}
                <div className="fl__divider"><span>or continue with</span></div>

                {/* Social login buttons with hover effects */}
                <div className="fl__socials">
                  {[
                    { label:'Google', icon:(
                      <svg style={{width:20,height:20}} viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                        <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                        <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                        <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                      </svg>)},
                    { label:'Facebook', icon:(
                      <svg style={{width:20,height:20}} viewBox="0 0 24 24">
                        <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>)},
                    { label:'Apple', icon:(
                      <svg style={{width:20,height:20}} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
                      </svg>)},
                  ].map(s => (
                    <button key={s.label} type="button" className="fl__soc-btn" title={s.label}>
                      {s.icon}
                      <span className="fl__soc-lbl">{s.label}</span>
                    </button>
                  ))}
                </div>

                <p className="fl__signup-txt">
                  Don't have an account?{' '}
                  <Link href="/auth-signup" className="fl__signup-lnk">Create account</Link>
                </p>
                <p className="fl__demo-txt">
                  Want to try first?{' '}
                  <Link href="/demo" className="fl__demo-lnk">Open a free demo →</Link>
                </p>
              </form>
            </div>

            {/* SSL badge */}
            <p className="fl__ssl">
              <Shield size={12} strokeWidth={1.8} />
              Protected by 256-bit SSL encryption · Regulated Broker
            </p>
          </div>
        </div>
      </div>

      <Switcher />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        :root {
          --green: #3fcb1b;
          --green-dark: #2e9c14;
          --black: #0A0A0A;
          --white: #fff;
          --grey: #F5F5F5;
          --border: #E5E5E5;
          --muted: #6B6B6B;
          --radius: 12px;
        }

        /* Hide navbar on auth pages */
        body { padding-top: 0 !important; margin: 0 !important; }
        .fox-topbar { display: none !important; }
        #topnav { display: none !important; }
        #topnav + div[aria-hidden="true"] { display: none !important; }

        * { font-family: 'Aktiv Grotesk', 'Inter', -apple-system, sans-serif; box-sizing: border-box; }

        /* ══ LAYOUT ══ */
        .fl {
          min-height: 100vh; width: 100%;
          display: grid; grid-template-columns: 1fr;
          position: fixed; inset: 0; overflow-y: auto;
          z-index: 9999; background: #fff;
        }
        @media (min-width: 1024px) {
          .fl { grid-template-columns: 1fr 1fr; overflow: hidden; }
        }

        /* ══ LEFT PANEL - Modern Dark Theme ══ */
        .fl__left {
          display: none; position: relative;
          background: linear-gradient(135deg, #0A0A0A 0%, #141414 100%);
          overflow-y: auto;
        }
        @media (min-width: 1024px) { .fl__left { display: flex; } }

        .fl__left-gradient {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(63,203,27,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .fl__left-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .fl__left-lines {
          position: absolute; inset: 0; pointer-events: none;
          background-image: repeating-linear-gradient(
            45deg, transparent, transparent 20px,
            rgba(63,203,27,0.03) 20px, rgba(63,203,27,0.03) 21px
          );
        }

        .fl__left-inner {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 56px 52px; gap: 32px; width: 100%;
        }

        /* Logo with glow effect */
        .fl__logo-wrapper {
          position: relative;
          display: inline-block;
          width: fit-content;
        }
        
        .fl__logo {
          display: inline-flex;
          transition: all 0.3s ease;
        }
        
        .fl__logo-img {
          transition: all 0.3s ease;
          filter: brightness(1);
        }
        
        .fl__logo-wrapper:hover .fl__logo-img {
          transform: scale(1.02);
          filter: brightness(1.05) drop-shadow(0 0 8px rgba(63,203,27,0.3));
        }
        
        .fl__logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(63,203,27,0.2) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .fl__logo-wrapper:hover .fl__logo-glow {
          opacity: 1;
          animation: pulse 1.5s ease-in-out infinite;
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }

        .hero-float {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .hero-animate .hero-float { opacity: 1; transform: translateY(0); }
        .hero-animate .hero-float--1 { transition-delay: 0.05s; }
        .hero-animate .hero-float--2 { transition-delay: 0.15s; }
        .hero-animate .hero-float--3 { transition-delay: 0.25s; }
        .hero-animate .hero-float--4 { transition-delay: 0.35s; }
        .hero-animate .hero-float--5 { transition-delay: 0.45s; }
        .hero-animate .hero-float--6 { transition-delay: 0.55s; }

        .hero-line {
          display: block;
          opacity: 0;
          transform: translateY(30px);
          animation: lineRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .hero-line--1 { animation-delay: 0.25s; }
        .hero-line--2 { animation-delay: 0.35s; }
        
        @keyframes lineRise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Eyebrow */
        .fl__eyebrow {
          font-size: .72rem; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--green); display: block; margin-bottom: 10px;
          animation: eyebrowIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        
        @keyframes eyebrowIn {
          from { opacity: 0; letter-spacing: 0.3em; }
          to { opacity: 1; letter-spacing: 0.14em; }
        }

        .fl__h1 {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900; color: #fff;
          line-height: 1.1; letter-spacing: -.025em;
          margin: 0 0 14px;
        }

        .fl__sub {
          font-size: .92rem; color: rgba(255,255,255,0.5);
          line-height: 1.65; max-width: 400px; font-weight: 400;
        }

        /* Trust grid */
        .fl__trust-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        
        .fl__trust-item {
          display: flex; align-items: center; gap: 8px;
          font-size: .82rem; color: rgba(255,255,255,0.65); font-weight: 500;
          opacity: 0;
          transform: translateX(-10px);
          animation: slideInLeft 0.5s ease forwards;
        }
        
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .fl__trust-icon {
          width: 28px; height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          background: rgba(63,203,27,0.15); color: var(--green);
          transition: all 0.3s ease;
        }
        
        .fl__trust-item:hover .fl__trust-icon {
          transform: scale(1.1);
          background: rgba(63,203,27,0.25);
        }
        
        .fl__trust-lbl { line-height: 1.3; }

        /* Market card */
        .fl__market-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 16px;
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .fl__market-card:hover {
          border-color: rgba(63,203,27,0.3);
          background: rgba(63,203,27,0.02);
          transform: translateY(-2px);
        }
        
        .fl__market-top {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 10px;
        }
        
        .fl__market-live {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 800;
          letter-spacing: .1em; color: var(--green);
        }
        
        .fl__live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green); flex-shrink: 0;
          animation: pulseDot 1.8s infinite;
        }
        
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        .fl__market-note { font-size: 11px; color: rgba(255,255,255,0.3); }
        
        .fl__market-rows { display: flex; flex-direction: column; gap: 1px; }
        .fl__market-row {
          display: flex; align-items: center; padding: 8px 8px;
          border-radius: 8px; font-size: .8rem; transition: background .15s;
        }
        .fl__market-row:hover { background: rgba(255,255,255,0.04); transform: translateX(4px); }
        .fl__mkt-sym { width: 72px; color: #fff; font-weight: 700; font-family: monospace; }
        .fl__mkt-val { flex: 1; color: rgba(255,255,255,0.45); font-family: monospace; font-size: .78rem; }
        .fl__mkt-chg { font-weight: 700; font-size: .75rem; display: flex; align-items: center; }
        .fl__mkt-chg.up { color: #4ade80; }
        .fl__mkt-chg.dn { color: #f87171; }

        /* ══ RIGHT PANEL - Glass Effect ══ */
        .fl__right {
          display: flex; flex-direction: column;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          overflow-y: auto;
        }

        .fl__form-wrap {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 40px 20px; gap: 16px;
        }

        /* Card with glass effect */
        .fl__card {
          width: 100%; max-width: 440px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid rgba(63,203,27,0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .fl__card:hover {
          box-shadow: 0 24px 48px rgba(63,203,27,0.12);
          border-color: rgba(63,203,27,0.2);
          transform: translateY(-2px);
        }

        .fl__card-top {
          padding: 32px 28px 24px; text-align: center;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .fl__card-logo-img {
          transition: all 0.3s ease;
        }
        
        .fl__card-logo:hover .fl__card-logo-img {
          transform: scale(1.02);
        }

        .fl__card-h2 {
          font-size: 1.5rem; font-weight: 800;
          color: #0A0A0A; margin: 16px 0 8px;
          letter-spacing: -.02em;
        }

        .fl__card-sub { font-size: .85rem; color: #6B6B6B; }

        .fl__form {
          padding: 24px 28px 32px;
          display: flex; flex-direction: column; gap: 18px;
        }

        /* Form fields */
        .fl__field { display: flex; flex-direction: column; gap: 6px; }
        .fl__field-lbl {
          font-size: .8rem; font-weight: 600; color: #374151;
        }

        .fl__field-wrap {
          position: relative; display: flex; align-items: center;
          border: 1.5px solid #E5E5E5; border-radius: 10px;
          background: #fff;
          transition: all 0.2s ease;
        }
        
        .fl__field-wrap.on {
          border-color: var(--green) !important;
          box-shadow: 0 0 0 3px rgba(63,203,27,0.1);
        }

        .fl__field-ico {
          position: absolute; left: 12px;
          color: #9ca3af; display: flex; align-items: center;
          pointer-events: none; flex-shrink: 0;
        }
        
        .fl__field-wrap.on .fl__field-ico { color: var(--green); }

        .fl__field-inp {
          width: 100%; padding: 12px 12px 12px 38px;
          background: transparent; border: none; outline: none;
          font-size: .875rem; color: #0A0A0A;
        }
        
        .fl__field-inp::placeholder { color: #9ca3af; }
        .fl__field-inp--pr { padding-right: 40px; }

        .fl__field-eye {
          position: absolute; right: 10px;
          display: flex; align-items: center;
          color: #9ca3af; cursor: pointer;
          background: none; border: none; padding: 4px;
          border-radius: 4px; transition: color .2s;
        }
        .fl__field-eye:hover { color: var(--green); }

        /* Options */
        .fl__options {
          display: flex; align-items: center;
          justify-content: space-between; font-size: .82rem;
        }
        
        .fl__remember {
          display: flex; align-items: center; gap: 8px;
          color: #374151; cursor: pointer; font-weight: 500;
        }
        
        .fl__chk {
          width: 16px; height: 16px; border-radius: 4px;
          accent-color: var(--green); cursor: pointer;
        }
        
        .fl__forgot {
          color: var(--green); font-weight: 600;
          text-decoration: none; transition: all 0.2s;
        }
        .fl__forgot:hover { opacity: .75; text-decoration: underline; }

        /* Submit button */
        .fl__submit {
          width: 100%; padding: 14px 20px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%);
          color: #000;
          font-size: .9rem; font-weight: 800;
          border: none; border-radius: 10px; cursor: pointer;
          box-shadow: 0 4px 18px rgba(63,203,27,0.28);
          transition: all 0.3s ease;
        }
        
        .fl__submit:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(63,203,27,0.35);
        }
        
        .fl__submit.loading { opacity: .6; cursor: not-allowed; }
        
        .fl__spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2.5px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          animation: spin .7s linear infinite; display: inline-block;
        }
        
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Divider */
        .fl__divider {
          display: flex; align-items: center; gap: 10px;
          font-size: .75rem; color: #9ca3af;
        }
        .fl__divider::before, .fl__divider::after {
          content: ''; flex: 1; height: 1px; background: #E5E5E5;
        }

        /* Social buttons */
        .fl__socials { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
        .fl__soc-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 12px; border: 1.5px solid #E5E5E5;
          border-radius: 10px; background: #fff;
          cursor: pointer; font-size: .8rem; font-weight: 600;
          color: #374151; transition: all 0.3s ease;
        }
        .fl__soc-btn:hover {
          border-color: var(--green);
          background: rgba(63,203,27,0.05);
          transform: translateY(-2px);
        }
        .fl__soc-lbl { display: none; }
        @media (min-width: 400px) { .fl__soc-lbl { display: inline; } }

        /* Links */
        .fl__signup-txt, .fl__demo-txt {
          text-align: center; font-size: .8rem; color: #6B6B6B; margin: 0;
        }
        .fl__signup-lnk, .fl__demo-lnk {
          color: var(--green); font-weight: 700; text-decoration: none;
          transition: all 0.2s;
        }
        .fl__signup-lnk:hover, .fl__demo-lnk:hover { text-decoration: underline; }

        /* SSL badge */
        .fl__ssl {
          display: flex; align-items: center; gap: 6px;
          font-size: .7rem; color: #9ca3af; justify-content: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .fl__left-inner { padding: 40px 24px; }
          .fl__card { margin: 0 16px; }
          .fl__form { padding: 20px 24px; }
        }
      `}</style>
    </>
  )
}