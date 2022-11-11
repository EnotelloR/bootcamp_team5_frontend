import { routes } from '../../routes/routes';
import { petCabinetApi } from '../../store/petStore/petCabinetApi';

export interface ManipulationTypes {
  id: number;
  name: string;
}

export interface ManipulationTypesByPet {
  date: string;
  description: string;
  manipulation_type_id: number;
  next_date: string;
  pet_id: number;
  manipulation_id: number;
}

export interface CreateManipulationTypes {
  date: any;
  description: string;
  manipulation_type_id: number;
  next_date: any;
  pet_id: number;
}

export interface ManipulationTypesResponce {
  code: number;
  status: string;
  result: ManipulationTypes[];
}

export interface ManipulationTypesByPetResponce {
  code: number;
  status: string;
  result: ManipulationTypesByPet[];
}

interface ManipulationsTypesRequest {
  pet_id: number;
  manipulation_type_id: number;
}

const manipulationsApiSlice = petCabinetApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllManipulationTypes: builder.query<ManipulationTypesResponce, void>({
      query: () => routes.api.getAllManipulationTypes(),
      providesTags: ['Manipulations'],
    }),
    getManipulationsByPetId: builder.query<
      ManipulationTypesResponce,
      ManipulationsTypesRequest
    >({
      query: ({ pet_id, manipulation_type_id }) => ({
        url: routes.api.manipulationsByPet(pet_id),
        params: { manipulation_type_id },
      }),
      providesTags: ['Manipulations'],
    }),
    createManipulationByPetId: builder.mutation<
      ManipulationTypesByPetResponce,
      CreateManipulationTypes
    >({
      query: (manipulation) => ({
        url: routes.api.createManipulationsByPet(manipulation.pet_id),
        method: 'POST',
        body: manipulation,
      }),
      invalidatesTags: ['Manipulations'],
    }),
  }),
});

export const {
  useGetAllManipulationTypesQuery,
  useGetManipulationsByPetIdQuery,
  useCreateManipulationByPetIdMutation,
} = manipulationsApiSlice;
