import React, { FC } from 'react';
import { AnimalForm } from '../../features/animals';

export const NewAnimal: FC = () => {
  return <AnimalForm isNew={true} />;
};
