import { cn } from '@/lib/utils/cn';

export interface TelemetryProps {
    label: string;
    value: string;
    unit?: string;
    className?: string;
}

export function Telemetry({ label, value, unit, className }: TelemetryProps) {
    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {/* Label — muted, small, uppercase */}
            <span
                className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-[family-name:var(--font-hud)]"
            >
                {label}
            </span>

            {/* Value */}
            <div className="flex items-baseline gap-1">
                <span className="text-[18px] font-bold text-white font-[family-name:var(--font-hud)] leading-none">
                    {/* If unit is separate, strip it from value display */}
                    {unit ? value.replace(unit, '').trim() : value}
                </span>
                {unit && (
                    <span className="text-sm font-bold text-[#df2531] font-[family-name:var(--font-hud)]">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Telemetry;

/*
USAGE:
  <Telemetry label="Puissance" value="610 CH" unit="CH" />
  <Telemetry label="0-100 KM/H" value="2.9s" />
  <Telemetry label="Vitesse max" value="355 KM/H" unit="KM/H" />
*/
