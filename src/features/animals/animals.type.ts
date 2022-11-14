export interface Breed {
  id: number;
  name: string;
}

export interface Gender {
  id: number;
  name: string;
}

export interface PetUUIDInfo {
  birthday: string;
  breed_name: string;
  castration: boolean;
  characteristic: string;
  city_name: string;
  district_name: string;
  gender_name: string;
  health_features: string;
  nickname: string;
  owner_name: string;
  pet_picture: string;
  phone: string;
}

export interface AnimalRecommendation {
  carrier_id: number;
  carrier_name: string;
  pet_id: number;
  request_id: number;
  result_description: string;
  result_file: string;
}
