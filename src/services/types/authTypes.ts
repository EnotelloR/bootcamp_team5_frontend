export interface authState {
  status: authStatus;
  user: user;
}

export interface authStatus {
  isLogged: boolean;
  loading: boolean;
  error: string | null;
}

export interface user {
  id: number | null;
  email: string | null;
  is_active: boolean | null;
  is_verified: boolean | null;
  role_name: string | null;
  role_description: string | null;
  role_id: number | null;
  owner?: IOwner;
  carrier?: ICarrier;
}

export interface oathTokenRes {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export interface signUpReq {
  email: string;
  password: string;
  role_name: 'OWNER';
}

export interface tokenReq {
  username: string;
  password: string;
  grant_type?: string;
}

export interface Ierror {
  error_description?: string;
  code: number;
  error?: string;
  errors?: {
    error?: string;
    role_name?: string;
    email?: string;
    password?: string;
  };
  status: string;
}

export interface IOwner {
  city_id: 0;
  city_name: string;
  district_id: number;
  district_name: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
  picture_url: string;
}

export interface IDataUser {
  city_id: 0;
  district_id: number;
  firstname: string;
  lastname: string;
  phone: string;
  picture_url?: string;
}

export interface ICarrier {
  id: number;
  address: string;
  city_id: number;
  city_name?: string;
  district_name?: string;
  district_id: number;
  email: string;
  about_us: string;
  name: string;
  phone: number | string;
  picture_url: string;
  schedule: string;
  service_types: [{ id: number; name: string }];
  animal_types: [{ id: number; name: string }];
  clinic_services: [{ id: number; name: string; defaultPrice?: string }];
  url: string;
}

export interface initialCarries {
  carries: ICarrier[] | null;
}
