export type TAnimalSend = {
  birthday: any;
  breed_id: number;
  castration?: boolean;
  characteristic?: string;
  chip_number?: number;
  gender_id: number;
  health_features?: string;
  kind_id: number;
  nickname: string;
  pet_picture?: string;
  stigma?: string;
  weight?: string;
  wool_cover?: string;
  pet_id: number;
  chip_end_date?: string;
  chip_start_date?: string;
};

export interface ISimpleAnimal {
  avatar: string;
  nickName: string;
  _id: string;
}

export type TAnimalsDetails = TAnimalSend & {
  breed_name: string;
  gender_name: string;
  kind_name: string;
};

export type TAnimalsInitState = {
  animals: Array<TAnimalsDetails> | null;
  animalDetails: TAnimalsDetails | null;
};
