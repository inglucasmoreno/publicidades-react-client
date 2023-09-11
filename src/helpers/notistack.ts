import { SnackbarOrigin, enqueueSnackbar } from "notistack";

const autoHideDuration: number = 2000;

const anchorOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
}

export const success = (message = 'Accion completada') => {
  enqueueSnackbar(message,{
    variant: 'success',
    autoHideDuration,
    anchorOrigin
  })
}

export const error = (message = 'Error de servidor') => {
  enqueueSnackbar(message,{
    variant: 'error',
    autoHideDuration,
    anchorOrigin
  })
}

export const info = (message = '') => {
  enqueueSnackbar(message,{
    variant: 'info',
    autoHideDuration,
    anchorOrigin
  })
}

export const warning = (message = '') => {
  enqueueSnackbar(message,{
    variant: 'warning',
    autoHideDuration,
    anchorOrigin
  })
}

export const normal = (message = '') => {
  enqueueSnackbar(message,{
    variant: 'default',
    autoHideDuration,
    anchorOrigin
  })
}



