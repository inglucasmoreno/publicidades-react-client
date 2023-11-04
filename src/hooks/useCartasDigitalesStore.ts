import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { 
  onActiveInactiveCartaDigital, 
  onAddNewCartaDigital, 
  onCloseLoading, 
  onErrorCartasDigitales, 
  onGetAllCartasDigitales, 
  onOpenLoading, 
  onSetActiveCartaDigital, 
  onStartLoadingModalCartasDigitales, 
  onStartLoadingCartasDigitales, 
  onToggleCartaDigital, 
  onUpdateCartaDigital 
} from "../store/slices";

export const useCartasDigitalesStore = () => {

  const dispatch = useDispatch();
  
  const {
    isLoadingCartasDigitales,
    isLoadingCartasDigitalesModal,
    cartasDigitales,
    activeCartaDigital,
    success,
    error
  } = useSelector((state:RootState) => state.cartasDigitales);

  const setActiveCartaDigital = (cartaDigital) => {
    dispatch(onSetActiveCartaDigital(cartaDigital));
  }

  const getAllCartasDigitales = async () => {

    dispatch(onStartLoadingCartasDigitales());
    
    try {
      const { data } = await backendApi.get('cartas-digitales');
      dispatch(onGetAllCartasDigitales(data.cartasDigitales));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorCartasDigitales(errorMessage));
    }

  }

  const addNewCartaDigital = async (cartaDigitalData: any) => {

    dispatch(onStartLoadingModalCartasDigitales());

    try {
      const { data } = await backendApi.post('cartas-digitales', cartaDigitalData);
      dispatch(onAddNewCartaDigital(data.cartaDigital));
      notistack.success('Carta digital creada correctamente');
      dispatch(onToggleCartaDigital());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorCartasDigitales(errorMessage));
    }

  }

  const updateCartaDigital = async (cartaDigitalData: any) => {
    
    dispatch(onStartLoadingModalCartasDigitales());
    
    try{
      const { data } = await backendApi.patch(`cartas-digitales/${activeCartaDigital.id}`, cartaDigitalData);
      dispatch(onUpdateCartaDigital(data.cartaDigital));
      notistack.success('Carta digital actualizada correctamente');
      dispatch(onToggleCartaDigital());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorCartasDigitales(errorMessage));
    }

  }

  const activeInactiveCartaDigital = async (cartaDigitalData: any) => {

    dispatch(onOpenLoading(cartaDigitalData.activo ? 'Alta de carta digital' : 'Baja de carta digital'));
    
    try{
      const { data } = await backendApi.patch(`cartas-digitales/${cartaDigitalData.id}`, cartaDigitalData);
      dispatch(onActiveInactiveCartaDigital(data.cartaDigital));
      dispatch(onCloseLoading());
      notistack.success('Carta digital actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorCartasDigitales(errorMessage));
    }

  }

  return {

    // Properties
    isLoadingCartasDigitales,
    isLoadingCartasDigitalesModal,
    cartasDigitales,
    activeCartaDigital,
    success,
    error,

    // Methods
    setActiveCartaDigital,
    getAllCartasDigitales,
    addNewCartaDigital,
    updateCartaDigital,
    activeInactiveCartaDigital
  
  };


}

