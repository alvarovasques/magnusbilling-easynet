import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Firewall, firewallResource } from './api';
import { useSave } from '@/api/hooks';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  ip: z.string().min(1, 'IP obrigatório'),
  action: z.coerce.number().optional(),
  jail: z.string().optional(),
  id_server: z.coerce.number().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function FirewallForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Firewall | null; onClose: () => void; onSaved: () => void }) {
  const save = useSave<Firewall>(firewallResource);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => { reset(initial ? { ...initial } as FormData : { action: 1, id_server: 1 } as FormData); }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Firewall>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar regra de firewall' : 'Nova regra de firewall'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="IP" error={errors.ip?.message}><Input {...register('ip')} placeholder="ex.: 192.168.0.1" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ação">
            <Select {...register('action')}>
              <option value={1}>Bloquear</option>
              <option value={3}>Liberar</option>
            </Select>
          </Field>
          <Field label="Servidor (ID)"><Input type="number" {...register('id_server')} /></Field>
        </div>
        <Field label="Jail"><Input {...register('jail')} placeholder="ex.: asterisk-iptables" /></Field>
        <Field label="Descrição"><Input {...register('description')} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
