import classNames from "classnames";
import Button from "../../../components/atoms/Button";
import Avatar from "../../../components/atoms/Avatar";
import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import type { NavbarProps } from "../../../interfaces/components/organisms/NavbarProps.interface";

export const Navbar = ({
  navItems,
  activeItem,
  onNavClick,
  user,
  onSearch,
  onNotifications,
}: NavbarProps) => (
  <header className="w-full bg-gradient-to-tr from-blue-400 to-blue-700 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between mb-6">
    {/* Logo */}
    <Link to="/" className="flex items-center gap-2">
      <span className="font-bold text-white text-xl">elixir</span>
      <span className="font-light text-white text-xl">factory</span>
    </Link>

    {/* Navegación */}
    <nav className="flex gap-2">
      {navItems.map((item: typeof navItems[0]) => (
        <Link
          key={item.id}
          to={item.href}
          onClick={() => onNavClick(item.id)}
          className={classNames(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
            activeItem === item.id
              ? "bg-violet-600 text-white shadow"
              : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          {item.icon}
          <span className="hidden md:inline">{item.label}</span>
        </Link>
      ))}
    </nav>

    {/* Acciones y usuario */}
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/20"
        onClick={onSearch}
      >
        <Search className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/20"
        onClick={onNotifications}
      >
        <Bell className="w-5 h-5" />
      </Button>
      <div className="flex items-center bg-white/20 rounded-full px-3 py-1 ml-2 gap-2 shadow">
        <Avatar
          src={user.avatar}
          alt={user.name}
          fallback={user.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        />
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm leading-tight">
            {user.name}
          </span>
          <span className="text-white/80 text-xs">{user.email}</span>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
