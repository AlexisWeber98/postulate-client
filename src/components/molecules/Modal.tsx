import React, { useEffect, useRef, useCallback, useState } from 'react';
// import { X } from 'lucide-react'; // Ya no se usa
// import type { ModalProps } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [contentId] = useState(() => `modal-content-${Math.random().toString(36).substr(2, 9)}`);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  }, [onClose]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    // Trap focus inside the modal
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleTabKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay con blur global y oscurecimiento */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md transition-all" />
      {/* Contenido del modal centrado, sin fondo blanco ni bordes propios */}
      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-md mx-auto overflow-visible transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-describedby={contentId}
      >
        {/* El título y el botón de cerrar se delegan al contenido (StyledModalContainer) */}
        <div id={contentId} className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
