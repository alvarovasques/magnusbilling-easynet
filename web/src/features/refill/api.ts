import { createResource } from '@/api/crud';
export interface Refill {
  id?: number; id_user: number; idUserusername?: string;
  credit: number; date?: string; description?: string; refill_type?: number;
}
export const refillResource = createResource<Refill>('refill');
