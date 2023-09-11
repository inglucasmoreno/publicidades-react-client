import { useNavigate, useParams } from "react-router-dom"
import { usePublicidadesStore, useUiStore } from "../../hooks";
import { TemasPublicidades } from "../../constants";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { EditIcon, MenuIcon, PlayIcon } from "../../icons";
import { BackIcon } from "../../icons/BackIcon";
import { PublicacionesModal, PublicacionesProductosModal } from "../../modals";
import { useEffect } from "react";
import { PublicacionesProductosTable } from '.';
import { PublicacionesProductosHeader } from ".";

export const PublicacionesDetallesPage = () => {

  const { idPublicidad } = useParams();
  const { togglePublicidad } = useUiStore();
  const { activePublicidad, getPublicidad } = usePublicidadesStore();
  const navigate = useNavigate();

  const openUpdatePublicidadModal = () => {
    togglePublicidad();
  }

  useEffect(() => {
    getPublicidad(Number(idPublicidad));
  }, [])

  return (

    <>

      <PublicacionesModal />
      <PublicacionesProductosModal />

      <div className="w-11/12 md:w-10/12 mx-auto mt-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <Button className="ml-2" onPress={() => navigate(-1)} isIconOnly variant="light" aria-label="Like">
            <BackIcon />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl"> DETALLES DE PUBLICIDAD </h1>
            <h2 className="text-gray-500 mt-1"> {activePublicidad && activePublicidad.descripcion} </h2>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button className="mr-2" isIconOnly variant="light" aria-label="Like">
                <MenuIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onPress={() => navigate(`/reproducciones/${idPublicidad}`)} key="reproducir-publicidad">
                <div className="flex items-center">
                  <div>
                    <PlayIcon className="h-4 w-4" />
                  </div>
                  <span className="ml-2">
                    Reproducir publicidad
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => openUpdatePublicidadModal()} key="editar-publicidad">
                <div className="flex items-center">
                  <div>
                    <EditIcon className="h-4 w-4" />
                  </div>
                  <span className="ml-2">
                    Editar publicidad
                  </span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex items-center justify-center">
          <select className="border-2 w-52 cursor-pointer dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-4 rounded-lg">
            {TemasPublicidades.map((tema) => (
              <option key={tema.key} value={tema.key}> {tema.value} </option>
            ))}
          </select>
        </div>


        <PublicacionesProductosHeader />
        <PublicacionesProductosTable />

      </div>

    </>

  )

}

