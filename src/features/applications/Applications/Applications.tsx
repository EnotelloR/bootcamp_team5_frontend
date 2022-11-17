import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import './Applications.css';
import { useGetApplicationsQuery } from '../applications.service';
import { ApplicationItem } from '../ApplicationItem';
import { Loader } from '../../layout';
import { Alert } from 'antd';

export const Applications: FC = () => {
  const user = useSelector(userSelector);

  const { data, isSuccess, isLoading, isError } = useGetApplicationsQuery(undefined, {
    pollingInterval: 600000,
  });

  const isOwner = user && user.role_name === 'OWNER';

  return (
    <section className="applications">
      <h2 className="applications__title">Мои заявки</h2>
      {isLoading && <Loader size={96} />}
      {isError && (
        <Alert
          message="Ошибка"
          description="Произошла ошибка загрузки. Попробуйте перезагрузить страницу."
          type="error"
          showIcon
        />
      )}
      {data && isSuccess && (
        <div className="applications__table-wrapper">
          <div
            className={`applications__table ${
              !isOwner ? 'applications__table_carrier' : ''
            }`}
          >
            <p className="applications__table-text">№ заявки</p>
            <p className="applications__table-text">
              {isOwner ? 'Поставщик услуг' : 'Заказчик'}
            </p>
            <p className="applications__table-text">Время создания</p>
            <p className="applications__table-text">
              {isOwner ? 'Питомец' : 'Вид животного'}
            </p>
            <p className="applications__table-text">Тип услуги</p>
            <p className="applications__table-text">Статус заявки</p>
            <p className="applications__table-text">Дата и время приема</p>
          </div>
          <ul className="applications__list">
            {data.result.map((application, index) => {
              return <ApplicationItem key={index} application={application} />;
            })}
          </ul>
        </div>
      )}
      {!data && isSuccess && (
        <p className="applications__caption">
          Вы еще не создали ни одной заявки. Печально...
        </p>
      )}
    </section>
  );
};
