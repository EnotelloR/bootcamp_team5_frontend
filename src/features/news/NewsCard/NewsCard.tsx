import React, { FC } from 'react';
import { INews } from '../../../services/types/otherTypes';
import cap from '../../../image/cap.png';
import { formatOrderDate } from '../../../utils/date';
import './NewsCard.css';

type TNews = {
  someNews: INews;
};

export const NewsCard: FC<TNews> = ({ someNews }) => {
  const image = someNews.image.length === 0 ? cap : someNews.image;

  return (
    <article className="card">
      <div className="card__image-box">
        <img
          src={image}
          alt={`Иллюстрация к новости ${someNews.title}`}
          className="card__image"
        />
      </div>
      <div className="card__text-box">
        <h4 className="card__title">{someNews.title}</h4>
        <p className="card__text">{someNews.text}</p>
        <p className="card__date">{formatOrderDate(someNews.date)}</p>
      </div>
    </article>
  );
};
