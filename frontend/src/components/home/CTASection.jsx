import { Link } from 'react-router-dom'
import { Phone, Calculator, MessageCircle, ArrowRight, Clock } from 'lucide-react'

export default function CTASection() {
  const waLink = 'https://wa.me/254700000000?text=Hi%2C%20I%20need%20fumigation%20services'

  return (
    <section className="relative overflow-hidden bg-gray-900 py-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

        {/* ── Left: Real photo ── */}
        <div className="relative min-h-64 lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
            alt="Fumigation technician in protective gear treating a property"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/60 lg:bg-gradient-to-r lg:from-transparent lg:to-gray-900" />

          {/* Overlay badge */}
          <div className="absolute bottom-6 left-6 right-6 lg:right-auto bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-green-400" />
              <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">Available Now</span>
            </div>
            <p className="text-white text-sm font-medium">Emergency response within 2 hours across Nairobi</p>
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="flex flex-col justify-center px-8 py-16 lg:py-20 lg:px-14">
          <p className="text-green-400 font-semibold text-sm uppercase tracking-widest mb-3">Get Started Today</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Ready for a <br />
            <span className="text-green-400">Pest-Free Space?</span>
          </h2>
          <p className="text-gray-400 text-base mb-10 leading-relaxed max-w-sm">
            Get your custom quote in 60 seconds, book online, or call us directly. Same-day service available.
          </p>

          <div className="flex flex-col gap-3 max-w-sm">
            {/* WhatsApp */}
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#20bc5a] text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-green-900/30">
              <MessageCircle size={20} />
              <span>Chat on WhatsApp</span>
              <ArrowRight size={16} className="ml-auto" />
            </a>

            {/* Quote calculator */}
            <Link to="/quote"
              className="flex items-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-green-900/30">
              <Calculator size={20} />
              <span>Calculate My Quote</span>
              <ArrowRight size={16} className="ml-auto" />
            </Link>

            {/* Call */}
            <a href="tel:+254700000000"
              className="flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all">
              <Phone size={20} />
              <span>Call +254 700 000 000</span>
            </a>
          </div>

          <p className="text-gray-600 text-xs mt-6">
            No payment required upfront · Fully licensed & insured · Results guaranteed
          </p>
        </div>
      </div>
    </section>
  )
}