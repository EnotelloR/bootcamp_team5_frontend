import { Button, Form, Select } from 'antd';
import { Ierror, user } from '../../../services/types/authTypes';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { useState } from 'react';
import { IanimalType, IclinicService } from '../CarrierProfile';
import Api from '../../../utils/Api';
import { useApiHooks } from '../../../hooks/ApiHooks';

interface IvetClinicProps {
  animalTypes: IanimalType[];
  clinicServices: IclinicService[];
  user: user;
}

interface IvetClinicFormValues {
  animal_types: number[];
  clinic_services: number[];
}

const validateMessages = {
  required: 'Поле обязательное. ',
  string: {
    min: 'Минимальное количество символов: ${min}. ',
    max: 'Максимальное количество символов: ${max}. ',
    len: 'Длина телефона должна быть ${len} символов',
  },
};

export const CarrierVetClinicForm = ({
  animalTypes,
  clinicServices,
  user,
}: IvetClinicProps) => {
  const { getterUser } = useApiHooks();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onFinish = ({ animal_types, clinic_services }: IvetClinicFormValues) => {
    Promise.all([
      Api.setAnimalTypes({ ids: animal_types }),
      Api.setClinicServices({ ids: clinic_services }),
    ])
      .then((result) => {
        getterUser();
        setIsEditing(false);
      })
      .catch((err) => {
        err
          .json()
          .then((error: Ierror) => {
            //showErrorModal(ErrorHandler.handleError(error));
            console.log(error);
          })
          .catch((err: any) => {
            console.log(err);
          });
      });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    alert('Ошибка отправки формы');
    console.log(errorInfo);
  };

  return (
    <Form
      className="carrier-profile__form carrier-profile__form_type_vet-clinic"
      name="basic"
      size="middle"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item
        name="animal_types"
        className="carrier-profile__form-item carrier-profile__form-item_type_animal-types"
        rules={[
          { required: true, message: 'Поле обязательное для заполнения.', type: 'array' },
        ]}
        initialValue={user.carrier?.animal_types.map((type) => type.id)}
      >
        <Select
          mode="multiple"
          placeholder="Виды обслуживаемых животных (из списка)"
          disabled={!isEditing}
        >
          {animalTypes.map(({ id, name }, index) => (
            <Select.Option key={`${index}_${name}`} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="clinic_services"
        className="carrier-profile__form-item carrier-profile__form-item_type_clinic_services"
        rules={[
          { required: true, message: 'Поле обязательное для заполнения.', type: 'array' },
        ]}
        initialValue={user.carrier?.clinic_services.map((type) => type.id)}
      >
        <Select
          mode="multiple"
          placeholder="Список услуг (из списка)"
          disabled={!isEditing}
        >
          {clinicServices.map(({ id, name }, index) => (
            <Select.Option key={`${index}_${name}`} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {isEditing ? (
        <Form.Item className="carrier-profile__form-item carrier-profile__form-item_type_vet-clinic-submit-btn">
          <Button
            type="primary"
            htmlType="submit"
            className="carrier-profile__btn-submit carrier-profile__btn-submit_type_services"
          >
            Сохранить
          </Button>
        </Form.Item>
      ) : (
        <Button
          htmlType="button"
          className="carrier-profile__form-item_type_vet-clinic-submit-btn ant-form-item carrier-profile__submit-btn"
          onClick={() => setIsEditing(true)}
        >
          Изменить
        </Button>
      )}
    </Form>
  );
};
