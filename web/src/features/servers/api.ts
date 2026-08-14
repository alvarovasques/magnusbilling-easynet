import { createResource } from '@/api/crud';
export interface Server {
  id?: number;
  host: string;
  name?: string;
  type?: string;
  port?: string;
  sip_port?: string;
  public_ip?: string;
  username?: string;
  password?: string;
  description?: string;
  status?: number;
  weight?: number;
}
export const serversResource = createResource<Server>('servers');
