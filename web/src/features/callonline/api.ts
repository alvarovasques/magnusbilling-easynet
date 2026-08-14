import { createResource } from '@/api/crud';
export interface CallOnline {
  id?: number; canal?: string; callerid?: string; calledstation?: string;
  duration?: number; status?: string; server?: string; idUserusername?: string;
}
export const callOnlineResource = createResource<CallOnline>('callOnLine');
