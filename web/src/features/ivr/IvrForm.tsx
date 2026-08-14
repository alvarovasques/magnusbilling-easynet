import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Ivr, ivrResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Informe o nome da URA'),
  id_user: z.coerce.number({ invalid_type_error: 'Selecione o cliente' }).min(1, 'Selecione o cliente'),
  direct_extension: z.coerce.number().optional(),
  use_holidays: z.coerce.number().optional(),
  monFriStart: z.string().optional(),
  satStart: z.string().optional(),
  sunStart: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function IvrForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Ivr | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Ivr>(ivrResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { use_holidays: 0 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Ivr>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar URA' : 'Nova URA'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome da URA" error={errors.name?.message}><Input {...register('name')} /></Field>
        <Field label="Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue="">
            <option value="">{users.isLoading ? 'Carregando…' : '— selecione —'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ramal direto"><Input type="number" {...register('direct_extension')} /></Field>
          <Field label="Usa feriados"><Select {...register('use_holidays')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
        </div>
        <Field label="Horário Seg–Sex"><Input {...register('monFriStart')} placeholder="ex.: 08:00-18:00" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Horário Sábado"><Input {...register('satStart')} placeholder="08:00-12:00" /></Field>
          <Field label="Horário Domingo"><Input {...register('sunStart')} placeholder="08:00-12:00" /></Field>
        </div>
        <p className="text-xs text-ink-muted">Formato de intervalo: 00:00-00:00. Use | para mais de um intervalo.</p>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
