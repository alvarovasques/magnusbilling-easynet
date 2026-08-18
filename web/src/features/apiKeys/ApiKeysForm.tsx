import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { ApiKey, apiKeysResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  id_user: z.coerce.number().min(1, 'Selecione o cliente'),
  api_key: z.string().optional(),
  api_secret: z.string().optional(),
  api_restriction_ips: z.string().optional(),
  action: z.string().optional(),
  status: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

// Gera uma credencial aleatória (hex) — o backend exige api_key/api_secret
// obrigatórios, sem espaços, mínimo 15 caracteres e únicos. Não há geração
// automática no servidor, então o valor precisa vir preenchido no cadastro.
function randomCredential(): string {
  const bytes = new Uint8Array(20);
  (globalThis.crypto ?? window.crypto).getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function ApiKeysForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: ApiKey | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<ApiKey>(apiKeysResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => {
    reset(initial
      ? { ...initial } as FormData
      : { status: 1, action: 'all', api_key: randomCredential(), api_secret: randomCredential() } as FormData);
  }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => {
    const p = { ...d };
    // Na edição o segredo vem mascarado (ex.: "abc123******"); nunca reenviar o valor mascarado.
    if (!p.api_secret || p.api_secret.includes('*')) delete (p as any).api_secret;
    await save.mutateAsync(p as Partial<ApiKey>); onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar chave de API' : 'Nova chave de API'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue="">
            <option value="" disabled>{users.isLoading ? 'Carregando…' : 'Selecione o cliente'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="Chave (api_key)"><Input {...register('api_key')} placeholder="gerada automaticamente se vazio" /></Field>
        <Field label={initial?.id ? 'Segredo (deixe vazio p/ manter)' : 'Segredo (api_secret)'}>
          <Input {...register('api_secret')} placeholder="gerado automaticamente se vazio" />
        </Field>
        <Field label="IPs permitidos"><Input {...register('api_restriction_ips')} placeholder="ex.: 1.2.3.4,5.6.7.8" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ação"><Input {...register('action')} placeholder="ex.: all" /></Field>
          <Field label="Status"><Select {...register('status')}><option value={1}>Ativo</option><option value={0}>Inativo</option></Select></Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
