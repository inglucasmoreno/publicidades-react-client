import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../icons"
import { useUiStore } from "../../hooks";
import { useImagenesStore } from "../../hooks/useImagenes";

export const ImagenesHeader = () => {
  const { toggleImagen } = useUiStore();
  const { imagenes, setActiveImagen } = useImagenesStore();

  const openNewImagenModal = () => {
    setActiveImagen({
      id: 0,
      descripcion: '',
      url: '',
      activo: true
    })
    toggleImagen();
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-semibold text-xl"> LISTADO DE IMAGENES </h1>
          <p className="text-sm text-slate-400"> Total de imagenes: {imagenes?.length} </p>
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
            <DropdownItem onClick={() => openNewImagenModal()}>
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2">
                  Nueva imagen
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

