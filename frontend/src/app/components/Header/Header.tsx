import React from 'react';
import styles from '@/app/components/Header/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Content Feed</h1>
    </header>
  );
};

export default Header;
