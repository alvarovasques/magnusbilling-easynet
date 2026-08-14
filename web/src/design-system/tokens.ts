/**
 * Easynet Telefônica — Design Tokens
 * Painel admin de telecom. React + TS. Portáveis (Tailwind / MUI / shadcn).
 *
 * Fonte de verdade: /tmp/easynet_design.html (bloco :root, linhas 4-12).
 * Valores validados no mockup para contraste AA sobre branco/superfícies.
 *
 * Convenção:
 *  - `brand.sky` é DECORATIVO (logo, mesh, avatar, acento do item ativo). Nunca
 *    usar como cor de ação/texto sobre branco — não passa AA.
 *  - `primary` (#176FA6) é a cor de AÇÃO (botões, links) — AA-safe sobre branco.
 *  - Pares `*.strong` + `*.bg` são calibrados para texto AA dentro de badges.
 */

// ─────────────────────────────────────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────────────────────────────────────
export const colors = {
  // Marca (decorativo — não usar para texto/ação sobre branco)
  brand: {
    sky: '#54A8D8',      // logo, mesh, avatar, acento do item ativo na sidebar
    skyEmph: '#2E8FC9',  // foco de input (ring), realce decorativo mais forte
  },

  // Ação — AA-safe sobre branco. Botões primários, links, ícones interativos.
  primary: {
    DEFAULT: '#176FA6',
    hover: '#125781',    // btn:hover (brief pede #125A87; mockup usa #125781)
    active: '#0F4A6E',   // pressed
  },

  // Superfícies escuras — sidebar e topbar do app-shell / painel do login
  navy: {
    DEFAULT: '#00243C',  // sidebar, gradient do login (from)
    800: '#0A3A57',      // hover de item da sidebar; gradient do login (to)
    700: '#12587F',      // fundo do item ATIVO da sidebar
  },

  // Texto sobre fundo escuro (navy)
  onDark: {
    DEFAULT: '#E8F1F8',
    muted: '#9FB4C4',    // rótulos de grupo, texto secundário na sidebar
  },

  // Superfícies e fundos claros
  bg: '#F4F9FD',         // fundo do app
  surface: '#FFFFFF',    // cards, painéis, inputs, linhas de tabela
  surfaceAlt: '#EEF4F9', // zebra de tabela, <th>, campo de busca da topbar
  border: '#D7E3ED',     // bordas padrão (cards, tabela, divisores)
  borderStrong: '#B7C9D8', // borda de input, botão secundário

  // Texto sobre fundo claro
  text: {
    DEFAULT: '#0E2233',  // texto principal (brief) — corpo/títulos
    secondary: '#5A7183',// rótulos, texto de apoio (brief: #5B7180)
    muted: '#8798A6',    // placeholders, legendas, texto desabilitado
  },

  // Semânticas — cada uma com base (ícone/preenchimento), strong (texto AA em
  // superfície clara / badge) e bg (fundo suave do badge/alert).
  success: { DEFAULT: '#1F9D57', strong: '#15803D', bg: '#E6F6EC' },
  warning: { DEFAULT: '#F2A31C', strong: '#8A5A00', bg: '#FEF3E0' },
  danger:  { DEFAULT: '#E23B3B', strong: '#C22A2A', bg: '#FCEAEA' },
  info:    { DEFAULT: '#2E8FC9', strong: '#176FA6', bg: '#E3F1FB' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING — escala base 4px (derivada dos paddings do mockup: 4/8/12/16/18/20)
// ─────────────────────────────────────────────────────────────────────────────
export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// RADIUS
// ─────────────────────────────────────────────────────────────────────────────
export const radius = {
  sm: '6px',    // inputs, botão secundário, campo de busca
  DEFAULT: '8px', // cards, botões, painéis, tabela
  lg: '16px',   // container do login
  pill: '999px', // badges, tags
  full: '50%',  // avatar
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SHADOW
// ─────────────────────────────────────────────────────────────────────────────
export const shadow = {
  sm: '0 1px 2px rgba(0,36,60,.06)',   // cards, KPI, painéis, shell
  md: '0 4px 16px rgba(0,36,60,.10)',  // login, modal, dropdowns/popovers
  focus: '0 0 0 3px rgba(46,143,201,.35)', // ring de foco (brand.skyEmph @35%)
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY — Inter
// ─────────────────────────────────────────────────────────────────────────────
export const fontFamily = {
  sans: '"Inter","Segoe UI",Roboto,-apple-system,system-ui,Arial,sans-serif',
  mono: 'ui-monospace,SFMono-Regular,Menlo,monospace', // valores/códigos
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,   // valores de KPI
} as const;

/** Escala tipográfica: [fontSize, { lineHeight, fontWeight? }] */
export const fontSize = {
  '2xs': ['11px', { lineHeight: '1.4' }],  // badge, <th>, hash de swatch, grupo sidebar
  xs:    ['12px', { lineHeight: '1.4' }],  // rótulos, tag, legendas, KPI label
  sm:    ['13px', { lineHeight: '1.5' }],  // corpo de tabela, links de sidebar, botões
  base:  ['14px', { lineHeight: '1.5' }],  // corpo padrão, inputs
  md:    ['15px', { lineHeight: '1.4' }],  // título de painel (h3), marca da sidebar
  lg:    ['20px', { lineHeight: '1.3' }],  // título de seção
  xl:    ['22px', { lineHeight: '1.3' }],  // h1 do login
  '2xl': ['28px', { lineHeight: '1.2', fontWeight: '700' }], // valor de KPI
} as const;

export const letterSpacing = {
  normal: '0',
  wide: '.06em',   // rótulos de grupo da sidebar (uppercase)
  wider: '.08em',  // tag / eyebrow (uppercase)
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT — dimensões estruturais do app-shell (do mockup)
// ─────────────────────────────────────────────────────────────────────────────
export const layout = {
  sidebarWidth: '210px',     // mockup: .shell grid-template-columns 210px
  sidebarWidthLg: '240px',   // sugerido para produção (mais respiro nos rótulos)
  topbarHeight: '52px',
  contentMaxWidth: '1180px', // .wrap do mockup
  inputHeight: '38px',
  buttonHeightLg: '40px',    // botão principal (login/CTA)
  buttonHeightMd: '34px',    // botão padrão de UI
  breakpointCollapse: '820px', // colapsa login/kpis/shell no mockup
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Z-INDEX
// ─────────────────────────────────────────────────────────────────────────────
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,   // topbar sticky
  sidebar: 1030,  // sidebar off-canvas (mobile)
  overlay: 1040,  // backdrop do modal / drawer
  modal: 1050,
  toast: 1080,
} as const;

export const tokens = {
  colors,
  spacing,
  radius,
  shadow,
  fontFamily,
  fontWeight,
  fontSize,
  letterSpacing,
  layout,
  zIndex,
} as const;

export type Tokens = typeof tokens;
export default tokens;
