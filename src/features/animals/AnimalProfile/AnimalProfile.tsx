import { Button } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { TAnimalsDetails } from '../../../services/types/animalsTypes';
import { endLoading, startLoading } from '../../../store/slices/load/loadSlice';
import Api from '../../../utils/Api';
import AboutAnimalSection from '../aboutAnimalSection';
import { AnimalForm } from '../AnimalForm';
import './AnimalProfile.css';

export const AnimalProfile: FC<{ animal: TAnimalsDetails }> = ({ animal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isChange, setIsChange] = useState<boolean>(true);

  const deleteAnimal = () => {
    dispatch(startLoading());
    const isDeleted = prompt(
      'Если вы уверенны что хотите удалить животное напишите его имя.',
    );
    if (isDeleted === animal.nickname) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Api.deleteAnimal(animal.pet_id!)
        .then(() => {
          navigate(routes.profile);
        })
        .catch((err) => {
          alert(`Ой, что то пошло не так. Подробности в консоле.`);
          console.log(err);
        })
        .finally(() => dispatch(endLoading()));
    } else {
      dispatch(endLoading());
    }
  };

  return (
    <section className="animal-profile">
      {isChange ? (
        <AboutAnimalSection animal={animal} />
      ) : (
        <AnimalForm isNew={false} animal={animal as TAnimalsDetails} />
      )}
      <div className="animal-profile__box-btn">
        {!isChange && (
          <Button
            type="default"
            htmlType="button"
            className="animal-profile__btn animal-profile__btn_delete"
            onClick={() => deleteAnimal()}
          >
            Удалить животное
          </Button>
        )}
        <Button
          type="default"
          htmlType="button"
          className={'animal-profile__btn ' + (!isChange && 'animal-profile__btn_cancel')}
          onClick={() => setIsChange(!isChange)}
        >
          {isChange ? 'Изменить' : 'Отмена'}
        </Button>
      </div>
    </section>
  );
};
