import React, { FC, useState } from 'react';
import { Avatar, Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import cap from '../../../image/cap.png';
import { IDataUser, user } from '../../../services/types/authTypes';
import './UserForm.css';
import Api from '../../../utils/Api';
import { endLoading, startLoading } from '../../../store/slices/load/loadSlice';
import { useDispatch } from 'react-redux';
import { useApiHooks } from '../../../hooks/ApiHooks';

export type TUser = {
  user: user;
};

interface UserFormProps {
  user: user;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

type TCity = {
  id: number;
  name: string;
};

type TDistrict = {
  id: number;
  name: string;
  city_id: number;
  city_name: string;
};

export const UserForm: FC<UserFormProps> = ({ user, setUpdate }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { getterUser } = useApiHooks();
  const [initialValues, setInitialValues] = useState({
    email: user.email,
    ...user.owner,
  });
  const [citiesOptions, setCitiesOptions] = useState([
    {
      value: initialValues.city_id,
      label: initialValues.city_name,
    },
  ]);

  const [districtsOptions, setDisctictsOptions] = useState([
    {
      value: initialValues.district_id,
      label: initialValues.district_name,
    },
  ]);

  const getCities = () => {
    dispatch(startLoading());
    form.resetFields(['district_id']);
    setDisctictsOptions([{ value: undefined, label: undefined }]);
    setInitialValues({
      ...initialValues,
      district_id: undefined,
      district_name: undefined,
    });
    Api.getCity()
      .then((res) => {
        const cities = res.result.map((city: TCity) => ({
          value: city.id,
          label: city.name,
        }));
        setCitiesOptions(cities);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };
  const getDisctict = (id: number) => {
    dispatch(startLoading());
    Api.getDistrict(id)
      .then((res) => {
        const newDistrictsOptions = res.result.map((district: TDistrict) => ({
          value: district.id,
          label: district.name,
        }));
        setDisctictsOptions(newDistrictsOptions);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };

  const onFinish = (event: IDataUser) => {
    Api.postUsersData(event)
      .then(() => getterUser())
      .finally(() => setUpdate(false));
  };

  return (
    <>
      <Col>
        <Typography.Title level={3}>Изменение данных пользователя</Typography.Title>
      </Col>
      <Col>
        <Form
          className="user-form__form"
          form={form}
          name="basic"
          size="middle"
          onFinish={(event) => onFinish(event)}
          onFinishFailed={(event) => console.log(event, 'error')}
          initialValues={initialValues}
          autoComplete="on"
        >
          <Form.Item
            name="picture_url"
            rules={[{ type: 'url', message: 'Введите ссылку на ваш аватар' }]}
          >
            <Input type="url" placeholder="Cсылка на ваш аватар" />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: 'Фамилия - обязательное поле' },
              { type: 'string', message: 'Введите Фамилию' },
            ]}
          >
            <Input type="text" maxLength={32} placeholder="Фамилия"></Input>
          </Form.Item>

          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: 'Имя - обязательное поле' },
              { type: 'string', message: 'Введите Имя' },
            ]}
          >
            <Input type="text" maxLength={32} placeholder="Имя" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Номер телефона - обязательное поле' },
              { type: 'string', message: 'Введите телефон' },
            ]}
          >
            <Input
              type="tel"
              pattern="[+]?\d{11}"
              value={user.owner?.phone}
              placeholder="Введите ваш телефона в формате  +79000000000 или 8900000000"
            ></Input>
          </Form.Item>

          <Form.Item name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="city_id"
            rules={[{ required: true, message: 'Выберите город из списка' }]}
          >
            <Select
              placeholder="Выберите город из списка"
              onSelect={(event: number | string) => getDisctict(event as number)}
              onClick={getCities}
              options={citiesOptions}
            />
          </Form.Item>
          <Form.Item name="district_id">
            <Select placeholder="Выберите район из списка" options={districtsOptions} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="user-form__btn">
            Сохранить
          </Button>
        </Form>
      </Col>
    </>
  );
};
