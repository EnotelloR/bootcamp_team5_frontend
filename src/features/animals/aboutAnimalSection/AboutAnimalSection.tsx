import React, { FC } from 'react';
import { TAnimalsDetails } from '../../../services/types/animalsTypes';

interface AboutAnimalSectionProps {
  animal: TAnimalsDetails;
}

const AboutAnimalSection: FC<AboutAnimalSectionProps> = ({ animal }) => {
  return (
    <section className="animal-profile__info-box">
      <div>
        <p className="animal-profile__text">
          <span className="animal-profile__span">Меня зовут: </span>
          {animal.nickname}
        </p>
        {animal.kind_name ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Я представитель вида: </span>
            {animal.kind_name}
          </p>
        ) : null}
        {animal.breed_name ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Породы: </span>
            {animal.breed_name}
          </p>
        ) : null}
        <p className="animal-profile__text">
          <span className="animal-profile__span">Пол: </span>
          {animal.gender_name}
        </p>
        <p className="animal-profile__text">
          <span className="animal-profile__span">Появился на свет: </span>
          {animal.birthday}
        </p>
        {animal.wool_cover ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Моя шерсть: </span>
            {animal.wool_cover}
          </p>
        ) : null}
        {animal.weight ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Ты меня откормил до: </span>
            {animal.weight} килограмм
          </p>
        ) : null}
        {animal.chip_number ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">В меня вставили чип с номером: </span>
            {animal.chip_number}
          </p>
        ) : null}
        {animal.stigma ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">А так же сделали клеймо: </span>
            {animal.stigma}
          </p>
        ) : null}
        {animal.castration ? (
          <p className="animal-profile__text">и сделали бесплодным...</p>
        ) : null}
      </div>
      <div>
        {animal.health_features ? (
          <p className="animal-profile__text animal-profile__text_big">
            <span className="animal-profile__span">
              За время жизни со мной ты узнал, что у меня есть особенности:{' '}
            </span>
            <br />
            {animal.health_features}
          </p>
        ) : null}
        {animal.characteristic ? (
          <p className="animal-profile__text animal-profile__text_big">
            <span className="animal-profile__span">
              {' '}
              А еще то, что ты всегда узнаешь меня в толпе, так как я:{' '}
            </span>
            <br />
            {animal.characteristic}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default AboutAnimalSection;
