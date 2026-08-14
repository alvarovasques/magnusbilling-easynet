import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Voucher, voucherResource } from './api';
import { useSave } from '@/api/hooks';
import { usePlanOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  voucher: z.string().min(1, 'Código obrigatório'),
  credit: z.coerce.number().optional(),
  tag: z.string().optional(),
  language: z.string().optional(),
  prefix_local: z.string().optional(),
  id_plan: z.coerce.number().optional(),
  expirationdate: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function VoucherForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Voucher | null; onClose: () => void; onSaved: () => void }) {
  const plans = usePlanOptions();
  const save = useSave<Voucher>(voucherResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : {} as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Voucher>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar voucher' : 'Novo voucher'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Código do voucher" error={errors.voucher?.message}><Input {...register('voucher')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Valor (R$)"><Input type="number" step="0.01" {...register('credit')} /></Field>
          <Field label="Tag"><Input {...register('tag')} /></Field>
        </div>
        <Field label="Plano">
          <Select {...register('id_plan')} defaultValue={initial?.id_plan ?? ''}>
            <option value="">{plans.isLoading ? 'Carregando…' : 'Nenhum'}</option>
            {plans.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Idioma"><Input {...register('language')} placeholder="ex.: pt" /></Field>
          <Field label="Prefixo local"><Input {...register('prefix_local')} /></Field>
        </div>
        <Field label="Data de expiração"><Input type="date" {...register('expirationdate')} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
