import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { IUnidadesMedida } from "../../interfaces/UnidadesMedida";
import { useEffect } from "react";
import { useUnidadesMedidaStore } from "../../hooks";

export const UnidadesMedidaModal = () => {

  const { isUnidadMedidaOpen, toggleUnidadMedida } = useUiStore();
  const { activeUnidadMedida, updateUnidadMedida, addNewUnidadMedida, isLoadingUnidadesMedidaModal } = useUnidadesMedidaStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IUnidadesMedida>();

  useEffect(() => {
    if (isUnidadMedidaOpen) reset()
  }, [isUnidadMedidaOpen])

  const onSubmit = handleSubmit((data) => {

    if (activeUnidadMedida.id !== 0) {
      updateUnidadMedida(data);
    } else {
      addNewUnidadMedida(data);
    }

  })

  return (
    <Modal isDismissable={false} isOpen={isUnidadMedidaOpen} onOpenChange={() => toggleUnidadMedida()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activeUnidadMedida.id === 0 ? 'Nueva unidad' : 'Actualizando unidad'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            <form onSubmit={onSubmit}>
              <Input
                type="text"
                autoFocus
                variant="bordered"
                defaultValue={ activeUnidadMedida.id === 0 ? '' : activeUnidadMedida.descripcion }
                validationState={errors.descripcion ? 'invalid' : 'valid'}
                errorMessage={errors?.descripcion?.message}
                label="Descripcion"
                {...register('descripcion', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              {
                !isLoadingUnidadesMedidaModal
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activeUnidadMedida.id === 0 ? 'Crear unidad' : 'Actualizar unidad'
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

