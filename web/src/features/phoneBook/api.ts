import { createResource } from '@/api/crud';

export interface PhoneBook {
  id?: number;
  id_user: number;
  name: string;              // nome / número da agenda
  description?: string;
  status?: number;           // 1 = ativo, 0 = inativo
  idUserusername?: string;   // cliente dono (extraValue)
}
export const phoneBookResource = createResource<PhoneBook>('phoneBook');
