import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Trash2 } from 'lucide-react';
import { Button } from './Button';

// Botão de excluir (ícone na linha do grid) com modal de confirmação.
// `onConfirm` deve LANÇAR erro em caso de falha (ex.: useDelete().mutateAsync,
// que já lança quando o backend recusa) — a mensagem real é mostrada no modal.
export function DeleteAction({ onConfirm, message = 'Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.' }:
  { onConfirm: () => Promise<unknown>; message?: string }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const confirm = async () => {
    setBusy(true); setErr(null);
    try { await onConfirm(); setOpen(false); }
    catch (e) { setErr((e as Error)?.message || 'Não foi possível excluir.'); }
    finally { setBusy(false); }
  };

  return (
    <>
      <button title="Excluir" className="text-danger hover:text-danger-strong"
        onClick={(e) => { e.stopPropagation(); setErr(null); setOpen(true); }}>
        <Trash2 size={16} />
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[1060] grid place-items-center bg-navy/45 p-4"
          onClick={(e) => { e.stopPropagation(); setOpen(false); }}>
          <div className="w-full max-w-sm rounded-lg bg-surface p-5 shadow-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-md font-semibold text-ink">Confirmar exclusão</h3>
            <p className="mt-1 text-sm text-ink-secondary">{message}</p>
            {err && <p className="mt-3 rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{err}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button variant="danger" disabled={busy} onClick={confirm}>{busy ? 'Excluindo…' : 'Excluir'}</Button>
            </div>
          </div>
        </div>, document.body)}
    </>
  );
}
