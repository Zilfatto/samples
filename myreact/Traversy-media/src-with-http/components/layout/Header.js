import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>
      <Link style={linkStyle} to="/">
        Home
      </Link>{' '}
      |{' '}
      <Link style={linkStyle} to="/about">
        About
      </Link>
    </header>
  );
}

const headerStyle = {
  backgroundColor: '#cccc00',
  color: '#000',
  textAlign: 'center',
  padding: '10px'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '5px',
  borderRadius: '10px',
  backgroundColor: '#777',
  borderBottom: '2px solid #000'
};

export default Header;
