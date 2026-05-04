import { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTestimonials } from '../../api/services'

const FALLBACK = [
  { id: 1, author_name: 'Mary Wanjiku',    role: 'Homeowner · Kilimani',          rating: 5, content: 'Absolutely brilliant! They cleared our bed bug nightmare in a single visit. The technician was professional, explained every step, and the apartment has been pest-free for 6 months now.' },
  { id: 2, author_name: 'James Otieno',    role: 'Property Manager · Westlands',  rating: 5, content: 'We manage 40 rental units and FumiProKE handles all of them. Their annual contracts are great value and they always respond fast whenever tenants report issues.' },
  { id: 3, author_name: 'Amina Hassan',    role: 'Restaurant Owner · CBD',         rating: 5, content: 'Had a cockroach emergency the night before a health inspection. They showed up within 2 hours and sorted everything. We passed the inspection the next morning. Total lifesavers!' },
  { id: 4, author_name: 'Peter Kamau',     role: 'Homeowner · Karen',              rating: 5, content: 'Termites had been eating through my ceiling for months. FumiProKE did a full structural treatment — professional, thorough, and the price was very fair. Highly recommend.' },
  { id: 5, author_name: 'Grace Muthoni',   role: 'Office Manager · Upperhill',     rating: 5, content: 'Our office had a rodent problem that was embarrassing in front of clients. One visit from FumiProKE and the problem was completely gone. Excellent service.' },
  { id: 6, author_name: 'David Njoroge',   role: 'Warehouse Owner · Industrial Area', rating: 5, content: 'Used them for grain storage fumigation. Very thorough — they sealed everything properly and issued the official fumigation certificate we needed for export. Will use again.' },
]

function TestimonialCard({ t }) {
  const initials = t.author_name.split(' ').map(n => n[0]).join('').toUpperCase()
  const colors   = ['bg-green-100 text-green-700','bg-blue-100 text-blue-700','bg-purple-100 text-purple-700','bg-orange-100 text-orange-700','bg-pink-100 text-pink-700','bg-teal-100 text-teal-700']
  const color    = colors[t.id % colors.length] || colors[0]

  return (
    <div className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mx-3 flex flex-col">
      <Quote size={24} className="text-green-200 mb-3" />
      <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">"{t.content}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${color}`}>
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{t.author_name}</p>
          <p className="text-xs text-gray-500 truncate">{t.role}</p>
        </div>
        <div className="ml-auto flex gap-0.5 flex-shrink-0">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const { data }       = useQuery({ queryKey: ['testimonials'], queryFn: getTestimonials })
  const testimonials   = data?.data?.results?.length ? data.data.results : FALLBACK

  const trackRef       = useRef(null)
  const [index, setIndex]   = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonials.length

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(i, total - 1))
    setIndex(clamped)
    if (trackRef.current) {
      const card  = trackRef.current.children[clamped]
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % total
        goTo(next)
        return next
      })
    }, 4000)
    return () => clearInterval(t)
  }, [paused, total])

  return (
    <section id="testimonials" className="py-24 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-green-400 font-semibold text-sm uppercase tracking-widest mb-3">Client Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by 5,000+ Kenyans
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="text-sm">4.9 average across 1,200+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map(t => (
              <div key={t.id} className="snap-center">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

          {/* Arrow controls */}
          <button onClick={() => goTo(index - 1)} disabled={index === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => goTo(index + 1)} disabled={index >= total - 1}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === index ? 'w-6 h-2 bg-green-400' : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}