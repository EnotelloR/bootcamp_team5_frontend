import {
  TApplication,
  IApplicationStatusUpdater,
  Iappointment,
} from './Applications/applications.entity';
import { TServerAnswer } from '../../services/types/serverTypes';
import { petCabinetApi } from '../../store/petStore/petCabinetApi';
import { routes } from '../../routes/routes';

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
    }),
    deleteApplications: build.mutation({
      query: (updater: IApplicationStatusUpdater) => ({
        url: `${routes.api.request()}/${updater.id}/status`,
        method: 'PUT',
        body: updater.status,
      }),
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useDeleteApplicationsMutation,
} = applicationsApi;
