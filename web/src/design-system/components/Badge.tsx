type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
const tones: Record<Tone, string> = {
  success: 'bg-success-bg text-success-strong',
  warning: 'bg-warning-bg text-warning-strong',
  danger: 'bg-danger-bg text-danger-strong',
  info: 'bg-info-bg text-info-strong',
  neutral: 'bg-surfacealt text-ink-secondary',
};
export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: React.ReactNode }) {
  return <span className={`inline-flex items-center rounded-[999px] px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}>{children}</span>;
}
