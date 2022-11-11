import { Table } from 'antd';
import React, { FC } from 'react';
import { ManipulationTypesByPet } from '../manipulations.service';

interface ManipulationsListProps {
  manipulations: ManipulationTypesByPet[];
}

export const ManipulationsList: FC<ManipulationsListProps> = ({ manipulations }) => {
  console.log(manipulations);
  return (
    <div>
      <table style={{ width: '100%', textAlign: 'center' }}>
        <tr>
          <th>Описание манипуляции</th>
          <th> Дата манипуляции</th>
          <th>Дата следующей манипуляции</th>
        </tr>
        {manipulations.map((manipulation) => (
          <tr key={manipulation.manipulation_id}>
            <td>{manipulation.description}</td>
            <td>{manipulation.date}</td>
            <td>{manipulation.next_date}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
