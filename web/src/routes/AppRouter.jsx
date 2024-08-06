import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '@app/components/layout/full/shared/Loadable';
import AuthGuard from '@app/components/guards/AuthGuard';
import GuestGuard from '@app/components/guards/GuestGaurd';
import { Websocket } from '@app/services/Websocket';


const FullLayout = Loadable(lazy(() => import('@app/components/layout/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('@app/components/layout/blank/BlankLayout')));

const LoginPage = Loadable(lazy(() => import('@app/views/auth/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('@app/views/auth/RegisterPage')));
const ForgotPasswordPage = Loadable(lazy(() => import('@app/views/auth/ForgotPasswordPage')));

const ListAssets = Loadable(lazy(() => import('@app/views/investments/ListAssets')));
const AddAsset = Loadable(lazy(() => import('@app/views/investments/AddAsset')));
const EditAsset = Loadable(lazy(() => import('@app/views/investments/EditAsset')));
const ListTransactions = Loadable(lazy(() => import('@app/views/investments/ListTransactions')));
const AddTransaction = Loadable(lazy(() => import('@app/views/investments/AddTransaction')));
const EditTransaction = Loadable(lazy(() => import('@app/views/investments/EditTransaction')));

const ListUsers = Loadable(lazy(() => import('@app/views/users/ListUsers')));
const EditUser = Loadable(lazy(() => import('@app/views/users/EditUser')));
const AddUser = Loadable(lazy(() => import('@app/views/users/AddUser')));

const Home = Loadable(lazy(() => import('@app/views/Home')));
const Page = Loadable(lazy(() => import('@app/views/Page')));

export const AppRouter = [
    {
      path: '/',
      element: (
        <AuthGuard>
          <Websocket>
            <FullLayout />
          </Websocket>
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/page', element: <Page /> },
        { path: '/investments/assets', element: <ListAssets /> },
        { path: '/investments/assets/new', element: <AddAsset /> },
        { path: '/investments/assets/:assetId', element: <EditAsset /> },
        { path: '/investments/transactions', element: <ListTransactions /> },
        { path: '/investments/transactions/new', element: <AddTransaction /> },
        { path: '/investments/transactions/:transactionId', element: <EditTransaction /> },
        { path: '/settings/users', element: <ListUsers /> },
        { path: '/settings/users/:userId', element: <EditUser /> },
        { path: '/settings/users/new', element: <AddUser /> },

        { path: '*', element: <Navigate to="/" /> },
      ],
    },
    {
      path: '/auth',
      element: (
        <GuestGuard>
          <BlankLayout />
        </GuestGuard>
      ),
      children: [
        // { path: '404', element: <Error /> },
        { path: '/auth/login', element: <LoginPage /> },
        { path: '/auth/register', element: <RegisterPage /> },
        { path: '/auth/reset-password', element: <ForgotPasswordPage /> },
        { path: '/auth', element: <Navigate to="/auth/login" /> },
        { path: '*', element: <Navigate to="/auth/login" /> },
      ],
    }    
  ];

  export default AppRouter;