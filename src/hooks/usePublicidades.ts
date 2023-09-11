import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { 
  onActiveInactivePublicidad, 
  onAddNewPublicidad, 
  onCloseLoading, 
  onErrorPublicidades, 
  onGetAllPublicidades, 
  onOpenLoading, 
  onSetActivePublicidad, 
  onStartLoadingModalPublicidades, 
  onStartLoadingPublicidades, 
  onTogglePublicidad, 
  onUpdatePublicidad 
} from "../store/slices";
import { useNavigate } from "react-router-dom";

export const usePublicidadesStore = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoadingPublicidades,
    isLoadingPublicidadesModal,
    publicidades,
    activePublicidad,
    success,
    error
  } = useSelector((state:RootState) => state.publicidades);

  const setActivePublicidad = (publicidad) => {
    dispatch(onSetActivePublicidad(publicidad));
  }

  const getPublicidad = async (idPublicidad: number) => {
    dispatch(onStartLoadingPublicidades());
    try {
      const { data } = await backendApi.get(`publicaciones/${idPublicidad}`);
      dispatch(onSetActivePublicidad(data.publicidad));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidades(errorMessage));
    }
  }

  const getAllPublicidades = async () => {

    dispatch(onStartLoadingPublicidades());
    
    try {
      const { data } = await backendApi.get('publicaciones');
      dispatch(onGetAllPublicidades(data.publicidades));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidades(errorMessage));
    }

  }

  const addNewPublicidad = async (publicidadData: any) => {

    dispatch(onStartLoadingModalPublicidades());

    try {
      const { data } = await backendApi.post('publicaciones', publicidadData);
      dispatch(onAddNewPublicidad(data.publicidad));
      notistack.success('Publicidad creada correctamente');
      dispatch(onTogglePublicidad());
      navigate(`/publicidades/configuraciones/${data.publicidad.id}`);
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidades(errorMessage));
    }

  }

  const updatePublicidad = async (publicidadData: any) => {
    
    dispatch(onStartLoadingModalPublicidades());
    
    try{
      const { data } = await backendApi.patch(`publicaciones/${activePublicidad.id}`, publicidadData);
      dispatch(onUpdatePublicidad(data.publicidad));
      dispatch(onSetActivePublicidad(data.publicidad));
      notistack.success('Publicidad actualizada correctamente');
      dispatch(onTogglePublicidad());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidades(errorMessage));
    }

  }

  const activeInactivePublicidad = async (publicidadData: any) => {

    dispatch(onOpenLoading(publicidadData.activo ? 'Alta de publicidad' : 'Baja de publicidad'));
    
    try{
      const { data } = await backendApi.patch(`publicaciones/${publicidadData.id}`, publicidadData);
      dispatch(onActiveInactivePublicidad(data.publicidad));
      dispatch(onCloseLoading());
      notistack.success('Publicidad actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorPublicidades(errorMessage));
    }

  }

  return {

    // Properties
    isLoadingPublicidades,
    isLoadingPublicidadesModal,
    publicidades,
    activePublicidad,
    success,
    error,

    // Methods
    setActivePublicidad,
    getAllPublicidades,
    addNewPublicidad,
    updatePublicidad,
    activeInactivePublicidad,
    getPublicidad
  
  };


}

