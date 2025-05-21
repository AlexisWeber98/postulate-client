import React, { useState } from 'react';
import { NewPostulationFormProps, NewPostulationFormValues } from '../../../types';
import { newPostulationSchema } from '../domain/validation';
import NewPostulationFormUI from './NewPostulationForm.ui';

const defaultValues: NewPostulationFormValues = {
  company: '',
  position: '',
  status: 'applied',
  date: '',
  referenceUrl: '',
  notes: '',
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

  const validate = () => {
    const result = newPostulationSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NewPostulationFormValues, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof NewPostulationFormValues;
        fieldErrors[field] = err.message;
      });
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
    />
  );
};

export default NewPostulationFormContainer;
