import { Button, Form, Input, Select } from 'antd';
import AvatarIcon from '../../../image/avatar.png';
import React, { useEffect, useState } from 'react';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ICarrier, Ierror, user } from '../../../services/types/authTypes';
import Api from '../../../utils/Api';
import { useApiHooks } from '../../../hooks/ApiHooks';
import { Icity, IDistrict, IserviceType } from '../CarrierProfile';

const validateMessages = {
  required: 'Поле обязательное. ',
  string: {
    min: 'Минимальное количество символов: ${min}. ',
    max: 'Максимальное количество символов: ${max}. ',
    len: 'Длина телефона должна быть ${len} символов',
  },
};

interface MainInfoProps {
  user: user;
  getDistricts: (id: number) => void;
  cities: Icity[];
  serviceTypes: IserviceType[];
  districts: IDistrict[];
}

export const CarrierMainInfoForm = ({
  user,
  getDistricts,
  cities,
  districts,
  serviceTypes,
}: MainInfoProps) => {
  const { getterUser } = useApiHooks();
  const [isEditing, setIsEditing] = useState<boolean>(true);

  useEffect(() => {
    if (user.carrier) setIsEditing(false);
  }, []);

  const onFinish = (values: ICarrier) => {
    if (!navigator.onLine) {
      //showErrorModal(noInternetErrText);
      return;
    }
    Api.postCarrierData(values)
      .then(() => {
        getterUser();
        setIsEditing(false);
      })
      .catch((err) => {
        err.json().then((error: Ierror) => {
          //showErrorModal(ErrorHandler.handleError(error));
          console.log(error);
        });
      });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className="carrierProfile__form carrierProfile__form_type_main-info"
      name="basic"
      size="middle"
      initialValues={{ email: user.email }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <div className="carrierProfile__avatar-container">
        <img
          className="carrierProfile__avatar-icon"
          src={user.carrier?.picture_url || AvatarIcon}
          alt="нажмите для изменения аватара"
        />

        <div className="carrierProfile__formats">
          <p className="carrierProfile__format">
            Форматы:
            <span className="carrierProfile__text-accent"> .jpg, .jpeg, .png</span>
          </p>
          <p className="carrierProfile__format">
            Рекомендуемое разрешение:
            <span className="carrierProfile__text-accent"> 640х640 пикселей</span>
          </p>
          <p className="carrierProfile__format">
            Максимальный размер:
            <span className="carrierProfile__text-accent"> 5 МБ</span>
          </p>
        </div>
      </div>

      <Form.Item
        className="carrierProfile__avatar-input"
        name="picture_url"
        initialValue={user.carrier?.picture_url}
        rules={[
          () => ({
            validator(_, value) {
              if (/^http(s)?:\/\/([\w-]+.)+[\w-]+(\/[\w- ./?%&=])?$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Необходимо ввести ссылку на картинку'));
            },
          }),
        ]}
      >
        <Input placeholder="Введите url картинки" disabled={!isEditing} />
      </Form.Item>

      <div className="carrierProfile__form-container carrierProfile__form-container_type_first">
        <Form.Item
          name="name"
          rules={[{ required: true }, { max: 64 }]}
          initialValue={user.carrier?.name}
        >
          <Input placeholder="Введите название" disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="about_us"
          rules={[{ required: true, message: 'Введите информацию о компании.' }]}
          initialValue={user.carrier?.about_us}
        >
          <Input.TextArea
            rows={6}
            placeholder="Введите информацию о компании"
            showCount
            maxLength={1024}
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item
          name="url"
          rules={[
            () => ({
              validator(_, value) {
                if (/^http(s)?:\/\/([\w-]+.)+[\w-]+(\/[\w- ./?%&=])?$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Необходимо ввести ссылку на сайт компании.'),
                );
              },
            }),
          ]}
          initialValue={user.carrier?.url}
        >
          <Input placeholder="Введите адрес сайта" disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true },
            { type: 'email', message: 'Введите email' },
            { max: 40 },
            () => ({
              validator(_, value) {
                if (/^[0-9a-zA-Z._\-ʼ+@]+$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Разрешены только латинские буквы, цифры и символы: ._-ʼ+@'),
                );
              },
            }),
          ]}
        >
          <Input placeholder="Введите email" className="auth__input" disabled />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, len: 11 }]}
          initialValue={user.carrier?.phone}
        >
          <Input
            placeholder="Введите номер телефона"
            type="number"
            disabled={!isEditing}
          />
        </Form.Item>
      </div>
      <div className="carrierProfile__form-container carrierProfile__form-container_type_second">
        <Form.Item name="city_id" rules={[]} initialValue={user.carrier?.city_id}>
          <Select
            placeholder="Выберите город"
            onChange={(id) => getDistricts(id)}
            disabled={!isEditing}
          >
            {cities?.map((city, index) => (
              <Select.Option key={`${index}_${city.name}`} value={city.id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="district_id" rules={[]} initialValue={user.carrier?.district_id}>
          <Select placeholder="Выберите район" disabled={!isEditing}>
            {districts.map((district, index) => {
              return (
                <Select.Option key={`${index}_${district.name}`} value={district.id}>
                  {district.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true }]}
          initialValue={user.carrier?.address}
        >
          <Input placeholder="Введите адрес" disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="schedule" rules={[]} initialValue={user.carrier?.schedule}>
          <Input placeholder="Введите время работы" disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="service_type_ids"
          rules={[
            {
              required: true,
              message: 'Поле обязательное для заполнения.',
              type: 'array',
            },
          ]}
          initialValue={user.carrier?.service_types.map((type) => type.id)}
        >
          <Select mode="multiple" placeholder="Выберите виды услуг" disabled={!isEditing}>
            {serviceTypes.map(({ id, name }, index) => (
              <Select.Option key={`${index}_${name}`} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {isEditing ? (
          <Form.Item className="carrierProfile__submit-item">
            <Button
              type="primary"
              htmlType="submit"
              className="carrierProfile__submit-btn"
            >
              Сохранить
            </Button>
          </Form.Item>
        ) : (
          <Button
            htmlType="button"
            className="ant-form-item carrierProfile__submit-btn"
            onClick={() => setIsEditing(true)}
          >
            Изменить
          </Button>
        )}
      </div>
    </Form>
  );
};
