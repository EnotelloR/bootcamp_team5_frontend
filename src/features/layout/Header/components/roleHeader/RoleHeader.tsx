import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { user } from '../../../../../services/types/authTypes';
import { userSelector } from '../../../../../store/slices/auth/authSelectors';
import Entered from '../entered';
import NotEntered from '../notEntered';

interface RoleHeaderProps {
  user: user;
}

const RoleHeader: FC<RoleHeaderProps> = () => {
  const user = useSelector(userSelector);
  return <div>{user.email ? <Entered user={user} /> : <NotEntered />}</div>;
};

export default RoleHeader;
