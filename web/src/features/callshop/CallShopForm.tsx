import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { CallShop, callShopResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Informe o nome da cabine'),
  id_user: z.coerce.number({ invalid_type_error: 'Selecione a loja/cliente' }).min(1, 'Selecione a loja/cliente'),
  callerid: z.string().optional(),
  secret: z.string().optional(),
  host: z.string().optional(),
  calllimit: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function CallShopForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: CallShop | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<CallShop>(callShopResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { host: 'dynamic', calllimit: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<CallShop>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar cabine' : 'Nova cabine'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome da cabine" error={errors.name?.message}><Input {...register('name')} /></Field>
        <Field label="Loja / Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue="">
            <option value="">{users.isLoading ? 'Carregando…' : '— selecione —'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bina (CallerID)"><Input {...register('callerid')} /></Field>
          <Field label="Senha (SIP)"><Input {...register('secret')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Host"><Input {...register('host')} placeholder="IP ou dynamic" /></Field>
          <Field label="Limite de chamadas"><Input type="number" {...register('calllimit')} /></Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
