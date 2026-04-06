"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Shield } from 'react-feather'

export default function CookieModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show only if user hasn't accepted yet
    if (typeof window === 'undefined') return
    const accepted = localStorage.getItem('fx_cookies_accepted')
    if (!accepted) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('fx_cookies_accepted', 'true')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('fx_cookies_accepted', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fx-cookie">
      <div className="fx-cookie__inner">
        <div className="fx-cookie__icon">
          <Shield size={18} strokeWidth={1.8} />
        </div>

        <div className="fx-cookie__body">
          <p className="fx-cookie__text">
            We use cookies to enhance your trading experience and analyse site traffic.
            Read our{' '}
            {/* Use router/Link with no target — no new tab */}
            <Link href="/privacy" className="fx-cookie__link">
              Privacy Policy
            </Link>
            {' '}to learn more.
          </p>
        </div>

        <div className="fx-cookie__actions">
          <button className="fx-cookie__accept" onClick={accept}>
            Accept All
          </button>
          <button className="fx-cookie__decline" onClick={decline}>
            Decline
          </button>
        </div>

        <button className="fx-cookie__close" onClick={accept} aria-label="Close">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <style jsx global>{`
        .fx-cookie {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 99999;
          width: calc(100% - 48px);
          max-width: 680px;
          animation: fxCookieIn .4s cubic-bezier(.16,1,.3,1);
        }

        .fx-cookie__inner {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: #0A0A0A;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          box-shadow: 0 8px 48px rgba(0,0,0,0.4);
          flex-wrap: wrap;
        }

        .fx-cookie__icon {
          width: 36px; height: 36px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          background: rgba(26,108,242,0.15);
          color: #1A6CF2;
        }

        .fx-cookie__body {
          flex: 1; min-width: 200px;
        }

        .fx-cookie__text {
          font-size: .83rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.5;
          margin: 0;
          font-family: 'Aktiv Grotesk', 'Inter', sans-serif;
        }

        .fx-cookie__link {
          color: #1A6CF2;
          font-weight: 600;
          text-decoration: underline;
          /* No target="_blank" — stays in same tab */
        }
        .fx-cookie__link:hover { color: #4d8ff5; }

        .fx-cookie__actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .fx-cookie__accept {
          padding: 9px 20px;
          background: #1A6CF2;
          color: #fff;
          font-size: .82rem; font-weight: 700;
          border: none; border-radius: 8px; cursor: pointer;
          transition: all .2s;
          font-family: 'Aktiv Grotesk', 'Inter', sans-serif;
          white-space: nowrap;
        }
        .fx-cookie__accept:hover { background: #1559d4; transform: translateY(-1px); }

        .fx-cookie__decline {
          padding: 9px 16px;
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-size: .82rem; font-weight: 600;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px; cursor: pointer;
          transition: all .2s;
          font-family: 'Aktiv Grotesk', 'Inter', sans-serif;
          white-space: nowrap;
        }
        .fx-cookie__decline:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

        .fx-cookie__close {
          position: absolute;
          top: 10px; right: 10px;
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border: none; border-radius: 6px;
          color: rgba(255,255,255,0.5);
          cursor: pointer; transition: all .2s;
        }
        .fx-cookie__close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        @keyframes fxCookieIn {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @media (max-width: 540px) {
          .fx-cookie__inner { padding: 14px 16px; gap: 10px; }
          .fx-cookie__actions { width: 100%; }
          .fx-cookie__accept, .fx-cookie__decline { flex: 1; text-align: center; }
        }
      `}</style>
    </div>
  )
}