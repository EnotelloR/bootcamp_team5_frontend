import './Appointment.css';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Collapse, DatePicker, Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/slices/auth/authSelectors';
import { routes } from '../../../routes/routes';
import {
  useDeleteApplicationsMutation,
  useGetApplicationQuery,
} from '../applications.service';

const { Panel } = Collapse;

const status_ids = {
  1: 'Отправлена',
  2: 'Подтверждена',
  3: 'Выполнена',
  4: 'Отменена поставщиком',
  5: 'Отменена',
};

enum Statuses {
  Posted = 1,
  Confirmed,
  Completed,
  CancelledByProvider,
  CancelledByClient,
}

const config = {
  rules: [
    { type: 'object' as const, required: true, message: 'Выберите дату и время приема!' },
  ],
};

export const Appointment: FC<{ id: string }> = ({ id }) => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetApplicationQuery(Number(id));
  const [changeStatus] = useDeleteApplicationsMutation();

  const onFinish = async (fieldsValue: any) => {
    if (!isSuccess) return;
    const status = {
      status_id: fieldsValue.status_id,
      datetime: undefined,
    };

    if (status.status_id === Statuses.Confirmed) {
      status.datetime = fieldsValue['datetime'].format('DD/MM/YYYY HH:mm');
    }

    await changeStatus({ id: data.result.id, status: status })
      .unwrap()
      .then(() => navigate(routes.applications));
  };

  return (
    <Form
      className="appointment-page"
      onFinish={onFinish}
      onFinishFailed={(err) => console.log(err)}
    >
      <h4 className="appointment-page__title">{`Заявка №${id}`} </h4>
      <div className="appointment-page__content">
        <div className="appointment-page__container appointment-page__container_type_first">
          <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
            <Panel
              header="Дата и время заявки"
              key="1"
              className="appointment-page__panel"
            >
              <p>{data?.result.created_at}</p>
            </Panel>
            <Panel header="Тип услуги" key="2" className="appointment-page__panel">
              {data?.result.clinic_services.map((service, index) => (
                <p key={index}>{service.name}</p>
              ))}
            </Panel>
            <Panel header="Способ связи" key="3" className="appointment-page__panel">
              {data?.result.communication_methods.map((service, index) => (
                <p key={index}>{`${service.name}: ${service.value}`}</p>
              ))}
            </Panel>
            <Panel header="Питомец" key="4" className="appointment-page__panel">
              <p>{data?.result.pet.nickname}</p>
            </Panel>
            <Panel header="Текст заявки" key="5" className="appointment-page__panel">
              <p>{data?.result.description}</p>
            </Panel>
          </Collapse>
        </div>
        <div className="appointment-page__container appointment-page__container_type_second">
          <Collapse defaultActiveKey={['1', '2', '3', '4']}>
            <Panel header="Поставщик услуг" key="1" className="appointment-page__panel">
              <p>{data?.result.carrier.name}</p>
            </Panel>
            <Panel header="Статус заявки" key="2" className="appointment-page__panel">
              <Form.Item
                name="status_id"
                rules={[{ required: true, message: 'Необходимо изменить статус заявки' }]}
              >
                <Select placeholder={data?.result.status_name}>
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
              key="3"
              className="appointment-page__panel"
            >
              {user.role_name === 'CARRIER' && (
                <Form.Item name="datetime" {...config}>
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
              )}
              {user.role_name === 'OWNER' && <p>{data?.result.updated_at}</p>}
            </Panel>
          </Collapse>
          <Form.Item className="create-appointment__btn-item">
            <Button
              type="primary"
              htmlType="submit"
              className="create-appointment__submit-btn"
            >
              Сохранить
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
