import React, { FC } from 'react';
import './Profile.css';
import { OwnerSection } from '../../features/owner/OwnerSection';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/slices/auth/authSelectors';

export const Profile: FC = () => {
  const user = useSelector(userSelector);
  return <section>{user.role_name && <OwnerSection data={user} />}</section>;
};
