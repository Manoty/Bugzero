const STATUS_MAP = {
  pending:   { label: 'Pending',   classes: 'bg-yellow-50  text-yellow-700  border-yellow-200'  },
  confirmed: { label: 'Confirmed', classes: 'bg-blue-50    text-blue-700    border-blue-200'    },
  completed: { label: 'Completed', classes: 'bg-green-50   text-green-700   border-green-200'   },
  cancelled: { label: 'Cancelled', classes: 'bg-red-50     text-red-600     border-red-200'     },
}

const URGENCY_MAP = {
  normal:    { label: 'Normal',    classes: 'bg-gray-50    text-gray-600    border-gray-200'    },
  weekend:   { label: 'Weekend',   classes: 'bg-orange-50  text-orange-600  border-orange-200'  },
  emergency: { label: 'Emergency', classes: 'bg-red-50     text-red-600     border-red-200'     },
}

export function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.pending
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.classes}`}>
      {cfg.label}
    </span>
  )
}

export function UrgencyBadge({ urgency }) {
  const cfg = URGENCY_MAP[urgency] || URGENCY_MAP.normal
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.classes}`}>
      {cfg.label}
    </span>
  )
}