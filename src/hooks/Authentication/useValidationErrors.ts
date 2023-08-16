import { useState } from "react";

/**
 * Custom hook to show validation error.
 * @param initailValue - default value
 */
const useValidationError = <Type>(initailValue: Type) => {
  const [validationError, setValidationError] = useState<Type>(initailValue);

  const addValidationError = (validations: Type) => {
    setValidationError(validations);
  };

  return {
    validationError,
    addValidationError,
  };
};

export default useValidationError;
