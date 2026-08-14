import { createResource } from '@/api/crud';
export interface GroupUser {
  id?: number;
  name: string;
  id_user_type?: number;
  idUserTypename?: string;
  user_prefix?: string;
  hidden_prices?: number;
  hidden_batch_update?: number;
}
export const groupUserResource = createResource<GroupUser>('groupUser');
