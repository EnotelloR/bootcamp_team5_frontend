import { Button, Col, Divider, Dropdown, Menu, Row } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../../../routes/routes';
import { logout } from '../../../../../store/slices/auth/authSlice';
import { BulbOutlined, MenuOutlined } from '@ant-design/icons';
import Api from '../../../../../utils/Api';
import { useGetNotificationsCountQuery } from '../../../../notifications';
import { petCabinetApi } from '../../../../../store/petStore/petCabinetApi';
import { user } from '../../../../../services/types/authTypes';

interface EnteredProps {
  user: user;
}

const Entered: FC<EnteredProps> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
    dispatch(petCabinetApi.util.resetApiState());
    Api.clearToken();
    localStorage.removeItem('token');
    navigate(routes.main);
  }
  const { data: unseenNotifications, isSuccess } = useGetNotificationsCountQuery(
    undefined,
    {
      pollingInterval: 60000,
    },
  );

  const menu = (
    <Menu style={{ padding: '20px 40px' }}>
      {user.role_name === 'OWNER' ? (
        <>
          <Menu.Item>
            <Link to={routes.carriers} style={{ color: '#389E0D' }}>
              Клиники
            </Link>
          </Menu.Item>
          <Divider style={{ margin: '5px', color: '#389E0D' }} />
          <Menu.Item>
            <Link to={routes.applications} style={{ color: '#389E0D' }}>
              Приемы
              {isSuccess && unseenNotifications.result.requests > 0 && (
                <span className="header__nav-link-text_notification">
                  {' '}
                  <BulbOutlined />
                  {unseenNotifications.result.requests}
                </span>
              )}
            </Link>
          </Menu.Item>
          <Divider style={{ margin: '5px', color: '#389E0D' }} />
          <Menu.Item>
            <Link to={routes.pages.notifications} style={{ color: '#389E0D' }}>
              Напоминания
              {isSuccess && unseenNotifications.result.reminders > 0 && (
                <span className="header__nav-link-text_notification">
                  {' '}
                  <BulbOutlined />
                  {unseenNotifications.result.reminders}
                </span>
              )}
            </Link>
          </Menu.Item>
          <Divider style={{ margin: '5px', color: '#389E0D' }} />
          <Menu.Item>
            <Link to={routes.profile} style={{ color: '#389E0D' }}>
              Я и мои питомцы
            </Link>
          </Menu.Item>
          <Divider style={{ margin: '10px', color: '#389E0D' }} />
        </>
      ) : (
        <>
          <Divider style={{ margin: '5px', color: '#389E0D' }} />
          <Menu.Item>
            <Link to={routes.applications} style={{ color: '#389E0D' }}>
              Приемы
              {isSuccess && unseenNotifications.result.requests > 0 && (
                <span className="header__nav-link-text_notification">
                  {' '}
                  <BulbOutlined />
                  {unseenNotifications.result.requests}
                </span>
              )}
            </Link>
          </Menu.Item>
          <Divider style={{ margin: '5px', color: '#389E0D' }} />
          <Menu.Item>
            <Link to={routes.profile} style={{ color: '#389E0D' }}>
              Клиника
            </Link>
          </Menu.Item>
          <Divider style={{ margin: '5px', color: '#389E0D' }} />
        </>
      )}
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
            {user.role_name === 'OWNER' ? (
              <>
                <Col lg={2}>
                  <Link to={routes.carriers} style={{ color: '#389E0D' }}>
                    Клиники
                  </Link>
                </Col>
                <Col lg={4} offset={2}>
                  <Link to={routes.applications} style={{ color: '#389E0D' }}>
                    Приемы
                    {isSuccess && unseenNotifications.result.requests > 0 && (
                      <span className="header__nav-link-text_notification">
                        {' '}
                        <BulbOutlined />
                        {unseenNotifications.result.requests}
                      </span>
                    )}
                  </Link>
                </Col>
                <Col lg={5} offset={1}>
                  <Link to={routes.pages.notifications} style={{ color: '#389E0D' }}>
                    Напоминания
                    {isSuccess && unseenNotifications.result.reminders > 0 && (
                      <span className="header__nav-link-text_notification">
                        {' '}
                        <BulbOutlined />
                        {unseenNotifications.result.reminders}
                      </span>
                    )}
                  </Link>
                </Col>
                <Col lg={5} offset={2}>
                  <Link to={routes.profile} style={{ color: '#389E0D' }}>
                    Я и мои питомцы
                  </Link>
                </Col>
              </>
            ) : (
              <>
                <Col lg={3} offset={10}>
                  <Link to={routes.applications} style={{ color: '#389E0D' }}>
                    Приемы
                  </Link>
                </Col>
                <Col lg={3} offset={2}>
                  <Link to={routes.profile} style={{ color: '#389E0D' }}>
                    Клиника
                  </Link>
                </Col>
              </>
            )}
            <Col lg={2} offset={1}>
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
