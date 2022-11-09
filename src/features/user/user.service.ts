import { routes } from '../../routes/routes';
import { user } from '../../services/types/authTypes';
import { petCabinetApi } from '../../store/petStore/petCabinetApi';

interface UserRequest {
  status: string;
  code: number;
  result: user;
}

const userApiSlice = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
    aboutUser: builder.query<UserRequest, void>({
      query: () => routes.api.aboutUser(),
    }),
  }),
});

export const { useAboutUserQuery } = userApiSlice;
