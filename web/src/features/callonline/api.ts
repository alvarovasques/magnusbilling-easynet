import { createResource } from '@/api/crud';
import { apiPost } from '@/api/client';

// pkg_call_online — controller `callOnLine`. extraValues: idUser->username,credit.
// A tabela NÃO tem callerid/calledstation: a origem é sip_account, o número discado é
// ndiscado e o tronco é tronco. `canal` é o canal do Asterisk usado para derrubar.
export interface CallOnline {
  id?: number; canal?: string; uniqueid?: string; sip_account?: string; ndiscado?: string;
  tronco?: string; duration?: number; status?: string; server?: string; idUserusername?: string;
}
export const callOnlineResource = createResource<CallOnline>('callOnLine');

// Derrubar chamada: o actionDestroy do backend NÃO usa id — ele localiza o registro por
// `canal` (rows=[{channel}]) e envia hangup ao Asterisk. Enviar { id } não derruba nada.
export const hangupCall = (canal: string) =>
  apiPost('callOnLine/destroy', { rows: [{ channel: canal }] });
