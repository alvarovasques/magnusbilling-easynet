import { createResource } from '@/api/crud';

// Controller sipTrace: read parseia resources/reports/siptrace.log e devolve
// os pacotes SIP capturados. Read-only para depuração de registro e chamada.
export interface SipPacket {
  id?: number;
  method?: string;
  fromip?: string;
  toip?: string;
  sipto?: string;
  callid?: string;
  head?: string;
}
export const sipTraceResource = createResource<SipPacket>('sipTrace');
