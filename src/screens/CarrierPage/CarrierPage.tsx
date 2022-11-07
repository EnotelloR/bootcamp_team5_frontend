import React, { useEffect } from 'react';
import './CarrierPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCarrierById } from '../../store/slices/carries/carriesSelectors';
import { useApiHooks } from '../../hooks/ApiHooks';
import { Button, Typography } from 'antd';
import { routes } from '../../routes/routes';
import { userSelector } from '../../store/slices/auth/authSelectors';

const { Text, Link } = Typography;

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
          <pre>{carrier?.name}</pre>
        </Typography>
        <Typography>
          <pre>{carrier?.about_us}</pre>
        </Typography>
        <Typography>
          <pre>{carrier?.url}</pre>
        </Typography>
        <Typography>
          <pre>{carrier?.phone}</pre>
        </Typography>
        <Typography>
          <pre>{carrier?.schedule}</pre>
        </Typography>
      </div>
      <div className="carrier-page__container carrier-page__container_type_second">
        <Typography>
          <pre>{carrier?.city_name}</pre>
        </Typography>
        <Typography>
          <pre>{carrier?.district_name}</pre>
        </Typography>
        <Typography>
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
            <pre>{animal.name}</pre>
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
