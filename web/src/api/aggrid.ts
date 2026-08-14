import type { IDatasource, IGetRowsParams, SortModelItem } from 'ag-grid-community';
import { Resource } from './crud';
import { ExtFilter } from './filters';

const toSort = (m: SortModelItem[]) =>
  m.length ? { sort: m[0].colId, dir: m[0].sort.toUpperCase() as 'ASC' | 'DESC' } : {};

function toExtFilters(fm: Record<string, any>): ExtFilter[] {
  return Object.entries(fm).map(([field, cfg]: [string, any]) =>
    cfg.filterType === 'number'
      ? { type: 'numeric', field, value: cfg.filter, comparison: 'eq' }
      : { type: 'string', field, value: cfg.filter, comparison: 'ct' });
}

// Ponte Infinite Row Model (AG Grid) -> read do Yii. Aguenta CDR com count estimado.
export function makeInfiniteDatasource<T extends { id?: number }>(r: Resource<T>, fixed: ExtFilter[] = []): IDatasource {
  return {
    getRows: async (p: IGetRowsParams) => {
      const filter = [...fixed, ...toExtFilters(p.filterModel ?? {})];
      try {
        const res = await r.list({
          start: p.startRow, limit: p.endRow - p.startRow,
          ...toSort(p.sortModel), filter: filter.length ? filter : undefined,
        });
        p.successCallback(res.rows, res.count);
      } catch { p.failCallback(); }
    },
  };
}
