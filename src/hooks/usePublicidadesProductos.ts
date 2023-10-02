import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { 
  onActiveInactivePublicidadProducto, 
  onAddNewPublicidadProducto, 
  onCloseLoading, 
  onErrorPublicidadesProductos, 
  onGetAllPublicidadesProductos, 
  onOpenLoading, 
  onSetActivePublicidadProducto, 
  onStartLoadingModalPublicidadesProductos, 
  onStartLoadingPublicidadesProductos, 
  onTogglePublicidadProducto, 
  onUpdatePublicidadProducto,
  onDeletePublicidadesProductos
} from "../store/slices";

export const usePublicidadesProductosStore = () => {

  const dispatch = useDispatch();
  
  const {
    isLoadingPublicidadesProductos,
    isLoadingPublicidadesProductosModal,
    publicidadesProductos,
    activePublicidadProducto,
    success,
    error
  } = useSelector((state:RootState) => state.publicidadesProductos);

  const setActivePublicidadProducto = (publicidadProducto) => {
    dispatch(onSetActivePublicidadProducto(publicidadProducto));
  }

  const getPublicidadProducto = async (idPublicidadProducto: number) => {
    dispatch(onStartLoadingPublicidadesProductos());
    try {
      const { data } = await backendApi.get(`publicidades-productos/${idPublicidadProducto}`);
      dispatch(onSetActivePublicidadProducto(data.relacion));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidadesProductos(errorMessage));
    }
  }

  const getAllPublicidadesProductos = async (params: any) => {

    dispatch(onStartLoadingPublicidadesProductos());
    
    try {
      const { data } = await backendApi.get('publicidades-productos', { params });
      dispatch(onGetAllPublicidadesProductos(data.relaciones));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidadesProductos(errorMessage));
    }

  }

  const addNewPublicidadProducto = async (publicidadProductoData: any) => {

    dispatch(onStartLoadingModalPublicidadesProductos());

    try {
      const { data } = await backendApi.post('publicidades-productos', publicidadProductoData);
      dispatch(onAddNewPublicidadProducto(data.relacion));
      notistack.success('Producto agregado correctamente');
      dispatch(onTogglePublicidadProducto());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidadesProductos(errorMessage));
    }

  }

  const updatePublicidadProducto = async (publicidadProductoData: any) => {
    
    dispatch(onStartLoadingModalPublicidadesProductos());
    
    try{
      const { data } = await backendApi.patch(`publicidades-productos/${activePublicidadProducto.id}`, publicidadProductoData);
      dispatch(onUpdatePublicidadProducto(data.relacion));
      dispatch(onSetActivePublicidadProducto(data.relacion));
      notistack.success('Producto actualizado correctamente');
      dispatch(onTogglePublicidadProducto());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPublicidadesProductos(errorMessage));
    }

  }

  const activeInactivePublicidadProducto = async (publicidadProductoData: any) => {

    dispatch(onOpenLoading(publicidadProductoData.activo ? 'Alta de producto' : 'Baja de producto'));
    
    try{
      const { data } = await backendApi.patch(`publicidades-productos/${publicidadProductoData.id}`, publicidadProductoData);
      dispatch(onActiveInactivePublicidadProducto(data.relacion));
      dispatch(onCloseLoading());
      notistack.success('Producto actualizado correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorPublicidadesProductos(errorMessage));
    }

  }

  const deletePublicidadProducto = async (publicidadProductoData: any) => {

    dispatch(onOpenLoading('Eliminando producto'));

    try {
      await backendApi.delete(`publicidades-productos/${publicidadProductoData.id}`);
      dispatch(onDeletePublicidadesProductos(publicidadProductoData));
      dispatch(onCloseLoading());
      notistack.success('Producto eliminado correctamente');
    } catch (error) {
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorPublicidadesProductos(errorMessage));
    }

  }

  return {

    // Properties
    isLoadingPublicidadesProductos,
    isLoadingPublicidadesProductosModal,
    publicidadesProductos,
    activePublicidadProducto,
    success,
    error,

    // Methods
    setActivePublicidadProducto,
    getAllPublicidadesProductos,
    addNewPublicidadProducto,
    updatePublicidadProducto,
    activeInactivePublicidadProducto,
    getPublicidadProducto,
    deletePublicidadProducto
  
  };


}

