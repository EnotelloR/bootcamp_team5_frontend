import { TAnimalSend } from '../services/types/animalsTypes';
import { ICarrier, IDataUser, signUpReq, tokenReq } from '../services/types/authTypes';
import { IAppointmentResData } from '../services/types/AppointmentTypes';

interface ImainApi {
  baseUrl: string;
}

class mainApi {
  private _baseUrl: string;
  private _token: string | null;

  constructor({ baseUrl }: ImainApi) {
    this._baseUrl = baseUrl;
    this._token = null;
  }

  createUser = (userData: signUpReq) =>
    this._fetcher('/api/users/register', 'POST', userData);

  getToken = ({ username, password }: tokenReq) => {
    // Т_т

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    return fetch('https://kotopes-dmih.herokuapp.com/oauth/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic a290b3Blcy1mcm9udC1hcHAtMTpUTUpKVGR1dTFkMXB2VDVFNDJJSXlySnBqcFY2U0w4NEwzSTFsY1dE',
      },
      body: formData,
    }).then(this.responseHandler);
  };

  getUser = () => this._fetcher('/api/users/me', 'GET');

  getCity = () => this._fetcher('/api/cities', 'GET');

  getKinds = () => this._fetcher('/api/animal_types', 'GET');

  getBreeds = () => this._fetcher('/api/breeds', 'GET');

  getGender = () => this._fetcher('/api/genders', 'GET');

  getAnimals = () => this._fetcher('/api/pets', 'GET');

  getAllCarries = () => this._fetcher('/api/carriers', 'GET');

  getCarrier = (id: number) => this._fetcher(`/api/carriers/${id}`, 'GET');

  getCarrierAnimals = () => this._fetcher('/api/users/carrier/animal_types', 'GET');

  getClinicServices = () => this._fetcher('/api/clinic_services', 'GET');

  setClinicServices = (ids: { ids: number[] }) =>
    this._fetcher('/api/users/carrier/clinic_services', 'POST', ids);

  setAnimalTypes = (ids: { ids: number[] }) =>
    this._fetcher('/api/users/carrier/animal_types', 'POST', ids);

  getAnimal = (id: number) => this._fetcher(`/api/pets/${id}`, 'GET');

  getDistrict = (id: number) => this._fetcher(`/api/cities/${id}/districts`, 'GET');

  getServiceTypes = () => this._fetcher(`/api/service_types`, 'GET');

  postCarrierData = (data: ICarrier) => this._fetcher(`/api/users/carrier`, 'POST', data);

  postCarrierServiceTypes = (serviceTypes: { ids: [number] }) =>
    this._fetcher(`/api/users/carrier/service_types`, 'POST', serviceTypes);

  postUsersData = (data: IDataUser) => this._fetcher('/api/users/owner', 'POST', data);

  getOwnerCommunicationMethods = () =>
    this._fetcher('/api/users/owner/communication_methods', 'GET');

  postNewAnamal = (data: TAnimalSend) => this._fetcher('/api/pets', 'POST', data);

  putAnimal = (id: number, data: TAnimalSend) =>
    this._fetcher(`/api/pets/${id}`, 'PUT', data);

  deleteAnimal = (id: number) => this._fetcher(`/api/pets/${id}`, 'DELETE');

  createAppointment = (data: IAppointmentResData) =>
    this._fetcher('/api/requests/', 'POST', data);

  getAppointment = (id: number) => this._fetcher(`/api/requests/${id}`, 'GET');

  updateAppointmentStatus = (id: number, data: any) =>
    this._fetcher(`/api/requests/${id}/status`, 'PUT', data);

  getApplications = () => this._fetcher(`/api/requests`, 'GET');

  userCanselApplication = (id: number) =>
    this._fetcher(`/api/requests/${id}/status`, 'PUT', { status_id: 5 });

  setToken(token: string | null, remember: boolean) {
    this._token = token;
    if (remember && token) localStorage.setItem('token', token);
  }

  clearToken() {
    this._token = null;
  }

  _fetcher(path: string, method: string, body?: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (this._token) {
      headers.append('Authorization', `Bearer ${this._token}`);
    }
    const options = {
      method,
      headers,
      body,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then(this.responseHandler);
  }

  responseHandler = (res: Response) => (res.ok ? res.json() : Promise.reject(res));
}

const Api = new mainApi({
  baseUrl: 'https://kotopes-dmih.herokuapp.com',
});

export default Api;
