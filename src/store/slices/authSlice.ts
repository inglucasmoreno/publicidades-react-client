import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isLoadingChangePassword: false,
    status: 'checking', // checking || authenticated || not-authenticated
    user: {},
    success: '',
    error: '',
  },
  reducers: {

    onChecking: (state) => {
      state.success = '';
      state.error = '';
      state.user = {};
      state.isLoading = true;
    },

    onLoadingChangePassword: (state, { payload }) => {
      state.isLoadingChangePassword = payload;
    },

    onError: (state, { payload }) => {
      state.success = '';
      state.user = {};
      state.error = payload;
      state.isLoading = false;
    },

    onInicialization: (state, { payload }) => {
      state.success = payload;
      state.isLoading = false;
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.success = '';
      state.error = '';
      state.isLoading = false;
    },

    onLogout: (state) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.success = '';
      state.error = '';
      state.isLoading = false;
    }

  }
});

export const {
  onChecking,
  onLoadingChangePassword,
  onError,
  onInicialization,
  onLogin,
  onLogout
} = authSlice.actions;

