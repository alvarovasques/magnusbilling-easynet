import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { ProviderCNL, providerCNLResource } from './api';
import { useSave } from '@/api/hooks';
import { useProviderOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  id_provider: z.coerce.number().min(1, 'Selecione o provedor'),
  cnl: z.coerce.number({ invalid_type_error: 'Informe o CNL' }).min(1, 'Informe o CNL'),
  zone: z.string().min(1, 'Informe a zona').max(11, 'Máximo 11 caracteres'),
});
type FormData = z.infer<typeof schema>;

export function ProviderCNLForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: ProviderCNL | null; onClose: () => void; onSaved: () => void }) {
  const providers = useProviderOptions();
  const save = useSave<ProviderCNL>(providerCNLResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { reset(initial ? { ...initial } as FormData : {} as FormData); }, [initial, open, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await save.mutateAsync(data as Partial<ProviderCNL>);
    onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar CNL' : 'Novo CNL'} onClose={onClose}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button>
      </>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Provedor" error={errors.id_provider?.message}>
          <Select {...register('id_provider')} defaultValue="">
            <option value="" disabled>{providers.isLoading ? 'Carregando…' : 'Selecione o provedor'}</option>
            {providers.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="CNL (Código Nacional Local)" error={errors.cnl?.message}><Input type="number" {...register('cnl')} placeholder="ex.: 4832" /></Field>
        <Field label="Zona / Área" error={errors.zone?.message}><Input {...register('zone')} placeholder="ex.: SP" maxLength={11} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
