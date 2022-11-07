import { Store } from 'antd/lib/form/interface';
import Api from '../utils/Api';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { login } from '../store/slices/auth/authSlice';
import { setCarries } from '../store/slices/carries/carriesSlice';

export const useApiHooks = () => {
  const dispatch = useDispatch();

  const getUser = useCallback(() => {
    Api.getUser()
      .then(({ result }) => {
        dispatch(login(result));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        //dispatch(setLoading(false));
      });
  }, []);

  const loginUser = ({ username, password, remember }: Store) => {
    return Api.getToken({ username, password })
      .then((res) => {
        //const { access_token } = res;
        if (res.access_token) {
          Api.setToken(res.access_token, remember);
          getUser();
        } else {
          throw new Error('Something going wrong with token');
        }
      })
      .catch((err) => Promise.reject(err));
  };

  const getAllCarries = () => {
    Api.getAllCarries()
      .then(({ result }) => dispatch(setCarries(result)))
      .catch((err) => Promise.reject(err));
  };

  const getCarrier = (id: number) => {
    Api.getCarrier(id)
      .then(({ result }) => dispatch(setCarries([result])))
      .catch((err) => Promise.reject(err));
  };

  return {
    getterUser: getUser,
    loggerUser: loginUser,
    getterAllCarries: getAllCarries,
    getterCarrierById: getCarrier,
  };
};
