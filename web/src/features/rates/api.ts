import { createResource } from '@/api/crud';
export interface Rate {
  id?: number; id_prefix?: number; id_plan?: number; id_trunk?: number;
  idPrefixprefix?: string; idPrefixdestination?: string; idTrunktrunkcode?: string;
  rateinitial?: number; rate_offpeak?: number; initblock?: number; billingblock?: number;
  connectcharge?: number; minimal_time_charge?: number;
}
export const rateResource = createResource<Rate>('rate');
