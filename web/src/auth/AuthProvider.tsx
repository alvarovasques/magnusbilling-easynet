import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { loadBootstrap, invalidateBootstrap } from '@/api/csrf';
import { checkSession, login as apiLogin, logoff as apiLogoff, submit2fa as apiSubmit2fa, SessionUser } from './api';

interface AuthCtx {
  user: SessionUser | null;
  loading: boolean;
  needs2fa: boolean;
  signIn: (u: string, p: string) => Promise<{ ok: boolean; needs2fa?: boolean; msg?: string }>;
  verify2fa: (code: string) => Promise<{ ok: boolean; msg?: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}
const Ctx = createContext<AuthCtx>(null!);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needs2fa, setNeeds2fa] = useState(false);

  const refresh = useCallback(async () => {
    try { await loadBootstrap(); setUser(await checkSession()); }
    catch { setUser(null); }
  }, []);

  useEffect(() => { (async () => { await refresh(); setLoading(false); })(); }, [refresh]);

  const signIn: AuthCtx['signIn'] = async (u, p) => {
    const r = await apiLogin(u, p);
    if (r.checkGoogleAuthenticator) { setNeeds2fa(true); return { ok: false, needs2fa: true }; }
    if (r.success) { await refresh(); return { ok: true }; }
    return { ok: false, msg: r.msg ?? 'Usuário ou senha inválidos' };
  };

  const verify2fa: AuthCtx['verify2fa'] = async (code) => {
    const r = await apiSubmit2fa(code);
    if (r.success) { setNeeds2fa(false); await refresh(); return { ok: true }; }
    return { ok: false, msg: r.msg ?? 'Código inválido' };
  };

  const signOut = async () => { await apiLogoff(); invalidateBootstrap(); setUser(null); };

  return <Ctx.Provider value={{ user, loading, needs2fa, signIn, verify2fa, signOut, refresh }}>{children}</Ctx.Provider>;
}
