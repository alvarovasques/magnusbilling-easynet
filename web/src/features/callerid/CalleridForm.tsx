import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Callerid, calleridResource } from './api';
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
  cid: z.string().min(1, 'Informe o número do CallerID'),
  name: z.string().optional(),
  description: z.string().optional(),
  activated: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function CalleridForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Callerid | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Callerid>(calleridResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    reset(initial ? { ...initial } as FormData : { activated: 't' } as FormData);
  }, [initial, open, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await save.mutateAsync(data as Partial<Callerid>);
    onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar CallerID' : 'Novo CallerID'} onClose={onClose}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button>
      </>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue="">
            <option value="" disabled>{users.isLoading ? 'Carregando…' : 'Selecione o cliente'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="CallerID (número)" error={errors.cid?.message}><Input {...register('cid')} placeholder="ex.: 1140041234" /></Field>
        <Field label="Nome"><Input {...register('name')} /></Field>
        <Field label="Descrição"><Input {...register('description')} /></Field>
        <Field label="Status"><Select {...register('activated')}><option value="t">Ativo</option><option value="f">Inativo</option></Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
