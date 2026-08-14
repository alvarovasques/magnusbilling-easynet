import { createResource } from '@/api/crud';

export interface Iax {
  id?: number;
  id_user: number;
  name?: string;             // usuário IAX (= username, gerado no backend)
  username?: string;         // usuário IAX (entrada no form)
  secret?: string;           // senha IAX
  callerid?: string;
  host?: string;             // dynamic / IP
  ipaddr?: string;
  context?: string;
  allow?: string;            // codecs
  type?: string;             // friend / user / peer
  qualify?: string;          // yes / no
  nat?: string;
  dtmfmode?: string;
  insecure?: string;
  calllimit?: number;
  idUserusername?: string;   // cliente dono (extraValue)
}
export const iaxResource = createResource<Iax>('iax');
