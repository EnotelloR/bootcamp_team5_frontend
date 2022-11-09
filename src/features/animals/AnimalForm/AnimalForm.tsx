/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import cap from '../../../image/cap.png';
import './AnimalForm.css';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../../store/slices/load/loadSlice';
import Api from '../../../utils/Api';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { TAnimalSend } from '../../../services/types/animalsTypes';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import moment from 'moment';
import type { RangePickerProps } from 'antd/es/date-picker';
import {
  useGetAnimalsGenderQuery,
  useGetAnimalsTypeQuery,
  useGetBeersByAnimalsTypeIdQuery,
} from '../animals.service';

export const AnimalForm: FC<{ isNew: boolean; animal?: Readonly<TAnimalSend> }> = ({
  isNew,
  animal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const [actualKinds, setActialKinds] = useState<null | number>(null);
  const { data: kinds } = useGetAnimalsTypeQuery();
  const { data: actualBreeds } = useGetBeersByAnimalsTypeIdQuery(actualKinds as number, {
    skip: !actualKinds,
  });
  const { data: genders } = useGetAnimalsGenderQuery();

  const disabledDate: RangePickerProps['disabledDate'] | undefined = (current) => {
    return (
      current &&
      (current > moment().endOf('day') ||
        current < moment(new Date(Date.UTC(1970, 0, 1))).endOf('day'))
    );
  };

  // Уточнить насчет срока годности чипа (я узнал что его нет), если я прав,  то можно будет сделать disabledDate для чипа

  const getDates = () => {
    if (animal?.chip_start_date) {
      return [
        moment(animal?.chip_start_date, 'DD/MM/YYYY'),
        moment(animal?.chip_end_date, 'DD/MM/YYYY'),
      ];
    } else {
      return undefined;
    }
  };

  const defaultValues = isNew
    ? undefined
    : {
        ...animal,
        birthday: moment(animal?.birthday, 'DD/MM/YYYY'),
        weight: String(animal?.['weight']),
        chip_number: String(animal?.['chip_number']),
        chip_date: getDates(),
      };
  const getAnimalBreedsByType = (event: number) => setActialKinds(event);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (event: TAnimalSend & { chip_date: any }) => {
    dispatch(startLoading());
    const values = {
      ...event,
      birthday: event['birthday'].format('DD/MM/YYYY'),
      chip_number: Number(event['chip_number']),
      chip_start_date: event['chip_date']
        ? event['chip_date'][0].format('DD/MM/YYYY')
        : undefined,
      chip_end_date: event['chip_date']
        ? event['chip_date'][1].format('DD/MM/YYYY')
        : undefined,
      chip_date: undefined,
    };
    isNew
      ? Api.postNewAnamal(values)
          .then(() => {
            navigate(routes.profile);
          })
          .catch((err) => {
            alert(`Ой, что то пошло не так. Подробности в консоле.`);
            console.log(err);
          })
          .finally(() => dispatch(endLoading()))
      : Api.putAnimal(animal!.pet_id!, values)
          .then(() => {
            navigate(routes.profile);
          })
          .catch((err) => {
            alert(`Ой, что то пошло не так. Подробности в консоле.`);
            console.log(err);
          })
          .finally(() => dispatch(endLoading()));
    console.log(isNew);
  };

  return (
    <section className="animal__section">
      {isNew && (
        <div className="animal__avatar-box">
          <div className="animal__avatar-conteiner">
            <img src={cap} alt="Фотография вашего животного" className="animal__avatar" />
          </div>
          <div className="animal__text">
            <p>
              <span className="animal__span">Рекомендуемое разрешение:</span> 640х640
              пикселей
            </p>
            <p>
              <span className="animal__span">Максимальный размер:</span> 5 МБ
            </p>
          </div>
        </div>
      )}
      <Form
        className="animal__form"
        name="Animal"
        size="middle"
        onFinish={(event) => onFinish(event)}
        onFinishFailed={(event) => console.log(event, 'error')}
        autoComplete="on"
        initialValues={defaultValues}
      >
        <section className="animal__form_main">
          <Form.Item
            name="pet_picture"
            rules={[{ type: 'url', message: 'Введите ссылку на фото животного' }]}
          >
            <Input type="url" placeholder="Cсылка на фото животного"></Input>
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[
              { required: true, message: 'Кличка - обязательное поле' },
              { type: 'string', message: 'Введите кличку животного' },
            ]}
          >
            <Input type="text" maxLength={64} placeholder="Кличка *"></Input>
          </Form.Item>
          <Form.Item
            name="kind_id"
            rules={[{ required: true, message: 'Выберите вид животного из списка' }]}
          >
            <Select
              placeholder="Выберите вид животного *"
              onSelect={(event: number) => getAnimalBreedsByType(event)}
            >
              {kinds?.result.map((kind) => {
                return (
                  <Select.Option value={kind.id} key={kind.id}>
                    {kind.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="breed_id"
            rules={[{ message: 'Выберите породу животного из списка' }]}
          >
            <Select placeholder="Выберите породу животного">
              {actualBreeds?.result.map((breed) => {
                return (
                  <Select.Option value={breed.id} key={breed.id}>
                    {breed.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="gender_id"
            rules={[{ required: true, message: 'Выберите пол животного из списка' }]}
          >
            <Select placeholder="Выберите пол животного *">
              {genders?.result.map((gender) => {
                return (
                  <Select.Option value={gender.id} key={gender.id}>
                    {gender.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="wool_cover"
            rules={[{ type: 'string', message: 'Введите описание шерсти животного' }]}
          >
            <Input
              type="text"
              placeholder="Опишите шерсть вашего животного"
              maxLength={64}
            ></Input>
          </Form.Item>
          <Form.Item
            name="birthday"
            rules={[
              { type: 'date', message: 'Выберите дату рождения животного' },
              { required: true, message: 'Выберите дату рождения животного' },
            ]}
          >
            <DatePicker
              placeholder="Дата рождения вашего животного *"
              format={'DD/MM/YYYY'}
              locale={locale}
              disabledDate={disabledDate}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="weight"
            rules={[
              { type: 'string', message: 'введите вес животного в указанном формате' },
              () => ({
                validator(_, value) {
                  if (value === undefined || /^\d{1,3}(\.\d{0,3})?$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Введите вес животного в указанном формате'),
                  );
                },
              }),
            ]}
          >
            <Input
              type="text"
              placeholder="Вес  животного в килограммах, в формате 000.000"
              maxLength={7}
            ></Input>
          </Form.Item>
        </section>
        <section className="animal__form_else">
          <Form.Item
            name="chip_number"
            rules={[
              { type: 'string', message: 'Введите номер чипа в указанном формате' },
              () => ({
                validator(_, value) {
                  if (value === undefined || /^\d{15}$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Введите номер чипа в указанном формате'),
                  );
                },
              }),
            ]}
          >
            <Input
              type="text"
              placeholder="Номер чипа (15 цифр)"
              maxLength={15}
              minLength={15}
            ></Input>
          </Form.Item>
          <p className="animal__text animal__text_caption">
            Выберите дату установки и до какого числа годен чип животного
          </p>
          <Form.Item name="chip_date">
            <RangePicker
              format={'DD/MM/YYYY'}
              locale={locale}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="stigma"
            rules={[
              { type: 'string', message: 'Введите клеймо в указанном формате' },
              () => ({
                validator(_, value) {
                  if (value === undefined || /^[A-Z]{3} \d{1,5}$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Введите клеймо в указанном формате'));
                },
              }),
            ]}
          >
            <Input
              type="text"
              placeholder="Клеймо в формате 'ZZZ 00000' от 1 до 5 цифр"
              minLength={5}
              maxLength={9}
            ></Input>
          </Form.Item>
          <Form.Item
            name="castration"
            className="animal__psevdo-input"
            rules={[
              {
                type: 'boolean',
                message: 'Выберите если вы кастрировали/стерилизировали своего питомца',
              },
            ]}
            valuePropName="checked"
          >
            <Checkbox type="checkbox" className="animal__checkbox" value={true}>
              Кастрация/стерилизация
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="health_features"
            rules={[
              { type: 'string', message: 'Опишите особенности здоровья животного' },
            ]}
          >
            <TextArea placeholder="Особенности здоровья" maxLength={4000} />
          </Form.Item>
          <Form.Item
            name="characteristic"
            rules={[
              { type: 'string', message: 'введите вес животного в указанном формате' },
            ]}
          >
            <TextArea placeholder="Приметы" maxLength={4000} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="animal__btn">
            Сохранить
          </Button>
        </section>
      </Form>
      <p className="animal__text animal__text_caption">
        Поля отмеченные * обязательные для заполнения
      </p>
    </section>
  );
};
