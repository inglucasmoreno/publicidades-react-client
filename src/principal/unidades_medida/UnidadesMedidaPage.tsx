import { useEffect } from "react"
import { UnidadesMedidaModal } from "../../modals"
import { useUnidadesMedidaStore } from "../../hooks"
import { UnidadesMedidaHeader, UnidadesMedidaTable } from ".";

export const UnidadesMedidaPage = () => {

  const { getAllUnidadesMedida } = useUnidadesMedidaStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUnidadesMedida();
  }, [])

  return (
    <>

      {/* Modal componente - Unidad medida */}
      <UnidadesMedidaModal />

      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <UnidadesMedidaHeader />
        <UnidadesMedidaTable />
      </div>

    </>
  )
}

