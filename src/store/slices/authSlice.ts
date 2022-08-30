import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  token: string;
  number: string;
}

const initialState: CounterState = {
  token: '',
  number: '',
};

export const authSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    getToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    getNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getToken, getNumber} = authSlice.actions;

export default authSlice.reducer;
