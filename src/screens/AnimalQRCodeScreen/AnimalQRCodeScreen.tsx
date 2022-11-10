import React from 'react';
import { useParams } from 'react-router-dom';
import { AnimalQRCode } from '../../features/animals';

export const AnimalQRCodeScreen = () => {
  const { uuid } = useParams();

  return <AnimalQRCode uuid={uuid as string} />;
};
