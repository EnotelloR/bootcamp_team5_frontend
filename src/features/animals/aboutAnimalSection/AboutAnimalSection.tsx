import React, { FC, useState } from 'react';
import { TAnimalsDetails } from '../../../services/types/animalsTypes';
import { Button, Checkbox, Modal, Typography } from 'antd';
import { useCreateUUIDMutation } from '../animals.service';
import QRCode from 'qrcode.react';
interface AboutAnimalSectionProps {
  animal: TAnimalsDetails;
}

const AboutAnimalSection: FC<AboutAnimalSectionProps> = ({ animal }) => {
  const [agree, setAgree] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createUUID] = useCreateUUIDMutation();

  const confirmCreateUUID = () => {
    animal.pet_id &&
      createUUID(animal.pet_id)
        .unwrap()
        .then((response) => (animal.uuid = response.result.uuid));
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-gen') as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <section className="animal-profile__info-box">
      <div className="animal-profileWrapper">
        <Typography className="animal-profile__block">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Имя
          </Typography.Title>
          <pre>{animal.nickname}</pre>
        </Typography>
        {animal.kind_name ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Представитель вида
            </Typography.Title>
            <pre>{animal.kind_name}</pre>
          </Typography>
        ) : null}
        {animal.breed_name ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Порода
            </Typography.Title>
            <pre>{animal.breed_name}</pre>
          </Typography>
        ) : null}
        <Typography className="animal-profile__block">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Пол
          </Typography.Title>
          <pre>{animal.gender_name}</pre>
        </Typography>
        <Typography className="animal-profile__block">
          <Typography.Title level={5} style={{ margin: 0 }}>
            День рождения
          </Typography.Title>
          <pre>{animal.birthday}</pre>
        </Typography>
        {animal.wool_cover ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Цвет шерсти
            </Typography.Title>
            <pre>{animal.wool_cover}</pre>
          </Typography>
        ) : null}
        {animal.weight ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Мой вес
            </Typography.Title>
            <pre>{animal.weight} килограмм</pre>
          </Typography>
        ) : null}
        {animal.chip_number ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Чип с номером
            </Typography.Title>
            <pre>{animal.chip_number}</pre>
          </Typography>
        ) : null}
        {animal.stigma ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Клеймо под номером
            </Typography.Title>
            <pre>{animal.stigma}</pre>
          </Typography>
        ) : null}
        {animal.castration ? (
          <p className="animal-profile__text">и сделали бесплодным...</p>
        ) : null}
      </div>
      <div className="animal-profileWrapper">
        {animal.health_features ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Особенности здоровья
            </Typography.Title>
            <pre>{animal.health_features}</pre>
          </Typography>
        ) : null}
        {animal.characteristic ? (
          <Typography className="animal-profile__block">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Отличительные особенности
            </Typography.Title>
            <pre>{animal.characteristic}</pre>
          </Typography>
        ) : null}
        {animal.uuid ? (
          <p className="animal-profile__text animal-profile__text_unlimited">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Мой QR-код
            </Typography.Title>
            <QRCode
              value={`https://elk-kotopes.web.app/about-animal/${animal.uuid}`}
              size={150}
              level={'H'}
              includeMargin={true}
              className={'animal-profile__qr'}
              onClick={() => setIsModalOpen(true)}
            />
            <Modal
              title="QR-код"
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={[
                <Button
                  type="primary"
                  key="close-btn"
                  className="auth__submit-btn auth__submit-btn_type_agreed"
                  onClick={() => setIsModalOpen(false)}
                >
                  Закрыть
                </Button>,
              ]}
              className="animal-profile__modalHandler"
            >
              <QRCode
                id="qr-gen"
                value={`https://elk-kotopes.web.app/about-animal/${animal.uuid}`}
                size={400}
                level={'H'}
                includeMargin={true}
                onClick={() => setIsModalOpen(true)}
              />
              <p className="animal-profile__modalHandler">
                <Button
                  className="auth__submit-btn auth__submit-btn_type_agreed"
                  type="primary"
                  onClick={() => downloadQRCode()}
                >
                  Скачать
                </Button>
              </p>
            </Modal>
          </p>
        ) : (
          <p className="animal-profile__text animal-profile__text_big">
            {animal.uuid}
            <Checkbox onChange={(event) => setAgree(event.target.checked)}>
              Я согласен, что мои контактные данные будут доступны при сканировании
              QR-кода
            </Checkbox>
            <p>
              <Button
                type="primary"
                className="auth__submit-btn auth__submit-btn_type_agreed"
                disabled={!agree}
                onClick={confirmCreateUUID}
              >
                Сформировать QR-код
              </Button>
            </p>
          </p>
        )}
      </div>
    </section>
  );
};

export default AboutAnimalSection;
