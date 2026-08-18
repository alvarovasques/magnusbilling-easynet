import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Rate, rateResource } from './api';
import { useSave } from '@/api/hooks';
import { usePlanOptions, useTrunkOptions, usePrefixOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  id_prefix: z.coerce.number().min(1, 'Selecione o prefixo/destino'),
  id_plan: z.coerce.number({ invalid_type_error: 'Selecione o plano' }).min(1, 'Selecione o plano'),
  id_trunk_group: z.coerce.number().optional(),
  rateinitial: z.coerce.number().min(0, 'Informe a tarifa'),
  billingblock: z.coerce.number().optional(),
  connectcharge: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function RateForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Rate | null; onClose: () => void; onSaved: () => void }) {
  const plans = usePlanOptions(); const trunks = useTrunkOptions(); const prefixes = usePrefixOptions();
  const save = useSave<Rate>(rateResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { billingblock: 60 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Rate>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar tarifa' : 'Nova tarifa'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Prefixo / Destino" error={errors.id_prefix?.message}>
          <Select {...register('id_prefix')} defaultValue="">
            <option value="" disabled>{prefixes.isLoading ? 'Carregando…' : 'Selecione'}</option>
            {prefixes.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Plano" error={errors.id_plan?.message}><Select {...register('id_plan')} defaultValue=""><option value="" disabled>{plans.isLoading ? 'Carregando…' : 'Selecione o plano'}</option>{plans.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select></Field>
          <Field label="Grupo de troncos"><Select {...register('id_trunk_group')} defaultValue=""><option value="">— nenhum —</option>{trunks.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select></Field>
        </div>
        <Field label="Tarifa (por min)" error={errors.rateinitial?.message}><Input type="number" step="0.00001" {...register('rateinitial')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bloco (s)"><Input type="number" {...register('billingblock')} /></Field>
          <Field label="Conexão"><Input type="number" step="0.00001" {...register('connectcharge')} /></Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
