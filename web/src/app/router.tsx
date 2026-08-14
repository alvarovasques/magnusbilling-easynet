import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './layout/AppShell';
import { RequireAuth } from '@/auth/RequireAuth';
import { LoginPage } from '@/auth/LoginPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { SipPage } from '@/features/sip/SipPage';
import { UsersPage } from '@/features/users/UsersPage';
import { RefillPage } from '@/features/refill/RefillPage';
import { CallOnlinePage } from '@/features/callonline/CallOnlinePage';
import { TrunksPage } from '@/features/trunks/TrunksPage';
import { DidsPage } from '@/features/dids/DidsPage';
import { RatesPage } from '@/features/rates/RatesPage';
import { CdrPage } from '@/features/cdr/CdrPage';
// Relatórios
import { ReportsPage } from '@/features/reports/ReportsPage';
// Clientes (cauda)
import { CalleridPage } from '@/features/callerid/CalleridPage';
import { RestrictedPhonenumberPage } from '@/features/restrictedPhonenumber/RestrictedPhonenumberPage';
import { IaxPage } from '@/features/iax/IaxPage';
import { UserHistoryPage } from '@/features/userHistory/UserHistoryPage';
import { PhoneBookPage } from '@/features/phoneBook/PhoneBookPage';
// Campanhas / CallShop
import { CampaignsPage } from '@/features/campaigns/CampaignsPage';
import { IvrPage } from '@/features/ivr/IvrPage';
import { CallShopPage } from '@/features/callshop/CallShopPage';
import { CallShopCdrPage } from '@/features/callshopcdr/CallShopCdrPage';
// Configurações / Financeiro (cauda)
import { ConfigurationPage } from '@/features/configuration/ConfigurationPage';
import { ServersPage } from '@/features/servers/ServersPage';
import { GroupUserPage } from '@/features/groupUser/GroupUserPage';
import { UserTypePage } from '@/features/userType/UserTypePage';
import { VoucherPage } from '@/features/voucher/VoucherPage';
import { MethodpayPage } from '@/features/methodpay/MethodpayPage';
import { AppShell as DemoShell } from './layout/AppShell';
import { DemoDashboard } from '@/features/dashboard/DemoDashboard';

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
      // Comercial / Clientes
      { path: 'clientes', element: <UsersPage /> },
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
    ],
  },
  { path: '/demo', element: <DemoShell />, children: [{ index: true, element: <DemoDashboard /> }, { path: 'sip', element: <SipPage /> }] },
  { path: '*', element: <Navigate to="/" replace /> },
]);
