
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../icons"
import { usePublicidadesProductosStore } from "../../hooks/usePublicidadesProductos";
import { useUiStore } from "../../hooks";

export const PublicacionesProductosHeader = () => {
  const { togglePublicidadProducto } = useUiStore();
  const { publicidadesProductos, setActivePublicidadProducto } = usePublicidadesProductosStore();

  const openNewImagenModal = () => {
    setActivePublicidadProducto({
      id: 0,
      tipo: 'Generico',
      peso: 100,
      destacado: false,
      comentarios: '',
      publicidadId: 0,
      imagenId: 0,
      activo: true
    })
    togglePublicidadProducto();
  }

  return (
    <div className="flex items-center w-full mt-4">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="text-xl"> LISTADO DE PRODUCTOS </h1>
          <p className="text-sm text-slate-400"> Total de productos: {publicidadesProductos?.length} </p>
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
                  Nuevo producto
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )

}

