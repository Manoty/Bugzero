import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const waLink = 'https://wa.me/254700000000?text=Hi%2C%20I%20need%20fumigation%20services'

  return (
    <a
    
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl shadow-green-900/40 transition-all duration-300 hover:scale-105 group"
    >
      <MessageCircle size={22} className="flex-shrink-0" />
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  )
}