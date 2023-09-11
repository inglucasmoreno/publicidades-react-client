import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { 
  onActiveInactiveUnidadMedida, 
  onAddNewUnidadMedida, 
  onCloseLoading, 
  onErrorUnidadesMedida, 
  onGetAllUnidadesMedida, 
  onOpenLoading, 
  onSetActiveUnidadMedida, 
  onStartLoadingModalUnidadesMedida, 
  onStartLoadingUnidadesMedida, 
  onToggleUnidadMedida, 
  onUpdateUnidadMedida 
} from "../store/slices";

export const useUnidadesMedidaStore = () => {

  const dispatch = useDispatch();
  
  const {
    isLoadingUnidadesMedida,
    isLoadingUnidadesMedidaModal,
    unidadesMedida,
    activeUnidadMedida,
    success,
    error
  } = useSelector((state:RootState) => state.unidadesMedida);

  const setActiveUnidadMedida = (unidad) => {
    dispatch(onSetActiveUnidadMedida(unidad));
  }

  const getAllUnidadesMedida = async () => {

    dispatch(onStartLoadingUnidadesMedida());
    
    try {
      const { data } = await backendApi.get('unidades-medida');
      dispatch(onGetAllUnidadesMedida(data.unidades));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorUnidadesMedida(errorMessage));
    }

  }

  const addNewUnidadMedida = async (unidadData: any) => {

    dispatch(onStartLoadingModalUnidadesMedida());

    try {
      const { data } = await backendApi.post('unidades-medida', unidadData);
      dispatch(onAddNewUnidadMedida(data.unidad));
      notistack.success('Unidad creada correctamente');
      dispatch(onToggleUnidadMedida());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorUnidadesMedida(errorMessage));
    }

  }

  const updateUnidadMedida = async (unidadData: any) => {
    
    dispatch(onStartLoadingModalUnidadesMedida());
    
    try{
      const { data } = await backendApi.patch(`unidades-medida/${activeUnidadMedida.id}`, unidadData);
      dispatch(onUpdateUnidadMedida(data.unidad));
      notistack.success('Unidad actualizada correctamente');
      dispatch(onToggleUnidadMedida());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorUnidadesMedida(errorMessage));
    }

  }

  const activeInactiveUnidadMedida = async (unidadData: any) => {

    dispatch(onOpenLoading(unidadData.activo ? 'Alta de unidad' : 'Baja de unidad'));
    
    try{
      const { data } = await backendApi.patch(`unidades-medida/${unidadData.id}`, unidadData);
      dispatch(onActiveInactiveUnidadMedida(data.unidad));
      dispatch(onCloseLoading());
      notistack.success('Unidad actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorUnidadesMedida(errorMessage));
    }

  }

  return {

    // Properties
    isLoadingUnidadesMedida,
    isLoadingUnidadesMedidaModal,
    unidadesMedida,
    activeUnidadMedida,
    success,
    error,

    // Methods
    setActiveUnidadMedida,
    getAllUnidadesMedida,
    addNewUnidadMedida,
    updateUnidadMedida,
    activeInactiveUnidadMedida
  
  };


}

