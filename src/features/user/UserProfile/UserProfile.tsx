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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsia290b3Blcy1yZXN0LWFwaSJdLCJ1c2VyX25hbWUiOiJzdmVyeHNybzRuaWtAZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTY3MzcxNzE3NywiYXV0aG9yaXRpZXMiOlsiT1dORVIiXSwianRpIjoiY2IyYTVlNGUtZDJkNi00OTEwLWJkMTgtYmMxNzFmNDQyZjUyIiwiY2xpZW50X2lkIjoia290b3Blcy1mcm9udC1hcHAtMSJ9.6VuDobx_CZpAYkOk_SrmMryjV-r_9CF5yRSBRaAyv2M
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsia290b3Blcy1yZXN0LWFwaSJdLCJ1c2VyX25hbWUiOiJzdmVyeHNybzRuaWtAZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTY3MzcxNzE3NywiYXV0aG9yaXRpZXMiOlsiT1dORVIiXSwianRpIjoiY2IyYTVlNGUtZDJkNi00OTEwLWJkMTgtYmMxNzFmNDQyZjUyIiwiY2xpZW50X2lkIjoia290b3Blcy1mcm9udC1hcHAtMSJ9.6VuDobx_CZpAYkOk_SrmMryjV-r_9CF5yRSBRaAyv2M
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsia290b3Blcy1yZXN0LWFwaSJdLCJ1c2VyX25hbWUiOiJzdmVyeHNybzRuaWtAZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTY3MzcxNzQ2NiwiYXV0aG9yaXRpZXMiOlsiT1dORVIiXSwianRpIjoiYTNiMGY4MTgtZDMyZC00N2NhLWI2MzYtNTA0NjBmY2JjNGQyIiwiY2xpZW50X2lkIjoia290b3Blcy1mcm9udC1hcHAtMSJ9.oRolGDz0NLmGT4OtbZx4JhbMXt-0p8zXLakL-fHBgXY
