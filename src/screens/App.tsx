import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../features/layout';
import { NotFound } from './NotFound';
import { useSelector } from 'react-redux';
import { routes } from '../routes/routes';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { Main } from './Main';
import { Profile } from './Profile';
import { loadSelector } from '../store/slices/load/loadSelectors';
import Api from '../utils/Api';
import { useApiHooks } from '../hooks/ApiHooks';
import { Loading } from '../features/layout';
import { ForgotPassword } from './ForgotPassword';
import { ChangePassword } from './ChangePassword';
import { NewAnimal } from './NewAnimal';
import { AnimalsPage } from './AnimalsPage';
import { CarriersList } from './CarriersList';
import { CreateAppointment } from './CreateAppointment';
import { CarrierPage } from './CarrierPage';
import { AppointmentPage } from './AppointmentPage';
import { ApplicationsScreen } from './Applications';
import { ConfirmEmailScreen } from './ConfirmEmailScreen';

export function App() {
  const { getterUser } = useApiHooks();
  const isLoad = useSelector(loadSelector);

  useEffect(() => {
    checkIsRemembered();
  }, []);

  function checkIsRemembered() {
    const token = localStorage.getItem('token');
    if (token) {
      Api.setToken(token, true);
      getterUser();
    }
  }

  return (
    <div className="app">
      <Header />
      {isLoad && <Loading />}
      <Routes>
        <Route path={routes.main} element={<Main />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.carrier} element={<CarrierPage />} />
        <Route path={routes.carriers} element={<CarriersList />} />
        <Route path={routes.carrierCreateAppointment} element={<CreateAppointment />} />
        <Route path={routes.appointment} element={<AppointmentPage />} />
        <Route path={routes.forgotPass} element={<ForgotPassword />} />
        <Route path={routes.pages.changePasswordPage()} element={<ChangePassword />} />
        <Route path={routes.pages.confirmEmail} element={<ConfirmEmailScreen />} />
        <Route path={routes.signIn} element={<SignIn />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.newAnimal} element={<NewAnimal />} />
        <Route path={routes.animal} element={<AnimalsPage />} />
        <Route path={routes.applications} element={<ApplicationsScreen />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </div>
  );
}
