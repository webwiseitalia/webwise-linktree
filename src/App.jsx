import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import logoGrande from './assets/asset/asset-1.webp'
import DottedSurface from './components/DottedSurface'

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.23 8.23 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.22z" />
  </svg>
)

function App() {
  const logoRef = useRef(null)
  const trackRef = useRef(null)
  const titleText = 'WEBWISE'
  const [displayedTitle, setDisplayedTitle] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayedTitle(titleText.slice(0, i))
      if (i >= titleText.length) clearInterval(interval)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const logo = logoRef.current
    const track = trackRef.current
    if (!logo || !track) return

    const trackWidth = track.offsetWidth
    const logoSize = logo.offsetWidth
    const distance = Math.max(0, trackWidth - logoSize - 20)

    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    tl.fromTo(
      logo,
      { x: -distance / 2, rotation: 0 },
      {
        x: distance / 2,
        rotation: 360 * 2,
        duration: 3.5,
        ease: 'sine.inOut',
      }
    )

    return () => tl.kill()
  }, [])

  const links = [
    { icon: <GlobeIcon />, label: 'Sito Web', url: 'https://webwiseitalia.com/' },
    { icon: <DiscordIcon />, label: 'Discord', url: 'https://discord.webwiseitalia.com' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://www.linkedin.com/company/webwise-italy/' },
    { icon: <InstagramIcon />, label: 'Instagram', url: 'https://www.instagram.com/webwiseitalia/' },
    { icon: <TikTokIcon />, label: 'TikTok', url: 'https://www.tiktok.com/@webwiseitalia.con' },
  ]

  return (
    <div className="noise-bg min-h-screen flex flex-col items-center px-4 sm:px-5 py-10 sm:py-20 relative" style={{ backgroundColor: '#000000' }}>
      {/* 3D Dotted Surface background */}
      <DottedSurface />

      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center">
        {/* Est. */}
        <p
          className="text-center mb-4"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          EST. 2022
        </p>

        {/* Title */}
        <h1
          className="text-center mb-4"
          style={{
            fontFamily: "'Moderniz', sans-serif",
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            minHeight: '1.1em',
          }}
        >
          {displayedTitle}
          {displayedTitle.length < titleText.length && (
            <span className="typing-cursor">|</span>
          )}
        </h1>

        {/* Rolling Logo */}
        <div
          ref={trackRef}
          className="animate-title mb-6 w-full relative"
          style={{ overflow: 'hidden' }}
        >
          <div className="flex items-end justify-center" style={{ minHeight: 'clamp(90px, 20vw, 140px)' }}>
            <img
              ref={logoRef}
              src={logoGrande}
              alt="WebWise Italia"
              className="w-20 sm:w-32 h-auto"
              style={{ willChange: 'transform' }}
            />
          </div>
          {/* Road line */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(46,186,235,0.4) 20%, rgba(46,186,235,0.4) 80%, transparent 100%)',
              marginTop: '4px',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="animate-tagline text-center mb-8"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          WEB AGENCY
        </p>

        {/* Accent divider */}
        <div className="animate-divider mb-10">
          <div className="accent-divider" />
        </div>

        {/* Links */}
        <nav className="w-full flex flex-col gap-3 sm:gap-4">
          {links.map((link, i) => (
            <div key={i} className="link-item">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn"
              >
                <span className="link-icon">{link.icon}</span>
                <span className="link-label">{link.label}</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <footer className="animate-footer mt-16 text-center">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.05em',
            }}
          >
            © 2026 WebWise Italia
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
