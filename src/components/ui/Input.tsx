import { cn } from '@/lib/utils/cn';

export interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    id?: string;
}

export function Input({
    label,
    placeholder,
    type = 'text',
    value,
    onChange,
    className,
    error,
    id,
}: InputProps) {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={cn('flex flex-col gap-2 w-full', className)}>
            {/* Label — Telemetry HUD style */}
            <label
                htmlFor={inputId}
                className={cn(
                    'text-[11px] uppercase tracking-[0.12em] text-white/50',
                    'font-[family-name:var(--font-hud)]',
                    error && 'text-[#df2531]',
                )}
            >
                {label}
            </label>

            {/* Input field — bottom border only */}
            <input
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    'w-full bg-[#0e0e0e] text-white',
                    'border-0 border-b-2 border-white/20',
                    'rounded-none outline-none',
                    'px-0 py-3',
                    'italic font-[family-name:var(--font-body)]',
                    'placeholder:text-white/20 placeholder:not-italic',
                    'transition-all duration-200',
                    'focus:border-b-[#df2531] focus:shadow-[0_2px_8px_rgba(223,37,49,0.3)]',
                    error && 'border-b-[#df2531]/60',
                )}
            />

            {/* Error message */}
            {error && (
                <span className="text-[10px] uppercase tracking-[0.1em] text-[#df2531] font-[family-name:var(--font-hud)]">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Input;

/*
USAGE:
  <Input label="Nom complet" placeholder="Dylan Kode" />
  <Input label="Date de départ" type="date" error="Date invalide" />
*/
