import { ClipLoader } from 'react-spinners';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';
import AppNav from '../../components/AppNav/AppNav';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import { useState } from 'react';
import InputBar from '../../components/InputBar/InputBar';

const Login = () => {
  const {
    handleLogin,
    email,
    password,
    isLoading,
    handleEmailInput,
    handlePasswordInput,
    error,
  } = useAuth();

  const [showError, setShowError] = useState(false); // to control hiding the error message

  const handleError = () => {
    setShowError(true);
    const timer = setTimeout(() => {
      setShowError(false);
    }, 2000);

    // Cleanup func: clear the timer if component unmounts
    return () => clearTimeout(timer);
  };
  ////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    handleError();
  };
  ////////////////////////////////////////////////

  return (
    <main className={styles.loginContainer}>
      <AppNav />

      {showError && error && !isLoading ? (
        <Message message={error} className={styles.errMsg} />
      ) : (
        ''
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          {' '}
          <label htmlFor="email">Email address</label>
          <InputBar
            str="email"
            value={email}
            placeholder="email"
            func={(e) => handleEmailInput(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          {' '}
          <label htmlFor="password">Password</label>
          <InputBar
            str="password"
            placeholder="password"
            value={password}
            func={(e) => handlePasswordInput(e.target.value)}
          />
        </div>

        <Button type="submit" styleHolder={styles.btnContainer}>
          {isLoading ? <ClipLoader color="#fff" size={15} /> : 'Login'}
        </Button>
      </form>
    </main>
  );
};

export default Login;
