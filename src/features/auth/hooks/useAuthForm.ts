import { useState, useEffect, useMemo } from 'react';
import { isValidEmail, hasContent } from '../../../lib/helpers/validation.helpers';
import { AuthFormData, FieldStatus } from '../types/auth.types';



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

      if (formData.password.length < 6) {
        newFieldStatus.password = {
          isValid: false,
          message: 'La contraseña debe tener al menos 6 caracteres'
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
    return Object.values(fieldStatus).every(field => field.isValid);
  }, [fieldStatus]);

  return {
    formData,
    fieldStatus,
    isBlurred,
    handleFieldChange,
    handleFieldBlur,
    isFormValid
  };
};
