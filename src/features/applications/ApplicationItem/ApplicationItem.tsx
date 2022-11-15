import { Button, Popconfirm } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import './ApplicationItem.css';
import { routes } from '../../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { useChangeApplicationsMutation } from '../applications.service';
import { TApplication } from '../applications.entity';

export const ApplicationItem: FC<{
  application: TApplication;
}> = ({ application }) => {
  const user = useSelector(userSelector);
  const [changeStatus] = useChangeApplicationsMutation();
  const navigate = useNavigate();

  const isOwner = user && user.role_name === 'OWNER';

  const confirmDelete = async () => {
    const status = {
      status_id: 5,
    };
    await changeStatus({ id: application.id, status: status }).unwrap();
  };

  const applicationClick = () => {
    navigate(routes.navAppointment(application.id));
  };

  return (
    <li
      className={`application-item ${!isOwner && 'application-item_carrier'}`}
      onClick={applicationClick}
      onKeyDown={applicationClick}
    >
      <p className={`application-item__text`}>{application.id}</p>
      <p className={`application-item__text application-item__text_carrier`}>
        {isOwner ? application.carrier_name : application.owner_name}
      </p>
      <p className={`application-item__text`}>{application.created_at}</p>
      <p className={`application-item__text`}>
        {isOwner ? application.pet_nickname : application.animal_type_name}
      </p>
      <div className={`application-item__text`}>
        {application.clinic_services.map((item, index) => {
          return (
            <p key={index} className="application-item__span">
              {item.name}
              <br />
            </p>
          );
        })}
      </div>
      <p
        className={`application-item__text ${
          application.is_new && 'application-item__text_new'
        }`}
      >
        {application.status_name}
      </p>
      <p className={`application-item__text`}>
        {application.datetime ? application.datetime : 'Еще не назначенно'}
      </p>
      {isOwner && (
        <Button
          htmlType="button"
          size="middle"
          className="application-item__text application-item__btn"
          disabled={application.status_id !== 1 && application.status_id !== 2}
          onClick={(event) => event.stopPropagation()}
        >
          <Popconfirm
            title="Вы уверены, что хотите отменить запись?"
            onConfirm={confirmDelete}
            okText="Да"
            cancelText="Нет"
            disabled={application.status_id !== 1 && application.status_id !== 2}
          >
            Отменить
          </Popconfirm>
        </Button>
      )}
    </li>
  );
};
