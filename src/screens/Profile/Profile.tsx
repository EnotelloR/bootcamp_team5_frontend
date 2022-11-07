import React, { FC } from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/slices/auth/authSelectors';
import { UserProfile } from '../../features/user';
import { CarrierProfile } from '../../features/carriers';

export const Profile: FC = () => {
  const user = useSelector(userSelector);

  if (user.is_active) {
    switch (user.role_name) {
      case 'ADMIN': {
        return (
          <section className="profile">
            <h3 className="profile__text">ADMIN</h3>
          </section>
        );
      }
      case 'OWNER': {
        return (
          <section className="profile">
            <UserProfile user={user} />
          </section>
        );
      }
      case 'CARRIER':
        return <CarrierProfile />;
      default: {
        return <h3 className="profile__text">Ошибка авторизации</h3>;
      }
    }
  } else {
    return (
      <h3 className="profile__text">
        Ошибка авторизации(возможно вам заблокировали доступ к ресурсу за нарушение правил
        пользования)
      </h3>
    );
  }
};
