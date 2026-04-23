// src/app/dashboard/layout.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  BiHome, BiTrendingUp, BiHistory, BiWallet, BiBarChartAlt,
  BiSupport, BiLogOut, BiMenu, BiX, BiRefresh, BiUser, BiBell,
  BiMoon, BiSun, BiDollar, BiTransfer, BiReceipt, BiPieChart,
  BiCalendar, BiWrench, BiMessage, BiCheckCircle,
  BiHeadphone, BiShield, BiLock, BiGridAlt, BiLineChart, BiChat,
  BiHelpCircle, BiChevronDown, BiChevronRight, BiPlusCircle,
  BiMinusCircle
} from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'

const menuSections = [
  {
    title: 'DASHBOARD',
    icon: BiGridAlt,
    items: [
      { name: 'Overview', href: '/dashboard', icon: BiHome },
      { name: 'My Accounts', href: '/dashboard/accounts', icon: BiUser },
      { name: 'History', href: '/dashboard/history', icon: BiHistory },
    ],
  },
  {
    title: 'TRANSACTIONS',
    icon: BiDollar,
    items: [
      { name: 'Deposit', href: '/dashboard/deposit', icon: BiPlusCircle },
      { name: 'Withdraw', href: '/dashboard/withdraw', icon: BiMinusCircle },
      { name: 'Internal Transfer', href: '/dashboard/transfer', icon: BiTransfer },
      { name: 'Transactions History', href: '/dashboard/transactions', icon: BiReceipt },
    ],
  },
  {
    title: 'DATA & ANALYTICS',
    icon: BiBarChartAlt,
    items: [
      { name: 'Portfolio', href: '/dashboard/portfolio', icon: BiPieChart },
      { name: 'Analysis', href: '/dashboard/analysis', icon: BiLineChart },
      { name: 'Reports', href: '/dashboard/reports', icon: BiCalendar },
      { name: 'Tools', href: '/dashboard/tools', icon: BiWrench },
    ],
  },
  {
    title: 'WALLET',
    icon: BiWallet,
    items: [
      { name: 'Wallet Balance', href: '/dashboard/wallet-balance', icon: BiWallet },
      { name: 'Wallet History', href: '/dashboard/wallet-history', icon: BiHistory },
    ],
  },
  {
    title: 'SUPPORT',
    icon: BiSupport,
    items: [
      { name: 'Live Chat', href: '/dashboard/chat', icon: BiChat },
      { name: 'Open Tickets', href: '/dashboard/tickets', icon: BiHelpCircle },
      { name: 'Closed Tickets', href: '/dashboard/tickets/closed', icon: BiCheckCircle },
      { name: 'Contact Us', href: '/dashboard/contact', icon: BiHeadphone },
    ],
  },
  {
    title: 'SETTINGS',
    icon: FiSettings,
    items: [
      { name: 'Profile', href: '/dashboard/profile', icon: BiUser },
      { name: 'Verification', href: '/dashboard/verification', icon: BiShield },
      { name: 'Security', href: '/dashboard/security', icon: BiLock },
    ],
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    DASHBOARD: true,
    TRANSACTIONS: false,
    'DATA & ANALYTICS': false,
    WALLET: false,
    SUPPORT: false,
    SETTINGS: false,
  })
  const pathname = usePathname()

  useEffect(() => {
    // set initial theme attribute
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
      return next
    })
  }

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionTitle]: !prev[sectionTitle] }))
  }

  const isChildActive = (items: any[]) => items.some(item => pathname === item.href)

  return (
    <div className="dashboard-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      {/* Mobile menu button */}
      <button
        aria-label="Toggle menu"
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        {sidebarOpen ? <BiX size={22} /> : <BiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-hidden={!sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 769}>
        <div className="sidebar-content">
          <div className="logo-section">
            <div className="logo-icon">
              <span>F</span>
              <div className="logo-glow" />
            </div>
            <div className="logo-text-wrapper">
              <Image src="/images/FoxnanceMain.png" alt="Foxnance" width={140} height={38} className="logo-image" priority />
              <p className="logo-subtext">Client Portal</p>
            </div>
          </div>

          <div className="user-profile">
            <div className="user-avatar"><span>GZ</span><div className="online-dot" /></div>
            <div className="user-info">
              <p className="user-name">Gulam Zain</p>
              <p className="user-id">ID: FOX12345</p>
            </div>
            <button className="user-settings" aria-label="Profile"><BiUser size={16} /></button>
          </div>

          <nav className="navigation" aria-label="Main navigation">
            {menuSections.map(section => {
              const isExpanded = !!expandedSections[section.title]
              const hasActiveChild = isChildActive(section.items)
              return (
                <div key={section.title} className="nav-section">
                  <button
                    className={`nav-section-header ${hasActiveChild ? 'has-active' : ''}`}
                    onClick={() => toggleSection(section.title)}
                    aria-expanded={isExpanded}
                  >
                    <section.icon size={16} />
                    <span>{section.title}</span>
                    {isExpanded ? <BiChevronDown size={16} /> : <BiChevronRight size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="nav-section-items">
                      {section.items.map(item => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                          >
                            <item.icon size={16} />
                            <span>{item.name}</span>
                            {isActive && <div className="active-indicator" />}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="theme-toggle-section">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-pressed={!isDarkMode}>
              {isDarkMode ? <BiSun size={18} /> : <BiMoon size={18} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div className="logout-section">
            <button className="logout-btn"><BiLogOut size={18} /><span>Disconnect MT5</span></button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile when sidebar open */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />

      {/* Main content */}
      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        <div className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
          <div className="top-bar-content">
            <div>
              <h2 className="welcome-title">Hello, Gulam Zain</h2>
              <p className="welcome-subtitle">Welcome back! Here's your trading overview</p>
            </div>

            <div className="top-actions">
              <button className="action-btn" aria-label="Notifications"><BiBell size={20} /></button>
              <button className="action-btn" aria-label="Refresh"><BiRefresh size={20} /></button>
              <select className="period-select" aria-label="Select period">
                <option>Last 30 days</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="page-content">{children}</div>
      </main>

      <button className="floating-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
        {isDarkMode ? <BiSun size={20} /> : <BiMoon size={20} />}
      </button>

      <style jsx global>{`
        :root{
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: rgba(255,255,255,0.6);
          --border-color: rgba(255,255,255,0.08);
        }

        [data-theme="light"] {
          --bg-primary: #f5f7fa;
          --bg-secondary: #ffffff;
          --bg-card: #ffffff;
          --text-primary: #1a1f36;
          --text-secondary: #6b7280;
          --border-color: #e5e7eb;
        }

        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }

        .dashboard-container { display: flex; min-height: 100vh; background: var(--bg-primary); color: var(--text-primary); }

        /* Mobile menu button */
        .mobile-menu-btn {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 60;
          padding: 10px;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          display: none;
        }
        @media (max-width: 768px) { .mobile-menu-btn { display: inline-flex; align-items:center; justify-content:center; } }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          z-index: 70;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        /* Desktop: visible by default */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            width: 100%;
            max-width: 320px;
            transform: translateX(-110%);
            box-shadow: 0 10px 30px rgba(2,6,23,0.6);
          }
          .sidebar.open { transform: translateX(0); }
        }

        .sidebar-content { padding: 22px; display:flex; flex-direction:column; min-height:100vh; }

        .logo-section { display:flex; align-items:flex-start; gap:14px; margin-bottom:20px; padding-bottom:18px; border-bottom:1px solid var(--border-color); text-decoration:none; }
        .logo-icon { position:relative; width:50px; height:50px; border-radius:12px; background: linear-gradient(135deg,#3fcb1b,#2e9c14); display:flex; align-items:center; justify-content:center; box-shadow:0 6px 18px rgba(63,203,27,0.25); cursor:pointer; flex-shrink:0; }
        .logo-icon span { color:white; font-size:28px; font-weight:700; }
        .logo-glow { position:absolute; top:50%; left:50%; width:100%; height:100%; transform:translate(-50%,-50%); background:radial-gradient(circle, rgba(63,203,27,0.35) 0%, transparent 70%); border-radius:50%; opacity:0; pointer-events:none; transition:opacity .25s ease; }
        .logo-icon:hover .logo-glow { opacity:1; animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{ transform:translate(-50%,-50%) scale(.95); opacity:.0 } 50%{ transform:translate(-50%,-50%) scale(1.15); opacity:.45 } }

        .logo-text-wrapper { display:flex; flex-direction:column; justify-content:center; }
        .logo-subtext { font-size:11px; color:#3fcb1b; margin:0; letter-spacing:.4px; font-weight:600; }

        .user-profile { display:flex; align-items:center; gap:12px; padding:12px; margin-bottom:18px; border-radius:12px; background: rgba(63,203,27,0.06); border:1px solid rgba(63,203,27,0.08); }
        .user-avatar { position:relative; width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,#3fcb1b,#2e9c14); display:flex; align-items:center; justify-content:center; color:#071028; font-weight:700; }
        .online-dot { position:absolute; bottom:2px; right:2px; width:10px; height:10px; border-radius:50%; background:#3fcb1b; border:2px solid var(--bg-primary); animation: pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100%{ opacity:1; transform:scale(1) } 50%{ opacity:.5; transform:scale(.8) } }
        .user-name { margin:0; font-weight:700; color:var(--text-primary); }
        .user-id { margin:0; font-size:12px; color:var(--text-secondary); }

        .navigation { margin-top:6px; display:flex; flex-direction:column; gap:8px; flex:1; }
        .nav-section { margin-bottom:6px; }
        .nav-section-header { display:flex; align-items:center; gap:12px; width:100%; padding:10px 12px; background:transparent; border:none; border-radius:10px; color:var(--text-secondary); font-size:13px; font-weight:700; cursor:pointer; transition:all .18s ease; }
        .nav-section-header:hover { background: rgba(63,203,27,0.06); color:#3fcb1b; transform:translateX(6px); }
        .nav-section-header.has-active { color:#3fcb1b; }
        .nav-section-items { margin-left:28px; display:flex; flex-direction:column; gap:6px; margin-top:6px; }
        .nav-item { display:flex; align-items:center; gap:12px; padding:8px 12px; border-radius:8px; color:var(--text-secondary); text-decoration:none; font-size:13px; transition:all .18s ease; }
        .nav-item:hover { background: rgba(63,203,27,0.06); color:#3fcb1b; transform:translateX(6px); }
        .nav-item.active { background: rgba(63,203,27,0.12); color:#3fcb1b; font-weight:700; }
        .active-indicator { margin-left:auto; width:8px; height:8px; border-radius:50%; background:#3fcb1b; animation: pulseActive 2s ease-in-out infinite; }
        @keyframes pulseActive { 0%,100%{ opacity:1; transform:scale(1) } 50%{ opacity:.5; transform:scale(.8) } }

        .theme-toggle-section { margin-top:12px; }
        .theme-toggle-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:10px; padding:10px; border-radius:10px; background: rgba(63,203,27,0.06); border:1px solid rgba(63,203,27,0.08); color:#3fcb1b; cursor:pointer; font-weight:700; }
        .logout-section { margin-top:auto; padding-top:12px; border-top:1px solid var(--border-color); }
        .logout-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:8px; padding:12px; border-radius:12px; background: rgba(239,68,68,0.06); color:#ef4444; border:none; cursor:pointer; font-weight:700; }

        /* Backdrop */
        .sidebar-backdrop { position:fixed; inset:0; background:rgba(2,6,23,0.5); opacity:0; pointer-events:none; transition:opacity .2s ease; z-index:65; }
        .sidebar-backdrop.visible { opacity:1; pointer-events:auto; }

        /* Main content */
        .main-content { flex:1; margin-left:280px; min-width:0; display:flex; flex-direction:column; }
        @media (max-width: 768px) { .main-content { margin-left:0; } }

        .top-bar { position:sticky; top:0; z-index:40; background:var(--bg-primary); transition:all .18s ease; }
        .top-bar.scrolled { background:var(--bg-secondary); border-bottom:1px solid var(--border-color); }
        .top-bar-content { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; gap:12px; flex-wrap:wrap; }
        .welcome-title { margin:0; font-size:18px; font-weight:700; color:var(--text-primary); }
        .welcome-subtitle { margin:4px 0 0; font-size:13px; color:var(--text-secondary); }

        .top-actions { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .action-btn { padding:8px; border-radius:10px; background:var(--bg-secondary); border:1px solid var(--border-color); color:var(--text-secondary); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; }
        .period-select { padding:8px 12px; border-radius:10px; background:var(--bg-secondary); border:1px solid var(--border-color); color:var(--text-primary); }

        .page-content { padding:20px; width:100%; max-width:1400px; margin:0 auto; }

        .floating-theme-btn { position:fixed; bottom:20px; right:20px; width:48px; height:48px; border-radius:50%; background:var(--bg-secondary); border:1px solid var(--border-color); color:var(--text-primary); display:flex; align-items:center; justify-content:center; z-index:80; cursor:pointer; }

        /* small tweaks */
        .user-settings { background:transparent; border:none; color:var(--text-secondary); cursor:pointer; }

        /* ensure no horizontal overflow */
        html, body, #__next { width:100%; overflow-x:hidden; }

        @media (max-width: 1100px) {
          .page-content { padding:16px; }
        }
        @media (max-width: 640px) {
          .page-content { padding:12px; }
        }
      `}</style>
    </div>
  )
}
