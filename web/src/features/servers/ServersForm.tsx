import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Server, serversResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  host: z.string().min(1, 'Host obrigatório'),
  name: z.string().optional(),
  type: z.string().optional(),
  port: z.string().optional(),
  sip_port: z.string().optional(),
  public_ip: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  description: z.string().optional(),
  weight: z.coerce.number().optional(),
  status: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function ServersForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Server | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<Server>(serversResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { status: 1, type: 'asterisk', weight: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { const p = { ...d }; if (!p.password) delete (p as any).password; await save.mutateAsync(p as Partial<Server>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar servidor' : 'Novo servidor'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome"><Input {...register('name')} /></Field>
        <Field label="Host" error={errors.host?.message}><Input {...register('host')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo"><Input {...register('type')} placeholder="ex.: asterisk" /></Field>
          <Field label="IP público"><Input {...register('public_ip')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Porta"><Input {...register('port')} /></Field>
          <Field label="Porta SIP"><Input {...register('sip_port')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Usuário"><Input {...register('username')} /></Field>
          <Field label={initial?.id ? 'Senha (deixe vazio p/ manter)' : 'Senha'}><Input type="password" {...register('password')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Peso"><Input type="number" {...register('weight')} /></Field>
          <Field label="Status"><Select {...register('status')}><option value={1}>Ativo</option><option value={0}>Inativo</option></Select></Field>
        </div>
        <Field label="Descrição"><Input {...register('description')} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
