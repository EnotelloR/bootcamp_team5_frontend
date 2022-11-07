import { petCabinetApi } from '../petCabinetApi';
import { routes } from '../../../routes/routes';
import { City, ServiceType, AnimalsType } from '../interfaces';
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
interface getAnimalsTypeResponce {
  status: string;
  code: number;
  result: AnimalsType[];
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
    getAnimalsType: builder.query<getAnimalsTypeResponce, void>({
      query: () => routes.api.getAnimalsType(),
    }),
  }),
});

export const {
  useGetCityQuery,
  useGetDistrictsByCityQuery,
  useGetServicesQuery,
  useGetAnimalsTypeQuery,
} = selectsApiSlice;
