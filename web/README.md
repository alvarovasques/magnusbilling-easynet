# Easynet Telefônica — Web (novo frontend)

Frontend React + TypeScript que consome a API existente do MagnusBilling (o core
de telefonia/billing continua o mesmo). Fase 1: login, dashboard e Contas SIP.

## Rodar em dev
```bash
npm install
npm run dev
```
Abre em http://localhost:5173. O Vite faz proxy de `/api` para o backend
(`https://mb.di4e.com.br`) — mesmo domínio do ponto de vista do browser, então o
cookie de sessão e o CSRF funcionam. Se o domínio resolve para IP privado só na
rede interna, rode o dev nessa rede (ou aponte `VITE_BACKEND` no `.env.development`
para o backend acessível).

- `/login` — autenticação real (senha em SHA1 + CSRF, como o backend espera).
- `/` — dashboard (KPIs de `statusSystem/read`), Contas SIP (`sip/read` em AG Grid).
- `/demo` — **prévia de design** com dados de exemplo (não precisa de backend):
  mostra o app-shell (sidebar navy + KPIs + status de troncos). Use para ver o visual.

## Stack
Vite · React Router · TanStack Query · AG Grid Community (grids densos) ·
Tailwind (tokens Easynet) · react-hook-form + zod · lucide-react.

## Estrutura
- `src/api/` — cliente tipado do backend Yii (CSRF via `/site/index`, `read/save/destroy`,
  filtros estilo ExtJS, adapter AG Grid).
- `src/auth/` — sessão + login (SHA1/CSRF), guard de rota.
- `src/design-system/` — tokens Easynet + componentes (Button, Input, Badge, KpiCard, DataGrid).
- `src/app/layout/` — AppShell, Sidebar (navy), Topbar.
- `src/features/` — dashboard, sip (padrão a replicar nas demais telas).

## Build de produção
```bash
npm run build   # gera dist/ (servir atrás do Traefik em / ; API em /api via StripPrefix)
```

## Próximas telas (Fase 1/2)
Usuários (+Recarga) → Recargas → Chamadas Online (fast-follow) → Rotas/Troncos →
Tarifas → DIDs (inventário) → CDR (+export Anatel). O padrão já está provado em Contas SIP.
