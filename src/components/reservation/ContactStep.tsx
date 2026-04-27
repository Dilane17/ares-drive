'use client'

// ============================================================
// CONTACT STEP — name, phone, optional message
// All inputs styled with bottom-border focus pattern.
// ============================================================

export interface ContactData {
  name: string
  phone: string
  message: string
}

interface ContactStepProps {
  data: ContactData
  onChange: (data: ContactData) => void
}

const labelClass = 'block font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3'

const inputClass = [
  'w-full bg-transparent text-white text-[16px]',
  'py-3 outline-none border-b-2 border-white/20',
  'font-[family-name:var(--font-body)] italic',
  'placeholder:text-white/20',
  'focus:border-[#df2531] transition-colors duration-200',
].join(' ')

export default function ContactStep({ data, onChange }: ContactStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className={labelClass}>Prénom et nom *</label>
        <input
          type="text"
          value={data.name}
          onChange={e => onChange({ ...data, name: e.target.value })}
          placeholder="Jean Dupont"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Téléphone / WhatsApp *</label>
        <input
          type="tel"
          value={data.phone}
          onChange={e => onChange({ ...data, phone: e.target.value })}
          placeholder="+33 6 XX XX XX XX"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Message (optionnel)</label>
        <textarea
          value={data.message}
          onChange={e => onChange({ ...data, message: e.target.value })}
          placeholder="Précisez vos besoins, lieu de livraison souhaité..."
          rows={3}
          className={[inputClass, 'resize-none leading-relaxed'].join(' ')}
        />
      </div>
    </div>
  )
}
