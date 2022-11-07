import './CarrierListItem.css';
import carrierCardImage from '../../../image/carrier-list-item.png';
import scheduleIcon from '../../../image/carrier-card__info-icon.png';
import addressIcon from '../../../image/carrier-card__adress-icon.png';
import { Button } from 'antd';
import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { Carrier } from '../../../store/petStore/interfaces';

interface Iprops {
  carrier: Carrier;
}

export const CarrierListItem = ({ carrier }: Iprops) => {
  const navigate = useNavigate();
  const { name, picture_url, schedule, address, id } = carrier;

  const cardClickHandler = useCallback((event: SyntheticEvent) => {
    navigate(routes.navCarrierPage(Number(id)));
  }, []);

  const buttonClickHandler = useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
    navigate(routes.navCarrierCreateReq(id));
  }, []);

  return (
    <article
      className="carrier-card"
      onClick={cardClickHandler}
      onKeyDown={cardClickHandler}
    >
      <h4 className="carrier-card__title">{name}</h4>
      <img
        className="carrier-card__picture"
        src={picture_url || carrierCardImage}
        onError={() => carrierCardImage}
        alt="Клини доктора Шмидт"
      />
      <div className="carrier-card__info-item">
        <img src={scheduleIcon} className="carrier-card__info-icon" alt="#" />
        <p className="carrier-card__info-text">{schedule}</p>
      </div>
      <div className="carrier-card__info-item">
        <img src={addressIcon} className="carrier-card__info-icon" alt="#" />
        <p className="carrier-card__info-text">{address}</p>
      </div>
      <Button
        htmlType="button"
        className="ant-form-item carrier-card__request-btn"
        onClick={buttonClickHandler}
      >
        Записаться на прием
      </Button>
    </article>
  );
};
