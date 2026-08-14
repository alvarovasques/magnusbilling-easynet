import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { GroupUser, groupUserResource } from './api';
import { useSave } from '@/api/hooks';
import { useOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nome obrigatório'),
  id_user_type: z.coerce.number().optional(),
  user_prefix: z.string().max(6, 'Máximo 6 caracteres').optional(),
  hidden_prices: z.coerce.number().optional(),
  hidden_batch_update: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function GroupUserForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: GroupUser | null; onClose: () => void; onSaved: () => void }) {
  const types = useOptions('userType', 'name');
  const save = useSave<GroupUser>(groupUserResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { hidden_prices: 0, hidden_batch_update: 0 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<GroupUser>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar grupo' : 'Novo grupo'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome do grupo" error={errors.name?.message}><Input {...register('name')} /></Field>
        <Field label="Tipo de usuário" error={errors.id_user_type?.message}>
          <Select {...register('id_user_type')} defaultValue={initial?.id_user_type ?? ''}>
            <option value="">{types.isLoading ? 'Carregando…' : 'Selecione'}</option>
            {types.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="Prefixo de usuário" error={errors.user_prefix?.message}><Input {...register('user_prefix')} maxLength={6} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ocultar preços"><Select {...register('hidden_prices')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
          <Field label="Ocultar edição em lote"><Select {...register('hidden_batch_update')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
