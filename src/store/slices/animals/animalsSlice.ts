import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAnimalsDetails, TAnimalsInitState } from '../../../services/types/animalsTypes';

const initialState: TAnimalsInitState = {
  animals: null,
  animalDetails: null,
};

export const animalsSlice = createSlice({
  name: 'Animals',
  initialState,
  reducers: {
    getAnimals: (state, action: PayloadAction<Array<TAnimalsDetails>>) => {
      state.animals = action.payload;
    },
    animalDetails: (state, action: PayloadAction<TAnimalsDetails>) => {
      state.animalDetails = action.payload;
    },
    deleteDetails: (state) => {
      state.animalDetails = null;
    },
    deleteAnimals: (state) => {
      state.animals = null;
    },
  },
});

export const { getAnimals, animalDetails, deleteDetails, deleteAnimals } =
  animalsSlice.actions;

export const animalsReducer = animalsSlice.reducer;
