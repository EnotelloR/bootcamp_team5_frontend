import React, { ChangeEvent, FC, SetStateAction, useRef, useState } from 'react';
import './SearchField.css';
import { Col, Input, Row, Form } from 'antd';
import {
  useGetCityQuery,
  useGetDistrictsByCityQuery,
  useGetServicesQuery,
} from '../../../../store/petStore/api/selectApiSlice';
import { SearchParams } from '../../../../store/petStore/interfaces';
import { CityId } from '../../../../screens/CarriersList';
import Button from 'antd/es/button';
import SearchSelection from '../searchSelect';
import { useGetAnimalsTypeQuery } from '../../../animals/animals.service';
import FormItem from 'antd/es/form/FormItem';

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
  const [form] = Form.useForm();
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
  console.log('before', initialState);
  const clearHandler = () => {
    setValue('');
    form.resetFields(['service', 'city', 'districts', 'animalType']);
    setInitialState({});
  };

  return (
    <Form initialValues={initialState} form={form} className="search-container">
      <Row>
        <Col>
          <Form.Item>
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
          </Form.Item>
        </Col>
      </Row>
      <Row className="select-container">
        <SearchSelection
          cities={cities?.result}
          services={services?.result}
          animals={animalsType?.result}
          districts={districts?.result}
          initialState={initialState}
          setInitialState={setInitialState}
          setCityId={setCityId}
        />
        <Col span={4}>
          <Form.Item>
            <Button onClick={clearHandler}>Очистить фильтр</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchField;
