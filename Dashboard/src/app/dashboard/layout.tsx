// src/app/dashboard/layout.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  BiHome, BiHistory, BiUser, BiMenu, BiX, BiRefresh, BiBell,
  BiSun, BiMoon, BiLogOut, BiGridAlt, BiChevronDown, BiChevronRight,
  BiPlusCircle, BiMinusCircle, BiTransfer, BiReceipt, BiPieChart,
  BiLineChart, BiCalendar, BiWrench, BiChat, BiHelpCircle, BiCheckCircle,
  BiDollar, BiWallet, BiShield, BiLock, BiBriefcase, BiArrowFromLeft
} from 'react-icons/bi'
import { FiSettings, FiToggleRight } from 'react-icons/fi'

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
    icon: BiPieChart,
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
    icon: BiChat,
    items: [
      { name: 'Live Chat', href: '/dashboard/chat', icon: BiChat },
      { name: 'Open Tickets', href: '/dashboard/tickets', icon: BiHelpCircle },
      { name: 'Closed Tickets', href: '/dashboard/tickets/closed', icon: BiCheckCircle },
      { name: 'Contact Us', href: '/dashboard/contact', icon: BiChat },
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
  const router = useRouter()
  const scrollYRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth <= 768
    if (sidebarOpen && isMobile) {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = '100%'
    } else if (!sidebarOpen && scrollYRef.current) {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollYRef.current)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [sidebarOpen])

  // Close sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  // Close sidebar on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionTitle]: !prev[sectionTitle] }))
  }

  const isChildActive = (items: any[]) => items.some(item => pathname === item.href)

  const navigateToPartner = () => {
    router.push('/partners/LayoutDashboard')
  }

  return (
    <div className="dashboard-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle menu"
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        {sidebarOpen ? <BiX size={22} /> : <BiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Logo */}
          <div className="logo-section flex justify-center items-center">
            <div className="logo-text-wrapper">
              <Image 
                src="/images/FoxnanceMain.png" 
                alt="Foxnance" 
                width={140} 
                height={38} 
                className="logo-image mx-auto" 
                priority
              />
              <p className="logo-subtext">Client Portal</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-avatar"><span>GZ</span><div className="online-dot" /></div>
            <div className="user-info">
              <p className="user-name">Gulam Zain</p>
              <p className="user-id">ID: FOX12345</p>
            </div>
           
          </div>

          {/* Navigation */}
          <nav className="navigation">
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

          {/* Theme Toggle */}
       
          {/* Logout */}
          <div className="logout-section">
            <button className="logout-btn"><BiLogOut size={18} /><span>Disconnect MT5</span></button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      <div className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
          <div className="top-bar-content">
            <div>
              <h2 className="welcome-title">Hello, Gulam Zain</h2>
              <p className="welcome-subtitle">Welcome back! Here's your trading overview</p>
            </div>
            <div className="top-actions">
              {/* Partner Switch Button */}
              <button 
                className="partner-switch-btn" 
                onClick={navigateToPartner}
                aria-label="Switch to Partner Dashboard"
              >
                <BiBriefcase size={18} />
                <span className="partner-switch-text">Partner</span>
                <FiToggleRight size={18} className="switch-icon" />
              </button>
              
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

      {/* Floating Theme Button */}
      <button className="floating-theme-btn" onClick={toggleTheme}>
        {isDarkMode ? <BiSun size={20} /> : <BiMoon size={20} />}
      </button>

      <style jsx global>{`
        :root {
          --topbar-height: 64px;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ========== DARK MODE - Black & Green ========== */
        [data-theme="dark"] {
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: rgba(255,255,255,0.6);
          --border-color: rgba(255,255,255,0.08);
          --accent-green: #3fcb1b;
          --accent-green-dark: #2e9c14;
          --hover-bg: rgba(63,203,27,0.08);
          --active-bg: rgba(63,203,27,0.12);
        }

        /* ========== LIGHT MODE - Light backgrounds with Green accents ========== */
        [data-theme="light"] {
          --bg-primary: #f8f9fc;
          --bg-secondary: #ffffff;
          --bg-card: #ffffff;
          --text-primary: #1a1f36;
          --text-secondary: #6b7280;
          --border-color: #e5e7eb;
          --accent-green: #3fcb1b;
          --accent-green-dark: #2e9c14;
          --hover-bg: rgba(63,203,27,0.05);
          --active-bg: rgba(63,203,27,0.1);
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        /* Mobile menu button */
        .mobile-menu-btn {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 140;
          padding: 10px;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          display: none;
          backdrop-filter: blur(4px);
        }
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          z-index: 130;
          transition: transform 0.3s ease;
          overflow-y: auto;
          overflow-x: hidden;
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            max-width: 280px;
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
          }
        }

        .sidebar-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Logo Section */
        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .logo-icon {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .logo-icon span {
          color: #000;
          font-size: 26px;
          font-weight: bold;
        }
        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(63,203,27,0.4) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .logo-icon:hover .logo-glow {
          opacity: 1;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.5;
          }
        }
        .logo-text-wrapper {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .logo-image {
          object-fit: contain;
          width: 120px;
          height: auto;
        }
        /* Light mode logo fix */
        [data-theme="light"] .logo-image {
          filter: brightness(0.8);
        }
        .logo-subtext {
          font-size: 9px;
          color: var(--accent-green);
          margin: 2px 0 0;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        /* User Profile */
        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          margin-bottom: 24px;
          border-radius: 12px;
          background: var(--hover-bg);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        .user-profile:hover {
          background: var(--active-bg);
          transform: translateY(-1px);
        }
        .user-avatar {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .user-avatar span {
          color: #000;
          font-weight: bold;
          font-size: 16px;
        }
        .online-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #3fcb1b;
          border: 2px solid var(--bg-secondary);
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .user-info {
          flex: 1;
          min-width: 0;
        }
        .user-name {
          color: var(--text-primary);
          font-weight: 600;
          margin: 0;
          font-size: 13px;
        }
        .user-id {
          color: var(--text-secondary);
          font-size: 10px;
          margin: 2px 0 0;
        }
        .user-settings {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-settings:hover {
          color: var(--accent-green);
          background: var(--hover-bg);
        }

        /* Navigation */
        .navigation {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-section {
          margin-bottom: 2px;
        }
        .nav-section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 10px;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-section-header:hover {
          background: var(--hover-bg);
          color: var(--accent-green);
          transform: translateX(2px);
        }
        .nav-section-header.has-active {
          color: var(--accent-green);
        }
        .nav-section-header span {
          flex: 1;
          text-align: left;
        }
        .nav-section-items {
          margin-left: 26px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 2px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 10px;
          border-radius: 6px;
          text-decoration: none;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          font-size: 12px;
        }
        .nav-item:hover {
          background: var(--hover-bg);
          color: var(--accent-green);
          transform: translateX(2px);
        }
        .nav-item.active {
          background: var(--active-bg);
          color: var(--accent-green);
          font-weight: 500;
        }
        .active-indicator {
          margin-left: auto;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-green);
        }

        /* Theme Toggle */
        .theme-toggle-section {
          margin-bottom: 12px;
        }
        .theme-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px;
          border-radius: 8px;
          background: var(--hover-bg);
          border: 1px solid var(--border-color);
          color: var(--accent-green);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 12px;
        }
        .theme-toggle-btn:hover {
          background: var(--active-bg);
          transform: translateY(-1px);
        }

        /* Logout */
        .logout-section {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border-radius: 8px;
          background: rgba(239,68,68,0.08);
          color: #ef4444;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 12px;
        }
        .logout-btn:hover {
          background: rgba(239,68,68,0.15);
          transform: translateY(-1px);
        }

        /* Backdrop */
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 125;
        }
        @media (max-width: 768px) {
          .sidebar-backdrop.visible {
            opacity: 1;
            pointer-events: auto;
          }
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 260px;
          min-width: 0;
          transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
          .main-content.sidebar-open {
            pointer-events: none;
          }
        }

        /* Top Bar */
        .top-bar {
          position: sticky;
          top: 0;
          z-index: 120;
          background: var(--bg-primary);
          transition: all 0.3s ease;
        }
        .top-bar.scrolled {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .top-bar-content {
            padding-left: 65px;
          }
          .welcome-title {
            font-size: 15px;
          }
          .welcome-subtitle {
            font-size: 11px;
          }
        }
        @media (max-width: 480px) {
          .top-bar-content {
            padding-left: 60px;
            padding-right: 12px;
          }
          .welcome-title {
            font-size: 14px;
          }
          .welcome-subtitle {
            font-size: 10px;
          }
        }
        .welcome-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
        .welcome-subtitle {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 3px 0 0;
        }
        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .action-btn {
          padding: 8px;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .action-btn:hover {
          background: var(--hover-bg);
          color: var(--accent-green);
          transform: translateY(-1px);
        }
        .period-select {
          padding: 8px 14px;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
        }
        .period-select:hover {
          border-color: var(--accent-green);
        }

        /* Partner Switch Button */
        .partner-switch-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          background: var(--accent-green);
          border: none;
          color: #000;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .partner-switch-btn:hover {
          background: var(--accent-green-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(63,203,27,0.3);
        }
        .partner-switch-btn .switch-icon {
          margin-left: 2px;
          opacity: 0.7;
        }
        .partner-switch-text {
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .partner-switch-btn .partner-switch-text {
            display: none;
          }
          .partner-switch-btn {
            padding: 8px 10px;
          }
        }

        /* Page Content */
        .page-content {
          padding: 20px;
        }
        @media (max-width: 768px) {
          .page-content {
            padding: 16px;
          }
        }
        @media (max-width: 480px) {
          .page-content {
            padding: 12px;
          }
        }

        /* Floating Theme Button */
        .floating-theme-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 140;
          transition: all 0.3s ease;
        }
        .floating-theme-btn:hover {
          background: var(--accent-green);
          color: #000;
          transform: scale(1.05);
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(63,203,27,0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(63,203,27,0.5);
        }
      `}</style>
    </div>
  )
}