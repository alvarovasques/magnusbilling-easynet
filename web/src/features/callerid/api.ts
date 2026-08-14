import { createResource } from '@/api/crud';

export interface Callerid {
  id?: number;
  id_user: number;
  cid: string;               // número do CallerID
  name?: string;             // nome/apelido
  description?: string;
  activated?: string;        // 't' / 'f'
  idUserusername?: string;   // cliente dono (extraValue)
}
export const calleridResource = createResource<Callerid>('callerid');
