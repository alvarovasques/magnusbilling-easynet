import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Alarm, alarmResource } from './api';
import { useSave } from '@/api/hooks';
import { usePlanOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  type: z.coerce.number().optional(),
  amount: z.coerce.number().optional(),
  condition: z.coerce.number().optional(),
  period: z.coerce.number().optional(),
  id_plan: z.coerce.number().optional(),
  email: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  status: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

const textareaCls = 'min-h-[120px] w-full rounded-sm border border-linestrong bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-sky-emph focus:shadow-focus focus:outline-none';

export function AlarmForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Alarm | null; onClose: () => void; onSaved: () => void }) {
  const plans = usePlanOptions();
  const save = useSave<Alarm>(alarmResource);
  const { register, handleSubmit, reset } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { status: 1, type: 1, amount: 0, condition: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Alarm>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar alarme' : 'Novo alarme'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Assunto"><Input {...register('subject')} placeholder="ex.: MagnusBilling ALARM" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo"><Input type="number" {...register('type')} /></Field>
          <Field label="Condição"><Input type="number" {...register('condition')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Valor"><Input type="number" {...register('amount')} /></Field>
          <Field label="Período"><Input type="number" {...register('period')} /></Field>
        </div>
        <Field label="Plano">
          <Select {...register('id_plan')} defaultValue="">
            <option value="" disabled>{plans.isLoading ? 'Carregando…' : 'Selecione o plano'}</option>
            {plans.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="E-mail"><Input {...register('email')} placeholder="destino@dominio.com" /></Field>
        <Field label="Mensagem"><textarea {...register('message')} className={textareaCls} /></Field>
        <Field label="Status"><Select {...register('status')}><option value={1}>Ativo</option><option value={0}>Inativo</option></Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
