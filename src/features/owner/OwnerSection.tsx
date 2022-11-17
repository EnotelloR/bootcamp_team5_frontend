import React, { FC } from 'react';
import { user } from '../../services/types/authTypes';
import { CarrierProfile } from '../carriers';
import { UserProfile } from '../user';

interface OwnerSectionProps {
  data: user;
}

export const OwnerSection: FC<OwnerSectionProps> = ({ data }) => {
  return data.role_name === 'OWNER' ? (
    <section className="profile">
      <UserProfile user={data as user} />
    </section>
  ) : (
    <CarrierProfile />
  );
};
