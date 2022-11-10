import { TAnimalSend, TAnimalsDetails } from './../../services/types/animalsTypes';
import { Breed, Gender } from './animals.type';
import { AnimalsType } from '../../store/petStore/interfaces';
import { petCabinetApi } from '../../store/petStore/petCabinetApi';
import { routes } from '../../routes/routes';

interface getAnimalsTypeResponce {
  status: string;
  code: number;
  result: AnimalsType[];
}

interface BeersByAnimalsTypeIdResponce {
  status: string;
  code: number;
  result: Breed[];
}

interface AnimalsGenderResponce {
  status: string;
  code: number;
  result: Gender[];
}

const animalsApiSlice = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimalsType: builder.query<getAnimalsTypeResponce, void>({
      query: () => routes.api.getAnimalsType(),
    }),
    getBeersByAnimalsTypeId: builder.query<BeersByAnimalsTypeIdResponce, number>({
      query: (id) => routes.api.getAnimalBreeds(id),
    }),
    getAnimalsGender: builder.query<AnimalsGenderResponce, void>({
      query: () => routes.api.getAllGenders(),
    }),
    addNewAnimal: builder.mutation<TAnimalSend, TAnimalSend>({
      query: (animalBody) => ({
        url: routes.api.pets(),
        method: 'POST',
        body: animalBody,
      }),
    }),
    changePet: builder.mutation<TAnimalSend, TAnimalSend>({
      query: (animal) => ({
        url: routes.api.petById(animal.pet_id as number),
        method: 'PUT',
        body: animal,
      }),
    }),
  }),
});

export const {
  useGetAnimalsTypeQuery,
  useGetBeersByAnimalsTypeIdQuery,
  useGetAnimalsGenderQuery,
  useAddNewAnimalMutation,
  useChangePetMutation,
} = animalsApiSlice;
