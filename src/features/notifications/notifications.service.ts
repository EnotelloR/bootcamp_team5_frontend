import { TServerAnswer } from '../../services/types/serverTypes';
import { petCabinetApi } from '../../store/petStore/petCabinetApi';
import { routes } from '../../routes/routes';
import { INotification } from './notifications.entity';

const notificationsApi = petCabinetApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<TServerAnswer<INotification[]>, void>({
      query: () => routes.api.getNotifications(),
      keepUnusedDataFor: 5,
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({ type: 'Notifications' as const, id })),
              { type: 'Notifications', id: 'LIST' },
            ]
          : [{ type: 'Notifications', id: 'LIST' }],
    }),
    getNotificationsCount: build.query<
      TServerAnswer<{ reminders: number; requests: number }>,
      void
    >({
      query: () => routes.api.getNotificationsCount(),
      keepUnusedDataFor: 5,
      providesTags: ['NotificationCounter'],
    }),
    checkNotification: build.mutation<void, string>({
      query: (id) => ({
        url: routes.api.checkNotification(id),
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Notifications', id: 'LIST' }, 'NotificationCounter'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useCheckNotificationMutation,
  useGetNotificationsCountQuery,
} = notificationsApi;
