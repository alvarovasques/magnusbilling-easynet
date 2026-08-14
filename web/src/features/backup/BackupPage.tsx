import { useMemo } from 'react';
import type { ColDef } from 'ag-grid-community';
import { Download } from 'lucide-react';
import { DataGrid } from '@/design-system/components/DataGrid';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { backupResource, Backup, backupDownloadUrl, backupDate } from './api';

export function BackupPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Backup>(backupResource), []);

  const download = (file?: string) => { if (file) window.open(backupDownloadUrl(file), '_blank'); };

  const columns: ColDef<Backup>[] = useMemo(() => [
    { field: 'name', headerName: 'Arquivo', minWidth: 320, flex: 1, pinned: 'left' },
    { headerName: 'Data', minWidth: 130, valueGetter: (p) => backupDate(p.data?.name) },
    { field: 'size', headerName: 'Tamanho', minWidth: 120, type: 'rightAligned' },
    { headerName: '', width: 60, pinned: 'right', sortable: false, filter: false,
      cellRenderer: (p: any) => (
        <button title="Baixar backup" className="text-primary hover:text-primary-hover" onClick={() => download(p.data?.name)}>
          <Download size={16} />
        </button>
      ) },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-ink">Backup</h1>
        <p className="text-sm text-ink-secondary">Cópias de segurança geradas no servidor. Baixe um arquivo pelo ícone. Novos backups são gerados via cron (php cron.php Backup).</p>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Backup> columns={columns} datasource={datasource} />
      </div>
    </div>
  );
}
