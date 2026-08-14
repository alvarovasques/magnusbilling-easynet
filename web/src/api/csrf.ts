// O bootstrap /site/index retorna JS (window.CSRF_TOKEN = "..."). Por causa do
// enableCookieValidation do Yii, ler o cookie direto traz lixo; o token limpo
// vem daqui. Executamos o JS num sandbox e lemos os globais.
export interface Bootstrap {
  csrfTokenName: string;
  csrfToken: string;
  lang: string;
  theme?: string;
  agentId?: number;
  agentTitle?: string;
}

let cache: Bootstrap | null = null;

export async function loadBootstrap(force = false): Promise<Bootstrap> {
  if (cache && !force) return cache;
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/site/index`, { credentials: 'include' });
  const js = await res.text();
  const w: any = {};
  try { new Function('window', js)(w); } catch { /* ignora erros de execução parcial */ }
  cache = {
    csrfTokenName: w.CSRF_TOKEN_NAME ?? 'YII_CSRF_TOKEN',
    csrfToken: w.CSRF_TOKEN ?? '',
    lang: w.lang ?? 'pt_BR',
    theme: w.theme,
    agentId: w.agentId,
    agentTitle: w.agentTitle,
  };
  return cache;
}

export function invalidateBootstrap() { cache = null; }
