import React from 'react';
import { useGetNotificationsQuery } from '../notifications.service';
import { Loader } from '../../layout';
import { Alert } from 'antd';
import { NotificationCard } from '../NotificationCard';
import styles from './Notifications.module.css';

export const Notifications = () => {
  const {
    data: notifications,
    isLoading,
    isSuccess,
    isError,
  } = useGetNotificationsQuery();
  return (
    <div className={styles.notificationsWrapper}>
      <div className={styles.notifications__header}>
        <h2>Плановая дата</h2>
        <h2>Описание</h2>
        <h2>Отметка о прочтении</h2>
      </div>
      {isLoading && <Loader size={96} />}
      {isError && (
        <Alert
          message="Ошибка"
          description="Ошибка загрузки. Попробуйте перезагрузить страницу."
          type="error"
          showIcon
        />
      )}
      {isSuccess &&
        notifications.result.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      {isSuccess && notifications.result.length === 0 && (
        <Alert message="Нет напоминаний" type="info" showIcon />
      )}
    </div>
  );
};
