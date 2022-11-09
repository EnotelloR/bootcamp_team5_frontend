import React, { FC } from 'react';
import { AuthContainer } from '../../features/authorization';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { routes } from '../../routes/routes';
import { Form, Input } from 'antd';
import {
  PasswordRequest,
  useForgotPasswordMutation,
} from '../../features/authorization/authorization.service';
import openNotificationWithIcon from '../../UI/notifications/notifications';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const [ForgotPassword] = useForgotPasswordMutation();

  const onFinish = (values: PasswordRequest) => {
    try {
      ForgotPassword(values);
      openNotificationWithIcon(
        'success',
        'Восстановление пароля',
        'На указанный адрес направлено сообщение с инструкциями',
      );
      navigate(routes.main);
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        'error',
        'Восстановление пароля',
        'Упс, что-то пошло не так',
      );
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log(errorInfo);
  };

  return (
    <AuthContainer
      title="Смена пароля"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      submitBtnText="Сменить пароль на новый"
      outLink={{ text: 'Назад ко входу', link: routes.signIn }}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true },
          { type: 'email', message: 'Введите email. ' },
          { max: 40 },
          () => ({
            validator(_, value) {
              if (/^[0-9a-zA-Z._\-ʼ+@]+$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Разрешены только латинские буквы, цифры и символы: ._-ʼ+@'),
              );
            },
          }),
        ]}
      >
        <Input placeholder="*Email" className="auth__input" />
      </Form.Item>
    </AuthContainer>
  );
};
