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
  sentCV: false,
  sentEmail: false,
};

const NewPostulationFormContainer: React.FC<NewPostulationFormProps> = ({ initialValues, onSubmit, loading, error }) => {
  const [values, setValues] = useState<NewPostulationFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewPostulationFormValues, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof NewPostulationFormValues, boolean>>>({});



  // Efecto para revalidar en tiempo real cuando values cambie y haya campos tocados
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validate();
    }
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setValues((prev) => ({ ...prev, [name]: checked }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleStatusChange = (status: PostulationStatus) => {

    setValues((prev) => ({ ...prev, status }));
    setTouched((prev) => ({ ...prev, status: true }));
  };

  const validate = () => {

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

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {

      onSubmit(values);
    } else {
      // Validation failed, errors are already set by validate()
    }
  };

  const resetForm = () => {

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
