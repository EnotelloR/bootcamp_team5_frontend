import { Ierror } from '../services/types/authTypes';

class ErrorHandlerClass {
  handleError({ code, errors, error, error_description }: Ierror): string {
    if (code === 422 && errors?.error?.includes('The user E-Mail')) {
      return 'Такой пользователь уже зарегистрирован!';
    }
    if (
      code === 400 && // невалидные данные при регистрации
      (errors?.role_name || errors?.email || errors?.password)
    ) {
      return 'Введены невалидные данные.';
    }
    if (
      error_description === 'Bad credentials' && // невалидные данные при входе
      error === 'invalid_grant'
    ) {
      return 'Пользователь не существует или неверный пароль.';
    }
    if (code === 500) return 'Ошибка на сервере, повторите попытку позднее.';
    else return 'Непредвиденная ошибка, попробуйте позднее';
  }
}

const errorHandler = new ErrorHandlerClass();

export default errorHandler;
