import { Button } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../../routes/routes';
import './NotEntered.css';

const NotEntered: FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end' }}>
      <Button
        type="link"
        className="header__secondary-button"
        onClick={() => navigate(routes.signIn)}
      >
        войти
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        className="header__primary-button"
        onClick={() => navigate(routes.signUp)}
      >
        Регистрация
      </Button>
    </div>
  );
};

export default NotEntered;
