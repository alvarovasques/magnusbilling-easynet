import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Configuration, configurationResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  config_key: z.string().min(1, 'Chave obrigatória'),
  config_group_title: z.string().optional(),
  config_title: z.string().optional(),
  config_value: z.string().optional(),
  config_description: z.string().optional(),
  status: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function ConfigurationForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Configuration | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<Configuration>(configurationResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { status: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Configuration>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar configuração' : 'Nova configuração'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Chave" error={errors.config_key?.message}>
          <Input {...register('config_key')} readOnly={!!initial?.id} />
        </Field>
        <Field label="Grupo"><Input {...register('config_group_title')} /></Field>
        <Field label="Nome"><Input {...register('config_title')} /></Field>
        <Field label="Valor"><Input {...register('config_value')} /></Field>
        <Field label="Descrição"><Input {...register('config_description')} placeholder="ex.: descrição da configuração" /></Field>
        <Field label="Status"><Select {...register('status')}><option value={1}>Ativo</option><option value={0}>Inativo</option></Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
