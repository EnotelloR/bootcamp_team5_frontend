import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { routes } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import Api from '../../utils/Api';
import { signUpRulesText } from '../../utils/signUpRulesText';
import { useApiHooks } from '../../hooks/ApiHooks';
import { Ierror } from '../../services/types/authTypes';
import ErrorHandler from '../../utils/ErrorHandler';
import {
  AuthContainer,
  AuthInfoModal,
  noInternetErrText,
} from '../../features/authorization';

export const SignUp = () => {
  const navigate = useNavigate();
  const [rulesIsOpen, setRulesIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { loggerUser } = useApiHooks();

  const onFinish = (values: Store) => {
    if (!navigator.onLine) {
      showErrorModal(noInternetErrText);
      return;
    }
    const { email, password, role_name } = values;

    Api.createUser({ email, password, role_name })
      .then(() => {
        handleSuccessReg();
        loggerUser({ username: email, password, remember: true }).catch((err) => {
          err.json().then((error: Ierror) => {
            showErrorModal(ErrorHandler.handleError(error));
          });
        });
      })
      .catch((err) => {
        err
          .json()
          .then((error: Ierror) => {
            showErrorModal(ErrorHandler.handleError(error));
          })
          .catch((err: any) => {
            console.log(err);
          });
      });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const handleSuccessReg = () => {
    setIsSuccess(true);
    setInfoModalIsOpen(true);
    setTimeout(() => {
      navigate(routes.profile);
    }, 5000);
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

  return (
    <AuthContainer
      title="Регистрация"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      submitBtnText="Готово"
      outLink={{ text: 'Войти в мой кабинет', link: routes.signIn }}
      modals={
        <>
          <Modal
            title={`Правила пользования сервисом "Котопёс"`}
            style={{ top: 20 }}
            open={rulesIsOpen}
            onOk={() => {
              setRulesIsOpen(false);
            }}
            onCancel={() => setRulesIsOpen(false)}
            footer={[
              <Button
                type="primary"
                key="agreed-btn"
                className="auth__submit-btn auth__submit-btn_type_agreed"
                onClick={() => {
                  setRulesIsOpen(false);
                }}
              >
                Готово
              </Button>,
            ]}
          >
            {signUpRulesText}
          </Modal>
          <AuthInfoModal
            isOpen={infoModalIsOpen}
            isSuccess={isSuccess}
            isError={isError}
            errorText={errorText}
          />
        </>
      }
    >
      <Form.Item name="role_name" rules={[{ required: true }]}>
        <Select placeholder="*Ваша роль">
          <Select.Option value="OWNER">Владелец</Select.Option>
          <Select.Option value="CARRIER">Поставщик услуг</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true },
          { type: 'email', message: 'Введите email' },
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

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Необходимо подтвердить')),
          },
        ]}
      >
        <Checkbox>
          Я прочёл(-ла)
          <Button
            type="link"
            onClick={() => setRulesIsOpen(true)}
            className="auth__secondary-text"
          >
            {' '}
            правила участия,
          </Button>
          согласен(-на) с ними и даю разрешение на обработку персональных данных.
        </Checkbox>
      </Form.Item>
    </AuthContainer>
  );
};
