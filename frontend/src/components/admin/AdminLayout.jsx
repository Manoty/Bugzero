import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CalendarCheck, LogOut, Bug } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Bookings', icon: CalendarCheck, href: '/admin/bookings' },
]

export default function AdminLayout({ children }) {
  const { pathname } = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col fixed h-full z-10">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2 text-white font-bold">
            <Bug size={20} className="text-green-400" />
            FumiProKE
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Admin Portal</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === href
                  ? 'bg-green-600/20 text-green-400 font-medium'
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-56 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}