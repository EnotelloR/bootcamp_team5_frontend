import React, { useEffect } from 'react';
import './CarrierPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCarrierById } from '../../store/slices/carries/carriesSelectors';
import { useApiHooks } from '../../hooks/ApiHooks';
import { Button, Typography } from 'antd';
import { routes } from '../../routes/routes';
import { userSelector } from '../../store/slices/auth/authSelectors';

const { Link } = Typography;

export const CarrierPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const carrier = useSelector(selectCarrierById(Number(id)));
  const { getterCarrierById } = useApiHooks();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user && !carrier) {
      getterCarrierById(Number(id));
    }
  }, [user]);

  return (
    <section className="carrier-page">
      <img
        src={carrier?.picture_url}
        alt={`Логотип ${carrier?.name}`}
        className="carrier-page__avatar"
      />
      <div className="carrier-page__container carrier-page__container_type_first">
        <Typography>
          <p className="carrier-page__fieldTitle">Название</p>
          <pre>{carrier?.name}</pre>
        </Typography>
        {carrier?.about_us && (
          <Typography>
            <p className="carrier-page__fieldTitle">О нас</p>
            <pre>{carrier?.about_us}</pre>
          </Typography>
        )}
        <Typography>
          <p className="carrier-page__fieldTitle">Наш сайт</p>
          <pre>
            <Link href={carrier?.url} target={'_blank'}>
              {carrier?.url}
            </Link>
          </pre>
        </Typography>
        <Typography>
          <p className="carrier-page__fieldTitle">Номер телефона</p>
          <pre>{carrier?.phone}</pre>
        </Typography>
        {carrier?.schedule && (
          <Typography>
            <p className="carrier-page__fieldTitle">График</p>
            <pre>{carrier?.schedule}</pre>
          </Typography>
        )}
        <Typography>
          <p className="carrier-page__fieldTitle">Мы на карте</p>
          <img
            src="https://static-maps.yandex.ru/1.x/?api_key=01931952-3aef-4eba-951a-8afd26933ad6&theme=light&lang=ru_RU&size=520%2C440&l=map&spn=0.008211%2C0.004627&ll=37.696858%2C55.781849&lg=0&cr=0&pt=37.696858%2C55.781848%2Ccomma&signature=ZlICABT2CTzthGxtmeGRQig7JxDCeoIWlCu2iyPDbdM="
            alt="Мы на карте"
          />
        </Typography>
      </div>
      <div className="carrier-page__container carrier-page__container_type_second">
        <Typography>
          <p className="carrier-page__fieldTitle">Город</p>
          <pre>{carrier?.city_name}</pre>
        </Typography>
        {carrier?.district_name && (
          <Typography>
            <p className="carrier-page__fieldTitle">Район</p>
            <pre>{carrier?.district_name}</pre>
          </Typography>
        )}
        <Typography>
          <p className="carrier-page__fieldTitle">Адрес</p>
          <pre>{carrier?.address}</pre>
        </Typography>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Виды обслуживаемых животных
        </Typography.Title>
        {carrier?.animal_types.map((animal, index) => (
          <Typography key={index}>
            <pre>{animal.name}</pre>
          </Typography>
        ))}
        <Typography.Title level={5} style={{ margin: 0 }}>
          Виды услуг
        </Typography.Title>
        {carrier?.service_types.map((animal, index) => (
          <Typography key={index}>
            <pre>{animal.name}</pre>
          </Typography>
        ))}
        <Typography.Title level={5} style={{ margin: 0 }}>
          Список услуг
        </Typography.Title>
        {carrier?.clinic_services.map((animal, index) => (
          <Typography key={index}>
            <pre>
              {animal.name} {animal.defaultPrice}р
            </pre>
          </Typography>
        ))}
        {user.role_id === 2 && (
          <Button
            htmlType="button"
            className="ant-form-item carrier-page__request-btn"
            onClick={() => navigate(routes.navCarrierCreateReq(Number(id)))}
          >
            Записаться на прием
          </Button>
        )}
      </div>
    </section>
  );
};
