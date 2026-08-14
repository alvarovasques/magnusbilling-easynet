import { createResource } from '@/api/crud';
export interface Methodpay {
  id?: number;
  payment_method: string;
  country: string;
  active?: number;
  fee?: number;
  min?: number;
  max?: number;
  show_name?: string;
  url?: string;
  obs?: string;
  id_user?: number;
  idUserusername?: string;
}
export const methodpayResource = createResource<Methodpay>('methodpay');
