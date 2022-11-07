import { Carrier, SearchParams } from '../interfaces';
import { petCabinetApi } from '../petCabinetApi';
import { routes } from '../../../routes/routes';

interface getCarriersResponce {
  status: string;
  code: number;
  result: Carrier[];
}

const carriersApiSlice = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
    getCarrier: builder.query<getCarriersResponce, SearchParams>({
      query: (args) => ({
        url: routes.api.getCarrier(),
        params: { ...args },
      }),
    }),
  }),
});

export const { useGetCarrierQuery } = carriersApiSlice;
