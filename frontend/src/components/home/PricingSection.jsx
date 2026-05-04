import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Button from '../ui/Button'

const residential = [
  { label: 'Bedsitter',      range: 'KES 3,000 – 5,000' },
  { label: '1 Bedroom',      range: 'KES 4,000 – 6,500' },
  { label: '2 Bedroom',      range: 'KES 5,500 – 8,000' },
  { label: '3 Bedroom',      range: 'KES 7,000 – 10,000' },
  { label: '4 Bedroom',      range: 'KES 9,000 – 15,000' },
  { label: 'Full Tenting',   range: 'KES 20,000 – 60,000' },
]

const pest = [
  { label: 'Bed Bugs',           range: 'KES 4,500 – 8,000' },
  { label: 'Cockroaches',        range: 'KES 3,500 – 6,500' },
  { label: 'Termites',           range: 'KES 8,000 – 30,000' },
  { label: 'Rodents',            range: 'KES 2,500 – 8,500' },
  { label: 'Mosquito Fogging',   range: 'KES 4,000 – 12,000' },
]

const surcharges = [
  'Emergency service: +30% to 50%',
  'Weekend bookings: +20% to 40%',
  'Inspection fee: KES 3,000 – 8,000',
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">Transparent Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            No Hidden Charges
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            All prices are estimates. Use our smart calculator for an exact quote based on your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Residential */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-green-600 text-white px-6 py-4">
              <h3 className="font-bold text-lg">Residential</h3>
              <p className="text-green-100 text-sm">By property size</p>
            </div>
            <div className="divide-y divide-gray-50">
              {residential.map(r => (
                <div key={r.label} className="flex justify-between items-center px-6 py-3.5 hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">{r.label}</span>
                  <span className="text-sm font-semibold text-green-700">{r.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pest */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h3 className="font-bold text-lg">Specialized Pest Control</h3>
              <p className="text-blue-100 text-sm">By pest type</p>
            </div>
            <div className="divide-y divide-gray-50">
              {pest.map(p => (
                <div key={p.label} className="flex justify-between items-center px-6 py-3.5 hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">{p.label}</span>
                  <span className="text-sm font-semibold text-blue-700">{p.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Surcharges note */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
          <h4 className="font-semibold text-amber-900 mb-3">Additional Charges</h4>
          <ul className="space-y-2">
            {surcharges.map(s => (
              <li key={s} className="flex items-center gap-2 text-sm text-amber-800">
                <Check size={14} className="text-amber-600" /> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Want an exact price for your property?</p>
          <Link to="/quote">
            <Button size="lg">Calculate My Exact Quote</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}