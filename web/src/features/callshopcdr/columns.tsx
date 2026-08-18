import type { ColDef } from 'ag-grid-community';
import { CallShopCdr } from './api';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
const dur = (s: unknown) => { const n = Number(s ?? 0); return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`; };

// Grid só-leitura. Filtro só em coluna REAL do pkg_callshop (date, cabina, calledstation).
// `markup` vem de expressão calculada no $select do controller (não é a coluna real de
// mesmo nome), então sortable:false/sem filter para evitar ORDER BY inválido.
export const callShopCdrColumns: ColDef<CallShopCdr>[] = [
  { field: 'date', headerName: 'Data/Hora', minWidth: 160, pinned: 'left', filter: true },
  { field: 'cabina', headerName: 'Cabine', minWidth: 130, filter: true },
  { field: 'calledstation', headerName: 'Destino', minWidth: 150, filter: true },
  { field: 'destination', headerName: 'Rota', minWidth: 150 },
  { field: 'sessiontime', headerName: 'Duração', minWidth: 100, type: 'rightAligned', valueFormatter: (p) => dur(p.value) },
  { field: 'price', headerName: 'Valor', minWidth: 110, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'buycost', headerName: 'Custo', minWidth: 110, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'markup', headerName: 'Markup %', minWidth: 110, type: 'rightAligned', sortable: false,
    valueFormatter: (p) => `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(Number(p.value ?? 0))}%` },
];
