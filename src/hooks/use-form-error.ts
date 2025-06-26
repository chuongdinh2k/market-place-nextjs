import { useState } from "react";

interface FormError {
  field?: string;
  message: string;
}

export function useFormError() {
  const [errors, setErrors] = useState<FormError[]>([]);

  const addError = (message: string, field?: string) => {
    setErrors((prev) => [...prev, { message, field }]);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  const hasError = (field?: string) => {
    if (field) {
      return errors.some((error) => error.field === field);
    }
    return errors.length > 0;
  };

  const getFieldError = (field: string) => {
    return errors.find((error) => error.field === field)?.message;
  };

  const getGeneralErrors = () => {
    return errors.filter((error) => !error.field);
  };

  return {
    errors,
    addError,
    clearErrors,
    clearFieldError,
    hasError,
    getFieldError,
    getGeneralErrors,
  };
}
