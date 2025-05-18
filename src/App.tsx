import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Layout from './components/templates/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import { useAuthStore } from './store';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthStore();

  // Mostrar un indicador de carga solo si realmente estamos cargando
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Redirigir si no hay usuario
  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { user, initialize } = useAuthStore();

  // Inicializar el store de autenticación al cargar la app
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Log the authentication state for debugging
  useEffect(() => {
    console.log('Auth state:', { user });
  }, [user]);

  return (
      <Router>
        <Routes>
          <Route path="/landing" element={user ? <Navigate to="/" replace /> : <Landing />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<ApplicationForm />} />
            <Route path="edit/:id" element={<ApplicationForm />} />
            <Route path="profile" element={<EditProfile />} />
          </Route>
          <Route path="*" element={<Navigate to={user ? "/" : "/landing"} replace />} />
        </Routes>
      </Router>
  );
}

export default App;
