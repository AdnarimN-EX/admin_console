import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGINADMIN':
      return {
        admin: action.payload,
      };
    case 'LOGINSUB':
      return {
        subAdmin: action.payload,
      };
    case 'LOGOUT':
      return {
        admin: null,
        subAdmin: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    admin: null,
    subAdmin: null,
  });

  //Pang check kung may user na naka-login(useEffect)
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    const subAdmin = JSON.parse(localStorage.getItem('subAdmin'));

    if (admin) {
      dispatch({ type: 'LOGINADMIN', payload: admin });
    }
    if (subAdmin) {
      dispatch({ type: 'LOGINSUB', payload: subAdmin });
    }
  }, []);
  console.log('Auth state', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
