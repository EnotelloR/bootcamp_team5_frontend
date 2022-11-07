import React from 'react';
import './SuccessEmailSended.css';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';

const { Title, Text } = Typography;

interface Iprops {
  email?: string | null;
}

export const SuccessEmailSended = ({ email }: Iprops) => {
  const navigate = useNavigate();
  return (
    <section className="success-email">
      <div className="success-email__container">
        <div className="success-email__logo" />
        <Title level={2}>Отправили вам письмо для смены пароля</Title>
        <Text>
          На электронную почту <span className="email__secondary-text">{email}</span>{' '}
          отправили письмо для смены пароля. Перейдите по ссылке в письме, и сможете
          установить новый пароль.
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
