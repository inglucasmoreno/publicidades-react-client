import { useEffect } from "react";
import { useImagenesStore } from "../../hooks";
import { ImagenesHeader, ImagenesTable } from ".";
import { ConfirmModal, ImagenesModal } from "../../modals";


export const ImagenesPage = () => {
  const { getAllImagenes } = useImagenesStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllImagenes();
  }, [])

  return (
    <>

      {/* Modal componente - Imagen */}
      <ImagenesModal />
      <ConfirmModal props="probando" />

      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <ImagenesHeader />
        <ImagenesTable />
      </div>

    </>
  )
}

