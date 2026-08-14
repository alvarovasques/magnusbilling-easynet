export const brl = (v: number | string | null | undefined) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(Number(v ?? 0));
export const int = (v: number | string | null | undefined) =>
  new Intl.NumberFormat('pt-BR').format(Number(v ?? 0));
