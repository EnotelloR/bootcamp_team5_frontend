import React, { ReactNode } from 'react';
import './AuthContainer.css';
import logo from '../../../image/auth_logo.png';
import { routes } from '../../../routes/routes';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { PasswordRequest } from '../authorization.service';

const validateMessages = {
  required: 'Поле обязательное. ',
  string: {
    min: 'Минимальное количество символов: ${min}. ',
    max: 'Максимальное количество символов: ${max}. ',
  },
};

export const noInternetErrText = `Отсутствует подключение к интернету.
    Проверьте соединение и попробуйте повторить попытку позднее.`;

interface AuthContainerProps {
  title: string;
  onFinish: (values: PasswordRequest) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  submitBtnText: string;
  outLink: {
    link: string;
    text: string;
  };
  children: ReactNode;
  modals?: ReactNode;
}

export const AuthContainer = ({
  onFinish,
  onFinishFailed,
  submitBtnText,
  outLink,
  children,
  title,
  modals,
}: AuthContainerProps) => {
  const navigate = useNavigate();

  return (
    <section className="auth">
      {modals}
      <div className="auth__container">
        <img
          src={logo}
          alt={'логотип'}
          className="auth__logo"
          onClick={() => navigate(routes.main)}
          onKeyDown={() => navigate(routes.main)}
        />
        <h3 className="auth__title">{title}</h3>
        <Form
          className="auth__form"
          name="basic"
          size="middle"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          {children}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="auth__submit-btn">
              {submitBtnText}
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          className="auth__secondary-text"
          onClick={() => navigate(outLink.link)}
        >
          {outLink.text}
        </Button>
      </div>
    </section>
  );
};
