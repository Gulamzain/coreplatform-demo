'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  LuLogIn, LuUserPlus, LuChevronDown, LuMenu, LuX,
  LuTrendingUp, LuMonitor, LuUsers, LuInfo, LuAward,
  LuDollarSign, LuCircleHelp, LuCoins, LuHandshake, LuCpu,
  LuSun, LuMoon, LuFileText, LuUserCheck, LuKeyRound,
  LuChartBar , LuBan, LuArrowLeftRight, LuZap,
  LuWallet, LuPowerOff, LuShieldAlert, LuPencil, LuGavel
} from 'react-icons/lu'
import { BiLineChart } from 'react-icons/bi'
import LegalNav from '@/app/componets/LegalNav/LegalNav'

const NAV_ITEMS = [
  { title:'Trading', mega:true, columns:[
    { heading:'Accounts', links:[{ name:'Accounts Overview', href:'/trading/accounts', icon:LuDollarSign }]},
    { heading:'Platform', links:[{ name:'MetaTrader 5', href:'/trading/metatrader5', icon:LuMonitor, badge:'' }]},
  ]},
  { title:'Markets', mega:true, columns:[
    { heading:'Markets', links:[
      { name:'Forex', href:'/markets/forex', icon:LuDollarSign },
      { name:'Commodities', href:'/markets/commodities', icon:LuCoins },
      { name:'Stocks', href:'/markets/stocks', icon:LuTrendingUp },
      { name:'Indices', href:'/markets/indices', icon:BiLineChart },
      { name:'Crypto', href:'/markets/crypto', icon:LuCpu },
    ]},
  ]},
  { title:'Partners', mega:false, links:[
    { name:'Partner Program', href:'/partners/partner', icon:LuHandshake },
    { name:'Sign in', href:'/auth-login/', icon:LuUsers },
    { name:'Sign Up', href:'/auth-signup/', icon:LuAward },
    { name:'Partner App', href:'/partners/LayoutDashboard', icon:LuHandshake },
  ]},
  { title:'Company', mega:false, links:[{ name:'About Us', href:'/company/about', icon:LuInfo }]},
]

function FoxNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string|null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExp, setMobileExp] = useState<string|null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>|null>(null)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll',fn,{passive:true}); window.scrollTo(0,0); return () => window.removeEventListener('scroll',fn) },[])
  useEffect(() => { setMobileOpen(false); setActiveMenu(null) },[pathname])
  const openMenu = (t:string) => { if(closeTimer.current) clearTimeout(closeTimer.current); setActiveMenu(t) }
  const closeMenu = () => { closeTimer.current = setTimeout(()=>setActiveMenu(null),120) }
  // Legal pages: always solid dark navbar
  const nb = '#000000', nbc = 'rgba(255,255,255,0.08)', nbs = scrolled?'0 2px 32px rgba(0,0,0,0.5)':'0 1px 0 rgba(255,255,255,0.08)'
  const ntc='rgba(255,255,255,0.85)', ltc='rgba(255,255,255,0.8)'
  const lbc='rgba(255,255,255,0.28)', lbg='transparent'
  const hc='rgba(255,255,255,0.85)', hbg='rgba(255,255,255,0.08)', hbr='rgba(255,255,255,0.15)'
  const db='#111111', dbc='rgba(255,255,255,0.08)', dt='rgba(255,255,255,0.65)', dib='rgba(63,203,27,0.15)', dhb='rgba(63,203,27,0.1)', ds='0 24px 64px rgba(0,0,0,0.5)'
  const mb='#000', mbc='rgba(255,255,255,0.07)', mt='rgba(255,255,255,0.85)', mm='rgba(255,255,255,0.45)', mob='rgba(255,255,255,0.2)'
  return (
    <>
      <nav id="topnav" style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,height:'80px',background:nb,borderBottom:`1px solid ${nbc}`,boxShadow:nbs,transition:'background .3s ease,box-shadow .3s ease,border-color .3s ease'}}>
        <div className="fox-nav__inner">
          <Link href="/" className="fox-nav__logo"><div className="fox-logo-wrapper"><Image src="/images/FoxnanceMain.png" width={180} height={50} alt="Foxnance" priority className="fox-logo-img" style={{objectFit:'contain',height:'48px',width:'auto'}}/><div className="fox-logo-glow"/></div></Link>
          <ul className="fox-nav__menu">
            {NAV_ITEMS.map(item => { const a=activeMenu===item.title; return (
              <li key={item.title} className="fox-nav__item" onMouseEnter={()=>openMenu(item.title)} onMouseLeave={closeMenu}>
                <button className="fox-nav__btn" style={{color:a?'#3fcb1b':ntc}}><span className="fox-nav__btn-text">{item.title}</span><LuChevronDown className={`fox-nav__chev ${a?'open':''}`}/><span className={`fox-nav__underline ${a?'show':''}`}/></button>
                {item.mega&&item.columns&&<div className={`fox-mega ${a?'fox-mega--open':''}`} style={{background:db,borderColor:dbc,boxShadow:ds}}><div className="fox-mega__grid">{item.columns.map(col=><div key={col.heading} className="fox-mega__col"><div className="fox-mega__heading" style={{borderBottomColor:dbc,color:'#3fcb1b'}}>{col.heading}</div>{col.links.map(l=><Link key={l.href} href={l.href} className="fox-mega__link" style={{color:dt,'--hover-bg':dhb,'--hover-color':'#fff','--icon-bg':dib} as any}><span className="fox-mega__icon" style={{background:dib,color:'#3fcb1b'}}><l.icon/></span>{l.name}</Link>)}</div>)}</div></div>}
                {!item.mega&&item.links&&<div className={`fox-drop ${a?'fox-drop--open':''}`} style={{background:db,borderColor:dbc,boxShadow:ds}}>{item.links.map(l=><Link key={l.href} href={l.href} className="fox-drop__link" style={{color:dt,'--hover-bg':dhb,'--hover-color':'#fff'} as any}><span style={{background:dib,color:'#3fcb1b',width:'20px',height:'20px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'5px',fontSize:'11px'}}><l.icon/></span>{l.name}</Link>)}</div>}
              </li>
            )})}
          </ul>
          <div className="fox-nav__actions">
            <Link href="/auth-login" className="fox-nav__login" style={{color:ltc,borderColor:lbc,background:lbg}}><LuLogIn/> Login</Link>
            <Link href="/auth-signup" className="fox-nav__signup" style={{color:'#000',background:'#3fcb1b'}}><LuUserPlus/> Open Account</Link>
            <button className="fox-nav__hamburger" onClick={()=>setMobileOpen(!mobileOpen)} style={{color:hc,background:hbg,borderColor:hbr}}>{mobileOpen?<LuX/>:<LuMenu/>}</button>
          </div>
        </div>
      </nav>
      <div className={`fox-mobile ${mobileOpen?'fox-mobile--open':''}`} style={{background:mb,borderLeftColor:mbc}}>
        <div className="fox-mobile__inner">
          <div className="fox-mob-ctas" style={{borderBottomColor:mbc}}>
            <Link href="/auth-login" onClick={()=>setMobileOpen(false)} className="fox-mob-btn" style={{border:`1.5px solid ${mob}`,color:mt}}>Login</Link>
            <Link href="/auth-signup" onClick={()=>setMobileOpen(false)} className="fox-mob-btn" style={{background:'linear-gradient(135deg,#3fcb1b,#2e9c14)',color:'#000'}}>Open Account</Link>
          </div>
          {NAV_ITEMS.map(item=>{const exp=mobileExp===item.title;const links=item.mega?(item.columns?.flatMap(c=>c.links)??[]):(item.links??[]);return(<div key={item.title} style={{borderBottom:`1px solid ${mbc}`}}><button className="fox-mob-trigger" style={{color:mt}} onClick={()=>setMobileExp(exp?null:item.title)}>{item.title}<LuChevronDown style={{width:'16px',height:'16px',color:exp?'#3fcb1b':mm,transform:exp?'rotate(180deg)':'none',transition:'transform .25s'}}/></button>{exp&&<div className="fox-mob-sub">{links.map(l=><Link key={l.href} href={l.href} className="fox-mob-link" style={{color:mm}} onClick={()=>setMobileOpen(false)}><span className="fox-mob-icon" style={{background:'rgba(63,203,27,0.1)',color:'#3fcb1b'}}><l.icon/></span>{l.name}</Link>)}</div>}</div>)})}
        </div>
      </div>
      {mobileOpen&&<div className="fox-mobile-backdrop" onClick={()=>setMobileOpen(false)}/>}
      <style jsx global>{`
        .fox-nav__inner{height:100%;max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:center;width:100%;}
        @media(min-width:1024px){.fox-nav__inner{padding:0 64px;}}
        .fox-nav__logo{flex-shrink:0;margin-right:60px;display:flex;align-items:center;position:relative;}
        .fox-logo-wrapper{position:relative;transition:all .3s ease;}
        .fox-logo-img{transition:all .3s ease;filter:brightness(1);}
        .fox-nav__logo:hover .fox-logo-img{transform:scale(1.02);filter:brightness(1.05) drop-shadow(0 0 8px rgba(63,203,27,0.3));}
        .fox-logo-glow{position:absolute;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(63,203,27,0.2) 0%,transparent 70%);border-radius:50%;opacity:0;transition:opacity .3s ease;pointer-events:none;}
        .fox-nav__logo:hover .fox-logo-glow{opacity:1;animation:pulse 1.5s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:translate(-50%,-50%) scale(0.8);opacity:0;}50%{transform:translate(-50%,-50%) scale(1.2);opacity:0.6;}}
        .fox-nav__menu{display:none;list-style:none;margin:0;padding:0;align-items:center;justify-content:center;flex:1;}
        @media(min-width:1024px){.fox-nav__menu{display:flex;}}
        .fox-nav__item{position:relative;}
        .fox-nav__btn{display:inline-flex;align-items:center;gap:4px;padding:0 16px;height:80px;font-size:.95rem;font-weight:600;background:none;border:none;cursor:pointer;white-space:nowrap;transition:all .3s;letter-spacing:.01em;position:relative;}
        .fox-nav__btn-text{position:relative;display:inline-block;transition:transform .2s ease;}
        .fox-nav__btn:hover .fox-nav__btn-text{transform:translateY(-1px);}
        .fox-nav__btn::after{content:'';position:absolute;bottom:0;left:50%;width:0;height:2px;background:linear-gradient(90deg,#3fcb1b,#2e9c14);transition:all .3s ease;transform:translateX(-50%);border-radius:2px;}
        .fox-nav__btn:hover::after{width:calc(100% - 32px);}
        .fox-nav__chev{width:14px;height:14px;opacity:.55;transition:transform .25s;flex-shrink:0;}
        .fox-nav__chev.open{transform:rotate(180deg);opacity:1;}
        .fox-nav__underline{position:absolute;bottom:0;left:16px;right:16px;height:2px;border-radius:2px 2px 0 0;background:linear-gradient(90deg,#3fcb1b,#2e9c14);transform:scaleX(0);transition:transform .25s;}
        .fox-nav__underline.show{transform:scaleX(1);}
        .fox-nav__actions{display:flex;align-items:center;gap:12px;flex-shrink:0;}
        .fox-nav__login{display:none;align-items:center;gap:6px;padding:8px 18px;font-size:.9rem;font-weight:700;border:1.5px solid;border-radius:8px;transition:all .2s;text-decoration:none;}
        @media(min-width:1024px){.fox-nav__login{display:inline-flex;}}
        .fox-nav__login:hover{border-color:#3fcb1b!important;color:#3fcb1b!important;background:rgba(63,203,27,0.15);transform:translateY(-1px);}
        .fox-nav__signup{display:none;align-items:center;gap:6px;padding:9px 20px;font-size:.9rem;font-weight:800;border-radius:8px;transition:all .25s;text-decoration:none;}
        @media(min-width:1024px){.fox-nav__signup{display:inline-flex;}}
        .fox-nav__signup:hover{transform:translateY(-1px) scale(1.02);background:#2e9c14;box-shadow:0 4px 12px rgba(63,203,27,0.3);}
        .fox-nav__hamburger{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:8px;border:1px solid;cursor:pointer;font-size:20px;transition:all .2s;}
        .fox-nav__hamburger:hover{transform:scale(1.05);background:rgba(255,255,255,0.2)!important;}
        @media(min-width:1024px){.fox-nav__hamburger{display:none;}}
        .fox-mega,.fox-drop{position:absolute;top:78px;}
        .fox-mega{left:50%;transform:translateX(-50%) translateY(8px);width:860px;max-width:95vw;border:1px solid;border-top:2px solid #3fcb1b;border-radius:0 0 16px 16px;opacity:0;visibility:hidden;pointer-events:none;transition:all .22s;z-index:999;padding:28px;}
        .fox-mega--open{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0);}
        .fox-mega__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .fox-mega__heading{font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid;}
        .fox-mega__link{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;font-size:.84rem;font-weight:500;margin-bottom:2px;transition:all .18s;text-decoration:none;}
        .fox-mega__link:hover{background:var(--hover-bg);color:var(--hover-color)!important;transform:translateX(4px);}
        .fox-mega__icon{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:7px;font-size:13px;}
        .fox-drop{left:0;width:220px;border:1px solid;border-top:2px solid #3fcb1b;border-radius:0 0 12px 12px;padding:8px;opacity:0;visibility:hidden;transform:translateY(8px);transition:all .22s;z-index:999;}
        .fox-drop--open{opacity:1;visibility:visible;transform:translateY(0);}
        .fox-drop__link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:.84rem;font-weight:500;text-decoration:none;transition:all .18s;}
        .fox-drop__link:hover{background:var(--hover-bg);color:var(--hover-color)!important;transform:translateX(4px);}
        .fox-mobile{position:fixed;top:80px;right:0;width:100%;max-width:420px;height:calc(100dvh - 80px);border-left:1px solid;z-index:998;overflow-y:auto;transform:translateX(100%);transition:transform .3s;}
        .fox-mobile--open{transform:translateX(0);}
        @media(min-width:1024px){.fox-mobile{display:none!important;}}
        .fox-mobile-backdrop{position:fixed;inset:0;z-index:997;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);}
        .fox-mobile__inner{padding:20px 16px 40px;}
        .fox-mob-ctas{display:flex;gap:8px;margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid;}
        .fox-mob-btn{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:10px 6px;font-size:.75rem;font-weight:700;border-radius:8px;text-decoration:none;white-space:nowrap;transition:all .2s;}
        .fox-mob-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 8px;font-size:.92rem;font-weight:700;background:none;border:none;cursor:pointer;transition:color .2s;}
        .fox-mob-trigger:hover{color:#3fcb1b;}
        .fox-mob-sub{display:grid;grid-template-columns:1fr 1fr;gap:2px;padding:4px 0 12px 8px;}
        .fox-mob-link{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:8px;font-size:.82rem;font-weight:500;text-decoration:none;transition:all .2s;}
        .fox-mob-link:hover{background:rgba(63,203,27,0.1);color:#3fcb1b!important;}
        .fox-mob-icon{width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-size:12px;flex-shrink:0;}
      `}</style>
    </>
  )
}

const SECS = [
  { id:'s1',  icon:LuFileText,       n:'01', title:'Introduction' },
  { id:'s2',  icon:LuUserCheck,      n:'02', title:'Eligibility' },
  { id:'s3',  icon:LuKeyRound,       n:'03', title:'Account Registration' },
  { id:'s4',  icon:LuChartBar ,      n:'04', title:'Trading Conditions' },
  { id:'s5',  icon:LuBan,            n:'05', title:'Prohibited Practices' },
  { id:'s6',  icon:LuArrowLeftRight, n:'06', title:'Deposits & Withdrawals' },
  { id:'s7',  icon:LuTrendingUp,     n:'07', title:'Leverage & Margin' },
  { id:'s8',  icon:LuZap,            n:'08', title:'Order Execution' },
  { id:'s9',  icon:LuWallet,         n:'09', title:'Client Funds' },
  { id:'s10', icon:LuPowerOff,       n:'10', title:'Termination' },
  { id:'s11', icon:LuShieldAlert,    n:'11', title:'Liability' },
  { id:'s12', icon:LuPencil,         n:'12', title:'Amendments' },
  { id:'s13', icon:LuGavel,          n:'13', title:'Governing Law' },
]

export default function TermsPage() {
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  const [active, setActive] = useState('s1')
  const [tocOpen, setTocOpen] = useState(false)
  useEffect(() => { document.documentElement.setAttribute('data-theme',theme) },[theme])
  useEffect(() => {
    const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-15% 0px -70% 0px'})
    SECS.forEach(s=>{const el=document.getElementById(s.id);if(el)obs.observe(el)})
    return ()=>obs.disconnect()
  },[])

  return (
    <>
      <style jsx global>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* ─── DESIGN TOKENS ─── */
:root {
  --green: #3fcb1b;
  --green-dark: #2e9c14;
  --green-dim: rgba(63,203,27,0.12);
  --green-border: rgba(63,203,27,0.22);

  /* DARK */
  --bg:         #0A0A0A;
  --bg-surface: #111111;
  --bg-card:    #161616;
  --bg-hover:   #1e1e1e;
  --border:     rgba(255,255,255,0.07);
  --text:       #D4D4D8;
  --text-muted: #71717A;
  --text-head:  #FFFFFF;
  --shadow-lg:  0 20px 60px rgba(0,0,0,0.65);
  --shadow-sm:  0 4px 16px rgba(0,0,0,0.3);
}
[data-theme="light"] {
  --bg:         #F4F4F5;
  --bg-surface: #FFFFFF;
  --bg-card:    #FAFAFA;
  --bg-hover:   #F1F5F9;
  --border:     rgba(0,0,0,0.09);
  --text:       #3F3F46;
  --text-muted: #71717A;
  --text-head:  #09090B;
  --shadow-lg:  0 8px 40px rgba(0,0,0,0.1);
  --shadow-sm:  0 2px 10px rgba(0,0,0,0.06);
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}

/* ─── PAGE SHELL ─── */
.pg{
  background:var(--bg);
  color:var(--text);
  font-family:'Inter',sans-serif;
  min-height:100vh;
  padding-top:80px;
  transition:background .28s,color .28s;
}

/* ─── THEME TOGGLE ─── */
.pg-toggle{
  position:fixed;bottom:28px;right:28px;z-index:900;
  width:46px;height:46px;border-radius:50%;
  background:var(--bg-surface);border:1.5px solid var(--border);
  color:var(--text);cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:17px;box-shadow:var(--shadow-lg);
  transition:all .22s;backdrop-filter:blur(12px);
}
.pg-toggle:hover{border-color:var(--green);color:var(--green);transform:scale(1.1);}

/* ─── HERO ─── */
.pg-hero{
  padding:68px 64px 52px;
  background:var(--bg-surface);
  border-bottom:1px solid var(--border);
  position:relative;overflow:hidden;
  transition:background .28s,border-color .28s;
}
.pg-hero-wrap{max-width:1200px;margin:0 auto;}
.pg-hero::before{
  content:'';position:absolute;top:-100px;right:-100px;
  width:480px;height:480px;pointer-events:none;
  background:radial-gradient(circle,rgba(63,203,27,.07) 0%,transparent 68%);
}
.pg-hero::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(63,203,27,.3),transparent);
}
.pg-badge{
  display:inline-flex;align-items:center;gap:7px;
  background:var(--green-dim);border:1px solid var(--green-border);
  color:var(--green);font-size:.68rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  padding:5px 14px;border-radius:99px;margin-bottom:22px;
}
.pg-badge::before{content:'';width:6px;height:6px;background:var(--green);border-radius:50%;}
.pg-hero h1{
  font-size:clamp(2rem,4vw,3rem);font-weight:900;
  color:var(--text-head);letter-spacing:-.035em;
  line-height:1.08;margin-bottom:14px;
  transition:color .28s;
}
.pg-hero-sub{max-width:560px;color:var(--text-muted);font-size:.96rem;line-height:1.72;}
.pg-hero-chips{
  margin-top:22px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;
}
.pg-chip{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--bg-card);border:1px solid var(--border);
  color:var(--text-muted);font-size:.76rem;font-weight:500;
  padding:5px 12px;border-radius:7px;
  transition:background .28s,border-color .28s,color .28s;
}
.pg-chip-dot{width:5px;height:5px;background:var(--green);border-radius:50%;}

/* ─── LAYOUT ─── */
.pg-layout{
  display:flex;max-width:1200px;margin:0 auto;
  padding:56px 64px 100px;gap:56px;
}

/* ─── SIDEBAR ─── */
.pg-sidebar{width:216px;flex-shrink:0;}
.pg-sidebar-inner{position:sticky;top:100px;}
.pg-toc-label{
  font-size:.63rem;font-weight:800;letter-spacing:.16em;
  text-transform:uppercase;color:var(--green);
  margin-bottom:14px;display:block;
}
.pg-toc-list{list-style:none;display:flex;flex-direction:column;gap:1px;}
.pg-toc-a{
  display:flex;align-items:center;gap:9px;
  padding:8px 10px;border-radius:7px;
  font-size:.8rem;font-weight:500;color:var(--text-muted);
  text-decoration:none;
  border-left:2px solid transparent;
  transition:all .18s;
}
.pg-toc-a:hover{color:var(--text-head);background:var(--bg-hover);border-left-color:rgba(63,203,27,.4);}
.pg-toc-a.on{color:var(--green);background:var(--green-dim);border-left-color:var(--green);font-weight:600;}
.pg-toc-a svg{width:11px;height:11px;flex-shrink:0;}

/* Mobile TOC */
.pg-mob-toc-btn{
  display:none;width:100%;padding:12px 16px;
  background:var(--bg-surface);border:1px solid var(--border);
  border-radius:10px;color:var(--text);font-size:.87rem;font-weight:600;
  cursor:pointer;align-items:center;justify-content:space-between;
  margin-bottom:6px;transition:all .22s;
}
.pg-mob-toc-list{
  display:none;flex-direction:column;gap:1px;
  background:var(--bg-surface);border:1px solid var(--border);
  border-radius:10px;padding:8px;margin-bottom:24px;
}
.pg-mob-toc-list.open{display:flex;}

/* ─── CONTENT ─── */
.pg-content{flex:1;min-width:0;}
.pg-updated{
  font-size:.77rem;color:var(--text-muted);
  margin-bottom:44px;display:flex;align-items:center;gap:8px;
}
.pg-updated::before{content:'';width:7px;height:7px;background:var(--green);border-radius:50%;}

/* Sections */
.pg-sec{margin-bottom:60px;scroll-margin-top:108px;}
.pg-sec-head{
  display:flex;align-items:center;gap:12px;
  margin-bottom:20px;padding-bottom:14px;
  border-bottom:1px solid var(--border);
  transition:border-color .28s;
}
.pg-sec-icon{
  width:34px;height:34px;border-radius:9px;flex-shrink:0;
  background:var(--green-dim);border:1px solid var(--green-border);
  color:var(--green);display:flex;align-items:center;justify-content:center;
  font-size:14px;
}
.pg-sec-head h2{
  font-size:1.08rem;font-weight:700;color:var(--text-head);
  transition:color .28s;flex:1;
}
.pg-num{
  font-size:.66rem;font-weight:800;color:var(--green);
  background:var(--green-dim);border:1px solid var(--green-border);
  padding:2px 8px;border-radius:4px;flex-shrink:0;letter-spacing:.04em;
}
.pg-sec p{margin-bottom:14px;font-size:.92rem;color:var(--text);line-height:1.78;}
.pg-sec h3{font-size:.9rem;font-weight:700;color:var(--text-head);margin:20px 0 10px;}

/* Lists */
.pg-ul{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:16px;}
.pg-ul li{display:flex;gap:10px;font-size:.91rem;color:var(--text);align-items:flex-start;line-height:1.65;}
.pg-ul li::before{content:'';width:6px;height:6px;min-width:6px;background:var(--green);border-radius:50%;margin-top:8px;}
.pg-ul li strong{color:var(--text-head);font-weight:600;}

/* Callouts */
.pg-callout-green{
  background:var(--green-dim);border:1px solid var(--green-border);
  border-left:3px solid var(--green);border-radius:10px;
  padding:18px 22px;margin-bottom:44px;
}
.pg-callout-green p{font-size:.91rem;color:var(--text);margin:0;line-height:1.72;}
.pg-callout-green strong{color:var(--green);font-weight:600;}

.pg-callout-red{
  background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.18);
  border-left:3px solid #ef4444;border-radius:10px;
  padding:18px 22px;margin-bottom:44px;
}
.pg-callout-red p{font-size:.91rem;color:var(--text);margin:0;line-height:1.72;}
.pg-callout-red strong{color:#f87171;font-weight:600;}
[data-theme="light"] .pg-callout-red strong{color:#dc2626;}

.pg-callout-amber{
  background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.18);
  border-left:3px solid #f59e0b;border-radius:10px;
  padding:14px 20px;margin:16px 0;
  font-size:.87rem;color:#fbbf24;line-height:1.65;
}
[data-theme="light"] .pg-callout-amber{color:#b45309;}

/* Rights grid */
.pg-rights{display:grid;grid-template-columns:repeat(auto-fill,minmax(196px,1fr));gap:10px;margin:16px 0;}
.pg-right-card{
  background:var(--bg-card);border:1px solid var(--border);
  border-radius:10px;padding:16px;
  transition:all .2s;
}
.pg-right-card:hover{border-color:var(--green-border);transform:translateY(-2px);}
.pg-right-card h4{font-size:.82rem;font-weight:700;color:var(--text-head);margin-bottom:6px;}
.pg-right-card p{font-size:.77rem;color:var(--text-muted);margin:0;line-height:1.5;}

/* Restricted grid */
.pg-restricted{display:grid;grid-template-columns:repeat(auto-fill,minmax(152px,1fr));gap:7px;margin:14px 0;}
.pg-restricted-item{
  background:var(--bg-card);border:1px solid var(--border);
  border-radius:7px;padding:8px 11px;font-size:.8rem;
  color:var(--text-muted);display:flex;align-items:center;gap:6px;
  transition:background .28s,border-color .28s;
}
.pg-restricted-item::before{content:'';width:5px;height:5px;background:#ef4444;border-radius:50%;flex-shrink:0;}

/* Contact box */
.pg-contact{
  background:var(--bg-card);border:1px solid var(--border);
  border-radius:12px;padding:26px;margin-top:18px;
  transition:background .28s,border-color .28s;
}
.pg-contact h3{font-size:.98rem;font-weight:700;color:var(--text-head);margin-bottom:12px;}
.pg-contact p{font-size:.89rem;margin-bottom:8px;color:var(--text);}
.pg-contact a{color:var(--green);text-decoration:none;font-weight:500;}
.pg-contact a:hover{text-decoration:underline;}

/* ─── FOOTER ─── */
.pg-footer{
  background:var(--bg-surface);border-top:1px solid var(--border);
  padding:36px 64px;text-align:center;
  transition:background .28s,border-color .28s;
}
.pg-footer-links{
  display:flex;justify-content:center;gap:24px;
  margin-bottom:14px;flex-wrap:wrap;list-style:none;
}
.pg-footer-links a{font-size:.79rem;font-weight:500;color:var(--text-muted);text-decoration:none;transition:color .2s;}
.pg-footer-links a:hover{color:var(--green);}
.pg-footer p{font-size:.76rem;color:var(--text-muted);line-height:1.7;max-width:680px;margin:0 auto;}

/* ─── RESPONSIVE ─── */
@media(max-width:1024px){
  .pg-hero{padding:60px 32px 48px;}
  .pg-layout{padding:48px 32px 80px;gap:40px;}
  .pg-footer{padding:32px;}
}
@media(max-width:860px){
  .pg-layout{flex-direction:column;padding:36px 20px 72px;gap:0;}
  .pg-sidebar{width:100%;margin-bottom:28px;}
  .pg-sidebar-inner{position:static;}
  .pg-toc-list{display:none;}
  .pg-mob-toc-btn{display:flex;}
  .pg-hero{padding:48px 20px 40px;}
  .pg-footer{padding:28px 20px;}
  .pg-rights{grid-template-columns:1fr 1fr;}
}
@media(max-width:540px){
  .pg-hero h1{font-size:1.8rem;}
  .pg-rights{grid-template-columns:1fr;}
  .pg-restricted{grid-template-columns:1fr 1fr;}
  .pg-toggle{bottom:20px;right:20px;width:42px;height:42px;}
  .pg-footer-links{gap:14px;}
}`}</style>
      <div className="pg">
        <FoxNavbar/>
        <LegalNav/>
        <button className="pg-toggle" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} aria-label="Toggle theme">
          {theme==='dark'?<LuSun size={18}/>:<LuMoon size={18}/>}
        </button>

        <div className="pg-hero">
          <div className="pg-hero-wrap">
            <div className="pg-badge">Legal Notice</div>
            <h1>Terms &amp; Conditions</h1>
            <p className="pg-hero-sub">These Terms govern your use of the Foxnance platform. By registering an account, you confirm that you have read, understood, and agreed to be bound by these terms in their entirety.</p>
            <div className="pg-hero-chips">
              <span className="pg-chip"><span className="pg-chip-dot"/>Last Updated: 1 January 2026</span>
              <span className="pg-chip"><span className="pg-chip-dot"/>Legally Binding</span>
            </div>
          </div>
        </div>

        <div className="pg-layout">
          <aside className="pg-sidebar">
            <div className="pg-sidebar-inner">
              <span className="pg-toc-label">On this page</span>
              <ul className="pg-toc-list">
                {SECS.map((s,i)=>(
                  <li key={s.id}><a href={`#${s.id}`} className={`pg-toc-a ${active===s.id?'on':''}`}><s.icon/>{i+1}. {s.title}</a></li>
                ))}
              </ul>
              <button className="pg-mob-toc-btn" onClick={()=>setTocOpen(o=>!o)}><span>Contents</span><span>{tocOpen?'▲':'▼'}</span></button>
              <div className={`pg-mob-toc-list ${tocOpen?'open':''}`}>
                {SECS.map((s,i)=>(
                  <a key={s.id} href={`#${s.id}`} className={`pg-toc-a ${active===s.id?'on':''}`} onClick={()=>setTocOpen(false)}><s.icon/>{i+1}. {s.title}</a>
                ))}
              </div>
            </div>
          </aside>

          <main className="pg-content">
            <p className="pg-updated">Last Updated: 1 January 2026</p>

            <section id="s1" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuFileText/></span><h2>Introduction</h2><span className="pg-num">01</span></div>
              <p>This agreement is entered into between you (the "Client") and Foxnance ("the Company"), in connection with the provision of online trading services for Foreign Exchange (Forex) contracts, Contracts for Difference (CFDs), and other derivative financial instruments.</p>
              <p>By accessing the Foxnance platform and/or opening a trading account, you confirm that you have read, understood, and accepted these Terms and Conditions in full.</p>
            </section>

            <section id="s2" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuUserCheck/></span><h2>Eligibility</h2><span className="pg-num">02</span></div>
              <p>To use Foxnance services, you must:</p>
              <ul className="pg-ul">
                <li>Be at least 18 years of age (or the legal age of majority in your jurisdiction, whichever is higher).</li>
                <li>Not be a resident of a restricted or sanctioned jurisdiction as listed in our Risk Warning.</li>
                <li>Have the legal capacity to enter into binding contracts under applicable law.</li>
                <li>Not be acting on behalf of a restricted person or entity.</li>
              </ul>
            </section>

            <section id="s3" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuKeyRound/></span><h2>Account Registration &amp; KYC</h2><span className="pg-num">03</span></div>
              <p>To open a trading account, you must submit accurate, complete, and truthful personal information, including proof of identity and proof of address, as part of our KYC and AML compliance process.</p>
              <div className="pg-callout-amber">⚠ Providing false or misleading information during registration will result in immediate account termination and may be reported to relevant authorities.</div>
            </section>

            <section id="s4" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuChartBar /></span><h2>Trading Conditions</h2><span className="pg-num">04</span></div>
              <p>Trading conditions, including spreads, commissions, leverage ratios, and available instruments, are as specified on the Foxnance website and within the trading platform. These may be subject to change and Foxnance will endeavour to notify clients of material changes.</p>
            </section>

            <section id="s5" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuBan/></span><h2>Prohibited Trading Practices</h2><span className="pg-num">05</span></div>
              <h3>Scalping &amp; HFT</h3>
              <p>Trades with a duration of less than 90 seconds are classified as scalping. Accounts where more than 30% of trades qualify as HFT are subject to trade reversal and withdrawal restriction.</p>
              <h3>Abusive Practices</h3>
              <ul className="pg-ul">
                <li><strong>Manipulative Trading:</strong> Spoofing, layering, or any deceptive practice designed to influence market prices.</li>
                <li><strong>Insider Trading:</strong> Using material non-public information to gain an unfair trading advantage.</li>
                <li><strong>Front Running:</strong> Placing orders based on advance knowledge of pending client orders.</li>
                <li><strong>Wash Trading:</strong> Simultaneously buying and selling the same instrument to create artificial volume.</li>
                <li><strong>Arbitrage Exploitation:</strong> Systematically exploiting latency or pricing errors in the Company's systems.</li>
                <li><strong>Bonus Abuse:</strong> Opening multiple accounts to improperly benefit from promotional offers.</li>
              </ul>
            </section>

            <section id="s6" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuArrowLeftRight/></span><h2>Deposits &amp; Withdrawals</h2><span className="pg-num">06</span></div>
              <p>All deposits and withdrawals must be made using payment methods registered in your name. Third-party deposits and withdrawals are not permitted. Foxnance reserves the right to delay or refuse withdrawals where there is reasonable suspicion of fraud or money laundering.</p>
            </section>

            <section id="s7" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuTrendingUp/></span><h2>Leverage &amp; Margin</h2><span className="pg-num">07</span></div>
              <p>Foxnance offers leverage of up to 1:500 on certain instruments. High leverage significantly amplifies both potential profits and potential losses. If your account equity falls below the required margin level, Foxnance will issue a margin call and may close positions automatically.</p>
            </section>

            <section id="s8" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuZap/></span><h2>Order Execution</h2><span className="pg-num">08</span></div>
              <p>Foxnance will endeavour to execute all client orders promptly at the best available price. In fast-moving or illiquid markets, execution may occur at a price different from that requested (slippage). Foxnance is not liable for losses from slippage or delays outside its reasonable control.</p>
            </section>

            <section id="s9" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuWallet/></span><h2>Client Funds</h2><span className="pg-num">09</span></div>
              <p>Client funds are held in segregated accounts, separate from the Company's own funds, in accordance with applicable regulations. Foxnance does not pay interest on client funds held in trading accounts unless expressly stated otherwise.</p>
            </section>

            <section id="s10" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuPowerOff/></span><h2>Account Termination</h2><span className="pg-num">10</span></div>
              <p>Foxnance may suspend or terminate your account immediately and without notice in the event of:</p>
              <ul className="pg-ul">
                <li>Breach of any provision of these Terms and Conditions.</li>
                <li>Suspicion of fraud, money laundering, or other illegal activity.</li>
                <li>Failure to complete or maintain KYC/AML verification.</li>
                <li>Inactivity for a period exceeding twelve (12) consecutive months.</li>
              </ul>
            </section>

            <section id="s11" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuShieldAlert/></span><h2>Limitation of Liability</h2><span className="pg-num">11</span></div>
              <p>Foxnance shall not be liable for any losses arising from market fluctuations, technical failures, third-party actions, or events beyond its reasonable control. In no event shall the Company's total liability to a Client exceed the total funds deposited by that Client.</p>
            </section>

            <section id="s12" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuPencil/></span><h2>Amendments</h2><span className="pg-num">12</span></div>
              <p>Foxnance reserves the right to amend these Terms and Conditions at any time. Clients will be notified of material changes via email or a platform notification. Continued use of the platform after any amendment constitutes acceptance of the revised terms.</p>
            </section>

            <section id="s13" className="pg-sec"><div className="pg-sec-head"><span className="pg-sec-icon"><LuGavel/></span><h2>Governing Law &amp; Disputes</h2><span className="pg-num">13</span></div>
              <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Foxnance is registered. Any dispute shall first be referred to the Company's internal complaints procedure.</p>
              <p>For complaints: <a href="mailto:support@foxnance.com" style={{color:'var(--green)',textDecoration:'none',fontWeight:500}}>support@foxnance.com</a></p>
            </section>
          </main>
        </div>

        <footer className="pg-footer">
          <ul className="pg-footer-links">
            <li><Link href="/risk-warning">Risk Warning</Link></li>
            <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><a href="mailto:support@foxnance.com">Contact Us</a></li>
          </ul>
          <p><strong style={{color:'var(--text)'}}>Risk Warning:</strong> Trading CFDs and Forex involves significant risk of loss. © 2026 Foxnance. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}