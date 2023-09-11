import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { onChecking, onError, onInicialization, onLoadingChangePassword, onLogin, onLogout } from "../store/slices";
import { backendApi } from "../api/backendApi";
import { ILogin } from "../interfaces";
import { notistack } from "../helpers";

export const useAuthStore = () => {

  const { 
    success, 
    error, 
    isLoading, 
    isLoadingChangePassword,
    status, 
    user
  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const inicialization = async () => {

    dispatch(onChecking());

    try {
      const { data } = await backendApi.get('inicializacion');
      notistack.success(data.message);
      dispatch(onInicialization(data.message));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onError(errorMessage));
    }

  }

  const login = async (dataLogin: ILogin) => {

    dispatch(onChecking());

    try {
      const { data } = await backendApi.post('auth/login', dataLogin);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userLogin', data.usuario.userId);
      localStorage.setItem('token-init-date', String(new Date().getTime()) );
      dispatch(onLogin(data.usuario));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onError(errorMessage));
    }

  }

  const checkAuthToken = async () => {

    const token = localStorage.getItem('token');
    if(!token) return dispatch( onLogout() );

    try{
      const { data } = await backendApi.get('profile');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', String(new Date().getTime()));  
      dispatch(onLogin(data.usuario));
    }catch(error){
      localStorage.clear();
      dispatch(onLogout());
    }

  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    localStorage.removeItem('userLogin');
    dispatch(onLogout());
  }

  const changeMyPassword = async (data) => {
    dispatch( onLoadingChangePassword(true) );
    try{
      const userLogin: any = user;
      await backendApi.patch(`usuarios/password/${userLogin.userId}`, data);
      dispatch( onLoadingChangePassword(false) );
      notistack.success('Contraseña actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch( onLoadingChangePassword(false) );
      notistack.error(errorMessage);
    }
  }

  return {

    // Properties
    success,
    error,
    isLoading,
    isLoadingChangePassword,
    status,
    user,

    // Methods
    inicialization,
    login,
    checkAuthToken,
    logout,
    changeMyPassword

  }

}

