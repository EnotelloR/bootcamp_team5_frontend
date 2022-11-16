import React, { FC } from 'react';
import { user } from '../../../../../services/types/authTypes';
import Entered from '../entered';
import NotEntered from '../notEntered';

interface RoleHeaderProps {
  user: user;
}

const RoleHeader: FC<RoleHeaderProps> = ({ user }) => {
  return user.email ? <Entered user={user} /> : <NotEntered />;
};

export default RoleHeader;
