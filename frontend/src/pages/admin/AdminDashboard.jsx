import { useQuery }          from '@tanstack/react-query'
import { Link }              from 'react-router-dom'
import {
  CalendarCheck, BarChart2, TrendingUp,
  Clock, ChevronRight, RefreshCw,
} from 'lucide-react'

import AdminLayout       from '../../components/admin/AdminLayout'
import StatCard          from '../../components/admin/StatCard'
import RevenueChart      from '../../components/admin/RevenueChart'
import BookingTrendChart from '../../components/admin/BookingTrendChart'
import { StatusBadge, UrgencyBadge } from '../../components/admin/BookingStatusBadge'
import { getAnalytics, getBookings } from '../../api/services'

export default function AdminDashboard() {
  const { data: analyticsData, isLoading: loadingAnalytics, refetch } =
    useQuery({ queryKey: ['analytics'], queryFn: getAnalytics })

  const { data: bookingsData, isLoading: loadingBookings } =
    useQuery({ queryKey: ['bookings-recent'], queryFn: () => getBookings({ page_size: 6 }) })

  const stats    = analyticsData?.data
  const bookings = bookingsData?.data?.results || bookingsData?.data || []

  const now = new Date().toLocaleDateString('en-KE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <AdminLayout>
      <div className="max-w-6xl space-y-8">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">{now}</p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-xl px-4 py-2 transition-colors hover:border-gray-300"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* ── Stat cards ── */}
        {loadingAnalytics ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-36 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Bookings"
              value={stats?.totals?.bookings ?? 0}
              sub="All time"
              icon={CalendarCheck}
              iconColor="text-green-600"
              iconBg="bg-green-50"
              trend="up"
              trendLabel={`+${stats?.recent?.bookings_last_7_days ?? 0} this week`}
            />
            <StatCard
              label="Quotes Generated"
              value={stats?.totals?.quotes ?? 0}
              sub="All time"
              icon={BarChart2}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              trend="up"
              trendLabel={`+${stats?.recent?.quotes_last_7_days ?? 0} this week`}
            />
            <StatCard
              label="Conversion Rate"
              value={`${stats?.totals?.conversion_rate_percent ?? 0}%`}
              sub="Quotes → Bookings"
              icon={TrendingUp}
              iconColor="text-purple-600"
              iconBg="bg-purple-50"
            />
            <StatCard
              label="This Month"
              value={stats?.recent?.bookings_last_30_days ?? 0}
              sub="Bookings in 30 days"
              icon={Clock}
              iconColor="text-orange-500"
              iconBg="bg-orange-50"
              trend="up"
              trendLabel="vs last month"
            />
          </div>
        )}

        {/* ── Status breakdown pills ── */}
        {stats?.status_breakdown && (
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.status_breakdown).map(([status, count]) => (
              <div key={status}
                className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
                <StatusBadge status={status} />
                <span className="text-sm font-bold text-gray-900">{count}</span>
                <span className="text-xs text-gray-400">bookings</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingTrendChart />
          <RevenueChart />
        </div>

        {/* ── Recent bookings table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div>
              <h3 className="font-bold text-gray-900">Recent Bookings</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest 6 bookings across all statuses</p>
            </div>
            <Link to="/admin/bookings"
              className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          {loadingBookings ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No bookings yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Reference', 'Customer', 'Service', 'Date', 'Urgency', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map(b => (
                  <tr key={b.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/admin/bookings/${b.id}`}
                  >
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-green-700">{b.reference}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-900">{b.customer_name}</p>
                      <p className="text-gray-400 text-xs">{b.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 max-w-32 truncate">{b.service_name || '—'}</td>
                    <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{b.preferred_date}</td>
                    <td className="px-5 py-3.5"><UrgencyBadge urgency={b.urgency} /></td>
                    <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Top services ── */}
        {stats?.top_services?.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5">Top Services by Bookings</h3>
            <div className="space-y-3">
              {stats.top_services.map((s, i) => {
                const max   = stats.top_services[0]?.count || 1
                const pct   = Math.round((s.count / max) * 100)
                return (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 w-4 font-bold">{i + 1}</span>
                    <span className="text-sm text-gray-700 w-40 truncate font-medium">
                      {s.service__name || 'Unknown'}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8 text-right">{s.count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}