import React from 'react'
import ReactDOM from 'react-dom/client'
import { TemplateApp } from './TemplateApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { NextUIProvider } from '@nextui-org/react'

import './index.css'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <NextUIProvider>
          <TemplateApp />
        </NextUIProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
)
