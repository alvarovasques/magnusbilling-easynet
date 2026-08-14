import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { RestrictedPhonenumber, restrictedPhonenumberResource } from './api';
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
  number: z.string().min(1, 'Informe o número'),
  direction: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function RestrictedPhonenumberForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: RestrictedPhonenumber | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<RestrictedPhonenumber>(restrictedPhonenumberResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    reset(initial ? { ...initial } as FormData : { direction: 1 } as FormData);
  }, [initial, open, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await save.mutateAsync(data as Partial<RestrictedPhonenumber>);
    onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar número bloqueado' : 'Novo número bloqueado'} onClose={onClose}
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
        <Field label="Número" error={errors.number?.message}><Input {...register('number')} placeholder="ex.: 5511999998888" /></Field>
        <Field label="Direção"><Select {...register('direction')}><option value={1}>Saída</option><option value={2}>Entrada</option></Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
