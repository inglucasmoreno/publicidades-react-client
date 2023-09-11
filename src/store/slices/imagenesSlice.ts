import { createSlice } from '@reduxjs/toolkit';

export const imagenesSlice = createSlice({
  name: 'imagenes',
  initialState: {
    isLoadingImagenes: false,
    isLoadingImagenesModal: false,
    imagenes: [],
    activeImagen: {
      id: 0,
      descripcion: '',
      url: '',
      activo: true
    },
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingImagenes: (state) => {
      state.isLoadingImagenes = true;
      state.isLoadingImagenesModal = false;
      state.imagenes = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalImagenes: (state) => {
      state.isLoadingImagenes = false;
      state.isLoadingImagenesModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveImagen: (state, { payload }) => {
      state.activeImagen = payload;
    },

    onGetAllImagenes: (state, { payload }) => {
      state.isLoadingImagenes = false;
      state.isLoadingImagenesModal = false;
      state.imagenes = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewImagen: (state, { payload }) => {
      state.imagenes.unshift(payload);
      state.isLoadingImagenes = false;
      state.isLoadingImagenesModal = false;
    },

    onUpdateImagen: (state, { payload }) => {
      state.imagenes = state.imagenes.map( (imagen: any) => {
        if(imagen.id === payload.id) return payload;
        return imagen;
      });
      state.isLoadingImagenes = false;
      state.isLoadingImagenesModal = false;
    },

    onDeleteImagen: (state, { payload }) => {
      state.imagenes = state.imagenes.filter( (imagen: any) => imagen.id !== payload.id );
      state.isLoadingImagenes = false;
      state.isLoadingImagenesModal = false;
    },

    onActiveInactiveImagen: (state, { payload }) => {
      state.imagenes = state.imagenes.map( (imagen: any) => {
        if(imagen.id === payload.id) return payload;
        return imagen;
      });
      state.isLoadingImagenes = false;
      state.isLoadingImagenesModal = false;
    },

    onErrorImagenes: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingImagenes = false;
      state.isLoadingImagenesModal = false;
    },

  }
});

export const { 
  onStartLoadingImagenes,
  onStartLoadingModalImagenes,
  onSetActiveImagen,
  onGetAllImagenes,
  onAddNewImagen,
  onUpdateImagen,
  onDeleteImagen,
  onActiveInactiveImagen,
  onErrorImagenes
} = imagenesSlice.actions;
