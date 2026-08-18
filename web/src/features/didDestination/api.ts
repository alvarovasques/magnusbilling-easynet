import { createResource } from '@/api/crud';
export interface DidDestination {
  id?: number;
  id_user: number; idUserusername?: string;
  id_did: number; idDiddid?: string;
  id_sip?: number | null; idSipname?: string;
  id_ivr?: number | null; idIvrname?: string;
  id_queue?: number | null; idQueuename?: string;
  destination?: string;      // número externo (quando não é SIP/URA/Fila)
  priority?: number; activated?: number; voip_call?: number;
}
export const didDestinationResource = createResource<DidDestination>('diddestination');
