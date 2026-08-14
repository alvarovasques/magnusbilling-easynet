import { createResource } from '@/api/crud';
export interface Voucher {
  id?: number;
  voucher: string;
  credit?: number;
  tag?: string;
  language?: string;
  prefix_local?: string;
  used?: number;
  id_user?: number;
  idUserusername?: string;
  id_plan?: number;
  usedate?: string;
  expirationdate?: string;
}
export const voucherResource = createResource<Voucher>('voucher');
