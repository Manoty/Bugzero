import { useParams, useNavigate }  from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Save, Phone, Mail, MapPin, Calendar, Clock, FileText, AlertTriangle } from 'lucide-react'
import { useState, useEffect }     from 'react'
import AdminLayout                 from '../../components/admin/AdminLayout'
import { StatusBadge, UrgencyBadge } from '../../components/admin/BookingStatusBadge'
import Button                      from '../../components/ui/Button'
import { updateBooking }           from '../../api/services'
import client                      from '../../api/axios'

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled']

// Timeline of status changes (visual only for now)
const STATUS_TIMELINE = [
  { key: 'pending',   label: 'Booking Received' },
  { key: 'confirmed', label: 'Confirmed with Customer' },
  { key: 'completed', label: 'Service Completed' },
]

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-gray-500" />
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value || '—'}</p>
      </div>
    </div>
  )

  if (href) return (
    <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a>
  )
  return content
}

export default function AdminBookingDetail() {
  const { id }  = useParams()
  const navigate = useNavigate()
  const qc      = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn:  () => client.get(`/bookings/${id}/`),
  })

  const booking = data?.data

  const [status,     setStatus]     = useState('pending')
  const [adminNotes, setAdminNotes] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingStatus, setPendingStatus] = useState(null)

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
      setShowConfirm(false)
    },
  })

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'cancelled' || newStatus === 'completed') {
      setPendingStatus(newStatus)
      setShowConfirm(true)
    } else {
      setStatus(newStatus)
    }
  }

  const confirmStatusChange = () => {
    setStatus(pendingStatus)
    mutation.mutate({ status: pendingStatus, admin_notes: adminNotes })
  }

  const handleSave = () => {
    mutation.mutate({ status, admin_notes: adminNotes })
  }

  // Timeline step index
  const timelineIndex = STATUS_TIMELINE.findIndex(s => s.key === booking?.status)

  if (isLoading) return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        Loading booking...
      </div>
    </AdminLayout>
  )

  if (!booking) return (
    <AdminLayout>
      <div className="text-red-500 text-sm">Booking not found.</div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">

        {/* ── Back + header ── */}
        <div>
          <button onClick={() => navigate('/admin/bookings')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 mb-5 transition-colors">
            <ArrowLeft size={16} /> Back to Bookings
          </button>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{booking.reference}</h1>
                <StatusBadge status={booking.status} />
                <UrgencyBadge urgency={booking.urgency} />
              </div>
              <p className="text-gray-400 text-sm">
                Created {new Date(booking.created_at).toLocaleString('en-KE', {
                  dateStyle: 'medium', timeStyle: 'short',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* ── Status timeline ── */}
        {booking.status !== 'cancelled' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide text-gray-400">Progress</h3>
            <div className="flex items-center gap-0">
              {STATUS_TIMELINE.map((step, i) => {
                const done    = i <= timelineIndex
                const current = i === timelineIndex
                return (
                  <div key={step.key} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        done
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-400'
                      } ${current ? 'ring-4 ring-green-100' : ''}`}>
                        {done ? '✓' : i + 1}
                      </div>
                      <p className={`text-xs mt-2 text-center max-w-20 leading-tight ${done ? 'text-green-700 font-medium' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                    </div>
                    {i < STATUS_TIMELINE.length - 1 && (
                      <div className={`flex-1 h-0.5 mb-5 mx-1 transition-colors ${i < timelineIndex ? 'bg-green-400' : 'bg-gray-100'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Customer details ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">Customer Details</h3>
            <InfoRow icon={Phone}    label="Phone"    value={booking.phone}    href={`tel:${booking.phone}`} />
            <InfoRow icon={Mail}     label="Email"    value={booking.email}    href={booking.email ? `mailto:${booking.email}` : null} />
            <InfoRow icon={MapPin}   label="Location" value={booking.location} />
            <InfoRow icon={FileText} label="Customer Notes" value={booking.notes} />
          </div>

          {/* ── Service details ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">Service Details</h3>
            <InfoRow icon={FileText}  label="Service"        value={booking.service_name} />
            <InfoRow icon={Calendar}  label="Preferred Date"  value={booking.preferred_date} />
            <InfoRow icon={Clock}     label="Preferred Time"  value={booking.preferred_time} />
            <InfoRow icon={AlertTriangle} label="Urgency"    value={booking.urgency?.charAt(0).toUpperCase() + booking.urgency?.slice(1)} />
          </div>
        </div>

        {/* ── Admin actions ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="font-bold text-gray-900">Update Booking</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                    status === s
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Admin Notes (internal only)
            </label>
            <textarea
              rows={4}
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              placeholder="Add internal notes — technician assigned, customer called, follow-up required..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {mutation.isSuccess && (
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
              <span>✓</span> Changes saved successfully
            </div>
          )}

          {mutation.isError && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              <span>✗</span> Failed to save. Please try again.
            </div>
          )}

          <Button onClick={handleSave} loading={mutation.isPending} className="w-full" size="lg">
            <Save size={16} /> Save Changes
          </Button>
        </div>
      </div>

      {/* ── Confirmation modal for destructive status changes ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-7 w-full max-w-sm">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-orange-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Confirm Status Change</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to mark this booking as{' '}
              <strong className="text-gray-900 font-semibold capitalize">{pendingStatus}</strong>?
              This action is significant and should be confirmed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                disabled={mutation.isPending}
                className="flex-1 py-2.5 text-sm font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {mutation.isPending ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}