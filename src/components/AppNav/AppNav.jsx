import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import styles from './AppNav.module.css';

function AppNav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <Logo />
        </Link>

        <div>
          <ul className={styles.linkContainer}>
            <li className={styles.login}>
              <NavLink to="/login">Log in</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default AppNav;
