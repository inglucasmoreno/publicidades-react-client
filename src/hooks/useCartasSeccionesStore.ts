import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { 
  onActiveInactiveCartaSeccion, 
  onAddNewCartaSeccion, 
  onCloseLoading, 
  onErrorCartasSecciones, 
  onGetAllCartasSecciones, 
  onOpenLoading, 
  onSetActiveCartaSeccion, 
  onStartLoadingModalCartasSecciones, 
  onStartLoadingCartasSecciones, 
  onToggleCartaSeccion, 
  onUpdateCartaSeccion 
} from "../store/slices";

export const useCartasSeccionesStore = () => {

  const dispatch = useDispatch();
  
  const {
    isLoadingCartasSecciones,
    isLoadingCartasSeccionesModal,
    cartasSecciones,
    activeCartaSeccion,
    success,
    error
  } = useSelector((state:RootState) => state.cartasSecciones);

  const setActiveCartaSeccion = (cartaSeccion) => {
    dispatch(onSetActiveCartaSeccion(cartaSeccion));
  }

  const getAllCartasSecciones = async () => {

    dispatch(onStartLoadingCartasSecciones());
    
    try {
      const { data } = await backendApi.get('cartas-secciones');
      dispatch(onGetAllCartasSecciones(data.secciones));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorCartasSecciones(errorMessage));
    }

  }

  const addNewCartaSeccion = async (cartaSeccionData: any) => {

    dispatch(onStartLoadingModalCartasSecciones());

    try {
      const { data } = await backendApi.post('cartas-secciones', cartaSeccionData);
      dispatch(onAddNewCartaSeccion(data.seccion));
      notistack.success('Seccion creada correctamente');
      dispatch(onToggleCartaSeccion());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorCartasSecciones(errorMessage));
    }

  }

  const updateCartaSeccion = async (cartaSeccionData: any) => {
    
    dispatch(onStartLoadingModalCartasSecciones());
    
    try{
      const { data } = await backendApi.patch(`cartas-secciones/${activeCartaSeccion.id}`, cartaSeccionData);
      dispatch(onUpdateCartaSeccion(data.seccion));
      notistack.success('Seccion actualizada correctamente');
      dispatch(onToggleCartaSeccion());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorCartasSecciones(errorMessage));
    }

  }

  const activeInactiveCartaSeccion = async (cartaSeccionData: any) => {

    dispatch(onOpenLoading(cartaSeccionData.activo ? 'Alta de seccion' : 'Baja de seccion'));
    
    try{
      const { data } = await backendApi.patch(`cartas-secciones/${cartaSeccionData.id}`, cartaSeccionData);
      dispatch(onActiveInactiveCartaSeccion(data.seccion));
      dispatch(onCloseLoading());
      notistack.success('Seccion actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorCartasSecciones(errorMessage));
    }

  }

  return {

    // Properties
    isLoadingCartasSecciones,
    isLoadingCartasSeccionesModal,
    cartasSecciones,
    activeCartaSeccion,
    success,
    error,

    // Methods
    setActiveCartaSeccion,
    getAllCartasSecciones,
    addNewCartaSeccion,
    updateCartaSeccion,
    activeInactiveCartaSeccion
  
  };


}

