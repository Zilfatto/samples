import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const NavBar = () => {
  const { Header } = Layout;
  return (
    <Header>
      <div className="container-fluid">
        <i className="fas fa-bolt"></i>
        <Menu mode="horizontal" defaultSelectedKeys={['search']}>
          <Menu.Item key="search">
            <NavLink className="nav-item nav-link" to="/">
              Поиск
            </NavLink>
          </Menu.Item>
          <Menu.Item key="favourite">
            <NavLink className="nav-item nav-link" to="/favourites">
              Избранное
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout">
            <NavLink className="nav-item nav-link" to="/logout">
              Выйти
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
}

export default NavBar;