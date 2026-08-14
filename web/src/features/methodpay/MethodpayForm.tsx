import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Methodpay, methodpayResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  payment_method: z.string().min(1, 'Forma de pagamento obrigatória'),
  country: z.string().min(1, 'País obrigatório'),
  show_name: z.string().optional(),
  url: z.string().optional(),
  fee: z.coerce.number().optional(),
  min: z.coerce.number().optional(),
  max: z.coerce.number().optional(),
  obs: z.string().optional(),
  active: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function MethodpayForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Methodpay | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<Methodpay>(methodpayResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { active: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Methodpay>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar forma de pagamento' : 'Nova forma de pagamento'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Forma de pagamento" error={errors.payment_method?.message}><Input {...register('payment_method')} placeholder="ex.: pagseguro" /></Field>
        <Field label="Nome de exibição"><Input {...register('show_name')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="País" error={errors.country?.message}><Input {...register('country')} placeholder="ex.: BR" /></Field>
          <Field label="Taxa"><Input type="number" step="0.01" {...register('fee')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Mínimo (R$)"><Input type="number" step="0.01" {...register('min')} /></Field>
          <Field label="Máximo (R$)"><Input type="number" step="0.01" {...register('max')} /></Field>
        </div>
        <Field label="URL"><Input {...register('url')} /></Field>
        <Field label="Observação"><Input {...register('obs')} /></Field>
        <Field label="Status"><Select {...register('active')}><option value={1}>Ativo</option><option value={0}>Inativo</option></Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
