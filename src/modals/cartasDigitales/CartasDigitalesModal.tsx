import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { ICartasDigitales } from "../../interfaces/CartasDigitales";
import { useEffect } from "react";
import { useCartasDigitalesStore } from "../../hooks";
import { TemasCartas } from "../../constants/TemasCartas";

export const CartasDigitalesModal = () => {

  const { isCartaDigitalOpen, toggleCartaDigital } = useUiStore();
  const { activeCartaDigital, updateCartaDigital, addNewCartaDigital, isLoadingCartasDigitalesModal } = useCartasDigitalesStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<ICartasDigitales>();

  useEffect(() => {
    if (isCartaDigitalOpen) reset()
  }, [isCartaDigitalOpen])

  const onSubmit = handleSubmit((data) => {

    if (activeCartaDigital.id !== 0) {
      updateCartaDigital(data);
    } else {
      addNewCartaDigital(data);
    }

  })

  return (
    <Modal isDismissable={false} isOpen={isCartaDigitalOpen} onOpenChange={() => toggleCartaDigital()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activeCartaDigital.id === 0 ? 'Nueva carta' : 'Actualizando carta'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            <form onSubmit={onSubmit}>

              <Input
                type="text"
                autoFocus
                variant="bordered"
                defaultValue={activeCartaDigital.id === 0 ? '' : activeCartaDigital.descripcion}
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
                className="equi-select mt-4 w-full"
              >
                {
                  TemasCartas.map((tema) => (
                    <option key={tema.key} value={ tema.value }> { tema.value } </option>
                  ))
                }
              </select>

              {
                !isLoadingCartasDigitalesModal
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activeCartaDigital.id === 0 ? 'Crear carta' : 'Actualizar carta'
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

