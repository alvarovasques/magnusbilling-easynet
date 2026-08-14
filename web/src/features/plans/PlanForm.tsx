import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Plan, planResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Informe o nome do plano'),
  signup: z.coerce.number().optional(),
  ini_credit: z.coerce.number().optional(),
  play_audio: z.coerce.number().optional(),
  techprefix: z.string().optional(),
  portabilidadeMobile: z.coerce.number().optional(),
  portabilidadeFixed: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function PlanForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Plan | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<Plan>(planResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { signup: 0, play_audio: 0, ini_credit: 0, portabilidadeMobile: 0, portabilidadeFixed: 0 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Plan>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar plano' : 'Novo plano'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome do plano" error={errors.name?.message}><Input {...register('name')} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Usar no cadastro"><Select {...register('signup')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
          <Field label="Avisos com áudio"><Select {...register('play_audio')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Crédito inicial"><Input type="number" step="0.00001" {...register('ini_credit')} /></Field>
          <Field label="Tech prefix"><Input maxLength={7} {...register('techprefix')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Portabilidade celular"><Select {...register('portabilidadeMobile')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
          <Field label="Portabilidade fixo"><Select {...register('portabilidadeFixed')}><option value={0}>Não</option><option value={1}>Sim</option></Select></Field>
        </div>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
