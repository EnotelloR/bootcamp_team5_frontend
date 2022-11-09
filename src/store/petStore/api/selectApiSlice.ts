import { petCabinetApi } from '../petCabinetApi';
import { routes } from '../../../routes/routes';
import { City, ServiceType } from '../interfaces';
import { IDistrict } from '../../../features/carriers';

export interface getCityResponce {
  status: string;
  code: number;
  result: City[];
}
interface getDistrictResponce {
  status: string;
  code: number;
  result: IDistrict[];
}
interface getServicesResponce {
  status: string;
  code: number;
  result: ServiceType[];
}

const selectsApiSlice = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
    getCity: builder.query<getCityResponce, void>({
      query: () => routes.api.getCities(),
    }),
    getDistrictsByCity: builder.query<getDistrictResponce, number>({
      query: (city_id: number) => ({
        url: routes.api.getDistrictsByCity(city_id),
      }),
    }),
    getServices: builder.query<getServicesResponce, void>({
      query: () => routes.api.getServices(),
    }),
  }),
});

export const { useGetCityQuery, useGetDistrictsByCityQuery, useGetServicesQuery } =
  selectsApiSlice;
