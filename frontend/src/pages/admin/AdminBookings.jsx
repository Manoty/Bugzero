import { useState }                from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link }                    from 'react-router-dom'
import { Search, Filter, ChevronRight, Calendar, Download } from 'lucide-react'
import AdminLayout                 from '../../components/admin/AdminLayout'
import { StatusBadge, UrgencyBadge } from '../../components/admin/BookingStatusBadge'
import { getBookings, updateBooking } from '../../api/services'

const STATUS_OPTIONS = ['', 'pending', 'confirmed', 'completed', 'cancelled']
const URGENCY_OPTIONS = ['', 'normal', 'weekend', 'emergency']

// Inline quick-status updater
function StatusDropdown({ booking }) {
  const qc  = useQueryClient()
  const mut = useMutation({
    mutationFn: (status) => updateBooking(booking.id, { status }),
    onSuccess:  () => qc.invalidateQueries(['bookings']),
  })

  return (
    <select
      value={booking.status}
      onChange={e => mut.mutate(e.target.value)}
      onClick={e => e.stopPropagation()}
      disabled={mut.isPending}
      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer disabled:opacity-50"
    >
      {STATUS_OPTIONS.filter(Boolean).map(s => (
        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
      ))}
    </select>
  )
}

export default function AdminBookings() {
  const [search,    setSearch]    = useState('')
  const [status,    setStatus]    = useState('')
  const [urgency,   setUrgency]   = useState('')
  const [dateFrom,  setDateFrom]  = useState('')
  const [dateTo,    setDateTo]    = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', search, status, urgency, dateFrom, dateTo],
    queryFn:  () => getBookings({
      search:          search   || undefined,
      status:          status   || undefined,
      urgency:         urgency  || undefined,
      preferred_date__gte: dateFrom || undefined,
      preferred_date__lte: dateTo   || undefined,
    }),
  })

  const bookings = data?.data?.results || data?.data || []
  const total    = data?.data?.count   || bookings.length

  const clearFilters = () => {
    setSearch(''); setStatus(''); setUrgency(''); setDateFrom(''); setDateTo('')
  }

  const hasFilters = search || status || urgency || dateFrom || dateTo

  return (
    <AdminLayout>
      <div className="max-w-6xl space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-400 text-sm mt-1">
              {isLoading ? 'Loading...' : `${total} booking${total !== 1 ? 's' : ''} found`}
            </p>
          </div>
          <button
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-xl px-4 py-2 transition-colors"
            onClick={() => alert('CSV export coming in Phase 6')}
          >
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
          {/* Row 1: search + status + urgency */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, phone, location..."
                className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}</option>
                ))}
              </select>
            </div>

            <select
              value={urgency}
              onChange={e => setUrgency(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              {URGENCY_OPTIONS.map(u => (
                <option key={u} value={u}>{u ? u.charAt(0).toUpperCase() + u.slice(1) : 'All Urgencies'}</option>
              ))}
            </select>
          </div>

          {/* Row 2: date range + clear */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500">Date range:</span>
            </div>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {hasFilters && (
              <button onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-gray-400 text-sm">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 text-sm">No bookings match your filters.</p>
              {hasFilters && (
                <button onClick={clearFilters} className="text-green-600 text-sm mt-2 hover:underline">
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Reference', 'Customer', 'Service', 'Preferred Date', 'Urgency', 'Status', 'Quick Update', ''].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-5 py-4 font-mono text-xs font-bold text-green-700 whitespace-nowrap">
                        {b.reference}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">{b.customer_name}</p>
                        <p className="text-gray-400 text-xs">{b.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600 max-w-36">
                        <p className="truncate">{b.service_name || '—'}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{b.preferred_date}</td>
                      <td className="px-5 py-4"><UrgencyBadge urgency={b.urgency} /></td>
                      <td className="px-5 py-4"><StatusBadge status={b.status} /></td>
                      <td className="px-5 py-4">
                        <StatusDropdown booking={b} />
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          to={`/admin/bookings/${b.id}`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:text-green-700 flex items-center gap-1 text-xs font-medium"
                        >
                          View <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}