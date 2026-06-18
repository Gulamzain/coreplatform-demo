"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Grid, Users, DollarSign, TrendingUp, Settings,
  Bell, RefreshCw, ChevronDown, ChevronRight, Menu, X,
  LogOut, Copy, ExternalLink, ArrowUpRight, ArrowDownRight,
  Activity, BarChart2, PieChart, Gift, Link2,
  Eye, EyeOff, CheckCircle, Clock, AlertCircle,
  Download, Filter, Search, UserPlus, Briefcase,
  CreditCard, HelpCircle, Sun, Moon, Star,
  FileText, Layers, Home, UserCheck, Award,
  Target, Zap, Share2, BarChart
} from "react-feather"

/* ─── TYPES ─────────────────────────────────────────── */
type NavItem = { key: string; label: string; icon: React.FC<any>; children: string[] }
type Client = { id: string; name: string; email: string; joined: string; status: "active" | "pending" | "inactive"; volume: string; commission: string; trades: number }
type Commission = { date: string; client: string; type: string; amount: string; status: "paid" | "pending" | "processing" }
type Payout = { id: string; date: string; amount: string; status: "completed" | "pending" | "failed"; method: string }

/* ─── DATA ───────────────────────────────────────────── */
const TICKERS = [
  { n: "EUR/USD", v: "1.08432", up: true, c: "+0.04%" },
  { n: "BTC/USD", v: "69,150", up: true, c: "+1.39%" },
  { n: "USD/JPY", v: "154.32", up: false, c: "-0.12%" },
  { n: "OIL/USD", v: "78.45", up: false, c: "-0.88%" },
  { n: "GBP/USD", v: "1.27420", up: false, c: "-0.21%" },
  { n: "XAU/USD", v: "2356.80", up: true, c: "+0.67%" },
]

const CLIENTS: Client[] = [
  { id: "C-001", name: "Alex Turner", email: "alex.t@email.com", joined: "2024-12-01", status: "active", volume: "$12,440", commission: "$186.60", trades: 47 },
  { id: "C-002", name: "Sarah Mitchell", email: "sarah.m@email.com", joined: "2024-12-08", status: "active", volume: "$8,920", commission: "$133.80", trades: 32 },
  { id: "C-003", name: "Omar Hassan", email: "omar.h@email.com", joined: "2024-12-15", status: "pending", volume: "$0", commission: "$0.00", trades: 0 },
  { id: "C-004", name: "Li Wei", email: "li.w@email.com", joined: "2024-12-18", status: "active", volume: "$21,300", commission: "$319.50", trades: 68 },
  { id: "C-005", name: "Priya Sharma", email: "priya.s@email.com", joined: "2024-12-22", status: "active", volume: "$5,670", commission: "$85.05", trades: 23 },
  { id: "C-006", name: "Carlos Mendez", email: "carlos.m@email.com", joined: "2025-01-03", status: "inactive", volume: "$2,100", commission: "$31.50", trades: 8 },
  { id: "C-007", name: "Nina Kowalski", email: "nina.k@email.com", joined: "2025-01-10", status: "active", volume: "$9,800", commission: "$147.00", trades: 41 },
]

const COMMISSIONS: Commission[] = [
  { date: "Jan 28, 2025", client: "Li Wei", type: "Volume Rebate", amount: "+$84.25", status: "paid" },
  { date: "Jan 27, 2025", client: "Alex Turner", type: "Spread Share", amount: "+$62.10", status: "paid" },
  { date: "Jan 26, 2025", client: "Sarah Mitchell", type: "Volume Rebate", amount: "+$44.70", status: "pending" },
  { date: "Jan 25, 2025", client: "Li Wei", type: "Spread Share", amount: "+$91.30", status: "paid" },
  { date: "Jan 24, 2025", client: "Priya Sharma", type: "Volume Rebate", amount: "+$28.40", status: "paid" },
  { date: "Jan 23, 2025", client: "Nina Kowalski", type: "Spread Share", amount: "+$55.00", status: "processing" },
]

const PAYOUTS: Payout[] = [
  { id: "P-001", date: "Jan 28, 2025", amount: "$420.50", status: "completed", method: "Bank Transfer" },
  { id: "P-002", date: "Jan 21, 2025", amount: "$310.00", status: "completed", method: "Crypto" },
  { id: "P-003", date: "Jan 14, 2025", amount: "$250.00", status: "pending", method: "Skrill" },
  { id: "P-004", date: "Jan 07, 2025", amount: "$180.00", status: "failed", method: "Bank Transfer" },
]

const NAV_ITEMS: NavItem[] = [
  { key: "overview", label: "Overview", icon: Grid, children: [] },
  { key: "referrals", label: "Referrals", icon: Users, children: ["Referral Links", "Invite Clients", "My Clients"] },
  { key: "earnings", label: "Earnings", icon: DollarSign, children: ["Commissions", "Payouts"] },
  { key: "analytics", label: "Analytics", icon: BarChart2, children: ["Performance", "Reports"] },
  { key: "marketing", label: "Marketing", icon: Gift, children: ["Materials", "Banners"] },
  { key: "wallet", label: "Wallet", icon: Briefcase, children: [] },
  { key: "settings", label: "Settings", icon: Settings, children: ["Profile", "Security"] },
  { key: "support", label: "Support", icon: HelpCircle, children: [] },
]

const MONTHLY_DATA = [
  { m: "Aug", v: 320 }, { m: "Sep", v: 480 }, { m: "Oct", v: 290 },
  { m: "Nov", v: 610 }, { m: "Dec", v: 740 }, { m: "Jan", v: 547 },
]

const REF_LINK = "https://foxnance.com/ref/GZ-PARTNER-8821"

/* ─── COMPONENT ─────────────────────────────────────── */
export default function PartnerDashboard() {
  const [activeNav, setActiveNav] = useState("overview")
  const [expanded, setExpanded] = useState<string[]>(["referrals", "earnings", "analytics"])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("Last 30 days")
  const [dateOpen, setDateOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [copied, setCopied] = useState(false)
  const [searchQ, setSearchQ] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [tickerX, setTickerX] = useState(0)
  const tickRef = useRef<number | null>(null)

  /* Ticker */
  useEffect(() => {
    let x = 0
    const step = () => {
      x -= 0.45
      if (x <= -(TICKERS.length * 190)) x = 0
      setTickerX(x)
      tickRef.current = requestAnimationFrame(step)
    }
    tickRef.current = requestAnimationFrame(step)
    return () => { if (tickRef.current) cancelAnimationFrame(tickRef.current) }
  }, [])

  /* Theme persistence */
  useEffect(() => {
    const saved = localStorage.getItem("pd-theme")
    if (saved) setDarkMode(saved === "dark")
    else setDarkMode(true)
  }, [])

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem("pd-theme", next ? "dark" : "light")
  }

  const toggleNav = (key: string) => {
    setExpanded(p => p.includes(key) ? p.filter(k => k !== key) : [...p, key])
    setActiveNav(key)
  }

  const copyLink = () => {
    navigator.clipboard?.writeText(REF_LINK)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filtered = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQ.toLowerCase())
  )

  // Calculate stats
  const totalClients = CLIENTS.filter(c => c.status === "active").length
  const pendingClients = CLIENTS.filter(c => c.status === "pending").length
  const totalCommission = CLIENTS.reduce((sum, c) => sum + parseFloat(c.commission.replace(/[$,]/g, '') || '0'), 0)
  const pendingPayout = PAYOUTS.filter(p => p.status === "pending").reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '') || '0'), 0)
  const totalVolume = CLIENTS.reduce((sum, c) => sum + parseFloat(c.volume.replace(/[$,]/g, '') || '0'), 0)

  const KPIS = [
    { label: "Total Clients", val: String(totalClients), sub: `${pendingClients} pending`, icon: Users, color: "#3b82f6", bar: "78%" },
    { label: "Pending Payout", val: `$${pendingPayout.toFixed(2)}`, sub: "Processing", icon: CreditCard, color: "#f59e0b", bar: "44%" },
    { label: "Total Commission", val: `$${totalCommission.toFixed(2)}`, sub: "+12.4% this month", icon: DollarSign, color: "#3fcb1b", bar: "82%" },
    { label: "Total Volume", val: `$${totalVolume.toFixed(0)}`, sub: "+8.1% this month", icon: Activity, color: "#8b5cf6", bar: "90%" },
  ]

  return (
    <div className={`pd ${darkMode ? "pd--dark" : "pd--light"}`}>

      {/* ════ SIDEBAR ════ */}
      <aside className={`pd__aside ${sidebarOpen ? "open" : ""}`}>

        {/* Logo */}
        <div className="pd__aside-logo">
          <div className="pd__logo-img">
            <Image
              src="/images/FoxnanceMain.png"
              width={130} height={34} alt="Foxnance"
              style={{
                objectFit: "contain", height: 34, width: "auto",
                filter: darkMode ? "brightness(1.15)" : "brightness(0) saturate(100%)"
              }}
              priority
            />
          </div>
          <span className="pd__portal-label">Partner Portal</span>
          <button className="pd__close" onClick={() => setSidebarOpen(false)}><X size={15} /></button>
        </div>

        {/* User chip */}
        <div className="pd__user-chip">
          <div className="pd__user-av">GZ</div>
          <div className="pd__user-meta">
            <span className="pd__user-name">Gulam Zain</span>
            <span className="pd__user-id">ID: PTR-88210</span>
          </div>
          <div className="pd__user-tier"><Star size={10} fill="currentColor" /> Gold</div>
        </div>

        {/* Nav */}
        <nav className="pd__nav">
          {NAV_ITEMS.map(item => (
            <div key={item.key}>
              <button
                className={`pd__nav-row${activeNav === item.key ? " pd__nav-row--active" : ""}`}
                onClick={() => toggleNav(item.key)}
              >
                <item.icon size={15} className="pd__nav-icon" />
                <span className="pd__nav-label">{item.label}</span>
                {item.children.length > 0 && (
                  <ChevronDown size={12} className={`pd__nav-chev${expanded.includes(item.key) ? " rot" : ""}`} />
                )}
                {activeNav === item.key && <span className="pd__nav-pill" />}
              </button>
              {item.children.length > 0 && expanded.includes(item.key) && (
                <div className="pd__nav-sub">
                  {item.children.map(c => (
                    <button key={c} className="pd__nav-child">{c}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Disconnect */}
        <button className="pd__disconnect"><LogOut size={13} /> Disconnect MT5</button>
      </aside>

      {sidebarOpen && <div className="pd__overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ════ MAIN ════ */}
      <div className="pd__main">

        {/* Top bar */}
        <header className="pd__topbar">
          <div className="pd__topbar-l">
            <button className="pd__hamburger" onClick={() => setSidebarOpen(true)}><Menu size={19} /></button>
            <div>
              <p className="pd__topbar-title">Partner Dashboard</p>
              <p className="pd__topbar-sub">Manage your clients, commissions, and payouts</p>
            </div>
          </div>
          <div className="pd__topbar-r">
            <div className="pd__date-wrap">
              <button className="pd__date-btn" onClick={() => { setDateOpen(!dateOpen); setNotifOpen(false) }}>
                {dateRange} <ChevronDown size={12} />
              </button>
              {dateOpen && (
                <div className="pd__drop">
                  {["Last 7 days", "Last 30 days", "Last 90 days", "This year"].map(d => (
                    <button key={d} className={`pd__drop-item${dateRange === d ? " sel" : ""}`}
                      onClick={() => { setDateRange(d); setDateOpen(false) }}>{d}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="pd__icon-btn"><RefreshCw size={13} /></button>
            <button className="pd__icon-btn" onClick={toggleDark} title="Toggle theme">
              {darkMode ? <Sun size={13} /> : <Moon size={13} />}
            </button>
            <div className="pd__notif-wrap">
              <button className="pd__icon-btn pd__notif-btn" onClick={() => { setNotifOpen(!notifOpen); setDateOpen(false) }}>
                <Bell size={13} />
                <span className="pd__notif-badge">3</span>
              </button>
              {notifOpen && (
                <div className="pd__drop pd__drop--notif">
                  <p className="pd__drop-head">Notifications</p>
                  {[
                    { txt: "New client: Omar Hassan registered", t: "2h ago", dot: "green" },
                    { txt: "Commission $310.50 processed", t: "5h ago", dot: "blue" },
                    { txt: "Tier upgraded to Gold Partner", t: "1d ago", dot: "amber" },
                  ].map((n, i) => (
                    <div key={i} className="pd__notif-row">
                      <span className={`pd__notif-dot pd__notif-dot--${n.dot}`} />
                      <div>
                        <p className="pd__notif-txt">{n.txt}</p>
                        <p className="pd__notif-time">{n.t}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Ticker */}
        <div className="pd__ticker">
          <div className="pd__ticker-live"><span className="pd__ticker-dot" /> LIVE</div>
          <div className="pd__ticker-track">
            <div className="pd__ticker-inner" style={{ transform: `translateX(${tickerX}px)` }}>
              {[...TICKERS, ...TICKERS, ...TICKERS].map((t, i) => (
                <div key={i} className="pd__ticker-item">
                  <span className="pd__ticker-name">{t.n}</span>
                  <span className="pd__ticker-price">{t.v}</span>
                  <span className={`pd__ticker-chg ${t.up ? "up" : "dn"}`}>
                    {t.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{t.c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="pd__scroll">

          {/* Welcome banner */}
          <div className="pd__banner">
            <div className="pd__banner-l">
              <p className="pd__banner-greet"><span className="pd__banner-dot" /> PARTNER OVERVIEW</p>
              <h2 className="pd__banner-name">Welcome back, Gulam Zain <span>👋</span></h2>
              <p className="pd__banner-hint">Here&apos;s your partner performance overview</p>
            </div>
            <div className="pd__banner-r">
              <div className="pd__banner-stat">
                <div className="pd__banner-stat-ico"><Users size={15} /></div>
                <div>
                  <p className="pd__banner-stat-lbl">Total Clients</p>
                  <p className="pd__banner-stat-val">{totalClients}</p>
                </div>
              </div>
              <div className="pd__banner-stat">
                <div className="pd__banner-stat-ico pd__banner-stat-ico--green"><DollarSign size={15} /></div>
                <div>
                  <p className="pd__banner-stat-lbl">Total Earnings</p>
                  <p className="pd__banner-stat-val pd__banner-stat-val--green">+${totalCommission.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account-style tabs */}
          <div className="pd__acct-tabs">
            <button className="pd__acct-tab pd__acct-tab--active">
              <span className="pd__acct-dot pd__acct-dot--green" />
              PARTNER #PTR-88210
              <span className="pd__acct-badge">ACTIVE</span>
            </button>
            <button className="pd__acct-tab">
              <span className="pd__acct-dot pd__acct-dot--blue" />
              DEMO PARTNER
              <span className="pd__acct-badge pd__acct-badge--demo">DEMO</span>
            </button>
          </div>

          {/* Action buttons - Invite Client / Request Payout */}
          <div className="pd__action-grid">
            <button className="pd__action-primary">
              <UserPlus size={16} />
              Invite Client
              <span className="pd__action-badge">New</span>
            </button>
            <button className="pd__action-secondary">
              <CreditCard size={16} />
              Request Payout
            </button>
            <button className="pd__action-secondary">
              <Share2 size={16} />
              Share Link
            </button>
          </div>

          {/* KPI cards */}
          <div className="pd__kpi-grid">
            {KPIS.map((k, i) => (
              <div key={i} className="pd__kpi-card">
                <div className="pd__kpi-top">
                  <div className="pd__kpi-ico" style={{ background: `${k.color}22`, color: k.color }}>
                    <k.icon size={15} />
                  </div>
                  <span className="pd__kpi-label">{k.label.toUpperCase()}</span>
                </div>
                <p className="pd__kpi-val">{k.val}</p>
                <p className="pd__kpi-sub" style={{ color: k.sub.startsWith("+") ? k.color : "#94a3b8" }}>
                  {k.sub.startsWith("+") && <ArrowUpRight size={10} />}{k.sub}
                </p>
                <div className="pd__kpi-bar">
                  <div className="pd__kpi-bar-fill" style={{ width: k.bar, background: k.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Referral link bar */}
          <div className="pd__reflink">
            <Link2 size={14} className="pd__reflink-ico" />
            <div className="pd__reflink-info">
              <p className="pd__reflink-label">Your Referral Link</p>
              <p className="pd__reflink-url">
                {showLink ? REF_LINK : REF_LINK.replace(/(?<=.{30}).+/, "••••••")}
              </p>
            </div>
            <div className="pd__reflink-btns">
              <button className="pd__reflink-btn" onClick={() => setShowLink(!showLink)}>
                {showLink ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
              <button className="pd__reflink-btn" onClick={copyLink}>
                {copied ? <CheckCircle size={13} color="#3fcb1b" /> : <Copy size={13} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button className="pd__reflink-btn pd__reflink-btn--green">
                <ExternalLink size={13} /> Share
              </button>
            </div>
          </div>

          {/* Content tabs */}
          <div className="pd__tabs-row">
            {["overview", "my clients", "commissions", "analytics"].map(t => (
              <button key={t} className={`pd__tab${activeTab === t ? " active" : ""}`}
                onClick={() => setActiveTab(t)}>
                {t === "my clients" ? "My Clients" : t === "commissions" ? "Commission History" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* ══ OVERVIEW ══ */}
          {activeTab === "overview" && (
            <div className="pd__overview">
              {[
                { ico: Users, bg: "rgba(59,130,246,0.18)", c: "#3b82f6", label: "TOTAL CLIENTS", val: String(totalClients), sub: `${pendingClients} pending approval`, barW: "78%", barC: "#3b82f6" },
                { ico: DollarSign, bg: "rgba(63,203,27,0.18)", c: "#3fcb1b", label: "TOTAL COMMISSION EARNED", val: `$${totalCommission.toFixed(2)}`, sub: "+$186.60 this week", barW: "82%", barC: "#3fcb1b" },
                { ico: CreditCard, bg: "rgba(245,158,11,0.18)", c: "#f59e0b", label: "PENDING PAYOUT", val: `$${pendingPayout.toFixed(2)}`, sub: "Est. payout Feb 5", barW: "44%", barC: "#f59e0b" },
                { ico: Award, bg: "rgba(139,92,246,0.18)", c: "#8b5cf6", label: "PARTNER TIER", val: "Gold", sub: "Platinum at $5K/month", barW: "60%", barC: "#8b5cf6" },
              ].map((c, i) => (
                <div key={i} className="pd__ov-card">
                  <div className="pd__ov-top">
                    <div className="pd__ov-ico" style={{ background: c.bg, color: c.c }}><c.ico size={15} /></div>
                    <span className="pd__ov-label">{c.label}</span>
                  </div>
                  <p className="pd__ov-val">{c.val}</p>
                  <p className="pd__ov-sub" style={{ color: c.c }}>{c.sub}</p>
                  <div className="pd__ov-bar-track">
                    <div className="pd__ov-bar-fill" style={{ width: c.barW, background: c.barC }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ MY CLIENTS ══ */}
          {activeTab === "my clients" && (
            <div className="pd__card">
              <div className="pd__card-head">
                <p className="pd__card-title">My Clients</p>
                <div className="pd__card-actions">
                  <div className="pd__search-box">
                    <Search size={12} className="pd__search-ico" />
                    <input className="pd__search" placeholder="Search clients…"
                      value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                  </div>
                  <button className="pd__action-btn"><Filter size={12} /> Filter</button>
                  <button className="pd__action-btn"><Download size={12} /> Export</button>
                </div>
              </div>
              <div className="pd__table-wrap">
                <table className="pd__table">
                  <thead><tr>
                    <th>Client</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Volume</th>
                    <th>Commission</th>
                    <th>Trades</th>
                    <th></th>
                  </tr></thead>
                  <tbody>
                    {filtered.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div className="pd__client-cell">
                            <div className="pd__client-av">
                              {c.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="pd__client-name">{c.name}</p>
                              <p className="pd__client-email">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="pd__td-muted">{c.joined}</td>
                        <td>
                          <span className={`pd__status pd__status--${c.status}`}>
                            {c.status === "active" && <CheckCircle size={10} />}
                            {c.status === "pending" && <Clock size={10} />}
                            {c.status === "inactive" && <AlertCircle size={10} />}
                            {c.status}
                          </span>
                        </td>
                        <td className="pd__td-mono">{c.volume}</td>
                        <td className="pd__td-green">{c.commission}</td>
                        <td className="pd__td-muted">{c.trades}</td>
                        <td><button className="pd__row-btn"><ChevronRight size={13} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pd__card-foot">
                <span className="pd__td-muted">Total Clients: {filtered.length}</span>
                <span className="pd__td-green" style={{ fontSize: "1rem", fontWeight: 800 }}>
                  Total Commission: ${filtered.reduce((sum, c) => sum + parseFloat(c.commission.replace(/[$,]/g, '') || '0'), 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* ══ COMMISSION HISTORY ══ */}
          {activeTab === "commissions" && (
            <div className="pd__card">
              <div className="pd__card-head">
                <p className="pd__card-title">Commission History</p>
                <button className="pd__action-btn"><Download size={12} /> Export</button>
              </div>
              <div className="pd__table-wrap">
                <table className="pd__table">
                  <thead><tr>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr></thead>
                  <tbody>
                    {COMMISSIONS.map((c, i) => (
                      <tr key={i}>
                        <td className="pd__td-muted">{c.date}</td>
                        <td>{c.client}</td>
                        <td><span className="pd__comm-type">{c.type}</span></td>
                        <td className="pd__td-green">{c.amount}</td>
                        <td>
                          <span className={`pd__status pd__status--${c.status === "paid" ? "active" : c.status === "pending" ? "pending" : "processing"}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pd__card-foot">
                <span className="pd__td-muted">Total this period:</span>
                <span className="pd__td-green" style={{ fontSize: "1rem", fontWeight: 800 }}>+$365.75</span>
              </div>
            </div>
          )}

          {/* ══ ANALYTICS ══ */}
          {activeTab === "analytics" && (
            <div className="pd__perf">
              <div className="pd__perf-grid">
                {[
                  { l: "Commission Rate", v: "1.5%", s: "On total client volume" },
                  { l: "Partner Tier", v: "Gold", s: "Next: Platinum at $5K/mo" },
                  { l: "Avg. Client Vol.", v: `$${(totalVolume / Math.max(totalClients, 1)).toFixed(0)}`, s: "Per active client" },
                  { l: "Lifetime Earnings", v: `$${(totalCommission * 2.7).toFixed(2)}`, s: "Since Apr 2024" },
                ].map((p, i) => (
                  <div key={i} className="pd__perf-card">
                    <p className="pd__perf-label">{p.l}</p>
                    <p className="pd__perf-val">{p.v}</p>
                    <p className="pd__perf-sub">{p.s}</p>
                  </div>
                ))}
              </div>

              {/* Commission Chart */}
              <div className="pd__card">
                <div className="pd__card-head">
                  <p className="pd__card-title">Monthly Commission Earnings</p>
                </div>
                <div className="pd__bars">
                  {MONTHLY_DATA.map((b, i) => (
                    <div key={i} className="pd__bar-col">
                      <span className="pd__bar-val">${b.v}</span>
                      <div className="pd__bar-track">
                        <div className="pd__bar-fill" style={{ height: `${(b.v / 740) * 100}%` }} />
                      </div>
                      <span className="pd__bar-month">{b.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Distribution */}
              <div className="pd__card">
                <div className="pd__card-head">
                  <p className="pd__card-title">Client Distribution</p>
                </div>
                <div className="pd__dist-grid">
                  <div className="pd__dist-item">
                    <div className="pd__dist-donut">
                      <svg viewBox="0 0 100 100" className="pd__dist-svg">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="12"
                          strokeDasharray={`${(totalClients / Math.max(totalClients + pendingClients + 2, 1)) * 264} 264`}
                          strokeDashoffset="0" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="12"
                          strokeDasharray={`${(pendingClients / Math.max(totalClients + pendingClients + 2, 1)) * 264} 264`}
                          strokeDashoffset="-30" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#ef4444" strokeWidth="12"
                          strokeDasharray={`${(2 / Math.max(totalClients + pendingClients + 2, 1)) * 264} 264`}
                          strokeDashoffset="-60" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="pd__dist-legend">
                      <div className="pd__dist-legend-item">
                        <span className="pd__dist-dot" style={{ background: "#3b82f6" }} />
                        Active: {totalClients}
                      </div>
                      <div className="pd__dist-legend-item">
                        <span className="pd__dist-dot" style={{ background: "#f59e0b" }} />
                        Pending: {pendingClients}
                      </div>
                      <div className="pd__dist-legend-item">
                        <span className="pd__dist-dot" style={{ background: "#ef4444" }} />
                        Inactive: {CLIENTS.filter(c => c.status === "inactive").length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>{/* end scroll */}
      </div>{/* end main */}

      {/* ════ STYLES ════ */}
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }

        .pd {
          --green:     #3fcb1b;
          --green-dk:  #2e9c14;
          --green-dim: rgba(63,203,27,0.12);
          --ease:      cubic-bezier(0.16,1,0.3,1);
          font-family: 'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          display: grid;
          grid-template-columns: 210px 1fr;
          height: 100vh;
          overflow: hidden;
          transition: background .25s, color .25s;
        }
        @media(max-width:1023px){ .pd { grid-template-columns: 1fr; } }

        /* Dark */
        .pd--dark {
          --bg:      #0a0a0a;
          --bg2:     #111111;
          --bg3:     #1a1a1a;
          --bg4:     #242424;
          --border:  rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.13);
          --text:    #f0f0ee;
          --text2:   rgba(240,240,238,0.55);
          --text3:   rgba(240,240,238,0.32);
          background: var(--bg); color: var(--text);
        }
        /* Light */
        .pd--light {
          --bg:      #f4f5f7;
          --bg2:     #ffffff;
          --bg3:     #f0f1f3;
          --bg4:     #e8e9ec;
          --border:  rgba(0,0,0,0.07);
          --border2: rgba(0,0,0,0.13);
          --text:    #0a0a0a;
          --text2:   #6b7280;
          --text3:   #9ca3af;
          background: var(--bg); color: var(--text);
        }

        /* ── Sidebar ── */
        .pd__aside {
          background: var(--bg2);
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          overflow-y: auto; overflow-x: hidden;
          position: relative; z-index: 60;
          transition: transform .3s var(--ease), background .25s;
          scrollbar-width: none;
        }
        .pd__aside::-webkit-scrollbar { display: none; }
        @media(max-width:1023px){
          .pd__aside {
            position: fixed; top:0; left:0; bottom:0; width:210px;
            transform: translateX(-100%); z-index: 200;
          }
          .pd__aside.open { transform: translateX(0); box-shadow: 4px 0 40px rgba(0,0,0,0.5); }
        }
        .pd__overlay {
          display: none; position: fixed; inset:0;
          background: rgba(0,0,0,0.55); z-index: 190;
        }
        @media(max-width:1023px){ .pd__overlay { display: block; } }

        /* Logo area */
        .pd__aside-logo {
          padding: 18px 16px 12px;
          border-bottom: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 5px;
          position: relative;
        }
        .pd__portal-label {
          font-size: .6rem; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: var(--green);
          background: var(--green-dim); border: 1px solid rgba(63,203,27,.2);
          border-radius: 4px; padding: 2px 7px; width: fit-content;
        }
        .pd__close {
          display: none; position: absolute; top: 16px; right: 14px;
          background: none; border: none; color: var(--text2); cursor: pointer;
          padding: 4px; border-radius: 6px; transition: background .18s;
        }
        .pd__close:hover { background: var(--bg3); }
        @media(max-width:1023px){ .pd__close { display: flex; } }

        /* User chip */
        .pd__user-chip {
          margin: 12px 10px 8px; padding: 9px 11px;
          background: var(--bg3); border: 1px solid var(--border2);
          border-radius: 11px; display: flex; align-items: center; gap: 9px;
        }
        .pd__user-av {
          width:33px; height:33px; border-radius:50%; flex-shrink:0;
          background: var(--green); color: #000;
          display:flex; align-items:center; justify-content:center;
          font-size:.7rem; font-weight:900;
        }
        .pd__user-meta { flex:1; min-width:0; }
        .pd__user-name { font-size:.78rem; font-weight:700; color:var(--text); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .pd__user-id   { font-size:.64rem; color:var(--text3); display:block; margin-top:1px; }
        .pd__user-tier { display:flex; align-items:center; gap:3px; font-size:.63rem; font-weight:700; color:#f59e0b; flex-shrink:0; }

        /* Nav */
        .pd__nav { padding:6px 0; flex:1; }
        .pd__nav-row {
          width:100%; display:flex; align-items:center; gap:8px;
          padding:8px 14px; font-size:.8rem; font-weight:500;
          color:var(--text2); background:none; border:none; cursor:pointer;
          text-align:left; transition:all .18s; position:relative;
        }
        .pd__nav-row:hover { background:rgba(255,255,255,.03); color:var(--text); }
        .pd__nav-row--active { background:rgba(63,203,27,.1)!important; color:var(--green)!important; }
        .pd__nav-row--active .pd__nav-icon { color:var(--green); }
        .pd__nav-icon  { color:var(--text3); flex-shrink:0; }
        .pd__nav-label { flex:1; }
        .pd__nav-chev  { color:var(--text3); transition:transform .22s; }
        .pd__nav-chev.rot { transform:rotate(180deg); }
        .pd__nav-pill  {
          position:absolute; right:10px; top:50%; transform:translateY(-50%);
          width:6px; height:6px; border-radius:50%; background:var(--green);
          animation:pill-pulse 2s ease-in-out infinite;
        }
        @keyframes pill-pulse { 0%,100%{opacity:1;} 50%{opacity:.35;} }
        .pd__nav-sub { padding:2px 0 4px 37px; }
        .pd__nav-child {
          display:block; width:100%; padding:6px 10px;
          font-size:.74rem; color:var(--text3);
          background:none; border:none; cursor:pointer;
          text-align:left; border-radius:6px; transition:all .18s;
        }
        .pd__nav-child:hover { color:var(--text); background:rgba(255,255,255,.03); }

        /* Disconnect */
        .pd__disconnect {
          margin:10px; padding:8px 12px; width:calc(100% - 20px);
          display:flex; align-items:center; gap:7px;
          font-size:.76rem; font-weight:600; color:#ef4444;
          background:rgba(239,68,68,.07); border:1px solid rgba(239,68,68,.15);
          border-radius:9px; cursor:pointer; transition:all .2s;
        }
        .pd__disconnect:hover { background:rgba(239,68,68,.14); }

        /* ── Main ── */
        .pd__main { display:flex; flex-direction:column; overflow:hidden; min-width:0; }

        /* Topbar */
        .pd__topbar {
          padding:12px 22px;
          border-bottom:1px solid var(--border);
          background:var(--bg2);
          display:flex; align-items:center; justify-content:space-between;
          flex-shrink:0; gap:12px;
          transition:background .25s, border-color .25s;
        }
        @media(max-width:640px){ .pd__topbar { padding:10px 14px; } }
        .pd__topbar-l { display:flex; align-items:center; gap:10px; min-width:0; }
        .pd__hamburger {
          display:none; background:none; border:none;
          color:var(--text2); cursor:pointer; padding:5px;
          border-radius:7px; transition:all .18s;
        }
        .pd__hamburger:hover { background:var(--bg3); color:var(--text); }
        @media(max-width:1023px){ .pd__hamburger { display:flex; } }
        .pd__topbar-title { font-size:.95rem; font-weight:700; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .pd__topbar-sub   { font-size:.72rem; color:var(--text2); margin-top:1px; }
        @media(max-width:460px){ .pd__topbar-sub { display:none; } }
        .pd__topbar-r { display:flex; align-items:center; gap:7px; flex-shrink:0; }

        /* Date picker */
        .pd__date-wrap { position:relative; }
        .pd__date-btn {
          display:flex; align-items:center; gap:5px; padding:6px 11px;
          font-size:.76rem; font-weight:600; color:var(--text);
          background:var(--bg3); border:1px solid var(--border2);
          border-radius:7px; cursor:pointer; transition:all .18s; white-space:nowrap;
        }
        .pd__date-btn:hover { border-color:rgba(255,255,255,.22); }
        .pd__icon-btn {
          width:32px; height:32px; display:flex; align-items:center; justify-content:center;
          background:var(--bg3); border:1px solid var(--border);
          border-radius:7px; color:var(--text2); cursor:pointer; transition:all .18s;
        }
        .pd__icon-btn:hover { border-color:var(--border2); color:var(--text); }

        /* Dropdowns */
        .pd__drop {
          position:absolute; top:calc(100% + 7px); right:0;
          background:var(--bg3); border:1px solid var(--border2);
          border-radius:11px; z-index:100; min-width:155px;
          box-shadow:0 14px 36px rgba(0,0,0,.45); overflow:hidden;
        }
        .pd__drop-item {
          display:block; width:100%; padding:8px 13px;
          font-size:.78rem; color:var(--text2); background:none; border:none;
          cursor:pointer; text-align:left; transition:all .14s;
        }
        .pd__drop-item:hover { background:rgba(255,255,255,.05); color:var(--text); }
        .pd__drop-item.sel   { color:var(--green); }
        .pd__notif-wrap { position:relative; }
        .pd__notif-btn  { position:relative; }
        .pd__notif-badge {
          position:absolute; top:-4px; right:-4px;
          width:15px; height:15px; border-radius:50%;
          background:var(--green); color:#000;
          font-size:.58rem; font-weight:900;
          display:flex; align-items:center; justify-content:center;
        }
        .pd__drop--notif { min-width:272px; }
        .pd__drop-head { font-size:.68rem; font-weight:700; color:var(--text3); padding:9px 13px 5px; text-transform:uppercase; letter-spacing:.08em; border-bottom:1px solid var(--border); }
        .pd__notif-row { display:flex; align-items:flex-start; gap:9px; padding:9px 13px; border-bottom:1px solid var(--border); }
        .pd__notif-row:last-child { border-bottom:none; }
        .pd__notif-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; margin-top:4px; }
        .pd__notif-dot--green { background:var(--green); }
        .pd__notif-dot--blue  { background:#3b82f6; }
        .pd__notif-dot--amber { background:#f59e0b; }
        .pd__notif-txt  { font-size:.76rem; color:var(--text); margin-bottom:2px; line-height:1.38; }
        .pd__notif-time { font-size:.67rem; color:var(--text3); }

        /* Ticker */
        .pd__ticker {
          height:36px;
          background:rgba(63,203,27,.06);
          border-bottom:1px solid rgba(63,203,27,.12);
          display:flex; align-items:center; overflow:hidden; flex-shrink:0;
        }
        .pd__ticker-live {
          flex-shrink:0; padding:0 11px 0 18px;
          font-size:.6rem; font-weight:900; color:var(--green);
          border-right:1px solid rgba(63,203,27,.2);
          height:100%; display:flex; align-items:center; gap:5px;
          background:rgba(63,203,27,.07);
        }
        .pd__ticker-dot  { width:5px; height:5px; border-radius:50%; background:var(--green); animation:pill-pulse 1.4s ease-in-out infinite; }
        .pd__ticker-track { flex:1; overflow:hidden; }
        .pd__ticker-inner { display:flex; white-space:nowrap; will-change:transform; }
        .pd__ticker-item  { display:inline-flex; align-items:center; gap:7px; padding:0 16px; border-right:1px solid rgba(255,255,255,.05); min-width:185px; }
        .pd__ticker-name  { font-size:.7rem; font-weight:700; color:var(--text2); }
        .pd__ticker-price { font-family:monospace; font-size:.68rem; color:var(--text3); }
        .pd__ticker-chg   { display:inline-flex; align-items:center; gap:2px; font-family:monospace; font-size:.66rem; font-weight:600; }
        .pd__ticker-chg.up { color:#10b981; }
        .pd__ticker-chg.dn { color:#ef4444; }

        /* Scroll area */
        .pd__scroll {
          flex:1; overflow-y:auto; overflow-x:hidden;
          padding:18px 20px 32px;
          display:flex; flex-direction:column; gap:14px;
          scrollbar-width:thin;
          scrollbar-color:rgba(255,255,255,.1) transparent;
        }
        .pd__scroll::-webkit-scrollbar { width:4px; }
        .pd__scroll::-webkit-scrollbar-track { background:transparent; }
        .pd__scroll::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:2px; }
        @media(max-width:640px){ .pd__scroll { padding:14px 12px 28px; } }

        /* Action buttons grid */
        .pd__action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        @media(max-width:768px){
          .pd__action-grid {
            grid-template-columns: 1fr;
          }
        }
        .pd__action-primary, .pd__action-secondary {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 16px;
          border-radius: 12px;
          font-size: .85rem; font-weight: 700;
          cursor: pointer; transition: all .25s;
          border: none;
          position: relative;
        }
        .pd__action-primary {
          background: linear-gradient(135deg, var(--green), var(--green-dk));
          color: #000;
        }
        .pd__action-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(63,203,27,.3);
        }
        .pd__action-secondary {
          background: var(--bg3);
          color: var(--text2);
          border: 1px solid var(--border2);
        }
        .pd__action-secondary:hover {
          border-color: var(--text2);
          color: var(--text);
        }
        .pd__action-badge {
          font-size: .55rem; font-weight: 800;
          padding: 2px 6px; border-radius: 4px;
          background: #ef4444; color: #fff;
          text-transform: uppercase;
          letter-spacing: .05em;
        }

        /* Banner */
        .pd__banner {
          background:linear-gradient(135deg,rgba(63,203,27,.1),rgba(63,203,27,.03));
          border:1px solid rgba(63,203,27,.16);
          border-radius:14px; padding:20px 22px;
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:16px;
        }
        .pd__banner-greet { font-size:.65rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--green); display:flex; align-items:center; gap:5px; margin-bottom:5px; }
        .pd__banner-dot   { width:6px; height:6px; border-radius:50%; background:var(--green); animation:pill-pulse 2s infinite; }
        .pd__banner-name  { font-size:clamp(1.2rem,2.5vw,1.6rem); font-weight:900; color:var(--text); letter-spacing:-.02em; }
        .pd__banner-hint  { font-size:.78rem; color:var(--text2); margin-top:3px; }
        .pd__banner-r     { display:flex; gap:10px; flex-wrap:wrap; }
        .pd__banner-stat  { display:flex; align-items:center; gap:9px; background:var(--bg3); border:1px solid var(--border); border-radius:11px; padding:10px 14px; }
        .pd__banner-stat-ico { width:32px; height:32px; border-radius:8px; background:var(--bg4); display:flex; align-items:center; justify-content:center; color:var(--text2); }
        .pd__banner-stat-ico--green { background:rgba(63,203,27,.15); color:var(--green); }
        .pd__banner-stat-lbl { font-size:.66rem; color:var(--text3); display:block; }
        .pd__banner-stat-val { font-size:.88rem; font-weight:800; color:var(--text); display:block; margin-top:1px; }
        .pd__banner-stat-val--green { color:var(--green); }

        /* Account tabs */
        .pd__acct-tabs { display:flex; gap:8px; flex-wrap:wrap; }
        .pd__acct-tab {
          display:inline-flex; align-items:center; gap:6px;
          padding:7px 14px; border-radius:20px;
          font-size:.76rem; font-weight:600; cursor:pointer;
          background:var(--bg3); border:1px solid var(--border2);
          color:var(--text2); transition:all .2s;
        }
        .pd__acct-tab--active { background:rgba(63,203,27,.1); border-color:rgba(63,203,27,.35); color:var(--text); }
        .pd__acct-dot { width:7px; height:7px; border-radius:50%; }
        .pd__acct-dot--green { background:var(--green); animation:pill-pulse 1.5s infinite; }
        .pd__acct-dot--blue  { background:#3b82f6; }
        .pd__acct-badge { font-size:.58rem; font-weight:800; letter-spacing:.08em; padding:2px 6px; border-radius:4px; background:var(--green); color:#000; }
        .pd__acct-badge--demo { background:rgba(59,130,246,.18); color:#60a5fa; }

        /* KPI grid */
        .pd__kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        @media(max-width:1200px){ .pd__kpi-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:500px){  .pd__kpi-grid { grid-template-columns:1fr; } }

        .pd__kpi-card { background:var(--bg2); border:1px solid var(--border); border-radius:14px; padding:16px 16px 14px; transition:border-color .25s, transform .25s; }
        .pd__kpi-card:hover { border-color:var(--border2); transform:translateY(-2px); }
        .pd__kpi-top   { display:flex; align-items:center; gap:9px; margin-bottom:10px; }
        .pd__kpi-ico   { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; }
        .pd__kpi-label { font-size:.62rem; font-weight:700; letter-spacing:.07em; color:var(--text3); text-transform:uppercase; }
        .pd__kpi-val   { font-size:1.3rem; font-weight:900; color:var(--text); margin-bottom:4px; }
        .pd__kpi-sub   { font-size:.7rem; display:flex; align-items:center; gap:2px; color:var(--text3); margin-bottom:10px; }
        .pd__kpi-bar   { height:3px; background:var(--bg4); border-radius:2px; overflow:hidden; }
        .pd__kpi-bar-fill { height:100%; border-radius:2px; transition:width .8s var(--ease); }

        /* Ref link */
        .pd__reflink { background:var(--bg2); border:1px solid var(--border2); border-radius:12px; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
        .pd__reflink-ico   { color:var(--green); flex-shrink:0; }
        .pd__reflink-info  { flex:1; min-width:0; }
        .pd__reflink-label { font-size:.68rem; font-weight:600; color:var(--text2); margin-bottom:2px; }
        .pd__reflink-url   { font-family:monospace; font-size:.76rem; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:380px; }
        @media(max-width:580px){ .pd__reflink-url { max-width:160px; } }
        .pd__reflink-btns  { display:flex; align-items:center; gap:7px; flex-shrink:0; }
        .pd__reflink-btn { display:flex; align-items:center; gap:5px; padding:6px 11px; font-size:.76rem; font-weight:600; color:var(--text2); background:var(--bg3); border:1px solid var(--border); border-radius:7px; cursor:pointer; transition:all .18s; }
        .pd__reflink-btn:hover { border-color:var(--border2); color:var(--text); }
        .pd__reflink-btn--green { background:var(--green); color:#000; border-color:var(--green); }
        .pd__reflink-btn--green:hover { background:var(--green-dk); }

        /* Content tabs */
        .pd__tabs-row { display:flex; gap:3px; border-bottom:1px solid var(--border); }
        .pd__tab { padding:8px 16px; font-size:.8rem; font-weight:600; color:var(--text3); background:none; border:none; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-1px; transition:all .18s; text-transform:capitalize; }
        .pd__tab:hover { color:var(--text); }
        .pd__tab.active { color:var(--green); border-bottom-color:var(--green); }

        /* Overview cards */
        .pd__overview { display:flex; flex-direction:column; gap:10px; }
        .pd__ov-card { background:var(--bg2); border:1px solid var(--border); border-radius:14px; padding:20px 22px; transition:border-color .25s; }
        .pd__ov-card:hover { border-color:var(--border2); }
        .pd__ov-top   { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
        .pd__ov-ico   { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; }
        .pd__ov-label { font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--text3); }
        .pd__ov-val   { font-size:1.6rem; font-weight:900; color:var(--text); margin-bottom:5px; }
        .pd__ov-sub   { font-size:.78rem; font-weight:600; margin-bottom:12px; }
        .pd__ov-bar-track { height:3px; background:var(--bg4); border-radius:2px; overflow:hidden; }
        .pd__ov-bar-fill  { height:100%; border-radius:2px; transition:width .8s var(--ease); }

        /* Generic card */
        .pd__card { background:var(--bg2); border:1px solid var(--border); border-radius:14px; overflow:hidden; }
        .pd__card-head { padding:13px 16px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); flex-wrap:wrap; gap:8px; }
        .pd__card-title { font-size:.84rem; font-weight:700; color:var(--text); }
        .pd__card-actions { display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
        .pd__card-foot { padding:10px 16px; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:flex-end; gap:10px; font-size:.8rem; color:var(--text2); }

        /* Search */
        .pd__search-box { position:relative; display:flex; align-items:center; }
        .pd__search-ico { position:absolute; left:9px; color:var(--text3); }
        .pd__search { padding:6px 9px 6px 28px; font-size:.76rem; background:var(--bg3); border:1px solid var(--border); border-radius:7px; color:var(--text); outline:none; width:170px; transition:all .2s; }
        .pd__search::placeholder { color:var(--text3); }
        .pd__search:focus { border-color:rgba(63,203,27,.4); width:200px; }
        .pd__action-btn { display:flex; align-items:center; gap:5px; padding:6px 11px; font-size:.75rem; font-weight:600; color:var(--text2); background:var(--bg3); border:1px solid var(--border); border-radius:7px; cursor:pointer; transition:all .18s; white-space:nowrap; }
        .pd__action-btn:hover { border-color:var(--border2); color:var(--text); }

        /* Table */
        .pd__table-wrap { overflow-x:auto; }
        .pd__table { width:100%; border-collapse:collapse; }
        .pd__table thead tr { border-bottom:1px solid var(--border); }
        .pd__table th { padding:9px 14px; font-size:.68rem; font-weight:700; color:var(--text3); text-align:left; white-space:nowrap; text-transform:uppercase; letter-spacing:.07em; }
        .pd__table td { padding:11px 14px; font-size:.8rem; color:var(--text); border-bottom:1px solid var(--border); }
        .pd__table tbody tr:last-child td { border-bottom:none; }
        .pd__table tbody tr:hover td { background:rgba(255,255,255,.018); }
        .pd__client-cell  { display:flex; align-items:center; gap:9px; }
        .pd__client-av    { width:28px; height:28px; border-radius:50%; flex-shrink:0; background:rgba(63,203,27,.14); color:var(--green); display:flex; align-items:center; justify-content:center; font-size:.62rem; font-weight:900; }
        .pd__client-name  { font-size:.8rem; font-weight:600; color:var(--text); }
        .pd__client-email { font-size:.7rem; color:var(--text3); margin-top:1px; }
        .pd__td-muted  { color:var(--text3); font-size:.76rem; }
        .pd__td-mono   { font-family:monospace; font-size:.78rem; color:var(--text2); }
        .pd__td-green  { font-family:monospace; font-size:.8rem; color:#10b981; font-weight:700; }
        .pd__comm-type { font-size:.72rem; color:var(--text2); background:var(--bg3); padding:2px 7px; border-radius:5px; border:1px solid var(--border); }
        .pd__status { display:inline-flex; align-items:center; gap:4px; font-size:.7rem; font-weight:600; padding:3px 8px; border-radius:99px; }
        .pd__status--active     { background:rgba(16,185,129,.12); color:#10b981; }
        .pd__status--pending    { background:rgba(245,158,11,.12);  color:#f59e0b; }
        .pd__status--inactive   { background:rgba(239,68,68,.1);    color:#ef4444; }
        .pd__status--processing { background:rgba(59,130,246,.1);   color:#60a5fa; }
        .pd__row-btn { width:26px; height:26px; border-radius:6px; background:var(--bg3); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--text3); cursor:pointer; transition:all .18s; }
        .pd__row-btn:hover { border-color:var(--border2); color:var(--green); }

        /* Performance */
        .pd__perf { display:flex; flex-direction:column; gap:12px; }
        .pd__perf-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        @media(max-width:1100px){ .pd__perf-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px){  .pd__perf-grid { grid-template-columns:1fr 1fr; } }
        .pd__perf-card { background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:16px; transition:border-color .25s; }
        .pd__perf-card:hover { border-color:rgba(63,203,27,.25); }
        .pd__perf-label { font-size:.66rem; color:var(--text3); text-transform:uppercase; letter-spacing:.06em; margin-bottom:5px; }
        .pd__perf-val   { font-size:1.4rem; font-weight:900; color:var(--green); margin-bottom:3px; }
        .pd__perf-sub   { font-size:.72rem; color:var(--text2); }

        /* Bar chart */
        .pd__bars { display:flex; align-items:flex-end; gap:10px; height:160px; padding:20px 16px 0; }
        .pd__bar-col   { flex:1; display:flex; flex-direction:column; align-items:center; gap:5px; height:100%; }
        .pd__bar-val   { font-size:.63rem; font-weight:700; color:var(--text3); white-space:nowrap; }
        .pd__bar-track { flex:1; width:100%; background:var(--bg3); border-radius:4px 4px 0 0; overflow:hidden; display:flex; align-items:flex-end; border:1px solid var(--border); }
        .pd__bar-fill  { width:100%; background:linear-gradient(to top,var(--green-dk),var(--green)); border-radius:4px 4px 0 0; min-height:4px; transition:height .7s var(--ease); }
        .pd__bar-month { font-size:.66rem; color:var(--text3); font-weight:600; }

        /* Client Distribution */
        .pd__dist-grid { padding: 20px; }
        .pd__dist-item { display:flex; align-items:center; gap:30px; justify-content:center; flex-wrap:wrap; }
        .pd__dist-donut { width:140px; height:140px; flex-shrink:0; }
        .pd__dist-svg { width:100%; height:100%; transform:rotate(-90deg); }
        .pd__dist-legend { display:flex; flex-direction:column; gap:8px; }
        .pd__dist-legend-item { display:flex; align-items:center; gap:10px; font-size:.85rem; color:var(--text2); }
        .pd__dist-dot { width:12px; height:12px; border-radius:50%; flex-shrink:0; }

        /* Mobile tweaks */
        @media(max-width:640px){
          .pd__banner-r { display:none; }
          .pd__table th:nth-child(2), .pd__table td:nth-child(2) { display:none; }
        }
        @media(max-width:400px){
          .pd__kpi-grid  { grid-template-columns:1fr; }
          .pd__perf-grid { grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  )
}