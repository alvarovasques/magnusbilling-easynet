import { createResource } from '@/api/crud';

// Linha genérica dos relatórios agregados (summaries) + chamadas falhadas.
// Campos de relação vêm concatenados do backend (idUserusername, idTrunktrunkcode…).
export interface ReportRow {
  id?: number;
  day?: string; month?: string;
  sessiontime?: number;        // já em minutos (backend divide por 60)
  aloc_all_calls?: number;     // ALOC em segundos
  nbcall?: number; nbcall_fail?: number;
  buycost?: number; sessionbill?: number; agent_bill?: number; lucro?: number;
  asr?: number;
  // relações / falhadas
  idUserusername?: string; idTrunktrunkcode?: string; idPrefixdestination?: string;
  idServername?: string; idPlanname?: string;
  src?: string; callerid?: string; calledstation?: string;
  starttime?: string; terminatecauseid?: number; hangupcause?: string; uniqueid?: string;
}

// Resources dos controllers de relatório (contrato Yii: <controller>/read).
export const callSummaryPerDayResource   = createResource<ReportRow>('callSummaryPerDay');
export const callSummaryPerMonthResource = createResource<ReportRow>('callSummaryPerMonth');
export const callSummaryPerUserResource  = createResource<ReportRow>('callSummaryPerUser');
export const callSummaryPerTrunkResource = createResource<ReportRow>('callSummaryPerTrunk');
export const callFailedResource          = createResource<ReportRow>('callFailed');

// Totais dos summaries: o read devolve `sum` (array cujo [0] acumula os campos sum*).
// count é sempre o total filtrado (independe do limit). Para o sum, pedimos um
// limit generoso — o backend soma sobre as linhas retornadas (summaries têm poucas linhas).
export interface ReportTotals {
  count: number;
  sumnbcall?: number; sumsessionbill?: number; sumbuycost?: number; sumlucro?: number;
}

export async function getReportTotals(
  r = callSummaryPerDayResource,
  limit = 2000,
): Promise<ReportTotals> {
  const res = await r.list({ start: 0, limit });
  const raw = res.sum as unknown;
  const sum = (Array.isArray(raw) ? raw[0] : raw) as Record<string, number> | undefined;
  return {
    count: res.count,
    sumnbcall: sum?.sumnbcall,
    sumsessionbill: sum?.sumsessionbill,
    sumbuycost: sum?.sumbuycost,
    sumlucro: sum?.sumlucro,
  };
}
