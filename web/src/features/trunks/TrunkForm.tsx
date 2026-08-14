import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Trunk, trunkResource } from './api';
import { useSave } from '@/api/hooks';
import { useProviderOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  trunkcode: z.string().min(1, 'Informe o nome do tronco'),
  id_provider: z.coerce.number().optional(),
  providertech: z.string().optional(),
  host: z.string().optional(),
  user_name: z.string().optional(),
  secret: z.string().optional(),
  addprefix: z.string().optional(),
  removeprefix: z.string().optional(),
  status: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function TrunkForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Trunk | null; onClose: () => void; onSaved: () => void }) {
  const providers = useProviderOptions();
  const save = useSave<Trunk>(trunkResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { providertech: 'pjsip', host: 'dynamic', status: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Trunk>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar tronco' : 'Novo tronco'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome do tronco" error={errors.trunkcode?.message}><Input {...register('trunkcode')} /></Field>
        <Field label="Provedor">
          <Select {...register('id_provider')} defaultValue="">
            <option value="">{providers.isLoading ? 'Carregando…' : '— nenhum —'}</option>
            {providers.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tecnologia"><Select {...register('providertech')}><option value="pjsip">PJSIP</option><option value="sip">SIP</option><option value="iax2">IAX2</option></Select></Field>
          <Field label="Host"><Input {...register('host')} placeholder="IP ou dynamic" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Usuário"><Input {...register('user_name')} /></Field>
          <Field label="Senha"><Input {...register('secret')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Add prefixo"><Input {...register('addprefix')} /></Field>
          <Field label="Remove prefixo"><Input {...register('removeprefix')} /></Field>
        </div>
        <Field label="Ativo"><Select {...register('status')}><option value={1}>Sim</option><option value={0}>Não</option></Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
