import { createSlice } from '@reduxjs/toolkit';

export const cartaSlice = createSlice({
  name: 'carta',
  initialState: {
    isLoadingCarta: false,
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingCarta: (state) => {
      state.isLoadingCarta = true;
      state.success = '';
      state.error = '';
    },

    onSubirCarta: (state) => {
      state.isLoadingCarta = false;
      state.success = '';
      state.error = '';
    },

    onErrorCarta: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingCarta= false;
    },

  }
});

export const { 
  onStartLoadingCarta,
  onSubirCarta,
  onErrorCarta
} = cartaSlice.actions;
