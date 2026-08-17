import { createResource } from '@/api/crud';
export interface Firewall {
  id?: number;
  date?: string;
  ip: string;
  action?: number;
  description?: string;
  jail?: string;
  id_server?: number;
  idServername?: string; // servidor (extraValue)
}
export const firewallResource = createResource<Firewall>('firewall');
