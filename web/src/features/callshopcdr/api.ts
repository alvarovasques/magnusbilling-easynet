import { createResource } from '@/api/crud';

// pkg_callshop — controller `callShopCdr` (somente leitura).
// select: id, price_min, sessionid, destination, status, buycost, price,
//         calledstation, date, sessiontime, cabina, markup, priceSum.
export interface CallShopCdr {
  id?: number; date?: string; cabina?: string; calledstation?: string; destination?: string;
  sessiontime?: number; price?: number; buycost?: number; markup?: number;
  price_min?: number; status?: number; priceSum?: number;
}
export const callShopCdrResource = createResource<CallShopCdr>('callShopCdr');
