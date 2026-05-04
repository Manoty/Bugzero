import { Link } from 'react-router-dom'
import { Home, Bug, Building2, Zap, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const services = [
  {
    icon: Home,
    title: 'Residential Fumigation',
    desc: 'Full home treatment for bedsitters to large family homes. Safe for children and pets.',
    items: ['Bedsitters from KES 3,000', '1–4 Bedroom packages', 'Full structural tenting'],
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Bug,
    title: 'Specialized Pest Control',
    desc: 'Targeted treatments for specific pests using certified pesticides and proven methods.',
    items: ['Bed bugs & cockroaches', 'Termite control', 'Rodents & mosquito fogging'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Building2,
    title: 'Commercial Services',
    desc: 'Scalable pest management for offices, warehouses, restaurants, and storage facilities.',
    items: ['Container fumigation', 'Grain & warehouse storage', 'Annual office contracts'],
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Zap,
    title: 'Emergency Response',
    desc: 'Same-day emergency fumigation when you need it most. Available 7 days a week.',
    items: ['Same-day service', 'Weekend availability', 'Rapid response teams'],
    color: 'bg-orange-50 text-orange-600',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Pest Control Services
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From a single bedsitter to a multi-storey warehouse — we have the expertise and equipment to handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="border border-gray-100 rounded-2xl p-7 hover:shadow-md hover:border-green-100 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.color}`}>
                <s.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {s.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/quote" className="inline-flex items-center gap-1 text-sm text-green-600 font-medium hover:gap-2 transition-all">
                Get a quote <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/book">
            <Button size="lg">Book Any Service Today</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}