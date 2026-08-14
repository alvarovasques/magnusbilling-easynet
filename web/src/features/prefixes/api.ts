import { createResource } from '@/api/crud';
export interface Prefix {
  id?: number; prefix: string; destination: string;
}
export const prefixResource = createResource<Prefix>('prefix');
