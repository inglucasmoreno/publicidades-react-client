import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { IPublicidades } from "../../interfaces/Publicidades";
import { useEffect } from "react";
import { usePublicidadesStore } from "../../hooks";
import { TemasPublicidades } from "../../constants/TemasPublicidades";

export const PublicacionesModal = () => {

  const { isPublicidadOpen, togglePublicidad } = useUiStore();
  const { activePublicidad, updatePublicidad, addNewPublicidad, isLoadingPublicidadesModal } = usePublicidadesStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IPublicidades>();

  useEffect(() => {
    if (isPublicidadOpen) reset()
  }, [isPublicidadOpen])

  const onSubmit = handleSubmit((data: any) => {

    const dataForm = {
      descripcion: data.descripcion,
      tema: data.tema,
      cantidad_muestra: Number(data.cantidad_muestra)
    }

    if (activePublicidad.id !== 0) {
      updatePublicidad(dataForm);
    } else {
      addNewPublicidad(dataForm);
    }

  })

  return (
    <Modal isDismissable={false} isOpen={isPublicidadOpen} onOpenChange={() => togglePublicidad()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activePublicidad.id === 0 ? 'Nueva publicidad' : 'Actualizando publicidad'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            <form onSubmit={onSubmit}>

              <Input
                type="text"
                variant="bordered"
                autoFocus
                defaultValue={activePublicidad.id === 0 ? '' : activePublicidad.descripcion}
                validationState={errors.descripcion ? 'invalid' : 'valid'}
                errorMessage={errors?.descripcion?.message}
                label="Descripcion"
                {...register('descripcion', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              <select
                {...register('tema', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
                defaultValue={activePublicidad.tema}
                className="border-2 w-full cursor-pointer dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-4 rounded-lg">
                {TemasPublicidades.map((tema) => (
                  <option key={tema.key} value={tema.key}>
                    {tema.value}
                  </option>
                ))}
              </select>

              <Input
                type="number"
                variant="bordered"
                className="mt-4"
                autoFocus
                defaultValue={activePublicidad.id === 0 ? '' : String(activePublicidad.cantidad_muestra)}
                validationState={errors.cantidad_muestra ? 'invalid' : 'valid'}
                errorMessage={errors?.cantidad_muestra?.message}
                label="Productos x pagina"
                {...register('cantidad_muestra', {
                  required: { value: true, message: 'El campo es obligatorio' },
                  min: { value: 0, message: 'No se admiten numeros negativos' }
                })}
              />

              {
                !isLoadingPublicidadesModal
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activePublicidad.id === 0 ? 'Crear publicidad' : 'Actualizar publicidad'
                    }
                  </Button>
                  :
                  <Button isLoading className="text-white mt-6 w-full" color="success" variant="solid">
                    Cargando
                  </Button>
              }

            </form>

          </ModalBody>

        </>
      </ModalContent>
    </Modal>
  )

}

