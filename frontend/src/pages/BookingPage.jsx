import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CalendarDays, User, Phone, Mail, MapPin, FileText } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import { createBooking } from '../api/services'
import { formatKES } from '../utils/pricing'

function Field({ label, icon: Icon, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        <input
          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${Icon ? 'pl-9' : ''} ${error ? 'border-red-400' : 'border-gray-200'}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default function BookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const quoteData = location.state?.quote

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    location: '',
    preferred_date: '',
    preferred_time: '',
    notes: '',
    urgency: quoteData?.urgency || 'normal',
    service: '',
  })
  const [errors, setErrors] = useState({})

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      navigate('/booking-confirmed', { state: { booking: data.data } })
    },
  })

  const validate = () => {
    const e = {}
    if (!form.customer_name.trim()) e.customer_name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.location.trim()) e.location = 'Location is required'
    if (!form.preferred_date) e.preferred_date = 'Please select a date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    mutation.mutate(form)
  }

  const set = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(er => ({ ...er, [key]: '' }))
  }

  // Get tomorrow as min date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
            <CalendarDays size={22} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Book a Service</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in your details and we'll confirm within 2 hours</p>
        </div>

        {/* Quote summary if coming from calculator */}
        {quoteData?.result && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-green-600 font-medium uppercase tracking-wide mb-0.5">Your Estimate</p>
              <p className="font-bold text-gray-900">
                {formatKES(quoteData.result.estimatedMin)} – {formatKES(quoteData.result.estimatedMax)}
              </p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium capitalize">
              {quoteData.urgency}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name *" icon={User} placeholder="e.g. Mary Wanjiku" value={form.customer_name} onChange={set('customer_name')} error={errors.customer_name} />
            <Field label="Phone Number *" icon={Phone} placeholder="+254 700 000 000" value={form.phone} onChange={set('phone')} error={errors.phone} type="tel" />
          </div>

          <Field label="Email Address" icon={Mail} placeholder="mary@example.com" value={form.email} onChange={set('email')} type="email" />
          <Field label="Location / Estate *" icon={MapPin} placeholder="e.g. Kilimani, Nairobi" value={form.location} onChange={set('location')} error={errors.location} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Preferred Date *" icon={CalendarDays} type="date" min={minDate} value={form.preferred_date} onChange={set('preferred_date')} error={errors.preferred_date} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time (optional)</label>
              <input type="time" value={form.preferred_time} onChange={set('preferred_time')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Urgency</label>
            <select value={form.urgency} onChange={set('urgency')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
              <option value="normal">Normal (3–5 days)</option>
              <option value="weekend">Weekend (+20–40%)</option>
              <option value="emergency">Emergency – Same Day (+30–50%)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <FileText size={14} className="inline mr-1" />
              Additional Notes (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Describe your pest problem, property details, or any special requirements..."
              value={form.notes}
              onChange={set('notes')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {mutation.isError && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3">
              Something went wrong. Please try again or call us directly.
            </div>
          )}

          <Button type="submit" size="lg" className="w-full" loading={mutation.isPending}>
            Confirm Booking Request
          </Button>

          <p className="text-xs text-center text-gray-400">
            We'll call you within 2 hours to confirm your booking. No payment required upfront.
          </p>
        </form>
      </main>

      <Footer />
    </div>
  )
}