import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Bug } from 'lucide-react'
import Button from '../ui/Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'About', href: '/#about' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Bug size={18} className="text-white" />
            </div>
            <span>FumiPro<span className="text-green-600">KE</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
                <a
              
                key={l.href}
                href={l.href}
                className="text-sm text-gray-600 hover:text-green-600 transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/quote">
              <Button variant="outline" size="sm">Get Quote</Button>
            </Link>
            <Link to="/book">
              <Button size="sm">Book Now</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {links.map(l => (
                <a
            
              key={l.href}
              href={l.href}
              className="block text-sm text-gray-700 hover:text-green-600 py-1 font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/quote" className="flex-1" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
            </Link>
            <Link to="/book" className="flex-1" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full">Book Now</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}