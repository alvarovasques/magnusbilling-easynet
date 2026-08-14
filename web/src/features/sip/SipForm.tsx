import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Sip, sipResource } from './api';
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
  name: z.string().min(1, 'Informe o usuário SIP'),
  secret: z.string().optional(),
  callerid: z.string().optional(),
  host: z.string().optional(),
  allow: z.string().optional(),
  sip_group: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function SipForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Sip | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Sip>(sipResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    reset(initial ? { ...initial } as FormData : { host: 'dynamic', allow: 'ulaw,alaw,g729' } as FormData);
  }, [initial, open, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await save.mutateAsync(data as Partial<Sip>);
    onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar conta SIP' : 'Nova conta SIP'} onClose={onClose}
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
        <Field label="Usuário SIP" error={errors.name?.message}><Input {...register('name')} placeholder="ex.: 1001" /></Field>
        <Field label="Senha (vazio = gerar automático)" error={errors.secret?.message}><Input {...register('secret')} /></Field>
        <Field label="CallerID" error={errors.callerid?.message}><Input {...register('callerid')} placeholder="Nome <número>" /></Field>
        <Field label="Host"><Input {...register('host')} placeholder="dynamic ou IP" /></Field>
        <Field label="Codecs"><Input {...register('allow')} placeholder="ulaw,alaw,g729" /></Field>
        <Field label="Grupo"><Input {...register('sip_group')} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
