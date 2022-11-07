import { createSlice } from '@reduxjs/toolkit';

const initialState: { isLoad: boolean } = {
  isLoad: false,
};

export const loadSlice = createSlice({
  name: 'Load',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoad = true;
    },
    endLoading: (state) => {
      state.isLoad = false;
    },
  },
});

export const { startLoading, endLoading } = loadSlice.actions;

export const loadReducer = loadSlice.reducer;
