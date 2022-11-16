/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FC, SetStateAction, useState } from 'react';
import './SearchField.css';
import { Col, Input, Row, Form } from 'antd';
import { SearchParams } from '../../../../store/petStore/interfaces';
import { CityId } from '../../../../screens/CarriersList';
import { SearchOutlined } from '@ant-design/icons';

interface SearchFieldProps {
  setInitialState: React.Dispatch<React.SetStateAction<SearchParams>>;
  initialState: SearchParams;
  setCityId: React.Dispatch<SetStateAction<CityId>>;
  cityId: number | null;
}

const SearchField: FC<SearchFieldProps> = ({ setInitialState, initialState }) => {
  const [value, setValue] = useState<string>('');
  const [form] = Form.useForm();

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

  return (
    <Form initialValues={initialState} form={form}>
      <Row>
        <Col lg={18} offset={6} xs={18}>
          <Form.Item style={{ position: 'relative' }}>
            <Input
              onChange={(event) => searchHandler(event)}
              name="search"
              id="search"
              bordered={true}
              placeholder="Введите название клиники или услуги"
              value={value}
              minLength={3}
              maxLength={64}
            />
            <SearchOutlined
              style={{ position: 'absolute', right: '10px', top: '8px', color: '#000' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchField;
