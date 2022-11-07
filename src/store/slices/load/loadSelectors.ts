import { RootState } from '../..';

export const loadSelector = (state: RootState) => state.Load.isLoad;
