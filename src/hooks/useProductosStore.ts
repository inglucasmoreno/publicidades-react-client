import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { 
  onActiveInactiveProducto, 
  onAddNewProducto, 
  onCloseLoading, 
  onErrorProductos, 
  onGetAllProductos, 
  onOpenLoading, 
  onSetActiveProducto, 
  onStartLoadingModalProductos, 
  onStartLoadingProductos, 
  onToggleProducto, 
  onUpdateProducto 
} from "../store/slices";

export const useProductosStore = () => {

  const dispatch = useDispatch();

  const {
    isLoadingProductos,
    isLoadingProductosModal,
    productos,
    activeProducto,
    success,
    error
  } = useSelector((state:RootState) => state.productos);

  const setActiveProducto = (producto) => {
    dispatch(onSetActiveProducto(producto));
  }

  const getAllProductos = async () => {

    dispatch(onStartLoadingProductos());

    try {
      const { data } = await backendApi.get('productos');
      dispatch(onGetAllProductos(data.productos));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorProductos(errorMessage));
    }

  }

  const addNewProducto = async (productoData: any) => {

    dispatch(onStartLoadingModalProductos());

    try {
      const { data } = await backendApi.post('productos', productoData);
      dispatch(onAddNewProducto(data.producto));
      notistack.success('Producto creado correctamente');
      dispatch(onToggleProducto());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorProductos(errorMessage));
    }

  }

  const updateProducto = async (productoData: any) => {
    
    dispatch(onStartLoadingModalProductos());
    
    try{
      const { data } = await backendApi.patch(`productos/${activeProducto.id}`, productoData);
      dispatch(onUpdateProducto(data.producto));
      notistack.success('Producto actualizado correctamente');
      dispatch(onToggleProducto());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorProductos(errorMessage));
    }

  }

  const activeInactiveProducto = async (productoData: any) => {

    dispatch(onOpenLoading(productoData.activo ? 'Alta de producto' : 'Baja de producto'));
    
    try{
      const { data } = await backendApi.patch(`productos/${productoData.id}`, productoData);
      dispatch(onActiveInactiveProducto(data.producto));
      dispatch(onCloseLoading());
      notistack.success('Producto actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorProductos(errorMessage));
    }

  }

  return {

    // Properties
    isLoadingProductos,
    isLoadingProductosModal,
    productos,
    activeProducto,
    success,
    error,

    // Methods
    setActiveProducto,
    getAllProductos,
    addNewProducto,
    updateProducto,
    activeInactiveProducto
  
  };


}

