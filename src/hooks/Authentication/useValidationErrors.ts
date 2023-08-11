import { useState } from "react";

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
