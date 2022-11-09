import React, { FC } from 'react';
import { user } from '../../services/types/authTypes';
import { CarrierProfile } from '../carriers';
import { UserProfile } from '../user';

interface OwnerSectionProps {
  owner: user | undefined;
}

const OwnetSection: FC<OwnerSectionProps> = ({ owner }) => {
  return owner?.role_name === 'OWNER' ? (
    <section className="profile">
      <UserProfile user={owner as user} />
    </section>
  ) : (
    <CarrierProfile />
  );
};

export default OwnetSection;
