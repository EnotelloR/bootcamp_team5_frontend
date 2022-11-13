import { Button, Col, Row } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../../../routes/routes';
import { logout } from '../../../../../store/slices/auth/authSlice';
import Api from '../../../../../utils/Api';

const Entered = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
    Api.clearToken();
    localStorage.removeItem('token');
    navigate(routes.main);
  }
  return (
    <Row style={{ alignItems: 'center' }}>
      <Col lg={18}>
        <nav
          style={{
            textTransform: 'uppercase',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
          }}
        >
          <Row>
            <Col lg={4}>
              <Link to={routes.carriers} style={{ color: '#389E0D' }}>
                Клиники
              </Link>
            </Col>
            <Col lg={4} offset={2}>
              <Link to={routes.applications} style={{ color: '#389E0D' }}>
                Приемы
              </Link>
            </Col>
            <Col lg={4} offset={2}>
              <Link to={'#'} style={{ color: '#389E0D' }}>
                Напоминания
              </Link>
            </Col>
            <Col lg={6} offset={2}>
              <Link to={routes.profile} style={{ color: '#389E0D' }}>
                Я и мои питомцы
              </Link>
            </Col>
          </Row>
        </nav>
      </Col>
      <Col lg={4} offset={1}>
        <Button
          style={{
            border: '1px solid #389E0D',
            borderRadius: '4px',
            color: '#389E0D',
            fontSize: '14px',
            textTransform: 'uppercase',
            padding: '0px 20px',
            lineHeight: '20px',
          }}
          onClick={() => logoutUser()}
        >
          Выйти
        </Button>
      </Col>
    </Row>
  );
};

export default Entered;
