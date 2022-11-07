import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import './Applications.css';
import { useGetApplicationsQuery } from '../applications.service';
import { ApplicationItem } from '../ApplicationItem';

export const Applications: FC = () => {
  const user = useSelector(userSelector);

  const { data, isSuccess } = useGetApplicationsQuery();

  const isOwner = user && user.role_name === 'OWNER';

  // const getApplicationsData = () => {
  //   dispatch(startLoading());
  //   Api.getApplications()
  //     .then((res) => {
  //       dispatch(getApplications(res.result));
  //     })
  //     .catch((err) => {
  //       alert(`Ой, что то пошло не так. Подробности в консоле.`);
  //       console.log(err);
  //     })
  //     .finally(() => dispatch(endLoading()));
  // };

  return (
    <section className="applications">
      <h2 className="applications__title">Мои заявки</h2>
      {data && isSuccess ? (
        <>
          <div className="applications__table">
            <p className="applications__table-text">№ заявки</p>
            <p className="applications__table-text">
              {isOwner ? 'Поставщик услуг' : 'Заказчик'}
            </p>
            <p className="applications__table-text">Дата и время создания заявки</p>
            <p className="applications__table-text">
              {isOwner ? 'Питомец' : 'Вид животного'}
            </p>
            <p className="applications__table-text">Тип услуги</p>
            <p className="applications__table-text">Статус заявки</p>
            <p className="applications__table-text">Дата и время приема</p>
          </div>
          <ul className="applications__list">
            {data.result.map((application, index) => {
              return (
                <ApplicationItem key={index} application={application} index={index} />
              );
            })}
          </ul>
        </>
      ) : (
        <p className="applications__caption">
          Вы еще не создали ни одной заявки. Печально...
        </p>
      )}
    </section>
  );
};
