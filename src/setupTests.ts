import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Definir variables de entorno de Vite para Jest
process.env.VITE_API_URL = process.env.VITE_API_URL || 'http://localhost:3000';
process.env.VITE_API_KEY = process.env.VITE_API_KEY || 'test-key';
