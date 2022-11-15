import {
  TApplication,
  IApplicationStatusUpdater,
  Iappointment,
} from './applications.entity';
import { TServerAnswer } from '../../services/types/serverTypes';
import { petCabinetApi } from '../../store/petStore/petCabinetApi';
import { routes } from '../../routes/routes';
import { ManipulationTypesByPet } from '../manipulations/manipulations.service';

const applicationsApi = petCabinetApi.injectEndpoints({
  endpoints: (build) => ({
    getApplications: build.query<TServerAnswer<TApplication[]>, void>({
      query: () => routes.api.request(),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({ type: 'Applications' as const, id })),
              { type: 'Applications', id: 'LIST' },
            ]
          : [{ type: 'Applications', id: 'LIST' }],
    }),
    getApplication: build.query<TServerAnswer<Iappointment>, number>({
      query: (id = -1) => routes.api.request() + (id !== -1 && `/${id}`),
      providesTags: ['Appointment'],
    }),
    getApplicationManipulations: build.query<
      TServerAnswer<ManipulationTypesByPet[]>,
      number
    >({
      query: (id) => routes.api.getRequestManipulationsById(id),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ manipulation_id }) => ({
                type: 'ApplicationManipulations' as const,
                manipulation_id,
              })),
              { type: 'ApplicationManipulations', id: 'LIST' },
            ]
          : [{ type: 'ApplicationManipulations', id: 'LIST' }],
    }),
    changeApplications: build.mutation({
      query: (updater: IApplicationStatusUpdater) => ({
        url: `${routes.api.request()}/${updater.id}/status`,
        method: 'PUT',
        body: updater.status,
      }),
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }, 'Appointment'],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useGetApplicationManipulationsQuery,
  useChangeApplicationsMutation,
} = applicationsApi;
