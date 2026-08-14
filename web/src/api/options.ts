import { useQuery } from '@tanstack/react-query';
import { apiGet } from './client';

export interface Option { value: number; label: string; }

// Opções genéricas a partir de qualquer controller (id -> labelField).
export function useOptions(controller: string, labelField: string, sort?: string) {
  return useQuery({
    queryKey: ['options', controller, labelField],
    queryFn: async (): Promise<Option[]> => {
      const r = await apiGet<{ rows: Record<string, any>[] }>(`${controller}/read`, { start: 0, limit: 1000, sort: sort ?? labelField, dir: 'ASC' });
      return (r.rows ?? []).map((x) => ({ value: Number(x.id), label: String(x[labelField] ?? x.id) }));
    },
    staleTime: 60000,
  });
}

export const useUserOptions = () => useOptions('user', 'username');
export const useProviderOptions = () => useOptions('provider', 'provider_name');
export const usePlanOptions = () => useOptions('plan', 'name');
export const useTrunkOptions = () => useOptions('trunk', 'trunkcode');
export const usePrefixOptions = () => useOptions('prefix', 'destination');
