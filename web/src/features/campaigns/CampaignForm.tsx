import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Campaign, campaignResource } from './api';
import { useSave } from '@/api/hooks';
import { useUserOptions } from '@/api/options';
import { Drawer } from '@/design-system/components/Drawer';
import { Field } from '@/design-system/components/Field';
import { Input } from '@/design-system/components/Input';
import { Select } from '@/design-system/components/Select';
import { Button } from '@/design-system/components/Button';

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Informe o nome da campanha'),
  id_user: z.coerce.number({ invalid_type_error: 'Selecione o cliente' }).min(1, 'Selecione o cliente'),
  type: z.coerce.number().optional(),
  callerid: z.string().optional(),
  audio: z.string().optional(),
  description: z.string().optional(),
  whatsapp_template_name: z.string().optional(),
  whatsapp_template_language: z.string().optional(),
  frequency: z.coerce.number().optional(),
  max_frequency: z.coerce.number().optional(),
  startingdate: z.string().optional(),
  expirationdate: z.string().optional(),
  daily_start_time: z.string().optional(),
  daily_stop_time: z.string().optional(),
  status: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export function CampaignForm({ open, initial, onClose, onSaved }:
  { open: boolean; initial?: Campaign | null; onClose: () => void; onSaved: () => void }) {
  const users = useUserOptions();
  const save = useSave<Campaign>(campaignResource);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const isWhatsapp = Number(watch('type')) === 2;
  useEffect(() => {
    reset(initial ? { ...initial } as FormData
      : { type: 1, status: 0, frequency: 10, max_frequency: 10, daily_start_time: '08:00:00', daily_stop_time: '18:00:00' } as FormData);
  }, [initial, open, reset]);
  const onSubmit = handleSubmit(async (d) => { await save.mutateAsync(d as Partial<Campaign>); onSaved(); onClose(); });

  return (
    <Drawer open={open} title={initial?.id ? 'Editar campanha' : 'Nova campanha'} onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={save.isPending}>{save.isPending ? 'Salvando…' : 'Salvar'}</Button></>}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome da campanha" error={errors.name?.message}><Input {...register('name')} /></Field>
        <Field label="Cliente" error={errors.id_user?.message}>
          <Select {...register('id_user')} defaultValue="">
            <option value="">{users.isLoading ? 'Carregando…' : '— selecione —'}</option>
            {users.data?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo"><Select {...register('type')}><option value={1}>Torpedo de voz</option><option value={0}>SMS</option><option value={2}>WhatsApp</option></Select></Field>
          <Field label="Situação"><Select {...register('status')}><option value={0}>Pausada</option><option value={1}>Ativa</option></Select></Field>
        </div>
        {isWhatsapp && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Template do WhatsApp" error={errors.whatsapp_template_name?.message}>
              <Input {...register('whatsapp_template_name')} placeholder="ex.: hello_world" />
            </Field>
            <Field label="Idioma do template">
              <Input {...register('whatsapp_template_language')} placeholder="ex.: pt_BR" />
            </Field>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bina (CallerID)"><Input {...register('callerid')} /></Field>
          <Field label="Áudio / IVR"><Input {...register('audio')} placeholder="arquivo ou id do IVR" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Freq. (chamadas simult.)"><Input type="number" {...register('frequency')} /></Field>
          <Field label="Freq. máxima"><Input type="number" {...register('max_frequency')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Início do agendamento"><Input type="datetime-local" {...register('startingdate')} /></Field>
          <Field label="Expiração"><Input type="datetime-local" {...register('expirationdate')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Início diário"><Input type="time" step="1" {...register('daily_start_time')} /></Field>
          <Field label="Fim diário"><Input type="time" step="1" {...register('daily_stop_time')} /></Field>
        </div>
        <Field label="Descrição / texto"><Input {...register('description')} /></Field>
        {save.isError && <p className="rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{(save.error as Error).message}</p>}
      </form>
    </Drawer>
  );
}
