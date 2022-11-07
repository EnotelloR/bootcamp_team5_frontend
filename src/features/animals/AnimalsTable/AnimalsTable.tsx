import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { animalsSelector } from '../../../store/slices/animals/animalsSelectors';
import { ItemList } from './ItemList';
import { endLoading, startLoading } from '../../../store/slices/load/loadSlice';
import './AnimalsTable.css';
import Api from '../../../utils/Api';
import { deleteAnimals, getAnimals } from '../../../store/slices/animals/animalsSlice';

export const AnimalsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const animals = useSelector(animalsSelector);

  const createNew = () => {
    navigate(routes.newAnimal);
  };

  const getAnimalsData = () => {
    dispatch(startLoading());
    Api.getAnimals()
      .then((res) => {
        dispatch(getAnimals(res.result));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };

  useEffect(() => {
    getAnimalsData();

    return () => {
      dispatch(deleteAnimals());
    };
  }, []);

  return (
    <>
      <h3 className="animals-table__title">МОИ ПИТОМЦЫ</h3>
      <div className="animals-table__ul">
        {animals ? (
          <ItemList animals={animals} />
        ) : (
          <p className="animals-table__text">Вы еще не добавили ни одного питомца</p>
        )}
      </div>
      {animals && animals.length === 20 ? (
        <p className="animals-table__btn">
          Извените, но вы добавили максимальное число животных
        </p>
      ) : (
        <Button
          onClick={createNew}
          type="primary"
          htmlType="button"
          className="animals-table__btn"
        >
          + Добавить питомца
        </Button>
      )}
    </>
  );
};
