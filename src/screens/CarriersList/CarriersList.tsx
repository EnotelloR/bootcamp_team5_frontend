import React, { FC, useState } from 'react';
import './CarriersList.css';
import { CarrierListItem } from '../../features/carriers/CarrierListItem';
import SearchField from '../../features/search/layout/searchBlock';
import { useGetCarrierQuery } from '../../store/petStore/api/carriersApiSlice';
import { Carrier, SearchParams } from '../../store/petStore/interfaces';

export type CityId = null | number;

export const CarriersList: FC = () => {
  const [initialState, setInitialState] = useState<SearchParams>({});
  const [cityId, setCityId] = useState<null | number>(null);
  const { data, isLoading } = useGetCarrierQuery(initialState);

  return (
    <section className="carriers">
      <h3 className="carriers__title">НАШИ УСЛУГИ</h3>
      <SearchField
        setInitialState={setInitialState}
        initialState={initialState}
        setCityId={setCityId}
        cityId={cityId}
      />
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
        'По вашему запросу ничего не найдено'
      )}
    </section>
  );
};
