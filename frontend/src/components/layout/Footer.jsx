import { Link } from 'react-router-dom'
import { Bug, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Bug size={18} className="text-white" />
              </div>
              FumiPro<span className="text-green-400">KE</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Kenya's trusted fumigation and pest control professionals. Licensed, insured, and results-guaranteed.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {['Residential Fumigation', 'Bed Bug Treatment', 'Termite Control', 'Commercial Pest Control', 'Mosquito Fogging'].map(s => (
                <li key={s}><a href="/#services" className="hover:text-green-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/quote" className="hover:text-green-400 transition-colors">Get a Quote</Link></li>
              <li><Link to="/book" className="hover:text-green-400 transition-colors">Book a Service</Link></li>
              <li><a href="/#pricing" className="hover:text-green-400 transition-colors">Pricing</a></li>
              <li><a href="/#about" className="hover:text-green-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} className="text-green-400" /> +254 700 000 000</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-green-400" /> info@fumiproke.co.ke</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="text-green-400 mt-0.5" /> Nairobi, Kenya<br />Serving all counties</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FumiProKE. All rights reserved.</p>
          <p>Licensed Pest Control Operators — Kenya Bureau of Standards</p>
        </div>
      </div>
    </footer>
  )
}