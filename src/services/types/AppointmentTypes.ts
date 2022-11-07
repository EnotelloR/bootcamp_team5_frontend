import { ICarrier, IOwner } from './authTypes';
import { TAnimalsDetails } from './animalsTypes';

export interface IAppointmentResData {
  // запрос заявки
  pet_id: number;
  carrier_id: number;
  description: string;
  services_ids: [number];
  communication_methods_ids: [number];
}

export interface Iappointment {
  id: number;
  carrier: ICarrier;
  owner: IOwner;
  pet: TAnimalsDetails;
  description: string;
  status_id: number;
  status_name: string;
  created_at: string;
  updated_at: string;
  clinic_services: [
    {
      id: number;
      name: string;
    },
  ];
  communication_methods: [
    {
      id: number;
      name: string;
      value: string;
    },
  ];
}
