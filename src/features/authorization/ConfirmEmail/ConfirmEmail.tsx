import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '../authorization.service';
import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin, message } from 'antd';
import { Typography } from 'antd/es';
import styles from './ConfirmEmail.module.css';

const { Title } = Typography;

interface ConfirmEmailProps {
  token: string;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ token }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [confirmEmail] = useConfirmEmailMutation();

  useEffect(() => {
    try {
      confirmEmail({ token: token })
        .unwrap()
        .then(() => {
          message.success('Вы успешно подтвердили почту!');
          navigate('/signIn');
        })
        .catch(() => {
          setErrorMessage('Токен невалиден');
        });
    } catch (e) {
      setErrorMessage('Токен невалиден');
    }
  }, [token]);

  return (
    <Row justify="center">
      <Col span={12} className={styles.contentCenter}>
        {errorMessage ? (
          <Title level={1}>{errorMessage}</Title>
        ) : (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        )}
      </Col>
    </Row>
  );
};
