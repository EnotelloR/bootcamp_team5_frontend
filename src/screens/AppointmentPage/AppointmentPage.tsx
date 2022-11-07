import React from 'react';
import { useParams } from 'react-router-dom';

import { Appointment } from '../../features/applications';

export const AppointmentPage = () => {
  const { id } = useParams();
  return <Appointment id={id as string} />;
};
