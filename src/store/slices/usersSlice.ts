import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoadingUsers: false,
    isLoadingUsersModal: false,
    users: [],
    activeUser: {
      id: 0,
      usuario: '',
      apellido: '',
      nombre: '',
      dni: '',
      email: '',
      role: 'ADMIN_ROLE',
      password: '',
      repetir: '',
    },
    success: '',
    error: '',
  },
  reducers: {

    onStartLoadingUsers: (state) => {
      state.isLoadingUsers = true;
      state.isLoadingUsersModal = false;
      state.users = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalUsers: (state) => {
      state.isLoadingUsers = false;
      state.isLoadingUsersModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveUser: (state, { payload }) => {
      state.activeUser = payload;
    },

    onGetAllUsers: (state, { payload }) => {
      state.isLoadingUsers = false;
      state.isLoadingUsersModal = false;
      state.users = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewUser: (state, { payload }) => {
      state.users.unshift(payload);
      state.isLoadingUsers = false;
      state.isLoadingUsersModal = false;
    },

    onUpdateUser: (state, { payload }) => {
      state.users = state.users.map( (user: any) => {
        if(user.id === payload.id) return payload;
        return user;
      });
      state.isLoadingUsers = false;
      state.isLoadingUsersModal = false;
    },

    onActiveInactiveUser: (state, { payload }) => {
      state.users = state.users.map( (user: any) => {
        if(user.id === payload.id) return payload;
        return user;
      });
      state.isLoadingUsers = false;
      state.isLoadingUsersModal = false;
    },

    onDeleteUser: (state, { payload }) => {
      state.users = state.users.filter( (user: any) => user.id !== payload.id );
      state.isLoadingUsers = false;
      state.isLoadingUsersModal = false;
    },

    onErrorUser: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingUsers = false;
      state.isLoadingUsersModal = false;
    },

  }
});

export const {
  onStartLoadingUsers,
  onStartLoadingModalUsers,
  onSetActiveUser,
  onGetAllUsers,
  onAddNewUser,
  onUpdateUser,
  onActiveInactiveUser,
  onDeleteUser,
  onErrorUser
} = usersSlice.actions;

