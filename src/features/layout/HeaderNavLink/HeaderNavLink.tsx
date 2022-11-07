import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderNavLink.css';

interface Iprops {
  route: string;
  text: string;
}

export const HeaderNavLink = ({ route, text }: Iprops) => {
  const navigate = useNavigate();

  return (
    <li
      className="header__nav-link"
      onClick={() => navigate(route)}
      onKeyDown={() => navigate(route)}
    >
      <span className="header__nav-link-text">{text}</span>
    </li>
  );
};
