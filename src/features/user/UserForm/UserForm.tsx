import React, { FC, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
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

export const UserForm: FC<TUser> = ({ user }) => {
  const dispatch = useDispatch();
  const { getterUser } = useApiHooks();

  const image = user.owner && user.owner.picture_url ? user.owner.picture_url : cap;
  const avatarInput = document.querySelector('form.user-form__form input[type=url]');

  const [cities, setCities] = useState<Array<TCity>>([]);
  const [discticts, setDiscticts] = useState<Array<TDistrict>>([]);

  const getCities = () => {
    dispatch(startLoading());
    Api.getCity()
      .then((res) => {
        setCities(res.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };
  const getDisctict = (id: number) => {
    dispatch(startLoading());
    Api.getDistrict(id!)
      .then((res) => {
        setDiscticts(res.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };

  const openInputAvatar = () => {
    !isFirth && avatarInput?.removeAttribute('hidden');
  };

  const onFinish = (event: IDataUser) => {
    dispatch(startLoading());
    Api.postUsersData(event)
      .then(() => getterUser())
      .finally(() => dispatch(endLoading()));
  };

  const isFirth = user.owner ? true : false;

  return (
    <>
      <h2 className="user-form__title">Привет!</h2>
      <div className="user-form__avatar-box">
        <div
          className="user-form__avatar-conteiner"
          onClick={openInputAvatar}
          onKeyDown={openInputAvatar}
        >
          <img src={image} alt="Аватар пользователя" className="user-form__avatar" />
        </div>
        <div className="user-form__text">
          <p>
            <span className="user-form__span">Рекомендуемое разрешение:</span> 640х640
            пикселей
          </p>
          <p>
            <span className="user-form__span">Максимальный размер:</span> 5 МБ
          </p>
        </div>
        {/* <Button type="primary" htmlType="button" className="user-form__btn" onClick={onChange}>
          Изменить
        </Button> */}
      </div>
      <Form
        className="user-form__form"
        name="basic"
        size="middle"
        onFinish={(event) => onFinish(event)}
        onFinishFailed={(event) => console.log(event, 'error')}
        initialValues={{
          lastname: user.owner?.lastname,
          firstname: user.owner?.firstname,
          phone: user.owner?.phone,
        }}
        autoComplete="on"
        disabled={isFirth}
      >
        <Form.Item
          name="picture_url"
          rules={[{ type: 'url', message: 'Введите ссылку на ваш аватар' }]}
        >
          <Input type="url" hidden placeholder="Cсылка на ваш аватар"></Input>
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
          <Input type="text" maxLength={32} placeholder="Имя"></Input>
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

        <Form.Item>
          <p className="user-form__psevdo-input">{user.email!}</p>
        </Form.Item>

        {isFirth ? (
          <>
            <Form.Item>
              <p className="user-form__psevdo-input">{user.owner!.city_name}</p>
            </Form.Item>

            <Form.Item>
              <p className="user-form__psevdo-input">{user.owner!.district_name}</p>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="city_id"
              rules={[{ required: true, message: 'Выберите город из списка' }]}
            >
              <Select
                placeholder="Выберите город из списка"
                onClick={getCities}
                onSelect={getDisctict}
              >
                {cities.map((city) => {
                  return (
                    <Select.Option value={city.id} key={city.id}>
                      {city.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            {discticts.length !== 0 && (
              <Form.Item name="district_id">
                <Select placeholder="Выберите район из списка">
                  {discticts.map((disctict) => {
                    return (
                      <Select.Option value={disctict.id} key={disctict.id}>
                        {disctict.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
          </>
        )}
        <Button type="primary" htmlType="submit" className="user-form__btn">
          Сохранить
        </Button>
      </Form>
    </>
  );
};
