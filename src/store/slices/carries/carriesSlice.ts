import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICarrier, initialCarries } from '../../../services/types/authTypes';

const initialState: initialCarries = {
  carries: null,
};

export const carriesSlice = createSlice({
  initialState: initialState,
  name: 'carries',
  reducers: {
    setCarries: (state, { payload }: PayloadAction<ICarrier[]>) => {
      state.carries = payload;
    },
  },
});

// Action creator
export const { setCarries } = carriesSlice.actions;
// Reducer
export const carriesReducer = carriesSlice.reducer;
