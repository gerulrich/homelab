import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '@app/components/layout/full/shared/Loadable';
import AuthGuard from '@app/components/guards/AuthGuard';
import GuestGuard from '@app/components/guards/GuestGaurd';
import { Websocket } from '@app/services/Websocket';
import ProtectedRoute from './ProtectedRoute';


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

const ListChannels = Loadable(lazy(() => import('@app/views/television/ListChannels')));
const EditChannel = Loadable(lazy(() => import('@app/views/television/EditChannel')));
const AddChannel = Loadable(lazy(() => import('@app/views/television/AddChannel')));
const ListPrograms = Loadable(lazy(() => import('@app/views/television/ListPrograms')));
const ViewProgram = Loadable(lazy(() => import('@app/views/television/ViewProgram')));

const ViewChannels = Loadable(lazy(() => import('@app/views/television/ViewChannels')));
const ViewChannel = Loadable(lazy(() => import('@app/views/television/ViewChannel')));

const ViewPodmanContainers = Loadable(lazy(() => import('@app/views/containers/ViewPodmanContainers')));

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
        { path: '/investments/assets/new', element: 
            <ProtectedRoute I="create" a="Asset">
              <AddAsset /> 
            </ProtectedRoute>
        },
        { path: '/investments/assets/:assetId', element: 
            <ProtectedRoute I="edit" a="Asset">
              <EditAsset /> 
            </ProtectedRoute>
        },
        { path: '/investments/transactions', element: <ListTransactions /> },
        { path: '/investments/transactions/new', element: <AddTransaction /> },
        { path: '/investments/transactions/:transactionId', element: <EditTransaction /> },
        { path: '/settings/users', element: 
            <ProtectedRoute I="manage" a="User">
              <ListUsers />
            </ProtectedRoute>
        },
        { path: '/settings/users/:userId', element: 
            <ProtectedRoute I="edit" a="User">
              <EditUser /> 
            </ProtectedRoute>
        },
        { path: '/settings/users/new', element: 
            <ProtectedRoute I="create" a="User">
              <AddUser /> 
            </ProtectedRoute>
        },
        { path: '/settings/channels', element:
            <ProtectedRoute I="manage" a="Channel">
              <ListChannels />
            </ProtectedRoute>
        },
        { path: '/settings/channels/new', element: 
          <ProtectedRoute I="create" a="Channel">
            <AddChannel />
          </ProtectedRoute>
        },
        { path: '/settings/channels/:channelId', element: 
            <ProtectedRoute I="edit" a="Channel">
              <EditChannel />
            </ProtectedRoute>
        },
        { path: '/settings/programs', element: <ListPrograms /> },
        { path: '/settings/programs/:programId', element: <ViewProgram /> },

        { path: '/tv/channels', element: <ViewChannels /> },
        { path: '/tv/channel/:channelId', element: <ViewChannel /> },

        { path: '/containers/podman', element: <ViewPodmanContainers /> },

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