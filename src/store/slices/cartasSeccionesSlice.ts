import { createSlice } from '@reduxjs/toolkit';

export const cartasSeccionesSlice = createSlice({
  name: 'cartasSecciones',
  initialState: {
    isLoadingCartasSecciones: false,
    isLoadingCartasSeccionesModal: false,
    cartasSecciones: [],
    activeCartaSeccion: {
      id: 0,
      carta: 0,
      descripcion: '',
      activo: true
    },
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingCartasSecciones: (state) => {
      state.isLoadingCartasSecciones = true;
      state.isLoadingCartasSeccionesModal = false;
      state.cartasSecciones = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalCartasSecciones: (state) => {
      state.isLoadingCartasSecciones = false;
      state.isLoadingCartasSeccionesModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveCartaSeccion: (state, { payload }) => {
      state.activeCartaSeccion = payload;
    },

    onGetAllCartasSecciones: (state, { payload }) => {
      state.isLoadingCartasSecciones = false;
      state.isLoadingCartasSeccionesModal = false;
      state.cartasSecciones = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewCartaSeccion: (state, { payload }) => {
      state.cartasSecciones.unshift(payload);
      state.isLoadingCartasSecciones = false;
      state.isLoadingCartasSeccionesModal = false;
    },

    onUpdateCartaSeccion: (state, { payload }) => {
      state.cartasSecciones = state.cartasSecciones.map( (cartaSeccion: any) => {
        if(cartaSeccion.id === payload.id) return payload;
        return cartaSeccion;
      });
      state.isLoadingCartasSecciones = false;
      state.isLoadingCartasSeccionesModal = false;
    },

    onActiveInactiveCartaSeccion: (state, { payload }) => {
      state.cartasSecciones = state.cartasSecciones.map( (cartaSeccion: any) => {
        if(cartaSeccion.id === payload.id) return payload;
        return cartaSeccion;
      });
      state.isLoadingCartasSecciones = false;
      state.isLoadingCartasSeccionesModal = false;
    },

    onErrorCartasSecciones: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingCartasSecciones = false;
      state.isLoadingCartasSeccionesModal = false;
    },

  }
});

export const { 
  onStartLoadingCartasSecciones,
  onStartLoadingModalCartasSecciones,
  onSetActiveCartaSeccion,
  onGetAllCartasSecciones,
  onAddNewCartaSeccion,
  onUpdateCartaSeccion,
  onActiveInactiveCartaSeccion,
  onErrorCartasSecciones
} = cartasSeccionesSlice.actions;
