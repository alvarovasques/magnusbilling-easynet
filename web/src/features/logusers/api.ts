import { createResource } from '@/api/crud';

// Tabela pkg_log (controller logUsers). Read-only: destroy é bloqueado no backend.
// extraValues: idUser->username (idUserusername), idLogActions->name (idLogActionsname).
export interface LogUser {
  id?: number;
  date?: string;
  ip?: string;
  description?: string;
  id_user?: number;
  idUserusername?: string;
  idLogActionsname?: string;
}
export const logUsersResource = createResource<LogUser>('logUsers');
