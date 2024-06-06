import React from 'react';
import Navigation from './Navigation';
import '../src/styles/Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Eventii Management</h1>
      <Navigation />
    </header>
  );
}

export default Header;