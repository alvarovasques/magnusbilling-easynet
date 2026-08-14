import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Iax, iaxResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  id_user: z.coerce.number().min(1, 'Selecione o cliente'),
  username: z.string().min(1, 'Informe o usuário IAX'),
  secret: z.string().optional(),
  callerid: z.string().optional(),
  host: z.string().optional(),
  context: z.string().optional(),
  allow: z.string().optional(),
  type: z.string().optional(),
  qualify: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function IaxForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Iax | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Iax>(iaxResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    reset(initial
      ? { ...initial, username: initial.username ?? initial.name } as FormData
      : { host: 'dynamic', context: 'billing', type: 'friend', qualify: 'yes', allow: 'ulaw,alaw,g729' } as FormData);
  }, [initial, open, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await save.mutateAsync(data as Partial<Iax>);
    onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar conta IAX' : 'Nova conta IAX'} onClose={onClose}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button>
      </>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue="">
            <option value="" disabled>{users.isLoading ? 'Carregando…' : 'Selecione o cliente'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="Usuário IAX" error={errors.username?.message}><Input {...register('username')} placeholder="ex.: iax1001" /></Field>
        <Field label="Senha (vazio = gerar automático)" error={errors.secret?.message}><Input {...register('secret')} /></Field>
        <Field label="CallerID"><Input {...register('callerid')} placeholder="Nome <número>" /></Field>
        <Field label="Host"><Input {...register('host')} placeholder="dynamic ou IP" /></Field>
        <Field label="Contexto"><Input {...register('context')} placeholder="billing" /></Field>
        <Field label="Codecs"><Input {...register('allow')} placeholder="ulaw,alaw,g729" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo"><Select {...register('type')}><option value="friend">friend</option><option value="user">user</option><option value="peer">peer</option></Select></Field>
          <Field label="Qualify"><Select {...register('qualify')}><option value="yes">Sim</option><option value="no">Não</option></Select></Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
