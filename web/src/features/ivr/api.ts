import { createResource } from '@/api/crud';

// pkg_ivr — controller `ivr`. extraValues: idUser->username.
export interface Ivr {
  id?: number; name?: string; id_user?: number; idUserusername?: string;
  direct_extension?: number; use_holidays?: number;
  monFriStart?: string; satStart?: string; sunStart?: string;
}
export const ivrResource = createResource<Ivr>('ivr');
