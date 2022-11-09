import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BulbOutlined } from '@ant-design/icons';

import './HeaderNavLink.css';

interface Iprops {
  route: string;
  text: string;
  additional?: number;
}

export const HeaderNavLink = ({ route, text, additional }: Iprops) => {
  const navigate = useNavigate();

  return (
    <li
      className="header__nav-link"
      onClick={() => navigate(route)}
      onKeyDown={() => navigate(route)}
    >
      <span className="header__nav-link-text">{text} </span>
      {!!additional && (
        <span className="header__nav-link-text_notification">
          <BulbOutlined />
          {additional}
        </span>
      )}
    </li>
  );
};
