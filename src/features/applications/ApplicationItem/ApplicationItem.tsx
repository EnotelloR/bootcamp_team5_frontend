import { Button } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { TApplication } from '../../../services/types/applicationTypes';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import './ApplicationItem.css';
import { useDeleteApplicationsMutation } from '../applications.service';

export const ApplicationItem: FC<{ application: TApplication; index: number }> = ({
  application,
  index,
}) => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const [changeStatus] = useDeleteApplicationsMutation();

  const isOwner = user && user.role_name === 'OWNER';

  console.log(application.id);

  const itemClick = () => {
    navigate(routes.navAppointment(application.id));
  };

  const buttonClick = async () => {
    const isDeleted = prompt(
      'Если вы уверены что хотите отменить запись напишите кличку животного.',
    );
    if (isDeleted === application.pet_nickname) {
      const status = {
        status_id: 5,
      };
      await changeStatus({ id: application.id, status: status }).unwrap();
    }
  };

  return (
    <li className="application-item" onClick={itemClick} onKeyDown={itemClick}>
      <p className="application-item__text">{index + 1}</p>
      <p className="application-item__text">
        {isOwner ? application.carrier_name : application.owner_name}
      </p>
      <p className="application-item__text">{application.created_at}</p>
      <p className="application-item__text">
        {isOwner ? application.pet_nickname : application.animal_type_name}
      </p>
      <div className="application-item__text">
        {application.clinic_services.map((item, index) => {
          return (
            <p key={index} className="application-item__span">
              {item.name}
              <br />
            </p>
          );
        })}
      </div>
      <p className="application-item__text">{application.status_name}</p>
      <p className="application-item__text">
        {application.datetime ? application.datetime : 'Еще не назначенно'}
      </p>
      {isOwner && (
        <Button
          htmlType="button"
          size="middle"
          className="application-item__text application-item__btn"
          disabled={application.status_id !== 1 && application.status_id !== 2}
          onClick={buttonClick}
        >
          ОТМЕНИТЬ
        </Button>
      )}
    </li>
  );
};
