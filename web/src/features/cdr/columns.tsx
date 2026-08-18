import type { ColDef } from 'ag-grid-community';
import { Call } from './api';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
const dur = (s: unknown) => { const n = Number(s ?? 0); return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`; };
// Filtro só em coluna REAL do pkg_cdr (starttime, callerid, calledstation). Filtrar
// campo de relação concatenado (idUserusername/idTrunktrunkcode/idPrefixdestination)
// cai no antifraude "Trying SQL inject" e BANE o IP após 3 tentativas.
// Sort: replaceOrder() só mapeia idUserusername e idPrefixdestination; idTrunktrunkcode
// não é mapeado (ORDER BY quebraria a query), por isso sortable:false.
export const cdrColumns: ColDef<Call>[] = [
  { field: 'starttime', headerName: 'Data/Hora', minWidth: 160, pinned: 'left', filter: true },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 140 },
  { field: 'callerid', headerName: 'Origem', minWidth: 130, filter: true },
  { field: 'calledstation', headerName: 'Destino', minWidth: 150, filter: true },
  { field: 'idPrefixdestination', headerName: 'Rota', minWidth: 150 },
  { field: 'sessiontime', headerName: 'Duração', minWidth: 100, type: 'rightAligned', valueFormatter: (p) => dur(p.value) },
  { field: 'sessionbill', headerName: 'Valor', minWidth: 110, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'idTrunktrunkcode', headerName: 'Tronco', minWidth: 130, sortable: false },
];
