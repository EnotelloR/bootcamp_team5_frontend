import React, { FC, useState } from 'react';
import { AnimalsTable } from '../../animals';
import AboutUser from '../aboutUser';
import { TUser, UserForm } from '../UserForm';
import './UserProfile.css';

export const UserProfile: FC<TUser> = ({ user }) => {
  const [update, setUpdate] = useState<boolean>(false);
  return (
    <>
      <section className="profile__information">
        {update ? (
          <UserForm user={user} setUpdate={setUpdate} />
        ) : (
          <AboutUser user={user} setUpdate={setUpdate} />
        )}
      </section>
      <section className="profile__else">
        {user.is_verified ? (
          <AnimalsTable />
        ) : (
          <h3 className="profile__cap">
            Для добавления животных подтвердите свою почту!!!
          </h3>
        )}
      </section>
    </>
  );
};
