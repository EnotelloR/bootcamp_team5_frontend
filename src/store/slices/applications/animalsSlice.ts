import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TApplication,
  TInitStateApplications,
} from '../../../services/types/applicationTypes';

const initialState: TInitStateApplications = {
  applications: null,
  applicationDetails: null,
};

export const applicationsSlice = createSlice({
  name: 'Applications',
  initialState,
  reducers: {
    getApplications: (state, action: PayloadAction<Array<TApplication>>) => {
      state.applications = action.payload;
    },
    applicationDetails: (state, action: PayloadAction<TApplication>) => {
      state.applicationDetails = action.payload;
    },
    deleteDetailsApplications: (state) => {
      state.applicationDetails = null;
    },
    deleteApplications: (state) => {
      state.applications = null;
    },
  },
});

export const {
  getApplications,
  applicationDetails,
  deleteDetailsApplications,
  deleteApplications,
} = applicationsSlice.actions;

export const applicationsReducer = applicationsSlice.reducer;
