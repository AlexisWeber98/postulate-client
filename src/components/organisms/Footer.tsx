import React from 'react';
import { APP_COLORS } from '../../styles/colors';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: APP_COLORS.lightGray }} className="py-6 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              © {currentYear} Postulate - Gestor de Postulaciones Laborales
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
