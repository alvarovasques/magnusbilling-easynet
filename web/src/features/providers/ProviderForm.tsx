import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Provider, providerResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  provider_name: z.string().min(1, 'Informe o nome do provedor'),
  credit: z.coerce.number().optional(),
  credit_control: z.coerce.number().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function ProviderForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Provider | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<Provider>(providerResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { credit: 0, credit_control: 0 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Provider>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar provedor' : 'Novo provedor'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome do provedor" error={errors.provider_name?.message}><Input {...register('provider_name')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Crédito"><Input type="number" step="0.00001" {...register('credit')} /></Field>
          <Field label="Controle de crédito"><Select {...register('credit_control')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
        </div>
        <Field label="Descrição">
          <textarea {...register('description')} rows={3}
            className="w-full rounded-sm border border-linestrong bg-surface px-3 py-2 text-base text-ink placeholder:text-ink-muted focus:border-sky-emph focus:shadow-focus focus:outline-none" />
        </Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
