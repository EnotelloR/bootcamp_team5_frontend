import { petCabinetApi } from '../../store/petStore/petCabinetApi';
import { routes } from '../../routes/routes';
import { TServerAnswer } from '../../services/types/serverTypes';

export interface TVerificationRequest {
  token?: string;
}

const authorizationApi = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
    confirmEmail: builder.mutation<TServerAnswer<undefined>, TVerificationRequest>({
      query: (userData) => ({
        url: routes.api.verifyUser(),
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useConfirmEmailMutation } = authorizationApi;
