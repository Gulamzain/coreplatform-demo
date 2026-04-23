// src/app/dashboard/layout.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  BiHome, BiTrendingUp, BiHistory, BiWallet, BiBarChartAlt,
  BiSupport, BiLogOut, BiMenu, BiX, BiRefresh, BiUser, BiBell,
  BiMoon, BiSun, BiDollar, BiTransfer, BiReceipt, BiPieChart,
  BiCalendar, BiWrench, BiMessage, BiCheckCircle,
  BiHeadphone, BiShield, BiLock, BiGridAlt, BiLineChart, BiChat,
  BiHelpCircle, BiChevronDown, BiChevronRight, BiPlusCircle,
  BiMinusCircle
} from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';

// Menu sections with nested items
const menuSections = [
  {
    title: 'DASHBOARD',
    icon: BiGridAlt,
    items: [
      { name: 'Overview', href: '/dashboard', icon: BiHome },
      { name: 'My Accounts', href: '/dashboard/accounts', icon: BiUser },
      { name: 'History', href: '/dashboard/history', icon: BiHistory },
    ]
  },
  {
    title: 'TRANSACTIONS',
    icon: BiDollar,
    items: [
      { name: 'Deposit', href: '/dashboard/deposit', icon: BiPlusCircle },
      { name: 'Withdraw', href: '/dashboard/withdraw', icon: BiMinusCircle },
      { name: 'Internal Transfer', href: '/dashboard/transfer', icon: BiTransfer },
      { name: 'Transactions History', href: '/dashboard/transactions', icon: BiReceipt },
    ]
  },
  {
    title: 'DATA & ANALYTICS',
    icon: BiBarChartAlt,
    items: [
      { name: 'Portfolio', href: '/dashboard/portfolio', icon: BiPieChart },
      { name: 'Analysis', href: '/dashboard/analysis', icon: BiLineChart },
      { name: 'Reports', href: '/dashboard/reports', icon: BiCalendar },
      { name: 'Tools', href: '/dashboard/tools', icon: BiWrench },
    ]
  },
  {
    title: 'WALLET',
    icon: BiWallet,
    items: [
      { name: 'Wallet Balance', href: '/dashboard/wallet-balance', icon: BiWallet },
      { name: 'Wallet History', href: '/dashboard/wallet-history', icon: BiHistory },
    ]
  },
  {
    title: 'SUPPORT',
    icon: BiSupport,
    items: [
      { name: 'Live Chat', href: '/dashboard/chat', icon: BiChat },
      { name: 'Open Tickets', href: '/dashboard/tickets', icon: BiHelpCircle },
      { name: 'Closed Tickets', href: '/dashboard/tickets/closed', icon: BiCheckCircle },
      { name: 'Contact Us', href: '/dashboard/contact', icon: BiHeadphone },
    ]
  },
  {
    title: 'SETTINGS',
    icon: FiSettings,
    items: [
      { name: 'Profile', href: '/dashboard/profile', icon: BiUser },
      { name: 'Verification', href: '/dashboard/verification', icon: BiShield },
      { name: 'Security', href: '/dashboard/security', icon: BiLock },
    ]
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'DASHBOARD': true,
    'TRANSACTIONS': false,
    'DATA & ANALYTICS': false,
    'WALLET': false,
    'SUPPORT': false,
    'SETTINGS': false,
  });
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])  

    const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark')
  }

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const isChildActive = (items: any[]) => {
    return items.some(item => pathname === item.href);
  };

  return (
    <div className="dashboard-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      {/* Mobile Menu Button */}
       <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mobile-menu-btn">
        {sidebarOpen ? <BiX size={22} /> : <BiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Logo - F Icon with Hover Effects */}
          <div className="logo-section">
            <div className="logo-icon">
              <span>F</span>
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text-wrapper">
              <Image 
                src="/images/FoxnanceMain.png" 
                alt="Foxnance" 
                width={140} 
                height={38}
                className="logo-image"
                priority
              />
              <p className="logo-subtext">Client Portal</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-avatar"><span>GZ</span><div className="online-dot"></div></div>
            <div className="user-info"><p className="user-name">Gulam Zain</p><p className="user-id">ID: FOX12345</p></div>
            <button className="user-settings"><BiUser size={16} /></button>
          </div>

          {/* Navigation with Sections */}
          <nav className="navigation">
            {menuSections.map((section) => {
              const isExpanded = expandedSections[section.title];
              const hasActiveChild = isChildActive(section.items);
              
              return (
                <div key={section.title} className="nav-section">
                  <button 
                    className={`nav-section-header ${hasActiveChild ? 'has-active' : ''}`}
                    onClick={() => toggleSection(section.title)}
                  >
                    <section.icon size={16} />
                    <span>{section.title}</span>
                    {isExpanded ? <BiChevronDown size={16} /> : <BiChevronRight size={16} />}
                  </button>
                  
                  {isExpanded && (
                    <div className="nav-section-items">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
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
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="theme-toggle-section">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {isDarkMode ? <BiSun size={18} /> : <BiMoon size={18} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Logout */}
          <div className="logout-section">
            <button className="logout-btn"><BiLogOut size={18} /><span>Disconnect MT5</span></button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
          <div className="top-bar-content">
            <div>
              <h2 className="welcome-title">Hello, Gulam Zain</h2>
              <p className="welcome-subtitle">Welcome back! Here's your trading overview</p>
            </div>
            <div className="top-actions">
              <button className="action-btn"><BiBell size={20} /></button>
              <button className="action-btn"><BiRefresh size={20} /></button>
              <select className="period-select">
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, sans-serif; }

        [data-theme="dark"] {
          --bg-primary: #0A0A0A;
          --bg-secondary: #141414;
          --bg-card: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: rgba(255,255,255,0.6);
          --border-color: rgba(255,255,255,0.1);
        }

        [data-theme="light"] {
          --bg-primary: #f5f7fa;
          --bg-secondary: #ffffff;
          --bg-card: #ffffff;
          --text-primary: #1a1f36;
          --text-secondary: #6b7280;
          --border-color: #e5e7eb;
        }

        .dashboard-container { display: flex; min-height: 100vh; background: var(--bg-primary); }

        .mobile-menu-btn { position: fixed; top: 16px; left: 16px; z-index: 51; padding: 12px; border-radius: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; display: none; }
        @media (max-width: 768px) { .mobile-menu-btn { display: block; } }

      .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  z-index: 50;
  transition: transform 0.3s ease;
  overflow-y: auto;
}
@media (max-width: 768px) {
  .sidebar {
    position: absolute; /* overlay instead of fixed width */
    width: 100%;
    max-width: 280px;
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
}

        .sidebar-content { padding: 24px; display: flex; flex-direction: column; height: 100%; }

        /* Logo Section - Fixed Alignment */
        .logo-section {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          text-decoration: none;
        }
        
        .logo-icon {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 16px;
          background: linear-gradient(135deg, #3fcb1b, #2e9c14);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(63,203,27,0.3);
          transition: all 0.3s ease;
          cursor: pointer;
          flex-shrink: 0;
        }
        
        .logo-icon:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(63,203,27,0.4);
        }
        
        .logo-icon span {
          color: white;
          font-size: 30px;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .logo-icon:hover span {
          transform: scale(1.02);
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
          transition: all 0.3s ease;
          margin-bottom: 6px;
        }
        
        .logo-image:hover {
          transform: scale(1.02);
          filter: brightness(1.05);
        }
        
        .logo-subtext {
          font-size: 10px;
          color: #3fcb1b;
          margin: 0;
          letter-spacing: 0.5px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .logo-text-wrapper:hover .logo-subtext {
          letter-spacing: 1px;
          color: #2e9c14;
        }

        .user-profile { display: flex; align-items: center; gap: 12px; padding: 12px; margin-bottom: 24px; border-radius: 12px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); transition: all 0.3s ease; }
        .user-profile:hover { background: rgba(63,203,27,0.15); transform: translateY(-2px); }
        .user-avatar { position: relative; width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #3fcb1b, #2e9c14); display: flex; align-items: center; justify-content: center; }
        .user-avatar span { color: black; font-weight: bold; font-size: 18px; }
        .online-dot { position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; border-radius: 50%; background: #3fcb1b; border: 2px solid var(--bg-primary); animation: pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        .user-info { flex: 1; }
        .user-name { color: var(--text-primary); font-weight: 600; margin: 0; }
        .user-id { color: var(--text-secondary); font-size: 11px; margin: 0; }

        /* Navigation Sections */
        .navigation { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        
        .nav-section { margin-bottom: 4px; }
        
        .nav-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-section-header:hover {
          background: rgba(63,203,27,0.1);
          color: #3fcb1b;
          transform: translateX(4px);
        }
        
        .nav-section-header.has-active {
          color: #3fcb1b;
        }
        
        .nav-section-header span {
          flex: 1;
          text-align: left;
        }
        
        .nav-section-items {
          margin-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          font-size: 13px;
        }
        
        .nav-item:hover {
          background: rgba(63,203,27,0.1);
          color: #3fcb1b;
          transform: translateX(4px);
        }
        
        .nav-item.active {
          background: rgba(63,203,27,0.15);
          color: #3fcb1b;
          font-weight: 500;
        }
        
        .active-indicator {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3fcb1b;
          animation: pulseActive 2s ease-in-out infinite;
        }
        
        @keyframes pulseActive {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .theme-toggle-section { margin-bottom: 16px; }
        .theme-toggle-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 10px; border-radius: 10px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); color: #3fcb1b; cursor: pointer; transition: all 0.3s ease; }
        .theme-toggle-btn:hover { background: rgba(63,203,27,0.2); transform: translateY(-2px); }
        .floating-theme-btn { position: fixed; bottom: 24px; right: 24px; width: 48px; height: 48px; border-radius: 50%; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 100; transition: all 0.3s ease; }
        .floating-theme-btn:hover { background: #3fcb1b; color: white; transform: scale(1.1); }

        .logout-section { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-color); }
        .logout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 12px; background: rgba(239,68,68,0.1); color: #ef4444; border: none; cursor: pointer; transition: all 0.3s ease; }
        .logout-btn:hover { background: rgba(239,68,68,0.2); transform: translateY(-2px); }

        /* Main content */
.main-content {
  flex: 1;
  margin-left: 280px;
  min-width: 0; /* prevents overflow */
}
@media (max-width: 768px) {
  .main-content {
    margin-left: 0; /* full width on mobile */
  }
}

        .top-bar { position: sticky; top: 0; z-index: 30; background: var(--bg-primary); transition: all 0.3s ease; }
        .top-bar.scrolled { background: var(--bg-secondary); border-bottom: 1px solid var(--border-color); }
        .top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  flex-wrap: wrap; /* allow wrapping on mobile */
  gap: 12px;
}
.welcome-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.welcome-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 4px 0 0;
}
.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap; /* wrap buttons/select on small screens */
}
        .action-btn { padding: 10px; border-radius: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-secondary); cursor: pointer; transition: all 0.3s ease; }
        .action-btn:hover { background: rgba(63,203,27,0.1); color: #3fcb1b; transform: translateY(-2px); }
        .period-select { padding: 10px 16px; border-radius: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; transition: all 0.3s ease; }
        .period-select:hover { border-color: #3fcb1b; }

        .page-content { padding: 24px; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(63,203,27,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(63,203,27,0.5); }
      `}</style>
    </div>
  );
}