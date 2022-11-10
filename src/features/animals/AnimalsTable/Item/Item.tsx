import React, { FC } from 'react';
import { TAnimalsDetails } from '../../../../services/types/animalsTypes';
import cap from '../../../../image/cap.png';
import './Item.css';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';

type TItem = {
  animal: TAnimalsDetails;
};

export const Item: FC<TItem> = ({ animal }) => {
  const navigate = useNavigate();
  const image =
    animal.pet_picture && animal.pet_picture.length !== 0 ? animal.pet_picture : cap;

  const onClick = async () => {
    navigate(routes.navAnimal(animal.pet_id as number));
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
