import React, { FC } from 'react';
import { useGetAnimalRecommendationsQuery } from '../animals.service';
import { Typography } from 'antd';
import styles from './AnimalRecommendations.module.css';

const { Title, Text } = Typography;

export const AnimalRecommendations: FC<{ pet_id: number }> = ({ pet_id }) => {
  const {
    data: recommendations,
    isLoading,
    isSuccess,
  } = useGetAnimalRecommendationsQuery(pet_id);

  return (
    <div className={styles.recommendationWrapper}>
      {isLoading && 'Данные загружаются...'}
      {isSuccess &&
        recommendations.result.map((recommendation) => {
          return (
            <div key={recommendation.request_id} className={styles.recommendationCard}>
              <div>
                <Title level={2}>{recommendation.carrier_name}</Title>
                <Text>{recommendation.datetime}</Text>
              </div>
              <div>
                <Title level={3}>Рекомендация: </Title>
                <p className={styles.recommendationText}>
                  {recommendation.result_description}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
