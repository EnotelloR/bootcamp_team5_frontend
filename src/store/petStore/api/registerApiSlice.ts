import { AuthResponse, AuthRequest } from '../interfaces';
import { routes } from '../../../routes/routes';
import { petCabinetApi } from '../petCabinetApi';

const registerApiSlice = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
    registered: builder.mutation<AuthResponse, AuthRequest>({
      query: (userData) => ({
        url: routes.api.userRegister(),
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisteredMutation } = registerApiSlice;
