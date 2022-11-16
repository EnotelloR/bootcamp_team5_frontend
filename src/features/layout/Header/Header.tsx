import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import logo from '../../../image/auth_logo.png';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import './Header.css';
import RoleHeader from './components/roleHeader';
import NotEntered from './components/notEntered';

export const Header = () => {
  const user = useSelector(userSelector);
  return (
    <header>
      <Row
        style={{
          alignItems: 'center',
          paddingTop: '27px',
          paddingBottom: '27px',
          justifyContent: 'space-between',
        }}
      >
        <Col lg={2} xs={4} offset={1}>
          <Link to={routes.main}>
            <img className="header__logo" src={logo} alt="лого котопес" />
          </Link>
        </Col>
        <Col lg={14} xs={17} offset={2}>
          {user.role_name && <RoleHeader user={user} /> ? (
            <RoleHeader user={user} />
          ) : (
            <NotEntered />
          )}
        </Col>
      </Row>
    </header>
  );
};
