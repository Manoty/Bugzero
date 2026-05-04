import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconColor = 'text-green-600',
  iconBg    = 'bg-green-50',
  trend,      // 'up' | 'down' | 'flat'
  trendLabel,
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up'   ? 'text-green-600' :
    trend === 'down' ? 'text-red-500'   : 'text-gray-400'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value ?? '—'}</p>
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
        {trend && trendLabel && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon size={12} />
            {trendLabel}
          </div>
        )}
      </div>
    </div>
  )
}