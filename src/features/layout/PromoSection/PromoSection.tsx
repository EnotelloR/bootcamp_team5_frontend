import React, { FC } from 'react';
import './PromoSection.css';
import fire from '../../../image/fire.png';

export const PromoSection: FC = () => {
  return (
    <section className="promo">
      <div className="promo__box">
        <h2 className="promo__title">
          <img
            src={fire}
            alt="Огонек(не несет смысловой нагрузки)"
            className="promo__fire-icon"
          />
          Горячие распродажи в зоомагазинах “Кутята” — 40% на все корма
        </h2>
        <p className="promo__text">Акция действует во всех городах до 31.12.2022</p>
      </div>
    </section>
  );
};
