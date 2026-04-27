'use client'

// ============================================================
// DATE PICKER — start + end date inputs, styled to design system
// ============================================================

import { cn } from '@/lib/utils/cn'

interface DatePickerProps {
  startDate: string
  endDate: string
  onStartChange: (date: string) => void
  onEndChange: (date: string) => void
}

const inputClass = [
  'w-full bg-[#0e0e0e] text-white text-[14px]',
  'px-0 py-3 outline-none border-b-2 border-white/20',
  'font-[family-name:var(--font-hud)] uppercase tracking-[0.05em]',
  'focus:border-[#df2531] transition-colors duration-200',
  '[color-scheme:dark]',
].join(' ')

const labelClass = [
  'block font-[family-name:var(--font-hud)]',
  'text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3',
].join(' ')

export default function DatePicker({ startDate, endDate, onStartChange, onEndChange }: DatePickerProps) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div>
        <label className={labelClass}>Date de début</label>
        <input
          type="date"
          value={startDate}
          min={today}
          onChange={e => onStartChange(e.target.value)}
          className={cn(inputClass)}
        />
      </div>
      <div>
        <label className={labelClass}>Date de fin</label>
        <input
          type="date"
          value={endDate}
          min={startDate || today}
          onChange={e => onEndChange(e.target.value)}
          className={cn(inputClass)}
        />
      </div>
    </div>
  )
}
