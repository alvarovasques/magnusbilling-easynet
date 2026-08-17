import { createResource } from '@/api/crud';
export interface Smtp {
  id?: number;
  id_user?: number;
  idUserusername?: string; // cliente dono (extraValue)
  host: string;
  username?: string;
  password?: string;
  port?: string;
  encryption?: string;
}
export const smtpResource = createResource<Smtp>('smtps');
