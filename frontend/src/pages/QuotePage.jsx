import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Home, Bug, Building2, Calculator } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import { calculateQuote, formatKES } from '../utils/pricing'

// ── Step data ─────────────────────────────────────────────────────────────────

const RESIDENTIAL_OPTIONS = [
  { key: 'bedsitter',    label: 'Bedsitter',      range: '3,000 – 5,000' },
  { key: '1_bedroom',   label: '1 Bedroom',       range: '4,000 – 6,500' },
  { key: '2_bedroom',   label: '2 Bedroom',       range: '5,500 – 8,000' },
  { key: '3_bedroom',   label: '3 Bedroom',       range: '7,000 – 10,000' },
  { key: '4_bedroom',   label: '4 Bedroom',       range: '9,000 – 15,000' },
  { key: 'full_tenting',label: 'Full Tenting',    range: '20,000 – 60,000' },
]

const PEST_OPTIONS = [
  { key: 'bed_bugs',          label: 'Bed Bugs',          range: '4,500 – 8,000' },
  { key: 'cockroaches',       label: 'Cockroaches',       range: '3,500 – 6,500' },
  { key: 'termites',          label: 'Termites',          range: '8,000 – 30,000' },
  { key: 'rodents',           label: 'Rodents',           range: '2,500 – 8,500' },
  { key: 'mosquito_fogging',  label: 'Mosquito Fogging',  range: '4,000 – 12,000' },
]

const COMMERCIAL_OPTIONS = [
  { key: 'per_sqm',           label: 'General Space',        unit: true,  unitLabel: 'sqm' },
  { key: '20ft_container',    label: '20FT Container',       unit: false },
  { key: '40ft_container',    label: '40FT Container',       unit: false },
  { key: 'grain_storage',     label: 'Grain Storage',        unit: true,  unitLabel: 'tons' },
  { key: 'warehouse',         label: 'Warehouse',            unit: true,  unitLabel: '500sqm units' },
  { key: 'small_office_annual', label: 'Office (Annual)',    unit: false },
]

const URGENCY_OPTIONS = [
  { key: 'normal',    label: 'Normal',    desc: 'Scheduled within 3–5 days',  surcharge: 'No extra charge' },
  { key: 'weekend',   label: 'Weekend',   desc: 'Saturday or Sunday service',  surcharge: '+20% to 40%' },
  { key: 'emergency', label: 'Emergency', desc: 'Same day / next day',         surcharge: '+30% to 50%' },
]

// ── Option Card ───────────────────────────────────────────────────────────────

function OptionCard({ label, sublabel, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? 'border-green-500 bg-green-50 shadow-sm'
          : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
      }`}
    >
      <div className="font-semibold text-sm text-gray-900">{label}</div>
      {sublabel && <div className="text-xs text-gray-500 mt-0.5">{sublabel}</div>}
    </button>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function QuotePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    propertyType: '',
    serviceKey: '',
    sizeValue: '',
    urgency: 'normal',
    includeInspection: false,
  })

  const result = form.propertyType && form.serviceKey
    ? calculateQuote({
        propertyType: form.propertyType,
        serviceKey: form.serviceKey,
        urgency: form.urgency,
        sizeValue: form.sizeValue ? parseFloat(form.sizeValue) : null,
        includeInspection: form.includeInspection,
      })
    : null

  const steps = [
    { number: 1, label: 'Property Type' },
    { number: 2, label: 'Service' },
    { number: 3, label: 'Urgency' },
    { number: 4, label: 'Your Quote' },
  ]

  const needsSize = form.propertyType === 'commercial' &&
    ['per_sqm', 'grain_storage', 'warehouse'].includes(form.serviceKey)

  const canProceed = () => {
    if (step === 1) return !!form.propertyType
    if (step === 2) return !!form.serviceKey && (!needsSize || !!form.sizeValue)
    if (step === 3) return !!form.urgency
    return false
  }

  const serviceOptions =
    form.propertyType === 'residential' ? RESIDENTIAL_OPTIONS :
    form.propertyType === 'pest' ? PEST_OPTIONS :
    COMMERCIAL_OPTIONS

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
            <Calculator size={22} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Get Your Quote</h1>
          <p className="text-gray-500 text-sm mt-1">Answer 3 quick questions for an instant price estimate</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.number} className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                step > s.number ? 'bg-green-600 text-white' :
                step === s.number ? 'bg-green-600 text-white ring-4 ring-green-100' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step > s.number ? '✓' : s.number}
              </div>
              <span className={`text-xs hidden sm:block ${step === s.number ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${step > s.number ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

          {/* STEP 1 — Property Type */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">What type of property?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { key: 'residential', label: 'Residential', desc: 'Home or apartment', Icon: Home },
                  { key: 'pest', label: 'Pest-Specific', desc: 'Target a pest type', Icon: Bug },
                  { key: 'commercial', label: 'Commercial', desc: 'Business or warehouse', Icon: Building2 },
                ].map(({ key, label, desc, Icon }) => (
                  <button
                    key={key}
                    onClick={() => { setForm(f => ({ ...f, propertyType: key, serviceKey: '', sizeValue: '' })) }}
                    className={`p-5 rounded-xl border-2 text-center transition-all duration-200 ${
                      form.propertyType === key
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${form.propertyType === key ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Icon size={20} className={form.propertyType === key ? 'text-green-600' : 'text-gray-500'} />
                    </div>
                    <div className="font-semibold text-sm text-gray-900">{label}</div>
                    <div className="text-xs text-gray-500 mt-1">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Service */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                {form.propertyType === 'residential' ? 'Select property size' :
                 form.propertyType === 'pest' ? 'What pest are you dealing with?' :
                 'Select service type'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {serviceOptions.map((opt) => (
                  <OptionCard
                    key={opt.key}
                    label={opt.label}
                    sublabel={opt.range ? `KES ${opt.range}` : opt.unitLabel ? `Priced per ${opt.unitLabel}` : undefined}
                    selected={form.serviceKey === opt.key}
                    onClick={() => setForm(f => ({ ...f, serviceKey: opt.key, sizeValue: '' }))}
                  />
                ))}
              </div>

              {/* Size input for per-unit commercial */}
              {needsSize && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter size ({COMMERCIAL_OPTIONS.find(o => o.key === form.serviceKey)?.unitLabel})
                  </label>
                  <input
                    type="number"
                    value={form.sizeValue}
                    onChange={e => setForm(f => ({ ...f, sizeValue: e.target.value }))}
                    placeholder="e.g. 500"
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Urgency */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">When do you need the service?</h2>
              <div className="space-y-3 mb-6">
                {URGENCY_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setForm(f => ({ ...f, urgency: opt.key }))}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${
                      form.urgency === opt.key
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{opt.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                    </div>
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      opt.key === 'normal' ? 'bg-green-100 text-green-700' :
                      opt.key === 'weekend' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {opt.surcharge}
                    </div>
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input
                  type="checkbox"
                  checked={form.includeInspection}
                  onChange={e => setForm(f => ({ ...f, includeInspection: e.target.checked }))}
                  className="w-4 h-4 text-green-600 rounded"
                />
                <div>
                  <div className="text-sm font-medium text-gray-800">Include inspection fee</div>
                  <div className="text-xs text-gray-500">+KES 3,000 – 8,000 (for detailed site assessment)</div>
                </div>
              </label>
            </div>
          )}

          {/* STEP 4 — Result */}
          {step === 4 && result && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-5">
                <Calculator size={28} className="text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Your Estimated Quote</h2>
              <p className="text-gray-500 text-sm mb-7">Based on your selections</p>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white mb-6">
                <p className="text-green-200 text-sm mb-2">Estimated Cost Range</p>
                <p className="text-4xl font-bold mb-1">
                  {formatKES(result.estimatedMin)}
                </p>
                <p className="text-green-200 text-lg">to {formatKES(result.estimatedMax)}</p>

                {result.hasUrgencySurcharge && (
                  <div className="mt-4 bg-white/20 rounded-lg px-3 py-1.5 text-sm inline-block">
                    Includes {result.urgency} surcharge
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 space-y-2">
                {[
                  ['Property Type', form.propertyType],
                  ['Service', serviceOptions.find(o => o.key === form.serviceKey)?.label],
                  ['Urgency', form.urgency],
                  form.sizeValue ? ['Size', `${form.sizeValue} ${COMMERCIAL_OPTIONS.find(o => o.key === form.serviceKey)?.unitLabel || ''}`] : null,
                ].filter(Boolean).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-gray-500 capitalize">{k}</span>
                    <span className="font-medium text-gray-900 capitalize">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => { setStep(1); setForm({ propertyType: '', serviceKey: '', sizeValue: '', urgency: 'normal', includeInspection: false }) }}
                >
                  Start Over
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => navigate('/book', { state: { quote: { ...form, result } } })}
                >
                  Book This Service
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 1}
              >
                <ChevronLeft size={16} /> Back
              </Button>
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
              >
                {step === 3 ? 'See My Quote' : 'Continue'}
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}