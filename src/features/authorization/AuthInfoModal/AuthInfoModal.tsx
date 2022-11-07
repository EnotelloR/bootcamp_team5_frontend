import React from 'react';
import './AuthInfoModal.css';
import { Modal } from 'antd';
import { SuccessSignUp } from '../SuccessSignUp';
import { ErrorAuth } from '../ErrorAuth';
import { SuccessEmailSended } from '../SuccessEmailSended';

interface IAuthInfoModalProps {
  isOpen: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isEmailSend?: boolean;
  errorText?: string;
  userEmail?: string | null;
}

export const AuthInfoModal = ({
  isOpen,
  isError,
  isSuccess,
  errorText,
  isEmailSend,
  userEmail,
}: IAuthInfoModalProps) => {
  return (
    <Modal
      style={{ top: 0, left: 0, right: 0, bottom: 0, height: '90vh' }}
      closable={false}
      width={'90%'}
      centered={true}
      open={isOpen}
      footer={null}
    >
      {isSuccess && <SuccessSignUp />}
      {isError && <ErrorAuth errorText={errorText} />}
      {isEmailSend && <SuccessEmailSended email={userEmail} />}
    </Modal>
  );
};
