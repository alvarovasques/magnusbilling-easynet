import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { TemplateMail, templateMailResource } from './api';
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
  mailtype: z.string().min(1, 'Tipo obrigatório'),
  fromemail: z.string().optional(),
  fromname: z.string().optional(),
  subject: z.string().optional(),
  messagehtml: z.string().optional(),
  language: z.string().optional(),
  status: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

const textareaCls = 'min-h-[220px] w-full rounded-sm border border-linestrong bg-surface px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-sky-emph focus:shadow-focus focus:outline-none';

export function TemplateMailForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: TemplateMail | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<TemplateMail>(templateMailResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { id_user: 1, language: 'br', status: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<TemplateMail>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar template de e-mail' : 'Novo template de e-mail'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Cliente">
          <Select {...register('id_user')} defaultValue="">
            <option value="" disabled>{users.isLoading ? 'Carregando…' : 'Selecione o cliente'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="Tipo (mailtype)" error={errors.mailtype?.message}>
          <Input {...register('mailtype')} placeholder="ex.: signup, reminder, refill" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nome do remetente"><Input {...register('fromname')} /></Field>
          <Field label="E-mail do remetente"><Input {...register('fromemail')} /></Field>
        </div>
        <Field label="Assunto"><Input {...register('subject')} /></Field>
        <Field label="Corpo (HTML)">
          <textarea {...register('messagehtml')} className={textareaCls} placeholder="<html>…</html>" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Idioma"><Input {...register('language')} placeholder="ex.: br, en" /></Field>
          <Field label="Status"><Select {...register('status')}><option value={1}>Ativo</option><option value={0}>Inativo</option></Select></Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
