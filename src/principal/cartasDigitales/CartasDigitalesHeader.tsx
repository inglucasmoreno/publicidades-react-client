import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../icons"
import { useUiStore, useCartasDigitalesStore } from "../../hooks";

export const CartasDigitalesHeader = () => {

  const { toggleCartaDigital } = useUiStore();
  const { cartasDigitales, setActiveCartaDigital } = useCartasDigitalesStore();

  const openNewCartaDigitalModal = () => {
    setActiveCartaDigital({
      id: 0,
      tema: 'Basico',
      descripcion: '',
      activo: true
    })
    toggleCartaDigital();
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-semibold text-xl"> CARTAS DIGITALES </h1>
          <p className="text-sm text-slate-400"> Total de cartas: {cartasDigitales?.length} </p>
        </div>
      </div>
      <div className="mt-5">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
              <MenuIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => openNewCartaDigitalModal()}>
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2">
                  Nueva carta
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
