import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { TAnimalsDetails, TAnimalSend } from '../../../services/types/animalsTypes';
import openNotificationWithIcon from '../../../UI/notifications/notifications';
import { isFetchBaseQueryError } from '../../../utils/helpers';
import {
  useAddNewAnimalMutation,
  useChangePetMutation,
  useGetAnimalsGenderQuery,
  useGetAnimalsTypeQuery,
  useGetBeersByAnimalsTypeIdQuery,
} from '../animals.service';
import './AnimalForm.css';

const initialValues: TAnimalSend = {
  birthday: null,
  gender_id: null,
  kind_id: null,
  nickname: '',
  pet_id: null,
  breed_id: null,
  castration: false,
  characteristic: '',
  chip_number: null,
  health_features: '',
  pet_picture: '',
  stigma: '',
  weight: null,
  wool_cover: '',
  chip_end_date: '',
  chip_start_date: '',
};

interface AnimalFormProps {
  isNew: boolean;
  animal?: TAnimalsDetails;
}

export const AnimalForm: FC<AnimalFormProps> = ({ isNew, animal }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [actualKinds, setActialKinds] = useState<null | number>(animal?.kind_id ?? null);
  const [disable, setDisable] = useState<boolean>(false);
  const [addNewAnimal] = useAddNewAnimalMutation();
  const [changeAnimal] = useChangePetMutation();
  const { data: kinds } = useGetAnimalsTypeQuery();
  const { data: actualBreeds } = useGetBeersByAnimalsTypeIdQuery(actualKinds as number, {
    skip: !actualKinds,
  });
  const { data: genders } = useGetAnimalsGenderQuery();
  const getAnimalBreedsByType = (event: number) => setActialKinds(event);
  const handleFinish = (values: TAnimalSend) => {
    const { birthday: wrongFormatDate, weight: nullableWeight, ...args } = values;
    const birthday = wrongFormatDate.format('DD/MM/YYYY');
    console.log(nullableWeight);
    const weight = nullableWeight ? Number(Number(nullableWeight).toFixed(3)) : null;
    const currentAnimal = { birthday, weight, ...args };
    if (isNew) {
      try {
        setDisable(true);
        addNewAnimal(currentAnimal);
        openNotificationWithIcon(
          'success',
          '???????????????????? ??????????????',
          '?????????????????????? ???? ???????????????? ???????????? ??????????????',
        );
        navigate(routes.profile);
      } catch (error) {
        if (isFetchBaseQueryError(error)) console.log(error);
        openNotificationWithIcon(
          'error',
          '???????????????????? ??????????????',
          '??????, ??????-???? ?????????? ???? ??????',
        );
      } finally {
        setDisable(false);
      }
    } else {
      try {
        setDisable(true);
        changeAnimal({
          ...currentAnimal,
          pet_id: animal?.pet_id as number,
        });
        openNotificationWithIcon(
          'success',
          '?????????????????? ??????????????',
          '?????????????????????? ???? ???????????????? ???????????? ??????????????',
        );
        navigate(routes.profile);
      } catch (error) {
        if (isFetchBaseQueryError(error)) console.log(error);
        openNotificationWithIcon(
          'error',
          '?????????????????? ??????????????',
          '??????, ??????-???? ?????????? ???? ??????',
        );
      } finally {
        setDisable(false);
      }
    }
  };
  return (
    <section className="animal__section">
      <Row>
        <Form
          className="animal__form"
          initialValues={
            isNew
              ? initialValues
              : { ...animal, birthday: moment(animal?.birthday, 'DD/MM/YYYY') }
          }
          size={'middle'}
          onFinish={(event) => handleFinish(event)}
          form={form}
        >
          <Col>
            <Form.Item
              name="pet_picture"
              rules={[{ type: 'url', message: '?????????????? ???????????? ???? ???????? ??????????????????' }]}
            >
              <Input type="url" placeholder="C?????????? ???? ???????? ??????????????????" />
            </Form.Item>
            <Form.Item
              name="nickname"
              rules={[
                { required: true, message: '???????????? - ???????????????????????? ????????' },
                { type: 'string', message: '?????????????? ???????????? ??????????????????' },
              ]}
            >
              <Input type="text" maxLength={64} placeholder="???????????? *" />
            </Form.Item>
            <Form.Item
              name="kind_id"
              rules={[{ required: true, message: '???????????????? ?????? ?????????????????? ???? ????????????' }]}
            >
              <Select
                placeholder="???????????????? ?????? ?????????????????? *"
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
            <Form.Item name="breed_id">
              <Select placeholder="???????????????? ???????????? ??????????????????">
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
              rules={[{ required: true, message: '???????????????? ?????? ?????????????????? ???? ????????????' }]}
            >
              <Select placeholder="???????????????? ?????? ?????????????????? *">
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
              rules={[{ type: 'string', message: '?????????????? ???????????????? ???????????? ??????????????????' }]}
            >
              <Input
                type="text"
                placeholder="?????????????? ???????????? ???????????? ??????????????????"
                maxLength={64}
              />
            </Form.Item>
            <Form.Item
              name="birthday"
              rules={[
                { type: 'date', message: '???????????????? ???????? ???????????????? ??????????????????' },
                { required: true, message: '???????????????? ???????? ???????????????? ??????????????????' },
              ]}
            >
              <DatePicker
                placeholder="???????? ???????????????? ???????????? ?????????????????? *"
                format={'DD/MM/YYYY'}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item name="weight">
              <Input
                type="string"
                placeholder="??????  ?????????????????? ?? ??????????????????????, ?? ?????????????? 000.000"
                min={0}
              ></Input>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="chip_number"
              rules={[
                {
                  type: 'number',
                  min: 100000000000000,
                  max: 999999999999999,
                  message: '?????????????? ?????????? ???????? ?? ?????????????????? ??????????????',
                },
              ]}
            >
              <InputNumber
                className="animal__inputWidth"
                placeholder="?????????? ???????? (15 ????????)"
              />
            </Form.Item>
            <Form.Item
              name="stigma"
              rules={[{ type: 'string', message: '?????????????? ???????????? ?? ?????????????????? ??????????????' }]}
            >
              <Input
                type="text"
                placeholder="???????????? ?? ?????????????? 'ZZZ 00000' ???? 1 ???? 5 ????????"
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
                  message: '???????????????? ???????? ???? ????????????????????????/?????????????????????????????? ???????????? ??????????????',
                },
              ]}
              valuePropName="checked"
            >
              <Checkbox type="checkbox" className="animal__checkbox" value={true}>
                ??????????????????/????????????????????????
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="health_features"
              rules={[
                { type: 'string', message: '?????????????? ?????????????????????? ???????????????? ??????????????????' },
              ]}
            >
              <TextArea placeholder="?????????????????????? ????????????????" maxLength={4000} />
            </Form.Item>
            <Form.Item
              name="characteristic"
              rules={[
                { type: 'string', message: '?????????????? ?????? ?????????????????? ?? ?????????????????? ??????????????' },
              ]}
            >
              <TextArea placeholder="??????????????" maxLength={4000} />
            </Form.Item>
            <Form.Item>
              <Button
                className="animal-profile__btn"
                type="primary"
                htmlType="submit"
                disabled={disable}
              >
                {isNew ? '????????????????' : '????????????????'}
              </Button>
            </Form.Item>
          </Col>
        </Form>
        <p className="animal__text animal__text_caption">
          ???????? ???????????????????? * ???????????????????????? ?????? ????????????????????
        </p>
      </Row>
    </section>
  );
};
