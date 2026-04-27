// ============================================================
// StatusBadge — reservation status indicator
// ============================================================

import type { ReservationStatus } from '@/types/reservation'

const styles: Record<ReservationStatus, string> = {
  pending:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelled: 'bg-red-500/10  text-red-400   border-red-500/20',
}

const labels: Record<ReservationStatus, string> = {
  pending:   'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
}

export default function StatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <span
      className={`
        inline-block px-3 py-1 border text-[10px] uppercase tracking-[0.15em]
        font-[family-name:var(--font-hud)] ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  )
}
