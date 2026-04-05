// src/app/dashboard/layout.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BiHome, BiTrendingUp, BiHistory, BiWallet, BiBarChartAlt,
  BiSupport, BiLogOut, BiMenu, BiX, BiRefresh, BiUser, BiBell,
  BiMoon, BiSun, BiDollar, BiTransfer, BiReceipt, BiPieChart,
  BiCalendar, BiWrench, BiMessage, BiCheckCircle,
  BiHeadphone, BiShield, BiLock, BiGridAlt, BiLineChart, BiChat,
  BiHelpCircle, BiChevronDown, BiChevronRight, BiPlusCircle,
  BiMinusCircle, BiFolder, BiFolderOpen,BiMessageRoundedDetail
} from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineConfirmationNumber } from 'react-icons/md';

// Menu sections with nested items
const menuSections = [
  {
    title: 'DASHBOARD',
    icon: BiGridAlt,
    items: [
      { name: 'Overview', href: '/dashboard', icon: BiHome },
      { name: 'My Accounts', href: '/dashboard/accounts', icon: BiUser },
      // { name: 'Trading', href: '/dashboard/trading', icon: BiTrendingUp },
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
    // Update the icon here:
    { name: 'Open Tickets', href: '/dashboard/tickets', icon: BiSupport },
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  // Auto-expand section if a child is active
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
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon"><span>F</span></div>
            <div><h1 className="logo-text">Foxnance</h1><p className="logo-subtext">Client Portal</p></div>
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-avatar"><span>JD</span><div className="online-dot"></div></div>
            <div className="user-info"><p className="user-name">Gulam</p><p className="user-id">ID: FOX12345</p></div>
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

          {/* Upgrade Card */}
          <div className="upgrade-card">
            <div className="upgrade-icon"><BiTrendingUp size={20} /></div>
            <h4 className="upgrade-title">Foxnance Pro</h4>
            <p className="upgrade-desc">Unlock sub-50ms latency</p>
            <button className="upgrade-btn">Upgrade Now →</button>
          </div>

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
            <div><h2 className="welcome-title">Hello, Gulam Zain</h2><p className="welcome-subtitle">Welcome back! Here's your trading overview</p></div>
            <div className="top-actions">
              <button className="action-btn"><BiBell size={20} /></button>
              <button className="action-btn"><BiRefresh size={20} /></button>
              <select className="period-select"><option>Last 30 days</option><option>This Month</option><option>This Year</option></select>
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

        .sidebar { position: fixed; top: 0; left: 0; width: 280px; height: 100vh; background: var(--bg-secondary); border-right: 1px solid var(--border-color); z-index: 50; transition: transform 0.3s ease; overflow-y: auto; }
        @media (max-width: 768px) { .sidebar { transform: translateX(-100%); } .sidebar.open { transform: translateX(0); } }

        .sidebar-content { padding: 24px; display: flex; flex-direction: column; height: 100%; }

        .logo-section { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border-color); }
        .logo-icon { width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); display: flex; align-items: center; justify-content: center; }
        .logo-icon span { color: white; font-size: 24px; font-weight: bold; }
        .logo-text { font-size: 20px; font-weight: bold; color: var(--text-primary); margin: 0; }
        .logo-subtext { font-size: 10px; color: #3fcb1b; margin: 0; }

        .user-profile { display: flex; align-items: center; gap: 12px; padding: 12px; margin-bottom: 24px; border-radius: 12px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); }
        .user-avatar { position: relative; width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #3fcb1b, #2e9c14); display: flex; align-items: center; justify-content: center; }
        .user-avatar span { color: black; font-weight: bold; }
        .online-dot { position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; border-radius: 50%; background: #3fcb1b; border: 2px solid var(--bg-primary); }
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
        }

        .upgrade-card { margin: 24px 0; padding: 16px; border-radius: 12px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); text-align: center; }
        .upgrade-icon { width: 48px; height: 48px; margin: 0 auto 12px; border-radius: 12px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); display: flex; align-items: center; justify-content: center; }
        .upgrade-title { color: var(--text-primary); font-weight: bold; margin: 0 0 4px; }
        .upgrade-desc { color: var(--text-secondary); font-size: 11px; margin: 0 0 12px; }
        .upgrade-btn { width: 100%; padding: 8px; border-radius: 8px; background: #3fcb1b; color: black; font-weight: 600; border: none; cursor: pointer; }

        .theme-toggle-section { margin-bottom: 16px; }
        .theme-toggle-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 10px; border-radius: 10px; background: rgba(63,203,27,0.1); border: 1px solid rgba(63,203,27,0.2); color: #3fcb1b; cursor: pointer; }
        .floating-theme-btn { position: fixed; bottom: 24px; right: 24px; width: 48px; height: 48px; border-radius: 50%; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 100; }
        .floating-theme-btn:hover { background: #3fcb1b; color: white; }

        .logout-section { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-color); }
        .logout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 12px; background: rgba(239,68,68,0.1); color: #ef4444; border: none; cursor: pointer; }

        .main-content { flex: 1; margin-left: 280px; }
        @media (max-width: 768px) { .main-content { margin-left: 0; } }

        .top-bar { position: sticky; top: 0; z-index: 30; background: var(--bg-primary); }
        .top-bar.scrolled { background: var(--bg-secondary); border-bottom: 1px solid var(--border-color); }
        .top-bar-content { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; flex-wrap: wrap; gap: 16px; }
        .welcome-title { font-size: 20px; font-weight: 600; color: var(--text-primary); margin: 0; }
        .welcome-subtitle { font-size: 13px; color: var(--text-secondary); margin: 4px 0 0; }
        .top-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .action-btn { padding: 10px; border-radius: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-secondary); cursor: pointer; }
        .period-select { padding: 10px 16px; border-radius: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); }

        .page-content { padding: 24px; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(63,203,27,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}