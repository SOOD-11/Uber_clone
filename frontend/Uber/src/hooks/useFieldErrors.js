import { useState } from 'react';

const useFieldErrors = () => {
  const [errors, setErrors] = useState([]);

  const handleErrorResponse = (error) => {
    const res = error.response?.data;

    if (Array.isArray(res?.errors) && res.errors.length > 0) {
      const formatted = res.errors.map((err) => ({
        field: err.path,
        message: err.msg,
      }));
      setErrors(formatted);
    } else if (res?.message) {
      setErrors([{ field: 'general', message: res.message }]);
    } else {
      setErrors([{ field: 'general', message: 'Something went wrong' }]);
    }
  };

  const clearFieldError = (fieldName) => {
    setErrors((prev) => prev.filter((err) => err.field !== fieldName));
  };

  const resetErrors = () => setErrors([]);

  return { errors, handleErrorResponse, clearFieldError, resetErrors };
};

export default useFieldErrors;