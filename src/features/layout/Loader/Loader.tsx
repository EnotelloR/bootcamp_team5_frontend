import React, { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const Loader: FC<{ size?: number }> = ({ size = 48 }) => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />;
};
