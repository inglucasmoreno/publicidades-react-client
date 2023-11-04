import { createSlice } from '@reduxjs/toolkit';

export const cartasDigitalesSlice = createSlice({
  name: 'cartasDigitales',
  initialState: {
    isLoadingCartasDigitales: false,
    isLoadingCartasDigitalesModal: false,
    cartasDigitales: [],
    activeCartaDigital: {
      id: 0,
      tema: 'Basico',
      descripcion: '',
      activo: true
    },
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingCartasDigitales: (state) => {
      state.isLoadingCartasDigitales = true;
      state.isLoadingCartasDigitalesModal = false;
      state.cartasDigitales = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalCartasDigitales: (state) => {
      state.isLoadingCartasDigitales = false;
      state.isLoadingCartasDigitalesModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveCartaDigital: (state, { payload }) => {
      state.activeCartaDigital = payload;
    },

    onGetAllCartasDigitales: (state, { payload }) => {
      state.isLoadingCartasDigitales = false;
      state.isLoadingCartasDigitalesModal = false;
      state.cartasDigitales = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewCartaDigital: (state, { payload }) => {
      state.cartasDigitales.unshift(payload);
      state.isLoadingCartasDigitales = false;
      state.isLoadingCartasDigitalesModal = false;
    },

    onUpdateCartaDigital: (state, { payload }) => {
      state.cartasDigitales = state.cartasDigitales.map( (cartaDigital: any) => {
        if(cartaDigital.id === payload.id) return payload;
        return cartaDigital;
      });
      state.isLoadingCartasDigitales = false;
      state.isLoadingCartasDigitalesModal = false;
    },

    onActiveInactiveCartaDigital: (state, { payload }) => {
      state.cartasDigitales = state.cartasDigitales.map( (cartaDigital: any) => {
        if(cartaDigital.id === payload.id) return payload;
        return cartaDigital;
      });
      state.isLoadingCartasDigitales = false;
      state.isLoadingCartasDigitalesModal = false;
    },

    onErrorCartasDigitales: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingCartasDigitales = false;
      state.isLoadingCartasDigitalesModal = false;
    },

  }
});

export const { 
  onStartLoadingCartasDigitales,
  onStartLoadingModalCartasDigitales,
  onSetActiveCartaDigital,
  onGetAllCartasDigitales,
  onAddNewCartaDigital,
  onUpdateCartaDigital,
  onActiveInactiveCartaDigital,
  onErrorCartasDigitales
} = cartasDigitalesSlice.actions;
