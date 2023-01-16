import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { url } from '../Data/Url';

export const useSubAdminSignUp = () => {
  const [errors, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const adminCreate = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${url}/api/admin/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('admin', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'CREATESUBADMIN', payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { adminCreate, isLoading, errors };
};
