import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { updateBooking, getBookings } from '../../api/services'
import client from '../../api/client'

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled']

export default function AdminBookingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => client.get(`/bookings/${id}/`),
  })

  const booking = data?.data
  const [status, setStatus] = useState('')
  const [adminNotes, setAdminNotes] = useState('')

  useEffect(() => {
    if (booking) {
      setStatus(booking.status || 'pending')
      setAdminNotes(booking.admin_notes || '')
    }
  }, [booking])

  const mutation = useMutation({
    mutationFn: (payload) => updateBooking(id, payload),
    onSuccess: () => {
      qc.invalidateQueries(['booking', id])
      qc.invalidateQueries(['bookings'])
    },
  })

  if (isLoading) return <AdminLayout><p className="text-gray-400 text-sm">Loading...</p></AdminLayout>
  if (!booking) return <AdminLayout><p className="text-red-500 text-sm">Booking not found.</p></AdminLayout>

  const rows = [
    ['Reference', booking.reference],
    ['Customer', booking.customer_name],
    ['Phone', booking.phone],
    ['Email', booking.email || '—'],
    ['Location', booking.location],
    ['Service', booking.service_name || '—'],
    ['Preferred Date', booking.preferred_date],
    ['Preferred Time', booking.preferred_time || '—'],
    ['Urgency', booking.urgency],
    ['Created', new Date(booking.created_at).toLocaleString('en-KE')],
  ]

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <button onClick={() => navigate('/admin/bookings')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Bookings
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{booking.reference}</h1>
          <Badge variant={booking.status}>{booking.status}</Badge>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5">
          <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
          <div className="space-y-3">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm border-b border-gray-50 pb-3 last:border-0">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
            {booking.notes && (
              <div className="text-sm pt-1">
                <span className="text-gray-500 block mb-1">Customer Notes</span>
                <p className="text-gray-800 bg-gray-50 rounded-lg p-3 text-xs leading-relaxed">{booking.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Update Booking</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Notes</label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={e => setAdminNotes(e.target.value)}
                placeholder="Internal notes (not visible to customer)..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
            {mutation.isSuccess && (
              <p className="text-green-600 text-sm">✓ Saved successfully</p>
            )}
            <Button
              onClick={() => mutation.mutate({ status, admin_notes: adminNotes })}
              loading={mutation.isPending}
              className="w-full"
            >
              <Save size={16} /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}