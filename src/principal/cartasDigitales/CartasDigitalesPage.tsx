import { useEffect } from "react"
import { CartasDigitalesModal } from "../../modals"
import { useCartasDigitalesStore } from "../../hooks"
import { CartasDigitalesHeader, CartasDigitalesTable } from ".";

export const CartasDigitalesPage = () => {

  const { getAllCartasDigitales } = useCartasDigitalesStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCartasDigitales();
  }, [])

  return (
    <>

      {/* Modal componente - Unidad medida */}
      <CartasDigitalesModal />

      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <CartasDigitalesHeader />
        <CartasDigitalesTable />
      </div>

    </>
  )
}

