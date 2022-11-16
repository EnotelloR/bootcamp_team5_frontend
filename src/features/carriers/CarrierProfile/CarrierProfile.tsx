import React, { useEffect, useState } from 'react';
import './CarrierProfile.css';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import Api from '../../../utils/Api';
import { CarrierMainInfoForm } from '../CarrierMainInfoForm';
import { CarrierVetClinicForm } from '../CarrierVetСlinicForm';

export interface Icity {
  id: number;
  name: string;
}

export interface IDistrict {
  id: number;
  name: string;
  city_id: number;
  city_name: string;
}

export interface IserviceType {
  id: number;
  name: string;
}

export interface IserviceTabsMap {
  [id: number]: JSX.Element;
}

export interface IanimalType {
  id: number;
  name: string;
}

export interface IclinicService {
  id: number;
  name: string;
}

export const CarrierProfile = () => {
  const [cities, setCities] = useState<Icity[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [serviceTypes, setServiceTypes] = useState<IserviceType[]>([]);
  const [animalTypes, setAnimalTypes] = useState<IanimalType[]>([]);
  const [clinicServices, setClinicServices] = useState<IclinicService[]>([]);

  const user = useSelector(userSelector);

  useEffect(() => {
    getCities();
    getServiceTypes();
    getAnimalTypes();
    getClinicServices();
    if (user.carrier) {
      getDistricts(user.carrier.city_id);
    }
  }, []);

  const getCities = () => {
    Api.getCity()
      .then(({ result }) => setCities(result))
      .catch((err) => console.log(err));
  };

  const getDistricts = (id: number) => {
    Api.getDistrict(id)
      .then(({ result }) => setDistricts(result))
      .catch((err) => console.log(err));
  };

  const getServiceTypes = () => {
    Api.getServiceTypes()
      .then(({ result }) => setServiceTypes(result))
      .catch((err) => console.log(err));
  };

  const getAnimalTypes = () => {
    Api.getKinds()
      .then(({ result }) => setAnimalTypes(result))
      .catch((err) => {
        console.log(err);
      });
  };

  const getClinicServices = () => {
    Api.getClinicServices()
      .then(({ result }) => setClinicServices(result))
      .catch((err) => {
        console.log(err);
      });
  };

  const serviceTabsMap: IserviceTabsMap = {
    1: (
      <CarrierVetClinicForm
        animalTypes={animalTypes}
        clinicServices={clinicServices}
        user={user}
      />
    ),
    2: <span>2</span>,
    3: <span>3</span>,
    4: <span>4</span>,
  };

  const makeTabs = () => {
    const resultTabs = [];
    const carrierServiceTypes = user.carrier?.service_types;
    resultTabs.push({
      label: 'Общая информация',
      key: 'main-info',
      children: (
        <CarrierMainInfoForm
          user={user}
          getDistricts={getDistricts}
          cities={cities}
          serviceTypes={serviceTypes}
          districts={districts}
        />
      ),
    });
    if (carrierServiceTypes) {
      carrierServiceTypes.forEach(({ id, name }) => {
        resultTabs.push({
          label: name,
          key: id,
          children: serviceTabsMap[id],
        });
      });
    }
    return resultTabs;
  };

  return (
    <section className="carrierProfile">
      <Tabs
        type="card"
        items={makeTabs()}
        className={`carrierProfile__tabs ${
          user.carrier ? 'carrierProfile__tabs_visible' : 'carrierProfile__tabs_hidden'
        }`}
      />
    </section>
  );
};
