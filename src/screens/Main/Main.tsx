import React, { FC } from 'react';
import { TitleSection } from '../../features/layout';
import { CarriersList } from '../CarriersList';

import './Main.css';

export const Main: FC = () => {
  return (
    <div className="main">
      <TitleSection />
      <CarriersList />
    </div>
  );
};
