import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

// Estimated midpoint revenue per service type
const MOCK_DATA = [
  { service: 'Bed Bugs',    revenue: 62000 },
  { service: 'Cockroaches', revenue: 38500 },
  { service: 'Termites',    revenue: 95000 },
  { service: 'Rodents',     revenue: 27000 },
  { service: 'Mosquito',    revenue: 44000 },
  { service: 'Commercial',  revenue: 118000 },
  { service: 'Residential', revenue: 73000 },
]

const COLORS = ['#16a34a','#15803d','#166534','#14532d','#16a34a','#15803d','#166534']

const fmt = (v) => `KES ${(v / 1000).toFixed(0)}k`

export default function RevenueChart({ data = MOCK_DATA }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900">Estimated Revenue by Service</h3>
          <p className="text-xs text-gray-400 mt-0.5">Based on booking midpoint prices</p>
        </div>
        <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full font-medium">
          This Month
        </span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="service"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v) => [`KES ${Number(v).toLocaleString('en-KE')}`, 'Est. Revenue']}
            contentStyle={{
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            cursor={{ fill: '#f9fafb' }}
          />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}