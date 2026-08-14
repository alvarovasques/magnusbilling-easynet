import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Sipuras, sipurasResource } from './api';
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
  macadr: z.string().regex(/^[A-Fa-f0-9]{12}$/, 'MAC deve ter 12 caracteres hexadecimais'),
  marca: z.string().optional(),
  senha_admin: z.string().optional(),
  senha_user: z.string().optional(),
  Display_Name_1: z.string().optional(),
  User_ID_1: z.string().optional(),
  Password_1: z.string().optional(),
  Proxy_1: z.string().optional(),
  Display_Name_2: z.string().optional(),
  User_ID_2: z.string().optional(),
  Password_2: z.string().optional(),
  Proxy_2: z.string().optional(),
  Enable_Web_Server: z.string().optional(),
  Provision_Enable: z.string().optional(),
  obs: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function SipurasForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Sipuras | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Sipuras>(sipurasResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    reset(initial ? { ...initial } as FormData : { Enable_Web_Server: 'yes', Provision_Enable: 'yes' } as FormData);
  }, [initial, open, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await save.mutateAsync(data as Partial<Sipuras>);
    onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar ATA Linksys' : 'Novo ATA Linksys'} onClose={onClose}
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="MAC" error={errors.macadr?.message}><Input {...register('macadr')} placeholder="AABBCCDDEEFF" maxLength={12} /></Field>
          <Field label="Marca"><Input {...register('marca')} placeholder="ex.: X" maxLength={2} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Senha admin"><Input {...register('senha_admin')} maxLength={8} /></Field>
          <Field label="Senha usuário"><Input {...register('senha_user')} maxLength={8} /></Field>
        </div>

        <p className="border-t border-line pt-3 text-xs font-semibold text-ink-secondary">Linha 1</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nome de exibição"><Input {...register('Display_Name_1')} /></Field>
          <Field label="Usuário (User ID)"><Input {...register('User_ID_1')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Senha"><Input {...register('Password_1')} /></Field>
          <Field label="Proxy"><Input {...register('Proxy_1')} /></Field>
        </div>

        <p className="border-t border-line pt-3 text-xs font-semibold text-ink-secondary">Linha 2</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nome de exibição"><Input {...register('Display_Name_2')} /></Field>
          <Field label="Usuário (User ID)"><Input {...register('User_ID_2')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Senha"><Input {...register('Password_2')} /></Field>
          <Field label="Proxy"><Input {...register('Proxy_2')} /></Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Servidor web"><Select {...register('Enable_Web_Server')}><option value="yes">Habilitado</option><option value="no">Desabilitado</option></Select></Field>
          <Field label="Provisionamento"><Select {...register('Provision_Enable')}><option value="yes">Habilitado</option><option value="no">Desabilitado</option></Select></Field>
        </div>
        <Field label="Observação"><Input {...register('obs')} maxLength={50} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
