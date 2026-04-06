"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Switcher from '../componets/switcher'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight,
  Shield, Zap, Globe, Users, Activity,
  CheckCircle, User, Phone,
  TrendingUp, TrendingDown,
} from 'react-feather'

/* ── Same green theme as main page ── */
const GREEN = '#3fcb1b'

const COUNTRIES = [
  "United States","United Kingdom","Canada","Australia",
  "Germany","France","Japan","Singapore","UAE","India",
  "Brazil","South Africa","Nigeria","Kenya","Pakistan",
]

const BENEFITS = [
  { icon: <CheckCircle size={14} strokeWidth={1.8}/>, label: 'Zero Commission'       },
  { icon: <Zap         size={14} strokeWidth={1.8}/>, label: 'Fast Execution'        },
  { icon: <Activity    size={14} strokeWidth={1.8}/>, label: 'Raw Spreads 0.0 pips'  },
  { icon: <Globe       size={14} strokeWidth={1.8}/>, label: '170+ Markets'          },
  { icon: <Shield      size={14} strokeWidth={1.8}/>, label: 'FCA & ASIC Regulated'  },
  { icon: <Users       size={14} strokeWidth={1.8}/>, label: '24/7 Support'          },
]

const TICKERS = [
  { n:'EUR/USD', v:'1.08432', up:true,  c:'+0.04%' },
  { n:'GBP/USD', v:'1.27680', up:true,  c:'+0.19%' },
  { n:'XAU/USD', v:'2341.20', up:true,  c:'+0.35%' },
  { n:'BTC/USD', v:'68,200',  up:true,  c:'+1.23%' },
  { n:'USD/JPY', v:'151.22',  up:false, c:'-0.12%' },
]

export default function SignupPage() {
  const [showPassword,        setShowPassword]        = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms,          setAgreeTerms]          = useState(false)
  const [isLoading,           setIsLoading]           = useState(false)
  const [focused,             setFocused]             = useState<string | null>(null)
  const [heroReady,           setHeroReady]           = useState(false)
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    password: '', confirmPassword: '', country: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) return
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = 'http://localhost:3001/dashboard'
    }, 1200)
  }

  return (
    <>
      <div className="fs">

        {/* ══════════════════════
            LEFT — dark panel with modern effects
        ══════════════════════ */}
        <div className={`fs__left ${heroReady ? "hero-animate" : ""}`}>
          {/* Gradient overlay */}
          <div className="fs__left-gradient" />
          {/* Dot-grid pattern */}
          <div className="fs__left-grid" />
          {/* Diagonal lines */}
          <div className="fs__left-lines" />

          <div className="fs__left-inner">
            {/* Logo with animation */}
            <div className="fs__logo-wrapper hero-float hero-float--1">
              <Link href="/" className="fs__logo">
                <Image
                  src="/images/FoxnanceMain.png"
                  width={180}
                  height={48}
                  alt="Foxnance"
                  className="fs__logo-img"
                  style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
                  priority
                />
              </Link>
              <div className="fs__logo-glow"></div>
            </div>

            {/* Headline with animations */}
            <div className="fs__headline">
              <p className="fs__eyebrow hero-float hero-float--2">Join 500,000+ Traders</p>
              <h1 className="fs__h1 hero-float hero-float--3">
                <span className="hero-line hero-line--1">Start Your Trading</span>
                <span className="hero-line hero-line--2">Journey with Foxnance</span>
              </h1>
              <p className="fs__sub hero-float hero-float--4">
                Create your account in minutes and access 170+ global markets
                with professional-grade tools and raw spreads from 0.0 pips.
              </p>
            </div>

            {/* Benefits with slide animations */}
            <div className="fs__benefits">
              {BENEFITS.map((b, i) => (
                <div key={i} className="fs__benefit" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="fs__benefit-icon">{b.icon}</div>
                  <span className="fs__benefit-lbl">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Stats strip with hover effects */}
            <div className="fs__stats hero-float hero-float--5">
              {[
                { val:'0.0',  sub:'pip spreads' },
                { val:'170+', sub:'markets'     },
                { val:'1:500',sub:'leverage'    },
              ].map((s, i) => (
                <div key={i} className="fs__stat">
                  <div className="fs__stat-val">{s.val}</div>
                  <div className="fs__stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Testimonial with floating animation */}
            <div className="fs__quote hero-float hero-float--6">
              <p className="fs__quote-text">
                "Foxnance transformed my trading. Platform is intuitive, support is
                excellent, and spreads are the best I've found anywhere."
              </p>
              <div className="fs__quote-author">
                <div className="fs__quote-avatar">MC</div>
                <div>
                  <div className="fs__quote-name">Michael Chen</div>
                  <div className="fs__quote-role">Professional Trader · 5 years</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════
            RIGHT — form panel with glass effect
        ══════════════════════ */}
        <div className="fs__right">
          <div className="fs__form-wrap">
            <div className="fs__card">
              {/* Card header */}
              <div className="fs__card-top">
                <Link href="/" className="fs__card-logo">
                  <Image src="/images/FoxnanceMain.png"
                    width={160} height={40} alt="Foxnance"
                    className="fs__card-logo-img"
                    style={{ objectFit: 'contain', height: '40px', width: 'auto' }} priority />
                </Link>
                <h2 className="fs__card-h2">Create your account</h2>
                <p className="fs__card-sub">Get started in minutes — free forever</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="fs__form">

                {/* Full Name */}
                <div className="fs__field">
                  <label className="fs__field-lbl">Full Name</label>
                  <div className={`fs__field-wrap ${focused==='fullName'?'on':''}`}>
                    <span className="fs__field-ico"><User size={14} strokeWidth={1.8}/></span>
                    <input type="text" name="fullName" value={formData.fullName}
                      onChange={handleChange}
                      onFocus={()=>setFocused('fullName')} onBlur={()=>setFocused(null)}
                      placeholder="John Doe" required className="fs__field-inp" />
                  </div>
                </div>

                {/* Email */}
                <div className="fs__field">
                  <label className="fs__field-lbl">Email Address</label>
                  <div className={`fs__field-wrap ${focused==='email'?'on':''}`}>
                    <span className="fs__field-ico"><Mail size={14} strokeWidth={1.8}/></span>
                    <input type="email" name="email" value={formData.email}
                      onChange={handleChange}
                      onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)}
                      placeholder="name@example.com" required className="fs__field-inp" />
                  </div>
                </div>

                {/* Phone + Country — 2 col */}
                <div className="fs__row">
                  <div className="fs__field">
                    <label className="fs__field-lbl">Phone</label>
                    <div className={`fs__field-wrap ${focused==='phone'?'on':''}`}>
                      <span className="fs__field-ico"><Phone size={14} strokeWidth={1.8}/></span>
                      <input type="tel" name="phone" value={formData.phone}
                        onChange={handleChange}
                        onFocus={()=>setFocused('phone')} onBlur={()=>setFocused(null)}
                        placeholder="+1 234 567 890" required className="fs__field-inp" />
                    </div>
                  </div>
                  <div className="fs__field">
                    <label className="fs__field-lbl">Country</label>
                    <div className={`fs__field-wrap ${focused==='country'?'on':''}`}>
                      <span className="fs__field-ico"><Globe size={14} strokeWidth={1.8}/></span>
                      <select name="country" value={formData.country}
                        onChange={handleChange}
                        onFocus={()=>setFocused('country')} onBlur={()=>setFocused(null)}
                        required className="fs__field-inp fs__field-sel">
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="fs__field">
                  <label className="fs__field-lbl">Password</label>
                  <div className={`fs__field-wrap ${focused==='password'?'on':''}`}>
                    <span className="fs__field-ico"><Lock size={14} strokeWidth={1.8}/></span>
                    <input type={showPassword?'text':'password'} name="password"
                      value={formData.password} onChange={handleChange}
                      onFocus={()=>setFocused('password')} onBlur={()=>setFocused(null)}
                      placeholder="Create a strong password" required
                      className="fs__field-inp fs__field-inp--pr" />
                    <button type="button" className="fs__field-eye"
                      onClick={()=>setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={14} strokeWidth={1.8}/> : <Eye size={14} strokeWidth={1.8}/>}
                    </button>
                  </div>
                  <p className="fs__field-hint">Min 8 characters with a number and a letter</p>
                </div>

                {/* Confirm Password */}
                <div className="fs__field">
                  <label className="fs__field-lbl">Confirm Password</label>
                  <div className={`fs__field-wrap ${focused==='confirm'?'on':''}`}>
                    <span className="fs__field-ico"><Lock size={14} strokeWidth={1.8}/></span>
                    <input type={showConfirmPassword?'text':'password'} name="confirmPassword"
                      value={formData.confirmPassword} onChange={handleChange}
                      onFocus={()=>setFocused('confirm')} onBlur={()=>setFocused(null)}
                      placeholder="Re-enter your password" required
                      className="fs__field-inp fs__field-inp--pr" />
                    <button type="button" className="fs__field-eye"
                      onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff size={14} strokeWidth={1.8}/> : <Eye size={14} strokeWidth={1.8}/>}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="fs__terms">
                  <input type="checkbox" checked={agreeTerms}
                    onChange={e=>setAgreeTerms(e.target.checked)}
                    className="fs__chk" />
                  <span>
                    I agree to the{' '}
                    <Link href="/terms" className="fs__tlink">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="fs__tlink">Privacy Policy</Link>
                  </span>
                </label>

                {/* Submit button with gradient */}
                <button type="submit" disabled={!agreeTerms||isLoading}
                  className={`fs__submit ${(!agreeTerms||isLoading)?'off':''}`}>
                  {isLoading
                    ? <span className="fs__spinner"/>
                    : <><span>Create Account</span><ArrowRight size={16} strokeWidth={2}/></>
                  }
                </button>

                {/* Divider */}
                <div className="fs__divider"><span>or sign up with</span></div>

                {/* Socials with hover effects */}
                <div className="fs__socials">
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
                    <button key={s.label} type="button" className="fs__soc-btn" title={s.label}>
                      {s.icon}
                      <span className="fs__soc-lbl">{s.label}</span>
                    </button>
                  ))}
                </div>

                <p className="fs__signin-txt">
                  Already have an account?{' '}
                  <Link href="/auth-login" className="fs__signin-lnk">Sign in</Link>
                </p>
                <p className="fs__demo-txt">
                  Want to try first?{' '}
                  <Link href="/demo" className="fs__demo-lnk">Open a free demo →</Link>
                </p>

              </form>
            </div>

            <p className="fs__ssl">
              <Shield size={12} strokeWidth={1.8}/>
              256-bit SSL encryption · Regulated Broker · Segregated Funds
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
        body        { padding-top: 0 !important; margin: 0 !important; }
        .fox-topbar { display: none !important; }
        #topnav     { display: none !important; }
        #topnav + div[aria-hidden="true"] { display: none !important; }

        * { font-family: 'Aktiv Grotesk','Inter',-apple-system,sans-serif; box-sizing: border-box; }

        /* ══ LAYOUT ══ */
        .fs {
          min-height:100vh; width:100%;
          display:grid; grid-template-columns:1fr;
          position:fixed; inset:0; overflow-y:auto;
          z-index:9999; background:#fff;
        }
        @media(min-width:1024px){
          .fs { grid-template-columns:1fr 1fr; overflow:hidden; }
        }

        /* ══ LEFT PANEL - Modern Dark Theme ══ */
        .fs__left {
          display:none; position:relative;
          background: linear-gradient(135deg, #0A0A0A 0%, #141414 100%);
          overflow-y:auto;
        }
        @media(min-width:1024px){ .fs__left { display:flex; } }

        .fs__left-gradient {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(63,203,27,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .fs__left-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        
        .fs__left-lines {
          position:absolute; inset:0; pointer-events:none;
          background-image: repeating-linear-gradient(
            45deg, transparent, transparent 20px,
            rgba(63,203,27,0.03) 20px, rgba(63,203,27,0.03) 21px
          );
        }
        
        .fs__left-inner {
          position:relative; z-index:2;
          display:flex; flex-direction:column; justify-content:center;
          padding:48px 48px; gap:28px; width:100%;
        }

        /* Logo with glow effect */
        .fs__logo-wrapper {
          position: relative;
          display: inline-block;
          width: fit-content;
        }
        
        .fs__logo {
          display: inline-flex;
          transition: all 0.3s ease;
        }
        
        .fs__logo-img {
          transition: all 0.3s ease;
          filter: brightness(1);
        }
        
        .fs__logo-wrapper:hover .fs__logo-img {
          transform: scale(1.02);
          filter: brightness(1.05) drop-shadow(0 0 8px rgba(63,203,27,0.3));
        }
        
        .fs__logo-glow {
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
        
        .fs__logo-wrapper:hover .fs__logo-glow {
          opacity: 1;
          animation: pulse 1.5s ease-in-out infinite;
        }

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

        /* Hero animations */
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
        .fs__eyebrow {
          font-size:.72rem; font-weight:700;
          letter-spacing:.14em; text-transform:uppercase;
          color: var(--green); display:block; margin-bottom:10px;
          animation: eyebrowIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        
        @keyframes eyebrowIn {
          from { opacity: 0; letter-spacing: 0.3em; }
          to { opacity: 1; letter-spacing: 0.14em; }
        }
        
        .fs__h1 {
          font-size:clamp(1.8rem,3vw,2.6rem); font-weight:900; color:#fff;
          line-height:1.1; letter-spacing:-.025em; margin:0 0 12px;
        }
        .fs__sub {
          font-size:.88rem; color:rgba(255,255,255,0.5);
          line-height:1.65; max-width:400px; font-weight:400;
        }

        /* Benefits */
        .fs__benefits { 
          display:grid; 
          grid-template-columns:1fr 1fr; 
          gap:10px; 
        }
        .fs__benefit  { 
          display:flex; 
          align-items:center; 
          gap:8px; 
          font-size:.8rem; 
          color:rgba(255,255,255,0.65); 
          font-weight:500;
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
        
        .fs__benefit-icon {
          width:26px; height:26px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          border-radius:7px; background:rgba(63,203,27,0.15); color: var(--green);
          transition: all 0.3s ease;
        }
        
        .fs__benefit:hover .fs__benefit-icon {
          transform: scale(1.1);
          background: rgba(63,203,27,0.25);
        }
        
        .fs__benefit-lbl { line-height:1.3; }

        /* Stats strip */
        .fs__stats {
          display:flex; gap:0;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:12px; overflow:hidden;
          transition: all 0.3s ease;
        }
        
        .fs__stats:hover {
          border-color: rgba(63,203,27,0.3);
          transform: translateY(-2px);
        }
        
        .fs__stat {
          flex:1; padding:12px 8px; text-align:center;
          border-right:1px solid rgba(255,255,255,0.07);
          transition: all 0.3s ease;
        }
        .fs__stat:last-child { border-right:none; }
        .fs__stat:hover { background: rgba(63,203,27,0.05); }
        .fs__stat-val {
          font-size:1.25rem; font-weight:900; color: var(--green);
        }
        .fs__stat-sub {
          font-size:.62rem; color:rgba(255,255,255,0.4);
          text-transform:uppercase; letter-spacing:.06em; margin-top:3px;
        }

        /* Testimonial quote */
        .fs__quote {
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:12px; padding:14px;
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .fs__quote:hover {
          border-color: rgba(63,203,27,0.3);
          background: rgba(63,203,27,0.02);
          transform: translateY(-2px);
        }
        
        .fs__quote-text {
          font-size:.8rem; color:rgba(255,255,255,0.6);
          line-height:1.6; font-style:italic; margin:0 0 10px;
        }
        .fs__quote-author { display:flex; align-items:center; gap:10px; }
        .fs__quote-avatar {
          width:32px; height:32px; border-radius:50%; flex-shrink:0;
          background: var(--green);
          display:flex; align-items:center; justify-content:center;
          font-size:.7rem; font-weight:800; color:#000;
        }
        .fs__quote-name { font-size:.8rem; font-weight:700; color:#fff; }
        .fs__quote-role { font-size:.7rem; color:rgba(255,255,255,0.4); }

        /* ══ RIGHT PANEL - Glass Effect ══ */
        .fs__right {
          display:flex; flex-direction:column;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          overflow-y:auto;
        }

        .fs__form-wrap {
          flex:1; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          padding:32px 20px; gap:14px;
        }

        /* Card with glass effect */
        .fs__card {
          width:100%; max-width:480px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid rgba(63,203,27,0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .fs__card:hover {
          box-shadow: 0 24px 48px rgba(63,203,27,0.12);
          border-color: rgba(63,203,27,0.2);
          transform: translateY(-2px);
        }

        .fs__card-top {
          padding:22px 24px 18px; text-align:center;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        
        .fs__card-logo-img {
          transition: all 0.3s ease;
        }
        
        .fs__card-logo:hover .fs__card-logo-img {
          transform: scale(1.02);
        }
        
        .fs__card-h2 {
          font-size:1.2rem; font-weight:800; color:#0A0A0A;
          margin:12px 0 3px; letter-spacing:-.015em;
        }
        .fs__card-sub { font-size:.8rem; color:#6B6B6B; }

        .fs__form {
          padding:18px 24px 24px;
          display:flex; flex-direction:column; gap:12px;
        }

        /* Two-column row */
        .fs__row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }

        /* Fields */
        .fs__field { display:flex; flex-direction:column; gap:4px; }
        .fs__field-lbl { font-size:.78rem; font-weight:600; color:#374151; }

        .fs__field-wrap {
          position:relative; display:flex; align-items:center;
          border:1.5px solid #E5E5E5; border-radius:9px;
          background:#fff;
          transition: all 0.2s ease;
        }
        
        .fs__field-wrap.on {
          border-color: var(--green) !important;
          box-shadow: 0 0 0 3px rgba(63,203,27,0.1);
        }

        .fs__field-ico {
          position:absolute; left:11px; color:#9ca3af;
          display:flex; align-items:center; pointer-events:none; flex-shrink:0;
        }
        .fs__field-wrap.on .fs__field-ico { color: var(--green); }

        .fs__field-inp {
          width:100%; padding:10px 11px 10px 34px;
          background:transparent; border:none; outline:none;
          font-size:.84rem; color:#0A0A0A;
        }
        .fs__field-inp::placeholder { color:#9ca3af; }
        .fs__field-inp--pr { padding-right:36px; }
        .fs__field-sel { cursor:pointer; appearance:none; }

        .fs__field-eye {
          position:absolute; right:9px;
          display:flex; align-items:center;
          color:#9ca3af; cursor:pointer;
          background:none; border:none; padding:3px; border-radius:4px;
          transition:color .2s;
        }
        .fs__field-eye:hover { color: var(--green); }
        .fs__field-hint { font-size:.7rem; color:#9ca3af; margin:0; }

        /* Terms */
        .fs__terms {
          display:flex; align-items:flex-start; gap:9px;
          font-size:.79rem; color:#374151; cursor:pointer; line-height:1.5;
        }
        .fs__chk {
          width:15px; height:15px; border-radius:4px;
          accent-color: var(--green); cursor:pointer; flex-shrink:0; margin-top:2px;
        }
        .fs__tlink { color: var(--green); font-weight:600; text-decoration:none; }
        .fs__tlink:hover { text-decoration:underline; }

        /* Submit button with gradient */
        .fs__submit {
          width:100%; padding:12px 18px;
          display:flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%);
          color: #000;
          font-size:.9rem; font-weight:800;
          border:none; border-radius:10px; cursor:pointer;
          box-shadow: 0 4px 18px rgba(63,203,27,0.28);
          transition: all 0.3s ease;
        }
        .fs__submit:hover:not(.off) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(63,203,27,0.35);
        }
        .fs__submit.off { opacity:.45; cursor:not-allowed; }
        .fs__spinner {
          width:17px; height:17px; border-radius:50%;
          border:2.5px solid rgba(0,0,0,0.3); border-top-color:#000;
          animation:spin .7s linear infinite; display:inline-block;
        }
        
        @keyframes spin { to { transform:rotate(360deg); } }

        /* Divider */
        .fs__divider {
          display:flex; align-items:center; gap:10px;
          font-size:.75rem; color:#9ca3af;
        }
        .fs__divider::before,.fs__divider::after {
          content:''; flex:1; height:1px; background:#E5E5E5;
        }

        /* Socials */
        .fs__socials { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
        .fs__soc-btn {
          display:flex; align-items:center; justify-content:center; gap:7px;
          padding:9px 10px; border:1.5px solid #E5E5E5;
          border-radius:10px; background:#fff;
          cursor:pointer; font-size:.78rem; font-weight:600;
          color:#374151; transition: all 0.3s ease;
        }
        .fs__soc-btn:hover {
          border-color: var(--green);
          background: rgba(63,203,27,0.05);
          transform: translateY(-2px);
        }
        .fs__soc-lbl { display:none; }
        @media(min-width:400px){ .fs__soc-lbl { display:inline; } }

        /* Links */
        .fs__signin-txt,.fs__demo-txt {
          text-align:center; font-size:.79rem; color:#6B6B6B; margin:0;
        }
        .fs__signin-lnk,.fs__demo-lnk { 
          color: var(--green); font-weight:700; text-decoration:none;
          transition: all 0.2s;
        }
        .fs__signin-lnk:hover, .fs__demo-lnk:hover { text-decoration:underline; }

        /* SSL */
        .fs__ssl {
          display:flex; align-items:center; gap:6px;
          font-size:.7rem; color:#9ca3af; justify-content:center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .fs__left-inner { padding: 40px 24px; }
          .fs__card { margin: 0 16px; }
          .fs__form { padding: 18px 20px; }
        }
      `}</style>
    </>
  )
}