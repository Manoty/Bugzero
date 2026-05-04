import { Link } from 'react-router-dom'
import { Phone, ClipboardList, CalendarCheck, ShieldCheck, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon:   Phone,
    title:  'Call or Book Online',
    desc:   'Reach us by phone, WhatsApp, or use our online booking form. Describe your pest problem and property type.',
    color:  'bg-green-600',
    light:  'bg-green-50',
    text:   'text-green-600',
  },
  {
    number: '02',
    icon:   ClipboardList,
    title:  'Get Your Custom Quote',
    desc:   'We assess your space and pest type, then give you a clear, no-hidden-charges price estimate within minutes.',
    color:  'bg-blue-600',
    light:  'bg-blue-50',
    text:   'text-blue-600',
  },
  {
    number: '03',
    icon:   CalendarCheck,
    title:  'We Show Up On Time',
    desc:   'Our uniformed, certified technician arrives at your scheduled time with all equipment and certified chemicals.',
    color:  'bg-purple-600',
    light:  'bg-purple-50',
    text:   'text-purple-600',
  },
  {
    number: '04',
    icon:   ShieldCheck,
    title:  'Results Guaranteed',
    desc:   'Post-treatment, we do a walkthrough and give you care instructions. Not satisfied? We return free within 14 days.',
    color:  'bg-orange-500',
    light:  'bg-orange-50',
    text:   'text-orange-600',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            From first contact to pest-free results in 4 simple steps. No jargon. No surprises.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-blue-200 via-purple-200 to-orange-200 mx-32" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ number, icon: Icon, title, desc, color, light, text }) => (
              <div key={number} className="relative flex flex-col items-center text-center group">

                {/* Number + icon circle */}
                <div className="relative mb-6 z-10">
                  <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                    {number.replace('0', '')}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow w-full">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${light} ${text}`}>
                    Step {number}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-all hover:scale-105">
            Start the Process Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}