import type { ColDef } from 'ag-grid-community';
import { CallShopCdr } from './api';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
const dur = (s: unknown) => { const n = Number(s ?? 0); return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`; };

export const callShopCdrColumns: ColDef<CallShopCdr>[] = [
  { field: 'date', headerName: 'Data/Hora', minWidth: 160, pinned: 'left' },
  { field: 'cabina', headerName: 'Cabine', minWidth: 130 },
  { field: 'calledstation', headerName: 'Destino', minWidth: 150 },
  { field: 'destination', headerName: 'Rota', minWidth: 150 },
  { field: 'sessiontime', headerName: 'Duração', minWidth: 100, type: 'rightAligned', valueFormatter: (p) => dur(p.value) },
  { field: 'price', headerName: 'Valor', minWidth: 110, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'buycost', headerName: 'Custo', minWidth: 110, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'markup', headerName: 'Markup %', minWidth: 110, type: 'rightAligned',
    valueFormatter: (p) => `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(Number(p.value ?? 0))}%` },
];
