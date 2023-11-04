import { useEffect } from "react";
import { useProductosStore } from "../../hooks";
import { ProductosHeader, ProductosTable } from ".";
import { ProductosModal } from "../../modals/productos/ProductosModal";

export const ProductosPage = () => {
  const { getAllProductos } = useProductosStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProductos();
  }, [])

  return (
    <>

      {/* Modal componente - Producto */}
      <ProductosModal />

      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <ProductosHeader />
        <ProductosTable />
      </div>

    </>
  )
}

