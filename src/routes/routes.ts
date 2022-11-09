const $HOST = 'https://kotopes-dmih.herokuapp.com/api';

export const routes = {
  pages: {
    changePasswordPage: () => '/changePassword/:token',
    confirmEmail: '/confirm/:token',
  },
  main: '/',
  notFound: '/*',
  signUp: '/signup',
  signIn: '/signin',
  profile: '/profile',
  newAnimal: '/new-animal',
  forgotPass: '/forgot-password',
  changePass: '/change-password',
  carriers: '/carriers',
  carrier: `/carrier/:id`,
  navCarrierPage: (id: number) => `/carrier/${id}`,
  animal: `/profile/animals/:id`,
  carrierCreateAppointment: `/carrier/:id/create-appointment`,
  navCarrierCreateReq: (id: number) => `/carrier/${id}/create-appointment`,
  appointment: `/appointment/:id`,
  navAppointment: (id: number) => `/appointment/${id}`,
  applications: '/applications',
  api: {
    getAnimalsType: () => '/animal_types',
    getAnimalBreeds: (id: number) => `/animal_types/${id}/breeds`,
    getAllBreeds: () => '/breeds',
    getCarrier: () => '/carriers',
    getCarrierById: (id: number) => `/carriers/${id}`,
    getCities: () => '/cities',
    getDistrictsByCity: (city_id: number) => `/cities/${city_id}/districts`,
    getClinicService: () => '/clinic_services',
    getAllCommunication: () => '/api/communication_method',
    getCommunicationById: (id: number) => `/communication_method/${id}`,
    getAllGenders: () => '/genders',
    getAllManipulationTypes: () => '/manipulation_types',
    pets: () => '/pets',
    createPet: () => '/pet',
    petById: (id: number) => `/pets/${id}`,
    manipulationsByPet: (id: number) => `/pets/${id}//manipulations`,
    request: () => '/requests',
    getRequestById: (id: number) => `/requests/${id}`,
    updateStatusRequest: (id: number) => `/requests/${id}/status`,
    getCurrentUserNotifications: () => '/requests/notifications',
    getRequestStatuses: () => '/request_statuses',
    getRequestStatusesById: (id: number) => `/request_statuses/${id}`,
    roles: () => '/roles',
    getServices: () => '/service_types',
    userRegister: () => '/users/register',
    userCarrier: () => '/users/carrier',
    animalTypeByCarrier: () => '/users/carrier/animal_types',
    carrierClinicServices: () => '/users/carrier/clinic_services',
    carrierServiceTypes: () => '/users/carrier/service_types',
    forgotPassword: () => '/users/forgot',
    aboutUser: () => '/users/me',
    aboutOwner: () => 'users/owner',
    ownerCommunication: () => '/users/owner/communication_methods',
    changePassword: () => '/users/password',
    verifyUser: () => '/users/verify',
    basePath: () => $HOST,
  },
};
