import React, { FC, useState } from 'react';
import { TAnimalsDetails } from '../../../services/types/animalsTypes';
import { Button, Checkbox, Modal } from 'antd';
import { useCreateUUIDMutation } from '../animals.service';
import QRCode from 'qrcode.react';
import { routes } from '../../../routes/routes';

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
        .then((response) => (animal = { ...animal, ...response.result }));
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
      <div>
        <p className="animal-profile__text">
          <span className="animal-profile__span">Меня зовут: </span>
          {animal.nickname}
        </p>
        {animal.kind_name ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Я представитель вида: </span>
            {animal.kind_name}
          </p>
        ) : null}
        {animal.breed_name ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Породы: </span>
            {animal.breed_name}
          </p>
        ) : null}
        <p className="animal-profile__text">
          <span className="animal-profile__span">Пол: </span>
          {animal.gender_name}
        </p>
        <p className="animal-profile__text">
          <span className="animal-profile__span">Появился на свет: </span>
          {animal.birthday}
        </p>
        {animal.wool_cover ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Моя шерсть: </span>
            {animal.wool_cover}
          </p>
        ) : null}
        {animal.weight ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">Ты меня откормил до: </span>
            {animal.weight} килограмм
          </p>
        ) : null}
        {animal.chip_number ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">В меня вставили чип с номером: </span>
            {animal.chip_number}
          </p>
        ) : null}
        {animal.stigma ? (
          <p className="animal-profile__text">
            <span className="animal-profile__span">А так же сделали клеймо: </span>
            {animal.stigma}
          </p>
        ) : null}
        {animal.castration ? (
          <p className="animal-profile__text">и сделали бесплодным...</p>
        ) : null}
      </div>
      <div>
        {animal.health_features ? (
          <p className="animal-profile__text animal-profile__text_big">
            <span className="animal-profile__span">
              За время жизни со мной ты узнал, что у меня есть особенности:{' '}
            </span>
            <br />
            {animal.health_features}
          </p>
        ) : null}
        {animal.characteristic ? (
          <p className="animal-profile__text animal-profile__text_big">
            <span className="animal-profile__span">
              {' '}
              А еще то, что ты всегда узнаешь меня в толпе, так как я:{' '}
            </span>
            <br />
            {animal.characteristic}
          </p>
        ) : null}
        {animal.uuid ? (
          <p className="animal-profile__text animal-profile__text_unlimited">
            <span className="animal-profile__span">Мой QR-код: </span>
            <br />
            <QRCode
              value={`https://elk-kotopes.web.app${routes.pages.aboutAnimal}/${animal.uuid}`}
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
                value={`https://elk-kotopes.web.app${routes.pages.aboutAnimal}/${animal.uuid}`}
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
            <Button disabled={!agree} onClick={confirmCreateUUID}>
              Сформировать QR-код
            </Button>
          </p>
        )}
      </div>
    </section>
  );
};

export default AboutAnimalSection;
