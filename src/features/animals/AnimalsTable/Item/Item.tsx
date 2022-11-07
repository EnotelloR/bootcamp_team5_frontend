import React, { FC } from 'react';
import { TAnimalsDetails } from '../../../../services/types/animalsTypes';
import cap from '../../../../image/cap.png';
import './Item.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Api from '../../../../utils/Api';
import { endLoading, startLoading } from '../../../../store/slices/load/loadSlice';
import { animalDetails } from '../../../../store/slices/animals/animalsSlice';

type TItem = {
  animal: TAnimalsDetails;
};

export const Item: FC<TItem> = ({ animal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const image =
    animal.pet_picture && animal.pet_picture.length !== 0 ? animal.pet_picture : cap;

  const onClick = async () => {
    dispatch(startLoading());
    await Api.getAnimal(animal.pet_id!)
      .then((res) => {
        dispatch(animalDetails(res.result));
      })
      .then(() => {
        navigate(`/profile/animals/${animal.pet_id}`);
      })
      .catch((err) => {
        alert(`Ой, что то пошло не так: ${err.message}. Подробности в консоле.`);
        console.log(err);
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };

  return (
    <li className="item" onClick={onClick} onKeyDown={onClick}>
      <div className="item__image-box">
        <img src={image} alt={`Фоторгафия ${animal.nickname}`} className="item__image" />
      </div>
      <p className="item__name">{animal.nickname}</p>
    </li>
  );
};
