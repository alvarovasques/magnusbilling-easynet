interface Props { label: string; value: React.ReactNode; hint?: string; icon?: React.ReactNode; }
export function KpiCard({ label, value, hint, icon }: Props) {
  return (
    <div className="flex items-start justify-between rounded bg-surface p-4 shadow-sm ring-1 ring-line">
      <div>
        <div className="text-xs font-medium text-ink-secondary">{label}</div>
        <div className="mt-1 text-[28px] font-bold leading-none text-ink [font-variant-numeric:tabular-nums]">{value}</div>
        {hint && <div className="mt-1 text-xs text-ink-secondary">{hint}</div>}
      </div>
      {icon && <div className="grid h-10 w-10 place-items-center rounded bg-info-bg text-primary">{icon}</div>}
    </div>
  );
}
