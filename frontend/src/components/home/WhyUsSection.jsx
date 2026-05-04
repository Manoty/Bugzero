import { ShieldCheck, Clock, Leaf, Award, BadgeCheck, Users } from 'lucide-react'

const BENEFITS = [
  {
    icon:  ShieldCheck,
    title: 'Fully Licensed & Insured',
    desc:  'Registered with PCPB Kenya. All treatments meet Ministry of Health safety standards.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon:  Clock,
    title: 'Same-Day Emergency Response',
    desc:  'Pest emergency? We dispatch a team within hours — 7 days a week including holidays.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon:  Leaf,
    title: 'Eco-Friendly Chemicals',
    desc:  'We use WHO-approved, low-toxicity pesticides that are safe for children, pets and the environment.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon:  Award,
    title: 'Results Guaranteed',
    desc:  'Not satisfied? We return free of charge within 14 days. No questions asked.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon:  BadgeCheck,
    title: 'Certified Technicians',
    desc:  'Every technician is trained, uniformed, and carries an ID badge. Zero cowboy operators.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon:  Users,
    title: '5,000+ Happy Clients',
    desc:  'From Kilimani to Karen, Westlands to Mombasa — thousands of satisfied customers served.',
    color: 'bg-pink-50 text-pink-600',
  },
]

const CERTS = [
  'PCPB Registered',
  'KEBS Certified',
  'Ministry of Health Approved',
  'NEMA Compliant',
]

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Image stack ── */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1583854838253-ac0c87ef3b5e?w=800&q=80"
                alt="Professional fumigation technician at work"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating card — stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-48">
              <p className="text-3xl font-bold text-green-600">98%</p>
              <p className="text-sm text-gray-600 font-medium">Client Satisfaction</p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>

            {/* Floating card — experience */}
            <div className="absolute -top-5 -left-5 bg-green-600 rounded-2xl shadow-xl p-5 w-40">
              <p className="text-3xl font-bold text-white">10+</p>
              <p className="text-sm text-green-200 font-medium">Years of Excellence</p>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              Kenya's Most Trusted Fumigation Experts
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              We're not just exterminators — we're pest prevention partners. Every job is backed by science, done by certified technicians, and guaranteed to work.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {BENEFITS.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-2">
              {CERTS.map(c => (
                <span key={c} className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                  <BadgeCheck size={12} className="text-green-600" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}