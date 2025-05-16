import React from 'react';


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-white/30 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-sm text-black dark:text-gray -300">
              © {currentYear} Postulate - Gestor de Postulaciones Laborales
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
