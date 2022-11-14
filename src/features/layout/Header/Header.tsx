import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import logo from '../../../image/auth_logo.png';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import Entered from './components/entered';
import NotEntered from './components/notEntered';
import './Header.css';

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
          {user.email ? <Entered /> : <NotEntered />}
        </Col>
      </Row>
    </header>
  );
};

// import React, { useMemo } from 'react';
// import './Header.css';
// import { useNavigate } from 'react-router-dom';
// import { routes } from '../../../routes/routes';
// import { useDispatch, useSelector } from 'react-redux';
// import { userSelector } from '../../../store/slices/auth/authSelectors';
// import { logout } from '../../../store/slices/auth/authSlice';
// import Api from '../../../utils/Api';
// import logo from '../../../image/auth_logo.png';
// import profileIcon from '../../../image/profile-icon.png';
// import burgerMenuIcon from '../../../image/burger-menu-icon.png';
// import { Button, Dropdown, Menu } from 'antd';
// import { HeaderNavLink } from '../HeaderNavLink';
// import { useGetApplicationsQuery } from '../../applications';

// const loggedInNavLinks = [
//   {
//     route: routes.carriers,
//     text: 'Клиники',
//   },
//   {
//     route: routes.applications,
//     text: 'Приемы',
//   },
//   {
//     route: '/',
//     text: 'Напоминания',
//   },
//   {
//     route: routes.profile,
//     text: 'Я и мои питомцы',
//   },
// ];

// interface navLink {
//   route: string;
//   text: string;
// }

// export function Header() {
// const navigate = useNavigate();
// const user = useSelector(userSelector);
//   const dispatch = useDispatch();

//   const { data } = useGetApplicationsQuery();

//   const newNotifications = useMemo(() => {
//     return data?.result.reduce<number>(
//       (result, current) => result + (current.is_new ? 1 : 0),
//       0,
//     );
//   }, [data]);

// function logoutUser() {
//   dispatch(logout());
//   Api.clearToken();
//   localStorage.removeItem('token');
//   navigate(routes.main);
// }

//   const makeItems = (itemsArr: navLink[], isLoggedIn = false) => {
//     const resultArr: { key: number; label: JSX.Element }[] = [];
//     const handleClick = (item: navLink) =>
//       isLoggedIn ? logoutUser() : navigate(item.route);
//     itemsArr.forEach((item, index) => {
//       resultArr.push({
//         key: index,
//         label: <button onClick={() => handleClick(item)}>{item.text}</button>,
//       });
//     });
//     return resultArr;
//   };

//   return (
//     <header className="header">
//       <div className="header__container">
//         <div className="header__item header__item_type_logo">
// <img
//   className="header__logo"
//   src={logo}
//   alt="лого котопес"
//   onClick={() => navigate(routes.main)}
//   onKeyDown={() => navigate(routes.main)}
// />
//         </div>
//         <nav className="header__item header__item_type_nav">
//           {user.email ? (
//             <ul className="header__nav-links">
//               {loggedInNavLinks.map(
//                 ({ route, text }, index) =>
//                   text === loggedInNavLinks[1].text ? (
//                     <HeaderNavLink
//                       route={route}
//                       text={text}
//                       key={index}
//                       additional={newNotifications}
//                     />
//                   ) : (
//                     <HeaderNavLink route={route} text={text} key={index} />
//                   ),

//                 // <HeaderNavLink
//                 //   route={link.route}
//                 //   text={link.text}
//                 //   key={index}
//                 //   additional={newNotifications}
//                 // />
//               )}
//             </ul>
//           ) : null}
//         </nav>
//         <div className="header__item header__item_type_auth">
//           <div className="header__auth-container header__auth-container_type_desktop">
//             {user.email ? (
//               <>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="header__primary-button"
//                   onClick={() => navigate(routes.profile)}
//                 >
//                   {user.email}
//                 </Button>
// <Button
//   type="link"
//   className="header__secondary-button"
//   onClick={() => logoutUser()}
// >
//   Выход
// </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   type="link"
//                   className="header__secondary-button"
//                   onClick={() => navigate(routes.signIn)}
//                 >
//                   ВОЙТИ
//                 </Button>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="header__primary-button"
//                   onClick={() => navigate(routes.signUp)}
//                 >
//                   РЕГИСТРАЦИЯ
//                 </Button>
//               </>
//             )}
//           </div>
//           <div className="header__auth-container header__auth-container_type_mobile">
//             {
//               <Dropdown
//                 overlay={<Menu items={makeItems(loggedInNavLinks)} />}
//                 placement="bottomRight"
//               >
//                 <Button className="header__mobile-menu-button">
//                   <img
//                     className="header__profile-icon"
//                     src={burgerMenuIcon}
//                     alt="profile-icon"
//                   />
//                 </Button>
//               </Dropdown>
//             }
//             {
//               <Dropdown
//                 overlay={
//                   <Menu
//                     items={
//                       user.email
//                         ? [
//                             {
//                               key: '1',
//                               label: (
//                                 <span
//                                   className="header__mobile-menu-item"
//                                   onClick={() => navigate(routes.profile)}
//                                   onKeyDown={() => navigate(routes.profile)}
//                                 >
//                                   {user.email}
//                                 </span>
//                               ),
//                             },
//                             {
//                               key: '2',
//                               label: (
//                                 <span
//                                   className="header__mobile-menu-item"
//                                   onClick={() => logoutUser()}
//                                   onKeyDown={() => logoutUser()}
//                                 >
//                                   Выход
//                                 </span>
//                               ),
//                             },
//                           ]
//                         : [
//                             {
//                               key: '1',
//                               label: (
//                                 <span
//                                   className="header__mobile-menu-item"
//                                   onClick={() => navigate(routes.signIn)}
//                                   onKeyDown={() => navigate(routes.signIn)}
//                                 >
//                                   Вход
//                                 </span>
//                               ),
//                             },
//                             {
//                               key: '2',
//                               label: (
//                                 <span
//                                   className="header__mobile-menu-item"
//                                   onClick={() => navigate(routes.signUp)}
//                                   onKeyDown={() => navigate(routes.signUp)}
//                                 >
//                                   Регистрация
//                                 </span>
//                               ),
//                             },
//                           ]
//                     }
//                   />
//                 }
//                 placement="bottomRight"
//               >
//                 <Button className="header__mobile-menu-button">
//                   <img
//                     className="header__profile-icon"
//                     src={profileIcon}
//                     alt="profile-icon"
//                   />
//                 </Button>
//               </Dropdown>
//             }
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
