/// <reference types="jest" />
import { renderHook, act } from '@testing-library/react';
import { useApplicationForm } from '../useApplicationForm';
import { usePostulationsStore } from '../../store';
import { PostulationStatus } from '../../types/interface/postulations/postulation';
import { useParams } from 'react-router-dom';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}));

// Mock del store
jest.mock('../../store', () => ({
  usePostulationsStore: jest.fn(),
}));

describe('useApplicationForm', () => {
  const mockAddPostulation = jest.fn();
  const mockUpdatePostulation = jest.fn();
  const mockCheckDuplicate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePostulationsStore as unknown as jest.Mock).mockReturnValue({
      addPostulation: mockAddPostulation,
      updatePostulation: mockUpdatePostulation,
      checkDuplicate: mockCheckDuplicate,
    });
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
  });

  it('debería crear una nueva postulación correctamente', async () => {
    const { result } = renderHook(() => useApplicationForm());

    // Configurar el estado del formulario
    act(() => {
      result.current.handleFieldChange('company', 'Empresa Test');
      result.current.handleFieldChange('position', 'Desarrollador');
      result.current.setStatus('applied' as PostulationStatus);
      result.current.setDate('2024-03-20');
    });

    // Simular envío del formulario
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
        nativeEvent: new Event('submit'),
        currentTarget: document.createElement('form'),
        target: document.createElement('form'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'submit',
      } as unknown as React.FormEvent);
    });

    // Verificar que se llamó a addPostulation con los datos correctos
    expect(mockAddPostulation).toHaveBeenCalledWith({
      company: 'Empresa Test',
      position: 'Desarrollador',
      status: 'applied',
      date: '2024-03-20',
      url: '',
      notes: '',
      recruiterContact: '',
      sentCV: true,
      sentEmail: true,
    });

    // Verificar que se navegó a la página principal
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('debería actualizar una postulación existente correctamente', async () => {
    // Mock de useParams para simular edición
    (useParams as jest.Mock).mockReturnValue({ id: '123' });

    const { result } = renderHook(() => useApplicationForm());

    // Configurar el estado del formulario
    act(() => {
      result.current.handleFieldChange('company', 'Empresa Actualizada');
      result.current.handleFieldChange('position', 'Desarrollador Senior');
      result.current.setStatus('interview' as PostulationStatus);
      result.current.setDate('2024-03-21');
    });

    // Simular envío del formulario
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
        nativeEvent: new Event('submit'),
        currentTarget: document.createElement('form'),
        target: document.createElement('form'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'submit',
      } as unknown as React.FormEvent);
    });

    // Verificar que se llamó a updatePostulation con los datos correctos
    expect(mockUpdatePostulation).toHaveBeenCalledWith('123', {
      company: 'Empresa Actualizada',
      position: 'Desarrollador Senior',
      status: 'interview',
      date: '2024-03-21',
      url: '',
      notes: '',
      recruiterContact: '',
      sentCV: true,
      sentEmail: true,
    });

    // Verificar que se navegó a la página principal
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('debería mostrar el modal de duplicado cuando se intenta crear una postulación duplicada', async () => {
    mockCheckDuplicate.mockReturnValue(true);

    const { result } = renderHook(() => useApplicationForm());

    // Configurar el estado del formulario
    act(() => {
      result.current.handleFieldChange('company', 'Empresa Duplicada');
      result.current.handleFieldChange('position', 'Puesto Duplicado');
      result.current.setStatus('applied' as PostulationStatus);
      result.current.setDate('2024-03-20');
    });

    // Simular envío del formulario
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
        nativeEvent: new Event('submit'),
        currentTarget: document.createElement('form'),
        target: document.createElement('form'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'submit',
      } as unknown as React.FormEvent);
    });

    // Verificar que no se llamó a addPostulation
    expect(mockAddPostulation).not.toHaveBeenCalled();

    // Verificar que se muestra el modal de duplicado
    expect(result.current.showDuplicateModal).toBe(true);
  });

  it('debería validar los campos requeridos', async () => {
    const { result } = renderHook(() => useApplicationForm());

    // Simular envío del formulario sin datos
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
        nativeEvent: new Event('submit'),
        currentTarget: document.createElement('form'),
        target: document.createElement('form'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'submit',
      } as unknown as React.FormEvent);
    });

    // Verificar que no se llamó a addPostulation
    expect(mockAddPostulation).not.toHaveBeenCalled();

    // Verificar que hay errores de validación
    expect(result.current.errors).toHaveProperty('company');
    expect(result.current.errors).toHaveProperty('position');
  });

  it('debería resetear el formulario correctamente', () => {
    const { result } = renderHook(() => useApplicationForm());

    // Configurar el estado del formulario
    act(() => {
      result.current.handleFieldChange('company', 'Empresa Test');
      result.current.handleFieldChange('position', 'Desarrollador');
      result.current.setStatus('interview' as PostulationStatus);
    });

    // Resetear el formulario
    act(() => {
      result.current.resetForm();
    });

    // Verificar que los campos se resetean
    expect(result.current.formData.company).toBe('');
    expect(result.current.formData.position).toBe('');
    expect(result.current.formData.status).toBe('applied');
  });
});
