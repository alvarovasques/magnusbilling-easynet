// Filtros no formato aceito pelo BaseController::createCondition (estilo ExtJS).
// comparison válidos: eq, lt, gt, st(startsWith), ed(endsWith), ct(contains), df
export type ExtComparison = 'eq' | 'lt' | 'gt' | 'st' | 'ed' | 'ct' | 'df';
export type ExtType = 'string' | 'numeric' | 'date' | 'list' | 'boolean';
export interface ExtFilter { type: ExtType; field: string; value: unknown; comparison?: ExtComparison; }

export const eq = (field: string, value: unknown): ExtFilter => ({ type: 'numeric', field, value, comparison: 'eq' });
export const contains = (field: string, value: string): ExtFilter => ({ type: 'string', field, value, comparison: 'ct' });
export const inList = (field: string, value: unknown[]): ExtFilter => ({ type: 'list', field, value });
export const encodeFilter = (f: ExtFilter[]) => JSON.stringify(f);
