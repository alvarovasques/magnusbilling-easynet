import { createResource } from '@/api/crud';

// Controller backup: read lista os arquivos backup_voip_softswitch.DD-MM-YYYY.tgz
// do diretório de backup. Somente admin. Download por arquivo via backup/download.
export interface Backup {
  id?: number;
  name?: string;
  size?: string;
}
export const backupResource = createResource<Backup>('backup');

// backup/download é um GET que faz stream do arquivo (Content-Disposition: attachment).
export function backupDownloadUrl(file: string): string {
  const base = import.meta.env.VITE_API_BASE;
  return `${base}/backup/download?file=${encodeURIComponent(file)}`;
}

// Extrai a data (DD-MM-YYYY) do nome do arquivo de backup, se presente.
export function backupDate(name?: string): string {
  const m = /(\d{2})-(\d{2})-(\d{4})/.exec(name ?? '');
  return m ? `${m[1]}/${m[2]}/${m[3]}` : '—';
}
