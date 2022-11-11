import React, { FC } from 'react';
import {
  ManipulationTypesByPet,
  useGetManipulationsByPetIdQuery,
} from '../manipulations.service';
import ManipulatonsForm from '../manipulationsForm';
import ManipulationsList from '../manipulationsList';

interface ManipulationProps {
  pet_id: number;
  manipulation_type_id: number;
}

const Manipulations: FC<ManipulationProps> = ({ pet_id, manipulation_type_id }) => {
  console.log(manipulation_type_id);
  const { data, isLoading } = useGetManipulationsByPetIdQuery({
    pet_id,
    manipulation_type_id,
  });
  return (
    <div>
      <ManipulatonsForm manipulation_type_id={manipulation_type_id} pet_id={pet_id} />
      {!isLoading ? (
        <ManipulationsList
          manipulations={data?.result as unknown as ManipulationTypesByPet[]}
        />
      ) : (
        <div>Данные загружаются...</div>
      )}
    </div>
  );
};

export default Manipulations;
