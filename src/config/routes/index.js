import Dashboard from 'pages/main/Dashboard';
import Login from 'pages/auth/Login';
import Finance from 'pages/finance/FinanceOverview';
import FinanceDetail from 'pages/finance/FinanceDetail';
import Performance from 'pages/performance/PerformanceOverview';
import PerformanceDetail from 'pages/performance/PerformanceDetail';

const publicRoutes = [
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: 'performance',
    Component: Performance,
  },
  {
    path: 'performance/:id',
    Component: PerformanceDetail,
  },
  {
    path: 'finance',
    Component: Finance,
  },
  {
    path: 'finance/:id',
    Component: FinanceDetail,
  },
];

const authRoutes = [
  {
    path: 'login',
    Component: Login,
  },
];

export { publicRoutes, authRoutes };
