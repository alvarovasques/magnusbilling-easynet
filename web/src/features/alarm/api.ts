import { createResource } from '@/api/crud';
export interface Alarm {
  id?: number;
  type?: number;
  amount?: number;
  condition?: number;
  status?: number;
  creationdate?: string;
  period?: number;
  id_plan?: number;
  idPlanname?: string; // plano (extraValue)
  email?: string;
  subject?: string;
  message?: string;
}
export const alarmResource = createResource<Alarm>('alarm');
