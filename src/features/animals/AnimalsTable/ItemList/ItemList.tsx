import React from 'react';
import { TAnimalsDetails } from '../../../../services/types/animalsTypes';
import { Item } from '../Item';
import './ItemList.css';

type TItemList = {
  animals: TAnimalsDetails[] | null;
};

// check types
export const ItemList = ({ animals }: TItemList) => {
  if (animals && animals.length !== 0) {
    return (
      <ul className="itemList__ul">
        {animals.map((animal: TAnimalsDetails, index) => {
          return <Item animal={animal} key={index} />;
        })}
      </ul>
    );
  } else {
    return <p className="itemList__text">Вы еще не добавили ни одного питомца</p>;
  }
};
