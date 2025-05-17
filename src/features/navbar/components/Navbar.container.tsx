import React from "react";
import Navbar from "./Navbar.ui";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, User } from "lucide-react";
import { useAuthStore } from "../../../store/auth/authStore";

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="w-5 h-5" />,
    href: "/",
  },
  {
    id: "profile",
    label: "Perfil",
    icon: <User className="w-5 h-5" />,
    href: "/profile",
  },
];

const NavbarContainer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Determina el navItem activo según la ruta
  const activeItem = navItems.find(item => location.pathname.startsWith(item.href))?.id || "home";

  const handleNavClick = (id: string) => {
    const item = navItems.find(i => i.id === id);
    if (item) navigate(item.href);
  };

  const handleSearch = () => {
    // Aquí puedes abrir un modal de búsqueda o navegar a una página de búsqueda
    alert("Buscar (implementa tu lógica)");
  };

  const handleNotifications = () => {
    // Aquí puedes abrir un panel de notificaciones
    alert("Notificaciones (implementa tu lógica)");
  };

  if (!user) return null;

  return (
    <Navbar
      navItems={navItems}
      activeItem={activeItem}
      onNavClick={handleNavClick}
      user={{
        name: user.name,
        email: user.email,
        avatar: '', // No hay avatar, se usa fallback
      }}
      onSearch={handleSearch}
      onNotifications={handleNotifications}
    />
  );
};

export default NavbarContainer;
