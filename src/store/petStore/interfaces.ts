export interface AuthResponse {
  id: number;
  access_token: string;
  is_active: boolean;
  role_name: string;
  role_description: string;
  role_id: number;
}

type User_Role = ['OWNER', 'CARRIER'];

export interface AuthRequest {
  email: string;
  password: string;
  role_name: User_Role;
}

export interface Carrier {
  id: number;
  name: string;
  phone: string;
  address: string;
  city_id: number;
  city_name: string;
  picture_url: string;
  schedule: string;
  service_types: ServiceType[];
}

export interface ServiceType {
  id: number;
  name: string;
}

export interface SearchParams {
  search?: string;
  city_id?: number | null;
  district_id?: number | null;
  service_type_id?: number | null;
  animal_type_id?: number | null;
}

export interface AnimalsType {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}
