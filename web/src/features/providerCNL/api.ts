import { createResource } from '@/api/crud';

export interface ProviderCNL {
  id?: number;
  id_provider: number;
  idProviderprovider_name?: string; // provedor dono (extraValue)
  cnl: number;                      // Código Nacional Local
  zone: string;                     // zona / área (uppercase no backend)
}
export const providerCNLResource = createResource<ProviderCNL>('providerCNL');
