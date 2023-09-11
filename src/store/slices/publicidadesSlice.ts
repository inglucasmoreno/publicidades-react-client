import { createSlice } from '@reduxjs/toolkit';

export const publicidadesSlice = createSlice({
  name: 'publicidades',
  initialState: {
    isLoadingPublicidades: false,
    isLoadingPublicidadesModal: false,
    publicidades: [],
    activePublicidad: {
      id: 0,
      descripcion: '',
      tema: 'Basico',
      publicidadesProductos: [],
      activo: true
    },
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingPublicidades: (state) => {
      state.isLoadingPublicidades = true;
      state.isLoadingPublicidadesModal = false;
      state.publicidades = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalPublicidades: (state) => {
      state.isLoadingPublicidades = false;
      state.isLoadingPublicidadesModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActivePublicidad: (state, { payload }) => {
      state.activePublicidad = payload;
      state.isLoadingPublicidades = false;
      state.isLoadingPublicidadesModal = false;
      state.success = '';
      state.error = '';
    },

    onGetAllPublicidades: (state, { payload }) => {
      state.isLoadingPublicidades = false;
      state.isLoadingPublicidadesModal = false;
      state.publicidades = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewPublicidad: (state, { payload }) => {
      state.publicidades.unshift(payload);
      state.isLoadingPublicidades = false;
      state.isLoadingPublicidadesModal = false;
    },

    onUpdatePublicidad: (state, { payload }) => {
      state.publicidades = state.publicidades.map( (publicidad: any) => {
        if(publicidad.id === payload.id) return payload;
        return publicidad;
      });
      state.isLoadingPublicidades = false;
      state.isLoadingPublicidadesModal = false;
    },

    onActiveInactivePublicidad: (state, { payload }) => {
      state.publicidades = state.publicidades.map( (publicidad: any) => {
        if(publicidad.id === payload.id) return payload;
        return publicidad;
      });
      state.isLoadingPublicidades = false;
      state.isLoadingPublicidadesModal = false;
    },

    onErrorPublicidades: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingPublicidades = false;
      state.isLoadingPublicidadesModal = false;
    },

  }
});

export const { 
  onStartLoadingPublicidades,
  onStartLoadingModalPublicidades,
  onSetActivePublicidad,
  onGetAllPublicidades,
  onAddNewPublicidad,
  onUpdatePublicidad,
  onActiveInactivePublicidad,
  onErrorPublicidades
} = publicidadesSlice.actions;
