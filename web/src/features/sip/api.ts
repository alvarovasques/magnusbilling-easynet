import { createResource } from '@/api/crud';

export interface Sip {
  id?: number;
  id_user: number;
  name: string;            // usuário SIP
  idUserusername?: string; // cliente dono (extraValue)
  callerid?: string;
  host?: string;           // dynamic / IP
  allow?: string;          // codecs
  sip_group?: string;
  techprefix?: string;
  lineStatus?: string;     // OK / Unregistered / Unavailable (calculado)
}
export const sipResource = createResource<Sip>('sip');
