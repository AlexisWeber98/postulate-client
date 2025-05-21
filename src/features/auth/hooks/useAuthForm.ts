import { useState, useEffect, useMemo } from 'react';
import { isValidEmail, hasContent } from '../../../lib/helpers/validation.helpers';
import { AuthFormData, FieldStatus } from '../types/auth.types';

// Constantes para validación de contraseña
const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  HAS_UPPERCASE: /[A-Z]/,
  HAS_LOWERCASE: /[a-z]/,
  HAS_NUMBER: /[0-9]/,
  HAS_SPECIAL_CHAR: /[^A-Za-z0-9]/
};

export const useAuthForm = (type: 'login' | 'register') => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
   ...(type === 'register' && {
     name: '',
     userName: '',
     lastName: ''
   })
  });

  const [fieldStatus, setFieldStatus] = useState<Record<string, FieldStatus>>({});
  const [isBlurred, setIsBlurred] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const validateFields = () => {
      const newFieldStatus: Record<string, FieldStatus> = {};

      if (!isValidEmail(formData.email)) {
        newFieldStatus.email = {
          isValid: false,
          message: 'El email no es válido'
        };
      } else {
        newFieldStatus.email = { isValid: true };
      }

      if (formData.password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH ||
          !PASSWORD_REQUIREMENTS.HAS_UPPERCASE.test(formData.password) ||
          !PASSWORD_REQUIREMENTS.HAS_LOWERCASE.test(formData.password) ||
          !PASSWORD_REQUIREMENTS.HAS_NUMBER.test(formData.password) ||
          !PASSWORD_REQUIREMENTS.HAS_SPECIAL_CHAR.test(formData.password)) {
        newFieldStatus.password = {
          isValid: false,
          message: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales'
        };
      } else {
        newFieldStatus.password = { isValid: true };
      }

      if (type === 'register') {
        if (!formData.name || !hasContent(formData.name)) {
          newFieldStatus.name = {
            isValid: false,
            message: 'El nombre es obligatorio'
          };
        } else {
          newFieldStatus.name = { isValid: true };
        }

        if (!formData.userName || !hasContent(formData.userName)) {
          newFieldStatus.userName = {
            isValid: false,
            message: 'El nombre de usuario es obligatorio'
          };
        } else {
          newFieldStatus.userName = { isValid: true };
        }

        if (!formData.lastName || !hasContent(formData.lastName)) {
          newFieldStatus.lastName = {
            isValid: false,
            message: 'El apellido es obligatorio'
          };
        } else {
          newFieldStatus.lastName = { isValid: true };
        }
      }

      setFieldStatus(newFieldStatus);
    };

    validateFields();
  }, [formData, type]);

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldBlur = (name: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid = useMemo(() => {
    // Obtener campos requeridos según el tipo de formulario
    const requiredFields = type === 'login'
      ? ['email', 'password']
      : ['email', 'password', 'name', 'userName', 'lastName'];

    // Verificar si todos los campos requeridos tienen un estado válido
    return requiredFields.every(field =>
      fieldStatus[field] && fieldStatus[field].isValid
    );
  }, [fieldStatus, type]);

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      ...(type === 'register' && {
        name: '',
        userName: '',
        lastName: ''
      })
    });
    setFieldStatus({});
    setIsBlurred({});
  };

  return {
    formData,
    fieldStatus,
    isBlurred,
    handleFieldChange,
    handleFieldBlur,
    isFormValid,
    resetForm
  };
};
