import { createResource } from '@/api/crud';

export interface UserHistory {
  id?: number;
  id_user: number;
  description?: string;
  date?: string;             // timestamp
  idUserusername?: string;   // cliente (extraValue)
}
export const userHistoryResource = createResource<UserHistory>('userHistory');
