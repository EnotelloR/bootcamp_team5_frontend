/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select, Col, Button } from 'antd';
import React, { FC, SetStateAction } from 'react';
import { CityId } from '../../../../screens/CarriersList';
import {
  AnimalsType,
  City,
  SearchParams,
  ServiceType,
} from '../../../../store/petStore/interfaces';
import { IDistrict } from '../../../carriers';

type SelectorsData = City[] | ServiceType[] | IDistrict[] | AnimalsType[] | undefined;

interface SearchSelectorProps {
  cities: SelectorsData;
  services: SelectorsData;
  animals: SelectorsData;
  districts: SelectorsData;
  setInitialState: React.Dispatch<React.SetStateAction<SearchParams>>;
  initialState: SearchParams;
  setCityId: React.Dispatch<SetStateAction<CityId>>;
}

const SearchSelection: FC<SearchSelectorProps> = ({
  cities,
  services,
  animals,
  districts,
  setInitialState,
  setCityId,
  initialState,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const selectHandler = (event: number | string, key: string) => {
    setInitialState({ ...initialState, [key]: event as number });
  };
  const cityHandler = (event: number | string) => {
    setCityId(event as number);
    const { district_id, ...args } = initialState;
    setInitialState({ ...args, city_id: event as number });
    form.resetFields(['districts']);
  };
  const clearHandler = () => {
    form.resetFields(['service', 'city', 'districts', 'animalType']);
    const { search, ...args } = initialState;
    setInitialState({ search });
  };
  return (
    <Form form={form} initialValues={initialState}>
      <Col span={5}>
        <Form.Item name={'service'}>
          <Select
            className="ant-select ant-select-single ant-select-show-arrow"
            placeholder="Вид услуг"
            style={{ width: 250 }}
            onSelect={(event: number | string) => selectHandler(event, 'service_type_id')}
          >
            {services?.map((service) => (
              <Option key={service.id} value={service.id || undefined} id={service.id}>
                {service.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item name={'animalType'}>
          <Select
            placeholder="Виды животных"
            className="ant-select ant-select-single ant-select-show-arrow"
            style={{ width: 250 }}
            onSelect={(event: number | string) => selectHandler(event, 'animal_type_id')}
          >
            {animals?.map((animalType) => (
              <Option key={animalType.id} value={animalType.id}>
                {animalType.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item name={'city'}>
          <Select
            notFoundContent="Yes"
            placeholder="Город"
            className="ant-select ant-select-single ant-select-show-arrow"
            style={{ width: 250 }}
            onSelect={(event: number | string) => cityHandler(event)}
          >
            {cities?.map((city: City) => (
              <Option key={city.id} value={city.id} id={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item name={'districts'}>
          <Select
            placeholder="Район"
            className="ant-select ant-select-single ant-select-show-arrow"
            style={{ width: 250 }}
            onSelect={(event: number | string) => selectHandler(event, 'district_id')}
          >
            {districts?.map((district) => (
              <Option key={district?.id} value={district?.id} id={district?.id}>
                {district?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item>
          <Button style={{ background: '#4E4E4E', color: '#fff' }} onClick={clearHandler}>
            Очистить фильтр
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

export default SearchSelection;
