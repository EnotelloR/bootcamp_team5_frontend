import React, { FC } from 'react';
import { AuthContainer } from '../../features/authorization';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { routes } from '../../routes/routes';
import { Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PasswordRequest,
  useChangePasswordMutation,
} from '../../features/authorization/authorization.service';
import openNotificationWithIcon from '../../UI/notifications/notifications';

export const ChangePassword: FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [changePassword] = useChangePasswordMutation();

  const onFinish = (values: PasswordRequest) => {
    const { password } = values;
    try {
      changePassword({ password, token });
      openNotificationWithIcon(
        'success',
        'Восстановление пароля',
        'Пароль успешно изменен',
      );
      navigate(routes.signIn);
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
      title="Забыли пароль?"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      submitBtnText="Сменить пароль"
      outLink={{ text: 'Назад ко входу', link: routes.signIn }}
    >
      <Form.Item
        name="password"
        rules={[
          { required: true },
          { max: 20 },
          { min: 6 },
          () => ({
            validator(_, value) {
              if (/^[0-9a-zA-Z._*,@]+$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Разрешены только латинские буквы, цифры и символы: *,.@'),
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="*Пароль" className="auth__input" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Повторите пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="*Повторите пароль" className="auth__input" />
      </Form.Item>
    </AuthContainer>
  );
};
