import { RootState } from '../..';

export const selectAuthStatus = (state: RootState) => state.Auth.status;
export const userSelector = (state: RootState) => state.Auth.user;
