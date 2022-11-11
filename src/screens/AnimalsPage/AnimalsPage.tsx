import { Tabs } from 'antd';
import React, { FC, useState } from 'react';
import { AnimalProfile } from '../../features/animals';
import './AnimalsPage.css';
import cap from '../../image/cap.png';
import Manipulations from '../../features/manipulations/manipulations';
import { useGetPetQuery } from '../../features/animals/animals.service';
import { useParams } from 'react-router-dom';
import { Loader } from '../../features/layout';
import {
  ManipulationTypes,
  useGetAllManipulationTypesQuery,
} from '../../features/manipulations/manipulations.service';
import { Tab } from 'rc-tabs/lib/interface';

export const AnimalsPage: FC = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading } = useGetPetQuery(Number(id));
  const { data: manipulations, isLoading: manipulationLoading } =
    useGetAllManipulationTypesQuery();

  const image = cap;

  const createPanelLabels = !manipulationLoading
    ? manipulations?.result.map((manipulation: ManipulationTypes) => ({
        label: manipulation.name,
        children: (
          <Manipulations
            pet_id={data?.result.pet_id as number}
            manipulation_type_id={manipulation.id}
          />
        ),
        key: manipulation.name,
      }))
    : [];
  const defaultPanes = [
    {
      label: 'Общая информация',
      children: isSuccess && <AnimalProfile animal={data.result} />,
      key: 'Общая информация',
    },
    ...(createPanelLabels as Tab[]),
    {
      label: 'Рекомендации',
      children: <div>Рекомендации</div>,
      key: 'Рекомендации',
    },
  ];

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <>
      {isLoading && <Loader size={96} />}
      {isSuccess && (
        <>
          <div className="animal-page">
            <div className="animal-page__title-box">
              <img
                src={data.result.pet_picture ? data.result.pet_picture : image}
                alt={`Фотография ${data.result.nickname}`}
                className="animal-page__avatar"
              />
              <h2 className="animal-page__title">{`Привет, я ${data.result.nickname}!!!`}</h2>
            </div>
            <Tabs
              hideAdd
              onChange={onChange}
              activeKey={activeKey}
              items={defaultPanes}
              destroyInactiveTabPane={false}
            />
          </div>
        </>
      )}
    </>
  );
};
