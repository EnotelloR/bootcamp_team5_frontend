import React from 'react';
import './ErrorAuth.css';
import { Typography } from 'antd';

const { Title, Text } = Typography;

interface Iprops {
  errorText?: string;
}

export const ErrorAuth = ({ errorText }: Iprops) => {
  return (
    <section className="error-auth">
      <div className="error-auth__container">
        <div className="error-auth__logo" />
        <Title level={2}>Произошла ошибка</Title>
        <Text>{errorText}</Text>
      </div>
    </section>
  );
};
