import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &.primary {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  }

  &.secondary {
    background-color: #2ecc71;
    color: white;

    &:hover {
      background-color: #27ae60;
    }
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">书迷交流平台</Logo>
        <NavLinks>
          <Button className="primary" to="/login">登录</Button>
          <Button className="secondary" to="/register">注册</Button>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;