import { createResource } from '@/api/crud';
export interface Offer {
  id?: number; id_user?: number; idUserusername?: string;
  label: string; packagetype?: number; billingtype?: number; startday?: number;
  freetimetocall?: number; price?: number; initblock?: number; billingblock?: number;
  minimal_time_charge?: number;
}
export const offerResource = createResource<Offer>('offer');
