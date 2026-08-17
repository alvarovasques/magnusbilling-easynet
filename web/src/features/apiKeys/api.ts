import { createResource } from '@/api/crud';
export interface ApiKey {
  id?: number;
  id_user?: number;
  idUserusername?: string; // cliente dono (extraValue)
  status?: number;
  api_key?: string;
  api_secret?: string;
  api_restriction_ips?: string;
  action?: string;
}
export const apiKeysResource = createResource<ApiKey>('api');
