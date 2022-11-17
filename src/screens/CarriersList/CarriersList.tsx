import React, { FC, useState } from 'react';
import './CarriersList.css';
import { CarrierListItem } from '../../features/carriers/CarrierListItem';
import SearchField from '../../features/search/layout/searchBlock';
import { useGetCarrierQuery } from '../../store/petStore/api/carriersApiSlice';
import { Carrier, SearchParams } from '../../store/petStore/interfaces';
import { Col, Row } from 'antd';
import SearchSelection from '../../features/search/layout/searchSelect';
import {
  useGetCityQuery,
  useGetDistrictsByCityQuery,
  useGetServicesQuery,
} from '../../store/petStore/api/selectApiSlice';
import { useGetAnimalsTypeQuery } from '../../features/animals/animals.service';

export type CityId = null | number;

export const CarriersList: FC = () => {
  const [initialState, setInitialState] = useState<SearchParams>({});
  const [cityId, setCityId] = useState<null | number>(null);
  const { data, isLoading } = useGetCarrierQuery(initialState);
  const { data: cities } = useGetCityQuery();
  const { data: services } = useGetServicesQuery();
  const { data: animalsType } = useGetAnimalsTypeQuery();
  const { data: districts } = useGetDistrictsByCityQuery(cityId as number, {
    skip: !cityId,
  });

  return (
    <section className="carriers">
      <SearchField
        setInitialState={setInitialState}
        initialState={initialState}
        setCityId={setCityId}
        cityId={cityId}
      />
      <Row>
        <Col lg={3}>
          <SearchSelection
            initialState={initialState}
            setInitialState={setInitialState}
            cities={cities?.result}
            services={services?.result}
            animals={animalsType?.result}
            districts={districts?.result}
            setCityId={setCityId}
          />
        </Col>
        <Col lg={19} offset={2}>
          {data?.result.length !== 0 ? (
            <ul className="carriers__list">
              {!isLoading
                ? data?.result.map((carrier: Carrier) => (
                    <li key={carrier.id}>
                      <CarrierListItem carrier={carrier} />
                    </li>
                  ))
                : 'Подождите, данные загружаются'}
            </ul>
          ) : (
            <Col lg={19} offset={2}>
              По вашему запросу ничего не найдено
            </Col>
          )}
        </Col>
      </Row>
    </section>
  );
};
