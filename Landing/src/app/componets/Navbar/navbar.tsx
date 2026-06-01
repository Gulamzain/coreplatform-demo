'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LuLogIn, LuUserPlus, LuChevronDown, LuMenu, LuX,
  LuTrendingUp, LuMonitor, LuGlobe, LuSmartphone,
  LuBook, LuCalendar, LuUsers, LuShield, LuPhone,
  LuZap, LuCpu, LuLayers, LuActivity, LuInfo,
  LuAward, LuDollarSign, LuCircleHelp,LuCoins,LuHandshake,LuBriefcase
} from 'react-icons/lu';
import { BiBarChart, BiLineChart } from 'react-icons/bi';
const LuHelpCircle = LuCircleHelp;

const NAV_ITEMS = [
  {
    title: 'Trading',
    mega: true,
    columns: [
      {
        heading: 'Accounts',
        links: [
          { name: 'Accounts Overview', href: '/trading/accounts', icon: LuDollarSign },
          // { name: 'Raw Spread Account', href: '/trading/raw-spread', icon: LuActivity },
          // { name: 'Swap Free Account', href: '/trading/swap-free', icon: LuShield },
          // { name: 'Demo Account', href: '/trading/demo', icon: LuMonitor },
        ],
      },
      {
        heading: 'Platform',
        links: [
          { name: 'MetaTrader 5', href: '/trading/metatrader5', icon: LuMonitor, badge: '' },
          // { name: 'MetaTrader 4', href: '/platforms/mt4', icon: LuMonitor },
          // { name: 'WebTrader', href: '/platforms/web', icon: LuGlobe },
          // { name: 'Mobile App', href: '/platforms/mobile', icon: LuSmartphone },
        ],
      },
      // {
      //   heading: 'Learn',
      //   links: [
      //     { name: 'Education Center', href: '/education', icon: LuBook },
      //     { name: 'Trading Basics', href: '/education/forex', icon: BiBarChart },
      //     { name: 'Webinars', href: '/education/webinars', icon: LuUsers },
      //     { name: 'Video Tutorials', href: '/education/videos', icon: LuMonitor },
      //   ],
      // },
    ],
  },
  {
    title: 'Markets',
    mega: true,
    columns: [
      {
        heading: 'Markets',
        links: [
          { name: 'Forex', href: '/markets/forex', icon: LuDollarSign },
          { name: 'Commodities', href: '/markets/commodities', icon: LuCoins },
          { name: 'Stocks', href: '/markets/stocks', icon: LuTrendingUp },
          { name: 'Indices', href: '/markets/indices', icon: BiLineChart },
          { name: 'Crypto', href: '/markets/crypto', icon: LuCpu },
        ],
      },
    ],
  },
  {
    title: 'Partners',
    mega: false,
    links: [
      { name: 'Partner Program', href: '/partners/partner', icon: LuHandshake },
      { name: 'Sign in', href: '/auth-login/', icon: LuUsers },
      { name: 'Sign Up', href: '/auth-signup/', icon: LuAward },
       { name: 'Partner App', href: '/partners/partnerapp', icon: LuHandshake },
    ],
  },
  {
    title: 'Company',
    mega: false,
    links: [
      { name: 'About Us', href: '/company/about', icon: LuInfo },
      // { name: 'Contact', href: '/contact-one', icon: LuPhone },
      // { name: 'Regulation', href: '/regulation', icon: LuShield },
      // { name: 'Careers', href: '/careers', icon: LuBriefcase },
    ],
  },
];
export default function Navbar(props: { navClass: any; navJustify: any; bg: any }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.scrollTo(0, 0);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveMenu(null); }, [pathname]);

  const openMenu = (t: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveMenu(t); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setActiveMenu(null), 120); };

  // CRITICAL: Transparent when not scrolled, black only when scrolled
  const navBackground = scrolled ? '#000000' : 'transparent';
  const navBorderColor = scrolled ? 'rgba(255,255,255,0.08)' : 'transparent';
  const navBoxShadow = scrolled ? '0 2px 32px rgba(0,0,0,0.5)' : 'none';
  const navTextColor = 'rgba(255,255,255,0.85)';
  const loginTextColor = 'rgba(255,255,255,0.8)';
  const loginBorderCol = scrolled ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.4)';
  const loginBackground = scrolled ? 'transparent' : 'rgba(255,255,255,0.1)';
  const hamColor = 'rgba(255,255,255,0.85)';
  const hamBg = scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)';
  const hamBorder = scrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)';

  // Logo - Larger size
  const logoSrc = '/images/FoxnanceMain.png';

  // Dropdown colours — green accent
  const dropBg = '#111111';
  const dropBorderCol = 'rgba(255,255,255,0.08)';
  const dropText = 'rgba(255,255,255,0.65)';
  const dropTextHover = '#ffffff';
  const dropIconBg = 'rgba(63,203,27,0.15)';
  const dropHoverBg = 'rgba(63,203,27,0.1)';
  const dropShadow = '0 24px 64px rgba(0,0,0,0.5)';

  // Mobile drawer colours
  const mobBg = '#000000';
  const mobBorderCol = 'rgba(255,255,255,0.07)';
  const mobText = 'rgba(255,255,255,0.85)';
  const mobMuted = 'rgba(255,255,255,0.45)';
  const mobOutlineBdr = 'rgba(255,255,255,0.2)';

  return (
    <>
      <nav
        id="topnav"
        style={{
          position: 'fixed', 
          top: '0px', 
          left: 0, 
          right: 0,
          zIndex: 1000, 
          height: '80px',
          background: navBackground,
          borderBottom: `1px solid ${navBorderColor}`,
          boxShadow: navBoxShadow,
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="fox-nav__inner">
          {/* LOGO - Larger with animation */}
          <Link href="/" className="fox-nav__logo">
            <div className="fox-logo-wrapper">
              <Image
                src={logoSrc}
                width={180}
                height={50}
                alt="Foxnance"
                priority
                className="fox-logo-img"
                style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
              />
              <div className="fox-logo-glow"></div>
            </div>
          </Link>

          {/* DESKTOP MENU - Center Aligned */}
          <ul className="fox-nav__menu">
            {NAV_ITEMS.map((item) => {
              const active = activeMenu === item.title;
              return (
                <li key={item.title} className="fox-nav__item"
                  onMouseEnter={() => openMenu(item.title)}
                  onMouseLeave={closeMenu}
                >
                  <button
                    className="fox-nav__btn"
                    style={{ color: active ? '#3fcb1b' : navTextColor }}
                  >
                    <span className="fox-nav__btn-text">{item.title}</span>
                    <LuChevronDown className={`fox-nav__chev ${active ? 'open' : ''}`} />
                    <span className={`fox-nav__underline ${active ? 'show' : ''}`} />
                  </button>

                  {item.mega && item.columns && (
                    <div className={`fox-mega ${active ? 'fox-mega--open' : ''}`}
                      style={{ background: dropBg, borderColor: dropBorderCol, boxShadow: dropShadow }}
                    >
                      <div className="fox-mega__grid">
                        {item.columns.map((col) => (
                          <div key={col.heading} className="fox-mega__col">
                            <div className="fox-mega__heading" style={{ borderBottomColor: dropBorderCol, color: '#3fcb1b' }}>{col.heading}</div>
                            {col.links.map((link) => (
                              <Link key={link.href} href={link.href}
                                className="fox-mega__link"
                                style={{ color: dropText, '--hover-bg': dropHoverBg, '--hover-color': dropTextHover, '--icon-bg': dropIconBg } as React.CSSProperties}
                              >
                                <span className="fox-mega__icon" style={{ background: dropIconBg, color: '#3fcb1b' }}>
                                  <link.icon />
                                </span>
                                <span className="fox-mega__link-inner">
                                  {link.name}
                                  {'badge' in link && link.badge && (
                                    <span className="fox-mega__badge" style={{ background: 'rgba(63,203,27,0.15)', color: '#3fcb1b' }}>{link.badge}</span>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ))}
                       
                      </div>
                    </div>
                  )}

                  {!item.mega && item.links && (
                    <div className={`fox-drop ${active ? 'fox-drop--open' : ''}`}
                      style={{ background: dropBg, borderColor: dropBorderCol, boxShadow: dropShadow }}
                    >
                      {item.links.map((link) => (
                        <Link key={link.href} href={link.href}
                          className="fox-drop__link"
                          style={{ color: dropText, '--hover-bg': dropHoverBg, '--hover-color': dropTextHover, '--icon-bg': dropIconBg } as React.CSSProperties}
                        >
                          <span className="fox-drop__icon" style={{ background: dropIconBg, color: '#3fcb1b' }}><link.icon /></span>
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* RIGHT CTAs */}
          <div className="fox-nav__actions">
            <Link 
              href="/auth-login" 
              className="fox-nav__login"
              style={{ 
                color: loginTextColor, 
                borderColor: loginBorderCol,
                background: loginBackground
              }}
            >
              <LuLogIn /> Login
            </Link>
            <Link href="/auth-signup" className="fox-nav__signup" style={{ color: '#000', background: '#3fcb1b' }}>
              <LuUserPlus /> Open Account
            </Link>
            <button
              className="fox-nav__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: hamColor, background: hamBg, borderColor: hamBorder }}
            >
              {mobileOpen ? <LuX /> : <LuMenu />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fox-mobile ${mobileOpen ? 'fox-mobile--open' : ''}`}
        style={{ background: mobBg, borderLeftColor: mobBorderCol }}
      >
        <div className="fox-mobile__inner">
          <div className="fox-mob-ctas" style={{ borderBottomColor: mobBorderCol }}>
            <Link href="/auth-login" onClick={() => setMobileOpen(false)}
              className="fox-mob-btn"
              style={{ border: `1.5px solid ${mobOutlineBdr}`, color: mobText }}
            >Login</Link>
            <Link href="/auth-signup" onClick={() => setMobileOpen(false)}
              className="fox-mob-btn fox-mob-btn--primary"
              style={{ background: 'linear-gradient(135deg, #3fcb1b, #2e9c14)', color: '#000' }}
            >Open Account</Link>
          </div>

          {NAV_ITEMS.map((item) => {
            const expanded = mobileExp === item.title;
            const links = item.mega
              ? (item.columns?.flatMap(c => c.links) ?? [])
              : (item.links ?? []);
            return (
              <div key={item.title} style={{ borderBottom: `1px solid ${mobBorderCol}` }}>
                <button
                  className="fox-mob-trigger"
                  style={{ color: mobText }}
                  onClick={() => setMobileExp(expanded ? null : item.title)}
                >
                  {item.title}
                  <LuChevronDown style={{
                    width: '16px', height: '16px',
                    color: expanded ? '#3fcb1b' : mobMuted,
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform .25s',
                  }} />
                </button>
                {expanded && (
                  <div className="fox-mob-sub">
                    {links.map((link) => (
                      <Link key={link.href} href={link.href}
                        className="fox-mob-link"
                        style={{ color: mobMuted }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="fox-mob-icon" style={{ background: 'rgba(63,203,27,0.1)', color: '#3fcb1b' }}><link.icon /></span>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${mobBorderCol}` }}>
            {[
              { label: 'Webinars', href: '/education/webinars' },
              { label: 'Economic Calendar', href: '/tools/calendar' },
              { label: 'Help Centre', href: '/helpcenter' },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="fox-mob-link" style={{ color: mobMuted }}
                onClick={() => setMobileOpen(false)}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fox-mobile-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      

      <style jsx global>{`
        .fox-nav__inner {
          height: 100%; max-width: 1440px; margin: 0 auto;
          padding: 0 24px; display: flex; align-items: center; justify-content: center;
        }
        @media (min-width: 1024px) { .fox-nav__inner { padding: 0 88px; } }
        
        /* Logo Styles with Animation */
        .fox-nav__logo {
          flex-shrink: 0; margin-right: 60px;
          display: flex; align-items: center;
          position: relative;
        }
        
        .fox-logo-wrapper {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .fox-logo-img {
          transition: all 0.3s ease;
          filter: brightness(1);
        }
        
        .fox-nav__logo:hover .fox-logo-img {
          transform: scale(1.02);
          filter: brightness(1.05) drop-shadow(0 0 8px rgba(63,203,27,0.3));
        }
        
        .fox-logo-glow {
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
        
        .fox-nav__logo:hover .fox-logo-glow {
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
        
        /* Menu Items with Floating Text Animation */
        .fox-nav__menu {
          display: none; list-style: none; margin: 0; padding: 0;
          align-items: center; justify-content: center; flex: 1;
        }
        @media (min-width: 1024px) { .fox-nav__menu { display: flex; } }
        
        .fox-nav__item { position: relative; }
        
        .fox-nav__btn {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 0 16px; height: 80px;
          font-size: .95rem; font-weight: 600;
          background: none; border: none; cursor: pointer;
          white-space: nowrap; transition: all .3s;
          letter-spacing: .01em; position: relative;
        }
        
        .fox-nav__btn-text {
          position: relative;
          display: inline-block;
          transition: transform 0.2s ease;
        }
        
        .fox-nav__btn:hover .fox-nav__btn-text {
          transform: translateY(-1px);
        }
        
        /* Animated underline on hover */
        .fox-nav__btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3fcb1b, #2e9c14);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }
        
        .fox-nav__btn:hover::after {
          width: calc(100% - 32px);
        }
        
        .fox-nav__chev { width: 14px; height: 14px; opacity: .55; transition: transform .25s; flex-shrink: 0; }
        .fox-nav__chev.open { transform: rotate(180deg); opacity: 1; }
        .fox-nav__underline {
          position: absolute; bottom: 0; left: 16px; right: 16px;
          height: 2px; border-radius: 2px 2px 0 0;
          background: linear-gradient(90deg, #3fcb1b, #2e9c14);
          transform: scaleX(0); transition: transform .25s;
        }
        .fox-nav__underline.show { transform: scaleX(1); }
        
        .fox-nav__actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .fox-nav__login {
          display: none; align-items: center; gap: 6px;
          padding: 8px 18px; font-size: .9rem; font-weight: 700;
          border: 1.5px solid; border-radius: 8px;
          transition: all .2s; text-decoration: none;
        }
        @media (min-width: 1024px) { .fox-nav__login { display: inline-flex; } }
        .fox-nav__login:hover { border-color: #3fcb1b !important; color: #3fcb1b !important; background: rgba(63,203,27,0.15); transform: translateY(-1px); }
        .fox-nav__signup {
          display: none; align-items: center; gap: 6px;
          padding: 9px 20px; font-size: .9rem; font-weight: 800;
          border-radius: 8px; transition: all .25s; text-decoration: none;
        }
        @media (min-width: 1024px) { .fox-nav__signup { display: inline-flex; } }
        .fox-nav__signup:hover { transform: translateY(-1px) scale(1.02); background: #2e9c14; box-shadow: 0 4px 12px rgba(63,203,27,0.3); }
        
        .fox-nav__hamburger {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: 8px;
          border: 1px solid; cursor: pointer;
          font-size: 20px;
          transition: all 0.2s;
        }
        .fox-nav__hamburger:hover {
          transform: scale(1.05);
          background: rgba(255,255,255,0.2) !important;
        }
        @media (min-width: 1024px) { .fox-nav__hamburger { display: none; } }
        
        /* Dropdown animations */
        .fox-mega, .fox-drop { position: absolute; top: 78px; }
        .fox-mega { left: 50%; transform: translateX(-50%) translateY(8px); width: 860px; max-width: 95vw; border: 1px solid; border-top: 2px solid #3fcb1b; border-radius: 0 0 16px 16px; opacity: 0; visibility: hidden; pointer-events: none; transition: all .22s; z-index: 999; padding: 28px; }
        .fox-mega--open { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }
        .fox-mega__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .fox-mega__heading { font-size: .68rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid; }
        .fox-mega__link { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; font-size: .84rem; font-weight: 500; margin-bottom: 2px; transition: all .18s; text-decoration: none; }
        .fox-mega__link:hover { background: var(--hover-bg); color: var(--hover-color) !important; transform: translateX(4px); }
        .fox-mega__icon { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 7px; font-size: 13px; transition: all .2s; }
        .fox-drop { left: 0; width: 220px; border: 1px solid; border-top: 2px solid #3fcb1b; border-radius: 0 0 12px 12px; padding: 8px; opacity: 0; visibility: hidden; transform: translateY(8px); transition: all .22s; z-index: 999; }
        .fox-drop--open { opacity: 1; visibility: visible; transform: translateY(0); }
        .fox-drop__link { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; font-size: .84rem; font-weight: 500; text-decoration: none; transition: all .18s; }
        .fox-drop__link:hover { background: var(--hover-bg); color: var(--hover-color) !important; transform: translateX(4px); }
        
        /* Mobile styles */
        .fox-mobile { position: fixed; top: 80px; right: 0; width: 100%; max-width: 420px; height: calc(100dvh - 80px); border-left: 1px solid; z-index: 998; overflow-y: auto; transform: translateX(100%); transition: transform .3s; }
        .fox-mobile--open { transform: translateX(0); }
        @media (min-width: 1024px) { .fox-mobile { display: none !important; } }
        .fox-mobile-backdrop { position: fixed; inset: 0; z-index: 997; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); }
        .fox-mobile__inner { padding: 20px 16px 40px; }
        .fox-mob-ctas { display: flex; gap: 8px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid; }
        .fox-mob-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 10px 6px; font-size: .75rem; font-weight: 700; border-radius: 8px; text-decoration: none; white-space: nowrap; transition: all .2s; }
        .fox-mob-btn:hover { transform: translateY(-2px); }
        .fox-mob-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 14px 8px; font-size: .92rem; font-weight: 700; background: none; border: none; cursor: pointer; text-align: left; transition: color .2s; }
        .fox-mob-trigger:hover { color: #3fcb1b; }
        .fox-mob-sub { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; padding: 4px 0 12px 8px; }
        .fox-mob-link { display: flex; align-items: center; gap: 8px; padding: 9px 10px; border-radius: 8px; font-size: .82rem; font-weight: 500; text-decoration: none; transition: all .2s; }
        .fox-mob-link:hover { background: rgba(63,203,27,0.1); color: #3fcb1b !important; transform: translateX(4px); }
        .fox-mob-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 12px; flex-shrink: 0; }
      `}</style>
    </>
  );
}