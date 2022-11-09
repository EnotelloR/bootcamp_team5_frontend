import React, { FC } from 'react';
import './Profile.css';
import { Spin } from 'antd';
import OwnerSection from '../../features/owner/OwnerSection';
import { useAboutUserQuery } from '../../features/user/user.service';

export const Profile: FC = () => {
  const { data, isLoading } = useAboutUserQuery();

  return (
    <section>
      {isLoading ? <Spin size="large" /> : <OwnerSection owner={data?.result} />}
    </section>
  );
};
