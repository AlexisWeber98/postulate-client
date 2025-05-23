import { useState, useEffect, useMemo } from 'react';
import { isValidEmail, hasContent } from '../../../lib/helpers/validation.helpers';
import { AuthFormData, FieldStatus } from '../types/auth.types';
import { useLanguageStore } from '../../../store';

// Constantes para validación de contraseña
const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  HAS_UPPERCASE: /[A-Z]/,
  HAS_LOWERCASE: /[a-z]/,
  HAS_NUMBER: /[0-9]/,
  HAS_SPECIAL_CHAR: /[^A-Za-z0-9]/
} as const;

export const useAuthForm = (type: 'login' | 'register') => {
  const { translate } = useLanguageStore();
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
          message: translate('auth.validation.email')
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
          message: translate('auth.validation.password')
        };
      } else {
        newFieldStatus.password = { isValid: true };
      }

      if (type === 'register') {
        if (!formData.name || !hasContent(formData.name)) {
          newFieldStatus.name = {
            isValid: false,
            message: translate('auth.validation.name')
          };
        } else {
          newFieldStatus.name = { isValid: true };
        }

        if (!formData.userName || !hasContent(formData.userName)) {
          newFieldStatus.userName = {
            isValid: false,
            message: translate('auth.validation.userName')
          };
        } else {
          newFieldStatus.userName = { isValid: true };
        }

        if (!formData.lastName || !hasContent(formData.lastName)) {
          newFieldStatus.lastName = {
            isValid: false,
            message: translate('auth.validation.lastName')
          };
        } else {
          newFieldStatus.lastName = { isValid: true };
        }
      }

      setFieldStatus(newFieldStatus);
    };

    validateFields();
  }, [formData, type, translate]);

  const handleFieldChange = (name: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldBlur = (name: string) => {
    setIsBlurred(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid = useMemo(() => {
    const requiredFields = type === 'login'
      ? ['email', 'password']
      : ['email', 'password', 'name', 'userName', 'lastName'];

    return requiredFields.every(field =>
      fieldStatus[field]?.isValid
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
