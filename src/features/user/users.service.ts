import { routes } from '../../routes/routes';
import { petCabinetApi } from './../../store/petStore/petCabinetApi';

export interface PasswordRequest {
  email?: string;
  token?: string;
  password?: string;
  confirm?: string;
}

const userServiceApi = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useForgotPasswordMutation, useChangePasswordMutation } = userServiceApi;
