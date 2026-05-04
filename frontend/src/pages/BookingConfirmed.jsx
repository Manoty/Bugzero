import { useLocation, Link } from 'react-router-dom'
import { CheckCircle2, Phone, Calendar, Home } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'

export default function BookingConfirmed() {
  const { state } = useLocation()
  const booking = state?.booking

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <div className="flex justify-center mb-6">
            <CheckCircle2 size={64} className="text-green-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you! We've received your booking request and will call you within 2 hours to confirm.
          </p>

          {booking && (
            <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reference</span>
                <span className="font-bold text-green-700 tracking-wide">{booking.reference}</span>
              </div>
              {booking.customer_name && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{booking.customer_name}</span>
                </div>
              )}
              {booking.preferred_date && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preferred Date</span>
                  <span className="font-medium">{booking.preferred_date}</span>
                </div>
              )}
              {booking.status && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-yellow-700 capitalize">{booking.status}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <a href="tel:+254700000000">
              <Button variant="outline" className="w-full" size="lg">
                <Phone size={16} /> Call Us: +254 700 000 000
              </Button>
            </a>
            <Link to="/">
              <Button variant="ghost" className="w-full">
                <Home size={16} /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}