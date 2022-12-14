import { Typography } from 'antd';
import React, { FC } from 'react';
import { ManipulationTypesByPet } from '../manipulations.service';
import styles from './ManipulationsList.module.css';

interface ManipulationsListProps {
  manipulations: ManipulationTypesByPet[];
}

export const ManipulationsList: FC<ManipulationsListProps> = ({ manipulations }) => {
  return (
    <div className={styles.manipulationsWrapper}>
      {manipulations.map((manipulation) => (
        <div key={manipulation.request_id} className={styles.manipulationCard}>
          <div>
            <Typography.Title level={5}>Описание манипуляции:</Typography.Title>
            <Typography.Paragraph className={styles.manipulation__text}>
              {manipulation.description}
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Paragraph>
              Дата проведения: {manipulation.date}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Дата следующей: {manipulation.next_date || 'Не указана'}
            </Typography.Paragraph>
          </div>
        </div>
      ))}
    </div>
  );
};
