import React from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="content">
      <h2 className="title">404</h2>
      <div className="box">
        <p className="text">
          Извините, но вы ввели неправильный адрес или попытались попасть на страницу
          которой не существует
        </p>
        <Button type="link" onClick={goBack}>
          {' '}
          Назад
        </Button>
        <Link className="" to={'/'}>
          На главную
        </Link>
      </div>
    </div>
  );
};
