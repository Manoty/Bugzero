import { Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTestimonials } from '../../api/services'

const fallback = [
  { id: 1, author_name: 'Mary Wanjiku', role: 'Homeowner, Kilimani', rating: 5, content: 'Excellent service! They cleared our bed bug problem in one visit. Very professional and the team was on time.' },
  { id: 2, author_name: 'James Otieno', role: 'Property Manager, Westlands', rating: 5, content: 'We use FumiProKE for all our rental units. Reliable, affordable, and thorough. Highly recommended.' },
  { id: 3, author_name: 'Amina Hassan', role: 'Restaurant Owner, CBD', rating: 5, content: 'Had a cockroach emergency before a health inspection. They responded within 2 hours. Absolute lifesavers!' },
]

export default function TestimonialsSection() {
  const { data } = useQuery({ queryKey: ['testimonials'], queryFn: getTestimonials })
  const testimonials = data?.data?.results?.length ? data.data.results : fallback

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">Client Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by 1,000+ Customers
          </h2>
          <p className="text-gray-500">Across Nairobi and beyond</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                  {t.author_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.author_name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}