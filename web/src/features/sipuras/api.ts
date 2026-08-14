import { createResource } from '@/api/crud';

export interface Sipuras {
  id?: number;
  id_user: number;
  idUserusername?: string;  // cliente dono (extraValue)
  macadr: string;           // MAC (12 hex)
  marca?: string;           // marca / modelo (código)
  senha_admin?: string;
  senha_user?: string;
  obs?: string;
  email?: string;
  // Linha 1
  Display_Name_1?: string;
  User_ID_1?: string;
  Password_1?: string;
  Proxy_1?: string;
  // Linha 2
  Display_Name_2?: string;
  User_ID_2?: string;
  Password_2?: string;
  Proxy_2?: string;
  Enable_Web_Server?: string; // yes/no
  Provision_Enable?: string;  // yes/no
  altera?: string;            // si/no (marca para reprovisionar)
  last_ip?: string;
  fultmov?: string;           // última movimentação
}
export const sipurasResource = createResource<Sipuras>('sipuras');
