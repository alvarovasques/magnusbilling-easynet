import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Prefix, prefixResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  prefix: z.string().min(1, 'Informe o prefixo'),
  destination: z.string().min(1, 'Informe o destino'),
});
type FormData = z.infer<typeof schema>;

export function PrefixForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Prefix | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<Prefix>(prefixResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : {} as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Prefix>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar prefixo' : 'Novo prefixo'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Prefixo" error={errors.prefix?.message}><Input {...register('prefix')} placeholder="Ex.: 5511" /></Field>
        <Field label="Destino" error={errors.destination?.message}><Input {...register('destination')} placeholder="Ex.: Brasil São Paulo Fixo" /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
