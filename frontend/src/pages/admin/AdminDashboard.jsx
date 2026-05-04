import { useQuery } from '@tanstack/react-query'
import { BarChart2, CalendarCheck, TrendingUp, Clock } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getAnalytics } from '../../api/services'
import Badge from '../../components/ui/Badge'

function StatCard({ label, value, sub, icon: Icon, color = 'text-green-600' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value ?? '—'}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['analytics'], queryFn: getAnalytics })
  const stats = data?.data

  const statusColors = { pending: 'pending', confirmed: 'confirmed', completed: 'completed', cancelled: 'cancelled' }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of your fumigation business</p>
        </div>

        {isLoading ? (
          <div className="text-gray-400 text-sm">Loading analytics...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Bookings" value={stats?.totals?.bookings} icon={CalendarCheck} sub="All time" />
              <StatCard label="Total Quotes" value={stats?.totals?.quotes} icon={BarChart2} color="text-blue-600" sub="Quotes generated" />
              <StatCard label="Conversion Rate" value={`${stats?.totals?.conversion_rate_percent ?? 0}%`} icon={TrendingUp} color="text-purple-600" sub="Quotes → Bookings" />
              <StatCard label="This Week" value={stats?.recent?.bookings_last_7_days} icon={Clock} color="text-orange-500" sub="New bookings" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status breakdown */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Bookings by Status</h3>
                <div className="space-y-3">
                  {Object.entries(stats?.status_breakdown || {}).map(([status, count]) => (
                    <div key={status} className="flex justify-between items-center">
                      <Badge variant={statusColors[status] || 'default'}>{status}</Badge>
                      <span className="font-bold text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top services */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Top Services</h3>
                <div className="space-y-3">
                  {(stats?.top_services || []).map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">{s.service__name || 'Unknown'}</span>
                      <span className="font-semibold text-gray-900">{s.count} bookings</span>
                    </div>
                  ))}
                  {!stats?.top_services?.length && <p className="text-gray-400 text-sm">No data yet</p>}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}