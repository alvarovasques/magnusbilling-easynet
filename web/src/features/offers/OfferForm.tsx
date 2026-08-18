import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Offer, offerResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  label: z.string().min(1, 'Informe o nome da oferta'),
  packagetype: z.coerce.number().optional(),
  billingtype: z.coerce.number().optional(),
  freetimetocall: z.coerce.number().optional(),
  startday: z.coerce.number().optional(),
  price: z.coerce.number().min(0, 'Informe o preço'),
  initblock: z.coerce.number().optional(),
  billingblock: z.coerce.number().optional(),
  minimal_time_charge: z.coerce.number().optional(),
  id_user: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function OfferForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Offer | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Offer>(offerResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { packagetype: 0, billingtype: 0, freetimetocall: 0, startday: 1, initblock: 60, billingblock: 60, minimal_time_charge: 0 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Offer>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar oferta' : 'Nova oferta'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome da oferta" error={errors.label?.message}><Input {...register('label')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo de pacote"><Select {...register('packagetype')}><option value={0}>Chamadas ilimitadas</option><option value={1}>Nº de chamadas grátis</option><option value={2}>Segundos grátis</option></Select></Field>
          <Field label="Cobrança"><Select {...register('billingtype')}><option value={0}>Mensal</option><option value={1}>Semanal</option></Select></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Preço" error={errors.price?.message}><Input type="number" step="0.001" {...register('price')} /></Field>
          <Field label="Tempo grátis p/ ligar"><Input type="number" {...register('freetimetocall')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Dia de início do ciclo"><Input type="number" min={1} {...register('startday')} /></Field>
          <Field label="Tempo mínimo p/ cobrar"><Input type="number" {...register('minimal_time_charge')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bloco inicial (s)"><Input type="number" {...register('initblock')} /></Field>
          <Field label="Bloco de cobrança (s)"><Input type="number" {...register('billingblock')} /></Field>
        </div>
        <Field label="Usuário"><Select {...register('id_user')} defaultValue=""><option value="">— nenhum —</option>{users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
