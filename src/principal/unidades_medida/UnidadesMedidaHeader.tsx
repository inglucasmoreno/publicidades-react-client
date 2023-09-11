import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../icons"
import { useUiStore, useUnidadesMedidaStore } from "../../hooks";

export const UnidadesMedidaHeader = () => {

  const { toggleUnidadMedida } = useUiStore();
  const { unidadesMedida, setActiveUnidadMedida } = useUnidadesMedidaStore();

  const openNewUnidadMedidaModal = () => {
    setActiveUnidadMedida({
      id: 0,
      descripcion: '',
      activo: true
    })
    toggleUnidadMedida();
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-semibold text-xl"> UNIDADES DE MEDIDAD </h1>
          <p className="text-sm text-slate-400"> Total de unidades: {unidadesMedida?.length} </p>
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
            <DropdownItem onClick={() => openNewUnidadMedidaModal()}>
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2">
                  Nueva unidad
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
