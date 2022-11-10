import { TOther } from '../../../services/types/otherTypes';
import { ICarrier, IOwner } from '../../../services/types/authTypes';
import { TAnimalsDetails } from '../../../services/types/animalsTypes';

export type TApplication = {
  animal_type_id: number;
  animal_type_name: string;
  clinic_services: Array<TOther>;
  communication_methods: Array<TOther>;
  created_at: string;
  datetime: string;
  description: string;
  id: number;
  pet_nickname: string;
  status_id: number;
  status_name: string;
  updated_at: string;
  carrier_id: number;
  carrier_name: string;
  owner_id: number;
  owner_name: string;
  is_new: boolean;
};

export interface IApplicationStatusUpdater {
  id: number;
  status: {
    status_id: number;
    result_description?: string;
    result_file?: string;
    datetime?: string;
  };
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
  datetime: string;
  result_description: string;
  result_file: string;
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
