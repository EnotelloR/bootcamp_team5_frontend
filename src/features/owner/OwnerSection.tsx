import React, { FC } from 'react';
import { user } from '../../services/types/authTypes';
import { CarrierProfile } from '../carriers';
import { UserProfile } from '../user';

interface OwnerSectionProps {
  data: user | undefined;
}

const OwnetSection: FC<OwnerSectionProps> = ({ data }) => {
  return data?.role_name === 'OWNER' ? (
    <section className="profile">
      <UserProfile user={data as user} />
    </section>
  ) : (
    <CarrierProfile />
  );
};

export default OwnetSection;
