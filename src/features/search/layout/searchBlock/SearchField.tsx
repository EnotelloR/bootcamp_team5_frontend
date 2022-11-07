import React, { ChangeEvent, FC, SetStateAction, useState } from 'react';
import './SearchField.css';
import { Input } from 'antd';
import {
  useGetAnimalsTypeQuery,
  useGetCityQuery,
  useGetDistrictsByCityQuery,
  useGetServicesQuery,
} from '../../../../store/petStore/api/selectApiSlice';
import { SearchParams } from '../../../../store/petStore/interfaces';
import { CityId } from '../../../../screens/CarriersList';
import Button from 'antd/es/button';
import SearchSelection from '../searchSelect';

interface SearchFieldProps {
  setInitialState: React.Dispatch<React.SetStateAction<SearchParams>>;
  initialState: SearchParams;
  setCityId: React.Dispatch<SetStateAction<CityId>>;
  cityId: number | null;
}

const SearchField: FC<SearchFieldProps> = ({
  setInitialState,
  initialState,
  setCityId,
  cityId,
}) => {
  const [value, setValue] = useState<string>('');

  const { data: cities } = useGetCityQuery();
  const { data: services } = useGetServicesQuery();
  const { data: animalsType } = useGetAnimalsTypeQuery();
  const { data: districts } = useGetDistrictsByCityQuery(cityId as number, {
    skip: !cityId,
  });

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (event.currentTarget.value.length >= 3) {
      setInitialState({ ...initialState, search: event.currentTarget.value });
    } else {
      setValue(event.currentTarget.value);
      const { search, ...params } = initialState;
      setInitialState({ ...params });
    }
  };
  const clearHandler = () => {
    setValue('');
    setInitialState({});
  };

  return (
    <div className="search-container">
      <div>
        <Input
          onChange={(event) => searchHandler(event)}
          name="search"
          id="search"
          bordered={true}
          placeholder="Введите название клиники"
          value={value}
          minLength={3}
          maxLength={64}
        />
      </div>
      <div className="select-container">
        <SearchSelection
          cities={cities?.result}
          services={services?.result}
          animals={animalsType?.result}
          districts={districts?.result}
          initialState={initialState}
          setInitialState={setInitialState}
          setCityId={setCityId}
        />
        <Button onClick={clearHandler}>Очистить фильтр</Button>
      </div>
    </div>
  );
};

export default SearchField;
