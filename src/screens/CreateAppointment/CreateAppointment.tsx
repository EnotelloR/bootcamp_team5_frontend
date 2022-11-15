import './CreateAppointment.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Api from '../../utils/Api';
import { Button, Form, Input, Select, Typography } from 'antd';
import { TAnimalSend } from '../../services/types/animalsTypes';
import { getAnimals } from '../../store/slices/animals/animalsSlice';
import { animalsSelector } from '../../store/slices/animals/animalsSelectors';
import { AnimalIcon } from '../../features/animals';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCarrierById } from '../../store/slices/carries/carriesSelectors';
import { useApiHooks } from '../../hooks/ApiHooks';
import { userSelector } from '../../store/slices/auth/authSelectors';
import { IOwnerCommMethods } from '../../services/types/otherTypes';
import { routes } from '../../routes/routes';

interface IformData {
  services_ids: [number];
  communication_methods_ids: [number];
  description: string;
}

export const CreateAppointment = () => {
  const [selectedPet, setSelectedPet] = useState<TAnimalSend | null>(null);
  const [ownerCommMethods, setOwnerCommMethods] = useState<IOwnerCommMethods[] | null>(
    null,
  );

  const { id } = useParams();
  const carrier = useSelector(selectCarrierById(Number(id)));
  const user = useSelector(userSelector);
  const pets = useSelector(animalsSelector);

  const dispatch = useDispatch();
  const { getterCarrierById } = useApiHooks();
  const navigate = useNavigate();

  useEffect(() => {
    if (pets?.length === 1) {
      setSelectedPet(pets[0]);
    }
  }, []);

  useEffect(() => {
    if (user && !carrier) {
      getterCarrierById(Number(id));
    }
    if (user && !pets) {
      getUserPets();
    }
    if (user && !ownerCommMethods) {
      getOwnerCommunicationMethods();
    }
  }, [user]);

  const getUserPets = () => {
    Api.getAnimals()
      .then(({ result }) => dispatch(getAnimals(result)))
      .catch((error) => console.log(error));
  };

  const getOwnerCommunicationMethods = () => {
    Api.getOwnerCommunicationMethods()
      .then(({ result }) => setOwnerCommMethods(result))
      .catch((err) => console.log(err));
  };

  const getDate = () => {
    const now = Date.now();
    const dateObj = new Date(now);
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const addZero = (n: number) => (n.toString().length === 1 ? `0${n}` : n);
    return `${addZero(date)}.${addZero(month)}.${year}`;
  };

  const onFinish = (result: IformData) => {
    if (selectedPet && carrier) {
      Api.createAppointment({
        ...result,
        pet_id: selectedPet.pet_id as number,
        carrier_id: carrier.id,
      })
        .then(({ result }) => {
          alert(`заявка №${result.id} успешно создана`);
          navigate(routes.navAppointment(result.id));
        })
        .catch((err) => {
          alert('при запросе произошла ошибка');
          console.log(err);
        });
    } else {
      alert('Выберите питомца, которого хотите записать на прием.');
    }
  };

  return (
    <section className="create-appointment">
      <h4 className="create-appointment__title">{`Заявка от ${getDate()}`}</h4>
      <Form
        className="create-appointment__form"
        name="basic"
        size="middle"
        onFinish={onFinish}
        autoComplete="off"
      >
        <ul className="create-appointment__pets-list">
          {pets?.map((pet, index) => (
            <li className="create-appointment__list-item" key={index}>
              <AnimalIcon
                pet={pet}
                selectedPet={selectedPet}
                setSelectedPet={setSelectedPet}
              />
            </li>
          ))}
        </ul>
        <div className="create-appointment__inputs-group">
          <Typography>
            <pre>{selectedPet?.nickname || 'Кличка выбранного питомца'}</pre>
          </Typography>
          <Form.Item
            name="services_ids"
            rules={[{ required: true, message: 'Поле обязательное для заполнения.' }]}
          >
            <Select showSearch={false} mode="multiple" placeholder="Виды услуг*">
              {carrier?.clinic_services.map(({ id, name }, index) => (
                <Select.Option key={`${index}_${name}`} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="communication_methods_ids"
            rules={[
              { required: true, message: 'Необходимо выбрать минимум 1 способ связи.' },
            ]}
          >
            <Select
              showSearch={false}
              mode="multiple"
              placeholder="Предпочтительный способ связи*"
            >
              {ownerCommMethods?.map((method, index) => (
                <Select.Option
                  key={index}
                  value={method.id}
                >{`${method.name}: ${method.value}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item name="description" className="create-appointment__appointment-text">
          <Input.TextArea maxLength={255} rows={4} placeholder="Текст заявки" />
        </Form.Item>
        <div className="create-appointment__buttons-group">
          <Form.Item className="create-appointment__btn-item">
            <Button
              type="primary"
              htmlType="submit"
              className="create-appointment__submit-btn"
            >
              Сохранить
            </Button>
          </Form.Item>
          <Button
            htmlType="button"
            className="ant-form-item create-appointment__back-btn"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </div>
      </Form>
    </section>
  );
};
