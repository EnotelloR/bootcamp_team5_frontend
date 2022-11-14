import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import { isFetchBaseQueryError } from '../../../utils/helpers';
import {
  CreateManipulationTypes,
  useCreateManipulationByPetIdMutation,
} from '../manipulations.service';
import openNotificationWithIcon from '../../../UI/notifications/notifications';

export interface Manipulations {
  date: string;
  description: string;
  next_date: string;
}

const initialValues: Manipulations = {
  description: '',
  date: '',
  next_date: '',
};

interface ManipulatonsFormProps {
  manipulation_type_id: number;
  pet_id: number;
}

const ManipulatonsForm: FC<ManipulatonsFormProps> = ({
  manipulation_type_id,
  pet_id,
}) => {
  const [form] = Form.useForm();
  const [createManipulation] = useCreateManipulationByPetIdMutation();
  const manipulationHandler = async (values: CreateManipulationTypes) => {
    const { date, next_date, ...args } = values;
    try {
      await createManipulation({
        ...args,
        date: date.format('DD/MM/YYYY'),
        next_date: next_date.format('DD/MM/YYYY'),
        pet_id,
        manipulation_type_id,
      }).unwrap();
      openNotificationWithIcon(
        'success',
        'Добавление процедуры',
        'Процедура успешно добавлена',
      );
      form.resetFields(['description', 'date', 'next_date']);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        console.log(error);
      }
    }
  };
  return (
    <Form
      initialValues={initialValues}
      form={form}
      onFinish={(event) => manipulationHandler(event)}
    >
      <Row>
        <Col span={7}>
          <Form.Item name="description">
            <Input placeholder="Введите вид манипуляции" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="date"
            rules={[
              { type: 'date', message: 'Выберете дату манипуляции' },
              { required: true, message: 'Выберете дату манипуляции' },
            ]}
          >
            <DatePicker
              placeholder="Дата манипуляции *"
              format={'DD/MM/YYYY'}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="next_date"
            rules={[
              { type: 'date', message: 'Выберете дату манипуляции' },
              { required: true, message: 'Выберете дату манипуляции' },
            ]}
          >
            <DatePicker
              placeholder="Дата следующей манипуляции *"
              format={'DD/MM/YYYY'}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Button htmlType="submit">Сохранить</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ManipulatonsForm;
