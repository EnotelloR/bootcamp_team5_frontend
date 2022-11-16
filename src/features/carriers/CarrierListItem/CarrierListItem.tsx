import { Button, Col, Image, Row } from 'antd';
import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { Carrier } from '../../../store/petStore/interfaces';
import { Typography } from 'antd';
import time from '../../../image/time.svg';
import location from '../../../image/location.svg';
import price from '../../../image/price.svg';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';

interface Iprops {
  carrier: Carrier;
}

export const CarrierListItem = ({ carrier }: Iprops) => {
  const navigate = useNavigate();
  const { name, picture_url, schedule, address, id } = carrier;
  const user = useSelector(userSelector);

  const cardClickHandler = useCallback(() => {
    navigate(routes.navCarrierPage(Number(id)));
  }, []);

  const buttonClickHandler = useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
    navigate(routes.navCarrierCreateReq(id));
  }, []);

  return (
    <>
      <Row
        style={{
          gap: '40px',
          boxShadow: '0px 4px 8px 4px rgba(216, 218, 220, 0.25)',
          borderRadius: '4px',
          flexDirection: 'column',
          padding: '30px 20px',
          cursor: 'pointer',
        }}
        onClick={cardClickHandler}
      >
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col lg={18} style={{ alignItems: 'start' }}>
            <Typography.Title level={4}>{name}</Typography.Title>
            <Row>
              <Col
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                }}
                lg={12}
              >
                <img src={time} alt="Время работы" />
                <p>{schedule}</p>
              </Col>
              <Col
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                }}
                lg={12}
              >
                <img src={location} alt="Наш адресс" />

                <p>{address}</p>
              </Col>
              <Col
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                }}
              >
                <img src={price} alt="Стоимость работ от" />

                <p>От 600 руб. за прием</p>
              </Col>
            </Row>
          </Col>
          <Col lg={5} offset={1}>
            <Image src={picture_url} width={145} height={145} />
          </Col>
        </Row>
        {user.is_active && (
          <Row>
            <Col lg={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                htmlType="button"
                style={{
                  background: '#389E0D',
                  borderRadius: '4px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontSize: '18px',
                  textTransform: 'uppercase',
                  height: 'auto',
                }}
                onClick={buttonClickHandler}
              >
                Записаться на прием
              </Button>
            </Col>
          </Row>
        )}
      </Row>
    </>
  );
};
