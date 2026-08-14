import { createResource } from '@/api/crud';
export interface UserType {
  id?: number;
  name: string;
}
export const userTypeResource = createResource<UserType>('userType');
