import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { url } from '../Data/Url';

export const useAdminLogin = () => {
  const [errors, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const adminLogin = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${url}/api/admin/login`, {
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
      dispatch({ type: 'LOGINADMIN', payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { adminLogin, isLoading, errors };
};
