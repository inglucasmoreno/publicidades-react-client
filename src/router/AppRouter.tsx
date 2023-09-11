import { Route, Routes } from 'react-router-dom';
import { PrincipalRouter } from '../principal/router/PrincipalRouter';
import { AuthRouter } from '../auth/router/AuthRouter';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import { ReproduccionesPage } from '../externos';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])

  if (status === 'checking') {
    return (
      <>
        Cargando...
      </>
    )
  }

  return (

    <Routes>

      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/*" element={<AuthRouter />} />
              {/* <Route path="/*" element={<Navigate to="auth/login" />} /> */}

            </>

          )
          : (
            <>
              <Route path="/*" element={<PrincipalRouter />} />
              {/* <Route path="/*" element={<Navigate to="/" />} /> */}
            </>
          )
      }

      <Route path='/reproducciones/:idPublicidad' element={ <ReproduccionesPage /> }/>

    </Routes>

  )

}

