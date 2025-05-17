export interface NavbarProps {
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
  }>;
  activeItem: string;
  onNavClick: (id: string) => void;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onSearch: () => void;
  onNotifications: () => void;
}
