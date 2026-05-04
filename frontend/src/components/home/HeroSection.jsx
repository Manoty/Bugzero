import { Link } from 'react-router-dom'
import { ShieldCheck, Clock, Award, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'

const trust = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Clock,        label: '24/7 Emergency Service' },
  { icon: Award,        label: 'Results Guaranteed' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)', backgroundSize: '50px 50px' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-1.5 text-green-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Nairobi's #1 Rated Fumigation Service
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Pest-Free Spaces,{' '}
            <span className="text-green-400">Guaranteed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Professional fumigation and pest control for homes and businesses across Kenya.
            Fast, safe, and affordable — with same-day emergency service available.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/quote">
              <Button size="lg" className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/40">
                Get Free Quote
                <ChevronRight size={18} />
              </Button>
            </Link>
            <Link to="/book">
              <Button size="lg" variant="secondary" className="text-gray-900">
                Book a Service
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-gray-300">
                <Icon size={16} className="text-green-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}