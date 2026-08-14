import { useMemo, useRef, useState } from 'react';
import { Plus, Play, Pause, Send } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { campaignResource, Campaign, setCampaignStatus, testCampaign } from './api';
import { campaignColumns } from './columns';
import { CampaignForm } from './CampaignForm';

export function CampaignsPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Campaign>(campaignResource), []);
  const api = useRef<GridApi<Campaign> | null>(null);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [open, setOpen] = useState(false);
  const refresh = () => api.current?.refreshInfiniteCache();

  const columns: ColDef<Campaign>[] = useMemo(() => [
    ...campaignColumns,
    { headerName: '', width: 96, pinned: 'right', sortable: false, filter: false,
      cellRenderer: (p: any) => {
        const c: Campaign = p.data ?? {};
        if (!c.id) return null;
        const active = Number(c.status) === 1;
        return (
          <div className="flex items-center gap-2">
            <button title={active ? 'Pausar' : 'Ativar'} className={active ? 'text-warning-strong hover:text-warning' : 'text-success-strong hover:text-success'}
              onClick={async (e) => { e.stopPropagation(); await setCampaignStatus(c.id!, active ? 0 : 1); refresh(); }}>
              {active ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button title="Disparar teste" className="text-primary hover:text-primary-hover"
              onClick={async (e) => { e.stopPropagation(); await testCampaign(c.id!); }}>
              <Send size={16} />
            </button>
          </div>
        );
      } },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Torpedo de voz / Campanhas</h1>
          <p className="text-sm text-ink-secondary">Disparos em massa de voz, SMS e WhatsApp. Ative, pause ou dispare um teste pelos ícones.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova campanha</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Campaign> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Campaign>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Campaign>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <CampaignForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
