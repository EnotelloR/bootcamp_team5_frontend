import React, { FC, useMemo } from 'react';
import { INotification } from '../notifications.entity';
import styles from './NotificationCard.module.css';
import { Checkbox } from 'antd';
import { useCheckNotificationMutation } from '../notifications.service';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { useGetAllManipulationTypesQuery } from '../../manipulations/manipulations.service';

export const NotificationCard: FC<{ notification: INotification }> = ({
  notification,
}) => {
  const [checkNotification] = useCheckNotificationMutation();
  const { data: manipulationTypes } = useGetAllManipulationTypesQuery();
  const navigate = useNavigate();

  const requestId = useMemo<number>(() => {
    const split = notification.id.split('-');
    return Number(split[split.length - 1]);
  }, [notification]);

  const navigationObject = useMemo(() => {
    if (notification.reminder_type === 'REQUEST')
      return {
        pathname: routes.navAppointment(requestId),
      };
    else if (notification.reminder_type === 'MANIPULATION') {
      const manipulation = manipulationTypes?.result.find(
        (el) => el.id === notification.manipulation_type_id,
      );
      return {
        pathname: routes.navAnimal(notification.pet_id),
        search: createSearchParams({
          defaultPane: manipulation?.name as string,
        }).toString(),
      };
    } else return routes.main;
  }, [notification, manipulationTypes]);

  const openNotification = () => {
    navigate(navigationObject);
  };

  return (
    <div
      className={styles.notificationCard__card}
      onClick={openNotification}
      onKeyDown={openNotification}
    >
      <p className={styles.notificationCard__card__text}>{notification.datetime}</p>
      <p className={styles.notificationCard__card__text}>
        {notification.description || 'Отсуствует'}
      </p>
      <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
        <Checkbox
          onChange={() => checkNotification(notification.id)}
          defaultChecked={notification.do_not_remind}
        >
          больше не напоминать
        </Checkbox>
      </div>
    </div>
  );
};
