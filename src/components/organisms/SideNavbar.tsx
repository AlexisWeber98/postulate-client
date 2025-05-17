import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface SideNavbarProps {
  sections: Section[];
}

const SideNavbar: React.FC<SideNavbarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closestSection = sections[0];
      let minDistance = Infinity;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionCenter = offsetTop + offsetHeight / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }
      setActiveSection(closestSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed right-20 top-0 bottom-0 z-50 w-12 h-screen flex flex-col justify-center"
    >
      <div className="flex flex-col gap-10 items-end w-full">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center shadow-[0_4px_24px_rgba(80,112,255,0.45),0_2px_8px_rgba(0,0,0,0.18)] ${
                activeSection === section.id
                  ? ''
                  : ''
              }`}
              style={{
                background: activeSection === section.id
                  ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                  : 'rgba(191, 219, 254, 0.6)',
                border: activeSection === section.id ? '2px solid #3B82F6' : '2px solid transparent',
              }}
            />
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default SideNavbar;

