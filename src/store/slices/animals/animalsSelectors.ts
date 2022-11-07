import { RootState } from '../..';

export const animalsSelector = (state: RootState) => state.Animals.animals;
export const animalDetailsSelector = (state: RootState) => state.Animals.animalDetails;
