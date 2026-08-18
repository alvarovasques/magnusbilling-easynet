import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Resource, ListParams, SaveResult } from './crud';

export function useList<T extends { id?: number }>(r: Resource<T>, params: ListParams) {
  return useQuery({
    queryKey: [r.controller, 'list', params],
    queryFn: () => r.list(params),
    placeholderData: (prev) => prev,
  });
}

// Transforma o retorno de erro do backend (string, array, ou objeto
// {campo: [mensagens]}) numa frase legível — no lugar de "[object Object]".
export function formatSaveError(res: SaveResult): string {
  const raw: unknown = (res && (res.errors ?? res.msg)) as unknown;
  if (!raw) return 'Não foi possível salvar. Confira os campos e tente novamente.';
  if (typeof raw === 'string') return raw;
  if (Array.isArray(raw)) return raw.map(String).join(' ');
  if (typeof raw === 'object') {
    return Object.entries(raw as Record<string, unknown>)
      .map(([field, msgs]) => {
        const text = Array.isArray(msgs) ? (msgs as unknown[]).map(String).join(', ') : String(msgs);
        return `${field}: ${text}`;
      })
      .join(' · ');
  }
  return String(raw);
}

// success pode ser bool (save/destroy) — validação falhou quando é false ou há errors.
function saveFailed(res: SaveResult): boolean {
  return res?.success === false || res?.success === 0 || !!res?.errors;
}

export function useSave<T extends { id?: number }>(r: Resource<T>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (record: Partial<T>) => {
      const res = await r.save(record);
      if (saveFailed(res)) throw new Error(formatSaveError(res));
      return res;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [r.controller] }),
  });
}

export function useDelete<T extends { id?: number }>(r: Resource<T>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | number[]) => {
      const res = await r.destroy(id);
      if (saveFailed(res)) throw new Error(formatSaveError(res));
      return res;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [r.controller] }),
  });
}
