import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Smtp, smtpResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  id_user: z.coerce.number().optional(),
  host: z.string().min(1, 'Host obrigatório'),
  // Backend (model Smtps) não exige username; relays sem autenticação são válidos.
  username: z.string().optional(),
  password: z.string().optional(),
  port: z.string().optional(),
  encryption: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function SmtpForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Smtp | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Smtp>(smtpResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { id_user: 1, port: '587', encryption: 'tls' } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { const p = { ...d }; if (!p.password) delete (p as any).password; await save.mutateAsync(p as Partial<Smtp>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar servidor SMTP' : 'Novo servidor SMTP'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Cliente">
          <Select {...register('id_user')} defaultValue="">
            <option value="" disabled>{users.isLoading ? 'Carregando…' : 'Selecione o cliente'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="Host" error={errors.host?.message}><Input {...register('host')} placeholder="ex.: smtp.gmail.com" /></Field>
        <Field label="Usuário / E-mail" error={errors.username?.message}><Input {...register('username')} placeholder="ex.: envio@dominio.com" /></Field>
        <Field label={initial?.id ? 'Senha (deixe vazio p/ manter)' : 'Senha'}><Input type="password" {...register('password')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Porta"><Input {...register('port')} placeholder="587" /></Field>
          <Field label="Criptografia">
            <Select {...register('encryption')}>
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
              <option value="">Nenhuma</option>
            </Select>
          </Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
