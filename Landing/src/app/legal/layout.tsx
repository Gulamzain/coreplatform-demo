// Place this file at: src/app/(legal)/layout.tsx
// ─────────────────────────────────────────────
// Create a (legal) route group folder and move your 3 pages inside:
//
//   src/app/
//   └── (legal)/
//       ├── layout.tsx          ← this file
//       ├── privacy-policy/
//       │   └── page.tsx
//       ├── terms-and-conditions/
//       │   └── page.tsx
//       └── risk-warning/
//           └── page.tsx
//
// The (legal) folder name with parentheses is a Next.js Route Group —
// it groups routes under a shared layout WITHOUT affecting the URL.
// /privacy-policy still works, not /(legal)/privacy-policy.

'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [key, setKey] = useState(pathname)

  useEffect(() => {
    // Fade out → update key (triggers new children) → fade in
    setVisible(false)
    const t = setTimeout(() => {
      setKey(pathname)
      setVisible(true)
    }, 160)
    return () => clearTimeout(t)
  }, [pathname])

  // Fade in on first mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style jsx global>{`
        .legal-transition {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.28s ease, transform 0.28s ease;
        }
        .legal-transition.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div
        key={key}
        className={`legal-transition ${visible ? 'in' : ''}`}
      >
        {children}
      </div>
    </>
  )
}