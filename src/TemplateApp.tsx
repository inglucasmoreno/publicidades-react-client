import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { useEffect } from "react"
import { useUiStore } from './hooks/useUiStore';

export const TemplateApp = () => {

  const { initDarkMode } = useUiStore();
  
  useEffect(() => {
    initDarkMode();
  },[])

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  )
}
