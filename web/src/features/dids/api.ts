import { createResource } from '@/api/crud';
import { apiPost } from '@/api/client';
export interface Did {
  id?: number; did: string; id_user?: number; idUserusername?: string;
  activated?: number; reserved?: number; connection_charge?: number;
}
export const didResource = createResource<Did>('did');
// Devolve o DID ao pool (desassocia do cliente).
export const liberarDid = (id: number) => apiPost('did/liberar', { id });

export function didStatus(d: Did): { label: string; tone: 'success' | 'warning' | 'neutral' } {
  if (d.id_user && Number(d.id_user) > 0) return { label: 'Ativo', tone: 'success' };
  if (Number(d.reserved) === 1) return { label: 'Reservado', tone: 'warning' };
  return { label: 'Disponível', tone: 'neutral' };
}
