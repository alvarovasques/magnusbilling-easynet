import { createResource } from '@/api/crud';
export interface TemplateMail {
  id?: number;
  id_user?: number;
  idUserusername?: string; // cliente dono (extraValue)
  mailtype?: string;
  fromemail?: string;
  fromname?: string;
  subject?: string;
  messagehtml?: string;
  language?: string;
  status?: number;
}
export const templateMailResource = createResource<TemplateMail>('templateMail');
