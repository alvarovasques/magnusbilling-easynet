import { apiGet, apiPost } from '@/api/client';
import { sha1Hex } from '@/lib/sha1';

export interface SessionUser {
  id: number; name: string; username: string; isAdmin: boolean; isAgent: boolean;
  isClient: boolean; credit: number; currency?: string; decimal?: number;
  menu?: unknown; language?: string; version?: string;
}
export interface LoginResult {
  success: boolean | string; msg?: string; checkGoogleAuthenticator?: boolean;
}

export async function login(user: string, plainPassword: string): Promise<LoginResult> {
  const password = await sha1Hex(plainPassword);
  return apiPost<LoginResult>('authentication/login', { user, password });
}

export async function submit2fa(oneCode: string): Promise<LoginResult> {
  return apiPost<LoginResult>('authentication/googleAuthenticator', { oneCode });
}

// Estado completo da sessão (menu, papel, saldo). success = logged (bool).
export async function checkSession(): Promise<SessionUser | null> {
  const r = await apiGet<any>('authentication/check');
  if (!r || r.success === false || r.success === 0) return null;
  return {
    id: Number(r.id), name: r.name ?? r.username ?? '', username: r.username ?? '',
    isAdmin: !!r.isAdmin, isAgent: !!r.isAgent, isClient: !!r.isClient,
    credit: Number(r.credit ?? 0), currency: r.currency, decimal: Number(r.decimal ?? 4),
    menu: r.menu, language: r.language, version: r.version,
  };
}

export async function logoff(): Promise<void> {
  try { await apiGet('authentication/logoff'); } catch { /* ignore */ }
}
