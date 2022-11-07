import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthResponse {
  access_token: string;
}

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('petCabinet'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<AuthResponse>) => {
      state.isAuth = true;
      localStorage.setItem('petCabinet', JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.isAuth = false;
      localStorage.removeItem('petCabinet');
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;
