import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';

import { routes } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useApiHooks } from '../../hooks/ApiHooks';
import {
  AuthInfoModal,
  noInternetErrText,
  AuthContainer,
} from '../../features/authorization';
import { Ierror } from '../../services/types/authTypes';
import ErrorHandler from '../../utils/ErrorHandler';

export const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { loggerUser } = useApiHooks();
  const navigate = useNavigate();

  const onRememberChange = (e: { target: { checked: boolean } }) => {
    setRememberMe(e.target.checked);
  };

  const onFinish = (values: Store) => {
    if (!navigator.onLine) {
      showErrorModal(noInternetErrText);
      return;
    }
    loggerUser(values)
      .then(() => navigate(routes.main))
      .catch((err) => {
        err.json().then((error: Ierror) => {
          console.log(error);
          showErrorModal(ErrorHandler.handleError(error));
        });
      });
  };

  const showErrorModal = (errorText: string) => {
    setIsError(true);
    setInfoModalIsOpen(true);
    setErrorText(errorText);
    setTimeout(() => {
      setIsError(false);
      setInfoModalIsOpen(false);
      setErrorText('');
    }, 3000);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthContainer
      title="Вход"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      submitBtnText="Войти"
      outLink={{ text: 'Регистрация', link: routes.signUp }}
      modals={
        <AuthInfoModal isOpen={infoModalIsOpen} isError={isError} errorText={errorText} />
      }
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: 'Email - обязательное поле. ' },
          { max: 40 },
          { type: 'email', message: 'Введите email. ' },
        ]}
      >
        <Input placeholder="*Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { max: 20 },
          { min: 6 },
          { required: true, message: 'Пароль - обязательное поле. ' },
        ]}
      >
        <Input.Password placeholder="*Пароль" />
      </Form.Item>

      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button
              type="link"
              className="auth__secondary-text"
              onClick={() => navigate(routes.forgotPass)}
            >
              Забыли пароль?
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox checked={rememberMe} onChange={onRememberChange}>
          Запомнить
        </Checkbox>
      </Form.Item>
    </AuthContainer>
  );
};
