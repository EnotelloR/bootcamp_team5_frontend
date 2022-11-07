import { RootState } from '../..';
import { ICarrier } from '../../../services/types/authTypes';

//export const carriesSelector = (state: RootState) => state.Carries.carries; вернет всех поставщиков услуг

//ниже временное решение. выберет только те клиники, кто заполнил какие услуги они выполняют
export const carriesSelector = (state: RootState) =>
  state.Carries.carries?.filter((carrier) => carrier.clinic_services.length > 0);

export const selectCarrierById = (id: number) => (state: RootState) => {
  return state.Carries.carries?.find((carrier: ICarrier) => carrier.id === id);
};
