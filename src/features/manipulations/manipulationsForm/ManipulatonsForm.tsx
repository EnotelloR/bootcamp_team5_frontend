import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import { isFetchBaseQueryError } from '../../../utils/helpers';
import {
  CreateManipulationTypes,
  useCreateManipulationByPetIdMutation,
} from '../manipulations.service';
import styles from './ManipulatonsForm.module.css';
import openNotificationWithIcon from '../../../UI/notifications/notifications';

export interface Manipulations {
  date: string;
  description: string;
  next_date?: string;
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
    let manipulationObject = {
      ...args,
      date: date.format('DD/MM/YYYY'),
      next_date: undefined,
      pet_id,
      manipulation_type_id,
    };
    if (next_date)
      manipulationObject = {
        ...manipulationObject,
        next_date: next_date.format('DD/MM/YYYY'),
      };
    try {
      await createManipulation(manipulationObject).unwrap();
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
          <Form.Item
            name="description"
            rules={[
              { type: 'string', message: 'Введите описание манипуляции' },
              { required: true, message: 'Введите описание манипуляции' },
            ]}
          >
            <Input placeholder="Введите описание манипуляции *" />
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
            dependencies={['date']}
            hasFeedback
            rules={[
              { type: 'date', message: 'Выберете дату манипуляции' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue('date').startOf('day') < value.startOf('day')
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Дата следующей манипуляции должна быть после текущей'),
                  );
                },
              }),
            ]}
          >
            <DatePicker
              placeholder="Дата следующей манипуляции"
              format={'DD/MM/YYYY'}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Button className={styles.manipulationsForm__confirmButton} htmlType="submit">
            Сохранить
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ManipulatonsForm;
