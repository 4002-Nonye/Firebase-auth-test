/* eslint-disable react/prop-types */
import { useAuth } from '../../contexts/AuthContext';
import styles from './Button.module.css';
const Button = ({ children, type, styleHolder }) => {
  const { email, password } = useAuth();
  const isEmpty = !email || !password;
  return (
    <div className={styleHolder}>
      <button
        className={`${styles[type]} ${
          isEmpty ? styles.disable : styles.active
        }`}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
