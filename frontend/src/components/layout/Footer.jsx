import { Link } from 'react-router-dom'
import { Bug, Phone, Mail, MapPin } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const SERVICES_LINKS = [
  'Residential Fumigation',
  'Bed Bug Treatment',
  'Cockroach Control',
  'Termite Protection',
  'Rodent Extermination',
  'Mosquito Fogging',
  'Commercial Pest Control',
  'Container Fumigation',
]

const QUICK_LINKS = [
  { label: 'Get a Free Quote', href: '/quote' },
  { label: 'Book a Service',   href: '/book' },
  { label: 'How It Works',     href: '/#process' },
  { label: 'Pricing',          href: '/#pricing' },
  { label: 'Why Choose Us',    href: '/#why-us' },
  { label: 'Reviews',          href: '/#testimonials' },
]

const SOCIALS = [
  { icon: FaFacebook,  href: '#', label: 'Facebook'  },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTwitter,   href: '#', label: 'Twitter'   },
  { icon: FaYoutube,   href: '#', label: 'YouTube'   },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">

      {/* Top strip */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-medium text-sm">Emergency line active 24/7</span>
          </div>
          <a
            href="tel:+254700000000"
            className="flex items-center gap-2 text-green-400 hover:text-green-300 font-bold text-lg transition-colors"
          >
            <Phone size={18} />
            +254 700 000 000
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
                <Bug size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                FumiPro<span className="text-green-400">KE</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Kenya's most trusted fumigation and pest control professionals. Licensed, insured, and results guaranteed since 2015.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map(s => (
                <li key={s}>
                  <a
                    href="/#services"
                    className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+254700000000"
                  className="flex items-start gap-3 text-sm hover:text-green-400 transition-colors"
                >
                  <Phone size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">+254 700 000 000</p>
                    <p className="text-gray-600 text-xs">Mon–Sun, 6am–10pm</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@fumiproke.co.ke"
                  className="flex items-start gap-3 text-sm hover:text-green-400 transition-colors"
                >
                  <Mail size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">info@fumiproke.co.ke</p>
                    <p className="text-gray-600 text-xs">Reply within 1 hour</p>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Nairobi, Kenya</p>
                  <p className="text-gray-600 text-xs">Serving all 47 counties</p>
                </div>
              </li>
            </ul>

            {/* Certifications */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['PCPB', 'KEBS', 'NEMA'].map(c => (
                <span
                  key={c}
                  className="text-xs bg-gray-800 text-gray-400 border border-gray-700 px-2.5 py-1 rounded-full"
                >
                  {c} Certified
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} FumiProKE. All rights reserved.</p>
          <p>Licensed Pest Control Operators — Pest Control Products Board Kenya</p>
        </div>
      </div>
    </footer>
  )
}