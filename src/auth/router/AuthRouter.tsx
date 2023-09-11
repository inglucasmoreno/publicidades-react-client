import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from ".."
import { InitPage } from "../pages/InitPage"

export const AuthRouter = () => {
  return (
    <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/init" element={<InitPage />} />
        <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>  
  )
}
