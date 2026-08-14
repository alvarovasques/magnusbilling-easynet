import { createResource } from '@/api/crud';
import { apiGet } from '@/api/client';

// pkg_sip (contas com callshop=1) — controller `callShop`. extraValues: idUser->username.
export interface CallShop {
  id?: number; name?: string; id_user?: number; idUserusername?: string;
  callerid?: string; secret?: string; host?: string; calllimit?: number;
  status?: number; callshopnumber?: string; callshoptime?: string;
  total?: string; destination?: string; price_min?: string;
}
export const callShopResource = createResource<CallShop>('callShop');

// Ações da cabine (o backend lê o id via GET).
export const liberarCabine = (id: number) => apiGet('callShop/liberar', { id });
export const cobrarCabine = (id: number) => apiGet('callShop/cobrar', { id });

// status da cabine: 0=livre/cobrada, 2=liberada para chamadas.
export function callShopStatus(s: unknown): { label: string; tone: 'success' | 'neutral' } {
  return Number(s) === 2 ? { label: 'Liberada', tone: 'success' } : { label: 'Livre', tone: 'neutral' };
}
