import { RootState } from '../..';

export const applicationsSelector = (state: RootState) => state.Applications.applications;
export const applicationDetailsSelector = (state: RootState) =>
  state.Applications.applicationDetails;
