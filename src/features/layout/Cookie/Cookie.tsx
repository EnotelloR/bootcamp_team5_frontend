import { Button } from 'antd';
import React, { FC } from 'react';
import './Cookie.css';

export const Cookie: FC = () => {
  return (
    <section className="cookie">
      <div className="cookie__container">
        <p className="cookie__text">
          Нам тоже нужны печеньки! Они пригодятся, чтобы сделать вашу работу с сервисом
          удобнее :)
        </p>
        <Button>ну, ладно</Button>
      </div>
    </section>
  );
};
