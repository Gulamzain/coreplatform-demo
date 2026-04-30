// src/app/partners/introducing-brokers/page.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  BiDollar, BiShield, BiGlobe, BiLineChart, BiSupport,
  BiGroup, BiTrophy, BiRocket, BiCheckCircle, BiUserCheck,
  BiBarChart, BiWallet, BiLinkAlt, BiHeadphone, BiBarChartSquare,
  BiMobile, BiTime
} from 'react-icons/bi';
import {
  FiArrowRight, FiCheck, FiChevronDown, FiChevronUp,
  FiUsers, FiDollarSign, FiTrendingUp, FiAward,
  FiGlobe, FiZap, FiBarChart2, FiPieChart
} from 'react-icons/fi';
import { FaHandshake, FaChartLine, FaPercentage, FaRegClock } from 'react-icons/fa';

const Navbar = dynamic(() => import('../../componets/Navbar/navbar'));
import Footer from '../../componets/Footer/footer';
import CookieModal from '../../componets/cookieModal';

// ─── DATA ───────────────────────────────────────────────────────────────
const ibBenefits = [
  {
    icon: FiDollarSign,
    title: 'Up to $15 per Lot',
    subtitle: 'Industry-Leading Commission',
    desc: 'Earn generous, transparent commissions on every trade your referred clients make. No caps, no ceilings.',
    color: '#3fcb1b',
  },
  {
    icon: FiTrendingUp,
    title: 'Real-Time Tracking',
    subtitle: 'Full Transparency',
    desc: 'Monitor your network performance, client activity, and earnings live via your dedicated IB portal.',
    color: '#3fcb1b',
  },
  {
    icon: FiUsers,
    title: 'Unlimited Sub-IBs',
    subtitle: 'Multi-Tier Structure',
    desc: 'Build a network of sub-IBs and earn commissions from their clients too. Scale your earnings exponentially.',
    color: '#3fcb1b',
  },
  {
    icon: FiGlobe,
    title: '40+ Countries',
    subtitle: 'Global Reach',
    desc: 'Refer clients from anywhere in the world with full localization, multi-language support and local payments.',
    color: '#3fcb1b',
  },
  {
    icon: FiZap,
    title: 'Instant Payouts',
    subtitle: 'Weekly or Monthly',
    desc: 'Choose your payout schedule. Withdrawals processed within 24 hours with no minimum threshold.',
    color: '#3fcb1b',
  },
  {
    icon: FiAward,
    title: 'Dedicated IB Manager',
    subtitle: 'Personal Support',
    desc: 'Get a dedicated account manager who knows your business and helps you grow your referral network.',
    color: '#3fcb1b',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Apply Online',
    desc: 'Complete a simple IB application form. Our team reviews and approves within 24 hours.',
    icon: FiUsers,
  },
  {
    step: '02',
    title: 'Get Your IB Link',
    desc: 'Receive your unique referral link, marketing materials, and access to your IB dashboard.',
    icon: BiLinkAlt,
  },
  {
    step: '03',
    title: 'Refer Traders',
    desc: 'Share your link via your website, social media, or personal network. We track every referral.',
    icon: BiGroup,
  },
  {
    step: '04',
    title: 'Earn Commissions',
    desc: 'Earn rebates on every trade your clients make. Watch your passive income grow.',
    icon: FiDollarSign,
  },
];

const commissionTiers = [
  {
    tier: 'Starter',
    clients: '1 – 10',
    perLot: '$5.00',
    monthly: 'Up to $2,000',
    features: ['IB Dashboard Access', 'Marketing Materials', 'Email Support', 'Monthly Payouts'],
    highlight: false,
  },
  {
    tier: 'Pro',
    clients: '11 – 50',
    perLot: '$10.00',
    monthly: 'Up to $15,000',
    features: ['Everything in Starter', 'Dedicated IB Manager', 'Weekly Payouts', 'Sub-IB Structure', 'Co-branded Materials'],
    highlight: true,
  },
  {
    tier: 'Elite',
    clients: '50+',
    perLot: '$15.00',
    monthly: 'Unlimited',
    features: ['Everything in Pro', 'Custom Commission Plan', 'Daily Payouts', 'Priority Support', 'VIP Events Access', 'Revenue Share Model'],
    highlight: false,
  },
];

const tools = [
  { icon: BiBarChart, label: 'Live IB Dashboard' },
  { icon: BiWallet, label: 'Multi-Currency Wallet' },
  { icon: BiMobile, label: 'Mobile IB App' },
  { icon: BiBarChartSquare, label: 'Performance Analytics' },
  { icon: BiGroup, label: 'Sub-IB Management' },
  { icon: BiHeadphone, label: '24/7 Dedicated Support' },
];

const faqs = [
  {
    q: 'Who can become a Foxnance Introducing Broker?',
    a: 'Anyone with a network of potential traders can become an IB — financial professionals, traders, educators, bloggers, or social media influencers. We welcome partners from all backgrounds.',
  },
  {
    q: 'How are commissions calculated?',
    a: 'You earn a fixed rebate (from $5 to $15 per lot) on every trade your referred clients execute, regardless of whether they win or lose. The more clients you bring and the more they trade, the more you earn.',
  },
  {
    q: 'When and how do I receive my commissions?',
    a: 'Commissions are paid weekly or monthly depending on your tier. You can withdraw via bank transfer, e-wallets, or cryptocurrency. Payouts are processed within 24 hours of your request.',
  },
  {
    q: 'Is there a minimum client requirement?',
    a: 'No minimum requirement to get started. Bring even one client and start earning. As your network grows, you automatically unlock higher commission tiers.',
  },
  {
    q: 'Can I have sub-IBs under me?',
    a: 'Yes. Pro and Elite IBs can build a multi-tier network of sub-IBs and earn additional commissions from their clients\' trading activity, creating a true passive income stream.',
  },
  {
    q: 'What marketing support does Foxnance provide?',
    a: 'We provide branded banners, landing pages, email templates, educational content, webinar support, and co-branded materials. Your dedicated manager helps create campaigns tailored to your market.',
  },
];

const stats = [
  { val: '$2.4M+', label: 'Paid to IBs in 2024' },
  { val: '3,200+', label: 'Active IB Partners' },
  { val: '40+', label: 'Countries Covered' },
  { val: '24h', label: 'Approval Time' },
];

// ─── PAGE ───────────────────────────────────────────────────────────────
export default function IBPartnersPage() {
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [heroReady, setHeroReady] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const refs = useRef<{ [k: string]: HTMLElement | null }>({});

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 120);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id]));
      }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && io.observe(el));
    const onMouse = (e: MouseEvent) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => { clearTimeout(t); io.disconnect(); window.removeEventListener('mousemove', onMouse); };
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  return (
    <>
      <Navbar navClass={undefined} navJustify={undefined} bg={undefined} />

      <div id="ib-page">

        {/* ── HERO ── */}
        <section className="ib-hero">
          <div className="ib-hero__canvas">
            <div className="ib-hero__noise" />
            <div className="ib-hero__aurora ib-aurora-1"
              style={{ transform: `translate(${mousePos.x * 28}px, ${mousePos.y * 18}px)` }} />
            <div className="ib-hero__aurora ib-aurora-2"
              style={{ transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 24}px)` }} />
            <svg className="ib-hero__grid" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ibgrid" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(63,203,27,0.055)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ibgrid)" />
            </svg>
            {/* Animated ticker-style line */}
            <div className="ib-hero__ticker-line" />
          </div>

          <div className={`ib-hero__inner ${heroReady ? 'ready' : ''}`}>
            {/* Left — copy */}
            <div className="ib-hero__copy">
              <h1 className="ib-hero__title h-item h-d0">
                Turn Your Network<br />
                Into <span className="ib-hero__accent">Passive Income</span>
              </h1>
              <p className="ib-hero__desc h-item h-d1">
                Join thousands of Introducing Brokers earning up to <strong>$15 per lot</strong> by referring traders to Foxnance — the multi-regulated broker trusted by 500,000+ clients worldwide.
              </p>
              <div className="ib-hero__actions h-item h-d2">
                <Link href="/partners/ib-apply" className="ib-btn-primary">
                  Become an IB Partner <FiArrowRight />
                </Link>
                <Link href="#how-it-works" className="ib-btn-ghost">
                  How It Works
                </Link>
              </div>

            </div>

            {/* Right — floating commission card */}
            <div className="ib-hero__visual h-item h-d1">
              <div className="ib-earn-card">
                <div className="ib-earn-card__glow" />
                <div className="ib-earn-card__header">
                  <span className="ib-earn-card__label">Your Estimated Monthly Earnings</span>
                  <span className="ib-earn-card__live"><span className="ib-earn-card__live-dot" />Live</span>
                </div>
                <div className="ib-earn-card__amount">$12,480</div>
                <div className="ib-earn-card__meta">Based on 30 active clients · 8 lots/month avg.</div>
                <div className="ib-earn-card__breakdown">
                  {[
                    { label: 'Commission per Lot', val: '$10.00' },
                    { label: 'Total Lots (monthly)', val: '1,248' },
                    { label: 'Commission Tier', val: 'Pro' },
                  ].map((r, i) => (
                    <div key={i} className="ib-earn-card__row">
                      <span>{r.label}</span>
                      <span className="ib-earn-card__row-val">{r.val}</span>
                    </div>
                  ))}
                </div>
                <div className="ib-earn-card__bar-wrap">
                  <div className="ib-earn-card__bar-track">
                    <div className="ib-earn-card__bar-fill" style={{ width: '72%' }} />
                  </div>
                  <span className="ib-earn-card__bar-label">72% to Elite Tier</span>
                </div>
                <Link href="/partners/ib-apply" className="ib-earn-card__cta">
                  Start Earning Today <FiArrowRight size={14} />
                </Link>
              </div>

              {/* Floating badge cards */}
              <div className="ib-float-badge ib-float-badge--tl">
                <FiUsers size={16} />
                <div>
                  <strong>3,200+</strong>
                  <span>Active IBs</span>
                </div>
              </div>
              <div className="ib-float-badge ib-float-badge--br">
                <FiDollarSign size={16} />
                <div>
                  <strong>$2.4M+</strong>
                  <span>Paid Out 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ib-hero__scroll"><div className="ib-hero__scroll-dot" /></div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="ib-stats-strip">
          <div className="ib-container">
            <div className="ib-stats-row">
              {stats.map((s, i) => (
                <div key={i} className="ib-stat-item">
                  <span className="ib-stat-val">{s.val}</span>
                  <span className="ib-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section
          id="benefits"
          ref={setRef('benefits')}
          className={`ib-section ib-section--light ib-reveal ${visible.has('benefits') ? 'on' : ''}`}
        >
          <div className="ib-container">
            <div className="ib-section-head">
              <span className="ib-eyebrow">Why Partner With Us</span>
              <h2 className="ib-h2">Everything You Need to Succeed</h2>
              <p className="ib-sub">Industry-leading tools, commissions, and support to build a thriving IB business</p>
            </div>
            <div className="ib-benefits-grid">
              {ibBenefits.map((b, i) => (
                <div key={i} className="ib-benefit-card" style={{ '--bi': i } as React.CSSProperties}>
                  <div className="ib-benefit-card__icon-wrap">
                    <b.icon size={26} />
                  </div>
                  <div className="ib-benefit-card__body">
                    <span className="ib-benefit-card__subtitle">{b.subtitle}</span>
                    <h3 className="ib-benefit-card__title">{b.title}</h3>
                    <p className="ib-benefit-card__desc">{b.desc}</p>
                  </div>
                  <div className="ib-benefit-card__shine" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          id="how-it-works"
          ref={setRef('how-it-works')}
          className={`ib-section ib-section--dark ib-reveal ${visible.has('how-it-works') ? 'on' : ''}`}
        >
          <div className="ib-container">
            <div className="ib-section-head">
              <span className="ib-eyebrow">Simple Process</span>
              <h2 className="ib-h2">Get Started in 4 Easy Steps</h2>
              <p className="ib-sub">From application to first payout in as little as 48 hours</p>
            </div>
            <div className="ib-steps">
              {howItWorks.map((s, i) => (
                <div key={i} className="ib-step" style={{ '--si': i } as React.CSSProperties}>
                  <div className="ib-step__connector" />
                  <div className="ib-step__icon-wrap">
                    <s.icon size={24} />
                    <div className="ib-step__icon-ring" />
                  </div>
                  <div className="ib-step__num">{s.step}</div>
                  <h3 className="ib-step__title">{s.title}</h3>
                  <p className="ib-step__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMISSION TIERS ── */}
        <section
          id="commissions"
          ref={setRef('commissions')}
          className={`ib-section ib-section--light ib-reveal ${visible.has('commissions') ? 'on' : ''}`}
        >
          <div className="ib-container">
            <div className="ib-section-head">
              <span className="ib-eyebrow">Commission Structure</span>
              <h2 className="ib-h2">Transparent, Tiered Rewards</h2>
              <p className="ib-sub">The more you grow, the more you earn. Upgrade automatically as your network expands.</p>
            </div>
            <div className="ib-tiers">
              {commissionTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`ib-tier-card ${tier.highlight ? 'highlighted' : ''}`}
                  style={{ '--ti': i } as React.CSSProperties}
                >
                  {tier.highlight && <div className="ib-tier-card__badge">Most Popular</div>}
                  <div className="ib-tier-card__glow" />
                  <div className="ib-tier-card__header">
                    <span className="ib-tier-card__name">{tier.tier}</span>
                    <div className="ib-tier-card__amount">{tier.perLot}<span>/lot</span></div>
                    <div className="ib-tier-card__clients">{tier.clients} active clients</div>
                  </div>
                  <div className="ib-tier-card__monthly">
                    <span className="ib-tier-card__monthly-label">Est. Monthly Earnings</span>
                    <span className="ib-tier-card__monthly-val">{tier.monthly}</span>
                  </div>
                  <ul className="ib-tier-card__features">
                    {tier.features.map((f, j) => (
                      <li key={j}>
                        <FiCheck size={14} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/partners/ib-apply"
                    className={`ib-tier-card__cta ${tier.highlight ? 'primary' : 'outline'}`}
                  >
                    Get Started <FiArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
            <p className="ib-tiers__note">
              * Commission rates may vary based on instrument type. Custom rates available for Elite partners.
              <Link href="/contact"> Contact us</Link> to discuss your specific needs.
            </p>
          </div>
        </section>

        {/* ── IB TOOLS ── */}
        <section
          id="tools"
          ref={setRef('tools')}
          className={`ib-section ib-section--dark ib-reveal ${visible.has('tools') ? 'on' : ''}`}
        >
          <div className="ib-container">
            <div className="ib-tools-layout">
              <div className="ib-tools__copy">
                <span className="ib-eyebrow">IB Toolkit</span>
                <h2 className="ib-h2">All the Tools You Need<br />to Scale</h2>
                <p className="ib-body">
                  Foxnance gives every IB partner a professional-grade suite of tools — from real-time analytics to 
                  a branded referral portal — so you can focus on growing your network, not managing spreadsheets.
                </p>
                <div className="ib-tools__grid">
                  {tools.map((tool, i) => (
                    <div key={i} className="ib-tool-chip" style={{ '--tci': i } as React.CSSProperties}>
                      <tool.icon size={18} />
                      <span>{tool.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/partners/ib-apply" className="ib-btn-primary" style={{ marginTop: '32px', display: 'inline-flex' }}>
                  Access IB Portal <FiArrowRight />
                </Link>
              </div>
              <div className="ib-tools__dashboard">
                <div className="ib-dashboard-mock">
                  <div className="ib-dashboard-mock__header">
                    <div className="ib-dashboard-mock__dot" />
                    <div className="ib-dashboard-mock__dot" />
                    <div className="ib-dashboard-mock__dot" />
                    <span>IB Partner Dashboard</span>
                  </div>
                  <div className="ib-dashboard-mock__body">
                    <div className="ib-dash-kpi-row">
                      {[
                        { l: 'Total Earnings', v: '$12,480', up: true },
                        { l: 'Active Clients', v: '34', up: true },
                        { l: 'This Month Lots', v: '1,248', up: false },
                      ].map((k, i) => (
                        <div key={i} className="ib-dash-kpi">
                          <span className="ib-dash-kpi__label">{k.l}</span>
                          <span className="ib-dash-kpi__val">{k.v}</span>
                          <span className={`ib-dash-kpi__change ${k.up ? 'up' : 'down'}`}>
                            {k.up ? '↑ 14%' : '↓ 3%'}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Chart bars */}
                    <div className="ib-dash-chart">
                      <div className="ib-dash-chart__label">Monthly Commission</div>
                      <div className="ib-dash-chart__bars">
                        {[40, 55, 48, 70, 62, 85, 78, 92, 88, 100, 95, 72].map((h, i) => (
                          <div
                            key={i}
                            className="ib-dash-bar"
                            style={{ height: `${h}%`, '--bar-i': i, '--bar-h': `${h}%` } as React.CSSProperties}
                          />
                        ))}
                      </div>
                      <div className="ib-dash-chart__months">
                        {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                          <span key={i}>{m}</span>
                        ))}
                      </div>
                    </div>
                    {/* Recent activity */}
                    <div className="ib-dash-activity">
                      <div className="ib-dash-activity__title">Recent Commissions</div>
                      {[
                        { client: 'Client #1042', lots: '12 lots', earned: '+$120.00', time: '2m ago' },
                        { client: 'Client #0891', lots: '8 lots',  earned: '+$80.00',  time: '18m ago' },
                        { client: 'Client #1210', lots: '5 lots',  earned: '+$50.00',  time: '1h ago' },
                      ].map((row, i) => (
                        <div key={i} className="ib-dash-activity__row">
                          <div className="ib-dash-activity__avatar">{row.client.slice(-2)}</div>
                          <div className="ib-dash-activity__info">
                            <span>{row.client}</span>
                            <span className="ib-dash-activity__lots">{row.lots} · {row.time}</span>
                          </div>
                          <span className="ib-dash-activity__earned">{row.earned}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ (Dark) ── */}
        <section
          id="faq"
          ref={setRef('faq')}
          className={`ib-section ib-section--dark ib-reveal ${visible.has('faq') ? 'on' : ''}`}
        >
          <div className="ib-container">
            <div className="ib-faq-grid">
              <div className="ib-faq__head">
                <span className="ib-eyebrow">FAQ</span>
                <h2 className="ib-h2 ib-h2--white">Common Questions</h2>
                <p className="ib-body ib-body--muted">
                  Have more questions? Our IB team is available 24/7 to help you get started.
                </p>
                <Link href="/contact" className="ib-btn-outline-dk" style={{ marginTop: '20px', display: 'inline-flex' }}>
                  Talk to IB Team <FiArrowRight />
                </Link>
              </div>
              <div className="ib-faq__list">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`ib-faq-item ${openFaq === i ? 'open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="ib-faq-item__q">
                      <span>{faq.q}</span>
                      <div className="ib-faq-item__icon">
                        {openFaq === i ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </div>
                    </div>
                    <div className="ib-faq-item__a">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="ib-cta-section ib-cta-light">
          <div className="ib-container">
            <div className="ib-cta-card">
              <div className="ib-cta-card__orb ib-cta-card__orb--1" />
              <div className="ib-cta-card__orb ib-cta-card__orb--2" />
              <div className="ib-cta-card__inner">
                <div className="ib-cta-card__icon"><FaHandshake size={36} /></div>
                <h2 className="ib-cta-card__title">Ready to Grow With Foxnance?</h2>
                <p className="ib-cta-card__desc">
                  Join 3,200+ IB partners already earning with Foxnance. Apply today — no joining fee, no minimum client requirement, fast approval.
                </p>
                <div className="ib-cta-card__actions">
                  <Link href="/partners/ib-apply" className="ib-btn-primary ib-btn-primary--lg">
                    Apply Now — It's Free <FiArrowRight />
                  </Link>
                  <Link href="/contact" className="ib-btn-ghost ib-btn-ghost--light">
                    Speak to an Expert
                  </Link>
                </div>
                <div className="ib-cta-card__chips">
                  {['No joining fee', 'Approval in 24h', 'Weekly payouts', 'Dedicated support'].map((c, i) => (
                    <span key={i} className="ib-cta-chip">
                      <FiCheck size={11} />{c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
      <CookieModal />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

        /* ══ TOKENS ══ */
        #ib-page {
          --g:        #3fcb1b;
          --g-dk:     #2e9c14;
          --g-glow:   rgba(63,203,27,0.22);
          --g-faint:  rgba(63,203,27,0.07);
          --g-border: rgba(63,203,27,0.22);

          --dk-bg:      #0c0f0a;
          --dk-card:    #141914;
          --dk-border:  rgba(255,255,255,0.08);
          --dk-text:    #edf0ea;
          --dk-text2:   rgba(255,255,255,0.52);

          --lt-bg:      #f8fafc;
          --lt-card:    #ffffff;
          --lt-border:  #e2e8f0;
          --lt-text:    #0c0f0a;
          --lt-text2:   #6b7280;

          --sh-sm: 0 2px 8px rgba(0,0,0,0.06);
          --sh-md: 0 8px 32px rgba(0,0,0,0.10);
          --sh-lg: 0 24px 64px rgba(0,0,0,0.14);
          --sh-g:  0 8px 32px rgba(63,203,27,0.18);
          --r-sm: 10px; --r-md: 18px; --r-lg: 28px;
          --ease: cubic-bezier(0.16,1,0.3,1);
          font-family: 'Sora', 'DM Sans', system-ui, sans-serif;
          background: var(--dk-bg);
          color: var(--dk-text);
        }
        #ib-page *, #ib-page *::before, #ib-page *::after { box-sizing: border-box; }

        /* ══ LAYOUT ══ */
        .ib-container { max-width:1240px; margin:0 auto; padding:0 28px; }
        @media(min-width:1024px){ .ib-container { padding:0 60px; } }
        .ib-section { padding:100px 0; }
        .ib-reveal { opacity:0; transform:translateY(44px); transition:opacity .85s var(--ease),transform .85s var(--ease); }
        .ib-reveal.on { opacity:1; transform:translateY(0); }

        /* ── DARK SECTION ── */
        .ib-section--dark { background: var(--dk-bg); }
        .ib-section--dark .ib-h2 { color: var(--dk-text) !important; }
        .ib-section--dark .ib-sub,
        .ib-section--dark .ib-body { color: var(--dk-text2) !important; }

        /* ── LIGHT SECTION ── */
        .ib-section--light { background: var(--lt-bg); }
        .ib-section--light .ib-h2 { color: var(--lt-text) !important; }
        .ib-section--light .ib-sub { color: var(--lt-text2) !important; }

        /* ══ SECTION HEAD ══ */
        .ib-section-head { text-align:center; margin-bottom:64px; display:flex; flex-direction:column; align-items:center; }
        .ib-eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          font-size:.7rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
          color:var(--g); margin-bottom:14px;
        }
        .ib-eyebrow::before,.ib-eyebrow::after { content:''; display:block; width:28px; height:1.5px; background:currentColor; opacity:.5; border-radius:2px; }
        .ib-h2 { font-size:clamp(1.9rem,4vw,2.9rem); font-weight:900; letter-spacing:-.04em; line-height:1.15; color:var(--dk-text); margin:0 0 10px; }
        .ib-h2--white { color:#fff !important; }
        .ib-sub  { font-size:1rem; color:var(--dk-text2); line-height:1.7; max-width:500px; margin:0 auto; }
        .ib-body { font-size:.94rem; color:var(--dk-text2); line-height:1.78; margin-bottom:16px; }
        .ib-body--muted { color:var(--dk-text2) !important; }

        /* ══ HERO ══ */
        .ib-hero {
          position:relative; min-height:680px; background:var(--dk-bg);
          overflow:hidden; padding-top:80px;
          display:flex; flex-direction:column; align-items:center;
        }
        .ib-hero__canvas { position:absolute; inset:0; pointer-events:none; z-index:0; }
        .ib-hero__noise {
          position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size:180px; opacity:.4;
        }
        .ib-hero__aurora { position:absolute; border-radius:50%; filter:blur(100px); transition:transform .8s var(--ease); will-change:transform; }
        .ib-aurora-1 { width:600px; height:600px; background:radial-gradient(circle,rgba(63,203,27,.2),transparent 70%); top:-180px; right:-80px; }
        .ib-aurora-2 { width:420px; height:420px; background:radial-gradient(circle,rgba(45,180,10,.14),transparent 70%); bottom:-80px; left:-60px; animation:ibAurora 12s ease-in-out infinite; }
        @keyframes ibAurora { 0%,100%{transform:translate(0,0);} 50%{transform:translate(20px,-20px);} }
        .ib-hero__grid { position:absolute; inset:0; width:100%; height:100%; }
        .ib-hero__ticker-line {
          position:absolute; bottom:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(63,203,27,.4) 30%,rgba(63,203,27,.8) 50%,rgba(63,203,27,.4) 70%,transparent);
          animation:tickerLine 3s linear infinite;
        }
        @keyframes tickerLine { 0%{transform:translateX(-100%);} 100%{transform:translateX(100%);} }

        .ib-hero__inner {
          display:grid; grid-template-columns:1fr 1fr; gap:60px;
          align-items:center; width:100%; max-width:1240px; margin:0 auto;
          padding:60px 28px 80px; position:relative; z-index:1;
        }
        @media(min-width:1024px){ .ib-hero__inner { padding:60px 60px 80px; } }
        @media(max-width:900px){ .ib-hero__inner { grid-template-columns:1fr; gap:40px; } }

        .h-item { opacity:0; transform:translateY(48px); transition:opacity .9s var(--ease),transform .9s var(--ease); }
        .ib-hero__inner.ready .h-item { opacity:1; transform:translateY(0); }
        .h-d0{transition-delay:.1s;} .h-d1{transition-delay:.25s;} .h-d2{transition-delay:.4s;}
        .h-d3{transition-delay:.55s;}

        .ib-hero__title {
          font-size:clamp(2.4rem,5.5vw,4rem); font-weight:900;
          line-height:1.12; color:#fff; letter-spacing:-.045em; margin:0 0 20px;
        }
        .ib-hero__accent {
          background:linear-gradient(135deg,#3fcb1b 0%,#7de84a 50%,#3fcb1b 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; animation:accentShimmer 4s linear infinite;
        }
        @keyframes accentShimmer { 0%{background-position:0% center;} 100%{background-position:200% center;} }
        .ib-hero__desc { font-size:1rem; color:rgba(237,240,234,.62); line-height:1.72; margin:0 0 32px; }
        .ib-hero__desc strong { color:rgba(237,240,234,.9); font-weight:700; }
        .ib-hero__actions { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:28px; }

        /* ── BUTTONS ── */
        .ib-btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; background:var(--g); color:#000;
          font-weight:800; font-size:.88rem; border-radius:100px;
          text-decoration:none; transition:all .3s var(--ease); position:relative; overflow:hidden;
        }
        .ib-btn-primary::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          transform:translateX(-100%); transition:transform .5s var(--ease);
        }
        .ib-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(63,203,27,.38); }
        .ib-btn-primary:hover::before { transform:translateX(100%); }
        .ib-btn-primary--lg { padding:16px 36px; font-size:.95rem; }

        .ib-btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; background:transparent;
          color:rgba(237,240,234,.8); font-weight:700; font-size:.88rem;
          border:1.5px solid rgba(255,255,255,.18); border-radius:100px;
          text-decoration:none; transition:all .3s var(--ease);
        }
        .ib-btn-ghost:hover { border-color:var(--g); color:var(--g); transform:translateY(-3px); }
        .ib-btn-ghost--light { color:rgba(237,240,234,.75); border-color:rgba(255,255,255,.22); }
        .ib-btn-ghost--light:hover { color:#fff; border-color:rgba(255,255,255,.5); }

        .ib-btn-outline-dk {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 24px; background:transparent;
          color:var(--g); font-weight:700; font-size:.88rem;
          border:1px solid rgba(63,203,27,.3); border-radius:100px;
          text-decoration:none; transition:all .3s var(--ease);
        }
        .ib-btn-outline-dk:hover { background:rgba(63,203,27,.1); transform:translateY(-2px); }

        /* ── EARN CARD ── */
        .ib-hero__visual { position:relative; display:flex; justify-content:center; align-items:center; }
        .ib-earn-card {
          background:rgba(22,26,20,.9); border:1px solid rgba(63,203,27,.25);
          border-radius:var(--r-lg); padding:28px; width:340px; max-width:100%;
          backdrop-filter:blur(20px); box-shadow:0 24px 64px rgba(0,0,0,.5),0 0 0 1px rgba(63,203,27,.12);
          position:relative; overflow:hidden;
        }
        .ib-earn-card__glow {
          position:absolute; top:-60px; right:-60px; width:200px; height:200px;
          background:radial-gradient(circle,rgba(63,203,27,.2),transparent);
          border-radius:50%; filter:blur(40px); pointer-events:none;
        }
        .ib-earn-card__header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
        .ib-earn-card__label { font-size:.72rem; color:rgba(237,240,234,.45); font-weight:500; }
        .ib-earn-card__live { display:flex; align-items:center; gap:5px; font-size:.65rem; color:#82e86a; font-weight:700; }
        .ib-earn-card__live-dot { width:6px; height:6px; background:#3fcb1b; border-radius:50%; animation:ibBadgePulse 2s ease-in-out infinite; }
        @keyframes ibBadgePulse { 0%,100%{box-shadow:0 0 0 0 rgba(63,203,27,.5);} 50%{box-shadow:0 0 0 6px rgba(63,203,27,0);} }
        .ib-earn-card__amount { font-size:2.2rem; font-weight:900; color:var(--g); letter-spacing:-.04em; line-height:1.1; margin-bottom:4px; }
        .ib-earn-card__meta { font-size:.7rem; color:rgba(237,240,234,.4); margin-bottom:18px; }
        .ib-earn-card__breakdown { border-top:1px solid rgba(255,255,255,.07); padding-top:14px; margin-bottom:16px; display:flex; flex-direction:column; gap:8px; }
        .ib-earn-card__row { display:flex; justify-content:space-between; font-size:.76rem; color:rgba(237,240,234,.5); }
        .ib-earn-card__row-val { color:rgba(237,240,234,.85); font-weight:700; }
        .ib-earn-card__bar-wrap { margin-bottom:18px; }
        .ib-earn-card__bar-track { height:5px; background:rgba(255,255,255,.08); border-radius:100px; overflow:hidden; margin-bottom:5px; }
        .ib-earn-card__bar-fill { height:100%; background:linear-gradient(90deg,var(--g),#7de84a); border-radius:100px; animation:barFill .8s var(--ease) 1s both; }
        @keyframes barFill { from{width:0!important;} }
        .ib-earn-card__bar-label { font-size:.65rem; color:rgba(63,203,27,.7); }
        .ib-earn-card__cta {
          display:flex; align-items:center; justify-content:center; gap:6px;
          width:100%; padding:12px; background:var(--g); color:#000;
          font-weight:800; font-size:.84rem; border-radius:var(--r-sm);
          text-decoration:none; transition:all .3s;
        }
        .ib-earn-card__cta:hover { box-shadow:0 8px 24px rgba(63,203,27,.4); transform:translateY(-2px); }

        /* Float badges */
        .ib-float-badge {
          position:absolute; display:flex; align-items:center; gap:8px;
          background:rgba(22,26,20,.92); border:1px solid rgba(63,203,27,.22);
          border-radius:12px; padding:10px 14px;
          backdrop-filter:blur(12px); box-shadow:0 8px 24px rgba(0,0,0,.4);
          font-size:.72rem; color:rgba(237,240,234,.8);
          animation:floatBadge 4s ease-in-out infinite;
        }
        .ib-float-badge--tl { top:-20px; left:-30px; }
        .ib-float-badge--br { bottom:-16px; right:-24px; animation-direction:reverse; animation-delay:.5s; }
        .ib-float-badge svg { color:var(--g); }
        .ib-float-badge strong { display:block; font-size:.9rem; font-weight:800; color:#fff; }
        .ib-float-badge span { display:block; font-size:.64rem; color:rgba(237,240,234,.45); }
        @keyframes floatBadge { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @media(max-width:640px){ .ib-float-badge{display:none;} }

        .ib-hero__scroll { position:absolute; bottom:24px; left:50%; transform:translateX(-50%); z-index:1; width:24px; height:38px; border:1.5px solid rgba(255,255,255,.18); border-radius:100px; display:flex; justify-content:center; padding-top:7px; }
        .ib-hero__scroll-dot { width:4px; height:8px; background:var(--g); border-radius:100px; animation:ibScrollBob 2s ease-in-out infinite; }
        @keyframes ibScrollBob { 0%,100%{opacity:1;transform:translateY(0);} 60%{opacity:.3;transform:translateY(10px);} }

        /* ══ STATS STRIP ══ */
        .ib-stats-strip { background:var(--dk-bg); border-bottom:1px solid rgba(63,203,27,.12); }
        .ib-stats-row { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:0; padding:28px 0; }
        .ib-stat-item { flex:1; min-width:140px; max-width:220px; display:flex; flex-direction:column; align-items:center; padding:12px 20px; position:relative; }
        .ib-stat-item+.ib-stat-item::before { content:''; position:absolute; left:0; top:20%; bottom:20%; width:1px; background:rgba(255,255,255,.1); }
        .ib-stat-val { font-size:clamp(1.4rem,3vw,2rem); font-weight:900; color:var(--g); letter-spacing:-.04em; }
        .ib-stat-lbl { font-size:.7rem; color:rgba(237,240,234,.4); font-weight:500; margin-top:3px; }

        /* ══ BENEFITS (Light) ══ */
        .ib-benefits-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media(max-width:900px){ .ib-benefits-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px){ .ib-benefits-grid { grid-template-columns:1fr; } }

        .ib-benefit-card {
          display:flex; gap:18px; align-items:flex-start;
          background:var(--lt-card); border:1px solid var(--lt-border);
          border-radius:var(--r-md); padding:26px 22px;
          box-shadow:var(--sh-sm); cursor:pointer; position:relative; overflow:hidden;
          transition:transform .3s var(--ease),box-shadow .3s,border-color .3s;
        }
        .ib-benefit-card:hover { transform:translateY(-6px); border-color:var(--g-border); box-shadow:var(--sh-g),var(--sh-md); }
        .ib-benefit-card__icon-wrap {
          width:50px; height:50px; flex-shrink:0;
          background:var(--g-faint); color:var(--g);
          border-radius:14px; display:flex; align-items:center; justify-content:center;
          border:1px solid var(--g-border); transition:all .3s var(--ease);
        }
        .ib-benefit-card:hover .ib-benefit-card__icon-wrap { background:var(--g); color:#000; box-shadow:0 6px 20px rgba(63,203,27,.3); transform:scale(1.06) rotate(-4deg); }
        .ib-benefit-card__subtitle { font-size:.66rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--g); display:block; margin-bottom:4px; }
        .ib-benefit-card__title { font-size:1rem; font-weight:800; color:var(--lt-text); margin:0 0 8px; }
        .ib-benefit-card__desc { font-size:.82rem; color:var(--lt-text2); line-height:1.6; margin:0; }
        .ib-benefit-card__shine { position:absolute; inset:0; opacity:0; background:linear-gradient(135deg,transparent 40%,rgba(63,203,27,.05) 100%); transition:opacity .3s; border-radius:inherit; pointer-events:none; }
        .ib-benefit-card:hover .ib-benefit-card__shine { opacity:1; }

        /* ══ HOW IT WORKS (Dark) ══ */
        .ib-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; }
        @media(max-width:900px){ .ib-steps { grid-template-columns:repeat(2,1fr); gap:32px; } }
        @media(max-width:520px){ .ib-steps { grid-template-columns:1fr; } }

        .ib-step { display:flex; flex-direction:column; align-items:center; text-align:center; padding:32px 20px; position:relative; transition:transform .3s var(--ease); }
        .ib-step:hover { transform:translateY(-6px); }
        .ib-step__connector { position:absolute; top:54px; left:calc(50% + 32px); right:0; height:1.5px; background:linear-gradient(90deg,rgba(63,203,27,.25),transparent); pointer-events:none; }
        .ib-step:last-child .ib-step__connector { display:none; }
        @media(max-width:900px){ .ib-step__connector { display:none; } }
        .ib-step__icon-wrap {
          width:64px; height:64px; position:relative;
          background:var(--dk-card); color:var(--g);
          border:2px solid rgba(63,203,27,.3); border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          box-shadow:var(--sh-g); margin-bottom:16px; z-index:1;
          transition:all .3s var(--ease);
        }
        .ib-step:hover .ib-step__icon-wrap { background:var(--g); color:#000; border-color:var(--g); box-shadow:0 12px 32px rgba(63,203,27,.35); }
        .ib-step__icon-ring { position:absolute; inset:-8px; border-radius:50%; border:1px dashed rgba(63,203,27,.2); animation:ibRingSpin 12s linear infinite; }
        @keyframes ibRingSpin { to{transform:rotate(360deg);} }
        .ib-step__num { position:absolute; top:-6px; right:-6px; width:22px; height:22px; background:var(--g); color:#000; border-radius:50%; font-size:.65rem; font-weight:900; display:flex; align-items:center; justify-content:center; z-index:2; }
        .ib-step__title { font-size:1rem; font-weight:800; color:var(--dk-text); margin:0 0 8px; }
        .ib-step__desc { font-size:.82rem; color:var(--dk-text2); line-height:1.6; margin:0; max-width:200px; }

        /* ══ COMMISSION TIERS (Light) ══ */
        .ib-tiers { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; align-items:stretch; }
        @media(max-width:900px){ .ib-tiers { grid-template-columns:1fr; max-width:440px; margin:0 auto; } }

        .ib-tier-card {
          background:var(--lt-card); border:1px solid var(--lt-border);
          border-radius:var(--r-lg); padding:32px 28px;
          position:relative; overflow:hidden; display:flex; flex-direction:column;
          box-shadow:var(--sh-sm); transition:transform .3s var(--ease),box-shadow .3s;
        }
        .ib-tier-card:hover { transform:translateY(-6px); box-shadow:var(--sh-md); }
        .ib-tier-card.highlighted { border-color:var(--g-border); box-shadow:var(--sh-g),var(--sh-md); background:linear-gradient(160deg,var(--lt-card) 60%,rgba(63,203,27,.04)); }
        .ib-tier-card__glow { position:absolute; top:-60px; left:50%; transform:translateX(-50%); width:220px; height:220px; background:radial-gradient(circle,var(--g-glow),transparent); border-radius:50%; filter:blur(40px); opacity:0; transition:opacity .4s; pointer-events:none; }
        .ib-tier-card.highlighted .ib-tier-card__glow, .ib-tier-card:hover .ib-tier-card__glow { opacity:1; }
        .ib-tier-card__badge { position:absolute; top:16px; right:16px; background:var(--g); color:#000; font-size:.65rem; font-weight:900; padding:3px 10px; border-radius:100px; letter-spacing:.06em; text-transform:uppercase; }
        .ib-tier-card__name { font-size:.75rem; font-weight:700; color:var(--g); letter-spacing:.12em; text-transform:uppercase; display:block; margin-bottom:8px; }
        .ib-tier-card__amount { font-size:2.4rem; font-weight:900; color:var(--lt-text); letter-spacing:-.04em; line-height:1; }
        .ib-tier-card__amount span { font-size:1rem; color:var(--lt-text2); font-weight:500; }
        .ib-tier-card__clients { font-size:.76rem; color:var(--lt-text2); margin-top:4px; }
        .ib-tier-card__monthly { display:flex; flex-direction:column; gap:3px; padding:14px 16px; background:var(--g-faint); border:1px solid var(--g-border); border-radius:var(--r-sm); margin-bottom:20px; }
        .ib-tier-card__monthly-label { font-size:.66rem; color:var(--lt-text2); font-weight:600; text-transform:uppercase; letter-spacing:.08em; }
        .ib-tier-card__monthly-val { font-size:1.1rem; font-weight:900; color:var(--g); }
        .ib-tier-card__features { list-style:none; margin:0 0 24px; padding:0; display:flex; flex-direction:column; gap:10px; flex:1; }
        .ib-tier-card__features li { display:flex; align-items:center; gap:9px; font-size:.82rem; color:var(--lt-text2); }
        .ib-tier-card__features li svg { color:var(--g); flex-shrink:0; }
        .ib-tier-card__cta { display:flex; align-items:center; justify-content:center; gap:7px; padding:12px 20px; border-radius:100px; font-weight:800; font-size:.86rem; text-decoration:none; transition:all .3s var(--ease); }
        .ib-tier-card__cta.primary { background:var(--g); color:#000; }
        .ib-tier-card__cta.primary:hover { box-shadow:0 8px 24px rgba(63,203,27,.4); transform:translateY(-2px); }
        .ib-tier-card__cta.outline { background:transparent; color:var(--lt-text); border:1.5px solid var(--lt-border); }
        .ib-tier-card__cta.outline:hover { border-color:var(--g-border); color:var(--g); }
        .ib-tiers__note { text-align:center; margin-top:24px; font-size:.78rem; color:var(--lt-text2); line-height:1.6; }
        .ib-tiers__note a { color:var(--g); text-decoration:none; }

        /* ══ TOOLS / DASHBOARD (Dark) ══ */
        .ib-tools-layout { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }
        @media(max-width:900px){ .ib-tools-layout { grid-template-columns:1fr; gap:48px; } }
        .ib-tools__copy .ib-h2 { color:var(--dk-text) !important; }
        .ib-tools__copy .ib-body { color:var(--dk-text2) !important; }
        .ib-tools__grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:20px; }
        .ib-tool-chip {
          display:flex; align-items:center; gap:10px;
          padding:12px 16px; background:var(--dk-card);
          border:1px solid var(--dk-border); border-radius:var(--r-sm);
          font-size:.8rem; font-weight:600; color:var(--dk-text);
          box-shadow:var(--sh-sm); transition:all .3s var(--ease); cursor:pointer;
        }
        .ib-tool-chip svg { color:var(--g); flex-shrink:0; }
        .ib-tool-chip:hover { border-color:var(--g-border); box-shadow:var(--sh-g); transform:translateY(-2px); }

        .ib-tools__dashboard { display:flex; justify-content:center; }
        .ib-dashboard-mock { width:100%; max-width:480px; background:var(--dk-card); border:1px solid var(--dk-border); border-radius:var(--r-lg); overflow:hidden; box-shadow:var(--sh-lg); }
        .ib-dashboard-mock__header { display:flex; align-items:center; gap:7px; padding:12px 18px; background:rgba(255,255,255,.03); border-bottom:1px solid var(--dk-border); font-size:.72rem; color:var(--dk-text2); font-weight:600; }
        .ib-dashboard-mock__dot { width:10px; height:10px; border-radius:50%; }
        .ib-dashboard-mock__dot:nth-child(1){background:#ff5f57;}
        .ib-dashboard-mock__dot:nth-child(2){background:#febc2e;}
        .ib-dashboard-mock__dot:nth-child(3){background:#28c840;}
        .ib-dashboard-mock__header span { margin-left:6px; }
        .ib-dashboard-mock__body { padding:18px; display:flex; flex-direction:column; gap:16px; }
        .ib-dash-kpi-row { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .ib-dash-kpi { background:rgba(255,255,255,.04); border:1px solid var(--dk-border); border-radius:var(--r-sm); padding:12px; text-align:center; }
        .ib-dash-kpi__label { font-size:.62rem; color:var(--dk-text2); display:block; margin-bottom:4px; }
        .ib-dash-kpi__val { font-size:.95rem; font-weight:900; color:var(--dk-text); display:block; }
        .ib-dash-kpi__change { font-size:.65rem; font-weight:700; display:block; margin-top:3px; }
        .ib-dash-kpi__change.up { color:#3fcb1b; }
        .ib-dash-kpi__change.down { color:#f87171; }
        .ib-dash-chart { background:rgba(255,255,255,.04); border:1px solid var(--dk-border); border-radius:var(--r-sm); padding:14px 12px 8px; }
        .ib-dash-chart__label { font-size:.65rem; color:var(--dk-text2); font-weight:600; margin-bottom:10px; }
        .ib-dash-chart__bars { display:flex; align-items:flex-end; gap:4px; height:60px; }
        .ib-dash-bar { flex:1; border-radius:3px 3px 0 0; background:linear-gradient(to top,var(--g),rgba(63,203,27,.4)); animation:barGrow .6s var(--ease) calc(var(--bar-i) * 0.05s) both; transform-origin:bottom; }
        @keyframes barGrow { from{transform:scaleY(0);} to{transform:scaleY(1);} }
        .ib-dash-chart__months { display:flex; gap:4px; margin-top:5px; }
        .ib-dash-chart__months span { flex:1; text-align:center; font-size:.55rem; color:var(--dk-text2); }
        .ib-dash-activity { display:flex; flex-direction:column; gap:10px; }
        .ib-dash-activity__title { font-size:.72rem; font-weight:700; color:var(--dk-text2); text-transform:uppercase; letter-spacing:.08em; margin-bottom:4px; }
        .ib-dash-activity__row { display:flex; align-items:center; gap:10px; padding:8px 10px; background:rgba(255,255,255,.04); border:1px solid var(--dk-border); border-radius:var(--r-sm); }
        .ib-dash-activity__avatar { width:30px; height:30px; background:var(--g-faint); border:1px solid var(--g-border); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.6rem; font-weight:800; color:var(--g); flex-shrink:0; }
        .ib-dash-activity__info { flex:1; }
        .ib-dash-activity__info span:first-child { display:block; font-size:.76rem; font-weight:700; color:var(--dk-text); }
        .ib-dash-activity__lots { font-size:.65rem; color:var(--dk-text2); }
        .ib-dash-activity__earned { font-size:.82rem; font-weight:800; color:#3fcb1b; white-space:nowrap; }

        /* ══ FAQ (Dark — MT5 style) ══ */
        .ib-faq-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:60px; align-items:start; }
        @media(max-width:900px){ .ib-faq-grid { grid-template-columns:1fr; gap:40px; } }

        .ib-faq__head .ib-h2 { color:#fff !important; }
        .ib-faq__head .ib-body { color:var(--dk-text2) !important; }
        .ib-faq__list { display:flex; flex-direction:column; gap:12px; }

        .ib-faq-item {
          background:var(--dk-card); border:1px solid var(--dk-border);
          border-radius:16px; cursor:pointer; overflow:hidden;
          transition:border-color .3s,box-shadow .3s;
        }
        .ib-faq-item:hover { border-color:rgba(63,203,27,.3); }
        .ib-faq-item.open { border-color:var(--g); background:rgba(63,203,27,.04); }
        .ib-faq-item__q {
          display:flex; justify-content:space-between; align-items:center;
          padding:18px 20px; gap:16px;
          font-size:.92rem; font-weight:600; color:var(--dk-text); line-height:1.4;
        }
        .ib-faq-item__icon { color:var(--g); transition:.3s; display:flex; align-items:center; flex-shrink:0; margin-left:12px; }
        .ib-faq-item__a { overflow:hidden; max-height:0; transition:max-height .4s var(--ease); }
        .ib-faq-item.open .ib-faq-item__a { max-height:300px; }
        .ib-faq-item__a p { margin:0; padding:14px 20px 18px; font-size:.85rem; color:var(--dk-text2); line-height:1.7; border-top:1px solid rgba(255,255,255,.06); }

        /* ══ CTA LIGHT ══ */
        .ib-cta-light { background:linear-gradient(135deg,#f8fafc 0%,#eef2ff 100%); padding:80px 0; }
        .ib-cta-light .ib-cta-card { background:#fff; border:1px solid #e2e8f0; box-shadow:0 24px 64px rgba(0,0,0,.08); }
        .ib-cta-light .ib-cta-card__title { color:#0c0f0a !important; }
        .ib-cta-light .ib-cta-card__desc { color:#6b7280 !important; }
        .ib-cta-light .ib-cta-chip { color:#6b7280; }
        .ib-cta-light .ib-btn-ghost--light { color:#556050; border-color:#d1d5db; }
        .ib-cta-light .ib-btn-ghost--light:hover { color:#0c0f0a; border-color:#6b7280; }

        .ib-cta-card { border-radius:var(--r-lg); padding:64px; position:relative; overflow:hidden; text-align:center; }
        @media(max-width:640px){ .ib-cta-card { padding:44px 28px; } }
        .ib-cta-card__orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
        .ib-cta-card__orb--1 { width:380px; height:380px; background:radial-gradient(circle,rgba(63,203,27,.1),transparent); top:-100px; right:-80px; animation:ibOrbDrift 10s ease-in-out infinite; }
        .ib-cta-card__orb--2 { width:280px; height:280px; background:radial-gradient(circle,rgba(45,180,10,.08),transparent); bottom:-70px; left:-50px; animation:ibOrbDrift 14s ease-in-out infinite reverse; }
        @keyframes ibOrbDrift { 0%,100%{transform:translate(0,0);} 50%{transform:translate(14px,-14px);} }
        .ib-cta-card__inner { position:relative; z-index:1; max-width:680px; margin:0 auto; }
        .ib-cta-card__icon { color:var(--g); margin-bottom:20px; display:inline-block; animation:floatIcon 3s ease-in-out infinite; }
        @keyframes floatIcon { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .ib-cta-card__title { font-size:clamp(1.6rem,3.5vw,2.6rem); font-weight:900; letter-spacing:-.04em; line-height:1.18; margin:0 0 16px; }
        .ib-cta-card__desc { font-size:.95rem; line-height:1.7; margin-bottom:32px; }
        .ib-cta-card__actions { display:flex; justify-content:center; gap:14px; flex-wrap:wrap; margin-bottom:28px; }
        .ib-cta-card__chips { display:flex; justify-content:center; flex-wrap:wrap; gap:14px; }
        .ib-cta-chip { display:inline-flex; align-items:center; gap:6px; font-size:.74rem; font-weight:500; }
        .ib-cta-chip svg { color:var(--g); }

        /* ══ RESPONSIVE ══ */
        @media(max-width:640px){
          .ib-section { padding:72px 0; }
          .ib-benefits-grid { gap:14px; }
          .ib-benefit-card { flex-direction:column; }
          .ib-tools__grid { grid-template-columns:1fr; }
          .ib-hero__title { font-size:2.2rem; }
          .ib-tiers { max-width:100%; }
        }
      `}</style>
    </>
  );
}