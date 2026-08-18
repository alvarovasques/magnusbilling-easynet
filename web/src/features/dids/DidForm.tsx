import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Did, didResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  did: z.string().min(1, 'Informe o número'),
  id_user: z.coerce.number().optional(),
  callerid: z.string().optional(),
  connection_charge: z.coerce.number().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function DidForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Did | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Did>(didResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : {} as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Did>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar DID' : 'Novo DID'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Número (DDR)" error={errors.did?.message}><Input {...register('did')} placeholder="ex.: 5565300000000" /></Field>
        <Field label="Cliente (vazio = disponível)">
          <Select {...register('id_user')} defaultValue="">
            <option value="">{users.isLoading ? 'Carregando…' : '— disponível —'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="CallerID de entrada (número apresentado)"><Input {...register('callerid')} placeholder="ex.: 556530000000" /></Field>
        <Field label="Custo de conexão / Setup (R$)"><Input type="number" step="0.01" {...register('connection_charge')} /></Field>
        <Field label="Descrição"><Input {...register('description')} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
