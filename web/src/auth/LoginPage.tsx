import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Button } from '@/design-system/components/Button';
import { Input } from '@/design-system/components/Input';
import logoWhite from '@/assets/easynet-logo-white.png';

export function LoginPage() {
  const { signIn, verify2fa, needs2fa } = useAuth();
  const nav = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      if (needs2fa) {
        const r2 = await verify2fa(code);
        if (r2.ok) nav('/', { replace: true }); else setErr(r2.msg ?? 'Código inválido');
      } else {
        const r = await signIn(user, pass);
        if (r.ok) nav('/', { replace: true });
        else if (!r.needs2fa) setErr(r.msg ?? 'Falha no login');
      }
    } catch { setErr('Não consegui falar com o servidor. Confira o proxy /api.'); }
    finally { setBusy(false); }
  }

  return (
    <div className="grid h-full md:grid-cols-2">
      {/* Painel esquerdo navy (marca) */}
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-navy-800 to-navy p-12 text-ondark md:flex">
        <img src={logoWhite} alt="Easynet Telefônica" className="w-64 max-w-full" />
        <div className="space-y-3 text-sm text-ondark-muted">
          <p className="text-base text-ondark">Plataforma de telefonia e billing.</p>
          <p>Troncos SIP, DIDs, tarifação e CDR em um só lugar.</p>
        </div>
        <div className="text-xs text-ondark-muted">© Easynet · SCM + STFC</div>
      </div>
      {/* Card de login */}
      <div className="grid place-items-center bg-app p-6">
        <form onSubmit={onSubmit} className="w-full max-w-sm rounded-lg bg-surface p-8 shadow-md">
          <h1 className="mb-1 text-xl font-semibold text-ink">Entrar</h1>
          <p className="mb-6 text-sm text-ink-secondary">Acesse o painel Easynet Telefônica.</p>
          <label className="mb-1 block text-xs font-medium text-ink-secondary">Usuário</label>
          <Input value={user} onChange={(e) => setUser(e.target.value)} autoFocus autoComplete="username" />
          <label className="mb-1 mt-4 block text-xs font-medium text-ink-secondary">Senha</label>
          <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" />
          {needs2fa && (
            <>
              <label className="mb-1 mt-4 block text-xs font-medium text-ink-secondary">Código de autenticação (2FA)</label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" autoFocus placeholder="000000" />
            </>
          )}
          {err && <p className="mt-3 rounded-sm bg-danger-bg px-3 py-2 text-xs text-danger-strong">{err}</p>}
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={busy}>
            {busy ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
