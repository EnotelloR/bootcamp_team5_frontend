import React from 'react';
import { Notifications } from '../../features/notifications';
import { Typography } from 'antd';

export const NotificationsScreen = () => {
  return (
    <>
      <Typography.Title level={1}>Напоминания</Typography.Title>
      <Notifications />
    </>
  );
};
