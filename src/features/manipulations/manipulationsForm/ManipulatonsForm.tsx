import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import React from 'react';

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

const manipulationHandler = (values: Manipulations) => console.log(values);

const ManipulatonsForm = () => {
  const [form] = Form.useForm();
  return (
    <Form
      initialValues={initialValues}
      form={form}
      onFinish={(event) => manipulationHandler(event)}
    >
      <Row>
        <Col span={6}>
          <Form.Item name="description">
            <Input placeholder="Введите вид манипуляции" />
          </Form.Item>
        </Col>
        <Col span={6}>
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
        <Col span={6}>
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
        <Col span={6}>
          <Button>Сохранить</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ManipulatonsForm;
