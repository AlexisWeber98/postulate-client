import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostulationsPage from "./features/postulations/pages/PostulationsPage.tsx";
import RegisterPage from "./features/auth/pages/RegisterPage.tsx";
import LoginPage from "./features/auth/pages/LoginPage.tsx";
import HomePage from "./features/home/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {localStorage.id ? (
          <Route path="/postulations" element={<PostulationsPage />} />
        ) : null}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
