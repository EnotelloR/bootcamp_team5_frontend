import { TAnimalsDetails, TAnimalSend } from '../../services/types/animalsTypes';
import { Breed, Gender, PetUUIDInfo } from './animals.type';
import { AnimalsType } from '../../store/petStore/interfaces';
import { petCabinetApi } from '../../store/petStore/petCabinetApi';
import { routes } from '../../routes/routes';
import { TServerAnswer } from '../../services/types/serverTypes';

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
    getPets: builder.query<TServerAnswer<TAnimalsDetails[]>, void>({
      query: () => routes.api.pets(),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ pet_id }) => ({
                type: 'Applications' as const,
                pet_id,
              })),
              { type: 'Pets', id: 'LIST' },
            ]
          : [{ type: 'Pets', id: 'LIST' }],
    }),
    getPet: builder.query<TServerAnswer<TAnimalsDetails>, number>({
      query: (id: number) => routes.api.petById(id),
      providesTags: ['Pet'],
    }),
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
    createUUID: builder.mutation<TServerAnswer<TAnimalSend>, number>({
      query: (id: number) => ({
        url: routes.api.createPetUUID(id),
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Pets', id: 'LIST' }, 'Pet'],
    }),
    getAnimalByUUID: builder.query<TServerAnswer<PetUUIDInfo>, string>({
      query: (uuid: string) => routes.api.getPetByUUID(uuid),
    }),
  }),
});

export const {
  useGetAnimalsTypeQuery,
  useGetBeersByAnimalsTypeIdQuery,
  useGetAnimalsGenderQuery,
  useAddNewAnimalMutation,
  useCreateUUIDMutation,
  useChangePetMutation,
  useGetAnimalByUUIDQuery,
  useGetPetsQuery,
  useGetPetQuery,
} = animalsApiSlice;
