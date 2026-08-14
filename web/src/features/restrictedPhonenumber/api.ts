import { createResource } from '@/api/crud';

export interface RestrictedPhonenumber {
  id?: number;
  id_user: number;
  number: string;            // número bloqueado
  direction?: number;        // 1 = Saída, 2 = Entrada
  idUserusername?: string;   // cliente dono (extraValue)
}
export const restrictedPhonenumberResource = createResource<RestrictedPhonenumber>('restrictedPhonenumber');

export const DIRECTION_LABELS: Record<number, string> = {
  1: 'Saída',
  2: 'Entrada',
};
