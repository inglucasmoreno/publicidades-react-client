import { createSlice } from '@reduxjs/toolkit';

export const productosSlice = createSlice({
  name: 'productos',
  initialState: {
    isLoadingProductos: false,
    isLoadingProductosModal: false,
    productos: [],
    activeProducto: {
      id: 0,
      descripcion: '',
      precio: null,
      unidadMedidaId: null,
      activo: true
    },
    success: '',
    error: ''
  },
  reducers: {

    onStartLoadingProductos: (state) => {
      state.isLoadingProductos = true;
      state.isLoadingProductosModal = false;
      state.productos = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalProductos: (state) => {
      state.isLoadingProductos = false;
      state.isLoadingProductosModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveProducto: (state, { payload }) => {
      state.activeProducto = payload;
    },

    onGetAllProductos: (state, { payload }) => {
      state.isLoadingProductos = false;
      state.isLoadingProductosModal = false;
      state.productos = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewProducto: (state, { payload }) => {
      state.productos.unshift(payload);
      state.isLoadingProductos = false;
      state.isLoadingProductosModal = false;
    },

    onUpdateProducto: (state, { payload }) => {
      state.productos = state.productos.map( (producto: any) => {
        if(producto.id === payload.id) return payload;
        return producto;
      });
      state.isLoadingProductos = false;
      state.isLoadingProductosModal = false;
    },

    onActiveInactiveProducto: (state, { payload }) => {
      state.productos = state.productos.map( (producto: any) => {
        if(producto.id === payload.id) return payload;
        return producto;
      });
      state.isLoadingProductos = false;
      state.isLoadingProductosModal = false;
    },

    onErrorProductos: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingProductos= false;
      state.isLoadingProductosModal = false;
    },

  }
});

export const { 
  onStartLoadingProductos,
  onStartLoadingModalProductos,
  onSetActiveProducto,
  onGetAllProductos,
  onAddNewProducto,
  onUpdateProducto,
  onActiveInactiveProducto,
  onErrorProductos
} = productosSlice.actions;
