import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { useAuth } from '@/auth/AuthProvider';
import { smtpResource, Smtp } from './api';
import { smtpColumns } from './columns';
import { SmtpForm } from './SmtpForm';

export function SmtpPage() {
  const { user } = useAuth();
  const datasource = useMemo(() => makeInfiniteDatasource<Smtp>(smtpResource), []);
  const api = useRef<GridApi<Smtp> | null>(null);
  const [editing, setEditing] = useState<Smtp | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(smtpResource);

  const columns: ColDef<Smtp>[] = useMemo(() => [
    ...smtpColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);

  if (!user?.isAdmin) {
    return (
      <div className="flex h-[calc(100vh-92px)] items-center justify-center">
        <p className="rounded-sm bg-warning-bg px-4 py-3 text-sm text-warning-strong">
          Acesso restrito. Apenas administradores podem ver os servidores SMTP.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Servidores SMTP</h1>
          <p className="text-sm text-ink-secondary">Servidores de envio de e-mail. Clique numa linha para editar.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo SMTP</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Smtp> columns={columns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Smtp>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Smtp>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <SmtpForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
