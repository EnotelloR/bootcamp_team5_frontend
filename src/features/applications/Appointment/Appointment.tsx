import './Appointment.css';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Collapse, DatePicker, Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import { routes } from '../../../routes/routes';
import {
  useChangeApplicationsMutation,
  useGetApplicationManipulationsQuery,
  useGetApplicationQuery,
  useGetApplicationsQuery,
} from '../applications.service';
import { Loader } from '../../layout';
import { AppointmentManipulationsForm } from './AppointmentManipulationsForm';
import { useGetAllManipulationTypesQuery } from '../../manipulations/manipulations.service';

const { Panel } = Collapse;

const status_ids = {
  1: 'Отправлена',
  2: 'Подтверждена',
  3: 'Выполнена',
  4: 'Отменена поставщиком',
  5: 'Отменена',
};

const { TextArea } = Input;

const config = {
  rules: [{ type: 'object' as const, message: 'Выберите дату и время приема!' }],
};

export const Appointment: FC<{ id: string }> = ({ id }) => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const {
    data: appointment,
    isSuccess,
    isLoading,
    isError,
  } = useGetApplicationQuery(Number(id));
  const { data: manipulationTypes } = useGetAllManipulationTypesQuery();
  const { refetch } = useGetApplicationsQuery();
  const [changeStatus] = useChangeApplicationsMutation();
  const { data: applicationsManipulations } = useGetApplicationManipulationsQuery(
    Number(id),
  );

  const [applicationForm] = Form.useForm();

  useEffect(() => {
    refetch();
  }, [appointment]);

  const selectedStatus = Form.useWatch('status_id', applicationForm);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isOwner = user && user.role_name === 'OWNER';

  const openPetProfile = () =>
    navigate(routes.navAnimal(appointment?.result.pet.pet_id as number));

  const onFinish = async (fieldsValue: any) => {
    if (!isSuccess) return;
    const status = {
      status_id: fieldsValue.status_id,
      datetime: undefined,
      result_description: fieldsValue.recommendation,
    };

    if (status.status_id === 2) {
      status.datetime = fieldsValue['datetime'].format('DD/MM/YYYY HH:mm');
    }

    await changeStatus({ id: appointment.result.id, status: status })
      .unwrap()
      .then(() => navigate(routes.applications));
  };

  return (
    <>
      <Form
        className="appointment-page"
        onFinish={onFinish}
        onFinishFailed={(err) => console.log(err)}
        form={applicationForm}
      >
        <h4 className="appointment-page__title">{`Заявка №${id}`} </h4>
        <div className="appointment-page__content">
          {isLoading && <Loader size={96} />}
          {isError && (
            <Alert
              message="Ошибка"
              description="Произошла ошибка загрузки. Попробуйте перезагрузить страницу."
              type="error"
              showIcon
            />
          )}
          {isSuccess && (
            <>
              <div className="appointment-page__container appointment-page__container_type_first">
                <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']}>
                  <Panel
                    header="Дата и время заявки"
                    key="1"
                    className="appointment-page__panel"
                  >
                    <p>{appointment?.result.created_at}</p>
                  </Panel>
                  <Panel header="Тип услуги" key="2" className="appointment-page__panel">
                    {appointment?.result.clinic_services.map((service, index) => (
                      <p key={index}>{service.name}</p>
                    ))}
                  </Panel>
                  {!isOwner && (
                    <>
                      <Panel
                        header="Вид животного"
                        key="3"
                        className="appointment-page__panel"
                      >
                        <p>{appointment?.result.pet.kind_name}</p>
                      </Panel>
                      <Panel
                        header="Дата рождения"
                        key="4"
                        className="appointment-page__panel"
                      >
                        <p>{appointment?.result.pet.birthday}</p>
                      </Panel>
                    </>
                  )}
                  <Panel header="Питомец" key="5" className="appointment-page__panel">
                    <p>
                      Кличка:
                      <Button type="link" size={'large'} onClick={openPetProfile}>
                        {appointment?.result.pet.nickname}
                      </Button>
                    </p>
                  </Panel>
                  <Panel
                    header="Текст заявки"
                    key="6"
                    className="appointment-page__panel"
                  >
                    <p>{appointment?.result.description}</p>
                  </Panel>
                  <Panel header="Манипуляции" key="7" className="appointment-page__panel">
                    {applicationsManipulations?.result.map((manipulation) => {
                      return (
                        <div
                          key={manipulation.manipulation_id}
                          className="appointment-page__manipulationsHolder"
                        >
                          <p className="appointment-page__manipulationsHolder__item">
                            {
                              manipulationTypes?.result.find(
                                (el) => el.id === manipulation.manipulation_type_id,
                              )?.name
                            }
                          </p>
                          <p className="appointment-page__manipulationsHolder__item">
                            {manipulation.date}
                          </p>
                          <p className="appointment-page__manipulationsHolder__item">
                            {manipulation.description}
                          </p>
                        </div>
                      );
                    })}
                    {!isOwner && (
                      <Button
                        type="primary"
                        className="create-appointment__submit-btn"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Добавить манипуляцию
                      </Button>
                    )}
                  </Panel>
                </Collapse>
              </div>
              <div className="appointment-page__container appointment-page__container_type_second">
                <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
                  {isOwner ? (
                    <Panel
                      header="Поставщик услуг"
                      key="1"
                      className="appointment-page__panel"
                    >
                      <p>{appointment?.result.carrier.name}</p>
                    </Panel>
                  ) : (
                    <Panel header="Заказчик" key="1" className="appointment-page__panel">
                      <p>
                        {appointment?.result.owner.lastname}{' '}
                        {appointment?.result.owner.firstname}
                      </p>
                    </Panel>
                  )}
                  <Panel
                    header="Способ связи"
                    key="2"
                    className="appointment-page__panel"
                  >
                    {appointment?.result.communication_methods.map((service, index) => (
                      <p key={index}>{`${service.name}: ${service.value}`}</p>
                    ))}
                  </Panel>
                  <Panel
                    header="Статус заявки"
                    key="3"
                    className="appointment-page__panel"
                  >
                    <Form.Item
                      name="status_id"
                      rules={[
                        { required: true, message: 'Необходимо изменить статус заявки' },
                      ]}
                    >
                      <Select
                        placeholder={appointment?.result.status_name}
                        disabled={
                          !(
                            appointment.result.status_id == 1 ||
                            appointment.result.status_id == 2
                          )
                        }
                      >
                        {user.role_name === 'OWNER' && (
                          <Select.Option key={4} value={5}>
                            {status_ids[5]}
                          </Select.Option>
                        )}
                        {user.role_name === 'CARRIER' && (
                          <>
                            <Select.Option key={1} value={2}>
                              {status_ids[2]}
                            </Select.Option>
                            <Select.Option key={2} value={3}>
                              {status_ids[3]}
                            </Select.Option>
                            <Select.Option key={3} value={4}>
                              {status_ids[4]}
                            </Select.Option>
                          </>
                        )}
                      </Select>
                    </Form.Item>
                  </Panel>
                  <Panel
                    header="Дата и время приема"
                    key="4"
                    className="appointment-page__panel"
                  >
                    {user.role_name === 'CARRIER' &&
                      (appointment.result.status_id === 1 ? (
                        <Form.Item
                          name="datetime"
                          {...config}
                          rules={[
                            {
                              required: selectedStatus === 2,
                            },
                          ]}
                        >
                          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                      ) : (
                        <p>{appointment?.result.datetime}</p>
                      ))}
                    {user.role_name === 'OWNER' && <p>{appointment?.result.datetime}</p>}
                  </Panel>
                  <Panel
                    header="Рекомендация"
                    key="5"
                    className="appointment-page__panel"
                  >
                    {user.role_name === 'CARRIER' ? (
                      <Form.Item name="recommendation">
                        <TextArea
                          defaultValue={appointment.result.result_description}
                          placeholder={'Описание рекомендаций'}
                        />
                      </Form.Item>
                    ) : (
                      <p>{appointment.result.result_description}</p>
                    )}
                  </Panel>
                </Collapse>
                {appointment.result.status_id !== 4 &&
                  appointment.result.status_id !== 5 && (
                    <Form.Item className="create-appointment__btn-item">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="create-appointment__submit-btn"
                      >
                        Сохранить
                      </Button>
                    </Form.Item>
                  )}
              </div>
            </>
          )}
        </div>
      </Form>
      {isSuccess && (
        <AppointmentManipulationsForm
          appointment={appointment.result}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
