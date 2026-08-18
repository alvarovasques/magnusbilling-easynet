import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { User, userResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  username: z.string().min(4, 'Mínimo 4 caracteres'),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  credit: z.coerce.number().optional(),
  creditlimit: z.coerce.number().optional(),
  typepaid: z.coerce.number().optional(),
  active: z.coerce.number().optional(),
  password: z.string().optional(),
}).superRefine((data, ctx) => {
  // Senha é obrigatória no cadastro (sem id). Na edição, vazio = mantém a atual.
  if (!data.id && !data.password) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['password'], message: 'Informe a senha' });
  }
});
type FormData = z.infer<typeof schema>;

export function UserForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: User | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<User>(userResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { active: 1, typepaid: 0 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { const p = { ...d }; if (!p.password) delete (p as any).password; await save.mutateAsync(p as Partial<User>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar cliente' : 'Novo cliente'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Usuário" error={errors.username?.message}><Input {...register('username')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nome"><Input {...register('firstname')} /></Field>
          <Field label="Sobrenome"><Input {...register('lastname')} /></Field>
        </div>
        <Field label="E-mail" error={errors.email?.message}><Input {...register('email')} /></Field>
        <Field label="Telefone"><Input {...register('phone')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Saldo (R$)"><Input type="number" step="0.01" {...register('credit')} /></Field>
          <Field label="Limite (R$)"><Input type="number" step="0.01" {...register('creditlimit')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo"><Select {...register('typepaid')}><option value={0}>Pré-pago</option><option value={1}>Pós-pago</option></Select></Field>
          <Field label="Status"><Select {...register('active')}><option value={1}>Ativo</option><option value={0}>Inativo</option></Select></Field>
        </div>
        <Field label={initial?.id ? 'Nova senha (deixe vazio p/ manter)' : 'Senha'} error={errors.password?.message}><Input type="password" {...register('password')} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
