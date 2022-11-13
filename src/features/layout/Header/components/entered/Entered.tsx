import { Button, Col, Divider, Dropdown, Menu, Row } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../../../routes/routes';
import { logout } from '../../../../../store/slices/auth/authSlice';
import { MenuOutlined } from '@ant-design/icons';
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
  const menu = (
    <Menu style={{ padding: '20px 40px' }}>
      <Menu.Item>
        <Link to={routes.carriers} style={{ color: '#389E0D' }}>
          Клиники
        </Link>
      </Menu.Item>
      <Divider style={{ margin: '5px', color: '#389E0D' }} />
      <Menu.Item>
        <Link to={routes.applications} style={{ color: '#389E0D' }}>
          Приемы
        </Link>
      </Menu.Item>
      <Divider style={{ margin: '5px', color: '#389E0D' }} />
      <Menu.Item>
        <Link to={'#'} style={{ color: '#389E0D' }}>
          Напоминания
        </Link>
      </Menu.Item>
      <Divider style={{ margin: '5px', color: '#389E0D' }} />
      <Menu.Item>
        <Link to={routes.profile} style={{ color: '#389E0D' }}>
          Я и мои питомцы
        </Link>
      </Menu.Item>
      <Divider style={{ margin: '10px', color: '#389E0D' }} />
      <Menu.Item onClick={logoutUser}>
        <Link to={'#'} style={{ color: '#389E0D' }}>
          Выйти
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
      <Col xs={0} lg={24} md={0} className="header__auth-container_type_desktop">
        <nav
          style={{
            textTransform: 'uppercase',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
          }}
        >
          <Row style={{ alignItems: 'center' }}>
            <Col lg={2}>
              <Link to={routes.carriers} style={{ color: '#389E0D' }}>
                Клиники
              </Link>
            </Col>
            <Col lg={3} offset={2}>
              <Link to={routes.applications} style={{ color: '#389E0D' }}>
                Приемы
              </Link>
            </Col>
            <Col lg={3} offset={2}>
              <Link to={'#'} style={{ color: '#389E0D' }}>
                Напоминания
              </Link>
            </Col>
            <Col lg={6} offset={2}>
              <Link to={routes.profile} style={{ color: '#389E0D' }}>
                Я и мои питомцы
              </Link>
            </Col>
            <Col lg={3} offset={1}>
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
        </nav>
      </Col>
      <Col lg={0} xs={4} md={4}>
        <Dropdown overlay={menu} placement="bottomRight">
          <MenuOutlined style={{ color: '#389E0D', fontSize: '30px' }} />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Entered;
