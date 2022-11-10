import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { routes } from '../../routes/routes';

export const petCabinetApi = createApi({
  reducerPath: 'petCabinetApi',
  tagTypes: ['Applications', 'Appointment', 'Pets', 'Pet'],
  baseQuery: fetchBaseQuery({
    baseUrl: routes.api.basePath(),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
