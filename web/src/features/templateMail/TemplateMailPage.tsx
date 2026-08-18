import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { useAuth } from '@/auth/AuthProvider';
import { templateMailResource, TemplateMail } from './api';
import { templateMailColumns } from './columns';
import { TemplateMailForm } from './TemplateMailForm';

export function TemplateMailPage() {
  const { user } = useAuth();
  const datasource = useMemo(() => makeInfiniteDatasource<TemplateMail>(templateMailResource), []);
  const api = useRef<GridApi<TemplateMail> | null>(null);
  const [editing, setEditing] = useState<TemplateMail | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(templateMailResource);

  const columns: ColDef<TemplateMail>[] = useMemo(() => [
    ...templateMailColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);

  if (!user?.isAdmin) {
    return (
      <div className="flex h-[calc(100vh-92px)] items-center justify-center">
        <p className="rounded-sm bg-warning-bg px-4 py-3 text-sm text-warning-strong">
          Acesso restrito. Apenas administradores podem ver os templates de e-mail.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Templates de e-mail</h1>
          <p className="text-sm text-ink-secondary">Modelos de e-mail do sistema (corpo em HTML). Clique numa linha para editar.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo template</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<TemplateMail> columns={columns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<TemplateMail>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<TemplateMail>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <TemplateMailForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
