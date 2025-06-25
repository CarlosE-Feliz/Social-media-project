import { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  const { isAuthenticated, loading } = auth;
  if (loading) return <div>Cargando...</div>; // O un spinner

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
