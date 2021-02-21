import { useState } from "react";

const useErrorHandler = (initialState: string | null) => {
  const [error, setError] = useState(initialState);
  const showError = (errorMessage: string | null) => {
    setError(errorMessage);
    window.setTimeout(() => {
      setError(null);
    }, 3000);
  };
  return { error, showError };
};

export default useErrorHandler;