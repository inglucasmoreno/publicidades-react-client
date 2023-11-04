import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import {
  onInitDarkMode,
  onToggleDarkMode,
  onToggleNewUser,
  onToggleUnidadMedida,
  onToggleCartaDigital,
  onToggleProducto,
  onToggleImagen,
  onTogglePublicidad,
  onToggleProfile,
  onOpenLoading,
  onCloseLoading,
  onToggleChangePassword,
  onTogglePublicidadProducto,
} from "../store/slices";

export const useUiStore = () => {

  let html = document.documentElement;

  const {
    isDarkMode,
    isUserOpen,
    isUnidadMedidaOpen,
    isCartaDigitalOpen,
    isProductoOpen,
    isImagenOpen,
    isPublicidadOpen,
    isPublicidadProductoOpen,
    isProfileOpen,
    isLoadingOpen,
    isChangePasswordOpen,
    loadingMessage
  } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch();

  // Dark mode handling

  const initDarkMode = () => {

    const darkMode = localStorage.getItem('darkMode') === 'true' ? true : false;

    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }

    dispatch(onInitDarkMode(darkMode));

  }

  const toggleDarkMode = () => {

    if (isDarkMode) {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    } else {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }

    dispatch(onToggleDarkMode());

  }

  // User - Modal
  const toggleUser = () => {
    dispatch(onToggleNewUser());
  }

  // Unidad medida - Modal
  const toggleUnidadMedida = () => {
    dispatch(onToggleUnidadMedida());
  }

  // Carta digital - Modal
  const toggleCartaDigital = () => {
    dispatch(onToggleCartaDigital());
  }

  // Producto - Modal
  const toggleProducto = () => {
    dispatch(onToggleProducto());
  }

  // Imagen - Modal
  const toggleImagen = () => {
    dispatch(onToggleImagen());
  }

  // Publicidad - Modal
  const togglePublicidad = () => {
    dispatch(onTogglePublicidad());
  }

  // PublicidadProducto - Modal
  const togglePublicidadProducto = () => {
    dispatch(onTogglePublicidadProducto());
  }

  // Change password - Modal
  const toggleChangePassword = () => {
    dispatch(onToggleChangePassword());
  }

  // Profile - Modal
  const toggleProfile = () => {
    dispatch(onToggleProfile());
  }

  // Loading - Modal - Open
  const openLoading = (message: string) => {
    dispatch(onOpenLoading(message));
  }

  // Loading - Modal - Cerrar
  const closeLoading = () => {
    dispatch(onCloseLoading());
  }

  return {

    // Properties
    isDarkMode,
    isUserOpen,
    isUnidadMedidaOpen,
    isCartaDigitalOpen,
    isProductoOpen,
    isImagenOpen,
    isPublicidadOpen,
    isPublicidadProductoOpen,
    isProfileOpen,
    isLoadingOpen,
    isChangePasswordOpen,
    loadingMessage,

    // Methods
    initDarkMode,
    toggleDarkMode,
    toggleUser,
    toggleProducto,
    toggleCartaDigital,
    toggleProfile,
    toggleUnidadMedida,
    toggleImagen,
    togglePublicidad,
    togglePublicidadProducto,
    toggleChangePassword,
    openLoading,
    closeLoading,

  }

}

