import { createResource } from '@/api/crud';
export interface Plan {
  id?: number; id_user?: number; idUserusername?: string;
  name: string; signup?: number; ini_credit?: number; play_audio?: number;
  techprefix?: string; portabilidadeMobile?: number; portabilidadeFixed?: number;
}
export const planResource = createResource<Plan>('plan');
