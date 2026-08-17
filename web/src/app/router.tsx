import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { AppShell } from './layout/AppShell';
import { RequireAuth } from '@/auth/RequireAuth';
import { LoginPage } from '@/auth/LoginPage';

// Code-splitting: cada tela vira um chunk separado (named exports -> default).
const L = <T extends Record<string, any>>(f: () => Promise<T>, name: keyof T) =>
  lazy(() => f().then((m) => ({ default: m[name] })));

const DashboardPage = L(() => import('@/features/dashboard/DashboardPage'), 'DashboardPage');
const CallOnlinePage = L(() => import('@/features/callonline/CallOnlinePage'), 'CallOnlinePage');
const SipPage = L(() => import('@/features/sip/SipPage'), 'SipPage');
const DidsPage = L(() => import('@/features/dids/DidsPage'), 'DidsPage');
const TrunksPage = L(() => import('@/features/trunks/TrunksPage'), 'TrunksPage');
const ProvidersPage = L(() => import('@/features/providers/ProvidersPage'), 'ProvidersPage');
const PrefixesPage = L(() => import('@/features/prefixes/PrefixesPage'), 'PrefixesPage');
const PlansPage = L(() => import('@/features/plans/PlansPage'), 'PlansPage');
const OffersPage = L(() => import('@/features/offers/OffersPage'), 'OffersPage');
const SipurasPage = L(() => import('@/features/sipuras/SipurasPage'), 'SipurasPage');
const ProviderCNLPage = L(() => import('@/features/providerCNL/ProviderCNLPage'), 'ProviderCNLPage');
const UsersPage = L(() => import('@/features/users/UsersPage'), 'UsersPage');
const CalleridPage = L(() => import('@/features/callerid/CalleridPage'), 'CalleridPage');
const RestrictedPhonenumberPage = L(() => import('@/features/restrictedPhonenumber/RestrictedPhonenumberPage'), 'RestrictedPhonenumberPage');
const IaxPage = L(() => import('@/features/iax/IaxPage'), 'IaxPage');
const PhoneBookPage = L(() => import('@/features/phoneBook/PhoneBookPage'), 'PhoneBookPage');
const UserHistoryPage = L(() => import('@/features/userHistory/UserHistoryPage'), 'UserHistoryPage');
const RatesPage = L(() => import('@/features/rates/RatesPage'), 'RatesPage');
const CdrPage = L(() => import('@/features/cdr/CdrPage'), 'CdrPage');
const CampaignsPage = L(() => import('@/features/campaigns/CampaignsPage'), 'CampaignsPage');
const IvrPage = L(() => import('@/features/ivr/IvrPage'), 'IvrPage');
const CallShopPage = L(() => import('@/features/callshop/CallShopPage'), 'CallShopPage');
const CallShopCdrPage = L(() => import('@/features/callshopcdr/CallShopCdrPage'), 'CallShopCdrPage');
const RefillPage = L(() => import('@/features/refill/RefillPage'), 'RefillPage');
const VoucherPage = L(() => import('@/features/voucher/VoucherPage'), 'VoucherPage');
const MethodpayPage = L(() => import('@/features/methodpay/MethodpayPage'), 'MethodpayPage');
const ReportsPage = L(() => import('@/features/reports/ReportsPage'), 'ReportsPage');
const ConfigurationPage = L(() => import('@/features/configuration/ConfigurationPage'), 'ConfigurationPage');
const ServersPage = L(() => import('@/features/servers/ServersPage'), 'ServersPage');
const GroupUserPage = L(() => import('@/features/groupUser/GroupUserPage'), 'GroupUserPage');
const UserTypePage = L(() => import('@/features/userType/UserTypePage'), 'UserTypePage');
const LogUsersPage = L(() => import('@/features/logusers/LogUsersPage'), 'LogUsersPage');
const SipTracePage = L(() => import('@/features/siptrace/SipTracePage'), 'SipTracePage');
const BackupPage = L(() => import('@/features/backup/BackupPage'), 'BackupPage');
const SmtpPage = L(() => import('@/features/smtp/SmtpPage'), 'SmtpPage');
const TemplateMailPage = L(() => import('@/features/templateMail/TemplateMailPage'), 'TemplateMailPage');
const FirewallPage = L(() => import('@/features/firewall/FirewallPage'), 'FirewallPage');
const AlarmPage = L(() => import('@/features/alarm/AlarmPage'), 'AlarmPage');
const ApiKeysPage = L(() => import('@/features/apiKeys/ApiKeysPage'), 'ApiKeysPage');
const DemoDashboard = L(() => import('@/features/dashboard/DemoDashboard'), 'DemoDashboard');

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <RequireAuth><AppShell /></RequireAuth>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'chamadas', element: <CallOnlinePage /> },
      // Telefonia
      { path: 'sip', element: <SipPage /> },
      { path: 'dids', element: <DidsPage /> },
      { path: 'rotas', element: <TrunksPage /> },
      { path: 'ata-linksys', element: <SipurasPage /> },
      { path: 'cnl', element: <ProviderCNLPage /> },
      { path: 'provedores', element: <ProvidersPage /> },
      { path: 'prefixos', element: <PrefixesPage /> },
      // Comercial / Clientes
      { path: 'clientes', element: <UsersPage /> },
      { path: 'planos', element: <PlansPage /> },
      { path: 'ofertas', element: <OffersPage /> },
      { path: 'callerid', element: <CalleridPage /> },
      { path: 'bloqueios', element: <RestrictedPhonenumberPage /> },
      { path: 'iax', element: <IaxPage /> },
      { path: 'agenda', element: <PhoneBookPage /> },
      { path: 'historico', element: <UserHistoryPage /> },
      { path: 'tarifas', element: <RatesPage /> },
      { path: 'cdr', element: <CdrPage /> },
      // Torpedo de voz
      { path: 'campanhas', element: <CampaignsPage /> },
      { path: 'ura', element: <IvrPage /> },
      // CallShop
      { path: 'callshop', element: <CallShopPage /> },
      { path: 'callshop-cdr', element: <CallShopCdrPage /> },
      // Financeiro
      { path: 'financeiro', element: <RefillPage /> },
      { path: 'vouchers', element: <VoucherPage /> },
      { path: 'formas-pagamento', element: <MethodpayPage /> },
      { path: 'relatorios', element: <ReportsPage /> },
      // Sistema
      { path: 'config', element: <ConfigurationPage /> },
      { path: 'servidores', element: <ServersPage /> },
      { path: 'grupos', element: <GroupUserPage /> },
      { path: 'tipos-usuario', element: <UserTypePage /> },
      { path: 'logs', element: <LogUsersPage /> },
      { path: 'sip-trace', element: <SipTracePage /> },
      { path: 'backup', element: <BackupPage /> },
      { path: 'smtp', element: <SmtpPage /> },
      { path: 'templates-email', element: <TemplateMailPage /> },
      { path: 'firewall', element: <FirewallPage /> },
      { path: 'alarmes', element: <AlarmPage /> },
      { path: 'chaves-api', element: <ApiKeysPage /> },
    ],
  },
  { path: '/demo', element: <AppShell />, children: [{ index: true, element: <DemoDashboard /> }, { path: 'sip', element: <SipPage /> }] },
  { path: '*', element: <Navigate to="/" replace /> },
]);
