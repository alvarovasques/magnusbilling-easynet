import { createResource } from '@/api/crud';
import { apiPost } from '@/api/client';

// pkg_campaign — controller `campaign`. extraValues: idUser->username, idPlan->name.
export interface Campaign {
  id?: number; name: string; id_user?: number; id_plan?: number;
  idUserusername?: string; idPlanname?: string;
  type?: number; status?: number; callerid?: string; audio?: string; description?: string;
  // type=2 (WhatsApp): colunas reais (ALTER via UpdateMysqlCommand). O beforeSave EXIGE
  // whatsapp_template_name != '' quando type===2, senão devolve erro de validação.
  whatsapp_template_name?: string; whatsapp_template_language?: string;
  frequency?: number; max_frequency?: number;
  startingdate?: string; expirationdate?: string;
  daily_start_time?: string; daily_stop_time?: string;
  monday?: number; tuesday?: number; wednesday?: number; thursday?: number;
  friday?: number; saturday?: number; sunday?: number;
}
export const campaignResource = createResource<Campaign>('campaign');

// type: 0=SMS, 1=Torpedo de voz, 2=WhatsApp.
export function campaignType(t: unknown): { label: string; tone: 'info' | 'success' | 'neutral' } {
  const n = Number(t ?? 0);
  if (n === 1) return { label: 'Voz', tone: 'success' };
  if (n === 2) return { label: 'WhatsApp', tone: 'info' };
  return { label: 'SMS', tone: 'neutral' };
}

// Ativa (status=1) ou pausa (status=0) a campanha reaproveitando o save do CRUD.
export const setCampaignStatus = (id: number, status: 0 | 1) =>
  campaignResource.save({ id, status });

// Dispara um teste imediato da campanha (campaign/testCampaign espera POST id).
export const testCampaign = (id: number) => apiPost('campaign/testCampaign', { id });
