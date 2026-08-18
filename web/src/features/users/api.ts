import { createResource } from '@/api/crud';
export interface User {
  id?: number; username: string; firstname?: string; lastname?: string; email?: string; phone?: string;
  active?: number; credit?: number; creditlimit?: number; typepaid?: number; id_group?: number;
  id_plan?: number; credit_notification?: number;
  idGroupname?: string; password?: string;
}
export const userResource = createResource<User>('user');
