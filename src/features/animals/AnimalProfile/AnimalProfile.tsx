import { Button, message, Popconfirm } from 'antd';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { TAnimalsDetails } from '../../../services/types/animalsTypes';
import AboutAnimalSection from '../aboutAnimalSection';
import { AnimalForm } from '../AnimalForm';
import './AnimalProfile.css';
import { useDeletePetMutation } from '../animals.service';
import { userSelector } from '../../../store/slices/auth/authSelectors';

export const AnimalProfile: FC<{ animal: TAnimalsDetails }> = ({ animal }) => {
  const navigate = useNavigate();

  const [isChange, setIsChange] = useState<boolean>(true);
  const [deletePet] = useDeletePetMutation();

  const deleteAnimal = async () => {
    if (!animal.pet_id) return;
    await deletePet(animal.pet_id)
      .unwrap()
      .then(() => navigate(routes.profile))
      .catch((err) => {
        message.error('Произошла ошибка.');
        console.log(err);
      });
  };

  const user = useSelector(userSelector);
  const isOwner = user && user.role_name === 'OWNER';

  return (
    <section className="animal-profile">
      {isChange ? (
        <AboutAnimalSection animal={animal} />
      ) : (
        <AnimalForm isNew={false} animal={animal as TAnimalsDetails} />
      )}
      {isOwner && (
        <div className="animal-profile__box-btn">
          {!isChange && (
            <Popconfirm
              title="Вы уверены, что хотите удалить вашего питомца?"
              onConfirm={deleteAnimal}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="default"
                htmlType="button"
                className="animal-profile__btn animal-profile__btn_delete"
              >
                Удалить питомца
              </Button>
            </Popconfirm>
          )}
          <Button
            type="default"
            htmlType="button"
            className={
              'animal-profile__btn ' + (!isChange && 'animal-profile__btn_cancel')
            }
            onClick={() => setIsChange(!isChange)}
          >
            {isChange ? 'Изменить' : 'Отмена'}
          </Button>
        </div>
      )}
    </section>
  );
};
