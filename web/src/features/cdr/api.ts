import { createResource } from '@/api/crud';
import { apiPost } from '@/api/client';
export interface Call {
  id?: number; starttime?: string; callerid?: string; calledstation?: string;
  sessiontime?: number; sessionbill?: number; buycost?: number; lucro?: number;
  idUserusername?: string; idTrunktrunkcode?: string; idPrefixdestination?: string;
}
export const callResource = createResource<Call>('call');

export interface CallTotals { sumsessionbill?: number; sumbuycost?: number; totalCall?: number; }
export const getCallTotals = () => apiPost<CallTotals>('call/getTotal', {});

// Presets de colunas para o export (call/csv aceita columns=[{header,dataIndex}]).
export const CSV_PRESETS: Record<string, { header: string; dataIndex: string }[]> = {
  Padrao: [
    { header: 'Data', dataIndex: 'starttime' },
    { header: 'Cliente', dataIndex: 'idUserusername' },
    { header: 'Origem', dataIndex: 'callerid' },
    { header: 'Destino', dataIndex: 'calledstation' },
    { header: 'Duracao', dataIndex: 'sessiontime' },
    { header: 'Valor', dataIndex: 'sessionbill' },
  ],
  // Layout aproximado para bilhetagem Anatel (ajustar campos conforme exigência do órgão).
  Anatel: [
    { header: 'DataHora', dataIndex: 'starttime' },
    { header: 'Origem', dataIndex: 'callerid' },
    { header: 'Destino', dataIndex: 'calledstation' },
    { header: 'DuracaoSeg', dataIndex: 'sessiontime' },
    { header: 'Tronco', dataIndex: 'idTrunktrunkcode' },
    { header: 'Assinante', dataIndex: 'idUserusername' },
  ],
};

export function csvUrl(preset: keyof typeof CSV_PRESETS): string {
  const base = import.meta.env.VITE_API_BASE;
  const columns = encodeURIComponent(JSON.stringify(CSV_PRESETS[preset]));
  return `${base}/call/csv?columns=${columns}`;
}
