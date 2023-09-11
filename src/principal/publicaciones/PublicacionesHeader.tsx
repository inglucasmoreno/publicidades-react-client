import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useUiStore } from "../../hooks";
import { AddIcon, MenuIcon } from "../../icons";
import { usePublicidadesStore } from "../../hooks/usePublicidades";

export const PublicacionesHeader = () => {
  const { togglePublicidad } = useUiStore();
  const { publicidades, setActivePublicidad } = usePublicidadesStore();

  const openNewPublicidadModal = () => {
    setActivePublicidad({
      id: 0,
      descripcion: '',
      activo: true
    })
    togglePublicidad();
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-semibold text-xl"> LISTADO DE PUBLICIDADES </h1>
          <p className="text-sm text-slate-400"> Total de unidades: {publicidades?.length} </p>
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
            <DropdownItem onClick={() => openNewPublicidadModal()}>
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2">
                  Nueva publicidad
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

