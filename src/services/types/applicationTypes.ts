import { TOther } from './otherTypes';

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
};

export type TInitStateApplications = {
  applications: Array<TApplication> | null;
  applicationDetails: TApplication | null;
};
