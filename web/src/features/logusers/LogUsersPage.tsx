import { useMemo } from 'react';
import { DataGrid } from '@/design-system/components/DataGrid';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { logUsersResource, LogUser } from './api';
import { logUsersColumns } from './columns';

export function LogUsersPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<LogUser>(logUsersResource), []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-ink">Logs de usuário / Auditoria</h1>
        <p className="text-sm text-ink-secondary">Registro de acessos e ações dos usuários. Útil para auditoria e verificação de bloqueios.</p>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<LogUser> columns={logUsersColumns} datasource={datasource} />
      </div>
    </div>
  );
}
