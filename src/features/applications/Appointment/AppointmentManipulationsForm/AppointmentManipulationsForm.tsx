import React, { FC } from 'react';
import { Button, DatePicker, Form, message, Modal, Select } from 'antd';
import moment from 'moment/moment';
import {
  useCreateManipulationByPetIdMutation,
  useGetAllManipulationTypesQuery,
} from '../../../manipulations/manipulations.service';
import { Iappointment } from '../../Applications/applications.entity';
import TextArea from 'antd/lib/input/TextArea';

export const AppointmentManipulationsForm: FC<{
  appointment: Iappointment;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ appointment, setIsOpen, isOpen }) => {
  const [manipulationsForm] = Form.useForm();

  const [createManipulation] = useCreateManipulationByPetIdMutation();
  const { data: manipulations } = useGetAllManipulationTypesQuery();

  interface IFormData {
    date: moment.Moment;
    description: string;
    manipulation_type_id: number;
    next_date?: moment.Moment;
  }

  const manipulationAddConfirm = async (fieldsValue: IFormData) => {
    await createManipulation({
      ...fieldsValue,
      request_id: appointment.id,
      pet_id: appointment.pet.pet_id as number,
      date: fieldsValue.date.format('DD/MM/YYYY'),
      next_date: fieldsValue.next_date?.format('DD/MM/YYYY'),
    })
      .unwrap()
      .then(() => setIsOpen(false))
      .catch(() => message.error('Нет связи с сервером. Попробуйте позже.'));
  };

  return (
    <Modal
      title="Добавить манипуляцию"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <Form form={manipulationsForm} onFinish={manipulationAddConfirm}>
        <Form.Item
          name="manipulation_type_id"
          rules={[
            {
              required: true,
              message: 'Необходимо выбрать тип манипуляции',
            },
          ]}
        >
          <Select
            className="appointment-page__manipulationField"
            placeholder={'Вид манипуляции'}
          >
            {manipulations?.result.map((manipulation) => {
              return (
                <Select.Option value={manipulation.id} key={manipulation.id}>
                  {manipulation.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Вы не ввели описание',
            },
          ]}
        >
          <TextArea placeholder={'Описание'} />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[
            {
              required: true,
              message: 'Вы не ввели дату.',
            },
          ]}
        >
          <DatePicker
            className="appointment-page__manipulationField"
            placeholder={'Дата манипуляции'}
            showTime
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item name="next_date">
          <DatePicker
            className="appointment-page__manipulationField"
            placeholder={'Дата следующей манипуляции'}
            showTime
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType={'submit'} className="appointment-page__button">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
