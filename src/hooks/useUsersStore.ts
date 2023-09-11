import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewUser,
  onErrorUser,
  onGetAllUsers,
  onSetActiveUser,
  onStartLoadingModalUsers,
  onStartLoadingUsers,
  onToggleNewUser,
  onActiveInactiveUser,
  onUpdateUser,
  onOpenLoading,
  onCloseLoading,
  onToggleChangePassword,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";

export const useUsersStore = () => {

  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingUsers, 
      isLoadingUsersModal,
      users,
      activeUser 
  } = useSelector((state: RootState) => state.users);

  const setActiveUser = (user) => {
    dispatch(onSetActiveUser(user));
  }

  const getAllUsers = async () => {

    dispatch(onStartLoadingUsers());

    try {
      const { data } = await backendApi.get('usuarios');
      dispatch(onGetAllUsers(data.usuarios));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorUser(errorMessage));
    }

  }

  const addNewUser = async (userData: any) => {

    dispatch(onStartLoadingModalUsers());

    try {
      const { data } = await backendApi.post('usuarios', userData);
      dispatch(onAddNewUser(data.usuario));
      notistack.success('Usuario creado correctamente');
      dispatch(onToggleNewUser());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorUser(errorMessage));
    }

  }

  const updateUser = async (userData: any) => {
    
    dispatch(onStartLoadingModalUsers());
    
    try{
      const { data } = await backendApi.patch(`usuarios/${activeUser.id}`, userData);
      dispatch(onUpdateUser(data.usuario));
      notistack.success('Usuario actualizado correctamente');
      dispatch(onToggleNewUser());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorUser(errorMessage));
    }

  }

  const changePassword = async (userData: any) => {
    
    dispatch(onStartLoadingModalUsers());
    
    try{
      const { data } = await backendApi.patch(`usuarios/${activeUser.id}`, userData);
      dispatch(onUpdateUser(data.usuario));
      notistack.success('Contraseña actualizada correctamente');
      dispatch(onToggleChangePassword());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorUser(errorMessage));
    }

  }

  const activeInactiveUser = async (userData: any) => {

    dispatch(onOpenLoading(userData.activo ? 'Alta de usuario' : 'Baja de usuario'));
    
    try{
      const { data } = await backendApi.patch(`usuarios/${userData.id}`, userData);
      dispatch(onActiveInactiveUser(data.usuario));
      dispatch(onCloseLoading());
      notistack.success('Usuario actualizado correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorUser(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingUsers,
    isLoadingUsersModal,
    users,
    activeUser,

    // Methods
    getAllUsers,
    addNewUser,
    updateUser,
    changePassword,
    setActiveUser,
    activeInactiveUser,

  }

}

