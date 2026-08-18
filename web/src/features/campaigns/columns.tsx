import type { ColDef } from 'ag-grid-community';
import { Campaign, campaignType } from './api';
import { Badge } from '@/design-system/components/Badge';

// Filtro só na coluna real `name`. type/status são badges computados (sortable:false,
// filter:false). idUserusername é relação: sort mapeado por replaceOrder, sem filter.
export const campaignColumns: ColDef<Campaign>[] = [
  { field: 'name', headerName: 'Campanha', minWidth: 200, pinned: 'left', filter: true },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'type', headerName: 'Tipo', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => { const t = campaignType(p.value); return <Badge tone={t.tone}>{t.label}</Badge>; } },
  { field: 'startingdate', headerName: 'Início', minWidth: 160 },
  { field: 'frequency', headerName: 'Freq.', minWidth: 100, type: 'rightAligned' },
  { field: 'status', headerName: 'Situação', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativa</Badge> : <Badge tone="neutral">Pausada</Badge>) },
];
