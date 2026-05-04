import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Bug, Phone } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services',      href: '/#services' },
  { label: 'How It Works',  href: '/#process' },
  { label: 'Pricing',       href: '/#pricing' },
  { label: 'Why Us',        href: '/#why-us' },
  { label: 'Reviews',       href: '/#testimonials' },
]

export default function Navbar() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-md shadow-green-600/30">
                <Bug size={18} className="text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse border-2 border-white" />
              </div>
              <div className="leading-none">
                <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                  FumiPro<span className="text-green-400">KE</span>
                </span>
                <span className={`block text-[10px] tracking-widest uppercase transition-colors ${scrolled ? 'text-gray-400' : 'text-green-300'}`}>
                  Pest Control
                </span>
              </div>
            </Link>

            {/* ── Desktop links ── */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map(l => (

                <a
                
                  key={l.href}
                  href={l.href}
                  className={`text-sm font-medium transition-colors hover:text-green-400 ${
                    scrolled ? 'text-gray-600' : 'text-white/90'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-3">
              
                href="tel:+254700000000"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white/90 hover:text-green-300'
                }`}
                
                <Phone size={14} />
                +254 700 000 000
              
              <Link
                to="/quote"
                className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                Free Quote
              </Link>
              <Link
                to="/book"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-500 shadow-md shadow-green-600/30 transition-all duration-200"
              >
                Book Now
              </Link>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {NAV_LINKS.map(l => (
                <a
              
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 flex gap-2">
              <Link to="/quote" onClick={() => setOpen(false)}
                className="flex-1 py-2.5 text-center text-sm font-semibold rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-50 transition-colors">
                Free Quote
              </Link>
              <Link to="/book" onClick={() => setOpen(false)}
                className="flex-1 py-2.5 text-center text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
                Book Now
              </Link>
            </div>
            <a href="tel:+254700000000"
              className="flex items-center justify-center gap-2 py-2 text-sm text-gray-500 hover:text-green-600 transition-colors">
              <Phone size={14} /> +254 700 000 000
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer only when not on hero (hero handles it) */}
    </>
  )
}