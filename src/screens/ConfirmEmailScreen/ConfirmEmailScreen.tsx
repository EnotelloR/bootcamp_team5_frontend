import { useParams } from 'react-router-dom';
import { ConfirmEmail } from '../../features/authorization';

export const ConfirmEmailScreen = () => {
  const { token } = useParams();

  return <ConfirmEmail token={token as string} />;
};
