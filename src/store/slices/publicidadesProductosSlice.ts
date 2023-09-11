import { createSlice } from '@reduxjs/toolkit';

export const publicidadesProductosSlice = createSlice({
  name: 'publicidadesProductos',
  initialState: {
    isLoadingPublicidadesProductos: false,
    isLoadingPublicidadesProductosModal: false,
    publicidadesProductos: [],
    activePublicidadProducto: {
      id: 0,
      tipo: 'Generico',
      peso: 100,
      destacado: 'false',
      comentarios: '',
      publicidadId: 0,
      productoId: null,
      imagenId: 0,
      imagen: { url: '' },
      activo: true
    },
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingPublicidadesProductos: (state) => {
      state.isLoadingPublicidadesProductos = true;
      state.isLoadingPublicidadesProductosModal = false;
      state.publicidadesProductos = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalPublicidadesProductos: (state) => {
      state.isLoadingPublicidadesProductos = false;
      state.isLoadingPublicidadesProductosModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActivePublicidadProducto: (state, { payload }) => {
      state.activePublicidadProducto = payload;
    },

    onGetAllPublicidadesProductos: (state, { payload }) => {
      state.isLoadingPublicidadesProductos = false;
      state.isLoadingPublicidadesProductosModal = false;
      state.publicidadesProductos = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewPublicidadProducto: (state, { payload }) => {
      state.publicidadesProductos.unshift(payload);
      state.isLoadingPublicidadesProductos = false;
      state.isLoadingPublicidadesProductosModal = false;
    },

    onUpdatePublicidadProducto: (state, { payload }) => {
      state.publicidadesProductos = state.publicidadesProductos.map( (publicidadProducto: any) => {
        if(publicidadProducto.id === payload.id) return payload;
        return publicidadProducto;
      });
      state.isLoadingPublicidadesProductos = false;
      state.isLoadingPublicidadesProductosModal = false;
    },

    onActiveInactivePublicidadProducto: (state, { payload }) => {
      state.publicidadesProductos = state.publicidadesProductos.map( (publicidadProducto: any) => {
        if(publicidadProducto.id === payload.id) return payload;
        return publicidadProducto;
      });
      state.isLoadingPublicidadesProductos = false;
      state.isLoadingPublicidadesProductosModal = false;
    },

    onDeletePublicidadesProductos: (state, { payload }) => {
      state.publicidadesProductos = state.publicidadesProductos.filter( (publicidadProducto: any) => publicidadProducto.id !== payload.id );
      state.isLoadingPublicidadesProductos = false;
      state.isLoadingPublicidadesProductosModal = false;
    },

    onErrorPublicidadesProductos: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingPublicidadesProductos = false;
      state.isLoadingPublicidadesProductosModal = false;
    },

  }
});

export const { 
  onStartLoadingPublicidadesProductos,
  onStartLoadingModalPublicidadesProductos,
  onSetActivePublicidadProducto,
  onGetAllPublicidadesProductos,
  onAddNewPublicidadProducto,
  onUpdatePublicidadProducto,
  onActiveInactivePublicidadProducto,
  onDeletePublicidadesProductos,
  onErrorPublicidadesProductos
} = publicidadesProductosSlice.actions;
