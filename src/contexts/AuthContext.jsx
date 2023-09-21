/* eslint-disable react/prop-types */
import { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const initialState = {
  email: '',
  password: '',
  isLoading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'email/input':
      return { ...state, email: action.payload };

    case 'password/input':
      return { ...state, password: action.payload };

    case 'user/loggedin':
      return { ...state, isLoading: false };

    case 'user/loggedout':
      return { ...initialState };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
};

const AuthProvider = ({ children }) => {
  const [{ email, password, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////////////////////////

  // handle email change
  const handleEmailInput = (value) => {
    dispatch({ type: 'email/input', payload: value });
  };

  ////////////////////////////////////////////////////////////////////////

  // handle input change
  const handlePasswordInput = (value) => {
    dispatch({ type: 'password/input', payload: value });
  };

  ///////////////////////////////////////////////////////////////////////////////////

  // handle user sign in
  const handleLogin = async () => {
    dispatch({ type: 'loading' });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        dispatch({ type: 'user/loggedin' });
        navigate('/gallery');
      }
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: `Error logging in: ${err.message}`,
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  // handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth).then(() => {
        dispatch({ type: 'user/loggedout' });
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        email,
        password,
        isLoading,
        handleEmailInput,
        handlePasswordInput,
        handleSignOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('Cannot use Auth context outside the Auth provider ');
  return context;
};
export { AuthProvider, useAuth };
