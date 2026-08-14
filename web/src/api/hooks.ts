import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Resource, ListParams } from './crud';

export function useList<T extends { id?: number }>(r: Resource<T>, params: ListParams) {
  return useQuery({
    queryKey: [r.controller, 'list', params],
    queryFn: () => r.list(params),
    placeholderData: (prev) => prev,
  });
}

export function useSave<T extends { id?: number }>(r: Resource<T>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: Partial<T>) => r.save(record),
    onSuccess: (res) => {
      if (res.errors) throw new Error(res.errors);
      qc.invalidateQueries({ queryKey: [r.controller] });
    },
  });
}

export function useDelete<T extends { id?: number }>(r: Resource<T>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number | number[]) => r.destroy(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [r.controller] }),
  });
}
