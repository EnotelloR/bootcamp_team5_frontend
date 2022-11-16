import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { FC } from 'react';
import { user } from '../../../services/types/authTypes';
import '../../carriers/CarrierMainInfoForm/CarrierMainInfoForm.css';

interface AboutUserProps {
  user: user;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutUser: FC<AboutUserProps> = ({ user, setUpdate }) => {
  const { email, owner } = user;
  return (
    <>
      {owner?.picture_url ? (
        <Row>
          <img src={owner.picture_url} alt={owner.firstname} className="user-image" />
        </Row>
      ) : (
        <div>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
          />
        </div>
      )}
      {owner?.firstname ? (
        <Row>
          <Col lg={24}>
            <Paragraph className="carrier-profile__form-container_type_first">
              <Typography.Title level={5} style={{ margin: 0 }}>
                Имя
              </Typography.Title>
              <pre>{owner.firstname}</pre>
            </Paragraph>
          </Col>
        </Row>
      ) : null}
      {owner?.lastname ? (
        <Col lg={24}>
          <Paragraph className="carrier-profile__form-container_type_first">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Фамилия
            </Typography.Title>
            <pre>{owner.lastname}</pre>
          </Paragraph>
        </Col>
      ) : null}
      {owner?.phone ? (
        <Col lg={24}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Номер телефона
          </Typography.Title>
          <Paragraph className="carrier-profile__form-container_type_first">
            <pre>{owner.phone}</pre>
          </Paragraph>
        </Col>
      ) : null}
      {email ? (
        <Row>
          <Col lg={24}>
            <Paragraph className="carrier-profile__form-container_type_first">
              <Typography.Title level={5} style={{ margin: 0 }}>
                Электронная почта
              </Typography.Title>
              <pre>{email}</pre>
            </Paragraph>
          </Col>
        </Row>
      ) : null}
      {owner?.city_name ? (
        <Row>
          <Col lg={24}>
            <Paragraph className="carrier-profile__form-container_type_first">
              <Typography.Title level={5} style={{ margin: 0 }}>
                Город
              </Typography.Title>
              <pre>{owner.city_name}</pre>
            </Paragraph>
          </Col>
        </Row>
      ) : null}
      {owner?.district_name ? (
        <Row>
          <Col lg={24}>
            <Paragraph className="carrier-profile__form-container_type_first">
              <Typography.Title level={5} style={{ margin: 0 }}>
                Район
              </Typography.Title>
              <pre>{owner.district_name}</pre>
            </Paragraph>
          </Col>
        </Row>
      ) : null}
      <Button htmlType="button" onClick={() => setUpdate(true)} className="user-btn">
        Изменить
      </Button>
    </>
  );
};

export default AboutUser;
