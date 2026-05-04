import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    title:    'Bed Bug Extermination',
    desc:     'Complete elimination using heat treatment and certified chemicals. Works on eggs too.',
    price:    'From KES 4,500',
    tag:      'Most Popular',
    tagColor: 'bg-red-100 text-red-700',
    image:    'https://images.unsplash.com/photo-1632928630720-a24dfb9a1e41?w=600&q=80',
    href:     '/quote',
  },
  {
    title:    'Cockroach Treatment',
    desc:     'Gel baiting and residual spraying targeting all species — kitchens, drains & walls.',
    price:    'From KES 3,500',
    tag:      'Fast Results',
    tagColor: 'bg-orange-100 text-orange-700',
    image:    'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&q=80',
    href:     '/quote',
  },
  {
    title:    'Termite Control',
    desc:     'Soil treatment, baiting systems and structural protection for long-term termite prevention.',
    price:    'From KES 8,000',
    tag:      'Structural',
    tagColor: 'bg-amber-100 text-amber-700',
    image:    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    href:     '/quote',
  },
  {
    title:    'Rodent Extermination',
    desc:     'Trapping, bait stations and entry-point sealing for rats and mice in residential & commercial spaces.',
    price:    'From KES 2,500',
    tag:      'Quick Fix',
    tagColor: 'bg-gray-100 text-gray-700',
    image:    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&q=80',
    href:     '/quote',
  },
  {
    title:    'Mosquito Fogging',
    desc:     'Outdoor and indoor ULV fogging for mosquitoes. Ideal before events and rainy seasons.',
    price:    'From KES 4,000',
    tag:      'Seasonal',
    tagColor: 'bg-blue-100 text-blue-700',
    image:    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    href:     '/quote',
  },
  {
    title:    'Full Home Fumigation',
    desc:     'Comprehensive treatment covering all rooms, furniture, and hidden spaces. Full-house peace of mind.',
    price:    'From KES 3,000',
    tag:      'Best Value',
    tagColor: 'bg-green-100 text-green-700',
    image:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    href:     '/quote',
  },
  {
    title:    'Commercial Pest Control',
    desc:     'Tailored pest management programs for offices, restaurants, hotels and warehouses.',
    price:    'From KES 25/sqm',
    tag:      'Business',
    tagColor: 'bg-purple-100 text-purple-700',
    image:    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    href:     '/quote',
  },
  {
    title:    'Container Fumigation',
    desc:     'Methyl bromide and phosphine fumigation for 20FT and 40FT shipping containers.',
    price:    'From KES 9,000',
    tag:      'Export Ready',
    tagColor: 'bg-cyan-100 text-cyan-700',
    image:    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80',
    href:     '/quote',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Every Pest. Every Space. Handled.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            From a single bedsitter to a multi-storey warehouse — certified treatments for every pest and property type.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              to={s.href}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Tag */}
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${s.tagColor}`}>
                  {s.tag}
                </span>
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-semibold text-sm">{s.price}</span>
                  <span className="flex items-center gap-1 text-xs text-green-600 font-medium group-hover:gap-2 transition-all">
                    Quote <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md shadow-green-600/20 transition-all hover:scale-105">
            Book Any Service Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}