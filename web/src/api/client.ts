import { loadBootstrap, invalidateBootstrap } from './csrf';

const BASE = import.meta.env.VITE_API_BASE;

export class ApiError extends Error {
  constructor(public status: number, msg: string, public payload?: unknown) { super(msg); }
}

type Query = Record<string, string | number | undefined | null>;

function qs(params: Query): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null) p.set(k, String(v));
  const s = p.toString();
  return s ? `?${s}` : '';
}

// O Yii não devolve 401: sinaliza sessão morta com texto "Access denied...".
function guardSession(text: string) {
  if (text.startsWith('Access denied')) { invalidateBootstrap(); throw new ApiError(401, 'session_expired'); }
}

function parse<T>(text: string): T {
  try { return JSON.parse(text) as T; }
  catch { throw new ApiError(0, 'resposta não-JSON do backend', text); }
}

export async function apiGet<T>(path: string, params: Query = {}): Promise<T> {
  const res = await fetch(`${BASE}/${path}${qs(params)}`, { credentials: 'include' });
  const text = await res.text();
  guardSession(text);
  return parse<T>(text);
}

// POST form-urlencoded + CSRF no corpo (contrato Yii). Objetos viram JSON string.
export async function apiPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const bs = await loadBootstrap();
  const form = new URLSearchParams();
  for (const [k, v] of Object.entries(body)) {
    if (v === undefined || v === null) continue;
    form.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
  }
  form.set(bs.csrfTokenName, bs.csrfToken);
  const res = await fetch(`${BASE}/${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });
  const text = await res.text();
  guardSession(text);
  return parse<T>(text);
}
