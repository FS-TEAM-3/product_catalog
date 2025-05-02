import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { LoadingOverlay } from './components/organisms/LoadingOverlay';

export const PrivateRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingOverlay isLoading />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
