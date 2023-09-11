import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { 
    isDarkMode: false,
    isUserOpen: false,
    isUnidadMedidaOpen: false,
    isProductoOpen: false,
    isImagenOpen: false,
    isPublicidadOpen: false,
    isPublicidadProductoOpen: false,
    isChangePasswordOpen: false,
    isProfileOpen: false,
    isLoadingOpen: false,
    loadingMessage: '',
  },
  reducers: {

    onInitDarkMode: (state, { payload }) => {
      state.isDarkMode = payload;
    },

    onToggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },

    onToggleNewUser: (state) => {
      state.isUserOpen = !state.isUserOpen;
    },

    onToggleUnidadMedida: (state) => {
      state.isUnidadMedidaOpen = !state.isUnidadMedidaOpen;
    },

    onToggleProducto: (state) => {
      state.isProductoOpen = !state.isProductoOpen;
    },

    onToggleImagen: (state) => {
      state.isImagenOpen = !state.isImagenOpen;
    },

    onTogglePublicidad: (state) => {
      state.isPublicidadOpen = !state.isPublicidadOpen;
    },

    onTogglePublicidadProducto: (state) => {
      state.isPublicidadProductoOpen = !state.isPublicidadProductoOpen;
    },

    onToggleProfile: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },

    onToggleChangePassword: (state) => {
      state.isChangePasswordOpen = !state.isChangePasswordOpen;
    },

    onOpenLoading: (state, { payload }) => {
      state.isLoadingOpen = true;
      state.loadingMessage = payload;
    },

    onCloseLoading: (state) => {
      state.isLoadingOpen = false;
      state.loadingMessage = '';
    },

  }

});

export const { 
  onInitDarkMode,
  onToggleDarkMode,
  onToggleNewUser,
  onToggleUnidadMedida,
  onToggleProducto,
  onToggleImagen,
  onTogglePublicidad,
  onTogglePublicidadProducto,
  onToggleProfile,
  onToggleChangePassword,
  onOpenLoading,
  onCloseLoading,
} = uiSlice.actions;
