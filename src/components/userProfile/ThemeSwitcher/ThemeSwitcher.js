import React, { useState } from 'react';
import './ThemeSwitcher.scss';
import { changeTheme } from '../../../utils/utilsFunctions';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('dark');
  return (
    <button
      className="themeSwitcher"
      onClick={() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
        changeTheme(theme);
      }}>
      <div className={`themeSwitcher__icon-${theme}`}></div>
    </button>
  );
};

export default ThemeSwitcher;
