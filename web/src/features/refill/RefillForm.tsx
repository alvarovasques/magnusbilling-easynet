import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Refill, refillResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id_user: z.coerce.number().min(1, 'Selecione o cliente'),
  credit: z.coerce.number().positive('Valor deve ser maior que zero'),
  description: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function RefillForm({ open, presetUserId, onClose, onSaved }:
  { open: boolean; presetUserId?: number; onClose: () => void; onSaved?: () => void }) {
  const users = useUserOptions();
  const save = useSave<Refill>(refillResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { reset({ id_user: presetUserId, credit: undefined, description: '' } as any); }, [presetUserId, open, reset]);

  const onSubmit = handleSubmit(async (data) => { await save.mutateAsync(data as Partial<Refill>); onSaved?.(); onClose(); });

  return (
    <Drawer open={open} title="Nova recarga" onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Recarregar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue={presetUserId ?? ''}>
            <option value="" disabled>{users.isLoading ? 'Carregando…' : 'Selecione'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="Valor (R$)" error={errors.credit?.message}><Input type="number" step="0.01" {...register('credit')} /></Field>
        <Field label="Descrição"><Input {...register('description')} placeholder="ex.: recarga manual" /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
