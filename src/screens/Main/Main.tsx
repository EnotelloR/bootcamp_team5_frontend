import React, { FC } from 'react';
import { NewsSection } from '../../features/news';
import { PromoSection, TitleSection } from '../../features/layout';

import './Main.css';

export const Main: FC = () => {
  return (
    <div className="main">
      <TitleSection />
      <PromoSection />
      <NewsSection />
    </div>
  );
};
