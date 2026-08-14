import { LayoutDashboard, PhoneCall, Network, Hash, ListTree, Route, Users, Tag, FileText, Wallet, Settings,
  PhoneOutgoing, ShieldBan, Waypoints, History, BookUser, Megaphone, Voicemail, Store, ReceiptText,
  Server, ShieldCheck, IdCard, Ticket, CreditCard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
export interface NavItem { to: string; label: string; icon: LucideIcon; }
export interface NavGroup { title?: string; items: NavItem[]; }

export const NAV: NavGroup[] = [
  { items: [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/chamadas', label: 'Chamadas ativas', icon: PhoneCall },
  ]},
  { title: 'Telefonia', items: [
    { to: '/sip', label: 'Troncos / Contas SIP', icon: Network },
    { to: '/dids', label: 'Numeração / DIDs', icon: Hash },
    { to: '/rotas', label: 'Rotas / Troncos', icon: Route },
  ]},
  { title: 'Comercial', items: [
    { to: '/clientes', label: 'Clientes', icon: Users },
    { to: '/callerid', label: 'CallerID', icon: PhoneOutgoing },
    { to: '/bloqueios', label: 'Números bloqueados', icon: ShieldBan },
    { to: '/iax', label: 'Contas IAX', icon: Waypoints },
    { to: '/agenda', label: 'Agenda', icon: BookUser },
    { to: '/historico', label: 'Histórico do cliente', icon: History },
    { to: '/tarifas', label: 'Tarifas', icon: Tag },
    { to: '/cdr', label: 'Bilhetes / CDR', icon: ListTree },
  ]},
  { title: 'Torpedo de voz', items: [
    { to: '/campanhas', label: 'Campanhas', icon: Megaphone },
    { to: '/ura', label: 'URA / IVR', icon: Voicemail },
  ]},
  { title: 'CallShop', items: [
    { to: '/callshop', label: 'Cabines', icon: Store },
    { to: '/callshop-cdr', label: 'Bilhetes CallShop', icon: ReceiptText },
  ]},
  { title: 'Financeiro', items: [
    { to: '/financeiro', label: 'Recargas', icon: Wallet },
    { to: '/vouchers', label: 'Vouchers', icon: Ticket },
    { to: '/formas-pagamento', label: 'Formas de pagamento', icon: CreditCard },
    { to: '/relatorios', label: 'Relatórios', icon: FileText },
  ]},
  { title: 'Sistema', items: [
    { to: '/config', label: 'Configurações', icon: Settings },
    { to: '/servidores', label: 'Servidores', icon: Server },
    { to: '/grupos', label: 'Grupos de usuário', icon: ShieldCheck },
    { to: '/tipos-usuario', label: 'Tipos de usuário', icon: IdCard },
  ]},
];
