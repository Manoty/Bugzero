import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShieldCheck, Clock, Award, Star } from 'lucide-react'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    tag:   'Professional Fumigation',
    title: 'Pest-Free Spaces,',
    accent: 'Guaranteed.',
    sub:   'Licensed fumigation professionals protecting Nairobi homes and businesses since 2015.',
  },
  {
    image: 'https://images.unsplash.com/photo-1632928630720-a24dfb9a1e41?w=1600&q=80',
    tag:   'Bed Bug Specialists',
    title: 'Wipe Out Bed Bugs',
    accent: 'First Visit.',
    sub:   'Our heat-and-chemical treatment eliminates bed bugs at every life stage — eggs included.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=1600&q=80',
    tag:   'Termite Control',
    title: 'Stop Termites Before',
    accent: 'They Destroy.',
    sub:   'Structural protection for your home and investments. Early detection saves millions.',
  },
  {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80',
    tag:   'Commercial Services',
    title: 'Protect Your Business',
    accent: 'From Day One.',
    sub:   'Warehouses, offices, restaurants — we keep your commercial spaces compliant and pest-free.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80',
    tag:   'Emergency Response',
    title: 'Same-Day Service,',
    accent: 'Always Ready.',
    sub:   'Pest emergencies don\'t wait. Neither do we. Call now for rapid response across Nairobi.',
  },
]

const STATS = [
  { value: '5,000+', label: 'Homes Treated' },
  { value: '10 Yrs', label: 'Experience' },
  { value: '98%',    label: 'Success Rate' },
  { value: '24/7',   label: 'Emergency Line' },
]

export default function HeroSection() {
  const [current,   setCurrent]   = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 300)
  }, [animating])

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">

      {/* ── Background image ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* ── Content ── */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-20">
        <div className={`max-w-2xl transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 bg-green-600/30 border border-green-500/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-sm font-medium tracking-wide">{slide.tag}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
            {slide.title}{' '}
            <span className="text-green-400">{slide.accent}</span>
          </h1>

          <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
            {slide.sub}
          </p>

          {/* Star rating */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-300 text-sm">4.9 · 1,200+ reviews</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link to="/quote"
              className="px-7 py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-900/40 transition-all duration-200 hover:scale-105">
              Get Free Quote
            </Link>
            <Link to="/book"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all duration-200">
              Book a Service
            </Link>
            <a href="tel:+254700000000"
              className="px-7 py-3.5 text-white/80 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors">
              📞 Call Now
            </a>
          </div>
        </div>
      </div>

      {/* ── Arrow controls ── */}
      <button onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white rounded-full flex items-center justify-center transition-all hover:scale-110">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white rounded-full flex items-center justify-center transition-all hover:scale-110">
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-green-400' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* ── Stats bar ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {STATS.map(({ value, label }) => (
              <div key={label} className="py-4 px-6 text-center">
                <p className="text-2xl font-bold text-green-400">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trust badges ── */}
      <div className="absolute top-24 right-6 hidden xl:flex flex-col gap-2">
        {[
          { icon: ShieldCheck, label: 'Licensed & Insured' },
          { icon: Clock,       label: '24/7 Emergency' },
          { icon: Award,       label: 'Results Guaranteed' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
            <Icon size={14} className="text-green-400" />
            <span className="text-white/80 text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}