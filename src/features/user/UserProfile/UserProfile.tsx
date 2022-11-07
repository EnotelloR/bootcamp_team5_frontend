import React, { FC } from 'react';
import { AnimalsTable } from '../../animals';
import { TUser, UserForm } from '../UserForm';
import './UserProfile.css';

export const UserProfile: FC<TUser> = ({ user }) => {
  return (
    <>
      <section className="profile__information">
        <UserForm user={user} />
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
