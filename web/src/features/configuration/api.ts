import { createResource } from '@/api/crud';
export interface Configuration {
  id?: number;
  config_key: string;
  config_title?: string;
  config_value?: string;
  config_description?: string;
  config_group_title?: string;
  status?: number;
}
export const configurationResource = createResource<Configuration>('configuration');
