import React, { useState, useEffect } from 'react';
import { NewPostulationFormProps, NewPostulationFormValues } from '../../../types';
import { newPostulationSchema } from '../domain/validation';
import NewPostulationFormUI from './NewPostulationForm.ui';
import { PostulationStatus } from '../../../types';

const defaultValues: NewPostulationFormValues = {
  company: '',
  position: '',
  status: 'applied',
  applicationDate: '',
  link: '',
  description: '',
  recruiterContact: '',
  sendCv: false,
  sendEmail: false,
};

const NewPostulationFormContainer: React.FC<NewPostulationFormProps> = ({ initialValues, onSubmit, loading, error }) => {
  const [values, setValues] = useState<NewPostulationFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewPostulationFormValues, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof NewPostulationFormValues, boolean>>>({});

  useEffect(() => {
    console.log('[NewPostulationFormContainer] Valores iniciales:', initialValues);
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`[handleChange] Cambio en el campo "${name}":`, value);
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log(`[handleCheckboxChange] Cambio en el checkbox "${name}":`, checked);
    setValues((prev) => ({ ...prev, [name]: checked }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleStatusChange = (status: PostulationStatus) => {
    console.log('[handleStatusChange] Cambio de estado:', status);
    setValues((prev) => ({ ...prev, status }));
    setTouched((prev) => ({ ...prev, status: true }));
  };

  const validate = () => {
    console.log('[validate] Validando valores:', values);
    const result = newPostulationSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NewPostulationFormValues, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof NewPostulationFormValues;
        fieldErrors[field] = err.message;
      });
      console.warn('[validate] Errores encontrados:', fieldErrors);
      setErrors(fieldErrors);
      return false;
    }
    console.log('[validate] Validación exitosa');
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[handleSubmit] Enviando formulario...');
    if (validate()) {
      console.log('[handleSubmit] Valores validados correctamente. Enviando a onSubmit:', values);
      onSubmit(values);
    } else {
      console.warn('[handleSubmit] El formulario no pasó la validación');
    }
  };

  const resetForm = () => {
    console.log('[resetForm] Reiniciando formulario');
    setValues(defaultValues);
    setErrors({});
    setTouched({});
  };

  return (
    <NewPostulationFormUI
      values={values}
      errors={errors}
      touched={touched}
      onChange={handleChange}
      onCheckboxChange={handleCheckboxChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      onReset={resetForm}
      onStatusChange={handleStatusChange}
    />
  );
};

export default NewPostulationFormContainer;
