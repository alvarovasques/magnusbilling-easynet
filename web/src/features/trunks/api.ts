import { createResource } from '@/api/crud';
export interface Trunk {
  id?: number; trunkcode: string; id_provider?: number; idProviderprovider_name?: string;
  providertech?: string; host?: string; user?: string; secret?: string; allow?: string;
  trunkprefix?: string; removeprefix?: string; status?: number; registered?: number;
}
export const trunkResource = createResource<Trunk>('trunk');
