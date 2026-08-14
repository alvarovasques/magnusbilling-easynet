export function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="mb-1 text-lg font-semibold text-ink">{title}</h1>
      <p className="text-sm text-ink-secondary">Tela da Fase 2 — o padrão (grid + CRUD) já está provado em Contas SIP.</p>
    </div>
  );
}
