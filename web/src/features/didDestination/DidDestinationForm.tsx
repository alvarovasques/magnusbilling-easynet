import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { DidDestination, didDestinationResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions, useOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  id_user: z.coerce.number().min(1, 'Selecione o cliente'),
  id_did: z.coerce.number().min(1, 'Selecione o DID'),
  tipo: z.enum(['sip', 'ivr', 'queue', 'externo']),
  id_sip: z.coerce.number().optional(),
  id_ivr: z.coerce.number().optional(),
  id_queue: z.coerce.number().optional(),
  destination: z.string().optional(),
  activated: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

function tipoInicial(d?: DidDestination | null): FormData['tipo'] {
  if (!d) return 'sip';
  if (d.id_sip) return 'sip';
  if (d.id_ivr) return 'ivr';
  if (d.id_queue) return 'queue';
  return 'externo';
}

export function DidDestinationForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: DidDestination | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const dids = useOptions('did', 'did');
  const sips = useOptions('sip', 'name');
  const ivrs = useOptions('ivr', 'name');
  const queues = useOptions('queue', 'name');
  const save = useSave<DidDestination>(didDestinationResource);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const tipo = watch('tipo');

  useEffect(() => {
    reset(initial
      ? { ...initial, tipo: tipoInicial(initial), activated: initial.activated ?? 1 } as FormData
      : { tipo: 'sip', activated: 1 } as FormData);
  }, [initial, open, reset]);

  const onSubmit = handleSubmit(async (d) => {
    // envia só o destino escolhido; zera os outros para o backend
    const payload: Partial<DidDestination> = {
      id: d.id, id_user: d.id_user, id_did: d.id_did, activated: d.activated ?? 1,
      id_sip: d.tipo === 'sip' ? d.id_sip : null,
      id_ivr: d.tipo === 'ivr' ? d.id_ivr : null,
      id_queue: d.tipo === 'queue' ? d.id_queue : null,
      destination: d.tipo === 'externo' ? (d.destination ?? '') : '',
    };
    await save.mutateAsync(payload);
    onSaved(); onClose();
  });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar destino do DID' : 'Novo destino do DID'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue=""><option value="" disabled>{users.isLoading ? 'Carregando…' : 'Selecione'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select>
        </Field>
        <Field label="DID (número de entrada)" error={errors.id_did?.message}>
          <Select {...register('id_did')} defaultValue=""><option value="" disabled>{dids.isLoading ? 'Carregando…' : 'Selecione o DID'}</option>
            {dids.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select>
        </Field>
        <Field label="Tipo de destino">
          <Select {...register('tipo')}>
            <option value="sip">Conta SIP (ramal)</option>
            <option value="ivr">URA / IVR</option>
            <option value="queue">Fila</option>
            <option value="externo">Número externo</option>
          </Select>
        </Field>
        {tipo === 'sip' && <Field label="Conta SIP"><Select {...register('id_sip')} defaultValue=""><option value="">Selecione</option>{sips.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select></Field>}
        {tipo === 'ivr' && <Field label="URA / IVR"><Select {...register('id_ivr')} defaultValue=""><option value="">Selecione</option>{ivrs.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select></Field>}
        {tipo === 'queue' && <Field label="Fila"><Select {...register('id_queue')} defaultValue=""><option value="">Selecione</option>{queues.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select></Field>}
        {tipo === 'externo' && <Field label="Número externo (para onde encaminhar)"><Input {...register('destination')} placeholder="ex.: 5565999999999" /></Field>}
        <Field label="Ativo"><Select {...register('activated')}><option value={1}>Sim</option><option value={0}>Não</option></Select></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
