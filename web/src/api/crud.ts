import { apiGet, apiPost } from './client';
import { ExtFilter, encodeFilter } from './filters';

export interface ListParams { start?: number; limit?: number; sort?: string; dir?: 'ASC' | 'DESC'; filter?: ExtFilter[]; }
export interface ListResult<T> { rows: T[]; count: number; sum?: Record<string, unknown>; }
export interface SaveResult<T = unknown> { success?: boolean | string | number; rows?: T[]; errors?: unknown; msg?: unknown; }

export function createResource<T extends { id?: number }>(controller: string) {
  return {
    controller,
    list: (p: ListParams = {}) =>
      apiGet<ListResult<T>>(`${controller}/read`, {
        start: p.start, limit: p.limit, sort: p.sort, dir: p.dir,
        filter: p.filter ? encodeFilter(p.filter) : undefined,
      }),
    save: (record: Partial<T>) => apiPost<SaveResult<T>>(`${controller}/save`, { rows: record }),
    destroy: (id: number | number[]) => apiPost<SaveResult<T>>(`${controller}/destroy`, { id }),
  };
}
export type Resource<T extends { id?: number }> = ReturnType<typeof createResource<T>>;
