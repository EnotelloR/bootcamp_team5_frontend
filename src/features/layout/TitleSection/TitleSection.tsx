import React, { FC } from 'react';
import logo from '../../../image/main.png';
import './TitleSection.css';

export const TitleSection: FC = () => {
  return (
    <section className="title-section">
      <div className="title-section__text">
        <h1 className="title-section__title">Единый личный кабинет питомца “Котопёс”</h1>
        <h2 className="title-section__subtitle">
          Место, где собрано всё, чтобы ваш питомец был здоров и счастлив{' '}
        </h2>
      </div>
      <ul className="title-section__ul">
        <li className="title-section__li">Электронный ветеринарный паспорт</li>
        <li className="title-section__li">
          Запись в ветеринарные клиники, салоны, отели
        </li>
        <li className="title-section__li">Ведение истории посещения специалистов</li>
        <li className="title-section__li">
          Своевременные напоминания о необходимых процедурах
        </li>
      </ul>
      <div className="title-section__logo-box">
        <img src={logo} alt="Логотип ЕЛК'Котопес'" className="title-section__logo" />
      </div>
    </section>
  );
};
