import { useEffect } from "react";
import { usePublicidadesStore } from "../../hooks/usePublicidades";
import { PublicacionesHeader, PublicacionesTable } from ".";
import { PublicacionesModal } from "../../modals";

export const PublicacionesPage = () => {
  const { getAllPublicidades } = usePublicidadesStore();

  useEffect(() => {
    getAllPublicidades();
  }, [])

  return (
    <>

      {/* Modal componente - Unidad medida */}
      <PublicacionesModal/>

      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <PublicacionesHeader />
        <PublicacionesTable />
      </div>

    </>
  )
}

