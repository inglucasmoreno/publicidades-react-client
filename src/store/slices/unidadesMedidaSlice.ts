import { createSlice } from '@reduxjs/toolkit';

export const unidadesMedidaSlice = createSlice({
  name: 'unidadesMedida',
  initialState: {
    isLoadingUnidadesMedida: false,
    isLoadingUnidadesMedidaModal: false,
    unidadesMedida: [],
    activeUnidadMedida: {
      id: 0,
      descripcion: '',
      activo: true
    },
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingUnidadesMedida: (state) => {
      state.isLoadingUnidadesMedida = true;
      state.isLoadingUnidadesMedidaModal = false;
      state.unidadesMedida = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalUnidadesMedida: (state) => {
      state.isLoadingUnidadesMedida = false;
      state.isLoadingUnidadesMedidaModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveUnidadMedida: (state, { payload }) => {
      state.activeUnidadMedida = payload;
    },

    onGetAllUnidadesMedida: (state, { payload }) => {
      state.isLoadingUnidadesMedida = false;
      state.isLoadingUnidadesMedidaModal = false;
      state.unidadesMedida = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewUnidadMedida: (state, { payload }) => {
      state.unidadesMedida.unshift(payload);
      state.isLoadingUnidadesMedida = false;
      state.isLoadingUnidadesMedidaModal = false;
    },

    onUpdateUnidadMedida: (state, { payload }) => {
      state.unidadesMedida = state.unidadesMedida.map( (unidad: any) => {
        if(unidad.id === payload.id) return payload;
        return unidad;
      });
      state.isLoadingUnidadesMedida = false;
      state.isLoadingUnidadesMedidaModal = false;
    },

    onActiveInactiveUnidadMedida: (state, { payload }) => {
      state.unidadesMedida = state.unidadesMedida.map( (unidad: any) => {
        if(unidad.id === payload.id) return payload;
        return unidad;
      });
      state.isLoadingUnidadesMedida = false;
      state.isLoadingUnidadesMedidaModal = false;
    },

    onErrorUnidadesMedida: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingUnidadesMedida = false;
      state.isLoadingUnidadesMedidaModal = false;
    },

  }
});

export const { 
  onStartLoadingUnidadesMedida,
  onStartLoadingModalUnidadesMedida,
  onSetActiveUnidadMedida,
  onGetAllUnidadesMedida,
  onAddNewUnidadMedida,
  onUpdateUnidadMedida,
  onActiveInactiveUnidadMedida,
  onErrorUnidadesMedida
} = unidadesMedidaSlice.actions;
