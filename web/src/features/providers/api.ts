import { createResource } from '@/api/crud';
export interface Provider {
  id?: number; provider_name: string; credit?: number; credit_control?: number; description?: string;
}
export const providerResource = createResource<Provider>('provider');
