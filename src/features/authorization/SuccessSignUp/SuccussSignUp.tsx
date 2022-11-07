import './SuccessSignUp.css';
import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';

const { Title, Text } = Typography;

export const SuccessSignUp = () => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  return (
    <section className="success-sign-up">
      <div className="success-sign-up__container">
        <div className="success-sign-up__logo" />
        <Title level={2}>Отправили вам письмо для подтверждения</Title>
        <Text>
          На электронную почту{' '}
          <span className="sign-up__secondary-text">{user.email}</span> отправили письмо
          для подтверждения. Перейдите по ссылке в письме и ваш кабинет будет активирован.
        </Text>
        <Button
          type="link"
          className="auth__secondary-text"
          onClick={() => navigate(routes.profile)}
        >
          Перейти в профиль
        </Button>
      </div>
    </section>
  );
};
