import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

type TProtectedRoute = {
  logistic: boolean;
  toRedirect: string;
  children: React.ReactNode;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  logistic,
  children,
  toRedirect,
}) => {
  if (logistic) {
    return <Navigate to={toRedirect} />;
  }
  return <>{children}</>;
};
