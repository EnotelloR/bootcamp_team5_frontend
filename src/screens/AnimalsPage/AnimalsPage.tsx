import { Tabs } from 'antd';
import React, { FC, useState } from 'react';
import { AnimalProfile } from '../../features/animals';
import './AnimalsPage.css';
import cap from '../../image/cap.png';
import Manipulations from '../../features/manipulations/manipulations';
import { useGetPetQuery } from '../../features/animals/animals.service';
import { useParams } from 'react-router-dom';
import { Loader } from '../../features/layout';

export const AnimalsPage: FC = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading } = useGetPetQuery(Number(id));

  const image = cap;

  const defaultPanes = [
    {
      label: 'Общая информация',
      children: isSuccess && <AnimalProfile animal={data.result} />,
      key: '1',
    },
    { label: 'Процедуры', children: <Manipulations />, key: '2' },
    { label: 'Прививки', children: <Manipulations />, key: '3' },
    { label: 'Другое', children: <Manipulations />, key: '4' },
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
