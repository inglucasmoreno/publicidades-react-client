import { configureStore } from '@reduxjs/toolkit'
import { 
  authSlice, 
  unidadesMedidaSlice, 
  productosSlice, 
  imagenesSlice,
  sidebarSlice, 
  uiSlice, 
  usersSlice,
  publicidadesSlice,
  publicidadesProductosSlice,
  cartaSlice
} from './slices'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer,
    users: usersSlice.reducer,
    ui: uiSlice.reducer,
    unidadesMedida: unidadesMedidaSlice.reducer,
    productos: productosSlice.reducer,
    imagenes: imagenesSlice.reducer,
    publicidades: publicidadesSlice.reducer,
    publicidadesProductos: publicidadesProductosSlice.reducer,
    carta: cartaSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
