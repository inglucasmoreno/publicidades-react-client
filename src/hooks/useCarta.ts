import { useDispatch, useSelector } from "react-redux";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { onStartLoadingCarta, onSubirCarta } from "../store/slices";
import { RootState } from "../store/store";

export const useCarta = () => {
  
  const dispatch = useDispatch();

  const { isLoadingCarta } = useSelector((state: RootState) => state.carta);

  const subirCarta = async (cartaData: any)  => {
    
    dispatch(onStartLoadingCarta());

    try {
      await backendApi.post('carta', cartaData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dispatch(onSubirCarta());
      notistack.success('Carta actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
    }

  }

  return {

    // Properties
    isLoadingCarta,

    // Methods
    subirCarta

  };

}