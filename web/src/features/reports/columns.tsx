import type { ColDef } from 'ag-grid-community';
import { ReportRow } from './api';

const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
const min = (v: unknown) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(Number(v ?? 0));
const pct = (v: unknown) => `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(Number(v ?? 0))}%`;
const secs = (v: unknown) => { const n = Math.round(Number(v ?? 0)); return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`; };

// Colunas de métrica compartilhadas por todos os summaries (dia/mês/usuário/tronco).
const metricCols: ColDef<ReportRow>[] = [
  { field: 'sessiontime', headerName: 'Duração (min)', minWidth: 130, type: 'rightAligned', valueFormatter: (p) => min(p.value) },
  { field: 'aloc_all_calls', headerName: 'ALOC', minWidth: 100, type: 'rightAligned', valueFormatter: (p) => secs(p.value) },
  { field: 'nbcall', headerName: 'Atendidas', minWidth: 110, type: 'rightAligned' },
  { field: 'nbcall_fail', headerName: 'Falhadas', minWidth: 110, type: 'rightAligned' },
  { field: 'buycost', headerName: 'Custo', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'sessionbill', headerName: 'Faturado', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'lucro', headerName: 'Lucro', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'asr', headerName: 'ASR', minWidth: 90, type: 'rightAligned', valueFormatter: (p) => pct(p.value) },
];

export const summaryPerDayColumns: ColDef<ReportRow>[] = [
  { field: 'day', headerName: 'Dia', minWidth: 140, pinned: 'left' },
  ...metricCols,
];

export const summaryPerMonthColumns: ColDef<ReportRow>[] = [
  { field: 'month', headerName: 'Mês', minWidth: 140, pinned: 'left' },
  ...metricCols,
];

export const summaryPerUserColumns: ColDef<ReportRow>[] = [
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 160, pinned: 'left',
    filter: 'agTextColumnFilter' },
  ...metricCols,
];

export const summaryPerTrunkColumns: ColDef<ReportRow>[] = [
  { field: 'idTrunktrunkcode', headerName: 'Tronco', minWidth: 160, pinned: 'left',
    filter: 'agTextColumnFilter' },
  ...metricCols,
];

// Tabela de status de terminação (terminatecauseid) usada nas chamadas falhadas.
const dialStatus: Record<number, string> = {
  1: 'Atendida', 2: 'Ocupado', 3: 'Não atende', 4: 'Cancelada', 5: 'Congestionamento',
  6: 'Canal indisponível', 7: 'Não ligar', 8: 'Tortura', 9: 'Args inválidos', 10: 'Secretária',
};

export const callFailedColumns: ColDef<ReportRow>[] = [
  { field: 'starttime', headerName: 'Data/Hora', minWidth: 160, pinned: 'left' },
  { field: 'src', headerName: 'Ramal SIP', minWidth: 120 },
  { field: 'calledstation', headerName: 'Número', minWidth: 140 },
  { field: 'idPrefixdestination', headerName: 'Destino', minWidth: 160 },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 140, filter: 'agTextColumnFilter' },
  { field: 'idTrunktrunkcode', headerName: 'Tronco', minWidth: 140 },
  { field: 'terminatecauseid', headerName: 'Status', minWidth: 130,
    valueFormatter: (p) => dialStatus[Number(p.value)] ?? String(p.value ?? '') },
  { field: 'hangupcause', headerName: 'Código SIP', minWidth: 120 },
];
