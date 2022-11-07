import React, { FC } from 'react';
import { INews } from '../../../services/types/otherTypes';
import { NewsCard } from '../NewsCard';
import './NewsSection.css';

const news: INews[] = [
  {
    title:
      'Крокодил напал на своего хозяина и скрылся на трамвае в неизвестном направлении...',
    text: 'Получив глубокую психологическую трамву из-за просроченного йогурта, крокодил выбрался из клетки и ...',
    date: '2022-10-12T14:25:04.761Z',
    image: '',
    _id: '1',
  },
  {
    title: 'Кошка научилась играть на скрипке.',
    text: 'Когда вы оставляете своих питомцев одних в доме, то даже не подозреваете, чем они занимаются ...',
    date: '2022-10-11T23:09:02.900Z',
    image: '',
    _id: '2',
  },
  {
    title: 'Пудель воровал у хозяйки бигуди и закапывал их под грушей',
    text: 'Тут у меня закончилась фантазия, придумайте сами, плиз, уже ночь, я спать хочу.',
    date: '2022-10-10T14:01:34.349Z',
    image: '',
    _id: '3',
  },
  {
    title:
      'Крокодил напал на своего хозяина и скрылся на трамвае в неизвестном направлении...',
    text: 'Получив глубокую психологическую трамву из-за просроченного йогурта, крокодил выбрался из клетки и ...',
    date: '2022-10-05T13:55:04.761Z',
    image: '',
    _id: '4',
  },
  {
    title: 'Кошка научилась играть на скрипке.',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eligendi aperiam culpa in eum possimus quo, eaque a consequatur consequuntur tempora minus cumque accusamus nobis dicta esse accusantium quidem voluptates.',
    date: '2022-09-28T21:16:02.900Z',
    image: '',
    _id: '5',
  },
  {
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed iusto culpa eveniet asperiores hic dignissimos! Reprehenderit, ',
    text: 'nostrum neque, aperiam magni aspernatur error cupiditate voluptates ipsam consequatur sit tempora illo sapiente!',
    date: '2022-09-09T00:01:34.349Z',
    image: '',
    _id: '6',
  },
];
console.log('Удали тестовые данные!!!');

export const NewsSection: FC = () => {
  return (
    <section className="news">
      <h2 className="news__title">Новости из мира питомцев</h2>
      <ul className="news__ul">
        {news.map((element) => {
          return (
            <li key={element._id} className="news__li">
              <NewsCard someNews={element} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
