import { petCabinetApi } from '../../store/petStore/petCabinetApi';
import { routes } from '../../routes/routes';
import { TServerAnswer } from '../../services/types/serverTypes';

export interface TVerificationRequest {
  token?: string;
}

export interface PasswordRequest {
  email?: string;
  token?: string;
  password?: string;
  confirm?: string;
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
    forgotPassword: builder.mutation<PasswordRequest, PasswordRequest>({
      query: (userData) => ({
        url: routes.api.forgotPassword(),
        method: 'POST',
        body: userData,
      }),
    }),
    changePassword: builder.mutation<PasswordRequest, PasswordRequest>({
      query: (userData) => ({
        url: routes.api.changePassword(),
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {
  useConfirmEmailMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = authorizationApi;
