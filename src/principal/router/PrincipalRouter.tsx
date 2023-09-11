import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../home"
import { Layout } from "../layout"
import { UsersPage } from "../users/UsersPage"
import { LoadingModal } from "../../modals"
import { UnidadesMedidaPage } from "../unidades_medida"
import { ProductosPage } from "../productos"
import { ImagenesPage } from "../imagenes"
import { PublicacionesPage } from '../publicaciones/PublicacionesPage';
import { PublicacionesDetallesPage } from "../publicaciones-detalles"
import { useAuthStore } from "../../hooks"
import { CartaPage } from "../carta"

export const PrincipalRouter = () => {

  const { user }: any = useAuthStore();

  // useEffect(() => {
  //   checkAuthToken();
  // }, [])

  return (
    <Layout>
      <LoadingModal />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        {
          user.role === 'ADMIN_ROLE' &&
          <>
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/unidades_medida" element={<UnidadesMedidaPage />} />
          </>
        }

        {/* General routes */}
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/imagenes" element={<ImagenesPage />} />
        <Route path="/publicidades" element={<PublicacionesPage />} />
        <Route path="/carta" element={<CartaPage />} />
        <Route path="/publicidades/configuraciones/:idPublicidad" element={<PublicacionesDetallesPage />} />
        <Route path="/*" element={<Navigate to="/" />} />

      </Routes>
    </Layout>
  )
}

