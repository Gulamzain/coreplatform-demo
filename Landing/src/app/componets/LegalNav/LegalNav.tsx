// Place this file at: src/app/componets/LegalNav/LegalNav.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LuShield, LuFileText, LuTriangle, LuChevronRight } from 'react-icons/lu'

const LEGAL_PAGES = [
  { href: '/privacy-policy',       label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/risk-warning',         label: 'Risk Warning' },
]

export default function LegalNav() {
  const pathname = usePathname()
  const current = LEGAL_PAGES.find(p => p.href === pathname)

  return (
    <>
      <style jsx>{`
        .ln-bar {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          transition: background 0.28s, border-color 0.28s;
        }
        .ln-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
          display: flex;
          align-items: center;
          height: 44px;
          gap: 6px;
        }
        .ln-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .ln-breadcrumb a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.18s;
          font-weight: 500;
        }
        .ln-breadcrumb a:hover { color: var(--green); }
        .ln-sep { 
          font-size: 10px; 
          opacity: 0.4;
          color: var(--text-muted);
        }
        .ln-current { 
          color: var(--green); 
          font-weight: 600; 
        }
        @media (max-width: 860px) {
          .ln-inner { padding: 0 20px; }
        }
      `}</style>

      <div className="ln-bar">
        <div className="ln-inner">
          <div className="ln-breadcrumb">
            <Link href="/">Home</Link>
            <LuChevronRight className="ln-sep" />
            <span>Legal</span>
            <LuChevronRight className="ln-sep" />
            <span className="ln-current">{current?.label}</span>
          </div>
        </div>
      </div>
    </>
  )
}