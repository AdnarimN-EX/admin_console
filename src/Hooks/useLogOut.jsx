import { useAuthContext } from './useAuthContext';

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    //
    localStorage.removeItem('admin');
    //
    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};
