import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Search, Filter, ChevronRight } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import Badge from '../../components/ui/Badge'
import { getBookings } from '../../api/services'

const STATUS_OPTIONS = ['', 'pending', 'confirmed', 'completed', 'cancelled']

export default function AdminBookings() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', search, status],
    queryFn: () => getBookings({ search, status: status || undefined }),
  })

  const bookings = data?.data?.results || data?.data || []

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-500 text-sm mt-1">All customer bookings</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, phone, location..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No bookings found.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Reference', 'Customer', 'Service', 'Date', 'Urgency', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs font-medium text-green-700">{b.reference}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-gray-900">{b.customer_name}</div>
                      <div className="text-gray-400 text-xs">{b.phone}</div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{b.service_name || '—'}</td>
                    <td className="px-4 py-3.5 text-gray-600">{b.preferred_date}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={b.urgency === 'emergency' ? 'danger' : b.urgency === 'weekend' ? 'warning' : 'default'}>
                        {b.urgency}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={b.status}>{b.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link to={`/admin/bookings/${b.id}`} className="text-green-600 hover:text-green-700">
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}