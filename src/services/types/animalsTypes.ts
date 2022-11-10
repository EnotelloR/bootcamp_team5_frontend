export type TAnimalSend = {
  birthday: any;
  breed_id?: number | null;
  castration?: boolean | null;
  characteristic?: string | null;
  chip_number?: number | null;
  gender_id: number | null;
  health_features?: string | null;
  kind_id: number | null;
  nickname: string | null;
  pet_picture?: string | null;
  stigma?: string | null;
  weight?: number | null;
  wool_cover?: string | null;
  pet_id: number | null;
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
