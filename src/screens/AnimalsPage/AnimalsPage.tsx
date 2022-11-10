import { Tabs } from 'antd';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimalProfile } from '../../features/animals';
import { animalDetailsSelector } from '../../store/slices/animals/animalsSelectors';
import './AnimalsPage.css';
import cap from '../../image/cap.png';
import Manipulations from '../../features/manipulations/manipulations';

export const AnimalsPage: FC = () => {
  const animal = useSelector(animalDetailsSelector)!;
  const image = cap;

  const defaultPanes = [
    { label: 'Общая информация', children: <AnimalProfile animal={animal} />, key: '1' },
    { label: 'Процедуры', children: <Manipulations />, key: '2' },
    { label: 'Прививки', children: <Manipulations />, key: '3' },
    { label: 'Другое', children: <Manipulations />, key: '4' },
  ];

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className="animal-page">
      <div className="animal-page__title-box">
        <img
          src={image}
          alt={`Фотография ${animal.nickname}`}
          className="animal-page__avatar"
        />
        <h2 className="animal-page__title">{`Привет, я ${animal.nickname}!!!`}</h2>
      </div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        items={defaultPanes}
        destroyInactiveTabPane={false}
      />
    </div>
  );
};
