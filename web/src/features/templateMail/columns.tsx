import type { ColDef } from 'ag-grid-community';
import { TemplateMail } from './api';
import { Badge } from '@/design-system/components/Badge';
export const templateMailColumns: ColDef<TemplateMail>[] = [
  { field: 'mailtype', headerName: 'Tipo', minWidth: 160, pinned: 'left' },
  { field: 'subject', headerName: 'Assunto', minWidth: 240, flex: 1 },
  { field: 'fromname', headerName: 'Remetente', minWidth: 160 },
  { field: 'fromemail', headerName: 'E-mail', minWidth: 200 },
  { field: 'language', headerName: 'Idioma', minWidth: 100 },
  { field: 'status', headerName: 'Status', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
];
