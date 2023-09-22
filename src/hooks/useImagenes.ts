import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import {
  onActiveInactiveImagen,
  onAddNewImagen,
  onCloseLoading,
  onErrorImagenes,
  onGetAllImagenes,
  onOpenLoading,
  onSetActiveImagen,
  onStartLoadingModalImagenes,
  onStartLoadingImagenes,
  onToggleImagen,
  onUpdateImagen,
  onDeleteImagen
} from "../store/slices";

export const useImagenesStore = () => {

  const dispatch = useDispatch();

  const {
    isLoadingImagenes,
    isLoadingImagenesModal,
    imagenes,
    activeImagen,
    success,
    error
  } = useSelector((state: RootState) => state.imagenes);

  const setActiveImagen = (imagen) => {
    dispatch(onSetActiveImagen(imagen));
  }

  const getAllImagenes = async (params: any = {}) => {

    dispatch(onStartLoadingImagenes());

    try {
      const { data } = await backendApi.get('imagenes',{ params });
      dispatch(onGetAllImagenes(data.imagenes));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorImagenes(errorMessage));
    }

  }

  const addNewImagen = async (imagenData: any) => {

    dispatch(onStartLoadingModalImagenes());

    try {
      const { data } = await backendApi.post('imagenes', imagenData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dispatch(onAddNewImagen(data.imagen));
      notistack.success('Imagen creada correctamente');
      dispatch(onToggleImagen());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorImagenes(errorMessage));
    }

  }

  const updateImagen = async (imagenData: any) => {

    dispatch(onStartLoadingModalImagenes());

    try {
      const { data } = await backendApi.patch(`imagenes/${activeImagen.id}`, imagenData);
      dispatch(onUpdateImagen(data.imagen));
      notistack.success('Descripcion actualizada correctamente');
      dispatch(onToggleImagen());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorImagenes(errorMessage));
    }

  }

  const deleteImagen = async (imagenData: any) => {

    dispatch(onOpenLoading('Eliminando imagen'));

    try {
      await backendApi.delete(`imagenes/${imagenData.id}`);
      dispatch(onDeleteImagen(imagenData));
      dispatch(onCloseLoading());
      notistack.success('Imagen eliminada correctamente');
    } catch (error) {
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorImagenes(errorMessage));
    }

  }

  const activeInactiveImagen = async (imagenData: any) => {

    dispatch(onOpenLoading(imagenData.activo ? 'Alta de imagen' : 'Baja de imagen'));

    try {
      const { data } = await backendApi.patch(`imagenes/${imagenData.id}`, imagenData);
      dispatch(onActiveInactiveImagen(data.imagen));
      dispatch(onCloseLoading());
      notistack.success('Imagen actualizada correctamente');
    } catch (error) {
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorImagenes(errorMessage));
    }

  }

  return {

    // Properties
    isLoadingImagenes,
    isLoadingImagenesModal,
    imagenes,
    activeImagen,
    success,
    error,

    // Methods
    setActiveImagen,
    getAllImagenes,
    addNewImagen,
    updateImagen,
    deleteImagen,
    activeInactiveImagen,

  };


}

