import { Button } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { TAnimalsDetails } from '../../../services/types/animalsTypes';
import { endLoading, startLoading } from '../../../store/slices/load/loadSlice';
import Api from '../../../utils/Api';
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
        <section className="animal-profile__info-box">
          <div>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Меня зовут: </span>
              {animal.nickname}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Я представитель вида: </span>
              {animal.kind_name}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Породы: </span>
              {animal.breed_name}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Пол: </span>
              {animal.gender_name}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Появился на свет: </span>
              {animal.birthday}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Моя шерсть: </span>
              {animal.wool_cover}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Ты меня откормил до: </span>
              {animal.weight} килограмм
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">
                В меня вставили чип с номером:{' '}
              </span>
              {animal.chip_number}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">Чип вставили: </span>
              {animal.chip_start_date}
              <span className="animal-profile__span">
                {' '}
                и сказали, что он будет работать до:{' '}
              </span>
              {animal.chip_end_date}
            </p>
            <p className="animal-profile__text">
              <span className="animal-profile__span">А так же сделали клеймо: </span>
              {animal.stigma}
            </p>
            {animal.castration ? (
              <p className="animal-profile__text">и сделали бесплодным...</p>
            ) : null}
          </div>
          <div>
            <p className="animal-profile__text animal-profile__text_big">
              <span className="animal-profile__span">
                За время жизни со мной ты узнал, что у меня есть особенности:{' '}
              </span>
              <br />
              {animal.health_features}
            </p>
            <p className="animal-profile__text animal-profile__text_big">
              <span className="animal-profile__span">
                {' '}
                А еще то, что ты всегда узнаешь меня в толпе, так как я:{' '}
              </span>
              <br />
              {animal.characteristic}
            </p>
          </div>
        </section>
      ) : (
        <AnimalForm isNew={false} animal={animal} />
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
